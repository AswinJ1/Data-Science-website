"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <p className="text-sm text-gray-500">Get to Know Us</p>
        <h4 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-2">
          Transforming Ideas into Digital Reality
        </h4>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Satisfied Clients */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="bg-green-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[180px]"
        >
          <p className="text-gray-700 text-sm mb-2">Satisfied Clients</p>
          <h3 className="text-4xl font-bold mb-2">3+</h3>
          <p className="text-gray-600 text-xs leading-relaxed">
            Enterprise & startup clients across healthcare, finance, retail, and more.
          </p>
        </motion.div>

        {/* Office Image */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="rounded-2xl overflow-hidden shadow-sm"
        >
          <Image
            src="/pic-1.png"
            alt="Office"
            width={600}
            height={400}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Team Discussion */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="rounded-2xl overflow-hidden shadow-sm"
        >
          <Image
            src="/pic-2.png"
            alt="Team Discussion"
            width={600}
            height={400}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Customer Interaction */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="rounded-2xl overflow-hidden shadow-sm"
        >
          <Image
            src="/pic-3.png"
            alt="Customer Interaction"
            width={600}
            height={400}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Journey Card */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="bg-pink-100 rounded-2xl p-6 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[180px]"
        >
          <h3 className="text-xl font-semibold mb-3">
            From Raw Data to Business Intelligence
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            What started as a passion for uncovering insights from data has grown
            into a full-service data science consultancy. We combine statistical
            rigor with modern ML engineering to help organizations make smarter,
            faster decisions — from predictive analytics and NLP to scalable data
            pipelines and interactive dashboards.
          </p>
        </motion.div>

        {/* Projects Delivered */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="bg-purple-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[180px]"
        >
          <p className="text-gray-700 text-sm mb-2">Projects Delivered</p>
          <h3 className="text-4xl font-bold mb-2">3+</h3>
          <p className="text-gray-600 text-xs leading-relaxed">
            End-to-end data solutions including ML models, dashboards, and analytics platforms.
          </p>
        </motion.div>

        {/* Team Collaboration */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="rounded-2xl overflow-hidden shadow-sm"
        >
          <Image
            src="/pic-1.png"
            alt="Team Collaboration"
            width={600}
            height={400}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}
