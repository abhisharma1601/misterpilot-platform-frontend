import { Globe, DollarSign, Activity, Code } from "lucide-react";

const cards = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: "DeepSeek Models",
    description:
      "Access DeepSeek V3 and DeepSeek R1 through a single unified API — no separate accounts, no separate billing.",
    accent: "from-green/20 to-green/5 border-green/20",
    iconBg: "bg-green/15 text-green",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Pay As You Go",
    description:
      "No subscriptions. Recharge your wallet and pay only for actual usage. Your balance never expires.",
    accent: "from-gold/20 to-gold/5 border-gold/20",
    iconBg: "bg-gold-muted text-gold",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Real-Time Analytics",
    description:
      "Track requests, token usage, and costs instantly. Know exactly what you're spending and where.",
    accent: "from-green/20 to-green/5 border-green/20",
    iconBg: "bg-green/15 text-green",
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "Developer First",
    description:
      "Simple APIs, fast integration, clear documentation. OpenAI-compatible endpoint — get started in minutes.",
    accent: "from-gold/20 to-gold/5 border-gold/20",
    iconBg: "bg-gold-muted text-gold",
  },
];

export default function WhySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            One Integration.{" "}
            <span className="gradient-text">Unlimited AI Possibilities.</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Everything you need to build AI-powered products, without the
            operational complexity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border bg-gradient-to-b ${card.accent} p-6 hover:scale-[1.02] transition-transform duration-200`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.iconBg}`}
              >
                {card.icon}
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
