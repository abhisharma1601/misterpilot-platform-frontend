"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UsageChartProps {
  data: { date: string; requests: number; cost: number }[];
  metric: "requests" | "cost";
}

export default function UsageChart({ data, metric }: UsageChartProps) {
  const formattedData = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
  }));

  return (
    <div className="bg-bg-secondary border border-border rounded-xl p-6">
      <h3 className="text-sm font-medium text-text-secondary mb-4">
        {metric === "requests" ? "Daily Requests" : "Daily Cost"}
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A3A3B" />
          <XAxis
            dataKey="date"
            stroke="#5A6B6C"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#5A6B6C"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#122D2E",
              border: "1px solid #1A3A3B",
              borderRadius: "8px",
              color: "#F0F2F1",
              fontSize: "13px",
            }}
          />
          <Line
            type="monotone"
            dataKey={metric}
            stroke="#FED008"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#FED008" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
