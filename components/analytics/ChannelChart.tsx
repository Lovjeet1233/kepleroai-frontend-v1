"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChannelData } from "@/data/mockAnalytics";

interface ChannelChartProps {
  data: ChannelData[];
}

export function ChannelChart({ data }: ChannelChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const chartData = data.map(item => ({
    name: item.channel,
    value: item.count,
    color: item.color,
  }));

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-[400px]">
      <h3 className="text-base font-semibold text-white mb-6">
        Conversations by Channel
      </h3>

      <div className="flex items-center gap-8">
        {/* Donut chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-2xl font-bold"
              >
                {total.toLocaleString()}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((item) => {
            const percentage = Math.round((item.count / total) * 100);
            return (
              <div key={item.channel} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="text-sm text-foreground">{item.channel}</div>
                  <div className="text-xs text-muted-foreground">{percentage}%</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.count.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

