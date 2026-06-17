import Link from "next/link";
import { ArrowRight, Wallet, Zap, DollarSign, ArrowUpRight, Activity, Puzzle } from "lucide-react";

function MetricMini({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="bg-bg-tertiary border border-border rounded-lg p-3">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className={`text-sm font-bold ${accent}`}>{value}</p>
    </div>
  );
}

function DashboardPreview() {
  const bars = [40, 65, 50, 80, 60, 90, 72, 85, 55, 70, 88, 76];

  return (
    <div className="relative rounded-2xl border border-border/60 overflow-hidden bg-bg-secondary shadow-2xl shadow-black/50">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-primary">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-error/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-warning/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green/50" />
        </div>
        <div className="flex-1 mx-4 bg-bg-tertiary rounded-md px-3 py-1 text-xs text-text-muted font-mono text-center">
          dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div className="p-4 space-y-3">
        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-2">
          <MetricMini label="Wallet Balance" value="₹1,250.00" accent="text-gold" />
          <MetricMini label="API Requests" value="12,847" accent="text-green" />
          <MetricMini label="Tokens Used" value="2.4M" accent="text-green" />
          <MetricMini label="Amount Spent" value="₹124.50" accent="text-gold" />
        </div>

        {/* Mini chart */}
        <div className="bg-bg-primary rounded-xl border border-border p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-muted">API Requests — Last 12 Days</span>
            <Activity className="w-3 h-3 text-green" />
          </div>
          <div className="flex items-end gap-1 h-14">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, #35AA35, #4ade80)`,
                  opacity: 0.7 + i * 0.025,
                }}
              />
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-bg-primary rounded-xl border border-border p-3">
          <p className="text-xs text-text-muted mb-2">Recent Activity</p>
          {[
            { model: "deepseek-chat", tokens: "1,280", cost: "₹0.45" },
            { model: "deepseek-reasoner", tokens: "842", cost: "₹0.12" },
            { model: "deepseek-chat", tokens: "2,100", cost: "₹0.08" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0"
            >
              <span className="text-xs font-mono text-text-secondary truncate max-w-[120px]">
                {r.model}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted">{r.tokens} tok</span>
                <span className="text-xs text-green font-medium">{r.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background glows */}
      <div
        className="hero-glow animate-glow-pulse"
        style={{
          width: 600,
          height: 600,
          top: -100,
          left: -150,
          background: "radial-gradient(circle, rgba(53,170,53,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="hero-glow animate-glow-pulse"
        style={{
          width: 500,
          height: 500,
          top: 50,
          right: -100,
          background: "radial-gradient(circle, rgba(53,170,53,0.12) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      <div
        className="hero-glow"
        style={{
          width: 400,
          height: 400,
          bottom: -50,
          left: "40%",
          background: "radial-gradient(circle, rgba(254,208,8,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-sm font-medium">
              <span>🚀</span>
              <span>DeepSeek API Gateway</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
                Access DeepSeek Models{" "}
                <span className="gradient-text">Through One API</span>
              </h1>
            </div>

            {/* Extension callout */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-green/30 bg-green/5 text-sm text-text-secondary">
              <Puzzle className="w-4 h-4 text-green shrink-0" />
              <span>We also built a <a href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot" target="_blank" rel="noopener noreferrer" className="text-green font-medium hover:underline">VS Code coding AI agent</a> — use it with your API key</span>
            </div>

            {/* Subheadline */}
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              Connect to DeepSeek models through a single API key. Pay only for
              what you use, track every token, and switch models without
              changing your code.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-green hover:bg-green-hover transition-all shadow-lg shadow-green/20 text-sm"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-text-primary border border-border hover:border-border-light hover:bg-bg-secondary transition-all text-sm"
              >
                Get VS Code Extension
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-6 pt-2">
              {[
                { icon: <Wallet className="w-4 h-4" />, text: "Pay-as-you-go" },
                { icon: <Zap className="w-4 h-4" />, text: "No lock-in" },
                { icon: <DollarSign className="w-4 h-4" />, text: "Full cost visibility" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-text-muted text-xs">
                  <span className="text-green">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard preview */}
          <div className="relative animate-float">
            <div
              className="absolute inset-0 rounded-2xl blur-2xl opacity-15"
              style={{ background: "linear-gradient(135deg, #35AA35, #4ade80)" }}
            />
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
