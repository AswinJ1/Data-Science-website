import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireHROrAdmin } from "@/lib/auth";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["APPLIED", "UNDER_REVIEW", "SHORTLISTED", "REJECTED", "SELECTED"]),
  statusDescription: z.string().optional(),
}).superRefine((data, ctx) => {
  const requiresDescription = ["SHORTLISTED", "REJECTED", "SELECTED"]
  if (requiresDescription.includes(data.status) && !data.statusDescription?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "A description is required when setting status to Shortlisted, Rejected, or Selected",
      path: ["statusDescription"],
    })
  }
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireHROrAdmin();
    const { id } = await params;
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const updateData: any = { status: parsed.data.status };
    if (parsed.data.statusDescription !== undefined) {
      updateData.statusDescription = parsed.data.statusDescription;
    }

    const application = await prisma.application.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { name: true, email: true } },
        job: { select: { title: true } },
      },
    });

    return NextResponse.json(application);
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireHROrAdmin();
    const { id } = await params;
    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
