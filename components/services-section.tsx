"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Database, BarChart3, Brain, Search, Cog, TrendingUp } from "lucide-react"

const services = [
  {
    icon: Database,
    title: "Data Engineering",
    description:
      "Build robust data pipelines and infrastructure to collect, process, and store your data efficiently at scale.",
  },
  {
    icon: Cog,
    title: "Data Crunching",
    description:
      "Transform raw data into structured, clean datasets ready for analysis and machine learning applications.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description:
      "Extract meaningful insights from your data through statistical analysis and advanced visualization techniques.",
  },
  {
    icon: Brain,
    title: "Data Science",
    description: "Leverage machine learning and AI to predict trends, automate decisions, and drive business growth.",
  },
  {
    icon: Search,
    title: "Data Mining",
    description:
      "Discover hidden patterns and relationships in large datasets to uncover valuable business intelligence.",
  },
  {
    icon: TrendingUp,
    title: "Business Intelligence",
    description:
      "Create comprehensive dashboards and reports that enable data-driven decision making across your organization.",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 text-primary-dark mb-4">Our Data Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From data engineering to advanced analytics, we provide end-to-end solutions that transform your data into a
            competitive advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-h3 text-primary-dark mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
