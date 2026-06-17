import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl border border-green/30 bg-bg-secondary overflow-hidden text-center px-8 py-16 sm:py-20">
          {/* Background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(53,170,53,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/60 to-transparent" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-sm font-medium">
              🚀 Ready to build?
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
              Start Building With{" "}
              <span className="gradient-text">AI Today</span>
            </h2>

            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              Create an account, generate an API key, and access powerful AI
              models in minutes. Or use our VS Code extension for a complete
              coding AI agent experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-green hover:bg-green-hover transition-all shadow-lg shadow-green/20 text-sm"
              >
                Get Started — Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-text-primary border border-border hover:border-border-light hover:bg-bg-tertiary transition-all text-sm"
              >
                Get VS Code Extension
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
