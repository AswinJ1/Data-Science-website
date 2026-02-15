"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <div className="mb-3">
              <img 
                alt="Syancy Logo" 
                src="/syancy1.png" 
                className="h-8 w-auto filter invert brightness-0 contrast-100" 
              />             
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Transforming businesses through intelligent data solutions.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 hover:bg-blue-800">
                <FaFacebook className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 hover:bg-blue-800">
                <FaTwitter className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 hover:bg-blue-800">
                <FaLinkedin className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 hover:bg-blue-800">
                <FaGithub className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-white text-sm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-1">
              <Button variant="link" className="p-0 h-auto text-blue-200 hover:text-white text-xs justify-start">
                <Link href="/about">About</Link>
              </Button>
              <Button variant="link" className="p-0 h-auto text-blue-200 hover:text-white text-xs justify-start">
                <Link href="/services">Services</Link>
              </Button>
              <Button variant="link" className="p-0 h-auto text-blue-200 hover:text-white text-xs justify-start">
                <Link href="/solutions">Solutions</Link>
              </Button>
              <Button variant="link" className="p-0 h-auto text-blue-200 hover:text-white text-xs justify-start">
                <Link href="/careers">Careers</Link>
              </Button>
              <Button variant="link" className="p-0 h-auto text-blue-200 hover:text-white text-xs justify-start">
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="link" className="p-0 h-auto text-blue-200 hover:text-white text-xs justify-start">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-white text-sm">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-200 text-xs">
                <Phone className="h-3 w-3 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-xs">
                <Mail className="h-3 w-3 flex-shrink-0" />
                <span>info@syancy.com</span>
              </div>
              <div className="flex items-start gap-2 text-blue-200 text-xs">
                <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
                <span>Taloda, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-blue-700" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-blue-300 text-xs">
            © {currentYear} SYANCY INNOVATIONS. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="link" className="p-0 h-auto text-blue-300 hover:text-white text-xs">
              <Link href="/privacy">Privacy</Link>
            </Button>
            <Button variant="link" className="p-0 h-auto text-blue-300 hover:text-white text-xs">
              <Link href="/terms">Terms</Link>
            </Button>
            <Button variant="link" className="p-0 h-auto text-blue-300 hover:text-white text-xs">
              <Link href="/cookies">Cookies</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
