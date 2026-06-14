"use client";

import { useEffect, useState } from "react";
import TopNav from "@/components/layout/TopNav";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { clsx } from "clsx";
import AddFundsButton from "@/components/wallet/AddFundsButton";
import { apiFetch } from "@/lib/api";

interface WalletSummary {
  currentBalance: number;
  totalRecharged: number;
  totalConsumed: number;
  recentRecharges: {
    transactionId: number;
    amount: number;
    status: string;
    createdAt: string;
  }[];
}

export default function WalletPage() {
  const [summary, setSummary] = useState<WalletSummary | null>(null);

  function loadSummary() {
    apiFetch<WalletSummary>("/stats/wallet-summary")
      .then(setSummary)
      .catch(() => null);
  }

  useEffect(() => {
    loadSummary();
  }, []);

  const fmt = (n: number) =>
    n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

  return (
    <>
      <TopNav title="Wallet" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center">
                <Wallet className="w-4 h-4 text-gold" />
              </div>
              <span className="text-sm text-text-secondary">Current Balance</span>
            </div>
            <div className="text-3xl font-bold tracking-tight">
              ₹{fmt(summary?.currentBalance ?? 0)}
            </div>
          </div>

          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-green-muted flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green" />
              </div>
              <span className="text-sm text-text-secondary">Total Recharged</span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-green">
              ₹{fmt(summary?.totalRecharged ?? 0)}
            </div>
          </div>

          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-error" />
              </div>
              <span className="text-sm text-text-secondary">Total Consumed</span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-error">
              ₹{fmt(summary?.totalConsumed ?? 0)}
            </div>
          </div>
        </div>

        <AddFundsButton onSuccess={loadSummary} />

        <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-medium text-text-primary">Recent Recharges</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Transaction ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {(summary?.recentRecharges ?? []).length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-text-muted">
                      No recharges yet
                    </td>
                  </tr>
                ) : (
                  (summary?.recentRecharges ?? []).map((tx) => (
                    <tr key={tx.transactionId} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-text-secondary">
                        {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}{" "}
                        <span className="text-text-muted">
                          {new Date(tx.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-text-primary font-mono">
                        #{tx.transactionId}
                      </td>
                      <td className="px-6 py-3 text-sm font-mono font-medium text-green">
                        +₹{fmt(tx.amount)}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span className={clsx(
                          "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                          tx.status === "SUCCESS" ? "bg-green-muted text-green"
                            : tx.status === "PENDING" ? "bg-yellow-500/10 text-warning"
                            : "bg-red-500/10 text-error"
                        )}>
                          {tx.status.toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
