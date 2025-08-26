'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
            Contact our team
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Got any questions about the product or scaling on our platform? We're here to help.
            Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
        </div>

        {/* Content */}
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2">
          {/* Left: Contact Form */}
          <Card className="border-slate-200/80">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* First name */}
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="First name" className="h-11" />
                </div>
                {/* Last name */}
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Last name" className="h-11" />
                </div>
                {/* Email */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" className="h-11" />
                </div>
                {/* Phone */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-11" />
                </div>
                {/* Message */}
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Leave us a message..." className="min-h-[120px]" />
                </div>
                {/* Services checkboxes */}
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <Label>Services</Label>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <label className="flex items-center gap-2">
                      <Checkbox /> Data Analytics
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> Machine Learning
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> Web Development
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> Dashboard Design
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> Data Visualization
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> Other
                    </label>
                  </div>
                </div>
                {/* Submit */}
                <div className="col-span-1 md:col-span-2 pt-2">
                  <Button type="submit" className="h-11 w-full rounded-xl bg-blue-900 text-white hover:bg-blue-800">
                    Send message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Right: Contact Info */}
          <div className="space-y-10">
            {/* Chat with us */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Chat with us</h3>
              <p className="mt-1 text-sm text-slate-600">Speak to our friendly team via live chat.</p>
              <ul className="mt-3 space-y-2 text-sm text-blue-700">
                <li className="flex items-center gap-2 cursor-pointer hover:underline">
                  <MessageSquare className="h-4 w-4" /> Start a live chat
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:underline">
                  <Mail className="h-4 w-4" /> Shoot us an email
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:underline">
                  <MessageSquare className="h-4 w-4" /> Message us on X
                </li>
              </ul>
            </div>

            {/* Call us */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Call us</h3>
              <p className="mt-1 text-sm text-slate-600">Call our team Mon–Fri from 8am to 5pm.</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
                <Phone className="h-4 w-4 text-blue-700" /> +1 (555) 000-0000
              </p>
            </div>

            {/* Visit us */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Visit us</h3>
              <p className="mt-1 text-sm text-slate-600">Chat to us in person at our Melbourne HQ.</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
                <MapPin className="h-4 w-4 text-blue-700" /> 100 Smith Street, Collingwood VIC 3066
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
