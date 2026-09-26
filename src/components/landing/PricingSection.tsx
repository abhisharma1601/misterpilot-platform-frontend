import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { SectionHeader } from "./shared";
import { MIN_RECHARGE } from "@/lib/wallet";

const creditFeatures = [
  "No monthly subscription",
  "No hidden charges — recharge when needed",
  "OpenAI, Claude & DeepSeek models",
  "MisterPilot Auto routing",
  "MCP, agent tools & up to 1M context",
  "Real-time usage & cost dashboard",
  "API key management",
];

const byokFeatures = [
  "Use your OpenAI, Anthropic & DeepSeek keys",
  "Billed directly by your provider",
  "Keys encrypted in AWS Secrets Manager",
  "Same extension, Auto routing & tools",
  "Mix: your keys + MisterPilot credits",
];

const comparison: [string, boolean | string, boolean | string][] = [
  ["Monthly subscription", `None — from ₹${MIN_RECHARGE}, pay as you go`, "Usually required"],
  ["Pay only for what you use", true, false],
  ["OpenAI + Claude + DeepSeek in one place", true, "Varies"],
  ["Automatic model routing", true, "Varies"],
  ["Bring your own API keys", true, "Varies"],
  ["Works in your existing VS Code", true, "Varies"],
  ["Per-request cost visibility", true, false],
];

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (value === true) return <Check className="w-4 h-4 text-green mx-auto" />;
  if (value === false) return <Minus className="w-4 h-4 text-text-muted mx-auto" />;
  return <span className={highlight ? "text-text-primary font-medium" : "text-text-muted"}>{value}</span>;
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-16 bg-bg-secondary/30 border-y border-border">
      <div className="max-w-6xl mx-auto relative">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Pay for Tokens, <span className="gradient-text">Not Subscriptions</span>
            </>
          }
          sub="No complicated tiers. No surprise bills. Recharge your wallet or bring your own keys — and Auto keeps every rupee working harder."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16">
          {/* Credits */}
          <div className="relative rounded-3xl border border-green/40 bg-bg-secondary overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green via-[#4ade80] to-gold" />
            <div className="p-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-text-primary">MisterPilot Credits</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-green/15 text-green text-xs font-semibold">
                  Most popular
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-text-muted text-sm">Start with</span>
                <span className="text-5xl font-bold gradient-text">₹{MIN_RECHARGE}</span>
              </div>
              <p className="text-sm text-text-secondary mt-2 mb-7">
                Minimum recharge ₹{MIN_RECHARGE}. Pay as you go — only for actual usage.
              </p>
              <ul className="space-y-3 mb-8">
                {creditFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                    <span className="w-5 h-5 rounded-full bg-green/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-green hover:bg-green-hover transition-all shadow-lg shadow-green/20 text-sm"
              >
                Start with ₹{MIN_RECHARGE}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-text-muted mt-3">No subscription. Recharge only when you need to.</p>
            </div>
          </div>

          {/* BYOK */}
          <div className="rounded-3xl border border-border bg-bg-secondary p-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-text-primary">Bring Your Own Key</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-muted text-gold text-xs font-semibold">
                Full control
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-bold text-text-primary">Your keys</span>
            </div>
            <p className="text-sm text-text-secondary mt-2 mb-7">
              Already have provider accounts? Use them directly.
            </p>
            <ul className="space-y-3 mb-8">
              {byokFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="w-5 h-5 rounded-full bg-gold-muted flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-gold" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-text-primary border border-border hover:border-border-light hover:bg-bg-tertiary transition-all text-sm"
            >
              Connect your keys
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Comparison */}
        <h3 className="text-center text-2xl font-bold text-text-primary mb-6">
          MisterPilot vs typical subscription AI coding tools
        </h3>
        <div className="rounded-2xl border border-border overflow-x-auto max-w-4xl mx-auto bg-bg-primary/40">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="text-left font-semibold text-text-muted px-5 py-4" />
                <th className="font-semibold text-green px-5 py-4 bg-green/5 w-44">MisterPilot</th>
                <th className="font-semibold text-text-secondary px-5 py-4 w-44">Subscription tools</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([label, ours, theirs]) => (
                <tr key={label} className="border-b border-border last:border-0">
                  <td className="px-5 py-3.5 text-text-primary">{label}</td>
                  <td className="px-5 py-3.5 text-center bg-green/5">
                    <Cell value={ours} highlight />
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Cell value={theirs} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
