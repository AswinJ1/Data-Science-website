"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react"

const caseStudies = [
	{
		title: "E-commerce Revenue Optimization",
		client: "RetailCorp",
		industry: "E-commerce",
		image: "/pic-1.png",
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
		image: "/pic-2.png",
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
		image: "/pic-3.png",
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
		<section className="py-20 bg-light dark:bg-black">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-h2 text-primary-dark dark:text-white mb-4">Success Stories</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						See how we've helped businesses across industries transform their data into measurable results.
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8 mb-12">
					{caseStudies.map((study, index) => (
						<Card key={study.title} className="group hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
							<div className="aspect-video overflow-hidden">
								<img
									src={study.image || "/placeholder.svg"}
									alt={study.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<CardContent className="p-6 flex flex-col flex-grow">
								<div className="flex items-center justify-between mb-3">
									<span className="text-sm font-medium text-primary-bright bg-primary-bright/10 px-3 py-1 rounded-full">
										{study.industry}
									</span>
									<span className="text-sm text-gray-500 dark:text-gray-400">{study.client}</span>
								</div>
								<h3 className="text-xl font-semibold text-primary-dark dark:text-white mb-3">{study.title}</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed flex-grow">{study.description}</p>

								<div className="grid grid-cols-3 gap-4 mb-6">
									{study.results.map((result, idx) => (
										<div key={idx} className="text-center">
											<result.icon className="h-5 w-5 text-primary-bright mx-auto mb-1" />
											<div className="text-lg font-bold text-primary-dark dark:text-white">{result.metric}</div>
											<div className="text-xs text-gray-500 dark:text-gray-400">{result.label}</div>
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
					))}
				</div>

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
