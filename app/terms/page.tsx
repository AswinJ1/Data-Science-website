import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Cookies - Syancy Innovations",
  description: "Terms of Service and Cookie Policy for Syancy Innovations.",
};

export default function TermsAndCookiesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 py-20 px-4">
      <main className="max-w-4xl mx-auto space-y-12">
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl  tracking-tight text-black dark:text-white">
            Terms of Service & Cookie Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Last Updated: March 2026
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          
          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Syancy Innovations' website for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">3. Disclaimer</h2>
            <p>
              The materials on our website are provided on an 'as is' basis. Syancy Innovations makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>
          
          <hr className="my-12 border-gray-300 dark:border-gray-800" />

          <div className="space-y-4 mb-8">
            <h1 className="text-3xl  tracking-tight text-black dark:text-white">
              Cookie Policy
            </h1>
          </div>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">1. What are Cookies?</h2>
            <p>
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the site or a third-party to recognize you and make your next visit easier and the site more useful to you.
            </p>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">2. How Syancy Innovations Uses Cookies</h2>
            <p>
              When you use and access the website, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential cookies:</strong> Required for the operation of the site. We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
              <li><strong>Analytics cookies:</strong> Used to track information how the website is used so that we can make improvements. We may also use analytics cookies to test new pages, features or new functionality of the website to see how our users react to them.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl text-black dark:text-white">3. Your Choices Regarding Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. 
              Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl  text-black dark:text-white">4. Contact Us</h2>
            <p>
              If you have any questions about this Terms of Service or Cookie Policy, please <Link href="/contact" className="text-blue-600 hover:text-blue-500 underline">contact us</Link>.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}