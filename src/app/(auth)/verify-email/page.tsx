"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type VerifyState = "verifying" | "success" | "error";
type ResendState = "idle" | "sending" | "sent" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  // Verification flow (when a token is present in the link).
  const [verifyState, setVerifyState] = useState<VerifyState>(
    token ? "verifying" : "error"
  );
  const [error, setError] = useState(
    token ? "" : "Invalid or missing verification link."
  );

  // Resend flow — shown when there's no token, or when the user asks for a new link.
  const [showResend, setShowResend] = useState(!token);
  const [email, setEmail] = useState("");
  const [resendState, setResendState] = useState<ResendState>("idle");
  const [resendError, setResendError] = useState("");

  // Guard against React StrictMode double-invoking the effect in dev.
  const submitted = useRef(false);

  useEffect(() => {
    if (!token || submitted.current) return;
    submitted.current = true;

    apiFetch("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then(() => setVerifyState("success"))
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Verification failed. Please try again."
        );
        setVerifyState("error");
      });
  }, [token]);

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    setResendError("");
    setResendState("sending");
    try {
      await apiFetch("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setResendState("sent");
    } catch (err) {
      setResendError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setResendState("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/icon.png"
            alt="MisterPilot"
            width={48}
            height={48}
            className="w-12 h-12 rounded-xl mb-4"
          />
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            MisterPilot
          </h1>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          {showResend ? (
            resendState === "sent" ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">Check your inbox</h2>
                <p className="text-sm text-text-secondary">
                  If <span className="text-text-primary font-medium">{email}</span> is registered, a verification link is on its way.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">Resend Verification Email</h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Enter your email and we&apos;ll send you a new verification link.
                  </p>
                </div>

                <form onSubmit={handleResend} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-3 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {resendState === "error" && resendError && (
                    <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-error/20 text-sm text-error">
                      {resendError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={resendState === "sending"}
                    className="w-full py-2.5 bg-gold hover:bg-gold-hover disabled:opacity-60 disabled:cursor-not-allowed text-[#071B1C] text-sm font-bold rounded-lg transition-colors"
                  >
                    {resendState === "sending" ? "Sending…" : "Send Verification Link"}
                  </button>
                </form>
              </>
            )
          ) : (
            <>
              {verifyState === "verifying" && (
                <div className="text-center py-4 space-y-3">
                  <span className="w-8 h-8 border-2 border-gold/40 border-t-gold rounded-full animate-spin inline-block" />
                  <h2 className="text-lg font-semibold text-text-primary">
                    Verifying your email
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Just a moment while we confirm your address…
                  </p>
                </div>
              )}

              {verifyState === "success" && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-muted flex items-center justify-center mx-auto">
                    <svg
                      className="w-6 h-6 text-green"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Email Verified
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Your email address has been verified. You can now sign in.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block mt-2 px-4 py-2.5 bg-gold hover:bg-gold-hover text-[#071B1C] text-sm font-bold rounded-lg transition-colors"
                  >
                    Continue to Login
                  </Link>
                </div>
              )}

              {verifyState === "error" && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                    <svg
                      className="w-6 h-6 text-error"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Verification Failed
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {error || "This verification link is invalid or has expired."}
                  </p>
                  <button
                    onClick={() => setShowResend(true)}
                    className="inline-block mt-2 px-4 py-2.5 bg-gold hover:bg-gold-hover text-[#071B1C] text-sm font-bold rounded-lg transition-colors"
                  >
                    Resend Verification Link
                  </button>
                  <div>
                    <Link
                      href="/login"
                      className="text-sm text-gold hover:text-gold-hover transition-colors font-medium"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
