"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check initial consent status
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "true") {
      setConsentGiven(true);
    }

    // Listen for accepted cookies via our banner
    const handleConsent = () => {
      setConsentGiven(true);
    };

    window.addEventListener("cookie_consent_accepted", handleConsent);
    return () => window.removeEventListener("cookie_consent_accepted", handleConsent);
  }, []);

  // Do not render on dashboard pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin") || pathname?.startsWith("/hr")) {
    return null;
  }

  // Do not render if consent is not given
  if (!consentGiven) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-FY8Z7BVCP6`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FY8Z7BVCP6', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}