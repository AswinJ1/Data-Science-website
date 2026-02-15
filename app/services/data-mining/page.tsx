"use client"

import { Search, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "Pattern recognition and anomaly detection",
  "Association rule mining",
  "Clustering and segmentation analysis",
  "Text mining and sentiment analysis",
  "Web scraping and data extraction",
  "Knowledge discovery from unstructured sources",
]

export default function DataMiningPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Mining</h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto">
            Discover hidden patterns and relationships in large datasets to uncover valuable business intelligence.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We sift through massive datasets to find the signals in the noise. Our data mining experts use
              advanced algorithms to discover patterns, correlations, and anomalies that traditional analysis misses.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-3">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your data holds insights you have not yet imagined. Data mining reveals the hidden
                opportunities and risks buried in your datasets — giving you the edge before your competitors find them.
              </p>
              <Button asChild className="bg-amber-600 hover:bg-amber-700 w-full">
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
