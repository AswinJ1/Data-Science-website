"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { DataEngineeringIllustration } from "@/components/illustrations"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

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
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-4 text-center"
        >
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-6">
            <DataEngineeringIllustration className="w-full h-full drop-shadow-lg" />
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-4">Data Engineering</motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-blue-100 max-w-2xl mx-auto">
            Build robust data pipelines and infrastructure to collect, process, and store your data efficiently at scale.
          </motion.p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our data engineering team designs and builds the foundation your data strategy needs. We create
              reliable, scalable pipelines that move data from source to insight — ensuring quality, speed, and cost efficiency at every step.
            </p>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-3"
            >
              {features.map((f, i) => (
                <motion.li key={f} variants={fadeInUp} className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-blue-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span className="text-gray-700">{f}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
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
          </motion.div>
        </div>
      </section>
    </main>
  )
}
