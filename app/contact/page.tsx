'use client'
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };
const fadeInLeft = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
const fadeInRight = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    industry: "",
    service: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Thank you! We'll get back to you soon.");
        setFormData({
          firstName: "", lastName: "", email: "", company: "",
          industry: "", service: "", timeline: "", message: "",
        });
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInUp}
          className="text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.18em] text-slate-500">
            GET STARTED
          </span>
          <h1 className="mx-auto max-w-3xl text-2xl sm:text-3xl font-light leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
            Let&apos;s transform your data into insights
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Ready to unlock the power of your data? Schedule a consultation and discover how our
            data science and web development solutions can drive your business forward.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {/* Left: Testimonial */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <Card className="border-slate-200/80 h-full">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col items-center text-center">
                {/* CEO Photo */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg mb-6">
                  <Image
                    src="/ceo.jpeg"
                    alt="CEO"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CEO Quote */}
                <blockquote className="text-[15px] leading-7 text-slate-700 md:text-base italic">
                  &quot;We believe every business, regardless of size, deserves
                  access to world-class data intelligence. Our mission is to
                  bridge the gap between raw data and strategic decisions 
                  empowering organizations to move faster, predict smarter, and
                  grow with confidence.&quot;
                </blockquote>

                <div className="mt-6 space-y-1">
                  <div className="text-sm font-semibold text-slate-900">Chaithanya Arya</div>
                  <div className="text-xs text-slate-500">Founder & CEO Syancy Innovations</div>
                </div>
              </div>

              <div className="mt-10 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                We specialize in end-to-end data solutions: from machine learning models
                and predictive analytics. Transform your raw data into actionable business intelligence.
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <Card className="border-slate-200/80 h-full">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* First name */}
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    First name
                  </Label>
                  <Input id="firstName" placeholder="First name" required className="h-11"
                    value={formData.firstName} onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} />
                </div>

                {/* Last name */}
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    Last name
                  </Label>
                  <Input id="lastName" placeholder="Last name" required className="h-11"
                    value={formData.lastName} onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} />
                </div>

                {/* Work email */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    Work email
                  </Label>
                  <Input id="email" type="email" placeholder="Work email" required className="h-11"
                    value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
                </div>

                {/* Company size */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700">Company size</Label>
                  <Select value={formData.company} onValueChange={(v) => setFormData((p) => ({ ...p, company: v }))}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Company size" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Startup (1-10)">Startup (1-10)</SelectItem>
                      <SelectItem value="Small Business (11-50)">Small Business (11-50)</SelectItem>
                      <SelectItem value="Medium Enterprise (51-200)">Medium Enterprise (51-200)</SelectItem>
                      <SelectItem value="Large Enterprise (201-1000)">Large Enterprise (201-1000)</SelectItem>
                      <SelectItem value="Enterprise (1000+)">Enterprise (1000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700">Industry</Label>
                  <Select value={formData.industry} onValueChange={(v) => setFormData((p) => ({ ...p, industry: v }))}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select your industry" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="E-commerce & Retail">E-commerce & Retail</SelectItem>
                      <SelectItem value="FinTech & Banking">FinTech & Banking</SelectItem>
                      <SelectItem value="Healthcare & MedTech">Healthcare & MedTech</SelectItem>
                      <SelectItem value="Manufacturing & IoT">Manufacturing & IoT</SelectItem>
                      <SelectItem value="EdTech & Education">EdTech & Education</SelectItem>
                      <SelectItem value="Logistics & Supply Chain">Logistics & Supply Chain</SelectItem>
                      <SelectItem value="SaaS & Technology">SaaS & Technology</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary service */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label className="text-slate-700">Which service are you most interested in?</Label>
                  <Select value={formData.service} onValueChange={(v) => setFormData((p) => ({ ...p, service: v }))}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select primary service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Data Analytics & Business Intelligence">Data Analytics & Business Intelligence</SelectItem>
                      <SelectItem value="Machine Learning & AI Solutions">Machine Learning & AI Solutions</SelectItem>
                      <SelectItem value="Custom Web Development">Custom Web Development</SelectItem>
                      <SelectItem value="Interactive Dashboards & Visualization">Interactive Dashboards & Visualization</SelectItem>
                      <SelectItem value="Data Pipeline & ETL Solutions">Data Pipeline & ETL Solutions</SelectItem>
                      <SelectItem value="Full-Stack Data Solutions">Full-Stack Data Solutions</SelectItem>
                      <SelectItem value="Data Strategy Consulting">Data Strategy Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project timeline */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label className="text-slate-700">When do you want to start your project?</Label>
                  <Select value={formData.timeline} onValueChange={(v) => setFormData((p) => ({ ...p, timeline: v }))}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="As soon as possible">As soon as possible</SelectItem>
                      <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="Just exploring options">Just exploring options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label htmlFor="message" className="text-slate-700">Tell us more about your project</Label>
                  <Textarea id="message" placeholder="Describe your data challenges, goals, and any specific requirements..."
                    className="min-h-[100px]" value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} />
                </div>

                {/* Submit */}
                <div className="col-span-1 md:col-span-2 pt-2">
                  <Button type="submit" disabled={loading}
                    className="h-11 w-full rounded-none bg-blue-600 text-white hover:bg-blue-700">
                    {loading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>
                    ) : (
                      "Start Your Data Journey"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
