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
  "Custom ML model development",
  "Predictive analytics",
  "NLP and computer vision",
  "Model deployment and monitoring",
  "MLOps pipeline setup",
]

export default function AiMachineLearningPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/85 via-violet-900/80 to-slate-900/75" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div variants={fadeInUp} className="w-48 h-36 mx-auto mb-8">
            <AiMlIllustration className="w-full h-full drop-shadow-xl" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-tight tracking-tight"
          >
            AI &amp; Machine Learning
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Implement AI-driven solutions to automate processes and unlock predictive insights.
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
              Our AI and ML engineers build intelligent systems that learn, adapt, and predict. From custom model development to production-grade MLOps pipelines, we deliver AI solutions that create real business impact.
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
                  className="flex items-start gap-3 border-l-2 border-violet-500 pl-4 py-0.5"
                >
                  <span className="text-sm font-bold text-violet-600 mt-0.5 flex-shrink-0">{i + 1}.</span>
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
                AI creates competitive advantage by automating decisions and predicting outcomes in real time.
              </p>
              <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white w-full py-3 rounded-lg transition duration-300">
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

function AiMlIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="65" r="35" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="100" cy="65" r="18" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="100" cy="65" r="6" fill="#7C3AED" />
      <circle cx="70" cy="45" r="5" fill="#A78BFA" />
      <circle cx="130" cy="45" r="5" fill="#A78BFA" />
      <circle cx="70" cy="85" r="5" fill="#A78BFA" />
      <circle cx="130" cy="85" r="5" fill="#A78BFA" />
      <line x1="75" y1="48" x2="94" y2="60" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="125" y1="48" x2="106" y2="60" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="75" y1="82" x2="94" y2="70" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="125" y1="82" x2="106" y2="70" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="50" cy="35" r="4" fill="#C4B5FD" />
      <line x1="54" y1="37" x2="66" y2="43" stroke="#A78BFA" strokeWidth="1" />
      <circle cx="150" cy="35" r="4" fill="#C4B5FD" />
      <line x1="146" y1="37" x2="134" y2="43" stroke="#A78BFA" strokeWidth="1" />
      <circle cx="50" cy="95" r="4" fill="#C4B5FD" />
      <line x1="54" y1="93" x2="66" y2="87" stroke="#A78BFA" strokeWidth="1" />
      <circle cx="150" cy="95" r="4" fill="#C4B5FD" />
      <line x1="146" y1="93" x2="134" y2="87" stroke="#A78BFA" strokeWidth="1" />
      <rect x="55" y="115" width="90" height="22" rx="6" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1.5" />
      <rect x="62" y="122" width="12" height="8" rx="1" fill="#7C3AED" opacity="0.7" />
      <rect x="78" y="120" width="12" height="10" rx="1" fill="#7C3AED" opacity="0.5" />
      <rect x="94" y="118" width="12" height="12" rx="1" fill="#7C3AED" />
      <rect x="110" y="121" width="12" height="9" rx="1" fill="#7C3AED" opacity="0.6" />
      <rect x="126" y="123" width="12" height="7" rx="1" fill="#7C3AED" opacity="0.4" />
    </svg>
  )
}
