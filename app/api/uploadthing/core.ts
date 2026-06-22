import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Resume uploaded by user:", metadata.userId);
      console.log("File URL:", (file as any).ufsUrl || (file as any).url);
      return { url: (file as any).ufsUrl || (file as any).url };
    }),

  avatarUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar uploaded by user:", metadata.userId);
      console.log("File URL:", (file as any).ufsUrl || (file as any).url);
      return { url: (file as any).ufsUrl || (file as any).url };
    }),

  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user || (session.user as any).role !== "ADMIN")
        throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image uploaded by admin:", metadata.userId);
      console.log("File URL:", (file as any).ufsUrl || (file as any).url);
      return { url: (file as any).ufsUrl || (file as any).url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
