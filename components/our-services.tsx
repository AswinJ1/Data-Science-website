"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const leftFeatures = [
  {
    num: 1,
    title: "Data Engineering & Pipelines",
    desc: "Robust, automated data pipelines that move, transform, and deliver your data with precision - at any scale.",
    top: "6%",
    left: "5%",
    width: "27%",
    textDelay: 0.9
  },
  {
    num: 3,
    title: "Machine Learning & AI",
    desc: "Custom ML models and AI solutions engineered to turn your raw data into predictive intelligence that drives decisions.",
    top: "54%",
    left: "5%",
    width: "27%",
    textDelay: 1.3
  },
];

const rightFeatures = [
  {
    num: 2,
    title: "Analytics & Business Intelligence",
    desc: "Interactive dashboards and deep-dive analysis that surface the insights your leadership needs to act with confidence.",
    top: "28%",
    left: "68%",
    width: "27%",
    textDelay: 1.1
  },
  {
    num: 4,
    title: "Strategy & Consulting",
    desc: "End-to-end data strategy, governance frameworks, and modernization roadmaps aligned to your business goals.",
    top: "65%",
    left: "68%",
    width: "27%",
    textDelay: 1.5
  },
];

const allFeatures = [
  { num: 1, title: leftFeatures[0].title, desc: leftFeatures[0].desc },
  { num: 2, title: rightFeatures[0].title, desc: rightFeatures[0].desc },
  { num: 3, title: leftFeatures[1].title, desc: leftFeatures[1].desc },
  { num: 4, title: rightFeatures[1].title, desc: rightFeatures[1].desc },
];

const connectors = [
  { d: "M 39,40 L 32,24 L 5,24", delay: 0.3 },
  { d: "M 60,50 L 68,46 L 95,46", delay: 0.5 },
  { d: "M 39,62 L 32,72 L 5,72", delay: 0.7 },
  { d: "M 60,70 L 68,83 L 95,83", delay: 0.9 },
];

const boxes = [
  { num: 1, cx: "39%", cy: "40%", delay: 0.1 },
  { num: 2, cx: "60%", cy: "50%", delay: 0.3 },
  { num: 3, cx: "39%", cy: "62%", delay: 0.5 },
  { num: 4, cx: "60%", cy: "70%", delay: 0.7 },
];

export default function OurServicesHighlight() {
  return (
    <section className="w-full bg-[#0d1b3e] text-white py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {/* <p className="text-xs font-semibold tracking-[0.22em] uppercase text-blue-400 mb-2">
            Our Capabilities
          </p> */}
          <h2 className="text-3xl sm:text-4xl font-light">Why Syancy ?</h2>
        </motion.div>

        {/* DESKTOP */}
        <div className="hidden md:block relative w-full" style={{ minHeight: "650px" }}>
          {/* SVG Connectors Base */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connectors.map((c, i) => (
              <motion.path
                key={i}
                d={c.d}
                stroke="white"
                strokeWidth="0.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ vectorEffect: "non-scaling-stroke" } as React.CSSProperties}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: c.delay, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* Texts Left */}
          {leftFeatures.map((f) => (
            <motion.div
              key={f.num}
              className="absolute pb-3"
              style={{ top: f.top, left: f.left, width: f.width }}
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, delay: f.textDelay, ease: "easeOut" }}
            >
              <h3 className="font-bold text-lg leading-snug mb-2 text-white">{f.title}</h3>
              <p className="text-sm font-medium text-blue-50 leading-relaxed max-w-sm">{f.desc}</p>
            </motion.div>
          ))}

          {/* Texts Right */}
          {rightFeatures.map((f) => (
            <motion.div
              key={f.num}
              className="absolute pb-3 text-right"
              style={{ top: f.top, left: f.left, width: f.width }}
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, delay: f.textDelay, ease: "easeOut" }}
            >
              <div className="flex flex-col items-end">
                <h3 className="font-bold text-lg leading-snug mb-2 text-white">{f.title}</h3>
                <p className="text-sm font-medium text-blue-50 leading-relaxed max-w-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Central Image (Lottie) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              style={{ width: 320, height: 320 }}
            >
              <DotLottieReact
                src="/lottie/Successful Marketer.json"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </div>

          {/* Number Boxes on Connectors */}
          {boxes.map((b) => (
            <motion.div
              key={b.num}
              className="absolute z-20 w-8 h-8 rounded-md bg-[#0d1b3e] border-[1.5px] border-white/80 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-sm font-bold text-white tracking-widest"
              style={{ left: b.cx, top: b.cy, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4, delay: b.delay, ease: "backOut" }}
            >
              {b.num}
            </motion.div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="md:hidden space-y-6 mt-4">
          {allFeatures.map((f) => (
            <motion.div
              key={f.num}
              className="border-l-2 border-blue-500 pl-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: f.num * 0.08 }}
            >
              <p className="font-bold text-sm mb-1">{f.num}. {f.title}</p>
              <p className="text-xs text-blue-200 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
