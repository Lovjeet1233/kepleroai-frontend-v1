import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

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
  createdAt?: string;
  updatedAt?: string;
}

class ToolService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token interceptor
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getAll(): Promise<Tool[]> {
    const response = await this.api.get('/tools');
    return response.data.data || [];
  }

  async getById(toolId: string): Promise<Tool> {
    const response = await this.api.get(`/tools/${toolId}`);
    return response.data.data;
  }

  async register(data: {
    tool_name: string;
    tool_type: string;
    description: string;
    properties: ToolProperty[];
  }): Promise<Tool> {
    const response = await this.api.post('/tools/register', data);
    return response.data.data;
  }

  async update(toolId: string, data: {
    tool_name: string;
    tool_type: string;
    description: string;
    properties: ToolProperty[];
  }): Promise<Tool> {
    const response = await this.api.put(`/tools/${toolId}`, data);
    return response.data.data;
  }

  async delete(toolId: string): Promise<void> {
    await this.api.delete(`/tools/${toolId}`);
  }

  async execute(toolId: string, parameters: Record<string, any>): Promise<any> {
    const response = await this.api.post(`/tools/${toolId}/execute`, { parameters });
    return response.data.data;
  }
}

export const toolService = new ToolService();

