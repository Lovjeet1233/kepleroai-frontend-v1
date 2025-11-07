import { apiClient } from '@/lib/api';

export interface AnalyticsFilters {
  startDate?: string;
  endDate?: string;
  channel?: string;
  operatorId?: string;
  granularity?: 'hour' | 'day' | 'week' | 'month';
}

/**
 * Analytics Service
 * Handles all analytics and reporting API calls
 */
class AnalyticsService {
  /**
   * Get dashboard overview metrics
   */
  async getDashboardMetrics(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/dashboard', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch dashboard metrics');
    }
  }

  /**
   * Get conversation trends over time
   */
  async getConversationTrends(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/conversations/trends', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch conversation trends');
    }
  }

  /**
   * Get message statistics
   */
  async getMessageStats(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/messages/stats', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch message stats');
    }
  }

  /**
   * Get response time metrics
   */
  async getResponseTimeMetrics(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/response-time', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch response time metrics');
    }
  }

  /**
   * Get operator performance metrics
   */
  async getOperatorPerformance(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/operators/performance', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch operator performance');
    }
  }

  /**
   * Get channel distribution
   */
  async getChannelDistribution(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/channels/distribution', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch channel distribution');
    }
  }

  /**
   * Get customer satisfaction metrics
   */
  async getSatisfactionMetrics(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/satisfaction', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch satisfaction metrics');
    }
  }

  /**
   * Get AI performance metrics
   */
  async getAIPerformance(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/ai/performance', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch AI performance');
    }
  }

  /**
   * Get conversation topics
   */
  async getTopics(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/topics', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch topics');
    }
  }

  /**
   * Get peak hours analysis
   */
  async getPeakHours(filters?: AnalyticsFilters) {
    try {
      const response = await apiClient.get('/analytics/peak-hours', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch peak hours');
    }
  }

  /**
   * Export analytics data
   */
  async exportData(filters?: AnalyticsFilters, format: 'csv' | 'xlsx' | 'pdf' = 'csv') {
    try {
      const response = await apiClient.get('/analytics/export', {
        params: { ...filters, format },
        responseType: 'blob',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to export data');
    }
  }

  /**
   * Get real-time statistics
   */
  async getRealTimeStats() {
    try {
      const response = await apiClient.get('/analytics/realtime');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch real-time stats');
    }
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

