import { Target, Wallet, Shuffle, Zap, Check, X } from "lucide-react";
import { SectionHeader } from "./shared";

const benefits = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Better answers",
    desc: "Hard problems get the strongest reasoning models — not whatever you last had selected.",
  },
  {
    icon: <Wallet className="w-5 h-5" />,
    title: "Lower costs",
    desc: "Everyday questions run on fast, affordable models. Your wallet goes further.",
  },
  {
    icon: <Shuffle className="w-5 h-5" />,
    title: "No model-switching",
    desc: "No dropdowns, no second-guessing, no “should I have used Claude for this?”",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Fully automatic",
    desc: "Works out of the box. Override any time if you want a specific model.",
  },
];

const rows = [
  ["Model choice per request", "You guess", "Chosen from the task"],
  ["Simple questions", "Often sent to expensive models", "Routed to fast, low-cost models"],
  ["Complex tasks", "Often sent to weaker models", "Routed to reasoning & frontier models"],
  ["Keeping up with new models", "You research every release", "Routing updated as models ship"],
  ["Cost visibility", "Separate provider dashboards", "Every request in one dashboard"],
];

export default function WhyAutoSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Why Auto"
          title={
            <>
              Stop Paying Frontier Prices <br className="hidden sm:block" />
              <span className="gradient-text">For Simple Questions</span>
            </>
          }
          sub="Most coding requests don't need the most expensive model. Auto uses premium models only when they make a difference."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-border bg-bg-secondary p-6 hover:border-green/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-green/10 text-green flex items-center justify-center mb-4">
                {b.icon}
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{b.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="text-left font-semibold text-text-muted px-5 py-4 w-1/3" />
                <th className="text-left font-semibold text-text-secondary px-5 py-4">
                  Picking models yourself
                </th>
                <th className="text-left font-semibold text-green px-5 py-4 bg-green/5">
                  MisterPilot Auto
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, manual, auto]) => (
                <tr key={label} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 text-text-primary font-medium">{label}</td>
                  <td className="px-5 py-4 text-text-muted">
                    <span className="inline-flex items-center gap-2">
                      <X className="w-4 h-4 text-error/70 shrink-0" />
                      {manual}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-primary bg-green/5">
                    <span className="inline-flex items-center gap-2">
                      <Check className="w-4 h-4 text-green shrink-0" />
                      {auto}
                    </span>
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
