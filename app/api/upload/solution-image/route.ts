import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Decode the UPLOADTHING_TOKEN to get the API key
function getUploadThingConfig() {
  const token = process.env.UPLOADTHING_TOKEN;
  if (!token) throw new Error("UPLOADTHING_TOKEN not set");
  
  // Remove surrounding quotes if present
  const cleanToken = token.replace(/^['"]|['"]$/g, "");
  const decoded = JSON.parse(Buffer.from(cleanToken, "base64").toString("utf-8"));
  return {
    apiKey: decoded.apiKey as string,
    appId: decoded.appId as string,
    region: (decoded.regions?.[0] || "sea1") as string,
  };
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be less than 4MB" }, { status: 400 });
    }

    const config = getUploadThingConfig();

    // Step 1: Request presigned URL from UploadThing API directly
    const prepareRes = await fetch("https://api.uploadthing.com/v6/uploadFiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-uploadthing-api-key": config.apiKey,
        "x-uploadthing-version": "7.7.4",
      },
      body: JSON.stringify({
        files: [{ name: file.name, size: file.size }],
        contentDisposition: "inline",
        acl: "public-read",
      }),
    });

    if (!prepareRes.ok) {
      const errText = await prepareRes.text();
      console.error("UploadThing prepareUpload failed:", prepareRes.status, errText);
      return NextResponse.json(
        { error: `Failed to prepare upload: ${errText}` },
        { status: 500 }
      );
    }

    const prepareData = await prepareRes.json();
    console.log("UploadThing prepareUpload response:", JSON.stringify(prepareData));

    // The response structure is { data: [{ presignedUrl, key, fileUrl, ... }] }
    const uploadInfo = prepareData.data?.[0] || prepareData[0];
    if (!uploadInfo) {
      console.error("No upload info in response:", JSON.stringify(prepareData));
      return NextResponse.json({ error: "No upload info returned" }, { status: 500 });
    }

    const presignedUrl = uploadInfo.presignedUrl || uploadInfo.url;
    const fileKey = uploadInfo.key;
    const fileUrl = uploadInfo.fileUrl;

    if (!presignedUrl || !fileKey) {
      console.error("Missing presigned URL or key:", JSON.stringify(uploadInfo));
      return NextResponse.json({ error: "Missing upload URL" }, { status: 500 });
    }

    // Step 2: Upload the file directly to the presigned URL
    const fileBuffer = await file.arrayBuffer();

    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: fileBuffer,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("File upload to presigned URL failed:", uploadRes.status, errText);
      return NextResponse.json(
        { error: `File upload failed: ${errText}` },
        { status: 500 }
      );
    }

    // Step 3: Construct the file URL
    // UploadThing file URLs follow the pattern: https://{appId}.ufs.sh/f/{key}
    const finalUrl = fileUrl || `https://${config.appId}.ufs.sh/f/${fileKey}`;

    console.log("Upload successful! URL:", finalUrl);

    return NextResponse.json({
      url: finalUrl,
      key: fileKey,
      name: file.name,
    });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
