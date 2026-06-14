"use client";

import { useState, useEffect } from "react";
import TopNav from "@/components/layout/TopNav";
import CreateApiKeyDialog from "@/components/api-keys/CreateApiKeyDialog";
import { Plus, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface ApiKey {
  id: number;
  keyPlaceholder: string;
  active: boolean;
  createdAt: string;
  lastUsedAt: string | null;
}


export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function loadKeys() {
    setLoading(true);
    setError(null);
    apiFetch<ApiKey[]>("/keys/active")
      .then(setKeys)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  const [togglingId, setTogglingId] = useState<number | null>(null);

  async function handleToggle(id: number, currentlyActive: boolean) {
    if (!currentlyActive) return; // no enable endpoint yet
    setTogglingId(id);
    // optimistic update
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, active: false } : k)));
    try {
      await apiFetch("/keys/disable", {
        method: "POST",
        body: JSON.stringify({ apiKeyId: id }),
      });
    } catch {
      // revert on failure
      setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, active: true } : k)));
    } finally {
      setTogglingId(null);
    }
  }

  useEffect(() => {
    loadKeys();
  }, []);

  return (
    <>
      <TopNav title="API Keys" />
      <div className="p-8 space-y-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Manage API keys used to access MisterPilot APIs.
          </p>
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-hover text-[#071B1C] text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create API Key
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-text-muted">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Loading keys…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-error">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && keys.length === 0 && (
          <div className="bg-bg-secondary border border-border rounded-xl p-12 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-2">No API Keys Yet</h3>
            <p className="text-sm text-text-secondary mb-6">
              Create your first API key to start making requests.
            </p>
            <button
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-hover text-[#071B1C] text-sm font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create API Key
            </button>
          </div>
        )}

        {/* Keys Table */}
        {!loading && !error && keys.length > 0 && (
          <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Sr No.</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">API Key</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Created</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Last Used</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((key, idx) => (
                    <tr key={key.id} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-text-muted">{idx + 1}</td>
                      <td className="px-6 py-3 text-sm font-mono text-text-secondary">{key.keyPlaceholder}</td>
                      <td className="px-6 py-3 text-sm text-text-secondary">{key.createdAt}</td>
                      <td className="px-6 py-3 text-sm text-text-secondary">{key.lastUsedAt ?? "Never"}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          key.active
                            ? "bg-green-muted text-green"
                            : "bg-red-500/10 text-error"
                        }`}>
                          {key.active ? "active" : "revoked"}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggle(key.id, key.active)}
                            disabled={togglingId === key.id || !key.active}
                            className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                              key.active ? "bg-green cursor-pointer" : "bg-border cursor-not-allowed"
                            }`}
                            title={key.active ? "Disable key" : "Disabled"}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
                                key.active ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <CreateApiKeyDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreated={() => { setDialogOpen(false); loadKeys(); }}
        />
      </div>
    </>
  );
}
