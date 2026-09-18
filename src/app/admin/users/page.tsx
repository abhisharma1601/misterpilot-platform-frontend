"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  UserRound,
  Users,
  UserCheck,
  UserX,
  LayoutDashboard,
  Wallet,
  Tag,
  LogOut,
  Search,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  adminApiFetch,
  clearSession,
  type AdminUser,
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

function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border bg-green/10 text-green border-green/30">
      Active
    </span>
  ) : (
    <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border bg-text-muted/20 text-text-muted border-text-muted/30">
      Inactive
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

// ---- Page ----

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [tab, setTab] = useState<"active" | "inactive">("active");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [fetching, setFetching] = useState(false);

  // Fetch users from API
  const fetchUsers = useCallback(async (pageNum: number) => {
    setFetching(true);
    setError("");
    try {
      const data = await adminApiFetch<PaginatedUsers>(
        `/admin/users?page=${pageNum}&size=${PAGE_SIZE}`
      );
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setPage(data.number);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setFetching(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(0);
  }, [fetchUsers]);

  // Derived stats from ALL users (totals come from API totalElements)
  const activeCount = users.filter((u) => u.active).length;
  const inactiveCount = users.filter((u) => !u.active).length;
  const totalBalance = users.reduce((sum, u) => sum + u.balance, 0);

  // Filtered list (client-side filter on current page)
  const filteredUsers = useMemo(() => {
    let list = users.filter((u) => u.active === (tab === "active"));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          `#${u.id}`.includes(q)
      );
    }
    return list;
  }, [users, tab, search]);

  function handleLogout() {
    clearSession();
    window.location.href = "/admin/login";
  }

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
            />
            <NavLink
              href="/admin/users"
              icon={<UserRound className="w-4 h-4" />}
              label="Users"
              active
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Users
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Manage user accounts, activation status, and wallet balances.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* ===== KPI Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-text-secondary">Total Users</span>
              <div className="w-8 h-8 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-text-primary">
              {totalElements}
            </div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-text-secondary">
                Active (this page)
              </span>
              <div className="w-8 h-8 rounded-lg bg-green-muted flex items-center justify-center text-green">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-green">
              {activeCount}
            </div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-text-secondary">
                Inactive (this page)
              </span>
              <div className="w-8 h-8 rounded-lg bg-text-muted/20 flex items-center justify-center text-text-muted">
                <UserX className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-text-muted">
              {inactiveCount}
            </div>
          </div>
        </div>

        {/* Total wallet balance row */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <IndianRupee className="w-4 h-4 text-gold" />
          <span>
            Wallet balance (this page):{" "}
            <span className="text-text-primary font-semibold">
              ₹{formatINR(totalBalance)}
            </span>
          </span>
        </div>

        {/* ===== Tab Switcher ===== */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "active"
                ? "bg-gold/15 text-gold"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setTab("inactive")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "inactive"
                ? "bg-gold/15 text-gold"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
            }`}
          >
            Inactive ({inactiveCount})
          </button>
        </div>

        {/* ===== Error Banner ===== */}
        {error && (
          <div className="flex items-start gap-2.5 px-3 py-2.5 bg-error/10 border border-error/30 rounded-lg">
            <AlertCircle className="w-4 h-4 text-error mt-px shrink-0" />
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        {/* ===== Loading State ===== */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-gold animate-spin" />
            <span className="ml-3 text-sm text-text-muted">Loading users…</span>
          </div>
        ) : (
          <>
            {/* ===== Users Table ===== */}
            <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                        ID
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                        Email
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                        Balance
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-12 text-center text-sm text-text-muted"
                        >
                          {search.trim()
                            ? "No users match your search."
                            : `No ${tab} users found on this page.`}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-text-secondary font-mono">
                            #{user.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-text-primary font-medium">
                            {user.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-text-secondary">
                            {user.email}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-green font-mono">
                            ₹{formatINR(user.balance)}
                          </td>
                          <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <StatusBadge active={user.active} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== Pagination ===== */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-text-muted">
                {totalElements > 0
                  ? `${totalElements} result${totalElements !== 1 ? "s" : ""} · Page ${page + 1} of ${Math.max(totalPages, 1)}`
                  : "No users"}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => fetchUsers(page - 1)}
                  disabled={page === 0 || fetching}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  // Show first 2, last 2, current +/- 1, with ellipsis gaps
                  const last = totalPages - 1;
                  let pageNum: number;
                  if (totalPages <= 7) {
                    pageNum = i;
                  } else if (page <= 3) {
                    if (i < 5) pageNum = i;
                    else if (i === 5) pageNum = -1; // ellipsis
                    else pageNum = last;
                  } else if (page >= last - 3) {
                    if (i === 0) pageNum = 0;
                    else if (i === 1) pageNum = -1; // ellipsis
                    else pageNum = last - (6 - i);
                  } else {
                    if (i === 0) pageNum = 0;
                    else if (i === 1) pageNum = -1; // ellipsis
                    else if (i === 2) pageNum = page - 1;
                    else if (i === 3) pageNum = page;
                    else if (i === 4) pageNum = page + 1;
                    else if (i === 5) pageNum = -1; // ellipsis
                    else pageNum = last;
                  }
                  if (pageNum === -1) {
                    return (
                      <span key={`ellipsis-${i}`} className="px-2 py-1 text-sm text-text-muted select-none">
                        …
                      </span>
                    );
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => fetchUsers(pageNum)}
                      disabled={fetching}
                      className={`w-9 h-9 text-sm font-medium rounded-lg border transition-colors ${
                        pageNum === page
                          ? "bg-gold/15 text-gold border-gold/30"
                          : "border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
                <button
                  onClick={() => fetchUsers(page + 1)}
                  disabled={page + 1 >= totalPages || fetching}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Page-level fetching overlay */}
            {fetching && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 text-gold animate-spin" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
