import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ applied: false });
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json({ applied: false });
    }

    const application = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId,
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    if (application) {
      return NextResponse.json({
        applied: true,
        status: application.status,
        appliedAt: application.createdAt,
      });
    }

    return NextResponse.json({ applied: false });
  } catch (error) {
    console.error("Error checking application:", error);
    return NextResponse.json({ applied: false });
  }
}
