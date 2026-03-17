"use client";

import React from "react";
import TargetCursor from "@/components/TargetCursor";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function AboutPage() {
  return (
    <>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />

      {/* ABOUT CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-gray-700 space-y-24 text-base leading-relaxed">

        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <p className="text-sm text-gray-500">Get to Know Us</p>
          <h4 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-2"> Transforming Ideas into Digital Reality </h4>
        </motion.div>

        {/* INTRO SECTION */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="space-y-6 text-gray-700">
            <p className="cursor-target hover-image-content">
              In an era where data, policy, and technology shape the future of nations and industries alike, the need for a reliable bridge between industry expertise and government institutions has never been greater. At Syancy Innovations, we exist to fill this critical gap.
            </p>
            <p className="cursor-target hover-image-content">
              We are not just a technology and research company. We are a strategic intelligence partner committed to transforming complex data, institutional requirements, and industry capabilities into actionable, transparent, and efficient solutions.
            </p>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden cursor-target">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" 
              alt="Technology and Data" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
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
          <div className="order-2 md:order-1 relative h-64 md:h-[30rem] w-full rounded-2xl overflow-hidden cursor-target">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
              alt="Data Analysis Journey" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <h3 className="text-black text-3xl font-bold cursor-target mb-6">
              The Journey Behind Syancy Innovations
            </h3>
            <p>
              Syancy Innovations was founded with a clear observation. Across multiple sectors, industries were generating large volumes of data and technological solutions, while government and institutional bodies required structured, verified, and actionable intelligence to implement policies and long-term strategies. Despite the availability of resources on both sides, the lack of an analytical bridge resulted in underutilized insights and operational inefficiencies.
            </p>
            <p>
              Recognizing this gap, Syancy Innovations was established as a research-driven and technology-focused organization dedicated to integrating analytics, artificial intelligence, and translating complex datasets into structured intelligence that institutions and industries can use with confidence.
            </p>
            <p>
              Our journey began with intensive analytical projects involving large-scale datasets, multilingual data processing, and institutional research frameworks. From demographic analytics to strategic data intelligence, we developed systems that combine advanced AI tools with rigorous manual validation techniques. Through this process, we developed a disciplined hybrid methodology that emphasizes accuracy, scalability, and institutional relevance.
            </p>
            <p>
              Over time, our work expanded across complex analytical domains, including data intelligence, demographic research, visualization, and strategic consulting. Each project reinforced our core belief: meaningful innovation is not just about technology — it is about clarity, credibility, and impact.
            </p>
            <p>
              What distinguishes our journey is purposeful growth. Every initiative we undertake is aligned with long-term institutional relevance and structured analytical integrity. We focus on solving real-world challenges that require deep research, methodological discipline, and technological precision rather than generic, surface-level solutions.
            </p>
            <p>
              Today, Syancy Innovations stands as a forward-looking organization that integrates data science, artificial intelligence, and strategic research to support institutions, enterprises, and decision-makers who require reliable intelligence to navigate complex environments.
            </p>
          </div>
        </motion.div>

        {/* CORE VALUES */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="space-y-6">
            <h3 className="text-black text-3xl font-bold cursor-target mb-6">
              What We Believe — Our Core Values
            </h3>
            <p>
              <span className="text-black font-semibold">Transparency:</span> Transparency defines every stage of our analytical process. From data collection to final reporting, our methodology is structured, verifiable, and ethically grounded.
            </p>
            <p>
              <span className="text-black font-semibold">Efficiency:</span> Efficiency reflects clarity of process and precision of execution. We design systems that reduce ambiguity and deliver high-quality outputs.
            </p>
            <p>
              <span className="text-black font-semibold">Research Integrity:</span> We maintain strict standards in validation, analytical design, and interpretation to ensure reliability.
            </p>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden cursor-target">
            <img 
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop" 
              alt="Core Values" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* THE PEOPLE & VISION */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="order-2 md:order-1 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden cursor-target">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
              alt="Team and Vision" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 md:order-2 space-y-12">
            <div className="space-y-4">
              <h3 className="text-black text-3xl font-bold cursor-target mb-6">
                The People Behind Syancy Innovations
              </h3>
              <p>
                Syancy Innovations is driven by a multidisciplinary team of researchers, analysts, technologists, and strategic professionals committed to analytical excellence.
              </p>
              <p>
                Collaboration, structured thinking, and continuous learning define our work culture.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-black text-3xl font-bold cursor-target mb-6">
                Our Vision for the Future
              </h3>
              <p>
                The global landscape is becoming increasingly data-centric, and institutions require reliable intelligence frameworks to navigate complex environments.
              </p>
              <p>
                Our long-term vision focuses on advancing AI-driven analytics and developing institutional intelligence systems.
              </p>
            </div>
          </div>
        </motion.div>

        {/* LET'S CONNECT */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left bg-gray-100 p-8 md:p-12 rounded-3xl cursor-target"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="space-y-6">
            <h3 className="text-black text-3xl font-bold">
              Let’s Connect
            </h3>
            <p>
              At Syancy Innovations, we are more than a service provider — we are a strategic partner dedicated to bridging gaps and delivering efficient intelligence solutions.
            </p>
            <p>
              If your organization seeks reliable analytics and structured research, Syancy Innovations is ready to collaborate with purpose and precision.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
             <a href="/contact" className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors cursor-target inline-block">
               Contact Us
             </a>
          </div>
        </motion.div>

      </section>
    </>
  );
}