"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { GenericSolutionIllustration } from "@/components/illustrations"

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
  "Legacy system data extraction and transformation",
  "Secure database migration (on-prem to cloud)",
  "ETL/ELT-based migration workflows",
  "Schema mapping and validation",
  "Data quality checks and reconciliation",
]

export default function DataMigrationPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/85 via-cyan-900/80 to-slate-900/75" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-8">
            <DataMigrationIllustration className="w-full h-full drop-shadow-xl" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-tight tracking-tight"
          >
            Data Migration
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Seamlessly transfer data across platforms with zero disruption and full integrity.
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
              Our migration specialists ensure your data moves safely between systems — on-prem to cloud, legacy to modern, or across platforms — with full integrity, minimal downtime, and zero data loss.
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
                  className="flex items-start gap-3 border-l-2 border-cyan-500 pl-4 py-0.5"
                >
                  <span className="text-sm font-bold text-cyan-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
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
                Poorly executed migrations cause downtime, data loss, and compliance risks. We ensure smooth, secure transitions without operational impact.
              </p>
              <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-3 rounded-lg transition duration-300">
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

function DataMigrationIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="15" y="40" width="60" height="80" rx="6" fill="#E0F2FE" stroke="#0891B2" strokeWidth="2" />
      <rect x="25" y="55" width="40" height="6" rx="2" fill="#06B6D4" />
      <rect x="25" y="67" width="40" height="6" rx="2" fill="#06B6D4" opacity="0.6" />
      <rect x="25" y="79" width="40" height="6" rx="2" fill="#06B6D4" opacity="0.4" />
      <rect x="125" y="40" width="60" height="80" rx="6" fill="#ECFEFF" stroke="#0891B2" strokeWidth="2" />
      <circle cx="155" cy="65" r="12" fill="#06B6D4" opacity="0.2" />
      <circle cx="155" cy="65" r="6" fill="#06B6D4" />
      <rect x="140" y="85" width="30" height="6" rx="2" fill="#06B6D4" opacity="0.5" />
      <rect x="140" y="97" width="30" height="6" rx="2" fill="#06B6D4" opacity="0.3" />
      <path d="M80 70 L115 70" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 4" />
      <polygon points="118,70 110,64 110,76" fill="#0891B2" />
      <path d="M80 90 L115 90" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 4" />
      <polygon points="118,90 110,84 110,96" fill="#0891B2" />
      <circle cx="97" cy="80" r="8" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5" />
      <path d="M94 80 L97 83 L101 77" stroke="#0891B2" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
