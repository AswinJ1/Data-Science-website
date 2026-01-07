"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const ZTMHeader = () => {
  const [academyOpen, setAcademyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const handleAcademyClick = () => {
    setAcademyOpen(!academyOpen);
    setResourcesOpen(false);
  };

  const handleResourcesClick = () => {
    setResourcesOpen(!resourcesOpen);
    setAcademyOpen(false);
  };

  return (
    <header className="border-b border-gray-200">
      <nav role="navigation" className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Left Container - Logo */}
          <div className="flex items-center">
            <a href="/" aria-label="ZTM logo" className="block">
<Image src="/syancy1.png" alt="ZTM Logo" width={96} height={48} />
            </a>
          </div>

          {/* Right Container - Navigation */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Academy Dropdown */}
              <div className="relative">
                <button
                  onClick={handleAcademyClick}
                  aria-expanded={academyOpen}
                  aria-label="Toggle Academy Dropdown"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Academy
                  <ChevronDown className={`w-3 h-3 transition-transform ${academyOpen ? 'rotate-180' : ''}`} />
                </button>

                {academyOpen && (
                  <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white shadow-xl rounded-lg p-8 z-50">
                    <div className="grid grid-cols-12 gap-8">
                      {/* Left Section */}
                      <div className="col-span-5 space-y-6">
                        <div>
                          <h6 className="text-sm font-semibold text-gray-900 mb-2">services</h6>
                          <p className="text-sm text-gray-600 mb-4">
                            150+ high-quality video services taught by experts with hands-on projects
                          </p>
                          <a href="/services/?category=all" className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                            VIEW ALL  SERVICES
                          </a>
                        </div>

                        <div>
                          <h6 className="text-sm font-semibold text-gray-900 mb-2">Career Paths</h6>
                          <p className="text-sm text-gray-600 mb-4">
                            We'll teach you step-by-step all the skills needed to be job ready
                          </p>
                          <a href="/career-paths/" className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                            VIEW ALL CAREER PATHS
                          </a>
                        </div>
                      </div>

                      {/* Right Section - Categories */}
                      <div className="col-span-7">
                        <p className="text-xs font-semibold text-gray-500 mb-4">EXPLORE SERVICES BY CATEGORY:</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <a href="/services/?category=development" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Development</a>
                          <a href="/services/?category=ai_machine_learning" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">A.I. & Machine Learning</a>
                          <a href="/services/?category=build_with_ai" className="text-sm text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2">
                            Build With A.I.
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded">NEW</span>
                          </a>
                          <a href="/services/?category=cyber_security" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Cyber Security</a>
                          <a href="/services/?category=design" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Design</a>
                          <a href="/services/?category=cloud_devops" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Cloud & DevOps</a>
                          <a href="/services/?category=web3_blockchain" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Web3 & Blockchain</a>
                          <a href="/services/?category=business_data" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Business & Data</a>
                          <a href="/services/?category=life_skills" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Life Skills</a>
                        </div>

                        {/* Additional Links */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <a href="/services/?category=all" className="flex items-start gap-3 p-3 rounded hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 20 20" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M19 3.03125L1 3.03125V13.3333L19 13.3333V3.03125ZM1 2.03125C0.447715 2.03125 0 2.47896 0 3.03125V13.3333C0 13.8856 0.447716 14.3333 1 14.3333H19C19.5523 14.3333 20 13.8856 20 13.3333V3.03125C20 2.47897 19.5523 2.03125 19 2.03125H1Z" fill="currentColor"/>
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Bootcamps</p>
                              <p className="text-xs text-gray-600">Our world-famous video services</p>
                            </div>
                          </a>

                          <a href="/passport/" className="flex items-start gap-3 p-3 rounded hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 20 20" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M10 13.4375C11.8985 13.4375 13.4375 11.8985 13.4375 10C13.4375 8.10152 11.8985 6.5625 10 6.5625C8.10152 6.5625 6.5625 8.10152 6.5625 10C6.5625 11.8985 8.10152 13.4375 10 13.4375Z" fill="currentColor"/>
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Learning Passport</p>
                              <p className="text-xs text-gray-600">Monitor your learning and earn</p>
                            </div>
                          </a>
                        </div>

                        {/* Career Quiz Banner */}
                        <a href="/tech-career-path-quiz/" className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white hover:from-blue-700 hover:to-blue-800 transition-colors">
                          <div className="flex items-center gap-3">
                            <svg className="w-12 h-12" viewBox="0 0 51 58" fill="none">
                              <path d="M39.959 30.6249C41.4124 28.2639 42.3604 25.5585 42.6525 22.6596C43.1113 22.3047 43.5086 21.9459 43.8457 21.6088C45.3056 20.1489 46.1688 18.9884 46.5393 16.8392C47.1566 13.2591 45.7752 11.5445 45.29 11.1004C44.6979 10.5106 43.9049 10.4782 43.1837 10.6559C42.4899 10.8269 41.8299 11.1982 41.3972 11.5122C41.0806 9.83452 40.1949 7.51146 39.7166 6.38405C39.6826 6.30373 39.6036 6.25242 39.5164 6.2527C38.3778 6.2563 37.2446 6.30254 36.1224 6.38533C32.8261 3.5714 28.5492 1.87251 23.8755 1.87251C13.4523 1.87251 5.00264 10.3222 5.00264 20.7454C5.00264 21.7766 5.08534 22.7884 5.24448 23.7747C3.78693 25.6506 4.03629 27.0185 4.46424 27.7612C4.86491 28.4565 5.8188 28.5011 6.58058 28.3118C7.72118 30.9152 9.43238 33.2117 11.556 35.0432C9.21873 37.1743 6.42966 35.6546 5.15889 34.4819C5.07014 34.4 4.93191 34.4007 4.84842 34.4879C1.4622 38.0263 1.31882 43.3782 1.63864 46.2196C2.2246 51.4253 8.78214 54.5624 12.3539 55.6052C17.0217 56.9681 25.9641 56.6611 31.0479 55.8007C36.1318 54.9404 40.942 52.3593 43.9522 50.052C48.6947 45.9869 49.005 41.1712 48.8806 39.0239C48.5297 32.9661 43.2353 30.9592 39.959 30.6249Z" fill="white"/>
                            </svg>
                            <div>
                              <h6 className="text-sm font-medium">Not sure where to start?</h6>
                              <p className="text-sm font-bold">Take our career quiz</p>
                            </div>
                          </div>
                          <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Testimonials Link */}
              <a href="/testimonials/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Testimonials
              </a>

              {/* Free Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={handleResourcesClick}
                  aria-expanded={resourcesOpen}
                  aria-label="Toggle Resources Dropdown"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Free Resources
                  <ChevronDown className={`w-3 h-3 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                {resourcesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-96 bg-white shadow-xl rounded-lg p-6 z-50">
                    <div className="space-y-4">
                      <a href="/blog/" className="flex items-start gap-3 p-3 rounded hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 21 20" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.9602 19L16.9602 1L3.96021 0.999999L3.9602 19L16.9602 19ZM17.9602 1C17.9602 0.447715 17.5125 -1.95703e-08 16.9602 -4.37114e-08L3.96021 -6.11959e-07C3.40792 -6.36101e-07 2.96021 0.447715 2.96021 1L2.9602 19C2.9602 19.5523 3.40792 20 3.9602 20L16.9602 20C17.5125 20 17.9602 19.5523 17.9602 19L17.9602 1Z" fill="currentColor"/>
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Blog</p>
                          <p className="text-xs text-gray-600">Free posts, guides, and tutorials</p>
                        </div>
                      </a>

                      <a href="/cheatsheets/" className="flex items-start gap-3 p-3 rounded hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 21 20" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M18.3665 19L18.3665 1L2.55395 0.999999L2.55395 19L18.3665 19Z" fill="currentColor"/>
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Cheat Sheets</p>
                          <p className="text-xs text-gray-600">Free cheat sheets for your learning</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Community Link */}
              <a href="/community/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Community
              </a>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://academy.zerotomastery.io/sign_in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/academy/"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Join Syancy 
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ZTMHeader;