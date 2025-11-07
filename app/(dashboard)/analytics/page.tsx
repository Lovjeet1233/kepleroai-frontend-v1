"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  calculateMetrics,
  getChartData,
  mockChannelData,
  mockTopicData,
} from "@/data/mockAnalytics";
import { MetricsGrid } from "@/components/analytics/MetricsGrid";
import { ChannelChart } from "@/components/analytics/ChannelChart";
import { TopicsChart } from "@/components/analytics/TopicsChart";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(7);

  const metrics = calculateMetrics(dateRange);
  const chartData = getChartData(dateRange);

  const dateRangeLabels = {
    7: "Last 7 days",
    30: "Last 30 days",
    90: "Last 90 days",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        
        {/* Date range selector */}
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value) as 7 | 30 | 90)}
            className="appearance-none flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors cursor-pointer pl-10"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Metrics Grid */}
        <MetricsGrid metrics={metrics} chartData={chartData} />

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          <ChannelChart data={mockChannelData} />
          <TopicsChart data={mockTopicData} />
        </div>
      </div>
    </div>
  );
}
