"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, saveSession, AuthResponse } from "@/lib/api";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!form.name.trim()) {
        setError("Full name is required.");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (!termsAccepted) {
        setError("You must accept the Terms and Conditions to continue.");
        return;
      }
    }

    setLoading(true);
    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const auth = await apiFetch<AuthResponse>(path, {
        method: "POST",
        body: JSON.stringify(body),
      });
      saveSession(auth);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-3 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className="w-full px-3 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
          className="w-full px-3 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
          required
        />
      </div>

      {mode === "register" && (
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
            required
          />
        </div>
      )}

      {mode === "register" && (
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 shrink-0 accent-gold cursor-pointer"
          />
          <span className="text-xs text-text-muted leading-relaxed">
            I agree to the{" "}
            <Link href="/terms-and-conditions" target="_blank" className="text-gold hover:text-gold-hover transition-colors">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" target="_blank" className="text-gold hover:text-gold-hover transition-colors">
              Privacy Policy
            </Link>
          </span>
        </label>
      )}

      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-error/20 text-sm text-error">
          {error}
        </div>
      )}

      {mode === "login" && (
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-gold hover:text-gold-hover transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-gold hover:bg-gold-hover disabled:opacity-60 disabled:cursor-not-allowed text-[#071B1C] text-sm font-bold rounded-lg transition-colors"
      >
        {loading
          ? mode === "login"
            ? "Logging in…"
            : "Creating account…"
          : mode === "login"
          ? "Login"
          : "Create Account"}
      </button>
    </form>
  );
}
