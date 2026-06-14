const steps = [
  {
    number: "01",
    title: "Create an Account",
    description:
      "Sign up in seconds with Google or email. No credit card required to get started.",
  },
  {
    number: "02",
    title: "Add Funds to Your Wallet",
    description:
      "Recharge your wallet instantly via UPI. Start with as little as ₹100.",
  },
  {
    number: "03",
    title: "Generate an API Key",
    description:
      "Create a secure API key from your dashboard. Manage multiple keys for different projects.",
  },
  {
    number: "04",
    title: "Start Calling AI Models",
    description:
      "Use your API key to call DeepSeek V3 or DeepSeek R1. OpenAI-compatible endpoint — no SDK changes needed.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-xs font-medium mb-2">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Get Started In <span className="gradient-text">Minutes</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            From sign-up to your first AI request in under 5 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative rounded-2xl border border-border bg-bg-secondary p-6 hover:border-green/30 transition-colors">
                {/* Number */}
                <div className="w-14 h-14 rounded-2xl bg-green/10 border border-green/20 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold gradient-text">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
