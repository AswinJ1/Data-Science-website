"use client";

import { ArrowRight, Phone, Mail } from "lucide-react";
import Link from "next/link";
import ShapeGrid from "./ShapeGrid";

export default function CTASection() {
  return (
    <section className="py-20 bg-white text-gray-900 border-t border-gray-100 relative overflow-hidden">
      {/* Light ShapeGrid Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(0, 0, 0, 0.08)"
          hoverFillColor="rgba(59, 130, 246, 0.15)"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl  text-gray-900 tracking-tight">
          Ready to Unlock the Full Potential of Your Data?
        </h2>

        {/* Subtitle (Justified) */}
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-justify font-normal">
          Join leading enterprise clients and institutions who leverage Syancy’s advanced analytics and AI frameworks to drive impactful decision-making.
        </p>

        {/* Action Button */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md text-sm inline-flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <span>Start Your Data Journey</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Hyperlinked Contact Info */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-700 font-normal">
          <a
            href="tel:+919623601286"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Phone className="h-4 w-4 text-blue-600" />
            <span>+91 96236 01286</span>
          </a>
          <span className="hidden sm:inline text-gray-300">|</span>
          <a
            href="mailto:info@syancy.com"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Mail className="h-4 w-4 text-blue-600" />
            <span>info@syancy.com</span>
          </a>
        </div>

      </div>
    </section>
  );
}
