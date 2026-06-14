import {
  Globe,
  Key,
  Wallet,
  Activity,
  DollarSign,
  Shield,
  Zap,
  Gauge,
} from "lucide-react";

const features = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Unified API",
    description: "One endpoint for DeepSeek V3 and R1. Switch between them without touching your integration.",
  },
  {
    icon: <Key className="w-5 h-5" />,
    title: "API Key Management",
    description: "Generate, revoke, and manage API keys securely from one dashboard.",
  },
  {
    icon: <Wallet className="w-5 h-5" />,
    title: "Wallet System",
    description: "Add funds instantly via UPI and monitor your spending in real time.",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Usage Dashboard",
    description: "View requests, token usage, and costs with beautiful charts.",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Cost Transparency",
    description: "Know exactly where every token is spent — down to the model and request.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Authentication",
    description: "Google Sign-In and Email authentication with enterprise-grade security.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Instant API Access",
    description: "Start building within minutes. No waiting, no approval queues.",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Fast Performance",
    description: "Optimized infrastructure for low-latency AI requests at scale.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(53,170,53,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-xs font-medium mb-2">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Everything You Need To{" "}
            <span className="gradient-text">Build With AI</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            A complete platform for developers who want to build AI-powered
            applications without the infrastructure headaches.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-5 rounded-xl border border-border bg-bg-secondary hover:border-green/40 hover:bg-bg-tertiary transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center mb-4 text-green group-hover:bg-green/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
