"use client";

import React from "react";
import TargetCursor from "@/components/TargetCursor";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function AboutPage() {
  return (
    <>
      {/* <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      /> */}

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
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden cursor-target bg-transparent flex items-center justify-center">
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
          <div className="order-2 md:order-1 relative h-64 md:h-[30rem] w-full rounded-2xl overflow-hidden cursor-target bg-transparent flex items-center justify-center">
            <DotLottieReact
              src="/lottie/42K51Mc586Ff4TrDCZ.json"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        <div className="order-1 md:order-2 space-y-4">
  <h3 className="text-black text-3xl cursor-target mb-6">
    The Journey Behind Syancy Innovations
  </h3>
  <p>
    Syancy Innovations was founded to bridge the gap between vast industry data and the need for structured, actionable intelligence in institutions.
  </p>
  <p>
    As a research-driven, technology-focused organization, we integrate data analytics, artificial intelligence, and rigorous validation to transform complex datasets into reliable insights.
  </p>
  <p>
    Our work spans data intelligence, demographic research, visualization, and strategic consulting, guided by a hybrid methodology that ensures accuracy, scalability, and real-world relevance.
  </p>
  <p>
    Today, we focus on delivering credible, high-impact solutions that help institutions and enterprises make informed decisions in complex environments.
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
            <h3 className="text-black text-3xl  cursor-target mb-6">
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
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden cursor-target bg-transparent flex items-center justify-center">
            <DotLottieReact
              src="/lottie/76tDy4wY399cvP5u5A.json"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </motion.div>

        {/* TEAM SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="mb-12 text-center">
            <p className="text-sm text-gray-500 tracking-widest uppercase mb-3">Our Team</p>
            <h3 className="text-black text-4xl font-light mb-4">The minds driving Syancy forward</h3>
            <p className="text-gray-500 text-base font-light leading-relaxed max-w-2xl mx-auto">
              A leadership team built on research rigor, operational excellence, and a shared commitment to making data intelligence accessible and impactful for every organization.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-xl mx-auto">
            {/* Chaithanya Arya */}
            <div className="flex flex-col">
              <div className="rounded-xl overflow-hidden h-72 w-full">
                <img
                  src="/ceo.jpeg"
                  alt="Chaithanya Arya"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="pt-5 pb-2">
                <h5 className="text-black text-lg font-medium">Chaithanya Arya</h5>
                <p className="text-gray-500 text-sm mt-1">Founder &amp; CEO</p>
              </div>
            </div>
            {/* Aarti Pardeshi */}
            <div className="flex flex-col">
              <div className="rounded-xl overflow-hidden h-72 w-full">
                <img
                  src="/AP.png"
                  alt="Aarti Pardeshi"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pt-5 pb-2">
                <h5 className="text-black text-lg font-medium">Aarti Pardeshi</h5>
                <p className="text-gray-500 text-sm mt-1">Co-founder &amp; Operations Manager</p>
              </div>
            </div>
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
          <div className="order-2 md:order-1 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden cursor-target bg-transparent flex items-center justify-center">
            <DotLottieReact
              src="/lottie/zodRCHwk42I7q392IZ.json"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="order-1 md:order-2 space-y-12">
            <div className="space-y-4">
              <h3 className="text-black text-3xl  cursor-target mb-6">
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
              <h3 className="text-black text-3xl  cursor-target mb-6">
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
            <h3 className="text-black text-3xl ">
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
             <a href="/contact" className="px-8 py-4 bg-blue-700 text-white  rounded-full hover:bg-gray-800 transition-colors cursor-target inline-block">
               Contact Us
             </a>
          </div>
        </motion.div>

      </section>
    </>
  );
}