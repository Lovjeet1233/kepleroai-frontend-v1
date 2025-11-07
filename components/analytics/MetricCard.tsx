"use client";

import { HelpCircle, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  name: string;
  value: number;
  change: number;
  data: any[];
  isNegativeGood?: boolean;
}

export function MetricCard({ name, value, change, data, isNegativeGood = false }: MetricCardProps) {
  const isPositive = isNegativeGood ? change < 0 : change > 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-[200px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{name}</span>
        <HelpCircle className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[32px] font-bold text-foreground">
          {value.toLocaleString()}
        </span>
        <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      {/* Mini chart */}
      <div className="flex-1 mt-auto">
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={data}>
            <defs>
              <linearGradient id={`gradient-${name}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              fill={`url(#gradient-${name})`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

