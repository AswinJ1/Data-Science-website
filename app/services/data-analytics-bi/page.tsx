"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

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
  "Interactive dashboard development",
  "KPI tracking systems",
  "BI tool integration (Power BI, Tableau)",
  "Reporting automation",
  "Executive analytics frameworks",
]

export default function DataAnalyticsBiPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/85 via-rose-900/80 to-slate-900/75" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-8">
            <AnalyticsBiIllustration className="w-full h-full drop-shadow-xl" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-tight tracking-tight"
          >
            Data Analytics &amp; BI
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Turn raw data into actionable dashboards and strategic intelligence.
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We build powerful analytics and business intelligence solutions that turn complex data into clear, actionable insights — from interactive dashboards to automated executive reporting.
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
                  className="flex items-start gap-3 border-l-2 border-rose-500 pl-4 py-0.5"
                >
                  <span className="text-sm font-bold text-rose-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span className="text-gray-700 font-medium">{f}</span>
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Data-driven decisions improve efficiency, forecasting accuracy, and revenue growth.
              </p>
              <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white w-full py-3 rounded-lg transition duration-300">
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

function AnalyticsBiIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="15" width="160" height="110" rx="8" fill="#FFF1F2" stroke="#E11D48" strokeWidth="2" />
      <rect x="20" y="15" width="160" height="20" rx="8" fill="#E11D48" />
      <rect x="20" y="27" width="160" height="8" fill="#E11D48" />
      <circle cx="33" cy="25" r="3" fill="#FECDD3" />
      <circle cx="43" cy="25" r="3" fill="#FECDD3" />
      <circle cx="53" cy="25" r="3" fill="#FECDD3" />
      <rect x="30" y="45" width="55" height="35" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <rect x="36" y="68" width="8" height="8" rx="1" fill="#E11D48" />
      <rect x="48" y="62" width="8" height="14" rx="1" fill="#E11D48" opacity="0.7" />
      <rect x="60" y="55" width="8" height="21" rx="1" fill="#E11D48" opacity="0.5" />
      <rect x="72" y="58" width="8" height="18" rx="1" fill="#E11D48" opacity="0.8" />
      <rect x="95" y="45" width="75" height="35" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <polyline points="102,72 115,60 128,65 140,52 155,58 163,48" stroke="#E11D48" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="155" cy="58" r="3" fill="#E11D48" />
      <rect x="30" y="90" width="40" height="25" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <circle cx="50" cy="102" r="10" fill="none" stroke="#E11D48" strokeWidth="3" />
      <path d="M50 102 L50 92 A10 10 0 0 1 59 99 Z" fill="#E11D48" />
      <rect x="80" y="90" width="90" height="25" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <rect x="88" y="97" width="30" height="4" rx="1" fill="#E11D48" opacity="0.6" />
      <rect x="88" y="105" width="50" height="4" rx="1" fill="#E11D48" opacity="0.3" />
      <polygon points="162,93 166,86 170,93" fill="#22C55E" />
      <line x1="166" y1="86" x2="166" y2="98" stroke="#22C55E" strokeWidth="2" />
    </svg>
  )
}
