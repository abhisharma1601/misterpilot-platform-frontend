"use client";

import { useEffect, useState } from "react";
import TopNav from "@/components/layout/TopNav";
import { apiFetch, getJwt, getStoredUser } from "@/lib/api";
import { User, Mail, Calendar, Shield, Trash2, Loader2, MailWarning } from "lucide-react";

interface Profile {
  email: string;
  name: string;
  joinedAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetState, setResetState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [verifyState, setVerifyState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    setJwt(getJwt());
    apiFetch<Profile>("/profile/me")
      .then(setProfile)
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const initial = profile?.name?.charAt(0)?.toUpperCase() ?? "?";

  // One check: if mp_jwt is null (or the literal string "null"), show the resend button.
  const showResend = jwt === null || jwt === "null";

  // Email for the resend call: profile response, else the user persisted at login.
  const email = profile?.email ?? getStoredUser()?.email ?? "";

  async function handleSendResetLink() {
    if (!email) return;
    setResetState("sending");
    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setResetState("sent");
    } catch {
      setResetState("error");
    }
  }

  async function handleResendVerification() {
    if (!email) {
      setVerifyState("error");
      return;
    }
    setVerifyState("sending");
    try {
      await apiFetch("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setVerifyState("sent");
    } catch {
      setVerifyState("error");
    }
  }

  const joinedFormatted = profile?.joinedAt
    ? new Date(profile.joinedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <>
      <TopNav title="Profile" />
      <div className="p-8 space-y-8 max-w-2xl">

        {/* Resend verification — shown when mp_jwt is null */}
        {showResend && (
          <div className="bg-gold/5 border border-gold/30 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <MailWarning className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">Your email isn&apos;t verified</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {verifyState === "sent"
                      ? `Verification link sent to ${email}. Check your inbox.`
                      : verifyState === "error"
                      ? "Couldn&apos;t send the link. Please try again."
                      : "Send yourself a fresh verification link."}
                  </p>
                </div>
              </div>
              <button
                onClick={handleResendVerification}
                disabled={verifyState === "sending" || verifyState === "sent" || !email}
                className="shrink-0 px-3.5 py-2 rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed text-[#071B1C] text-sm font-bold transition-colors"
              >
                {verifyState === "sending" ? "Sending…" : verifyState === "sent" ? "Sent!" : "Resend Link"}
              </button>
            </div>
          </div>
        )}

        {/* Account Info */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-6">Account Information</h3>

          {loading ? (
            <div className="flex items-center gap-2 text-text-muted py-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading profile…</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-lg font-bold text-[#071B1C] shrink-0">
                  {initial}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{profile?.name ?? "—"}</div>
                  <div className="text-xs text-text-secondary">{profile?.email ?? "—"}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <User className="w-4 h-4 text-text-muted" />
                <span className="text-sm text-text-secondary w-24">Full Name</span>
                <span className="text-sm text-text-primary">{profile?.name ?? "—"}</span>
              </div>

              <div className="flex items-center gap-3 py-2">
                <Mail className="w-4 h-4 text-text-muted" />
                <span className="text-sm text-text-secondary w-24">Email</span>
                <span className="text-sm text-text-primary">{profile?.email ?? "—"}</span>
              </div>

              <div className="flex items-center gap-3 py-2">
                <Calendar className="w-4 h-4 text-text-muted" />
                <span className="text-sm text-text-secondary w-24">Joined</span>
                <span className="text-sm text-text-primary">{joinedFormatted}</span>
              </div>
            </div>
          )}
        </div>

        {/* Security */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Security</h3>
          <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-bg-tertiary transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-text-muted" />
              <div>
                <p className="text-sm text-text-primary">Change Password</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {resetState === "sent"
                    ? `Reset link sent to ${profile?.email}`
                    : resetState === "error"
                    ? "Failed to send link. Try again."
                    : "A reset link will be sent to your registered email"}
                </p>
              </div>
            </div>
            <button
              onClick={handleSendResetLink}
              disabled={resetState === "sending" || resetState === "sent" || !profile}
              className="px-3.5 py-2 rounded-lg border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-gold/50 hover:bg-bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetState === "sending" ? "Sending…" : resetState === "sent" ? "Sent!" : "Send Link"}
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-bg-secondary border border-error/20 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-error mb-4">Danger Zone</h3>
          <p className="text-sm text-text-secondary mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-error text-sm font-medium rounded-lg border border-error/20 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>

      </div>
    </>
  );
}
