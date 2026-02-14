"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"

interface Solution {
  id: string
  title: string
  slug: string
  industry: string
  description: string
  icon: string | null
  features: string[]
}

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [solution, setSolution] = useState<Solution | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/solutions")
      .then((res) => res.json())
      .then((data: Solution[]) => {
        const found = data.find((s) => s.slug === slug)
        if (found) setSolution(found)
        else router.push("/solutions")
      })
      .catch(() => router.push("/solutions"))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!solution) return null

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All Solutions
          </Link>
          <Badge className="bg-blue-500 mb-4">{solution.industry}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{solution.title}</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {solution.description}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">Key Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {solution.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h3 className="text-xl font-bold mb-3">
            Ready to transform your {solution.industry.toLowerCase()} operations?
          </h3>
          <p className="text-gray-600 mb-6">
            Let&apos;s discuss how our solutions can address your specific challenges.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
