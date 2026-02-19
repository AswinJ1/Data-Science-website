import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const search = searchParams.get("search");
    const salaryMin = searchParams.get("salaryMin");
    const salaryMax = searchParams.get("salaryMax");

    const where: any = { isActive: true };

    if (type) where.type = type;
    if (location) where.location = { contains: location, mode: "insensitive" };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (salaryMin) {
      where.salaryMax = { gte: parseInt(salaryMin) };
    }
    if (salaryMax) {
      where.salaryMin = { lte: parseInt(salaryMax) };
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        location: true,
        type: true,
        experience: true,
        skills: true,
        salary: true,
        salaryMin: true,
        salaryMax: true,
        salaryCurrency: true,
        openings: true,
        mandatoryRequirements: true,
        optionalRequirements: true,
        createdAt: true,
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
