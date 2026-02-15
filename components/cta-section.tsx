"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-dark text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-h2 mb-6">Ready to Transform Your Data?</h2>
        <p className="text-xl mb-8 text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Join hundreds of companies that have already unlocked the power of their data. Let's discuss how we can help
          you achieve your data goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
            Start Your Data Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary-dark bg-transparent"
          >
            Schedule a Consultation
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-300">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <span>+91 12345 67890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>info@syancy.com</span>
          </div>
        </div>
      </div>
    </section>
  )
}
