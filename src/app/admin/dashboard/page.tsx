"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Users,
  IndianRupee,
  ArrowLeftRight,
  TrendingUp,
  LayoutDashboard,
  UserRound,
  Wallet,
  Tag,
  LogOut,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  totalUsers,
  usersThisWeek,
  totalRevenue,
  revenueThisMonth,
  transactionsToday,
  transactionsTodayVolume,
  dailyVolume,
  dailyTokenCost,
} from "@/lib/admin/dummyData";
import {
  adminApiFetch,
  AdminUser,
  AdminTransaction,
  PaginatedTransactions,
} from "@/lib/api";

// ---- Helpers ----

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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
  status: "success" | "pending" | "failed" | "active" | "inactive";
}) {
  const map: Record<string, { label: string; cls: string }> = {
    success: { label: "Success", cls: "bg-green/10 text-green border-green/30" },
    pending: { label: "Pending", cls: "bg-warning/10 text-warning border-warning/30" },
    failed: { label: "Failed", cls: "bg-error/10 text-error border-error/30" },
    active: { label: "Active", cls: "bg-green/10 text-green border-green/30" },
    inactive: { label: "Inactive", cls: "bg-text-muted/20 text-text-muted border-text-muted/30" },
  };
  const s = map[status] ?? map.pending;
  return (
    <span
      className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border ${s.cls}`}
    >
      {s.label}
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

// ---- Chart data ----

const volumeChartData = dailyVolume.map((d) => ({
  ...d,
  date: new Date(d.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  }),
}));

const tokenChartData = dailyTokenCost.map((d) => ({
  ...d,
  date: new Date(d.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  }),
}));

const chartTooltipStyle = {
  background: "#122D2E",
  border: "1px solid #1A3A3B",
  borderRadius: "8px",
  color: "#F0F2F1",
  fontSize: "13px",
};

// ---- Page ----

export default function AdminDashboardPage() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Recent Transactions from API
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [txPage, setTxPage] = useState(0);
  const [txTotalPages, setTxTotalPages] = useState(0);
  const [txTotalElements, setTxTotalElements] = useState(0);
  const [txLoading, setTxLoading] = useState(true);
  const [txError, setTxError] = useState<string | null>(null);
  const [txStatusFilter, setTxStatusFilter] = useState<"all" | "success" | "pending" | "failed">("all");

  // Recent Users from API
  const [recentUsers, setRecentUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString("en-IN"));
  }, []);

  // Fetch transactions from API
  const fetchTransactions = useCallback(
    async (pageNum: number) => {
      setTxLoading(true);
      setTxError(null);
      try {
        const data = await adminApiFetch<PaginatedTransactions>(
          `/admin/transactions?page=${pageNum}&size=10`
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
    },
    []
  );

  useEffect(() => {
    fetchTransactions(0);
  }, [fetchTransactions]);

  useEffect(() => {
    setUsersLoading(true);
    setUsersError(null);
    adminApiFetch<{ content: AdminUser[] }>("/admin/users?page=0&size=10")
      .then((data) => setRecentUsers(data.content ?? []))
      .catch((err) => setUsersError(err.message))
      .finally(() => setUsersLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ===== Nav Bar ===== */}
      <nav className="sticky top-0 z-10 bg-bg-secondary/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-8 h-14">
          {/* Left: brand */}
          <div className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="MisterPilot"
              width={28}
              height={28}
              className="w-7 h-7 rounded-md"
            />
            <span className="text-sm font-semibold text-text-primary tracking-tight">
              Admin
            </span>
          </div>

          {/* Center: nav links */}
          <div className="flex items-center gap-1">
            <NavLink
              href="/admin/dashboard"
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard"
              active
            />
            <NavLink
              href="/admin/users"
              icon={<UserRound className="w-4 h-4" />}
              label="Users"
            />
            <NavLink
              href="/admin/cashflow"
              icon={<Wallet className="w-4 h-4" />}
              label="CashFlow"
            />
            <NavLink
              href="/admin/offers"
              icon={<Tag className="w-4 h-4" />}
              label="Offers"
            />
          </div>

          {/* Right: logout */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Page content */}
      <div className="p-6 md:p-8 space-y-8">
        {/* ===== Header ===== */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Last updated: {lastUpdated ?? "..."}
          </p>
        </div>

      {/* ===== KPI Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-gold/30 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <span className="text-sm text-text-secondary">Total Users</span>
            <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-text-primary">
            {totalUsers.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-green" />
            <span className="text-xs font-medium text-green">
              +{usersThisWeek} this week
            </span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-gold/30 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <span className="text-sm text-text-secondary">Total Revenue</span>
            <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-text-primary">
            ₹{formatINR(totalRevenue)}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-green" />
            <span className="text-xs font-medium text-green">
              +₹{formatINR(revenueThisMonth)} this month
            </span>
          </div>
        </div>

        {/* Transactions Today */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-gold/30 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <span className="text-sm text-text-secondary">
              Transactions Today
            </span>
            <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-text-primary">
            {transactionsToday}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-text-muted">
              Volume: ₹{formatINR(transactionsTodayVolume)}
            </span>
          </div>
        </div>

      </div>

      {/* ===== Charts Row ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Transaction Volume */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary mb-4">
            Daily Transaction Volume (₹)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={volumeChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3A3B" />
              <XAxis
                dataKey="date"
                stroke="#5A6B6C"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#5A6B6C"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value: number) => [
                  `₹${formatINR(value)}`,
                  "Volume",
                ]}
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#FED008"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#FED008" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Token Cost (Cache Hit vs Miss) */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary mb-4">
            Daily Token Cost (Cache Hit vs Miss)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={tokenChartData} barGap={0} barCategoryGap="30%">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1A3A3B"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#5A6B6C"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#5A6B6C"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value: number) => [`₹${formatINR(value)}`, ""]}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", color: "#8A9B9C" }}
              />
              <Bar
                dataKey="cacheHitCost"
                name="Cache Hit"
                stackId="cost"
                fill="#35AA35"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="cacheMissCost"
                name="Cache Miss"
                stackId="cost"
                fill="#FED008"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Recent Transactions ===== */}
      <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
        {/* Header with filters */}
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-sm font-medium text-text-primary">
            Recent Transactions
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-text-muted" />
              <select
                value={txStatusFilter}
                onChange={(e) => setTxStatusFilter(e.target.value as typeof txStatusFilter)}
                className="text-xs bg-bg-primary border border-border rounded-md px-2 py-1 text-text-primary focus:outline-none focus:border-gold"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">ID</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">User ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Order ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {txLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-text-muted">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="text-sm">Loading transactions...</span>
                    </div>
                  </td>
                </tr>
              ) : txError ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-error">
                    {txError}
                  </td>
                </tr>
              ) : (() => {
                const filteredTx =
                  txStatusFilter === "all"
                    ? transactions
                    : transactions.filter((tx) => tx.status === txStatusFilter.toUpperCase());

                if (filteredTx.length === 0) {
                  return (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-sm text-text-muted">
                        No transactions match your filters.
                      </td>
                    </tr>
                  );
                }

                return filteredTx.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-text-secondary font-mono">#{tx.id}</td>
                    <td className="px-6 py-3 text-sm text-right text-green font-mono">
                      +₹{formatINR(tx.amount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={tx.status.toLowerCase() as "success" | "pending" | "failed"} />
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary font-mono">#{tx.userId}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary font-mono text-[11px]">{tx.orderId}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary whitespace-nowrap">{formatDateTime(tx.createdAt)}</td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-border">
          <p className="text-xs text-text-muted">
            {txTotalElements} result{txTotalElements !== 1 ? "s" : ""} &middot; Page {txPage + 1} of {Math.max(txTotalPages, 1)}
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

      {/* ===== Recent Users ===== */}
      <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-sm font-medium text-text-primary">
            Recent Users
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  ID
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Email
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Wallet Balance
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {usersLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-text-muted">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="text-sm">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : usersError ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-error">
                    {usersError}
                  </td>
                </tr>
              ) : recentUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-text-muted">
                    No users found.
                  </td>
                </tr>
              ) : (
                recentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors"
                >
                  <td className="px-6 py-3 text-sm text-text-secondary font-mono">
                    #{user.id}
                  </td>
                  <td className="px-6 py-3 text-sm text-text-primary font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-text-secondary">
                    {user.email}
                  </td>
                  <td className="px-6 py-3 text-sm text-right text-green font-mono">
                    ₹{formatINR(user.balance)}
                  </td>
                  <td className="px-6 py-3 text-sm text-text-secondary whitespace-nowrap">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* close page content wrapper */}
      </div>
    </div>
  );
}
