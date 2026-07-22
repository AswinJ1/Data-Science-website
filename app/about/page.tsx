"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-gray-800 font-sans"
      style={{ backgroundImage: "url('/back.png')" }}
    >
      {/* Semi-transparent Light Backdrop Overlay for Content Readability */}
      <div className="bg-white/90 backdrop-blur-sm min-h-screen py-16 lg:py-24">
        
        {/* ABOUT CONTENT CONTAINER */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* HERO TITLE */}
          <motion.div 
            className="text-center space-y-4 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-normal uppercase tracking-widest text-blue-700">
              Get to Know Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight">
              Transforming Ideas into Digital Reality
            </h1>
            <p className="text-gray-600 text-base sm:text-lg font-normal text-justify leading-relaxed max-w-3xl mx-auto pt-2">
              In an era where data, policy, and technology shape the future of nations and industries alike, the need for a reliable bridge between industry expertise and government institutions has never been greater. At Syancy Innovations, we exist to fill this critical gap.
            </p>
          </motion.div>

          {/* INTRO SECTION */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
                Strategic Intelligence Partner
              </h2>
              <p className="text-gray-700 text-base font-normal text-justify leading-relaxed">
                We are not just a technology and research company. We are a strategic intelligence partner committed to transforming complex data, institutional requirements, and industry capabilities into actionable, transparent, and efficient solutions.
              </p>
              <p className="text-gray-700 text-base font-normal text-justify leading-relaxed">
                Our multidisciplinary teams combine domain expertise with artificial intelligence architectures, empowering organizational leaders to navigate complex decision environments with clarity and confidence.
              </p>
            </div>
            <div className="h-64 md:h-96 w-full flex items-center justify-center">
              <DotLottieReact
                src="/lottie/09zh6ZkGi31JbJez41.json"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>

          {/* THE JOURNEY */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="order-2 md:order-1 h-64 md:h-96 w-full flex items-center justify-center">
              <DotLottieReact
                src="/lottie/42K51Mc586Ff4TrDCZ.json"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
                The Journey Behind Syancy Innovations
              </h2>
              <p className="text-gray-700 text-base font-normal text-justify leading-relaxed">
                Syancy Innovations was founded to bridge the gap between vast industry datasets and the need for structured, actionable intelligence in institutions.
              </p>
              <p className="text-gray-700 text-base font-normal text-justify leading-relaxed">
                As a research-driven, technology-focused organization, we integrate data analytics, artificial intelligence, and rigorous validation to transform complex datasets into reliable insights.
              </p>
              <p className="text-gray-700 text-base font-normal text-justify leading-relaxed">
                Our work spans data intelligence, demographic research, visualization, and strategic consulting, guided by a hybrid methodology that ensures accuracy, scalability, and real-world relevance.
              </p>
              <p className="text-gray-700 text-base font-normal text-justify leading-relaxed">
                Today, we focus on delivering credible, high-impact solutions that help institutions and enterprises make informed decisions in complex environments.
              </p>
            </div>
          </motion.div>

          {/* ACCORDION SECTION: CORE PRINCIPLES & VALUES */}
          <motion.div 
            className="space-y-6 pt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="text-center space-y-2">
              <span className="text-xs font-normal uppercase tracking-widest text-blue-700">
                What We Believe
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
                Our Core Principles & Research Standards
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto divide-y divide-gray-200">
              <AccordionItem value="value-1" className="border-b-0 py-2">
                <AccordionTrigger className="text-base font-normal text-gray-900 hover:text-blue-600">
                  Transparency & Open Methodology
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-sm font-normal text-justify leading-relaxed pt-2">
                  Transparency defines every stage of our analytical process. From data collection to final reporting, our methodology is structured, verifiable, and ethically grounded.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="value-2" className="border-b-0 py-2">
                <AccordionTrigger className="text-base font-normal text-gray-900 hover:text-blue-600">
                  Efficiency & Precision
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-sm font-normal text-justify leading-relaxed pt-2">
                  Efficiency reflects clarity of process and precision of execution. We design systems that reduce ambiguity and deliver high-quality outputs with minimal operational friction.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="value-3" className="border-b-0 py-2">
                <AccordionTrigger className="text-base font-normal text-gray-900 hover:text-blue-600">
                  Uncompromising Research Integrity
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-sm font-normal text-justify leading-relaxed pt-2">
                  We maintain strict standards in validation, analytical design, and interpretation to ensure data reliability and protect institutional credibility.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* EXECUTIVE TEAM SECTION */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            id="team"
            className="space-y-10 pt-6"
          >
            <div className="text-center space-y-2">
              <span className="text-xs font-normal uppercase tracking-widest text-blue-700">Leadership</span>
              <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">The Minds Driving Syancy Forward</h2>
              <p className="text-gray-600 text-base font-normal text-justify leading-relaxed max-w-2xl mx-auto">
                A leadership team built on research rigor, operational excellence, and a shared commitment to making data intelligence accessible and impactful for every organization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-2xl mx-auto">
              <div className="space-y-3">
                <div className="h-72 w-full overflow-hidden">
                  <img
                    src="/ceo.jpeg"
                    alt="Chaithanya Arya"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-normal text-gray-900">Chaithanya Arya</h3>
                  <p className="text-xs font-normal text-blue-600">Founder &amp; CEO</p>
                  <p className="text-xs font-normal text-gray-600 text-justify leading-relaxed pt-1">
                    Leading strategic vision, research direction, and AI architecture development across institutional partners.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-72 w-full overflow-hidden">
                  <img
                    src="/AP.png"
                    alt="Aarti Pardeshi"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-normal text-gray-900">Aarti Pardeshi</h3>
                  <p className="text-xs font-normal text-blue-600">Co-founder &amp; Operations Manager</p>
                  <p className="text-xs font-normal text-gray-600 text-justify leading-relaxed pt-1">
                    Overseeing operational execution, project delivery frameworks, and client engagement management.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ACCORDION FAQ SECTION */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="space-y-6 pt-6"
          >
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-normal uppercase tracking-widest text-blue-700">FAQ</span>
              <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto divide-y divide-gray-200">
              <AccordionItem value="faq-1" className="border-b-0 py-2">
                <AccordionTrigger className="text-base font-normal text-gray-900 hover:text-blue-600">
                  What industries does Syancy Innovations specialize in?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-sm font-normal text-justify leading-relaxed pt-2">
                  Syancy Innovations specializes in healthcare analytics, financial risk modeling, retail demand forecasting, manufacturing predictive maintenance, geospatial intelligence, and public sector research.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border-b-0 py-2">
                <AccordionTrigger className="text-base font-normal text-gray-900 hover:text-blue-600">
                  How does Syancy ensure data security and governance?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-sm font-normal text-justify leading-relaxed pt-2">
                  We implement industry-standard encryption, strict access control policies, SOC2 compliant workflows, and routine security audits to safeguard client data across all environments.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* CONNECT CALL TO ACTION */}
          <motion.div 
            className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <h2 className="text-2xl font-normal text-gray-900">Let’s Connect</h2>
              <p className="text-gray-700 text-sm font-normal text-justify leading-relaxed">
                At Syancy Innovations, we are dedicated to delivering efficient intelligence solutions. If your organization seeks reliable analytics, we are ready to collaborate.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white text-sm font-normal rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </section>
      </div>
    </main>
  );
}