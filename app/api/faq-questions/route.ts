import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, email } = body;

    if (!question || typeof question !== "string" || question.trim().length < 5) {
      return NextResponse.json(
        { error: "Please enter a question (at least 5 characters)." },
        { status: 400 }
      );
    }

    if (email && typeof email === "string" && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    const faqQuestion = await prisma.faqQuestion.create({
      data: {
        question: question.trim(),
        email: email?.trim() || null,
      },
    });

    // Create notification for admin
    await prisma.notification.create({
      data: {
        type: "NEW_FAQ_QUESTION",
        title: "New FAQ Question",
        message: `Someone asked: "${question.trim().slice(0, 80)}${question.trim().length > 80 ? "..." : ""}"`,
        link: "/admin/faq-questions",
      },
    });

    return NextResponse.json(
      { message: "Question submitted successfully!", id: faqQuestion.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("FAQ question submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
