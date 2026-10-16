"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Users,
  UserCheck,
  TrendingUp,
  Boxes,
  LayoutDashboard,
  UserRound,
  Wallet,
  Tag,
  Landmark,
  LogOut,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  adminApiFetch,
  clearSession,
  fetchEngineModels,
  type AdminUser,
  type EngineModel,
  type PaginatedUsers,
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

// createdAt is server-local time with no timezone; its date part is the signup day
function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function localDayKey(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
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

function ErrorRow({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-error">
      <AlertCircle className="w-4 h-4" />
      <span>{message}</span>
      <button onClick={onRetry} className="inline-flex items-center gap-1 underline hover:text-text-primary">
        <RefreshCw className="w-3.5 h-3.5" /> Retry
      </button>
    </div>
  );
}

const OWNER_LABELS: Record<string, string> = {
  misterpilot: "MisterPilot",
  openai: "OpenAI",
  claude: "Claude",
  anthropic: "Anthropic",
  deepseek: "DeepSeek",
};

function ownerLabel(owner: string) {
  return OWNER_LABELS[owner] ?? owner.charAt(0).toUpperCase() + owner.slice(1);
}

const chartTooltipStyle = {
  background: "#122D2E",
  border: "1px solid #1A3A3B",
  borderRadius: "8px",
  color: "#F0F2F1",
  fontSize: "13px",
};

// The users endpoint has no sort or date filter, so every user is loaded and
// bucketed client-side. Fine at current scale; move to a stats endpoint if it grows.
const USERS_BATCH_SIZE = 500;
const GROWTH_DAYS = 7;
const RECENT_USERS = 10;

// ---- Page ----

export default function AdminDashboardPage() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");

  const [models, setModels] = useState<EngineModel[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [modelsError, setModelsError] = useState("");

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError("");
    try {
      const all: AdminUser[] = [];
      for (let page = 0; ; page++) {
        const data = await adminApiFetch<PaginatedUsers>(
          `/admin/users?page=${page}&size=${USERS_BATCH_SIZE}`
        );
        all.push(...data.content);
        if (data.last || data.content.length === 0) break;
      }
      setUsers(all);
      setLastUpdated(new Date().toLocaleString("en-IN"));
    } catch (err) {
      setUsersError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const fetchModels = useCallback(async () => {
    setModelsLoading(true);
    setModelsError("");
    try {
      setModels(await fetchEngineModels());
    } catch (err) {
      setModelsError(err instanceof Error ? err.message : "Failed to load models.");
    } finally {
      setModelsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchModels();
  }, [fetchUsers, fetchModels]);

  function handleLogout() {
    clearSession();
    window.location.href = "/admin/login";
  }

  // New signups per day for the last GROWTH_DAYS days, plus the running total at each day's end
  const growth = useMemo(() => {
    const perDay = new Map<string, number>();
    for (const u of users) {
      const k = dayKey(u.createdAt);
      perDay.set(k, (perDay.get(k) ?? 0) + 1);
    }
    const days = Array.from({ length: GROWTH_DAYS }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (GROWTH_DAYS - 1 - i));
      return d;
    });
    const windowStart = localDayKey(days[0]);
    let total = users.filter((u) => dayKey(u.createdAt) < windowStart).length;
    const points = days.map((d) => {
      const newUsers = perDay.get(localDayKey(d)) ?? 0;
      total += newUsers;
      return {
        label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
        newUsers,
        total,
      };
    });
    return { points, newInWindow: points.reduce((s, p) => s + p.newUsers, 0) };
  }, [users]);

  const activeCount = useMemo(() => users.filter((u) => u.active).length, [users]);

  const recentUsers = useMemo(
    () =>
      [...users]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, RECENT_USERS),
    [users]
  );

  const modelsByOwner = useMemo(() => {
    const groups = new Map<string, EngineModel[]>();
    for (const m of models) {
      groups.set(m.owned_by, [...(groups.get(m.owned_by) ?? []), m]);
    }
    return Array.from(groups.entries());
  }, [models]);

  const usersReady = !usersLoading && !usersError;

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
            <NavLink href="/admin/funding" icon={<Landmark className="w-4 h-4" />} label="Funding" />
            <NavLink
              href="/admin/offers"
              icon={<Tag className="w-4 h-4" />}
              label="Offers"
            />
          </div>

          {/* Right: logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
          >
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
              {usersReady ? users.length.toLocaleString("en-IN") : "—"}
            </div>
            {usersReady && (
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-green" />
                <span className="text-xs font-medium text-green">
                  +{growth.newInWindow} in the last {GROWTH_DAYS} days
                </span>
              </div>
            )}
          </div>

          {/* Active Users */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-gold/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-text-secondary">Active Users</span>
              <div className="w-9 h-9 rounded-lg bg-green-muted flex items-center justify-center text-green">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-text-primary">
              {usersReady ? activeCount.toLocaleString("en-IN") : "—"}
            </div>
            {usersReady && (
              <div className="mt-2 text-xs text-text-muted">
                {(users.length - activeCount).toLocaleString("en-IN")} inactive
              </div>
            )}
          </div>

          {/* Models */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-gold/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-text-secondary">Models Available</span>
              <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
                <Boxes className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-text-primary">
              {!modelsLoading && !modelsError ? models.length : "—"}
            </div>
            {!modelsLoading && !modelsError && (
              <div className="mt-2 text-xs text-text-muted">
                {modelsByOwner.map(([owner, list]) => `${list.length} ${ownerLabel(owner)}`).join(" · ")}
              </div>
            )}
          </div>
        </div>

        {/* ===== User growth + Models ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* User growth chart */}
          <div className="lg:col-span-2 bg-bg-secondary border border-border rounded-xl p-6">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-sm font-medium text-text-secondary">
                New Users — Last {GROWTH_DAYS} Days
              </h3>
              {usersReady && (
                <span className="text-xs text-text-muted">
                  {growth.points[0].total - growth.points[0].newUsers} →{" "}
                  {growth.points[GROWTH_DAYS - 1].total} total
                </span>
              )}
            </div>
            {usersLoading ? (
              <div className="h-[260px] flex items-center justify-center text-text-muted">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : usersError ? (
              <ErrorRow message={usersError} onRetry={fetchUsers} />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={growth.points} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A3A3B" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#5A6B6C"
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#5A6B6C"
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    width={32}
                  />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    cursor={{ fill: "rgba(254, 208, 8, 0.06)" }}
                    formatter={(value: number) => [value, "New users"]}
                    labelFormatter={(label: string, payload) => {
                      const total = payload?.[0]?.payload?.total;
                      return total === undefined ? label : `${label} · ${total} total`;
                    }}
                  />
                  <Bar dataKey="newUsers" name="New users" fill="#FED008" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Models list */}
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-4">Models</h3>
            {modelsLoading ? (
              <div className="h-[260px] flex items-center justify-center text-text-muted">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : modelsError ? (
              <ErrorRow message={modelsError} onRetry={fetchModels} />
            ) : (
              <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                {modelsByOwner.map(([owner, list]) => (
                  <div key={owner}>
                    <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1.5">
                      {ownerLabel(owner)} · {list.length}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {list.map((m) => (
                        <span
                          key={m.id}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-bg-tertiary border border-border text-text-secondary"
                        >
                          {m.id}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                      <Loader2 className="w-5 h-5 animate-spin text-text-muted mx-auto" />
                    </td>
                  </tr>
                ) : usersError ? (
                  <tr>
                    <td colSpan={5}>
                      <ErrorRow message={usersError} onRetry={fetchUsers} />
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
      </div>
    </div>
  );
}
