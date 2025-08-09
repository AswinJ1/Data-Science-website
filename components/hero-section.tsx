"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 bg-gradient-hero min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-hero text-primary-dark mb-6 leading-tight">
              Transform Your Data into
              <span className="text-primary-bright"> Actionable Insights</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Unlock the power of your data with our comprehensive suite of data engineering, analytics, and machine
              learning solutions. Drive growth through intelligent data strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-bright text-primary-bright hover:bg-primary-bright hover:text-white bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                See Our Work
              </Button>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="relative z-10">
              <svg viewBox="0 0 400 300" className="w-full h-auto">
                {/* Data Flow Illustration */}
                <defs>
                  <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0A2463" />
                    <stop offset="100%" stopColor="#3E92CC" />
                  </linearGradient>
                </defs>

                {/* Background circles */}
                <circle cx="100" cy="80" r="40" fill="url(#dataGradient)" opacity="0.1" />
                <circle cx="300" cy="120" r="60" fill="url(#dataGradient)" opacity="0.1" />
                <circle cx="200" cy="200" r="35" fill="url(#dataGradient)" opacity="0.1" />

                {/* Data nodes */}
                <circle cx="80" cy="80" r="8" fill="#3E92CC" />
                <circle cx="200" cy="60" r="10" fill="#0A2463" />
                <circle cx="320" cy="100" r="8" fill="#FF6B6B" />
                <circle cx="150" cy="150" r="12" fill="#3E92CC" />
                <circle cx="280" cy="180" r="8" fill="#0A2463" />
                <circle cx="120" cy="220" r="10" fill="#FF6B6B" />

                {/* Connecting lines */}
                <path d="M 80 80 Q 140 70 200 60" stroke="#3E92CC" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M 200 60 Q 260 80 320 100" stroke="#0A2463" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M 150 150 Q 215 165 280 180" stroke="#3E92CC" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M 120 220 Q 135 185 150 150" stroke="#FF6B6B" strokeWidth="2" fill="none" opacity="0.6" />

                {/* Dashboard representation */}
                <rect x="250" y="40" width="80" height="50" rx="8" fill="white" stroke="#0A2463" strokeWidth="2" />
                <rect x="260" y="50" width="60" height="8" rx="4" fill="#3E92CC" />
                <rect x="260" y="65" width="40" height="6" rx="3" fill="#FF6B6B" />
                <rect x="260" y="75" width="50" height="6" rx="3" fill="#0A2463" />
              </svg>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-primary-bright/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-12 h-12 bg-accent/10 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
