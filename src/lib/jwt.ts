// Runtime-agnostic JWT helpers — used by both client code and middleware (edge runtime).

/** Decodes a JWT payload without verifying the signature. Returns null if malformed. */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}

/**
 * True when the token is well-formed and not past its `exp`.
 * The signature is still checked by the backend — this only avoids rendering
 * protected UI for sessions that are obviously missing, malformed or expired.
 */
export function isJwtUsable(token: string | null | undefined): boolean {
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  const exp = payload.exp;
  if (typeof exp === "number" && exp * 1000 <= Date.now()) return false;
  return true;
}

/** True when the token carries the backend's ADMIN role claim. */
export function isAdminJwt(token: string | null | undefined): boolean {
  if (!token) return false;
  return decodeJwtPayload(token)?.role === "ADMIN";
}
