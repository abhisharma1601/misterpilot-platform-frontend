"use client";

import { useEffect, useState } from "react";
import TopNav from "@/components/layout/TopNav";
import MetricCard from "@/components/dashboard/MetricCard";
import UsageChart from "@/components/dashboard/UsageChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Wallet, ArrowUpRight, Zap, IndianRupee } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface StatsResponse {
  walletBalanceInr: number;
  totalApiRequests: number;
  totalTokensConsumed: number;
  totalCostUsd: number;
  totalCostInr: number;
  apiRequestsDateWise: { date: string; count: number }[];
  costDateWise: { date: string; costInr: number }[];
  last10Usages: {
    id: number;
    model: string;
    outputTokens: number;
    cacheHitTokens: number;
    cacheMissTokens: number;
    costUsd: number;
    costInr: number;
    createdAt: string;
  }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    apiFetch<StatsResponse>("/stats")
      .then(setStats)
      .catch(() => null);
  }, []);

  const chartData = (stats?.apiRequestsDateWise ?? []).map((r) => {
    const costEntry = stats?.costDateWise.find((c) => c.date === r.date);
    return { date: r.date, requests: r.count, cost: costEntry?.costInr ?? 0 };
  });

  return (
    <>
      <TopNav title="Dashboard" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Wallet Balance"
            value={`₹${(stats?.walletBalanceInr ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
            icon={<Wallet className="w-4 h-4" />}
          />
          <MetricCard
            label="API Requests"
            value={(stats?.totalApiRequests ?? 0).toLocaleString()}
            icon={<ArrowUpRight className="w-4 h-4" />}
          />
          <MetricCard
            label="Tokens Consumed"
            value={`${((stats?.totalTokensConsumed ?? 0) / 1_000_000).toFixed(1)}M`}
            icon={<Zap className="w-4 h-4" />}
          />
          <MetricCard
            label="Amount Spent"
            value={`₹${(stats?.totalCostInr ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
            icon={<IndianRupee className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UsageChart data={chartData} metric="requests" />
          <UsageChart data={chartData} metric="cost" />
        </div>

        <RecentActivity usages={stats?.last10Usages ?? []} />
      </div>
    </>
  );
}
