import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/validations/application";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      where: { userId: session.user.id },
      include: {
        job: {
          select: { title: true, slug: true, location: true, type: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    // Check if job exists and is active
    const job = await prisma.job.findUnique({
      where: { id: parsed.data.jobId },
    });

    if (!job || !job.isActive) {
      return NextResponse.json({ error: "Job not found or inactive" }, { status: 404 });
    }

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId: parsed.data.jobId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "You have already applied for this job" }, { status: 409 });
    }

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        jobId: parsed.data.jobId,
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        education: parsed.data.education,
        institution: parsed.data.institution,
        experience: parsed.data.experience,
        linkedin: parsed.data.linkedin,
        resume: parsed.data.resume,
        coverLetter: parsed.data.coverLetter,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
