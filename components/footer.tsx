"use client";

import Link from "next/link";
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaTelegram } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-slate-200 font-sans border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Main Grid: Left Logo/Description + Right Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10">
          
          {/* Left Column: Logo & Description */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6">
            <Link href="/" className="inline-block">
              <img
                src="/wordmark.svg"
                alt="Syancy Innovations"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-blue-100 text-xs leading-relaxed max-w-sm font-normal">
              Syancy Innovations is a strategic intelligence partner committed to transforming complex data, institutional requirements, and industry capabilities into actionable, transparent, and efficient solutions.
            </p>
          </div>

          {/* Right Columns Layout (4 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            
            {/* Column 1: Explore */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-semibold tracking-wide">Explore</h4>
              <ul className="space-y-2 text-xs font-normal text-blue-200">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
                <li><Link href="/technologies" className="hover:text-white transition-colors">Technologies</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-semibold tracking-wide">Services</h4>
              <ul className="space-y-2 text-xs font-normal text-blue-200">
                <li><Link href="/services/data-engineering" className="hover:text-white transition-colors">Data Engineering</Link></li>
                <li><Link href="/services/data-science" className="hover:text-white transition-colors">Data Science</Link></li>
                <li><Link href="/services/ai-ml-solutions" className="hover:text-white transition-colors">AI & ML Solutions</Link></li>
                <li><Link href="/services/data-analytics" className="hover:text-white transition-colors">Data Analytics</Link></li>
                <li><Link href="/services/data-modernization" className="hover:text-white transition-colors">Data Modernization</Link></li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-semibold tracking-wide">Solutions</h4>
              <ul className="space-y-2 text-xs font-normal text-blue-200">
                <li><Link href="/solutions/healthcare" className="hover:text-white transition-colors">Healthcare</Link></li>
                <li><Link href="/solutions/finance" className="hover:text-white transition-colors">Financial Services</Link></li>
                <li><Link href="/solutions/retail-e-commerce" className="hover:text-white transition-colors">Retail / E-Commerce</Link></li>
                <li><Link href="/solutions/manufacturing" className="hover:text-white transition-colors">Manufacturing</Link></li>
                <li><Link href="/solutions/public-sector" className="hover:text-white transition-colors">Public Sector</Link></li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-semibold tracking-wide">Resources</h4>
              <ul className="space-y-2 text-xs font-normal text-blue-200">
                <li><Link href="/blog" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Insights & Blog</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ & Support</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              </ul>
            </div>

          </div>

        </div>

        <Separator className="bg-white my-4" />

        {/* Bottom Bar: Copyright (Left) | Email (Center) | Bigger Social Icons (Right) */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-normal text-blue-200">
          
          {/* Left: Copyright */}
          <p>© {currentYear} Syancy Innovations. All rights reserved.</p>

          {/* Middle: Contact Email */}
          <p className="text-blue-100">
            Email: <a href="mailto:info@syancy.com" className="underline hover:text-white transition-colors">info@syancy.com</a>
          </p>

          {/* Right: Larger Social Media Icons (FA6 Library) */}
          <div className="flex items-center gap-5">
            {/* <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-200 hover:text-white transition-all transform hover:scale-110"
              aria-label="Twitter / X"
            >
              <FaXTwitter className="h-6 w-6" />
            </a> */}
            {/* <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-200 hover:text-white transition-all transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a> */}
            {/* <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="text-blue-200 hover:text-white transition-all transform hover:scale-110"
              aria-label="Telegram"
            >
              <FaTelegram className="h-6 w-6" />
            </a> */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-200 hover:text-white transition-all transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="h-6 w-6" />
            </a>
            {/* <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-200 hover:text-white transition-all transform hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube className="h-6 w-6" />
            </a> */}
          </div>

        </div>

      </div>
    </footer>
  );
}
