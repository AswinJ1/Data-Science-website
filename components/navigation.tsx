"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronUp, ChevronDown } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Demo", href: "/demo" }
  ]

  const serviceItems = [
    { name: "Data Engineering", href: "/services/data-engineering" },
    { name: "Data Crunching", href: "/services/data-crunching" },
    { name: "Data Analysis", href: "/services/data-analysis" },
    { name: "Data Science", href: "/services/data-science" },
    { name: "Data Mining", href: "/services/data-mining" }
  ]

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsServicesOpen(false)
    }
    
    if (isServicesOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isServicesOpen])

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.webp" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-xl font-bold text-primary-dark">SYANCY INNOVATIONS</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary-dark hover:text-primary-bright transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Services Dropdown */}
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsServicesOpen(!isServicesOpen)
                  }}
                  className="flex items-center text-primary-dark hover:text-primary-bright transition-colors duration-200 font-medium"
                >
                  Services
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {serviceItems.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-primary-dark hover:text-primary-bright hover:bg-gray-50 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">Get a Quote</Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-primary-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-primary-dark hover:text-primary-bright transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Services Section */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-2 text-primary-dark hover:text-primary-bright transition-colors"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block py-1 text-sm text-gray-600 hover:text-primary-bright transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Button className="w-full mt-4 bg-gradient-primary">Get a Quote</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-primary text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity z-40"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  )
}
