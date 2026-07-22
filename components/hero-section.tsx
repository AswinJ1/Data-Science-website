"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { TextRotate } from "@/components/ui/text-rotate";

const ParticlesBackground = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
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
            grab: { distance: 160, links: { opacity: 0.4 } },
          },
        },
        particles: {
          color: { value: "#3b82f6" },
          links: {
            color: "#3b82f6",
            distance: 130,
            enable: true,
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            outModes: { default: "bounce" },
          },
          number: { value: 65, density: { enable: true, width: 900, height: 900 } },
          opacity: { value: { min: 0.2, max: 0.6 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
};

function FullBleedRightVideoMask() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    "/blob-video/video-1.mp4",
    "/blob-video/video-2.mp4",
    "/blob-video/video-3.mp4",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      <div
        className="w-full h-full relative"
        style={{
          clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
          WebkitClipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        {videos.map((src, index) => (
          <video
            key={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={src}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Sharp Blue Border Accent Line */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-500 z-20" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-white overflow-hidden font-sans border-b border-gray-100 p-0 m-0">
      <ParticlesBackground />

      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-12 items-center">
          
          {/* Left Column: Text & CTA inside max-w container */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 px-6 sm:px-12 lg:px-16 py-12 lg:py-20 space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl  text-gray-900 leading-[1.12]">
              Transform Your Data into{" "}
              <span className="block text-blue-600  pt-1">
                <TextRotate
                  texts={[
                    "Actionable Insights",
                    "Business Intelligence",
                    "Strategic Decisions",
                    "Growth Opportunities",
                  ]}
                  mainClassName="text-blue-600  overflow-visible"
                  staggerFrom="last"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.025}
                  splitBy="words"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </span>
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed text-justify max-w-xl">
              Unlock the power of your data with our comprehensive suite of data engineering, analytics, and machine learning solutions. Drive growth through intelligent data strategies.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-950  text-white  shadow-lg rounded-none"
                asChild
              >
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Full Bleed touching navbar top and screen right edge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-6 h-[450px] sm:h-[550px] lg:h-[650px] w-full"
          >
            <FullBleedRightVideoMask />
          </motion.div>

        </div>
      </div>
    </section>
  );
}