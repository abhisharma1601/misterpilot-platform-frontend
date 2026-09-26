import { MIN_RECHARGE } from "@/lib/wallet";
export const faqs = [
  {
    q: "What is MisterPilot Auto?",
    a: "Auto is our automatic model router. For each request it looks at what you're asking and sends it to the best-fit model — a fast, low-cost model for simple questions, a strong reasoning model for implementation work, and a frontier model for big architectural tasks.",
  },
  {
    q: "Can I still choose a specific model?",
    a: "Yes. Auto is the default, but you can pick any supported model manually at any time.",
  },
  {
    q: "Which AI providers are supported?",
    a: "OpenAI, Anthropic (Claude), and DeepSeek — all from one extension. New models are added as they're released.",
  },
  {
    q: "Do I need a subscription?",
    a: `No. Start with a minimum recharge of ₹${MIN_RECHARGE} and pay only for the tokens you use, or bring your own API keys and pay your provider directly.`,
  },
  {
    q: "How does Bring Your Own Key work? Are my keys safe?",
    a: "Add your OpenAI, Anthropic, or DeepSeek key and MisterPilot uses it for requests to that provider, billed by the provider. Keys are encrypted and stored with AWS Secrets Manager.",
  },
  {
    q: "Does it work with GitHub Copilot Chat?",
    a: "Yes. MisterPilot is compatible with the Copilot Chat experience in VS Code, so you keep the interface you know and gain more models.",
  },
  {
    q: "What is MCP and why does it matter?",
    a: "The Model Context Protocol is an open standard for connecting AI to tools — databases, APIs, browsers, and internal services. With MCP support you can extend what MisterPilot can do without waiting for a built-in integration.",
  },
  {
    q: "How much context can MisterPilot handle?",
    a: "Up to 1 million tokens, depending on the model in use — enough for large codebases and long working sessions.",
  },
  {
    q: "What does local agent execution mean?",
    a: "The agent that reads files, searches your project, and applies edits runs inside VS Code on your machine. Only model calls go to the AI provider, which means fewer round trips and more control.",
  },
  {
    q: "Can I use MisterPilot as an API too?",
    a: "Yes. Create an API key in your dashboard and call the OpenAI-compatible endpoint from any SDK. Usage and cost show up in the same dashboard.",
  },
];
