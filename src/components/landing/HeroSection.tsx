"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { MARKETPLACE_URL, TierChip, type Tier } from "./shared";
import { MIN_RECHARGE } from "@/lib/wallet";

const ROUTES: { prompt: string; tier: Tier; reason: string }[] = [
  { prompt: "Why is this regex not matching?", tier: "fast", reason: "Simple question" },
  { prompt: "Add Google OAuth to the Express app", tier: "reasoning", reason: "Multi-file feature" },
  { prompt: "Split this monolith into services", tier: "frontier", reason: "Architecture task" },
];

const trust = [
  "No subscription",
  "Bring your own keys",
  "Up to 1M-token context",
  "Copilot Chat compatible",
];

function RoutingDemo() {
  // step: how many rows have been routed; ROUTES.length + 1 holds the final frame briefly
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(ROUTES.length);
      return;
    }
    const id = setInterval(() => {
      setStep((s) => (s >= ROUTES.length + 1 ? 0 : s + 1));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative rounded-2xl border border-border bg-bg-secondary/80 backdrop-blur shadow-2xl overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/60 to-transparent" />

      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/70" />
        </div>
        <span className="text-xs text-text-muted font-mono">MisterPilot Auto</span>
        <span className="flex items-center gap-1.5 text-xs text-green font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          routing
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        {ROUTES.map((r, i) => {
          const routed = step > i;
          const active = step === i;
          return (
            <div
              key={r.prompt}
              className={`rounded-xl border p-3 sm:p-4 transition-all duration-500 ${
                routed
                  ? "border-border-light bg-bg-tertiary"
                  : active
                    ? "border-green/40 bg-bg-tertiary/60"
                    : "border-border bg-bg-primary/40 opacity-50"
              }`}
            >
              <p className="font-mono text-xs sm:text-sm text-text-primary">
                <span className="text-green mr-2">›</span>
                {r.prompt}
              </p>
              <div className="mt-3 flex items-center gap-2 min-h-[28px]">
                <div className="relative h-px flex-1 bg-border overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r from-green/20 to-green transition-all duration-700 ${
                      routed ? "w-full" : active ? "w-1/2" : "w-0"
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-500 ${
                    routed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                  }`}
                >
                  <TierChip tier={r.tier} />
                </div>
              </div>
              <p
                className={`mt-1.5 text-[11px] text-text-muted transition-opacity duration-500 ${
                  routed ? "opacity-100" : "opacity-0"
                }`}
              >
                {r.reason}
              </p>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 border-t border-border flex items-center justify-between text-xs">
        <span className="text-text-muted">Model picked for each request</span>
        <span className="font-mono text-text-secondary">OpenAI · Claude · DeepSeek</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden pt-28 pb-20 lg:min-h-screen lg:pt-16 lg:pb-0">
      {/* Background glows */}
      <div
        className="hero-glow animate-glow-pulse"
        style={{
          width: 600,
          height: 600,
          top: -100,
          left: -150,
          background: "radial-gradient(circle, rgba(53,170,53,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="hero-glow animate-glow-pulse"
        style={{
          width: 500,
          height: 500,
          top: 80,
          right: -120,
          background: "radial-gradient(circle, rgba(254,208,8,0.08) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#35AA35 1px, transparent 1px), linear-gradient(90deg, #35AA35 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Copy */}
          <div className="space-y-7">
            <a
              href="#auto"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-muted text-gold text-xs sm:text-sm font-medium hover:border-gold/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New — MisterPilot Auto
              <span className="text-gold/70">→</span>
            </a>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-text-primary">
              Stop Choosing Models.
              <br />
              <span className="gradient-text">Start Building.</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              MisterPilot is the AI coding assistant for VS Code that picks the
              right model for every request — GPT, Claude, or DeepSeek —
              automatically. Fast answers on simple tasks, deep reasoning on
              hard ones, and you only pay for what you use.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-green hover:bg-green-hover transition-all shadow-lg shadow-green/25 text-sm"
              >
                Install for VS Code
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-text-primary border border-border hover:border-border-light hover:bg-bg-tertiary transition-all text-sm"
              >
                Get started from ₹{MIN_RECHARGE}
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-md">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Check className="w-4 h-4 text-green shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <RoutingDemo />
        </div>
      </div>
    </section>
  );
}
