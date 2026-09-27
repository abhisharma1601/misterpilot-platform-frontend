import { MessageSquare, ScanSearch, Sparkles } from "lucide-react";
import { Glow, SectionHeader, TierChip, type Tier } from "./shared";

const steps = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "You ask",
    desc: "Chat, select code, or run a command — exactly like you do today.",
  },
  {
    icon: <ScanSearch className="w-5 h-5" />,
    title: "Auto analyzes",
    desc: "MisterPilot looks at the task's complexity, context size, and type of work.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "The right model answers",
    desc: "Your request goes to the best-fit model, and you can see which one answered.",
  },
];

const examples: { request: string; tier: Tier; why: string }[] = [
  {
    request: "What does this function return?",
    tier: "fast",
    why: "Simple question — speed matters more than depth.",
  },
  {
    request: "Implement pagination for this API",
    tier: "reasoning",
    why: "Multi-file change with logic that has to be right.",
  },
  {
    request: "Plan a migration from REST to GraphQL",
    tier: "frontier",
    why: "Architectural decision — quality matters most.",
  },
];

export default function AutoSection() {
  return (
    <section id="auto" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-16">
      <Glow position="50% 30%" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          eyebrow="MisterPilot Auto"
          title={
            <>
              AI That Picks <span className="gradient-text">The Right AI</span>
            </>
          }
          sub="Every model has strengths. Some are fast and cheap. Some reason deeply. Some handle huge architectural changes. Instead of making you guess, Auto reads each request and sends it to the model best suited for the job."
        />

        {/* Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 mb-16">
          {steps.map((s, i) => (
            <div key={s.title} className="relative flex md:block items-start gap-4">
              <div className="md:flex md:items-center md:mb-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-green/10 border border-green/30 text-green flex items-center justify-center">
                  {s.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px mx-4 bg-gradient-to-r from-green/50 to-border" />
                )}
              </div>
              <div className="md:pr-8">
                <p className="text-xs font-mono text-text-muted mb-1">0{i + 1}</p>
                <h3 className="text-lg font-semibold text-text-primary mb-1">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Examples */}
        <div className="rounded-2xl border border-border bg-bg-secondary overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 px-6 py-3 border-b border-border text-xs font-semibold uppercase tracking-wider text-text-muted">
            <span className="col-span-5">Your request</span>
            <span className="col-span-3">Auto picks</span>
            <span className="col-span-4">Why</span>
          </div>
          {examples.map((e) => (
            <div
              key={e.request}
              className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0 items-center px-6 py-4 border-b border-border last:border-0 hover:bg-bg-tertiary/50 transition-colors"
            >
              <p className="sm:col-span-5 font-mono text-sm text-text-primary">“{e.request}”</p>
              <div className="sm:col-span-3">
                <TierChip tier={e.tier} />
              </div>
              <p className="sm:col-span-4 text-sm text-text-secondary">{e.why}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-text-muted mt-5">
          Prefer a specific model? Pick it manually any time. Auto is the default, never a lock.
        </p>
      </div>
    </section>
  );
}
