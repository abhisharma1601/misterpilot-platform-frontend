interface Usage {
  id: number;
  model: string;
  outputTokens: number;
  cacheHitTokens: number;
  cacheMissTokens: number;
  costUsd: number;
  costInr: number;
  createdAt: string;
}

interface RecentActivityProps {
  usages: Usage[];
}

export default function RecentActivity({ usages }: RecentActivityProps) {
  return (
    <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-medium text-text-primary">Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Model</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Output Tokens</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Cache Hit</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Cache Miss</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Cost (INR)</th>
            </tr>
          </thead>
          <tbody>
            {usages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-text-muted">
                  No recent activity
                </td>
              </tr>
            ) : (
              usages.map((u) => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-text-secondary">{u.createdAt}</td>
                  <td className="px-6 py-3 text-sm text-text-primary font-medium">{u.model}</td>
                  <td className="px-6 py-3 text-sm text-text-secondary font-mono text-right">
                    {u.outputTokens.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm font-mono text-right text-green">
                    {u.cacheHitTokens.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm font-mono text-right text-warning">
                    {u.cacheMissTokens.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm font-mono text-right text-text-primary">
                    ₹{u.costInr.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
