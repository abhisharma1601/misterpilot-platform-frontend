"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthForm from "@/components/auth/AuthForm";
import GoogleButton from "@/components/auth/GoogleButton";
import { googleLogin, saveSession } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleTermsAccepted, setGoogleTermsAccepted] = useState(false);

  async function handleGoogleToken(idToken: string) {
    if (!googleTermsAccepted) {
      setError("You must accept the Terms and Conditions to continue.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const auth = await googleLogin(idToken);
      saveSession(auth);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
    } finally {
      setLoading(false);
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

        {/* Card */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Create Your Account</h2>
            <p className="text-sm text-text-secondary mt-1">
              Start building with AI in minutes.
            </p>
          </div>

          {/* Google Sign-In */}
          <div className="mb-4">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-2.5 text-sm text-text-muted">
                <span className="w-4 h-4 border-2 border-green/40 border-t-green rounded-full animate-spin" />
                Creating account…
              </div>
            ) : (
              <GoogleButton text="signup_with" onToken={handleGoogleToken} />
            )}
          </div>

          {/* Terms checkbox for Google path */}
          <label className="flex items-start gap-2.5 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={googleTermsAccepted}
              onChange={(e) => setGoogleTermsAccepted(e.target.checked)}
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

          {/* Error */}
          {error && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-error/20 text-sm text-error">
              {error}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted uppercase">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Register Form */}
          <AuthForm mode="register" />
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:text-gold-hover transition-colors font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
