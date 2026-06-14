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

export function clearSession() {
  localStorage.removeItem("mp_jwt");
  localStorage.removeItem("mp_user");
  document.cookie = "mp_jwt=; path=/; max-age=0";
}
