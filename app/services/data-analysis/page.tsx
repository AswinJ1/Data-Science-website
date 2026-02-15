"use client"

import { BarChart3, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "Exploratory data analysis (EDA)",
  "Statistical modeling and hypothesis testing",
  "Interactive dashboards and visualizations",
  "Trend analysis and forecasting",
  "KPI tracking and performance reporting",
  "A/B testing and experimentation frameworks",
]

export default function DataAnalysisPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Analysis</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Extract meaningful insights from your data through statistical analysis and advanced visualization techniques.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our analysts dig into your data to uncover the stories hidden within. From executive
              dashboards to deep statistical analyses, we translate numbers into clear, actionable insights that drive decisions.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-3">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Data without analysis is just noise. We help you understand what happened, why
                it happened, and what to do next — turning raw numbers into a competitive advantage.
              </p>
              <Button asChild className="bg-teal-600 hover:bg-teal-700 w-full">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
