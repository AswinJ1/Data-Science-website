import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CTASection from "@/components/cta-section"



const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "DataFlow - Transform Your Data into Insights",
  description:
    "Professional data engineering, analytics, and machine learning solutions. Transform your business with intelligent data strategies.",
  keywords: "data engineering, data science, data analytics, machine learning, business intelligence, data mining",
  authors: [{ name: "DataFlow Team" }],
  openGraph: {
    title: "DataFlow - Transform Your Data into Insights",
    description: "Professional data engineering, analytics, and machine learning solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataFlow - Transform Your Data into Insights",
    description: "Professional data engineering, analytics, and machine learning solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navigation />
        {children}
        <script src='https://www.noupe.com/embed/0199349c59a27ba5b517561ef42cfba33233.js'></script>
        <Footer />
      </body>
    </html>
  )
}
