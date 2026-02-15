"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import {
  HealthcareIllustration,
  FinanceIllustration,
  RetailIllustration,
  ManufacturingIllustration,
  EnergyIllustration,
  GenericSolutionIllustration,
} from "@/components/illustrations"

const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } }
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

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

// Fallback static data for known industry solution pages
const fallbackSolutions: Record<string, Omit<Solution, "id">> = {
  healthcare: {
    title: "Healthcare Data Solutions",
    slug: "healthcare",
    industry: "Healthcare",
    icon: "Heart",
    description:
      "Leverage AI-powered diagnostics and patient analytics to improve outcomes, reduce costs, and streamline operations across your healthcare organization. Our solutions range from predictive patient risk scoring to clinical workflow optimization, helping hospitals and clinics deliver better care through data-driven insights.",
    features: [
      "Predictive patient risk scoring & early warning systems",
      "Clinical NLP for unstructured medical records",
      "Hospital readmission reduction models",
      "Drug interaction & adverse event detection",
      "Medical image analysis with deep learning",
      "Population health management dashboards",
      "Patient journey mapping & optimization",
      "HIPAA-compliant data pipeline infrastructure",
    ],
  },
  finance: {
    title: "Finance Data Solutions",
    slug: "finance",
    industry: "Finance",
    icon: "DollarSign",
    description:
      "Build robust risk models, detect fraudulent transactions in real time, and unlock deeper customer insights with our finance-focused data science solutions. From credit scoring to algorithmic trading analytics, we help financial institutions make smarter, faster decisions.",
    features: [
      "Real-time fraud detection & prevention",
      "Credit risk scoring & modeling",
      "Anti-money laundering (AML) analytics",
      "Customer lifetime value prediction",
      "Algorithmic trading signal analysis",
      "Regulatory compliance reporting automation",
      "Portfolio risk & optimization dashboards",
      "Churn prediction for banking customers",
    ],
  },
  "retail-e-commerce": {
    title: "Retail & E-Commerce Data Solutions",
    slug: "retail-e-commerce",
    industry: "Retail & E-Commerce",
    icon: "ShoppingCart",
    description:
      "Transform your retail operations with advanced customer segmentation, demand forecasting, and personalized recommendation engines. Our solutions help e-commerce and brick-and-mortar businesses increase revenue, optimize inventory, and deliver exceptional customer experiences.",
    features: [
      "Customer segmentation & persona modeling",
      "Demand forecasting & inventory optimization",
      "Personalized product recommendation engines",
      "Dynamic pricing & promotion analytics",
      "Market basket analysis",
      "Supply chain optimization",
      "Customer sentiment & review analysis",
      "Omnichannel attribution modeling",
    ],
  },
  manufacturing: {
    title: "Manufacturing Data Solutions",
    slug: "manufacturing",
    industry: "Manufacturing",
    icon: "Factory",
    description:
      "Optimize your manufacturing processes with predictive maintenance, quality control analytics, and supply chain intelligence. Our data solutions help reduce downtime, minimize defects, and improve overall equipment effectiveness across your production lines.",
    features: [
      "Predictive maintenance & failure forecasting",
      "Real-time quality control anomaly detection",
      "Supply chain risk & disruption analytics",
      "Production schedule optimization",
      "Energy consumption analytics & reduction",
      "Digital twin simulation & modeling",
      "Yield optimization with ML models",
      "Automated root cause analysis",
    ],
  },
  energy: {
    title: "Energy Data Solutions",
    slug: "energy",
    industry: "Energy",
    icon: "Zap",
    description:
      "Drive efficiency and sustainability in energy operations with smart grid analytics, consumption forecasting, and renewable energy optimization. Our solutions help energy companies reduce waste, predict demand, and transition to cleaner operations.",
    features: [
      "Smart grid analytics & load balancing",
      "Energy consumption forecasting",
      "Renewable energy output prediction",
      "Predictive maintenance for infrastructure",
      "Carbon footprint tracking & optimization",
      "Real-time outage detection & response",
      "Customer usage pattern analysis",
      "Regulatory compliance & emissions reporting",
    ],
  },
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
        // Try to find by exact slug match
        const found = data.find((s) => s.slug === slug)
        if (found) {
          setSolution(found)
        } else {
          // Try matching by industry name (case-insensitive)
          const byIndustry = data.find(
            (s) => s.industry.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug ||
                   s.industry.toLowerCase() === (slug as string).replace(/-/g, " ")
          )
          if (byIndustry) {
            setSolution(byIndustry)
          } else {
            // Use fallback static data for known slugs
            const fallback = fallbackSolutions[slug as string]
            if (fallback) {
              setSolution({ id: `static-${slug}`, ...fallback })
            } else {
              router.push("/solutions")
            }
          }
        }
      })
      .catch(() => {
        // Even on network error, try fallback data
        const fallback = fallbackSolutions[slug as string]
        if (fallback) {
          setSolution({ id: `static-${slug}`, ...fallback })
        } else {
          router.push("/solutions")
        }
      })
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

  const IllustrationComponent = illustrationMap[solution.icon || ""] || GenericSolutionIllustration

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            All Solutions
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="mb-4">
                <Badge className="bg-blue-500">{solution.industry}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{solution.title}</h1>
            </div>
            <div className="w-48 h-36 flex-shrink-0">
              <IllustrationComponent className="w-full h-full drop-shadow-lg" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Card className="mb-8">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {solution.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <Card className="mb-8">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Key Capabilities</h2>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-4"
              >
                {solution.features.map((feature, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3 p-4">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center"
        >
          <h3 className="text-xl font-bold mb-3">
            Ready to transform your {solution.industry.toLowerCase()} operations?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Let&apos;s discuss how our solutions can address your specific challenges.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </section>
    </main>
  )
}
