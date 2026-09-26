import {
  Database,
  Globe,
  GitBranch,
  Plug,
  Server,
  Stethoscope,
  Search,
  FolderTree,
  FileText,
  Workflow,
  ShieldCheck,
  Laptop,
  Cloud,
} from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "./shared";

const mcpNodes = [
  { icon: <Database className="w-4 h-4" />, label: "Databases", pos: "top-0 left-1/2 -translate-x-1/2" },
  { icon: <Globe className="w-4 h-4" />, label: "Browsers", pos: "top-1/4 right-0" },
  { icon: <Plug className="w-4 h-4" />, label: "APIs", pos: "bottom-1/4 right-0" },
  { icon: <GitBranch className="w-4 h-4" />, label: "Git", pos: "bottom-0 left-1/2 -translate-x-1/2" },
  { icon: <Server className="w-4 h-4" />, label: "Internal tools", pos: "bottom-1/4 left-0" },
  { icon: <Cloud className="w-4 h-4" />, label: "Services", pos: "top-1/4 left-0" },
];

const tools = [
  { icon: <Stethoscope className="w-5 h-5" />, title: "Diagnostics awareness", desc: "Sees your errors and warnings, fixes what's actually broken." },
  { icon: <Search className="w-5 h-5" />, title: "File discovery", desc: "Finds the right files without you pointing at them." },
  { icon: <FolderTree className="w-5 h-5" />, title: "Directory browsing", desc: "Understands how your project is organized." },
  { icon: <FileText className="w-5 h-5" />, title: "Large file reading", desc: "Handles big files without losing what matters." },
  { icon: <Workflow className="w-5 h-5" />, title: "Multi-step tool use", desc: "Chains searches, reads, and edits to finish real tasks." },
];

const contextStops = [
  { label: "A file", size: "8K", pct: 6 },
  { label: "A module", size: "128K", pct: 22 },
  { label: "A service", size: "200K", pct: 40 },
  { label: "Your whole repo", size: "1M", pct: 100 },
];

export default function AgentSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Agent & MCP"
          title={
            <>
              More Than <span className="gradient-text">Chat.</span>
            </>
          }
          sub="MisterPilot doesn't just answer — it reads your project, uses tools, and works through multi-step tasks."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* MCP */}
          <div className="rounded-2xl border border-border bg-bg-secondary p-6 sm:p-8">
            <p className="text-xs font-mono text-green mb-2">MCP</p>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Connect AI To Everything</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              With the Model Context Protocol, MisterPilot can talk to your databases, APIs,
              browsers, and internal services. Add a server — your AI gains a new skill.
            </p>
            <div className="relative h-64 max-w-sm mx-auto">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {[
                  [50, 8], [92, 30], [92, 70], [50, 92], [8, 70], [8, 30],
                ].map(([x, y]) => (
                  <line
                    key={`${x}-${y}`}
                    x1="50" y1="50" x2={x} y2={y}
                    stroke="#35AA35" strokeOpacity="0.35" strokeWidth="0.4"
                    strokeDasharray="1.5 1.5" className="animate-dash"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-bg-primary border border-green/50 shadow-lg shadow-green/20 flex items-center justify-center">
                <Image src="/icon.png" alt="MisterPilot" width={36} height={36} className="rounded-lg" />
              </div>
              {mcpNodes.map((n) => (
                <div
                  key={n.label}
                  className={`absolute ${n.pos} inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-bg-tertiary border border-border text-xs text-text-secondary`}
                >
                  <span className="text-green">{n.icon}</span>
                  {n.label}
                </div>
              ))}
            </div>
          </div>

          {/* Local agent */}
          <div className="rounded-2xl border border-border bg-bg-secondary p-6 sm:p-8 flex flex-col">
            <p className="text-xs font-mono text-green mb-2">Local agent execution</p>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Your Agent Runs Where Your Code Lives</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              The agent runs inside VS Code, right next to your files — not on a remote
              backend for every action. Only model calls leave your machine.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="rounded-xl border border-border bg-bg-primary/60 p-4">
                <p className="text-xs text-text-muted mb-3">Typical remote agent</p>
                <div className="space-y-1.5 font-mono text-[11px] text-text-muted">
                  {["read file", "search", "edit", "run check"].map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <Laptop className="w-3 h-3" />⇄<Cloud className="w-3 h-3" />
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-green/40 bg-green/5 p-4">
                <p className="text-xs text-green mb-3">MisterPilot</p>
                <div className="space-y-1.5 font-mono text-[11px] text-text-secondary">
                  {["read file", "search", "edit", "run check"].map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <Laptop className="w-3 h-3 text-green" />
                      <span className="truncate">{s} · local</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-xs text-text-secondary">
              <li>✓ Faster responses</li>
              <li>✓ Better reliability</li>
              <li>✓ More control</li>
            </ul>
          </div>

          {/* Context meter */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-bg-secondary p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div>
                <p className="text-xs font-mono text-green mb-2">Up to 1,000,000 tokens</p>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Built For Large Codebases</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Huge codebases and long conversations stay in view — better project
                  awareness, less repeating yourself, and long sessions that stay coherent.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="relative h-3 rounded-full bg-bg-tertiary overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-green via-green to-gold origin-left animate-meter" />
                </div>
                <div className="relative h-14 mt-2">
                  {contextStops.map((s, i) => (
                    <div
                      key={s.size}
                      className={`absolute top-0 ${
                        i === 0 ? "" : i === contextStops.length - 1 ? "-translate-x-full text-right" : "-translate-x-1/2 text-center"
                      }`}
                      style={{ left: i === 0 ? 0 : `${s.pct}%` }}
                    >
                      <p className="text-sm font-mono font-semibold text-text-primary">{s.size}</p>
                      <p className="text-[11px] text-text-muted whitespace-nowrap">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-text-muted">Available context depends on the model in use.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {tools.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border bg-bg-secondary p-5 hover:border-green/40 transition-colors">
              <div className="text-green mb-3">{t.icon}</div>
              <p className="text-sm font-semibold text-text-primary mb-1">{t.title}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Always Allow */}
        <div className="mt-4 rounded-2xl border border-green/40 bg-green/5 p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-green/10 border border-green/30 text-green flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-text-primary">Automation Without Losing Control</h3>
              <span className="px-2 py-0.5 rounded-full bg-green text-white text-[10px] font-bold uppercase tracking-wider">
                Always Allow
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Auto-approve safe operations — like reading files — while anything risky still
              asks first. Faster workflows, safety by default.
            </p>
          </div>
          <ul className="flex md:flex-col gap-x-5 gap-y-1 text-xs text-text-secondary shrink-0">
            <li>✓ Faster workflows</li>
            <li>✓ Safety maintained</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
