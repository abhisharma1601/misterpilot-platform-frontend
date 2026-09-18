"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IndianRupee,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  Minus,
  LayoutDashboard,
  UserRound,
  Tag,
  LogOut,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
} from "recharts";
import {
  totalRevenue,
  profit,
  rechargeDebt,
  periodSummaries,
  weeklyRevenue,
  cashflowTransactions,
  type PeriodSummary,
} from "@/lib/admin/dummyData";

// ---- Helpers ----

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({
  status,
}: {
  status: "success" | "pending" | "failed";
}) {
  const map: Record<string, { label: string; cls: string }> = {
    success: { label: "Success", cls: "bg-green/10 text-green border-green/30" },
    pending: { label: "Pending", cls: "bg-warning/10 text-warning border-warning/30" },
    failed: { label: "Failed", cls: "bg-error/10 text-error border-error/30" },
  };
  const s = map[status];
  return (
    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border ${s.cls}`}>
      {s.label}
    </span>
  );
}

function TrendBadge({ trend, pct }: { trend: PeriodSummary["trend"]; pct: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium">
      {trend === "up" ? (
        <TrendingUp className="w-3 h-3 text-green" />
      ) : trend === "down" ? (
        <TrendingDown className="w-3 h-3 text-error" />
      ) : (
        <Minus className="w-3 h-3 text-text-muted" />
      )}
      <span className={trend === "up" ? "text-green" : trend === "down" ? "text-error" : "text-text-muted"}>
        {trend === "up" ? "+" : trend === "down" ? "-" : ""}{pct}%
      </span>
    </span>
  );
}

function NavLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-gold/15 text-gold"
          : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

const chartTooltipStyle = {
  background: "#122D2E",
  border: "1px solid #1A3A3B",
  borderRadius: "8px",
  color: "#F0F2F1",
  fontSize: "13px",
};

// ---- Page ----

export default function AdminCashflowPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter">("month");
  const activePeriod = periodSummaries.find((p) => p.period === selectedPeriod)!;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ===== Nav Bar ===== */}
      <nav className="sticky top-0 z-10 bg-bg-secondary/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-8 h-14">
          <div className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="MisterPilot"
              width={28}
              height={28}
              className="w-7 h-7 rounded-md"
            />
            <span className="text-sm font-semibold text-text-primary tracking-tight">Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <NavLink href="/admin/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
            <NavLink href="/admin/users" icon={<UserRound className="w-4 h-4" />} label="Users" />
            <NavLink href="/admin/cashflow" icon={<Wallet className="w-4 h-4" />} label="CashFlow" active />
            <NavLink href="/admin/offers" icon={<Tag className="w-4 h-4" />} label="Offers" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="p-6 md:p-8 space-y-8">
        {/* ===== Header ===== */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">CashFlow</h1>
          <p className="text-sm text-text-muted mt-1">
            Revenue and transactions across time periods.
          </p>
        </div>

        {/* ===== Top KPI Row ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Revenue */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-text-secondary">Total Revenue</span>
              <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-text-primary">
              ₹{formatINR(totalRevenue)}
            </div>
          </div>

          {/* Profit — 75% of total wallet balances */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-text-secondary">Profit</span>
              <div className="w-9 h-9 rounded-lg bg-green-muted flex items-center justify-center text-green">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-text-primary">
              ₹{formatINR(profit)}
            </div>
            <div className="mt-2 text-xs text-text-muted">
              75% of total wallet balances
            </div>
          </div>

          {/* RechargeDebt — DeepSeek current balance */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-text-secondary">RechargeDebt</span>
              <div className="w-9 h-9 rounded-lg bg-error/10 flex items-center justify-center text-error">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-text-primary">
              ₹{formatINR(rechargeDebt)}
            </div>
            <div className="mt-2 text-xs text-text-muted">
              DeepSeek current balance
            </div>
          </div>

          {/* Period selector card */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <span className="text-sm text-text-secondary">Period</span>
            <div className="flex items-center gap-1 mt-3">
              {(["week", "month", "quarter"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                    selectedPeriod === p
                      ? "bg-gold/15 text-gold"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mt-3 text-lg font-bold text-text-primary">
              ₹{formatINR(activePeriod.revenue)}
              <TrendBadge trend={activePeriod.trend} pct={activePeriod.trendPct} />
            </div>
          </div>
        </div>

        {/* ===== Period Summary Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {periodSummaries.map((p) => (
            <div
              key={p.period}
              onClick={() => setSelectedPeriod(p.period)}
              className={`bg-bg-secondary border rounded-xl p-5 cursor-pointer transition-colors ${
                selectedPeriod === p.period
                  ? "border-gold/50 ring-1 ring-gold/20"
                  : "border-border hover:border-gold/30"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-primary">{p.label}</span>
                <TrendBadge trend={p.trend} pct={p.trendPct} />
              </div>
              <div className="text-xl font-bold text-text-primary mb-1">
                ₹{formatINR(p.revenue)}
              </div>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <ArrowLeftRight className="w-3 h-3" />
                  {p.transactions} txns
                </span>
                <span>Avg ₹{formatINR(p.avgTxnValue)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Charts Row ===== */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary mb-4">
            Weekly Revenue &amp; Transactions
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyRevenue} barGap={0} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3A3B" vertical={false} />
              <XAxis
                dataKey="week"
                stroke="#5A6B6C"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#FED008"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#35AA35"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value: number, name: string) => [
                  name === "revenue" ? `₹${formatINR(value)}` : value.toLocaleString(),
                  name === "revenue" ? "Revenue" : "Transactions",
                ]}
              />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#8A9B9C" }} />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#FED008" radius={[4, 4, 0, 0]} />
              <Line
                yAxisId="right"
                dataKey="transactions"
                name="Transactions"
                stroke="#35AA35"
                strokeWidth={2}
                dot={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Recent Cashflow Transactions ===== */}
        <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-medium text-text-primary">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">User ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Reference</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {cashflowTransactions.filter((tx) => tx.type === "credit" || tx.status === "failed").map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-text-secondary font-mono">#{tx.id}</td>
                    <td className={`px-6 py-3 text-sm text-right font-mono ${tx.type === "credit" ? "text-green" : "text-error"}`}>
                      {tx.type === "credit" ? "+" : "-"}₹{formatINR(tx.amount)}
                    </td>
                    <td className="px-6 py-3 text-sm text-text-secondary capitalize">{tx.type}</td>
                    <td className="px-6 py-3"><StatusBadge status={tx.status} /></td>
                    <td className="px-6 py-3 text-sm text-text-secondary font-mono">#{tx.userId}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary font-mono text-[11px]">{tx.referenceId}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary whitespace-nowrap">{formatDateTime(tx.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
