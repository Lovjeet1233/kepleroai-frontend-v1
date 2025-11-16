import { apiClient } from '@/lib/api';

export interface ToolProperty {
  name: string;
  type: string;
  description: string;
  required: boolean;
  value: string;
}

export interface Tool {
  tool_id: string;
  tool_name: string;
  tool_type: string;
  description: string;
  properties: ToolProperty[];
  created_at?: string;
  updated_at?: string;
}

export interface RegisterToolRequest {
  tool_name: string;
  tool_type: string;
  description: string;
  properties: ToolProperty[];
}

export interface RegisterToolResponse {
  status: string;
  message: string;
  tool_id: string;
  tool: any;
}

export interface DeleteToolRequest {
  tool_id: string;
}

export interface DeleteToolResponse {
  status: string;
  message: string;
  tool_id: string;
}

/**
 * Integration Service
 * Handles tool/integration registration and management
 */
export class IntegrationService {
  /**
   * Get all registered tools/integrations
   */
  async getAll(): Promise<Tool[]> {
    try {
      const response: any = await apiClient.get('/tools');
      return response.tools || [];
    } catch (error: any) {
      console.error('Error fetching tools:', error);
      throw new Error(error.message || 'Failed to fetch integrations');
    }
  }

  /**
   * Get a specific tool by ID
   */
  async getById(toolId: string): Promise<Tool> {
    try {
      const response: any = await apiClient.get(`/tools/${toolId}`);
      return response.tool;
    } catch (error: any) {
      console.error('Error fetching tool:', error);
      throw new Error(error.message || 'Failed to fetch integration');
    }
  }

  /**
   * Register a new tool or update existing one
   */
  async register(data: RegisterToolRequest): Promise<RegisterToolResponse> {
    try {
      const response: any = await apiClient.post('/tools/register', data);
      return response;
    } catch (error: any) {
      console.error('Error registering tool:', error);
      throw new Error(error.message || 'Failed to register integration');
    }
  }

  /**
   * Update an existing tool
   */
  async update(toolId: string, data: RegisterToolRequest): Promise<RegisterToolResponse> {
    try {
      const response: any = await apiClient.put(`/tools/${toolId}`, data);
      return response;
    } catch (error: any) {
      console.error('Error updating tool:', error);
      throw new Error(error.message || 'Failed to update integration');
    }
  }

  /**
   * Delete a tool
   */
  async delete(toolId: string): Promise<DeleteToolResponse> {
    try {
      const response: any = await apiClient.post('/tools/delete', {
        tool_id: toolId
      });
      return response;
    } catch (error: any) {
      console.error('Error deleting tool:', error);
      throw new Error(error.message || 'Failed to delete integration');
    }
  }
}

export const integrationService = new IntegrationService();

