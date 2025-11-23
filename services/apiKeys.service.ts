import { apiClient } from '@/lib/api';

export interface ApiKeys {
  _id: string;
  userId: string;
  llmProvider: 'openai' | 'gemini';
  apiKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateApiKeysData {
  llmProvider?: 'openai' | 'gemini';
  apiKey?: string;
}

export const apiKeysService = {
  /**
   * Get API keys
   */
  async getApiKeys(): Promise<ApiKeys> {
    const response = await apiClient.get('/api-keys');
    return response.data;
  },

  /**
   * Update API keys
   */
  async updateApiKeys(data: UpdateApiKeysData): Promise<ApiKeys> {
    const response = await apiClient.put('/api-keys', data);
    return response.data;
  },

  /**
   * Delete API keys
   */
  async deleteApiKeys(): Promise<{ message: string }> {
    const response = await apiClient.delete('/api-keys');
    return response.data;
  },
};

