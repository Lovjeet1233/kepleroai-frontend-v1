import { apiClient } from '@/lib/api';

export interface CampaignFilters {
  status?: string;
  channel?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface CreateCampaignData {
  name: string;
  channel: 'whatsapp' | 'sms' | 'email';
  templateId?: string;
  message?: string;
  contactListIds: string[];
  scheduledAt?: string;
  sendImmediately?: boolean;
  followUpEnabled?: boolean;
  followUpConfig?: any;
}

/**
 * Campaign Service
 * Handles all campaign-related API calls
 */
class CampaignService {
  /**
   * Get all campaigns with optional filters
   */
  async getAll(filters?: CampaignFilters) {
    try {
      const response = await apiClient.get('/campaigns', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch campaigns');
    }
  }

  /**
   * Get campaign by ID
   */
  async getById(id: string) {
    try {
      const response = await apiClient.get(`/campaigns/${id}`);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch campaign');
    }
  }

  /**
   * Create new campaign
   */
  async create(data: CreateCampaignData) {
    try {
      const response = await apiClient.post('/campaigns', data);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create campaign');
    }
  }

  /**
   * Update campaign
   */
  async update(id: string, data: Partial<CreateCampaignData>) {
    try {
      const response = await apiClient.patch(`/campaigns/${id}`, data);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update campaign');
    }
  }

  /**
   * Delete campaign
   */
  async delete(id: string) {
    try {
      const response = await apiClient.delete(`/campaigns/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete campaign');
    }
  }

  /**
   * Schedule campaign
   */
  async schedule(id: string, scheduledAt: string) {
    try {
      const response = await apiClient.post(`/campaigns/${id}/schedule`, {
        scheduledAt,
      });
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to schedule campaign');
    }
  }

  /**
   * Cancel scheduled campaign
   */
  async cancel(id: string) {
    try {
      const response = await apiClient.post(`/campaigns/${id}/cancel`);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to cancel campaign');
    }
  }

  /**
   * Start campaign immediately
   */
  async start(id: string) {
    try {
      const response = await apiClient.post(`/campaigns/${id}/start`);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to start campaign');
    }
  }

  /**
   * Pause running campaign
   */
  async pause(id: string) {
    try {
      const response = await apiClient.post(`/campaigns/${id}/pause`);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to pause campaign');
    }
  }

  /**
   * Resume paused campaign
   */
  async resume(id: string) {
    try {
      const response = await apiClient.post(`/campaigns/${id}/resume`);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to resume campaign');
    }
  }

  /**
   * Get campaign analytics
   */
  async getAnalytics(id: string) {
    try {
      const response = await apiClient.get(`/campaigns/${id}/analytics`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch campaign analytics');
    }
  }

  /**
   * Get WhatsApp templates
   */
  async getWhatsAppTemplates() {
    try {
      const response = await apiClient.get('/campaigns/whatsapp/templates');
      return response.data.templates;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch WhatsApp templates');
    }
  }

  /**
   * Get campaign recipients
   */
  async getRecipients(id: string, page = 1, limit = 50) {
    try {
      const response = await apiClient.get(`/campaigns/${id}/recipients`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch recipients');
    }
  }

  /**
   * Preview campaign
   */
  async preview(data: CreateCampaignData) {
    try {
      const response = await apiClient.post('/campaigns/preview', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to preview campaign');
    }
  }

  /**
   * Duplicate campaign
   */
  async duplicate(id: string) {
    try {
      const response = await apiClient.post(`/campaigns/${id}/duplicate`);
      return response.data.campaign;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to duplicate campaign');
    }
  }
}

// Export singleton instance
export const campaignService = new CampaignService();

