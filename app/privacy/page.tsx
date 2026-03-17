import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Syancy Innovations",
  description: "Privacy Policy outlining how Syancy Innovations collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 py-20 px-4">
      <main className="max-w-4xl mx-auto space-y-12">
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl  tracking-tight text-black dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Last Updated: March 2026
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          
          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">1. Introduction</h2>
            <p>
              Welcome to Syancy Innovations. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">2. The Data We Collect About You</h2>
            <p>
              Personal data, or personal information, means any information about an individual from which that person can be identified. 
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">3. How Is Your Personal Data Collected?</h2>
            <p>
              We use different methods to collect data from and about you including through:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Direct interactions:</strong> You may give us your Identity and Contact data by filling in forms or by corresponding with us by post, phone, email or otherwise.</li>
              <li><strong>Automated technologies or interactions:</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">4. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-2xl  text-black dark:text-white">5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. 
              In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl  text-black dark:text-white">6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please <Link href="/contact" className="text-blue-600 hover:text-blue-500 underline">contact us</Link>.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}