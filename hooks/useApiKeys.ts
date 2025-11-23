import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiKeysService, UpdateApiKeysData } from '@/services/apiKeys.service';
import { toast } from 'sonner';

/**
 * Fetch API keys
 */
export function useApiKeys() {
  return useQuery({
    queryKey: ['apiKeys'],
    queryFn: () => apiKeysService.getApiKeys(),
  });
}

/**
 * Update API keys mutation
 */
export function useUpdateApiKeys() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateApiKeysData) => apiKeysService.updateApiKeys(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API keys updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update API keys');
    },
  });
}

/**
 * Delete API keys mutation
 */
export function useDeleteApiKeys() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiKeysService.deleteApiKeys(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API keys deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete API keys');
    },
  });
}

