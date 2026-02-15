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
          <h3 className="text-4xl font-bold mb-2">5+</h3>
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
          <h3 className="text-4xl font-bold mb-2">12+</h3>
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
          {/* <Image
            src="/pic-1.png"
            alt="Team Collaboration"
            width={600}
            height={400}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          /> */}
        </motion.div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
        {/* Vision */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="bg-blue-50 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-4">
            <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-16 flex-shrink-0">
              {/* Telescope */}
              <rect x="55" y="20" width="50" height="18" rx="9" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" transform="rotate(-25, 80, 29)" />
              <circle cx="100" cy="14" r="12" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
              <circle cx="100" cy="14" r="6" fill="#93C5FD" />
              <line x1="65" y1="38" x2="45" y2="85" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <line x1="75" y1="38" x2="85" y2="85" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <line x1="70" y1="38" x2="65" y2="85" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
              {/* Stars */}
              <circle cx="20" cy="15" r="2.5" fill="#60A5FA" />
              <circle cx="35" cy="30" r="1.5" fill="#93C5FD" />
              <circle cx="15" cy="40" r="2" fill="#60A5FA" />
              <circle cx="40" cy="10" r="1.5" fill="#BFDBFE" />
            </svg>
            <h3 className="text-2xl font-semibold text-center sm:text-left">Our Vision</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            To be the leading data science consultancy that empowers organizations
            worldwide to unlock the full potential of their data — driving
            innovation, informed decision-making, and sustainable growth through
            cutting-edge analytics and AI solutions.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="bg-amber-50 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-4">
            <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-16 flex-shrink-0">
              {/* Target / bullseye */}
              <circle cx="60" cy="50" r="38" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="60" cy="50" r="28" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="60" cy="50" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="60" cy="50" r="8" fill="#F59E0B" />
              {/* Arrow hitting center */}
              <line x1="95" y1="15" x2="64" y2="46" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="62,44 60,50 66,48" fill="#D97706" />
              <line x1="95" y1="15" x2="100" y2="22" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
              <line x1="95" y1="15" x2="102" y2="13" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h3 className="text-2xl font-semibold text-center sm:text-left">Our Mission</h3>
          </div>
          <ul className="text-gray-700 text-sm leading-relaxed space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-sm font-semibold text-amber-600 mt-0.5 flex-shrink-0">1.</span>
              Deliver actionable insights by transforming raw data into clear,
              impactful business intelligence.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sm font-semibold text-amber-600 mt-0.5 flex-shrink-0">2.</span>
              Build scalable, production-ready ML models and data pipelines
              tailored to each client&apos;s unique needs.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sm font-semibold text-amber-600 mt-0.5 flex-shrink-0">3.</span>
              Foster a culture of data literacy and empower teams to make
              confident, data-driven decisions.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sm font-semibold text-amber-600 mt-0.5 flex-shrink-0">4.</span>
              Stay at the forefront of AI research and responsibly apply emerging
              technologies to solve real-world problems.
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
