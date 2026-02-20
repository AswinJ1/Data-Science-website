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
  "GIS data analysis",
  "Geospatial visualization dashboards",
  "Location intelligence solutions",
  "Spatial clustering and mapping",
  "Satellite and remote sensing data processing",
]

export default function GeospatialDataServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/85 via-emerald-900/80 to-slate-900/75" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-8">
            <GeospatialIllustration className="w-full h-full drop-shadow-xl" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-tight tracking-tight"
          >
            Geospatial Data Services
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Leverage spatial intelligence for location-based insights and strategic planning.
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
              Our geospatial team transforms location data into strategic intelligence. From satellite imagery processing to interactive mapping dashboards, we help you see your data in a whole new dimension.
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
                  className="flex items-start gap-3 border-l-2 border-emerald-500 pl-4 py-0.5"
                >
                  <span className="text-sm font-bold text-emerald-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
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
                Geospatial insights drive smarter urban planning, logistics, and infrastructure development.
              </p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3 rounded-lg transition duration-300">
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

function GeospatialIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="70" r="45" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      <ellipse cx="100" cy="70" rx="45" ry="18" stroke="#059669" strokeWidth="1.5" fill="none" />
      <ellipse cx="100" cy="70" rx="18" ry="45" stroke="#059669" strokeWidth="1.5" fill="none" />
      <line x1="55" y1="70" x2="145" y2="70" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="100" y1="25" x2="100" y2="115" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="75" cy="50" r="6" fill="#10B981" opacity="0.8" />
      <circle cx="120" cy="55" r="5" fill="#10B981" opacity="0.6" />
      <circle cx="90" cy="85" r="7" fill="#10B981" opacity="0.7" />
      <circle cx="130" cy="80" r="4" fill="#10B981" opacity="0.5" />
      <path d="M100 30 L96 42 L104 42 Z" fill="#059669" />
      <circle cx="100" cy="26" r="4" fill="#059669" />
      <path d="M75 130 L72 138 L78 138 Z" fill="#059669" />
      <circle cx="75" cy="127" r="3" fill="#059669" />
      <path d="M135 125 L132 133 L138 133 Z" fill="#059669" />
      <circle cx="135" cy="122" r="3" fill="#059669" />
      <line x1="75" y1="50" x2="120" y2="55" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="120" y1="55" x2="90" y2="85" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="90" y1="85" x2="75" y2="50" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  )
}
