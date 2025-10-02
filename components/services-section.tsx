"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const services = [
	{
		title: "Data Strategy & Consulting",
		features: [
			"Data maturity assessment and roadmap design",
			"Enterprise data strategy and governance framework",
			"Data architecture and modernization consulting",
			"Data-driven decision-making enablement",
		],
	},
	{
		title: "Data Engineering & Integration",
		features: [
			"Data pipeline design, development, and automation",
			"ETL/ELT implementation (batch & real-time)",
			"Data warehouse & data lake setup and optimization",
			"API, system, and third-party data integrations",
		],
	},
	{
		title: "Data Quality & Governance",
		features: [
			"Master Data Management (MDM) solutions",
			"Data cataloging and lineage mapping",
			"Data cleansing, deduplication, and standardization",
			"Compliance with regulatory frameworks (GDPR, HIPAA, etc.)",
		],
	},
	{
		title: "Data Analytics & Business Intelligence",
		features: [
			"Descriptive, diagnostic, predictive, and prescriptive analytics",
			"Dashboard and reporting solutions (Power BI, Tableau, Looker, etc.)",
			"Self-service BI enablement",
			"Data storytelling and visualization",
		],
	},
	{
		title: "Advanced Analytics & AI/ML",
		features: [
			"Machine learning model development & deployment",
			"Natural language processing (NLP) and computer vision solutions",
			"Predictive forecasting & anomaly detection",
			"AI-powered automation & decision intelligence",
		],
	},
	{
		title: "Big Data & Cloud Data Platforms",
		features: [
			"Cloud-native data platform design (AWS, Azure, GCP)",
			"Data lakehouse and scalable storage solutions",
			"Big data processing (Spark, Hadoop, Databricks)",
			"Migration from on-premise to cloud data infrastructure",
		],
	},
	{
		title: "Data Security & Privacy",
		features: [
			"Data encryption and masking solutions",
			"Secure access management and role-based controls",
			"Data risk assessment and breach prevention",
			"Privacy-enhancing technologies (PETs)",
		],
	},
	{
		title: "Industry-Specific Data Solutions",
		features: [
			"Financial services: fraud detection, risk scoring",
			"Retail & eCommerce: recommendation engines, customer 360° insights",
			"Healthcare: patient data analytics, clinical intelligence",
			"Government & Public Sector: census, electoral, and demographic analysis",
		],
	},
	{
		title: "Data Audit & Compliance Services",
		features: [
			"Data lifecycle audits and risk assessments",
			"Regulatory compliance monitoring",
			"Audit reporting and certification readiness",
			"Continuous compliance automation",
		],
	},
	{
		title: "Managed Data Services",
		features: [
			"Ongoing data infrastructure monitoring and support",
			"DataOps & MLOps implementation",
			"Performance optimization of data platforms",
			"24/7 support & SLA-driven maintenance",
		],
	},
];

export default function TechSolutions() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedService = services[selectedIndex];

	return (
		<section className="py-16 sm:py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-xs sm:text-sm text-blue-600 tracking-widest mb-2 font-semibold uppercase">
						OUR DATA SERVICES
					</h2>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						Data Domain Service Portfolio
					</h1>
					<p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
						Comprehensive data solutions to transform your business intelligence and drive growth
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
					{/* Left Column: Service Buttons */}
					<div className="lg:col-span-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:max-h-[500px] lg:overflow-y-auto lg:pr-2">
							{services.map((service, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedIndex(idx)}
									className={`text-left px-3 sm:px-4 py-3 sm:py-4 border text-xs sm:text-sm font-medium transition-all duration-300 ${
										selectedIndex === idx
											? "border-blue-600 bg-blue-600 text-white shadow-lg"
											: "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600"
									}`}
								>
									<span className="block truncate sm:whitespace-normal">
										{service.title}
									</span>
								</button>
							))}
						</div>
					</div>

					{/* Right Column: Service Details */}
					<div className="lg:col-span-8">
						<AnimatePresence mode="wait">
							<motion.div
								key={selectedService.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								<Card className="border-0 shadow-xl bg-white">
									<CardContent className="p-6 sm:p-8">
										<div className="flex items-center gap-3 mb-6">
											<div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
												{selectedIndex + 1}
											</div>
											<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
												{selectedService.title}
											</h3>
										</div>
										<ol className="space-y-3 sm:space-y-4 counter-reset">
											{selectedService.features.map((feature, fidx) => (
												<li key={fidx} className="flex items-start gap-3">
													<div className="w-6 h-6 bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
														{fidx + 1}
													</div>
													<span className="text-gray-700 leading-relaxed text-sm sm:text-base">
														{feature}
													</span>
												</li>
											))}
										</ol>
									</CardContent>
								</Card>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}
