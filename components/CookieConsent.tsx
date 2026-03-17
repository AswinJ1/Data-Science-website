"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowConsent(false);
    // Dispatch an event so the GoogleAnalytics component knows to initialize
    window.dispatchEvent(new Event("cookie_consent_accepted"));
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "false");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed md:pr-10">
              <span className="font-semibold text-black dark:text-white block mb-1">
                We value your privacy
              </span>
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies required for user analytics. 
              Read our <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline font-medium">Privacy Policy</Link> and <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline font-medium">Terms & Cookies</Link>.
            </div>
            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={declineCookies}
                className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
