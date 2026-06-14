import { TrendingUp, Activity } from "lucide-react";

function MiniBarChart({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  return (
    <div className="flex items-end gap-0.5 h-10">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{ height: `${v}%`, background: color, opacity: 0.8 }}
        />
      ))}
    </div>
  );
}

const requestData = [30, 55, 40, 70, 60, 85, 72, 90, 65, 80, 88, 95];
const costData = [20, 40, 30, 55, 45, 70, 58, 75, 50, 65, 72, 80];
const tokenData = [45, 60, 50, 75, 65, 88, 76, 92, 70, 85, 90, 98];

const recentRows = [
  { model: "deepseek-chat", tokens: "1,280", cost: "₹0.45", time: "2s ago" },
  { model: "deepseek-reasoner", tokens: "842", cost: "₹0.12", time: "15s ago" },
  { model: "deepseek-chat", tokens: "2,100", cost: "₹0.08", time: "1m ago" },
  { model: "deepseek-reasoner", tokens: "560", cost: "₹0.03", time: "3m ago" },
  { model: "deepseek-chat", tokens: "3,400", cost: "₹1.20", time: "8m ago" },
];

export default function AnalyticsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(53,170,53,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-xs font-medium">
                Analytics
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
                Know Where Every{" "}
                <span className="gradient-text">Token Goes</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Track usage and spending in real time with complete
                transparency. Drill down by model, date, or request to
                understand exactly what&apos;s driving your costs.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Per-model usage breakdowns",
                "Daily and monthly cost trends",
                "Token consumption graphs",
                "Recent activity log with full details",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="rounded-2xl border border-border bg-bg-secondary overflow-hidden shadow-2xl shadow-black/40">
            {/* Metric row */}
            <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
              {[
                { label: "Requests", value: "12,847", delta: "+18%", icon: <Activity className="w-3.5 h-3.5" /> },
                { label: "Tokens", value: "2.4M", delta: "+22%", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                { label: "Cost", value: "₹124.50", delta: "+15%", icon: <TrendingUp className="w-3.5 h-3.5" /> },
              ].map((m, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-muted">{m.label}</span>
                    <span className="text-green">{m.icon}</span>
                  </div>
                  <p className="text-base font-bold text-text-primary">{m.value}</p>
                  <p className="text-xs text-green mt-0.5">{m.delta} this month</p>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-3 gap-3 p-4 border-b border-border">
              <div>
                <p className="text-xs text-text-muted mb-2">Requests</p>
                <MiniBarChart
                  data={requestData}
                  color="linear-gradient(to top, #35AA35, #4ade80)"
                />
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Cost (₹)</p>
                <MiniBarChart
                  data={costData}
                  color="linear-gradient(to top, #2D952D, #35AA35)"
                />
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Tokens</p>
                <MiniBarChart
                  data={tokenData}
                  color="linear-gradient(to top, #35AA35, #86efac)"
                />
              </div>
            </div>

            {/* Recent activity table */}
            <div className="p-4">
              <p className="text-xs text-text-muted mb-3">Recent Activity</p>
              <div className="space-y-1.5">
                {recentRows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 text-xs border-b border-border/50 last:border-0"
                  >
                    <span className="font-mono text-text-secondary truncate max-w-[140px]">
                      {row.model}
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-text-muted">{row.tokens} tok</span>
                      <span className="text-green font-medium w-12 text-right">{row.cost}</span>
                      <span className="text-text-muted w-12 text-right">{row.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
