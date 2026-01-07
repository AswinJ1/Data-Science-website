"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const services = [
	{
		title: "Data Strategy & Consulting",
		features: [
			{
				name: "Data maturity assessment and roadmap design",
				description: "We evaluate your organization's current data capabilities across people, processes, and technology to identify gaps and opportunities. Our comprehensive roadmap outlines actionable steps to elevate your data maturity, ensuring alignment with business goals and long-term scalability."
			},
			{
				name: "Enterprise data strategy and governance framework",
				description: "We craft a holistic data strategy that defines how data is collected, stored, managed, and utilized across your enterprise. Our governance framework establishes policies, roles, and accountability to ensure data integrity, consistency, and regulatory compliance throughout the organization."
			},
			{
				name: "Data architecture and modernization consulting",
				description: "Our experts design robust, future-ready data architectures that support your evolving business needs. We guide you through modernization initiatives, transitioning from legacy systems to scalable, cloud-enabled infrastructures that enhance agility and performance."
			},
			{
				name: "Data-driven decision-making enablement",
				description: "We empower your teams with the tools, processes, and cultural shift needed to make informed decisions backed by data. Through training, analytics solutions, and strategic guidance, we help embed data-driven thinking into your organizational DNA."
			},
		],
	},
	{
		title: "Data Engineering & Integration",
		features: [
			{
				name: "Data pipeline design, development, and automation",
				description: "We build efficient, automated data pipelines that seamlessly move data from source to destination while applying necessary transformations. Our solutions ensure reliability, scalability, and minimal manual intervention, enabling faster time-to-insight for your analytics initiatives."
			},
			{
				name: "ETL/ELT implementation (batch & real-time)",
				description: "Our team implements robust Extract, Transform, Load (ETL) and Extract, Load, Transform (ELT) processes tailored to your data volume and velocity requirements. Whether you need batch processing for periodic updates or real-time streaming for instant insights, we deliver optimized solutions."
			},
			{
				name: "Data warehouse & data lake setup and optimization",
				description: "We design and deploy centralized data repositories that consolidate your structured and unstructured data assets. Our optimization services ensure fast query performance, cost efficiency, and seamless integration with your analytics and reporting tools."
			},
			{
				name: "API, system, and third-party data integrations",
				description: "We connect disparate systems and external data sources through secure, well-documented API integrations. Our solutions enable seamless data flow across your technology ecosystem, breaking down silos and creating a unified view of your business information."
			},
		],
	},
	{
		title: "Data Quality & Governance",
		features: [
			{
				name: "Master Data Management (MDM) solutions",
				description: "We implement comprehensive MDM solutions that create a single, authoritative source of truth for your critical business entities. Our approach ensures consistent, accurate master data across all systems, improving operational efficiency and decision-making quality."
			},
			{
				name: "Data cataloging and lineage mapping",
				description: "We build comprehensive data catalogs that document your data assets, making them discoverable and understandable across the organization. Our lineage mapping traces data from source to consumption, providing transparency and trust in your analytics outputs."
			},
			{
				name: "Data cleansing, deduplication, and standardization",
				description: "Our data quality services identify and remediate inconsistencies, duplicates, and errors in your datasets. We establish standardization rules that ensure uniformity across data sources, improving the reliability and usability of your information assets."
			},
			{
				name: "Compliance with regulatory frameworks (GDPR, HIPAA, etc.)",
				description: "We help you navigate complex regulatory requirements by implementing data governance practices that ensure compliance. Our solutions address data privacy, consent management, retention policies, and audit trails required by frameworks like GDPR, HIPAA, and industry-specific regulations."
			},
		],
	},
	{
		title: "Data Analytics & Business Intelligence",
		features: [
			{
				name: "Descriptive, diagnostic, predictive, and prescriptive analytics",
				description: "We deliver the full spectrum of analytics capabilities, from understanding what happened and why, to predicting future outcomes and recommending optimal actions. Our analytical solutions transform raw data into actionable intelligence that drives competitive advantage."
			},
			{
				name: "Dashboard and reporting solutions (Power BI, Tableau, Looker, etc.)",
				description: "We design and develop intuitive, interactive dashboards that present complex data in visually compelling formats. Our expertise spans leading BI platforms, ensuring you get the right tool configured to meet your specific reporting and visualization requirements."
			},
			{
				name: "Self-service BI enablement",
				description: "We empower business users to explore data and create their own reports without heavy reliance on IT. Our self-service BI implementations include proper data modeling, user training, and governance guardrails to ensure productive and secure data exploration."
			},
			{
				name: "Data storytelling and visualization",
				description: "We transform complex analytical findings into compelling narratives that resonate with stakeholders at all levels. Our visualization experts craft presentations and interactive reports that communicate insights clearly, driving understanding and action across your organization."
			},
		],
	},
	{
		title: "Advanced Analytics & AI/ML",
		features: [
			{
				name: "Machine learning model development & deployment",
				description: "We develop custom machine learning models tailored to your specific business challenges, from classification and regression to clustering and recommendation systems. Our end-to-end approach covers model training, validation, deployment, and ongoing monitoring in production environments."
			},
			{
				name: "Natural language processing (NLP) and computer vision solutions",
				description: "We harness the power of NLP to extract insights from text data, enabling sentiment analysis, document classification, and conversational AI. Our computer vision solutions automate image and video analysis for applications ranging from quality control to customer engagement."
			},
			{
				name: "Predictive forecasting & anomaly detection",
				description: "We build sophisticated forecasting models that anticipate future trends, demand patterns, and business outcomes with high accuracy. Our anomaly detection solutions identify unusual patterns in real-time, enabling proactive responses to fraud, equipment failures, or operational issues."
			},
			{
				name: "AI-powered automation & decision intelligence",
				description: "We implement intelligent automation solutions that augment human decision-making with AI-driven recommendations. Our decision intelligence platforms combine machine learning, optimization algorithms, and business rules to automate complex decisions while maintaining transparency and control."
			},
		],
	},
	{
		title: "Big Data & Cloud Data Platforms",
		features: [
			{
				name: "Cloud-native data platform design (AWS, Azure, GCP)",
				description: "We architect comprehensive cloud data platforms leveraging the best services from AWS, Azure, or Google Cloud. Our designs prioritize scalability, cost optimization, and seamless integration, enabling you to harness the full potential of cloud-native data technologies."
			},
			{
				name: "Data lakehouse and scalable storage solutions",
				description: "We implement modern data lakehouse architectures that combine the flexibility of data lakes with the performance of data warehouses. Our scalable storage solutions accommodate growing data volumes while maintaining fast query performance and cost efficiency."
			},
			{
				name: "Big data processing (Spark, Hadoop, Databricks)",
				description: "We deploy and optimize distributed computing frameworks to process massive datasets efficiently. Our expertise in Spark, Hadoop, and Databricks enables complex transformations, machine learning at scale, and real-time analytics on petabyte-scale data volumes."
			},
			{
				name: "Migration from on-premise to cloud data infrastructure",
				description: "We guide your organization through the complexities of cloud migration, ensuring minimal disruption and maximum value realization. Our proven methodology addresses data transfer, application refactoring, security considerations, and change management for successful transitions."
			},
		],
	},
	{
		title: "Data Security & Privacy",
		features: [
			{
				name: "Data encryption and masking solutions",
				description: "We implement robust encryption strategies that protect your data at rest and in transit using industry-standard algorithms. Our data masking solutions enable safe use of production data in development and testing environments while preserving data utility and protecting sensitive information."
			},
			{
				name: "Secure access management and role-based controls",
				description: "We design and implement comprehensive access control frameworks that ensure users have appropriate permissions based on their roles. Our solutions include identity management, multi-factor authentication, and fine-grained authorization to protect your data assets from unauthorized access."
			},
			{
				name: "Data risk assessment and breach prevention",
				description: "We conduct thorough assessments to identify vulnerabilities in your data infrastructure and processes. Our proactive security measures, including intrusion detection, threat monitoring, and incident response planning, help prevent data breaches and minimize potential damage."
			},
			{
				name: "Privacy-enhancing technologies (PETs)",
				description: "We implement cutting-edge privacy-preserving techniques such as differential privacy, homomorphic encryption, and secure multi-party computation. These technologies enable valuable data analysis while protecting individual privacy and meeting stringent regulatory requirements."
			},
		],
	},
	{
		title: "Industry-Specific Data Solutions",
		features: [
			{
				name: "Financial services: fraud detection, risk scoring",
				description: "We develop sophisticated fraud detection systems that identify suspicious transactions in real-time using machine learning and behavioral analytics. Our risk scoring models help financial institutions make informed lending decisions while maintaining regulatory compliance and minimizing defaults."
			},
			{
				name: "Retail & eCommerce: recommendation engines, customer 360° insights",
				description: "We build personalized recommendation engines that increase conversion rates and customer lifetime value through tailored product suggestions. Our customer 360° solutions unify data across touchpoints to deliver comprehensive insights into customer behavior, preferences, and journey patterns."
			},
			{
				name: "Healthcare: patient data analytics, clinical intelligence",
				description: "We develop healthcare analytics solutions that improve patient outcomes through predictive modeling, population health management, and clinical decision support. Our platforms ensure HIPAA compliance while enabling actionable insights from electronic health records and clinical data."
			},
			{
				name: "Government & Public Sector: census, electoral, and demographic analysis",
				description: "We provide specialized analytics solutions for government agencies handling large-scale demographic and electoral data. Our secure, compliant platforms support census operations, voter analysis, and policy planning while ensuring data integrity and public trust."
			},
		],
	},
	{
		title: "Data Audit & Compliance Services",
		features: [
			{
				name: "Data lifecycle audits and risk assessments",
				description: "We conduct comprehensive audits of your data lifecycle, from creation to archival and deletion. Our risk assessments identify vulnerabilities, compliance gaps, and optimization opportunities, providing actionable recommendations to strengthen your data management practices."
			},
			{
				name: "Regulatory compliance monitoring",
				description: "We implement continuous monitoring solutions that track your compliance status against relevant regulations in real-time. Our dashboards and alerting systems ensure you stay informed of potential violations and can take corrective action before issues escalate."
			},
			{
				name: "Audit reporting and certification readiness",
				description: "We prepare comprehensive audit documentation and evidence packages that demonstrate your compliance with industry standards and regulations. Our readiness assessments and gap remediation services help you achieve certifications such as SOC 2, ISO 27001, and industry-specific accreditations."
			},
			{
				name: "Continuous compliance automation",
				description: "We implement automated compliance workflows that reduce manual effort and human error in maintaining regulatory adherence. Our solutions include policy enforcement, automated evidence collection, and deviation detection to ensure sustained compliance with minimal operational overhead."
			},
		],
	},
	{
		title: "Managed Data Services",
		features: [
			{
				name: "Ongoing data infrastructure monitoring and support",
				description: "We provide comprehensive monitoring of your data infrastructure, tracking performance metrics, availability, and resource utilization around the clock. Our proactive support team identifies and resolves issues before they impact your business operations, ensuring maximum uptime and reliability."
			},
			{
				name: "DataOps & MLOps implementation",
				description: "We establish DataOps and MLOps practices that streamline your data and machine learning workflows through automation, collaboration, and continuous improvement. Our implementations include CI/CD pipelines, version control, testing frameworks, and monitoring for production models."
			},
			{
				name: "Performance optimization of data platforms",
				description: "We continuously analyze and tune your data platforms to ensure optimal performance as data volumes and user demands grow. Our optimization services address query performance, resource allocation, cost management, and architectural improvements to maintain peak efficiency."
			},
			{
				name: "24/7 support & SLA-driven maintenance",
				description: "We offer round-the-clock support with guaranteed response times and resolution commitments defined in clear service level agreements. Our dedicated support teams provide incident management, problem resolution, and preventive maintenance to keep your data systems running smoothly."
			},
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
										<ol className="space-y-4 sm:space-y-5">
											{selectedService.features.map((feature, fidx) => (
												<li key={fidx} className="flex items-start gap-3">
													<div className="w-6 h-6 bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
														{fidx + 1}
													</div>
													<div className="flex-1">
														<span className="text-gray-900 font-medium leading-relaxed text-sm sm:text-base block mb-1">
															{feature.name}
														</span>
														<p className="text-gray-600 text-sm leading-relaxed text-justify">
															{feature.description}
														</p>
													</div>
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
