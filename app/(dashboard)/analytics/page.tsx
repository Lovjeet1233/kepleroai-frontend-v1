"use client";

import { useState, useMemo } from "react";
import { Calendar, RefreshCw } from "lucide-react";
import { MetricsGrid } from "@/components/analytics/MetricsGrid";
import { ChannelChart } from "@/components/analytics/ChannelChart";
import { TopicsChart } from "@/components/analytics/TopicsChart";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(7);
  const { dashboardMetrics, trends, performance, isLoading, error, refresh } = useAnalytics(dateRange);

  // Transform backend data to match UI expectations
  const metrics = useMemo(() => {
    if (!dashboardMetrics || !trends) return null;

    // Calculate percentage change (using ratio of active to total for demo)
    const calculateChange = (current: number, total: number) => {
      if (total === 0) return 0;
      return Math.round((current / total) * 100) - 50; // Simplified change calculation
    };

    return {
      newConversations: {
        value: dashboardMetrics.totalConversations,
        change: calculateChange(dashboardMetrics.activeConversations, dashboardMetrics.totalConversations),
      },
      closedConversations: {
        value: dashboardMetrics.closedConversations,
        change: calculateChange(dashboardMetrics.closedConversations, dashboardMetrics.totalConversations),
      },
      reopenedConversations: {
        value: 0, // Not tracked in backend yet
        change: 0,
      },
      wrongAnswers: {
        value: 0, // Not tracked in backend yet
        change: 0,
      },
      linksClicked: {
        value: 0, // Not tracked in backend yet
        change: 0,
      },
      closedByOperators: {
        value: dashboardMetrics.humanManaged,
        change: calculateChange(dashboardMetrics.humanManaged, dashboardMetrics.totalConversations),
      },
    };
  }, [dashboardMetrics, trends]);

  // Transform trends data for charts
  const chartData = useMemo(() => {
    if (!trends) return [];

    return trends.newConversations.map((item, index) => ({
      date: item.period,
      newConversations: item.count,
      closedConversations: trends.resolutionRates[index]?.resolutionRate || 0,
      reopenedConversations: 0,
      wrongAnswers: 0,
      linksClicked: 0,
      closedByOperators: 0,
    }));
  }, [trends]);

  // Transform channel data
  const channelData = useMemo(() => {
    if (!dashboardMetrics) return [];

    const channelColors: Record<string, string> = {
      web: "#3b82f6",
      whatsapp: "#10b981",
      telegram: "#8b5cf6",
      api: "#f59e0b",
    };

    return Object.entries(dashboardMetrics.conversationsByChannel).map(([channel, count]) => ({
      channel: channel.charAt(0).toUpperCase() + channel.slice(1),
      count,
      color: channelColors[channel] || "#6b7280",
    }));
  }, [dashboardMetrics]);

  // For now, use empty topics array (would need to fetch from topics endpoint)
  const topicData: { topic: string; count: number }[] = [];

  const dateRangeLabels = {
    7: "Last 7 days",
    30: "Last 30 days",
    90: "Last 90 days",
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="h-16 px-6 flex items-center justify-between border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="h-16 px-6 flex items-center justify-between border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Load Analytics</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-6 py-2 bg-primary text-foreground rounded-lg font-medium hover:brightness-110 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        
        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
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
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {metrics && (
          <>
            {/* Metrics Grid */}
            <MetricsGrid metrics={metrics} chartData={chartData} />

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
              <ChannelChart data={channelData} />
              {topicData.length > 0 ? (
                <TopicsChart data={topicData} />
              ) : (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Top Topics</h2>
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <p>No topic data available yet</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
