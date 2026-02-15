"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { DataScienceIllustration } from "@/components/illustrations"

const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } }
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeInLeft = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } } }
const fadeInRight = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } } }

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
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20 overflow-hidden">
        <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-5xl mx-auto px-4 text-center">
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-6">
            <DataScienceIllustration className="w-full h-full drop-shadow-lg" />
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-4">Data Science</motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-purple-100 max-w-2xl mx-auto">
            Leverage machine learning and AI to predict trends, automate decisions, and drive business growth.
          </motion.p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeInLeft}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our data scientists build intelligent systems that learn from your data. From predictive models to
              deep learning solutions, we bring cutting-edge AI capabilities to solve your most complex business challenges.
            </p>
            <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="space-y-3">
              {features.map((f, i) => (
                <motion.li key={f} variants={fadeInUp} className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-purple-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span className="text-gray-700">{f}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeInRight}>
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
          </motion.div>
        </div>
      </section>
    </main>
  )
}
