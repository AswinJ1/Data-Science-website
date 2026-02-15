import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteShell } from "@/components/site-shell"
import Providers from "@/components/providers"



const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Syancy Innovations - Transform Your Data into Insights",
  description:
    "Professional data engineering, analytics, and machine learning solutions. Transform your business with intelligent data strategies.",
  keywords: "data engineering, data science, data analytics, machine learning, business intelligence, data mining, AI consulting",
  authors: [{ name: "Syancy Innovations" }],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Syancy Innovations - Transform Your Data into Insights",
    description: "Professional data engineering, analytics, and machine learning solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syancy Innovations - Transform Your Data into Insights",
    description: "Professional data engineering, analytics, and machine learning solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SiteShell>
            {children}
          </SiteShell>
        </Providers>
      </body>
    </html>
  )
}
