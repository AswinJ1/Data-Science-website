import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

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

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAuth();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (images only)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 2MB" },
        { status: 400 }
      );
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

    const uploadInfo = prepareData.data?.[0] || prepareData[0];
    if (!uploadInfo) {
      return NextResponse.json({ error: "No upload info returned" }, { status: 500 });
    }

    const presignedUrl = uploadInfo.presignedUrl || uploadInfo.url;
    const fileKey = uploadInfo.key;
    const fileUrl = uploadInfo.fileUrl;

    if (!presignedUrl || !fileKey) {
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
    const finalUrl = fileUrl || `https://${config.appId}.ufs.sh/f/${fileKey}`;

    return NextResponse.json({ url: finalUrl });
  } catch (error) {
    console.error("Avatar upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
