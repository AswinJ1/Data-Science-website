'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ContactSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center">
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.18em] text-slate-500">
            GET STARTED
          </span>
          <h1 className="mx-auto max-w-3xl text-2xl sm:text-3xl font-light leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
            Let's transform your data into insights
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Ready to unlock the power of your data? Schedule a consultation and discover how our
            data science and web development solutions can drive your business forward.
          </p>
        </div>

        {/* Content */}
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {/* Left: Testimonial */}
          <Card className="border-slate-200/80">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <figure className="space-y-6">
                <blockquote className="text-[15px] leading-7 text-slate-700 md:text-base">
                  <p className="[&_span]:inline">
                    <span className="block">
                      "The data analytics platform they built revolutionized our
                      decision-making process. Their web development team created
                      a stunning dashboard that makes complex data accessible to
                      our entire organization."
                    </span>
                  </p>
                </blockquote>
                <figcaption className="space-y-1">
                  <div className="text-sm font-medium text-slate-900">Sarah Mitchell</div>
                  <div className="text-xs text-slate-500">CTO - TechVision Analytics</div>
                </figcaption>
              </figure>

              <div className="mt-10 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                We specialize in end-to-end data solutions: from machine learning models
                and predictive analytics to responsive web applications and interactive
                dashboards. Transform your raw data into actionable business intelligence.
              </div>
            </CardContent>
          </Card>

          {/* Right: Form */}
          <Card className="border-slate-200/80">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* First name */}
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    First name
                  </Label>
                  <Input id="firstName" placeholder="First name" required className="h-11" />
                </div>

                {/* Last name */}
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    Last name
                  </Label>
                  <Input id="lastName" placeholder="Last name" required className="h-11" />
                </div>

                {/* Work email */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    Work email
                  </Label>
                  <Input id="email" type="email" placeholder="Work email" required className="h-11" />
                </div>

                {/* Company size */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    Company size
                  </Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-10)</SelectItem>
                      <SelectItem value="small">Small Business (11-50)</SelectItem>
                      <SelectItem value="medium">Medium Enterprise (51-200)</SelectItem>
                      <SelectItem value="large">Large Enterprise (201-1000)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry */}
                <div className="space-y-1.5">
                  <Label className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    Industry
                  </Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                      <SelectItem value="fintech">FinTech & Banking</SelectItem>
                      <SelectItem value="healthcare">Healthcare & MedTech</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing & IoT</SelectItem>
                      <SelectItem value="education">EdTech & Education</SelectItem>
                      <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
                      <SelectItem value="saas">SaaS & Technology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary service */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label className="text-slate-700 after:ml-0.5 after:text-blue-600 after:content-['*']">
                    Which service are you most interested in?
                  </Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select primary service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data-analytics">Data Analytics & Business Intelligence</SelectItem>
                      <SelectItem value="machine-learning">Machine Learning & AI Solutions</SelectItem>
                      <SelectItem value="web-development">Custom Web Development</SelectItem>
                      <SelectItem value="dashboard">Interactive Dashboards & Visualization</SelectItem>
                      <SelectItem value="data-pipeline">Data Pipeline & ETL Solutions</SelectItem>
                      <SelectItem value="full-stack">Full-Stack Data Solutions</SelectItem>
                      <SelectItem value="consulting">Data Strategy Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project timeline */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label className="text-slate-700">When do you want to start your project?</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="exploring">Just exploring options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <div className="col-span-1 md:col-span-2 pt-2">
                  <Button type="submit" className="h-11 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                    Start Your Data Journey
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
