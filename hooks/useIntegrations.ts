import { useState, useEffect, useCallback } from 'react';
import { toolService, Tool } from '@/services/tool.service';

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all integrations
  const fetchIntegrations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tools = await toolService.getAll();
      setIntegrations(tools);
    } catch (err: any) {
      console.error('Error fetching integrations:', err);
      setError(err.message || 'Failed to load integrations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new integration
  const createIntegration = useCallback(async (data: {
    tool_name: string;
    tool_type: string;
    description: string;
    properties: any[];
  }) => {
    try {
      setError(null);
      const response = await toolService.register(data);
      await fetchIntegrations();
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to create integration');
      throw err;
    }
  }, [fetchIntegrations]);

  // Update integration
  const updateIntegration = useCallback(async (toolId: string, data: {
    tool_name: string;
    tool_type: string;
    description: string;
    properties: any[];
  }) => {
    try {
      setError(null);
      const response = await toolService.update(toolId, data);
      await fetchIntegrations();
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to update integration');
      throw err;
    }
  }, [fetchIntegrations]);

  // Delete integration
  const deleteIntegration = useCallback(async (toolId: string) => {
    try {
      setError(null);
      await toolService.delete(toolId);
      await fetchIntegrations();
    } catch (err: any) {
      setError(err.message || 'Failed to delete integration');
      throw err;
    }
  }, [fetchIntegrations]);

  // Get integration by ID
  const getIntegration = useCallback((toolId: string) => {
    return integrations.find(tool => tool.tool_id === toolId);
  }, [integrations]);

  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  return {
    integrations,
    isLoading,
    error,
    fetchIntegrations,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    getIntegration,
  };
}

