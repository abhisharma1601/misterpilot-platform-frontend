"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  UserRound,
  Wallet,
  Tag,
  Landmark,
  LogOut,
  IndianRupee,
  Scale,
  ShieldCheck,
  Target,
  TriangleAlert,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  adminApiFetch,
  clearSession,
  type FundingProvider,
  type ProviderFundingResponse,
} from "@/lib/api";

// ---- Helpers ----

function formatINR(n: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPct(fraction: number) {
  return `${(fraction * 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}%`;
}

// windowStart is server-local time with no timezone and microsecond precision,
// which some browsers can't parse — only the date part is shown.
function formatWindowStart(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const PROVIDER_LABELS: Record<FundingProvider, string> = {
  OPENAI: "OpenAI",
  DEEPSEEK: "DeepSeek",
  ANTHROPIC: "Anthropic",
  OTHER: "Other (unrecognised model)",
};

const WINDOW_OPTIONS: { label: string; days: number | null }[] = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
  { label: "All time", days: null },
];

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

function StatTile({
  label,
  value,
  hint,
  icon,
  iconCls,
}: {
  label: string;
  value: number;
  hint: string;
  icon: React.ReactNode;
  iconCls: string;
}) {
  return (
    <div className="bg-bg-secondary border border-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-text-secondary">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconCls}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight text-text-primary">
        ₹{formatINR(value)}
      </div>
      <div className="mt-2 text-xs text-text-muted">{hint}</div>
    </div>
  );
}

// ---- Page ----

export default function AdminFundingPage() {
  const [days, setDays] = useState<number | null>(30);
  const [data, setData] = useState<ProviderFundingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFunding = useCallback(async (windowDays: number | null) => {
    setLoading(true);
    setError("");
    try {
      const query = windowDays ? `?days=${windowDays}` : "";
      setData(
        await adminApiFetch<ProviderFundingResponse>(`/admin/provider-funding${query}`)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load provider funding.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFunding(days);
  }, [days, fetchFunding]);

  function handleLogout() {
    clearSession();
    window.location.href = "/admin/login";
  }

  const hasOther = data?.providers.some((p) => p.provider === "OTHER") ?? false;

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
            <NavLink href="/admin/cashflow" icon={<Wallet className="w-4 h-4" />} label="CashFlow" />
            <NavLink href="/admin/funding" icon={<Landmark className="w-4 h-4" />} label="Funding" active />
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
        {/* ===== Header + window selector ===== */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Provider Funding</h1>
            <p className="text-sm text-text-muted mt-1">
              How much prepaid balance to keep with each AI provider to cover user wallets.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <div className="flex items-center gap-1 bg-bg-secondary border border-border rounded-lg p-1">
              {WINDOW_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setDays(opt.days)}
                  disabled={loading}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:cursor-wait ${
                    days === opt.days
                      ? "bg-gold/15 text-gold"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-text-muted">
              Usage split based on{" "}
              {data?.windowStart
                ? `usage since ${formatWindowStart(data.windowStart)}`
                : "all usage ever recorded"}
            </span>
          </div>
        </div>

        {/* ===== Error ===== */}
        {error && (
          <div className="flex items-center justify-between gap-4 bg-error/10 border border-error/30 rounded-xl px-5 py-4">
            <div className="flex items-center gap-3 text-sm text-error">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchFunding(days)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-text-primary bg-bg-secondary border border-border rounded-lg hover:border-gold/50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* ===== Initial load ===== */}
        {loading && !data && !error && (
          <div className="flex items-center justify-center py-24 text-text-muted">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {data && (
          <div className={`space-y-8 transition-opacity ${loading ? "opacity-60" : ""}`}>
            {/* ===== Unallocated warning ===== */}
            {data.unallocatedInr > 0 && (
              <div className="flex items-start gap-3 bg-warning/10 border border-warning/30 rounded-xl px-5 py-4 text-sm">
                <TriangleAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <div className="text-text-primary">
                  No usage in this window, so the split can&apos;t be computed. Pick a longer
                  window or use the strict figures.
                  <span className="block text-xs text-text-muted mt-1">
                    ₹{formatINR(data.unallocatedInr)} of provider liability isn&apos;t assigned to
                    any provider, so the recommended figures below cover only the in-flight buffer.
                  </span>
                </div>
              </div>
            )}

            {/* ===== OTHER provider warning ===== */}
            {hasOther && (
              <div className="flex items-start gap-3 bg-warning/10 border border-warning/30 rounded-xl px-5 py-4 text-sm">
                <TriangleAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <span className="text-text-primary">
                  Spend was recorded on a model that isn&apos;t mapped to a known provider. Its
                  share is shown under <strong>Other</strong>; fund whichever provider serves it.
                </span>
              </div>
            )}

            {/* ===== Stat tiles ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatTile
                label="Total Wallet Balance"
                value={data.totalWalletBalanceInr}
                hint="What users can still spend, incl. markup"
                icon={<IndianRupee className="w-3.5 h-3.5" />}
                iconCls="bg-gold-muted text-gold"
              />
              <StatTile
                label="Provider Liability"
                value={data.totalRequiredProviderBalanceInr}
                hint={`Wallets ÷ ${data.markup} markup, no buffers`}
                icon={<Scale className="w-3.5 h-3.5" />}
                iconCls="bg-bg-tertiary text-text-secondary"
              />
              <StatTile
                label="Total Recommended"
                value={data.totalRecommendedInr}
                hint="Suggested cash to hold across providers"
                icon={<Target className="w-3.5 h-3.5" />}
                iconCls="bg-green-muted text-green"
              />
              <StatTile
                label="Total Strict (zero-risk)"
                value={data.totalStrictRequiredInr}
                hint="Guarantees no user is ever blocked"
                icon={<ShieldCheck className="w-3.5 h-3.5" />}
                iconCls="bg-warning/10 text-warning"
              />
            </div>

            {/* ===== Per-provider table ===== */}
            <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-sm font-medium text-text-primary">By Provider</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Provider</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider min-w-[180px]">Usage Share</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Charged</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Provider Cost</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Recommended</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Strict (zero-risk)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.providers.map((p) => {
                      const isOther = p.provider === "OTHER";
                      return (
                        <tr
                          key={p.provider}
                          className={`border-b border-border/50 transition-colors ${
                            isOther ? "bg-warning/5 hover:bg-warning/10" : "hover:bg-bg-tertiary/50"
                          }`}
                        >
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <span className={`inline-flex items-center gap-2 ${isOther ? "text-warning" : "text-text-primary"}`}>
                              {isOther && <TriangleAlert className="w-3.5 h-3.5" />}
                              {PROVIDER_LABELS[p.provider] ?? p.provider}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${isOther ? "bg-warning" : "bg-gold"}`}
                                  style={{ width: `${Math.min(100, Math.max(0, p.usageSharePercent))}%` }}
                                />
                              </div>
                              <span className="w-14 text-right text-xs font-mono text-text-secondary">
                                {p.usageSharePercent.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-mono text-text-secondary">
                            ₹{formatINR(p.chargedInr)}
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-mono text-text-secondary">
                            ₹{formatINR(p.providerCostInr)}
                          </td>
                          <td className="px-6 py-4 text-right font-mono">
                            <span className="text-base font-semibold text-text-primary">
                              ₹{formatINR(p.recommendedInr)}
                            </span>
                            <span className="block text-[11px] text-text-muted">
                              needs ₹{formatINR(p.requiredBalanceInr)} unbuffered
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-mono text-text-secondary">
                            ₹{formatINR(p.strictRequiredInr)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== Assumptions ===== */}
            <div className="text-xs text-text-muted leading-relaxed space-y-1">
              <p>
                Markup {data.markup}× · FX buffer {formatPct(data.fxBuffer)} · Safety buffer{" "}
                {formatPct(data.safetyBuffer)} · In-flight buffer ₹{formatINR(data.inFlightBufferInr)} per provider
              </p>
              <p>
                <span className="text-text-secondary">Recommended</span> = unbuffered share × (1 + FX) × (1 + safety) + in-flight.{" "}
                <span className="text-text-secondary">Strict</span> = full liability × (1 + FX) + in-flight, held
                with every provider so any usage mix is covered.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
