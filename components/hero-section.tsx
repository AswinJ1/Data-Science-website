"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 bg-gradient-hero min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-hero text-primary-dark mb-6 leading-tight">
              Transform Your Data into
              <span className="text-primary-bright"> Actionable Insights</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Unlock the power of your data with our comprehensive suite of data engineering, analytics, and machine
              learning solutions. Drive growth through intelligent data strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-bright text-primary-bright hover:bg-primary-bright hover:text-white bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                See Our Work
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <Image
                src="/hero.png"
                alt="Data Flow Illustration"
                width={400}
                height={300}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Floating elements */}
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 bg-primary-bright/10 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-12 h-12 bg-accent/10 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
