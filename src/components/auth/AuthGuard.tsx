"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJwt } from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!getJwt()) {
      router.replace("/login");
    } else {
      setVerified(true);
    }
  }, [router]);

  if (!verified) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-primary">
        <span className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
