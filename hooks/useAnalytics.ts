import { useQuery } from '@tanstack/react-query';
import { analyticsService, AnalyticsFilters } from '@/services/analytics.service';

/**
 * Fetch dashboard metrics
 */
export function useDashboardMetrics(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'dashboard', filters],
    queryFn: () => analyticsService.getDashboardMetrics(filters),
    refetchInterval: 60000, // Refetch every minute
  });
}

/**
 * Fetch conversation trends
 */
export function useConversationTrends(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'conversation-trends', filters],
    queryFn: () => analyticsService.getConversationTrends(filters),
  });
}

/**
 * Fetch message statistics
 */
export function useMessageStats(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'message-stats', filters],
    queryFn: () => analyticsService.getMessageStats(filters),
  });
}

/**
 * Fetch response time metrics
 */
export function useResponseTimeMetrics(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'response-time', filters],
    queryFn: () => analyticsService.getResponseTimeMetrics(filters),
  });
}

/**
 * Fetch operator performance
 */
export function useOperatorPerformance(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'operator-performance', filters],
    queryFn: () => analyticsService.getOperatorPerformance(filters),
  });
}

/**
 * Fetch channel distribution
 */
export function useChannelDistribution(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'channel-distribution', filters],
    queryFn: () => analyticsService.getChannelDistribution(filters),
  });
}

/**
 * Fetch AI performance metrics
 */
export function useAIPerformance(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'ai-performance', filters],
    queryFn: () => analyticsService.getAIPerformance(filters),
  });
}

/**
 * Fetch conversation topics
 */
export function useTopics(filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: ['analytics', 'topics', filters],
    queryFn: () => analyticsService.getTopics(filters),
  });
}

/**
 * Fetch real-time statistics
 */
export function useRealTimeStats() {
  return useQuery({
    queryKey: ['analytics', 'realtime'],
    queryFn: () => analyticsService.getRealTimeStats(),
    refetchInterval: 5000, // Refetch every 5 seconds
  });
}

