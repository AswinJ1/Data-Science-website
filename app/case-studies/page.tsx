"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } }
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

const caseStudies = [
	{
		title: "E-commerce Revenue Optimization",
		client: "RetailCorp",
		industry: "E-commerce",
		image: "/pic-1.png?height=200&width=300",
		results: [
			{ icon: TrendingUp, metric: "35%", label: "Revenue Increase" },
			{ icon: Users, metric: "2.5x", label: "Customer Retention" },
			{ icon: DollarSign, metric: "$2.1M", label: "Additional Revenue" },
		],
		description:
			"Implemented advanced analytics and machine learning models to optimize pricing strategies and personalize customer experiences.",
	},
	{
		title: "Supply Chain Intelligence",
		client: "LogiFlow",
		industry: "Logistics",
		image: "/pic-2.png?height=200&width=300",
		results: [
			{ icon: TrendingUp, metric: "28%", label: "Cost Reduction" },
			{ icon: Users, metric: "99.2%", label: "On-time Delivery" },
			{ icon: DollarSign, metric: "$850K", label: "Annual Savings" },
		],
		description:
			"Built real-time supply chain monitoring system with predictive analytics to optimize inventory and reduce operational costs.",
	},
	{
		title: "Healthcare Data Platform",
		client: "MedTech Solutions",
		industry: "Healthcare",
		image: "/pic-3.png?height=200&width=300",
		results: [
			{ icon: TrendingUp, metric: "45%", label: "Efficiency Gain" },
			{ icon: Users, metric: "10K+", label: "Patients Served" },
			{ icon: DollarSign, metric: "$1.2M", label: "Cost Savings" },
		],
		description:
			"Developed comprehensive patient data analytics platform enabling personalized treatment plans and operational efficiency.",
	},
]

export default function CaseStudiesSection() {
	return (
		<section className="py-20 bg-light">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					variants={fadeInUp}
					className="text-center mb-16"
				>
					<h2 className="text-h2 text-primary-dark mb-4">Success Stories</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						See how we've helped businesses across industries transform their data into measurable results.
					</p>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.1 }}
					variants={staggerContainer}
					className="grid lg:grid-cols-3 gap-8 mb-12"
				>
					{caseStudies.map((study, index) => (
						<motion.div key={study.title} variants={fadeInUp}>
							<Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
							<div className="aspect-video overflow-hidden">
								<img
									src={study.image || "/pic-1.png"}
									alt={study.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<CardContent className="p-6 flex flex-col flex-grow">
								<div className="flex items-center justify-between mb-3">
									<span className="text-sm font-medium text-primary-bright bg-primary-bright/10 px-3 py-1 rounded-full">
										{study.industry}
									</span>
									<span className="text-sm text-gray-500">{study.client}</span>
								</div>
								<h3 className="text-xl font-semibold text-primary-dark mb-3">{study.title}</h3>
								<p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">{study.description}</p>

								<div className="grid grid-cols-3 gap-4 mb-6">
									{study.results.map((result, idx) => (
										<div key={idx} className="text-center">
											<result.icon className="h-5 w-5 text-primary-bright mx-auto mb-1" />
											<div className="text-lg font-bold text-primary-dark">{result.metric}</div>
											<div className="text-xs text-gray-500">{result.label}</div>
										</div>
									))}
								</div>

								<Button
									variant="outline"
									className="w-full group-hover:bg-primary-bright group-hover:text-white group-hover:border-primary-bright transition-colors bg-transparent mt-auto"
								>
									View Case Study
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
						</motion.div>
					))}
				</motion.div>

				<div className="text-center">
					<Button size="lg" className="bg-gradient-primary hover:opacity-90">
						View All Case Studies
						<ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</div>
			</div>
		</section>
	)
}
