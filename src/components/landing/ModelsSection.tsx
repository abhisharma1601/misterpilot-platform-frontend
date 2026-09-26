import Link from "next/link";
import { ArrowRight, KeyRound, Lock, Receipt, Unlock, Sparkles, Layers } from "lucide-react";
import { Glow, SectionHeader } from "./shared";

const providers = [
  {
    name: "OpenAI",
    mark: "◎",
    desc: "Versatile, fast GPT models for everyday coding and quick edits.",
    accent: "text-text-primary",
  },
  {
    name: "Claude",
    mark: "✳",
    desc: "Careful reasoning and large-context code understanding from Anthropic.",
    accent: "text-[#D97757]",
  },
  {
    name: "DeepSeek",
    mark: "◆",
    desc: "Strong coding performance at a fraction of the cost.",
    accent: "text-sky-400",
    models: ["deepseek-chat", "deepseek-reasoner"],
  },
];

const byokPoints = [
  { icon: <Unlock className="w-4 h-4" />, title: "Full control", desc: "Your keys, your provider accounts, your limits." },
  { icon: <Receipt className="w-4 h-4" />, title: "Direct billing", desc: "Usage goes straight to your provider invoice." },
  { icon: <KeyRound className="w-4 h-4" />, title: "Use what you have", desc: "Existing credits and subscriptions just work." },
  { icon: <Lock className="w-4 h-4" />, title: "Stored securely", desc: "Keys encrypted and managed with AWS Secrets Manager." },
];

const keyRows = [
  { provider: "OpenAI", key: "sk-••••••••••4f2a", own: true },
  { provider: "Anthropic", key: "sk-ant-••••••••91c", own: true },
  { provider: "DeepSeek", key: "MisterPilot credits", own: false },
];

export default function ModelsSection() {
  return (
    <section id="models" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-16">
      <Glow position="80% 30%" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          eyebrow="Models"
          title={
            <>
              All Your AI Models. <span className="gradient-text">One Workspace.</span>
            </>
          }
          sub="OpenAI, Claude, and DeepSeek in one extension, one chat, one bill. No vendor lock-in — when a better model ships, you get it."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {providers.map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl border border-border bg-bg-secondary p-7 hover:border-border-light hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`w-11 h-11 rounded-xl bg-bg-tertiary border border-border flex items-center justify-center text-xl ${p.accent}`}
                  aria-hidden
                >
                  {p.mark}
                </span>
                <h3 className="text-xl font-bold text-text-primary">{p.name}</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
              {p.models && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.models.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-md bg-bg-tertiary border border-border text-xs font-mono text-text-secondary"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-text-secondary mb-20">
          <span className="inline-flex items-center gap-2"><Unlock className="w-4 h-4 text-green" />No vendor lock-in</span>
          <span className="inline-flex items-center gap-2"><Sparkles className="w-4 h-4 text-green" />Latest models as they launch</span>
          <span className="inline-flex items-center gap-2"><Layers className="w-4 h-4 text-green" />One unified experience</span>
        </div>

        {/* BYOK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-3xl border border-border bg-bg-secondary/60 p-6 sm:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold-muted text-gold text-xs font-semibold uppercase tracking-wider">
              <KeyRound className="w-3.5 h-3.5" />
              Bring your own key
            </div>
            <h3 className="text-3xl font-bold text-text-primary tracking-tight">
              Use Your Own AI Keys.
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Already paying OpenAI, Anthropic, or DeepSeek? Connect your API keys and
              MisterPilot uses them directly — billed by the provider, at their rates. Or
              skip keys entirely and use MisterPilot credits.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {byokPoints.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-green/10 text-green flex items-center justify-center">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{b.title}</p>
                    <p className="text-xs text-text-secondary leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green hover:text-text-primary transition-colors"
            >
              Connect your keys
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Settings mock */}
          <div className="rounded-2xl border border-border bg-bg-primary shadow-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-bg-secondary flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted">settings › providers</span>
              <Lock className="w-3.5 h-3.5 text-text-muted" />
            </div>
            <div className="divide-y divide-border">
              {keyRows.map((r) => (
                <div key={r.provider} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary">{r.provider}</p>
                    <p className="text-xs font-mono text-text-muted truncate">{r.key}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs ${r.own ? "text-gold" : "text-text-muted"}`}>
                      {r.own ? "Your key" : "Credits"}
                    </span>
                    <span
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        r.own ? "bg-gold/80" : "bg-bg-tertiary border border-border"
                      }`}
                      aria-hidden
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                          r.own ? "left-[18px]" : "left-0.5"
                        }`}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
