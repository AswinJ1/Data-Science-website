"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight, Loader2, Lightbulb,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  HealthcareIllustration,
  FinanceIllustration,
  RetailIllustration,
  ManufacturingIllustration,
  EnergyIllustration,
  GenericSolutionIllustration,
} from "@/components/illustrations"

const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
  Heart: HealthcareIllustration,
  DollarSign: FinanceIllustration,
  ShoppingCart: RetailIllustration,
  Factory: ManufacturingIllustration,
  Zap: EnergyIllustration,
  Lightbulb: GenericSolutionIllustration,
}

interface Solution {
  id: string
  title: string
  slug: string
  industry: string
  description: string
  icon: string | null
  features: string[]
}

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/solutions")
      .then((res) => res.json())
      .then((data) => setSolutions(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Industry Solutions</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Tailored data science solutions designed for the unique challenges of your industry.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : solutions.length === 0 ? (
          <div className="text-center py-20">
            <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Solutions coming soon</h3>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="space-y-8"
          >
            {solutions.map((solution, index) => {
              const IllustrationComponent = illustrationMap[solution.icon || ""] || GenericSolutionIllustration
              return (
                <motion.div key={solution.id} variants={fadeInUp}>
                  <Link href={`/solutions/${solution.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow group overflow-hidden">
                      <CardContent className="p-0">
                        <div className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                        <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
                          <IllustrationComponent className="w-40 h-32 mb-4" />
                          <Badge className="bg-blue-600">{solution.industry}</Badge>
                        </div>
                        <div className="md:w-2/3 p-4 sm:p-6 md:p-8">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors mb-3">
                            {solution.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {solution.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {solution.features.slice(0, 3).map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {solution.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{solution.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Learn More <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
              )
            })}
          </motion.div>
        )}
      </section>
    </main>
  )
}
