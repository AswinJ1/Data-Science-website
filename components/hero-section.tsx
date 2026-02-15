"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { HTMLProps, useState, useEffect } from 'react'

interface BackgroundGridProps {
  color: string
  cellSize: string | number
  strokeWidth: number | string
  className?: string
  fade?: boolean
}

const BackgroundGrid = ({
  color = '#fb3a5d',
  cellSize = '25px',
  strokeWidth = '3px',
  className,
  fade = true,
  ...props
}: Partial<BackgroundGridProps> & HTMLProps<HTMLDivElement>) => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' stroke='${color}' stroke-width='${strokeWidth}' fill-opacity='0.4' >
      <path d='M 100 0 L 100 200'/>
      <path d='M 0 100 L 200 100'/>
    </svg>
  `
  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  
  return (
    <div
      className={`pointer-events-none absolute inset-0 left-0 top-0 flex h-full w-full ${className}`}
      style={{
        backgroundImage: `url("${svgDataUrl}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: cellSize,
        maskImage: fade
          ? `radial-gradient(ellipse at top, white, transparent 70%)`
          : undefined,
        WebkitMaskImage: fade
          ? `radial-gradient(ellipse at top, white, transparent 70%)`
          : undefined,
      }}
      {...props}
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
          className="text-primary-bright inline-block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function HeroSection() {
  return (
    <section className="pt-16 pb-12 bg-gradient-hero min-h-screen flex items-center relative">
      <BackgroundGrid />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:pr-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-6 leading-tight">
              Transform Your Data into{""}
              <TextRotator />
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Unlock the power of your data with our comprehensive suite of data engineering, analytics, and machine
              learning solutions. Drive growth through intelligent data strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity text-white rounded-none" asChild>
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