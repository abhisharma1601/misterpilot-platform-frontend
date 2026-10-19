import { isAdminJwt, isJwtUsable } from "@/lib/jwt";

// All /api/backend/* requests are proxied to http://localhost:8080/api/v1/* by next.config.mjs
const API_BASE = "/api/backend";

export interface AuthResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
}

async function extractErrorMessage(res: Response): Promise<string> {
  if (res.status >= 500) return "Service unavailable. Please try again later.";

  const fallbacks: Record<number, string> = {
    400: "Invalid request. Please check your input.",
    401: "Incorrect email or password.",
    403: "You don't have permission to do that.",
    404: "The requested resource was not found.",
    409: "An account with this email already exists.",
    422: "Invalid input. Please check your details.",
    429: "Too many requests. Please slow down.",
  };
  if (fallbacks[res.status]) return fallbacks[res.status];

  // Unknown status — try to surface something from the body
  const text = await res.text().catch(() => "");
  if (text) {
    try {
      const json = JSON.parse(text);
      const msg = json.message ?? json.error ?? json.detail;
      if (typeof msg === "string" && msg.trim()) return msg.trim();
    } catch {
      if (text.length < 120 && !text.trimStart().startsWith("<")) return text.trim();
    }
  }

  return "Something went wrong. Please try again.";
}

/** All backend calls must go through this — never fetch localhost:8080 directly. */
export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("mp_jwt") : null;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      ...options.headers,
    },
  }).catch(() => {
    throw new Error("Unable to reach the server. Please check your connection.");
  });
  if (!res.ok) {
    throw new Error(await extractErrorMessage(res));
  }
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

export async function googleLogin(idToken: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/google/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  }).catch(() => {
    throw new Error("Unable to reach the server. Please check your connection.");
  });
  if (!res.ok) {
    throw new Error(await extractErrorMessage(res));
  }
  return res.json();
}

export function saveSession(auth: AuthResponse) {
  localStorage.setItem("mp_jwt", auth.token);
  localStorage.setItem(
    "mp_user",
    JSON.stringify({ userId: auth.userId, name: auth.name, email: auth.email })
  );
  // Also persist in a cookie so server components can read it
  document.cookie = `mp_jwt=${auth.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

export function getJwt(): string | null {
  return localStorage.getItem("mp_jwt");
}

/** True when a well-formed, unexpired JWT is stored. */
export function hasValidSession(): boolean {
  return isJwtUsable(getJwt());
}

/** True when the stored JWT belongs to an admin. */
export function hasAdminRole(): boolean {
  return isAdminJwt(getJwt());
}

export interface StoredUser {
  userId: number;
  name: string;
  email: string;
}

/** Reads the user persisted by saveSession() — used as a fallback when /profile/me is unavailable. */
export function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem("mp_user");
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem("mp_jwt");
  localStorage.removeItem("mp_user");
  document.cookie = "mp_jwt=; path=/; max-age=0";
}

// ── Admin API ────────────────────────────────────────────────────────────────
// Admin endpoints require the same JWT but with "Bearer".

export async function adminApiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("mp_jwt") : null;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      ...options.headers,
    },
  }).catch(() => {
    throw new Error("Unable to reach the server. Please check your connection.");
  });
  // Expired or invalid token — drop the session and send the admin back to login
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      clearSession();
      window.location.href = "/admin/login";
    }
    throw new Error("Your session has expired. Please log in again.");
  }
  // Authenticated but not an admin — send them to the regular user login
  if (res.status === 403) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("You don't have permission to do that.");
  }
  if (!res.ok) {
    throw new Error(await extractErrorMessage(res));
  }
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// ── Admin types ──────────────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  balance: number;
  active: boolean;
  createdAt: string;
}

export interface AdminTransaction {
  id: number;
  amount: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  /** null when the user's wallet has been deleted */
  userId: number | null;
  orderId: string;
  createdAt: string;
}

export interface PaginatedUsers extends Omit<PaginatedTransactions, "content"> {
  content: AdminUser[];
}

export interface PaginatedTransactions {
  content: AdminTransaction[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { unsorted: boolean; sorted: boolean; empty: boolean };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: { unsorted: boolean; sorted: boolean; empty: boolean };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// ── Provider funding ─────────────────────────────────────────────────────────

export type FundingProvider = "OPENAI" | "DEEPSEEK" | "ANTHROPIC" | "OTHER";

export interface ProviderFundingRow {
  provider: FundingProvider;
  chargedInr: number;
  providerCostInr: number;
  usageSharePercent: number;
  requiredBalanceInr: number;
  strictRequiredInr: number;
  recommendedInr: number;
}

export interface ProviderFundingResponse {
  totalWalletBalanceInr: number;
  markup: number;
  fxBuffer: number;
  safetyBuffer: number;
  inFlightBufferInr: number;
  totalRequiredProviderBalanceInr: number;
  totalStrictRequiredInr: number;
  totalRecommendedInr: number;
  windowDays: number | null;
  windowStart: string | null;
  unallocatedInr: number;
  providers: ProviderFundingRow[];
}

// ── Cashflow ─────────────────────────────────────────────────────────────────

export interface CashflowPeriod {
  periodStart: string;
  periodEnd: string;
  revenueInr: number;
  transactionCount: number;
  averageTransactionInr: number;
  previousPeriodStart: string;
  previousPeriodEnd: string;
  previousRevenueInr: number;
  /** null when the previous period had no revenue */
  growthPercent: number | null;
}

export interface CashflowSummary {
  totalRevenueInr: number;
  totalTransactionCount: number;
  generatedAt: string;
  week: CashflowPeriod;
  month: CashflowPeriod;
  quarter: CashflowPeriod;
}

// ── Engine models (public, OpenAI-compatible) ────────────────────────────────

const ENGINE_MODELS_URL = "https://engine.misterpilot.online/v1/models";

export interface EngineModel {
  id: string;
  object: "model";
  created: number;
  owned_by: string;
}

export async function fetchEngineModels(): Promise<EngineModel[]> {
  const res = await fetch(ENGINE_MODELS_URL).catch(() => {
    throw new Error("Unable to reach the model engine.");
  });
  if (!res.ok) throw new Error("Failed to load models.");
  const body: { data?: EngineModel[] } = await res.json();
  return body.data ?? [];
}
