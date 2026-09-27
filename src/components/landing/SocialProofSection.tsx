const items = [
  { label: "VS Code", note: "Native extension" },
  { label: "Copilot Chat", note: "Compatible" },
  { label: "OpenAI", note: "GPT models" },
  { label: "Claude", note: "Anthropic models" },
  { label: "DeepSeek", note: "Chat & Reasoner" },
  { label: "MCP", note: "Model Context Protocol" },
];

export default function SocialProofSection() {
  return (
    <section className="border-y border-border bg-bg-secondary/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-8">
          Built for the tools developers already use
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((i) => (
            <li key={i.label} className="text-center">
              <p className="text-lg font-bold text-text-secondary hover:text-text-primary transition-colors">
                {i.label}
              </p>
              <p className="text-xs text-text-muted mt-0.5">{i.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
