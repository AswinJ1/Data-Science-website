"use client"

import { Database, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "ETL/ELT pipeline design and implementation",
  "Real-time and batch data processing",
  "Data warehouse and data lake architecture",
  "Cloud-native data infrastructure (AWS, GCP, Azure)",
  "Data quality monitoring and governance",
  "Scalable storage and compute optimization",
]

export default function DataEngineeringPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Database className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Engineering</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Build robust data pipelines and infrastructure to collect, process, and store your data efficiently at scale.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our data engineering team designs and builds the foundation your data strategy needs. We create
              reliable, scalable pipelines that move data from source to insight — ensuring quality, speed, and cost efficiency at every step.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-3">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Without a solid data engineering foundation, analytics and ML initiatives fail. We ensure
                your data is clean, accessible, and ready for action — so your team can focus on insights, not infrastructure.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
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
