import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import CaseStudiesSection from "@/components/case-studies-section"
import TestimonialsMarquee from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import FAQSection from "@/components/faq"
import StatsSection from "@/components/stats"
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* <Navigation /> */}
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CaseStudiesSection />
      <TestimonialsMarquee />
        <FAQSection />
      <CTASection />
    
      {/* <Footer /> */}
    </main>
  )
}
