"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechFlow Inc.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "DataFlow transformed our entire data infrastructure. Their expertise in data engineering helped us scale from handling thousands to millions of records seamlessly.",
  },
  {
    name: "Michael Chen",
    role: "Head of Analytics",
    company: "RetailCorp",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "The insights we gained from their data science solutions directly contributed to a 35% increase in revenue. Outstanding work and exceptional team.",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Operations",
    company: "LogiFlow",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "Their supply chain analytics platform revolutionized our operations. We now have real-time visibility and predictive capabilities we never thought possible.",
  },
  {
    name: "David Park",
    role: "Chief Data Officer",
    company: "FinanceFirst",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "DataFlow's team delivered beyond expectations. Their data mining techniques uncovered patterns that led to significant cost savings and improved decision-making.",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 text-primary-dark mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what industry leaders say about our work.
          </p>
        </div>

        <div className="relative">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-primary-dark text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                  <div className="text-primary-bright font-medium">{testimonials[currentIndex].company}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-primary-dark" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-primary-dark" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary-bright" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
