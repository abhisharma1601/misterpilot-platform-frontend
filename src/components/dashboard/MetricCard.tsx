import { clsx } from "clsx";

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export default function MetricCard({ label, value, icon, trend, trendUp }: MetricCardProps) {
  return (
    <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-gold/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-text-secondary">{label}</span>
        <div className="w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center text-gold">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight text-text-primary">{value}</div>
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className={clsx(
              "text-xs font-medium",
              trendUp ? "text-green" : "text-error"
            )}
          >
            {trend}
          </span>
          <span className="text-xs text-text-muted">vs last month</span>
        </div>
      )}
    </div>
  );
}
