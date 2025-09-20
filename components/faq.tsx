"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I update my billing information?",
    answer:
      "To update your billing information, log in and go to the billing or payment page. Look for an option to 'Update payment method' or 'Edit billing information' and follow the prompts. Be sure to save your changes before exiting.",
  },
  { question: "How do I delete my account?", answer: "" },
  { question: "How do I join a group or community?", answer: "" },
  { question: "How can I contact customer support?", answer: "" },
  { question: "Which is better short term or long term?", answer: "" },
  { question: "How do I change my email address?", answer: "" },
];

export default function FAQSection() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-center md:text-left mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-center md:text-left mb-8">
            Trusted in more than 100 countries and 5 million customers.
          </p>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem value={`faq-${index}`} key={index}>
                <AccordionTrigger className="text-left text-gray-800 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm">
                  {faq.answer || (
                    <span className="italic text-gray-400">Coming soon...</span>
                  )}
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
          <h3 className="text-lg font-light mb-2 text-center md:text-left">
            Ask Any Question
          </h3>
          <p className="text-gray-500 text-center md:text-left mb-4">
            Feel free to ask any question you have; we’re here to help!
          </p>

          <textarea
            placeholder="write here..."
            className="w-full border rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
          <button className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
            Submit Now
          </button>
        </div>
      </div>
    </section>
  );
}
