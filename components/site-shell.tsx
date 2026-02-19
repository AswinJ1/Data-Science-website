"use client"

import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPanel = pathname.startsWith("/admin") || pathname.startsWith("/hr") || pathname.startsWith("/dashboard")

  if (isPanel) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
