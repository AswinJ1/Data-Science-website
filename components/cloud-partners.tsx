"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const partners = [
  { name: "AWS", src: "/AWS lgo.svg" },
  { name: "Google Cloud", src: "/Google Cloud 1.svg" },
  { name: "Microsoft Azure", src: "/Microsoft_Azure_Logo.svg" },
  { name: "Salesforce", src: "/Salesforce.com_logo.svg" },
  { name: "DigitalOcean", src: "/digitalocean-ar21~bgwhite.svg" },
  { name: "Databricks", src: "/Databricks_Logo.png" },
]

export default function CloudPartners() {
  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-4xl font-bold text-gray-900 tracking-wide mb-6"
        >
          Our Partners
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-gray-500 max-w-3xl mx-auto leading-relaxed mb-16"
        >
          We collaborate with industry-leading cloud and data platforms to deliver seamless integrations, scalable infrastructure, and best-in-class solutions for our clients.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-3 md:grid-cols-6 gap-10 items-center justify-items-center"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={fadeInUp}
              className="grayscale opacity-80 hover:opacity-100 hover:grayscale-0 hover:scale-105 transition duration-300"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
