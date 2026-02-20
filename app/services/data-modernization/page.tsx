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
  "Cloud data warehouse implementation",
  "Legacy database modernization",
  "Data lake architecture design",
  "Performance optimization",
  "Automation and orchestration",
]

export default function DataModernizationPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/85 via-sky-900/80 to-slate-900/75" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-8">
            <DataModernizationIllustration className="w-full h-full drop-shadow-xl" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-tight tracking-tight"
          >
            Data Modernization
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Upgrade legacy data infrastructure to scalable, cloud-native architectures.
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
              We help organizations transition from outdated data systems to modern, cloud-native platforms — improving speed, scalability, and cost efficiency while preserving data integrity and business continuity.
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
                  className="flex items-start gap-3 border-l-2 border-sky-500 pl-4 py-0.5"
                >
                  <span className="text-sm font-bold text-sky-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
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
                Outdated systems limit growth. Modern architectures improve speed, scalability, and cost efficiency.
              </p>
              <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white w-full py-3 rounded-lg transition duration-300">
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

function DataModernizationIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="15" y="50" width="55" height="70" rx="4" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
      <rect x="25" y="62" width="35" height="5" rx="1.5" fill="#0284C7" opacity="0.4" />
      <rect x="25" y="73" width="35" height="5" rx="1.5" fill="#0284C7" opacity="0.3" />
      <rect x="25" y="84" width="35" height="5" rx="1.5" fill="#0284C7" opacity="0.2" />
      <line x1="15" y1="100" x2="70" y2="100" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" />
      <text x="42" y="115" textAnchor="middle" fill="#0284C7" fontSize="8" fontWeight="600">LEGACY</text>
      <path d="M75 80 Q100 55 125 80" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <polygon points="128,78 122,73 122,83" fill="#0284C7" />
      <path d="M93 62 L100 55 L107 62" stroke="#0EA5E9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="130" y="45" width="55" height="75" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <circle cx="157" cy="68" r="14" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M150 68 Q157 58 164 68" stroke="#0284C7" strokeWidth="1.5" fill="none" />
      <circle cx="157" cy="63" r="3" fill="#0284C7" />
      <rect x="142" y="90" width="30" height="5" rx="2" fill="#0284C7" opacity="0.5" />
      <rect x="145" y="100" width="24" height="5" rx="2" fill="#0284C7" opacity="0.3" />
      <text x="157" y="117" textAnchor="middle" fill="#0284C7" fontSize="8" fontWeight="600">CLOUD</text>
    </svg>
  )
}
