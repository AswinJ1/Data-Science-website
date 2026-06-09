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
import CloudPartners from "@/components/cloud-partners"
import TestimonialCarousel from "@/components/testimonial"
import OurServicesHighlight from "@/components/our-services"
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* <Navigation /> */}
      <HeroSection />
      <StatsSection />
      <TechSolutions />
      <OurServicesHighlight />
      {/* <CaseStudiesSection /> */}
      <CloudPartners />
      <Sponsor />
      {/* <TestimonialCarousel /> */}
      {/* <TestimonialsMarquee /> */}
        <FAQSection />
      <CTASection />
    
      {/* <Footer /> */}
    </main>
  )
}
