import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import TechSolutions from "@/components/services-section"
import CaseStudiesSection from "@/components/case-studies-section"
import TestimonialsMarquee from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import FAQSection from "@/components/faq"
import StatsSection from "@/components/stats"
import Sponsor from "@/components/sponsor"
import TestimonialCarousel from "@/components/testimonial"
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* <Navigation /> */}
      <HeroSection />
      <StatsSection />
      <TechSolutions />
      {/* <CaseStudiesSection /> */}
      <Sponsor />
      {/* <TestimonialCarousel /> */}
      {/* <TestimonialsMarquee /> */}
        <FAQSection />
      <CTASection />
    
      {/* <Footer /> */}
    </main>
  )
}
