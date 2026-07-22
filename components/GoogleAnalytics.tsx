"use client"

import { GoogleAnalytics } from "@next/third-parties/google"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AnalyticsWrapper() {
  const pathname = usePathname()

  const ignoredRoutes = ["/dashboard", "/admin", "/hr"]
  const isIgnoredRoute = ignoredRoutes.some((route) => pathname?.startsWith(route))

  useEffect(() => {
    if (isIgnoredRoute) return

    window.dataLayer = window.dataLayer || []

    const pushToDataLayer = (...args: any[]) => {
      window.dataLayer?.push(args)
    }

    const consent = localStorage.getItem("cookie_consent")
    if (consent === "true") {
      pushToDataLayer("consent", "update", { analytics_storage: "granted" })
    } else {
      pushToDataLayer("consent", "default", { analytics_storage: "denied" })
    }

    const handleConsentAccepted = () => {
      pushToDataLayer("consent", "update", { analytics_storage: "granted" })
    }

    window.addEventListener("cookie_consent_accepted", handleConsentAccepted)
    return () => window.removeEventListener("cookie_consent_accepted", handleConsentAccepted)
  }, [isIgnoredRoute])

  if (isIgnoredRoute) return null

  return <GoogleAnalytics gaId="G-LJCCR6JMNE" />
}