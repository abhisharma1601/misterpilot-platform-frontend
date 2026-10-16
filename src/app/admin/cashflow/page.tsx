"use client";

import { useState, useEffect, useCallback } from "react";
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
  Landmark,
  LogOut,
  Loader2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  adminApiFetch,
  clearSession,
  type CashflowPeriod,
  type CashflowSummary,
  type AdminTransaction,
  type PaginatedTransactions,
} from "@/lib/api";

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

function StatusBadge({ status }: { status: AdminTransaction["status"] }) {
  const map: Record<string, { label: string; cls: string }> = {
    SUCCESS: { label: "Success", cls: "bg-green/10 text-green border-green/30" },
    PENDING: { label: "Pending", cls: "bg-warning/10 text-warning border-warning/30" },
    FAILED: { label: "Failed", cls: "bg-error/10 text-error border-error/30" },
  };
  const s = map[status] ?? map.PENDING;
  return (
    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border ${s.cls}`}>
      {s.label}
    </span>
  );
}

// growthPercent is null when the previous period had no revenue — nothing to compare against
function TrendBadge({ pct }: { pct: number | null }) {
  if (pct === null) return null;
  const trend = pct > 0 ? "up" : pct < 0 ? "down" : "flat";
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
        {trend === "up" ? "+" : trend === "down" ? "-" : ""}{Math.abs(pct)}%
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

type PeriodKey = "week" | "month" | "quarter";

const PERIODS: { key: PeriodKey; label: string; compareLabel: string }[] = [
  { key: "week", label: "This Week", compareLabel: "last week" },
  { key: "month", label: "This Month", compareLabel: "last month" },
  { key: "quarter", label: "This Quarter", compareLabel: "last quarter" },
];

// Server-local timestamps with no timezone — only the date part is shown
function formatDay(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function PeriodRange({ period }: { period: CashflowPeriod }) {
  return (
    <>
      {formatDay(period.periodStart)} – {formatDay(period.periodEnd)}
    </>
  );
}

// ---- Page ----

const TX_PAGE_SIZE = 10;

export default function AdminCashflowPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("month");
  const [summary, setSummary] = useState<CashflowSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setSummary(await adminApiFetch<CashflowSummary>("/admin/cashflow"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cashflow.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [txPage, setTxPage] = useState(0);
  const [txTotalPages, setTxTotalPages] = useState(0);
  const [txTotalElements, setTxTotalElements] = useState(0);
  const [txLoading, setTxLoading] = useState(true);
  const [txError, setTxError] = useState("");

  const fetchTransactions = useCallback(async (pageNum: number) => {
    setTxLoading(true);
    setTxError("");
    try {
      const data = await adminApiFetch<PaginatedTransactions>(
        `/admin/transactions?page=${pageNum}&size=${TX_PAGE_SIZE}`
      );
      setTransactions(data.content);
      setTxTotalPages(data.totalPages);
      setTxTotalElements(data.totalElements);
      setTxPage(data.number);
    } catch (err) {
      setTxError(err instanceof Error ? err.message : "Failed to load transactions.");
    } finally {
      setTxLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(0);
  }, [fetchTransactions]);

  function handleLogout() {
    clearSession();
    window.location.href = "/admin/login";
  }

  const activePeriod = summary?.[selectedPeriod];

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
            <NavLink href="/admin/funding" icon={<Landmark className="w-4 h-4" />} label="Funding" />
            <NavLink href="/admin/offers" icon={<Tag className="w-4 h-4" />} label="Offers" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
          >
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

        {/* ===== Error ===== */}
        {error && (
          <div className="flex items-center justify-between gap-4 bg-error/10 border border-error/30 rounded-xl px-5 py-4">
            <div className="flex items-center gap-3 text-sm text-error">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchSummary}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-text-primary bg-bg-secondary border border-border rounded-lg hover:border-gold/50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {loading && !summary && !error && (
          <div className="flex items-center justify-center py-16 text-text-muted">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {summary && activePeriod && (
          <>
            {/* ===== Top KPI Row ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Revenue */}
              <div className="bg-bg-secondary border border-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm text-text-secondary">Total Revenue</span>
                  <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold tracking-tight text-text-primary">
                  ₹{formatINR(summary.totalRevenueInr)}
                </div>
                <div className="mt-2 text-xs text-text-muted">
                  All time · {summary.totalTransactionCount.toLocaleString("en-IN")} txns
                </div>
              </div>

              {/* Period selector card */}
              <div className="bg-bg-secondary border border-border rounded-xl p-6">
                <span className="text-sm text-text-secondary">Period</span>
                <div className="flex items-center gap-1 mt-3">
                  {PERIODS.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPeriod(p.key)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                        selectedPeriod === p.key
                          ? "bg-gold/15 text-gold"
                          : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                      }`}
                    >
                      {p.key}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 text-lg font-bold text-text-primary">
                  ₹{formatINR(activePeriod.revenueInr)}
                  <TrendBadge pct={activePeriod.growthPercent} />
                </div>
                <div className="mt-1 text-xs text-text-muted">
                  <PeriodRange period={activePeriod} />
                </div>
              </div>
            </div>

            {/* ===== Period Summary Cards ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PERIODS.map(({ key, label, compareLabel }) => {
                const p = summary[key];
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedPeriod(key)}
                    className={`bg-bg-secondary border rounded-xl p-5 cursor-pointer transition-colors ${
                      selectedPeriod === key
                        ? "border-gold/50 ring-1 ring-gold/20"
                        : "border-border hover:border-gold/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-text-primary">{label}</span>
                      <TrendBadge pct={p.growthPercent} />
                    </div>
                    <div className="text-xl font-bold text-text-primary mb-1">
                      ₹{formatINR(p.revenueInr)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <ArrowLeftRight className="w-3 h-3" />
                        {p.transactionCount.toLocaleString("en-IN")} txns
                      </span>
                      <span>Avg ₹{formatINR(p.averageTransactionInr)}</span>
                    </div>
                    <div className="mt-2 text-xs text-text-muted">
                      vs ₹{formatINR(p.previousRevenueInr)} at this point {compareLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ===== Recent Transactions ===== */}
        <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-medium text-text-primary">Recent Transactions</h3>
            <p className="text-xs text-text-muted mt-0.5">
              All wallet recharges, including pending and failed. Only successful ones count toward revenue.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">ID</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">User ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {txLoading && transactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center">
                      <Loader2 className="w-5 h-5 animate-spin text-text-muted mx-auto" />
                    </td>
                  </tr>
                ) : txError ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-error">
                      {txError}{" "}
                      <button onClick={() => fetchTransactions(txPage)} className="underline hover:text-text-primary">
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-text-muted">
                      No transactions yet.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className={`border-b border-border/50 hover:bg-bg-tertiary/50 transition-all ${txLoading ? "opacity-60" : ""}`}
                    >
                      <td className="px-6 py-3 text-sm text-text-secondary font-mono">#{tx.id}</td>
                      <td
                        className={`px-6 py-3 text-sm text-right font-mono ${
                          tx.status === "SUCCESS" ? "text-green" : "text-text-secondary"
                        }`}
                      >
                        ₹{formatINR(tx.amount)}
                      </td>
                      <td className="px-6 py-3"><StatusBadge status={tx.status} /></td>
                      <td className="px-6 py-3 text-sm text-text-secondary font-mono">
                        {tx.userId === null ? (
                          <span className="text-text-muted italic font-sans">Deleted user</span>
                        ) : (
                          `#${tx.userId}`
                        )}
                      </td>
                      <td className="px-6 py-3 text-text-secondary font-mono text-[11px]">{tx.orderId}</td>
                      <td className="px-6 py-3 text-sm text-text-secondary whitespace-nowrap">{formatDateTime(tx.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-border">
            <p className="text-xs text-text-muted">
              {txTotalElements.toLocaleString("en-IN")} result{txTotalElements !== 1 ? "s" : ""} &middot; Page{" "}
              {txPage + 1} of {Math.max(txTotalPages, 1)}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchTransactions(txPage - 1)}
                disabled={txPage === 0 || txLoading}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                onClick={() => fetchTransactions(txPage + 1)}
                disabled={txPage + 1 >= txTotalPages || txLoading}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
