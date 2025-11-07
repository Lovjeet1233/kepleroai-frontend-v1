import { apiClient } from '@/lib/api';

export interface Prompt {
  id: string;
  type: 'chatbot' | 'voice';
  userInstructions: string;
  systemPrompt: string;
  version: number;
  createdAt: string;
  previousVersions?: Prompt[];
}

export interface UpdatePromptData {
  userInstructions: string;
}

export interface RevertPromptData {
  version: number;
}

/**
 * Prompt Service
 * Handles chatbot and voice agent prompt management
 */
class PromptService {
  /**
   * Get current prompt for type (chatbot or voice)
   */
  async getCurrentPrompt(type: 'chatbot' | 'voice'): Promise<Prompt> {
    try {
      const response = await apiClient.get(`/training/prompts/${type}`);
      return response.data.prompt || response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch prompt');
    }
  }

  /**
   * Update prompt
   */
  async updatePrompt(type: 'chatbot' | 'voice', data: UpdatePromptData): Promise<Prompt> {
    try {
      const response = await apiClient.patch(`/training/prompts/${type}`, data);
      return response.data.prompt || response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update prompt');
    }
  }

  /**
   * Revert to previous version
   */
  async revertPrompt(type: 'chatbot' | 'voice', data: RevertPromptData): Promise<Prompt> {
    try {
      const response = await apiClient.post(`/training/prompts/${type}/revert`, data);
      return response.data.prompt || response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to revert prompt');
    }
  }
}

// Export singleton instance
export const promptService = new PromptService();

