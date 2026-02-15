"use client"

import { Brain, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "Machine learning model development and deployment",
  "Natural language processing (NLP)",
  "Computer vision and image recognition",
  "Recommendation systems",
  "Predictive analytics and forecasting",
  "MLOps and model monitoring",
]

export default function DataSciencePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Science</h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Leverage machine learning and AI to predict trends, automate decisions, and drive business growth.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our data scientists build intelligent systems that learn from your data. From predictive models to
              deep learning solutions, we bring cutting-edge AI capabilities to solve your most complex business challenges.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-3">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                AI is no longer optional — it is the key differentiator. We help you harness the power of
                machine learning to automate processes, predict outcomes, and unlock new revenue streams.
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700 w-full">
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
