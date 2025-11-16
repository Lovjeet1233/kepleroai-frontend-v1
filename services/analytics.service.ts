import { apiClient } from '@/lib/api';

export interface AnalyticsFilters {
  dateFrom?: string;
  dateTo?: string;
  channel?: string;
  operatorId?: string;
  groupBy?: 'hour' | 'day' | 'week' | 'month';
}

export interface DashboardMetrics {
  totalConversations: number;
  activeConversations: number;
  closedConversations: number;
  aiManaged: number;
  humanManaged: number;
  avgResponseTime: number;
  customerSatisfactionScore: number | null;
  messagesToday: number;
  conversationsByChannel: Record<string, number>;
  conversationsByStatus: Record<string, number>;
}

export interface TrendsData {
  newConversations: Array<{ period: string; count: number }>;
  messagesSent: Array<{ period: string; count: number }>;
  responseTimes: Array<{ period: string; avgResponseTime: number }>;
  resolutionRates: Array<{ period: string; resolutionRate: number }>;
}

export interface PerformanceMetrics {
  avgFirstResponseTime: number;
  avgResolutionTime: number;
  conversationsPerOperator: Array<{
    operatorId: string;
    operatorName: string;
    totalHandled: number;
    resolved: number;
    resolutionRate: number;
  }>;
  aiVsHuman: {
    ai: { total: number; resolved: number; resolutionRate: number };
    human: { total: number; resolved: number; resolutionRate: number };
  };
  busiestHours: Array<{ hour: string; count: number }>;
  busiestDays: Array<{ day: string; count: number }>;
}

/**
 * Analytics Service
 * Handles all analytics and reporting API calls
 */
class AnalyticsService {
  /**
   * Get dashboard overview metrics
   */
  async getDashboardMetrics(filters?: AnalyticsFilters): Promise<DashboardMetrics> {
    try {
      const response: any = await apiClient.get('/analytics/dashboard', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching dashboard metrics:', error);
      throw new Error(error.message || 'Failed to fetch dashboard metrics');
    }
  }

  /**
   * Get conversation trends over time
   */
  async getConversationTrends(filters?: AnalyticsFilters): Promise<TrendsData> {
    try {
      const response: any = await apiClient.get('/analytics/trends', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching conversation trends:', error);
      throw new Error(error.message || 'Failed to fetch conversation trends');
    }
  }

  /**
   * Get performance metrics (response times, operator stats, AI vs Human)
   */
  async getPerformanceMetrics(filters?: AnalyticsFilters): Promise<PerformanceMetrics> {
    try {
      const response: any = await apiClient.get('/analytics/performance', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching performance metrics:', error);
      throw new Error(error.message || 'Failed to fetch performance metrics');
    }
  }

  /**
   * Get conversation topics
   */
  async getTopics(filters?: AnalyticsFilters) {
    try {
      const response: any = await apiClient.get('/analytics/topics', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching topics:', error);
      throw new Error(error.message || 'Failed to fetch topics');
    }
  }

  /**
   * Export analytics data
   */
  async exportData(filters?: AnalyticsFilters, format: 'csv' | 'json' = 'csv') {
    try {
      const response = await apiClient.get('/analytics/export', {
        params: { ...filters, format },
      });
      return response;
    } catch (error: any) {
      console.error('Error exporting data:', error);
      throw new Error(error.message || 'Failed to export data');
    }
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

