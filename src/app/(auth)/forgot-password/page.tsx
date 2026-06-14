"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiFetch } from "@/lib/api";

type State = "idle" | "loading" | "sent";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
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
          {state === "sent" ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Check your inbox</h2>
              <p className="text-sm text-text-secondary">
                If <span className="text-text-primary font-medium">{email}</span> is registered, you&apos;ll receive a reset link shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Reset Password</h2>
                <p className="text-sm text-text-secondary mt-1">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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

                {error && (
                  <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-error/20 text-sm text-error">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full py-2.5 bg-gold hover:bg-gold-hover disabled:opacity-60 disabled:cursor-not-allowed text-[#071B1C] text-sm font-bold rounded-lg transition-colors"
                >
                  {state === "loading" ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          <Link href="/login" className="text-gold hover:text-gold-hover transition-colors font-medium">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
