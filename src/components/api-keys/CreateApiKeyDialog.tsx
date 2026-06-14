"use client";

import { useState } from "react";
import { X, Copy, Check, Loader2, KeyRound } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface GeneratedKey {
  apiKey: string;
  message: string;
}

interface CreateApiKeyDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateApiKeyDialog({ open, onClose, onCreated }: CreateApiKeyDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<GeneratedKey | null>(null);
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<GeneratedKey>("/keys/generate", { method: "POST" });
      setGenerated(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate key");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!generated) return;
    navigator.clipboard.writeText(generated.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClose() {
    if (generated) onCreated();
    setGenerated(null);
    setError(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-bg-secondary border border-border rounded-xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Create API Key</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!generated ? (
          <div className="space-y-5">
            <div className="flex items-start gap-3 p-4 bg-bg-tertiary rounded-lg border border-border">
              <KeyRound className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <p className="text-sm text-text-secondary leading-relaxed">
                A new API key will be generated. Make sure to copy it immediately — it
                will only be shown once.
              </p>
            </div>

            {error && (
              <p className="text-sm text-error bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gold hover:bg-gold-hover disabled:opacity-60 disabled:cursor-not-allowed text-[#071B1C] text-sm font-medium rounded-lg transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                "Generate API Key"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="p-4 bg-green-muted border border-green-500/20 rounded-lg space-y-1">
              <p className="text-xs font-semibold text-green">Key generated successfully</p>
              <p className="text-xs text-text-secondary">{generated.message}</p>
            </div>

            <div>
              <p className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Your API Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2.5 bg-bg-primary border border-border rounded-lg text-xs font-mono text-text-primary break-all">
                  {generated.apiKey}
                </code>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-2.5 rounded-lg border border-border bg-bg-tertiary hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors"
                  title="Copy key"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 border border-border text-text-primary text-sm font-medium rounded-lg hover:bg-bg-tertiary transition-colors"
            >
              I&apos;ve copied my key — Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
