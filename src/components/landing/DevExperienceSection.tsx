"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Zap, Shield, Activity, Globe } from "lucide-react";

const CODE = `curl https://engine.misterpilot.online/api/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`;

const benefits = [
  {
    icon: <Globe className="w-4 h-4" />,
    title: "OpenAI-Compatible API",
    desc: "Works with any OpenAI SDK — just point it at MisterPilot and go.",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Fast Integration",
    desc: "Make your first API call in under 2 minutes.",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: "Simple Authentication",
    desc: "One bearer token for all DeepSeek models.",
  },
  {
    icon: <Activity className="w-4 h-4" />,
    title: "Detailed Usage Tracking",
    desc: "Every token logged, every cost visible in your dashboard.",
  },
];

export default function DevExperienceSection() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(53,170,53,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Code block */}
          <div>
            <div className="rounded-2xl border border-border overflow-hidden bg-bg-primary shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-secondary">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-text-muted" />
                  <span className="text-xs text-text-muted font-mono">terminal</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-all"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Code */}
              <pre className="p-5 text-sm overflow-x-auto font-mono leading-relaxed">
                <code>
                  <span className="text-green">curl</span>{" "}
                  <span className="text-emerald-400">
                    https://engine.misterpilot.online/api/v1/chat/completions
                  </span>
                  {" \\\n  "}
                  <span className="text-text-secondary">-H</span>{" "}
                  <span className="text-gold">
                    &quot;Authorization: Bearer YOUR_API_KEY&quot;
                  </span>
                  {" \\\n  "}
                  <span className="text-text-secondary">-H</span>{" "}
                  <span className="text-gold">
                    &quot;Content-Type: application/json&quot;
                  </span>
                  {" \\\n  "}
                  <span className="text-text-secondary">-d</span>{" "}
                  <span className="text-emerald-300">&apos;&#123;</span>
                  {"\n    "}
                  <span className="text-emerald-300">
                    &quot;model&quot;:
                  </span>{" "}
                  <span className="text-gold">
                    &quot;deepseek-chat&quot;
                  </span>
                  {",\n    "}
                  <span className="text-emerald-300">&quot;messages&quot;:</span>{" ["}
                  {"\n      "}
                  <span className="text-emerald-300">
                    &#123;&quot;role&quot;:
                  </span>{" "}
                  <span className="text-gold">&quot;user&quot;</span>
                  <span className="text-emerald-300">
                    , &quot;content&quot;:
                  </span>{" "}
                  <span className="text-gold">&quot;Hello!&quot;</span>
                  <span className="text-emerald-300">&#125;</span>
                  {"\n    "}
                  {"]"}
                  {"\n  "}
                  <span className="text-emerald-300">&#125;&apos;</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-xs font-medium">
                Developer Experience
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
                Built For <span className="gradient-text">Developers</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you&apos;ve used the OpenAI SDK before, you already know how to
                use MisterPilot. Change the base URL, add your key, pick a DeepSeek model — done.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green/15 flex items-center justify-center text-green shrink-0 mt-0.5">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{b.title}</p>
                    <p className="text-sm text-text-secondary">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
