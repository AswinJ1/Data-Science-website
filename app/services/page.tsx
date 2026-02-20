"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  DataEngineeringIllustration,
  DataCrunchingIllustration,
  DataAnalysisIllustration,
  DataScienceIllustration,
  DataMiningIllustration,
  DataMigrationIllustration,
  DataModernizationIllustration,
  AiMlIllustration,
  GeospatialIllustration,
  DataAnalyticsBiIllustration,
} from "@/components/illustrations"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const services = [
  {
    illustration: DataEngineeringIllustration,
    title: "Data Engineering",
    href: "/services/data-engineering",
    description:
      "Build robust data pipelines and infrastructure to collect, process, and store your data efficiently at scale.",
  },
  {
    illustration: DataCrunchingIllustration,
    title: "Data Crunching",
    href: "/services/data-crunching",
    description:
      "Transform raw data into structured, clean datasets ready for analysis and machine learning applications.",
  },
  {
    illustration: DataAnalysisIllustration,
    title: "Data Analysis",
    href: "/services/data-analysis",
    description:
      "Extract meaningful insights from your data through statistical analysis and advanced visualization techniques.",
  },
  {
    illustration: DataScienceIllustration,
    title: "Data Science",
    href: "/services/data-science",
    description: "Leverage machine learning and AI to predict trends, automate decisions, and drive business growth.",
  },
  {
    illustration: DataMiningIllustration,
    title: "Data Mining",
    href: "/services/data-mining",
    description:
      "Discover hidden patterns and relationships in large datasets to uncover valuable business intelligence.",
  },
  {
    illustration: DataMigrationIllustration,
    title: "Data Migration",
    href: "/services/data-migration",
    description:
      "Seamlessly transfer data across platforms with zero disruption and full integrity.",
  },
  {
    illustration: DataModernizationIllustration,
    title: "Data Modernization",
    href: "/services/data-modernization",
    description:
      "Upgrade legacy data infrastructure to scalable, cloud-native architectures.",
  },
  {
    illustration: AiMlIllustration,
    title: "AI & Machine Learning",
    href: "/services/ai-machine-learning",
    description:
      "Implement AI-driven solutions to automate processes and unlock predictive insights.",
  },
  {
    illustration: GeospatialIllustration,
    title: "Geospatial Data Services",
    href: "/services/geospatial-data-services",
    description:
      "Leverage spatial intelligence for location-based insights and strategic planning.",
  },
  {
    illustration: DataAnalyticsBiIllustration,
    title: "Data Analytics & BI",
    href: "/services/data-analytics-bi",
    description:
      "Turn raw data into actionable dashboards and strategic intelligence.",
  },
]

export default function ServicesSection() {
  return (
    <section
      className="py-20 bg-white relative overflow-hidden min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/back.png')" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-h2 text-primary-dark mb-4">Our Data Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From data engineering to advanced analytics, we provide end-to-end solutions that transform your data into a
            competitive advantage.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Link href={service.href} className="block h-full">
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white relative overflow-hidden h-full cursor-pointer">
                  {/* Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                  <CardContent className="p-8 text-center relative z-10">
                    <div className="w-32 h-28 mx-auto mb-6 group-hover:scale-105 transition-transform duration-500">
                      <service.illustration className="w-full h-full" />
                    </div>
                    <h3 className="text-h3 text-primary-dark mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
