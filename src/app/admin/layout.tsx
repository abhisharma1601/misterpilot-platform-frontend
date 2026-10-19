"use client";

import { usePathname } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";

const ADMIN_LOGIN_PATH = "/admin/login";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The login page itself must stay reachable without a session
  if (pathname === ADMIN_LOGIN_PATH) return <>{children}</>;

  return <AuthGuard loginPath={ADMIN_LOGIN_PATH} requireAdmin>{children}</AuthGuard>;
}
