import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import AutoSection from "@/components/landing/AutoSection";
import WhyAutoSection from "@/components/landing/WhyAutoSection";
import ModelsSection from "@/components/landing/ModelsSection";
import VSCodeSection from "@/components/landing/VSCodeSection";
import AgentSection from "@/components/landing/AgentSection";
import ReliabilitySection from "@/components/landing/ReliabilitySection";
import DevExperienceSection from "@/components/landing/DevExperienceSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { faqs } from "@/components/landing/faqData";
import { MIN_RECHARGE } from "@/lib/wallet";

export const metadata: Metadata = {
  title: "MisterPilot — AI Coding Assistant with Automatic Model Selection",
  description:
    "MisterPilot Auto picks the best AI model — GPT, Claude, or DeepSeek — for every coding task in VS Code. Bring your own keys, 1M-token context, MCP support. Pay as you go, no subscription.",
  keywords: [
    "AI coding assistant",
    "VS Code AI extension",
    "Cursor alternative",
    "Claude Code alternative",
    "GitHub Copilot alternative",
    "AI model router",
    "bring your own API key",
    "MCP VS Code",
    "DeepSeek VS Code",
  ],
  openGraph: {
    title: "MisterPilot — Stop Choosing Models. Start Building.",
    description:
      "One VS Code extension. OpenAI, Claude and DeepSeek. MisterPilot Auto routes every request to the right model automatically.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MisterPilot — AI That Picks The Right AI",
    description: "Automatic model routing for coding in VS Code. Pay as you go.",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MisterPilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    description:
      "AI coding assistant for VS Code with automatic model selection across OpenAI, Claude and DeepSeek.",
    offers: { "@type": "Offer", price: String(MIN_RECHARGE), priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <AutoSection />
        <WhyAutoSection />
        <ModelsSection />
        <VSCodeSection />
        <AgentSection />
        <ReliabilitySection />
        <DevExperienceSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
