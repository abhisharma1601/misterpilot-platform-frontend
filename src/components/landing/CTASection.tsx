import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MARKETPLACE_URL } from "./shared";
import { MIN_RECHARGE } from "@/lib/wallet";

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl border border-green/30 bg-bg-secondary overflow-hidden text-center px-6 sm:px-8 py-16 sm:py-20">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(53,170,53,0.14) 0%, transparent 70%)",
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/60 to-transparent" />

          <div className="relative space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
              Your Next Commit Deserves <br className="hidden sm:block" />
              <span className="gradient-text">The Right Model</span>
            </h2>

            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              Install MisterPilot in under a minute. No subscription, no model-juggling —
              just better code, faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-green hover:bg-green-hover transition-all shadow-lg shadow-green/20 text-sm"
              >
                Install for VS Code
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-text-primary border border-border hover:border-border-light hover:bg-bg-tertiary transition-all text-sm"
              >
                Get started from ₹{MIN_RECHARGE}
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 mx-auto rounded-lg border border-border bg-bg-primary px-4 py-2.5 font-mono text-xs text-text-secondary max-w-full overflow-x-auto">
              <span className="text-green">$</span>
              <span className="whitespace-nowrap">code --install-extension MisterPilot.misterpilot</span>
            </div>

            <p className="text-xs text-text-muted">Start with ₹{MIN_RECHARGE}. Pay as you go.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
