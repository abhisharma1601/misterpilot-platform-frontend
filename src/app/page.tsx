import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhySection from "@/components/landing/WhySection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DevExperienceSection from "@/components/landing/DevExperienceSection";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />
      <main>
        <HeroSection />
        <WhySection />
        <FeaturesSection />
        <HowItWorksSection />
        <DevExperienceSection />
        <AnalyticsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
