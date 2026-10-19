"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, hasAdminRole, hasValidSession } from "@/lib/api";

export default function AuthGuard({
  children,
  loginPath = "/login",
  requireAdmin = false,
}: {
  children: React.ReactNode;
  loginPath?: string;
  /** When set, signed-in non-admins are sent to the regular user login. */
  requireAdmin?: boolean;
}) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!hasValidSession()) {
      // Drop any stale/expired token so the login page starts clean
      clearSession();
      router.replace(loginPath);
    } else if (requireAdmin && !hasAdminRole()) {
      router.replace("/login");
    } else {
      setVerified(true);
    }
  }, [router, loginPath, requireAdmin]);

  if (!verified) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-primary">
        <span className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
