"use client"

import { Cog, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "Large-scale data cleaning and normalization",
  "Automated data transformation workflows",
  "High-performance batch and stream processing",
  "Data format conversion and standardization",
  "Deduplication and record matching",
  "Custom aggregation and summarization",
]

export default function DataCrunchingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cog className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Crunching</h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Transform raw data into structured, clean datasets ready for analysis and machine learning applications.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We take your messy, unstructured data and turn it into analysis-ready datasets. Our data crunching
              services handle billions of records with precision — cleaning, transforming, and enriching your data for downstream use.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-3">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Garbage in, garbage out. Before any analysis or model can deliver value, the underlying data
                must be clean and consistent. We ensure your data meets the highest quality standards.
              </p>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 w-full">
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
