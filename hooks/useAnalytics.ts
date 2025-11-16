import { useState, useEffect, useCallback } from 'react';
import { analyticsService, AnalyticsFilters, DashboardMetrics, TrendsData, PerformanceMetrics } from '@/services/analytics.service';

export function useAnalytics(days: number = 7) {
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics | null>(null);
  const [trends, setTrends] = useState<TrendsData | null>(null);
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate date range based on days
  const getDateRange = useCallback((days: number) => {
    const dateTo = new Date();
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);
    
    return {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      groupBy: 'day' as const,
    };
  }, []);

  // Fetch all analytics data
  const fetchAnalytics = useCallback(async (days: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const filters: AnalyticsFilters = getDateRange(days);

      // Fetch all data in parallel
      const [dashboardData, trendsData, performanceData] = await Promise.all([
        analyticsService.getDashboardMetrics(filters),
        analyticsService.getConversationTrends(filters),
        analyticsService.getPerformanceMetrics(filters),
      ]);

      setDashboardMetrics(dashboardData);
      setTrends(trendsData);
      setPerformance(performanceData);
    } catch (err: any) {
      console.error('Error fetching analytics:', err);
      setError(err.message || 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  }, [getDateRange]);

  // Fetch on mount and when days change
  useEffect(() => {
    fetchAnalytics(days);
  }, [days, fetchAnalytics]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchAnalytics(days);
  }, [days, fetchAnalytics]);

  return {
    dashboardMetrics,
    trends,
    performance,
    isLoading,
    error,
    refresh,
  };
}
