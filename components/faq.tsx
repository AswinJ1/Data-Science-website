"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

const faqs = [
  {
    question: "What types of data science services do you offer?",
    answer:
      "We offer a full spectrum of data science services including data engineering & pipeline development, data analysis & visualization, machine learning model building, predictive analytics, natural language processing, computer vision, and end-to-end AI solution deployment. Each engagement is tailored to your specific business challenges.",
  },
  {
    question: "How long does a typical data science project take?",
    answer:
      "Project timelines vary based on complexity. A focused analytics project may take 4\u20136 weeks, while a full ML pipeline with model training and deployment typically spans 2\u20134 months. We begin every engagement with a discovery phase to scope requirements and set realistic milestones.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve healthcare, finance, retail & e-commerce, manufacturing, and energy sectors, among others. Our team has deep domain expertise in each area, enabling us to deliver solutions that address industry-specific challenges like HIPAA compliance, fraud detection, demand forecasting, and predictive maintenance.",
  },
  {
    question: "Do you work with our existing data infrastructure?",
    answer:
      "Absolutely. We integrate with your current tech stack \u2014 whether that\u2019s cloud platforms like AWS, Azure, or GCP, data warehouses like Snowflake or BigQuery, or on-premise databases. We can also help modernize legacy systems and build scalable data pipelines from scratch.",
  },
  {
    question: "How do you ensure data privacy and security?",
    answer:
      "Data security is a top priority. We follow industry best practices including encryption at rest and in transit, role-based access controls, anonymization techniques, and compliance with regulations like GDPR and HIPAA. We can sign NDAs and work within your security protocols.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing including project-based fixed quotes, monthly retainers for ongoing partnerships, and dedicated team models. During the initial consultation, we\u2019ll understand your needs and recommend the most cost-effective approach for your budget and goals.",
  },
];

export default function FAQSection() {
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast.error("Please enter your question.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/faq-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), email: email.trim() || null }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      toast.success("Your question has been submitted! We'll get back to you soon.");
      setQuestion("");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-black py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-center md:text-left mb-2 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center md:text-left mb-8">
            Everything you need to know about our data science services.
          </p>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem value={`faq-${index}`} key={index}>
                <AccordionTrigger className="text-left text-gray-800 dark:text-gray-100 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex justify-center md:justify-start w-full mb-6">
            <Image
              src="/question.png"
              alt="FAQ Illustration"
              width={300}
              height={300}
              className="w-60 md:w-72 h-auto"
            />
          </div>
          <h3 className="text-lg font-light mb-2 text-center md:text-left dark:text-white">
            Ask Any Question
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center md:text-left mb-4">
            Can&apos;t find the answer you&apos;re looking for? Submit your question and our team will respond.
          </p>

          <input
            type="email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-3 bg-white dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
          />
          <textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-6 rounded-none transition"
          >
            {submitting ? "Submitting..." : "Submit Now"}
          </button>
        </div>
      </div>
    </section>
  );
}
