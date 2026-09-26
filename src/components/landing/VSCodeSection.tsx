"use client";

import { useState } from "react";
import {
  MessageSquare,
  Code2,
  SearchCheck,
  BookOpen,
  Wand2,
  FileCode,
  FolderTree,
  GitBranch,
  TextSelect,
  LayoutGrid,
} from "lucide-react";
import { Glow, SectionHeader, TierChip, type Tier } from "./shared";

type TabDef = {
  id: string;
  label: string;
  icon: React.ReactNode;
  caption: string;
  prompt: string;
  tier: Tier;
  answer: string[];
};

const tabs: TabDef[] = [
  {
    id: "chat",
    label: "Chat",
    icon: <MessageSquare className="w-4 h-4" />,
    caption: "Ask anything about your code. Answers stream in real time.",
    prompt: "How does the auth middleware decide if a token is expired?",
    tier: "fast",
    answer: [
      "`verifyToken()` decodes the JWT and compares `exp` with `Date.now() / 1000`.",
      "Expired tokens throw `TokenExpiredError`, caught in `authGuard` → 401.",
    ],
  },
  {
    id: "generate",
    label: "Generate",
    icon: <Code2 className="w-4 h-4" />,
    caption: "Describe what you need and get working code in the right file.",
    prompt: "Add cursor-based pagination to GET /orders",
    tier: "reasoning",
    answer: [
      "Updated `routes/orders.ts` — accepts `cursor` and `limit` params.",
      "Added `nextCursor` to the response and an index on `orders.created_at`.",
    ],
  },
  {
    id: "review",
    label: "Review",
    icon: <SearchCheck className="w-4 h-4" />,
    caption: "Catch bugs, edge cases, and style issues before you commit.",
    prompt: "Review my staged changes",
    tier: "reasoning",
    answer: [
      "⚠ `parseAmount()` returns NaN for empty strings — add a guard.",
      "⚠ `await` missing on `saveInvoice()` in the retry branch.",
    ],
  },
  {
    id: "explain",
    label: "Explain",
    icon: <BookOpen className="w-4 h-4" />,
    caption: "Understand unfamiliar code in plain English.",
    prompt: "Explain the selected reducer",
    tier: "fast",
    answer: [
      "It merges incoming cart items by SKU, summing quantities.",
      "Items with quantity 0 are dropped so the cart never shows empty rows.",
    ],
  },
  {
    id: "refactor",
    label: "Refactor",
    icon: <Wand2 className="w-4 h-4" />,
    caption: "Clean up, rename, and restructure with confidence.",
    prompt: "Split UserService into smaller services",
    tier: "frontier",
    answer: [
      "Proposed: `UserProfileService`, `UserAuthService`, `UserBillingService`.",
      "12 call sites updated across 7 files. Tests still pass.",
    ],
  },
];

const contextChips = [
  { icon: <FileCode className="w-3.5 h-3.5" />, label: "Open files" },
  { icon: <FolderTree className="w-3.5 h-3.5" />, label: "Project structure" },
  { icon: <GitBranch className="w-3.5 h-3.5" />, label: "feature/auth" },
  { icon: <TextSelect className="w-3.5 h-3.5" />, label: "Selected code" },
  { icon: <LayoutGrid className="w-3.5 h-3.5" />, label: "Workspace layout" },
];

function renderInline(text: string) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") ? (
      <code key={i} className="px-1 py-0.5 rounded bg-bg-tertiary text-gold text-[0.8em]">
        {part.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function VSCodeSection() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-16">
      <Glow position="20% 60%" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          eyebrow="VS Code"
          title={
            <>
              The AI Coding Assistant <br className="hidden sm:block" />
              <span className="gradient-text">That Lives in Your Editor</span>
            </>
          }
          sub="Install one extension. Keep your editor, your keybindings, and your workflow. MisterPilot works with the Copilot Chat experience you already know."
        />

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 justify-start sm:justify-center" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                t.id === active
                  ? "bg-green text-white shadow-lg shadow-green/20"
                  : "text-text-secondary border border-border hover:text-text-primary hover:border-border-light"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-text-secondary mb-8">{tab.caption}</p>

        {/* Editor mock */}
        <div className="rounded-2xl border border-border bg-bg-primary shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green/70" />
            <span className="ml-3 text-xs font-mono text-text-muted">Visual Studio Code — my-app</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 min-h-[320px]">
            {/* Fake code pane */}
            <div className="hidden md:block md:col-span-3 border-r border-border p-5 font-mono text-xs leading-6 text-text-muted select-none">
              {[
                ["1", <><span className="text-sky-400">import</span> {"{ Router }"} <span className="text-sky-400">from</span> <span className="text-gold">&quot;express&quot;</span>;</>],
                ["2", ""],
                ["3", <><span className="text-sky-400">export const</span> <span className="text-text-primary">router</span> = Router();</>],
                ["4", ""],
                ["5", <>router.<span className="text-green">get</span>(<span className="text-gold">&quot;/orders&quot;</span>, <span className="text-sky-400">async</span> (req, res) =&gt; {"{"}</>],
                ["6", <>&nbsp;&nbsp;<span className="text-sky-400">const</span> orders = <span className="text-sky-400">await</span> db.orders.<span className="text-green">findMany</span>();</>],
                ["7", <>&nbsp;&nbsp;res.<span className="text-green">json</span>(orders);</>],
                ["8", "});"],
              ].map(([n, code]) => (
                <div key={n as string} className="flex gap-4">
                  <span className="w-4 text-right text-text-muted/60">{n}</span>
                  <span>{code}</span>
                </div>
              ))}
            </div>
            {/* Chat pane */}
            <div className="md:col-span-2 flex flex-col">
              <div className="px-4 py-2.5 border-b border-border text-xs font-semibold text-text-secondary uppercase tracking-wider">
                MisterPilot Chat
              </div>
              <div key={tab.id} className="flex-1 p-4 space-y-4 animate-fade-in">
                <div className="rounded-lg bg-bg-tertiary p-3 text-sm text-text-primary">{tab.prompt}</div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-text-muted">Auto →</span>
                  <TierChip tier={tab.tier} />
                </div>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {tab.answer.map((a) => (
                    <li key={a} className="leading-relaxed">{renderInline(a)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copilot + Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto mt-6">
          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="font-semibold text-text-primary mb-2">Already use Copilot Chat?</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              MisterPilot plugs into the same chat experience — no new UI to learn.
              Just more models and smarter routing.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="font-semibold text-text-primary mb-2">Your AI understands your workspace</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Less prompting, more accurate answers — context is picked up automatically.
            </p>
            <div className="flex flex-wrap gap-2">
              {contextChips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-tertiary border border-border text-xs font-mono text-text-secondary"
                >
                  <span className="text-green">{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
