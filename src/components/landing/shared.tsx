import type { ReactNode } from "react";

export const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot";
export const DOCS_URL = "https://misterpilot.online";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green/30 bg-green/10 text-green text-xs font-semibold uppercase tracking-wider">
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`space-y-4 mb-14 ${center ? "text-center mx-auto max-w-2xl" : "max-w-xl"}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight leading-tight">
        {title}
      </h2>
      {sub && <p className="text-text-secondary text-base sm:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

export function Glow({ position }: { position: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 60% 50% at ${position}, rgba(53,170,53,0.08) 0%, transparent 70%)`,
      }}
    />
  );
}

// Model tiers used consistently wherever MisterPilot Auto is illustrated.
export const TIERS = {
  fast: { label: "Fast model", icon: "⚡", text: "text-green", border: "border-green/40", bg: "bg-green/10" },
  reasoning: { label: "Reasoning model", icon: "🧠", text: "text-sky-400", border: "border-sky-400/40", bg: "bg-sky-400/10" },
  frontier: { label: "Frontier model", icon: "★", text: "text-gold", border: "border-gold/40", bg: "bg-gold/10" },
} as const;

export type Tier = keyof typeof TIERS;

export function TierChip({ tier }: { tier: Tier }) {
  const t = TIERS[tier];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono font-medium whitespace-nowrap ${t.text} ${t.border} ${t.bg}`}
    >
      <span aria-hidden>{t.icon}</span>
      {t.label}
    </span>
  );
}
