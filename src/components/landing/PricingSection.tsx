import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "No monthly subscription",
  "No hidden charges",
  "Recharge when needed",
  "Usage-based billing",
  "Full cost visibility",
  "DeepSeek V3 & R1 included",
  "API key management",
  "Real-time analytics dashboard",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(53,170,53,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-xs font-medium mb-2">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            <span className="gradient-text">Simple</span> Pricing
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            No complicated tiers. No surprise bills. Pay exactly for what you use.
          </p>
        </div>

        {/* Pricing card */}
        <div className="max-w-md mx-auto">
          <div className="relative rounded-2xl border border-green/40 bg-bg-secondary overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-green via-green-hover to-gold" />

            <div className="p-8">
              {/* Plan name */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">Pay As You Go</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold gradient-text">₹0</span>
                  <span className="text-text-muted">/month</span>
                </div>
                <p className="text-sm text-text-secondary mt-2">
                  Recharge your wallet. Pay only for actual usage.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/register"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-green hover:bg-green-hover transition-all shadow-lg shadow-green/20 text-sm"
              >
                Get Started — Free
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-xs text-text-muted mt-4">
                No credit card required. Start building immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
