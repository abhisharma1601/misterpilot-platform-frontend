"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "./shared";
import { faqs } from "./faqData";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-xl border transition-colors ${
                  isOpen ? "border-green/40 bg-bg-secondary" : "border-border bg-bg-secondary/50"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-text-primary">{f.q}</h3>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-text-muted transition-transform ${isOpen ? "rotate-180 text-green" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 -mt-1 text-sm text-text-secondary leading-relaxed animate-fade-in">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
