"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaPhone, FaMapPin } from "react-icons/fa";
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
             <img src="/logo.webp" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-xl font-bold">SYANCY INNOVATIONS</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming businesses through intelligent data solutions. From engineering to insights, we make your
              data work for you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-bright transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-bright transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-bright transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-bright transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/data-engineering"
                  className="text-gray-300 hover:text-primary-bright transition-colors"
                >
                  Data Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/data-crunching"
                  className="text-gray-300 hover:text-primary-bright transition-colors"
                >
                  Data Crunching
                </Link>
              </li>
              <li>
                <Link
                  href="/services/data-analysis"
                  className="text-gray-300 hover:text-primary-bright transition-colors"
                >
                  Data Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/services/data-science"
                  className="text-gray-300 hover:text-primary-bright transition-colors"
                >
                  Data Science
                </Link>
              </li>
              <li>
                <Link
                  href="/services/data-mining"
                  className="text-gray-300 hover:text-primary-bright transition-colors"
                >
                  Data Mining
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-bright transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-300 hover:text-primary-bright transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-primary-bright transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-primary-bright transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-bright transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <FaPhone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>hello@syancyinnovations.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FaMapPin className="h-4 w-4 mt-1" />
                <span>
                  Syancy Innovations Private Limited. 

                  <br />
                  1120, Behind The Gadhi, Maratha Chauk
                  Taloda 425413 
                  Nandurbar, 
                  Maharashtra
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© {currentYear} SYANCY INNOVATIONS. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-300 hover:text-primary-bright text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-primary-bright text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-300 hover:text-primary-bright text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
