import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Full-Stack Developer",
    company: "Indie Hacker",
    quote:
      "MisterPilot saved me hours of setup. I was managing DeepSeek billing separately, tracking costs in a spreadsheet. Now it's one key, one dashboard, instant UPI recharge. Super convenient for Indian developers.",
    initials: "RM",
    color: "from-green to-green-hover",
  },
  {
    name: "Priya Sharma",
    role: "AI Engineer",
    company: "Early-stage Startup",
    quote:
      "The cost transparency is what sold me. I can see exactly what each DeepSeek request costs. Between V3 for everyday tasks and R1 for reasoning, I'm finally in control of my AI spend.",
    initials: "PS",
    color: "from-gold to-gold-hover",
  },
  {
    name: "Arjun Nair",
    role: "Backend Engineer",
    company: "SaaS Product",
    quote:
      "Switching to MisterPilot took 10 minutes. The API is fully OpenAI-compatible, so I just updated the base URL and key. Now I get DeepSeek V3 and R1 with full cost tracking — zero changes to my existing code.",
    initials: "AN",
    color: "from-green to-green-hover",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Trusted By <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Developers building AI products choose MisterPilot for its
            simplicity, transparency, and reliability.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-bg-secondary p-6 hover:border-green/30 transition-colors"
            >
              <Stars />
              <blockquote className="mt-4 mb-6 text-sm text-text-secondary leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
