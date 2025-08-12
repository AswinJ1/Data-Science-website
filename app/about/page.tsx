"use client"

import { CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
      style={{
        backgroundImage: "url('/back.png'), linear-gradient(to bottom right, #eff6ff, #fafafa, #f3e8ff)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Hero Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto flex flex-col items-start">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-dark mb-4">Empowering Data-Driven Transformation</h1>
        <p className="text-lg text-gray-700 mb-2">Turning data into actionable intelligence and scalable solutions.</p>
      </section>

      {/* Company Intro Split Layout */}
      <section className="px-8 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Who We Are</h2>
        <p className="text-gray-700 text-lg">
          Syancy Innovations Private Limited specializes in Data Engineering, Business Intelligence, and AI-powered Automation. We help organizations harness the full potential of their data through precision insights, intuitive dashboards, and scalable technology.<br />
          Our solutions span multiple industries — from tailored data engineering pipelines to AI-based process automation — enabling smarter decisions, streamlined operations, and sustainable growth.
        </p>
      </section>

      {/* Core Values / What We Do */}
      <section className="py-16 bg-white/60">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-primary-dark mb-10 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2">Data Engineering Excellence</h3>
              <p className="text-gray-600">Robust pipelines & scalable infrastructure</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2">Actionable Intelligence</h3>
              <p className="text-gray-600">Intuitive dashboards & insights</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2">Automation Innovation</h3>
              <p className="text-gray-600">AI-driven workflows for efficiency</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2">Client-First Commitment</h3>
              <p className="text-gray-600">Solutions built for your unique challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-8 px-4 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-6xl text-primary-bright font-serif">“</span>
          <p className="text-2xl font-semibold text-primary-dark mb-2">To empower businesses through data-driven innovation.</p>
          <span className="text-6xl text-primary-bright font-serif">”</span>
        </div>
        <div>
          <span className="text-6xl text-primary-bright font-serif">“</span>
          <p className="text-2xl font-semibold text-primary-dark mb-2">To be the most trusted partner for digital transformation.</p>
          <span className="text-6xl text-primary-bright font-serif">”</span>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 bg-white/60">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary-dark mb-4 text-center">Why Choose Us?</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-lg text-gray-700"><CheckCircle className="text-green-500 mr-2" />Tailored industry-specific solutions</li>
            <li className="flex items-center text-lg text-gray-700"><CheckCircle className="text-green-500 mr-2" />Proven track record of success</li>
            <li className="flex items-center text-lg text-gray-700"><CheckCircle className="text-green-500 mr-2" />Expert team of data engineers & AI specialists</li>
            <li className="flex items-center text-lg text-gray-700"><CheckCircle className="text-green-500 mr-2" />Scalable frameworks for long-term growth</li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 px-4 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl py-6 px-4 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to transform your business with data?</h2>
          <button className="bg-white text-primary-dark font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition">Let’s Talk</button>
        </div>
      </section>
    </main>
  )
}
