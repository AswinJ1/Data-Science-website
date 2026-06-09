import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recaptchaToken, ...formFields } = body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token is missing" }, { status: 400 });
    }
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(formFields);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    // Create notification for admin
    await prisma.notification.create({
      data: {
        type: "NEW_CONTACT",
        title: "New Contact Inquiry",
        message: `${parsed.data.firstName} ${parsed.data.lastName} (${parsed.data.email}) sent a contact inquiry`,
        link: "/admin/contacts",
      },
    });

    return NextResponse.json(
      { message: "Thank you! We'll get back to you soon.", id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
