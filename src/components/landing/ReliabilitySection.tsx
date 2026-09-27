import { RefreshCcw, Radio, BarChart3, Wallet, Lock, UserCheck, Activity } from "lucide-react";
import { Glow, SectionHeader } from "./shared";

const tiles = [
  { icon: <RefreshCcw className="w-5 h-5" />, title: "Automatic fallbacks", desc: "If a provider has trouble, requests reroute to a healthy model." },
  { icon: <Radio className="w-5 h-5" />, title: "Real-time streaming", desc: "Responses appear as they're generated. No waiting for the full answer." },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Usage tracking", desc: "Every request logged with model, tokens, and cost." },
  { icon: <Wallet className="w-5 h-5" />, title: "Reliable billing", desc: "Prepaid wallet, accurate per-token charges, full transaction history." },
  { icon: <Lock className="w-5 h-5" />, title: "Secure secrets", desc: "API keys encrypted and stored in AWS Secrets Manager." },
  { icon: <UserCheck className="w-5 h-5" />, title: "Secure sign-in", desc: "Google or email auth, managed API keys with instant revoke." },
];

const bars = [30, 55, 40, 70, 60, 85, 72, 90, 65, 80, 88, 95];

// Illustrative mock data for the dashboard preview.
const recent = [
  { model: "deepseek-chat", tokens: "1,280", cost: "₹0.45" },
  { model: "claude", tokens: "4,210", cost: "₹3.10" },
  { model: "gpt", tokens: "962", cost: "₹0.38" },
  { model: "deepseek-reasoner", tokens: "842", cost: "₹0.12" },
];

function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-border bg-bg-primary shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-secondary">
        <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green/70" />
        <span className="ml-3 text-xs font-mono text-text-muted">misterpilot · dashboard</span>
      </div>
      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            ["Wallet Balance", "₹1,250.00", "text-gold"],
            ["API Requests", "12,847", "text-green"],
            ["Tokens Used", "2.4M", "text-green"],
            ["Amount Spent", "₹124.50", "text-gold"],
          ].map(([label, value, accent]) => (
            <div key={label} className="rounded-lg border border-border bg-bg-secondary p-3">
              <p className="text-[11px] text-text-muted mb-1">{label}</p>
              <p className={`text-sm font-bold ${accent}`}>{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-bg-secondary p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-muted">Requests — last 12 days</span>
            <Activity className="w-3 h-3 text-green" />
          </div>
          <div className="flex items-end gap-1 h-16">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: `${h}%`, background: "linear-gradient(to top, #35AA35, #4ade80)", opacity: 0.6 + i * 0.03 }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-bg-secondary divide-y divide-border">
          {recent.map((r, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2">
              <span className="text-xs font-mono text-text-secondary">{r.model}</span>
              <span className="flex items-center gap-4">
                <span className="text-xs text-text-muted">{r.tokens} tok</span>
                <span className="text-xs text-green font-medium w-12 text-right">{r.cost}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReliabilitySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <Glow position="80% 50%" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Reliability"
              title={
                <>
                  Built For <span className="gradient-text">Production.</span>
                </>
              }
              sub="The boring parts, done right — so your AI assistant is there when you need it, and you always know what it costs."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 -mt-4">
              {tiles.map((t) => (
                <div key={t.title} className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-green/10 text-green flex items-center justify-center">
                    {t.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">{t.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <DashboardPreview />
            <p className="text-center text-xs text-text-muted mt-3">
              Your usage dashboard: which model handled each request and exactly what it cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
