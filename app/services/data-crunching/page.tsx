"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { DataCrunchingIllustration } from "@/components/illustrations"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

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
      {/* ── Hero Section ── */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/85 via-indigo-900/80 to-slate-900/75" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-8">
            <DataCrunchingIllustration className="w-full h-full drop-shadow-xl" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-tight tracking-tight"
          >
            Data Crunching
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Transform raw data into structured, clean datasets ready for analysis and machine learning applications.
          </motion.p>
        </motion.div>
      </section>

      {/* ── What We Offer + Why It Matters ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — What We Offer */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We take your messy, unstructured data and turn it into analysis-ready datasets. Our data crunching
              services handle billions of records with precision — cleaning, transforming, and enriching your data for downstream use.
            </p>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  variants={fadeInUp}
                  className="flex items-start gap-3 border-l-2 border-indigo-500 pl-4 py-0.5"
                >
                  <span className="text-sm font-bold text-indigo-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span className="text-gray-700 font-medium">{f}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right — Why It Matters */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Garbage in, garbage out. Before any analysis or model can deliver value, the underlying data
                must be clean and consistent. We ensure your data meets the highest quality standards.
              </p>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-lg transition duration-300">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
