"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

const ParticlesBackground = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 w-full h-full pointer-events-none"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 160, links: { opacity: 0.5 } },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 130,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            outModes: { default: "bounce" },
          },
          number: { value: 80, density: { enable: true, width: 900, height: 900 } },
          opacity: { value: { min: 0.2, max: 0.7 }, animation: { enable: true, speed: 0.6 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3.5 } },
        },
        detectRetina: true,
      }}
    />
  )
}

const TextRotator = () => {
  const texts = [
    "Actionable Insights",
    "Business Intelligence", 
    "Strategic Decisions",
    "Growth Opportunities"
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, 2500)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block whitespace-nowrap">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-yellow-300 inline-block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function HeroSection() {
  return (
    <section className="pt-16 pb-12 min-h-screen flex items-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a3fa8 0%, #1e56c8 50%, #1a4ab5 100%)" }}>
      <ParticlesBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:pr-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your Data into{""}
              <TextRotator />
            </h1>
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              Unlock the power of your data with our comprehensive suite of data engineering, analytics, and machine
              learning solutions. Drive growth through intelligent data strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold transition-colors rounded-none shadow-lg" asChild>
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="border-primary-bright text-primary-bright hover:bg-primary-bright hover:text-white bg-transparent rounded-none"
                asChild
              >
                <Link href="/contact">
                  Submit Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button> */}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <motion.div 
              className="relative z-10"
              animate={{ y: [0, -15, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            >
              <Image
                src="/hero.png"
                alt="Data Flow Illustration"
                width={400}
                height={300}
                className="w-full h-auto"
                priority
              />
            </motion.div>
            {/* Floating elements */}
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-12 h-12 bg-white/10 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}