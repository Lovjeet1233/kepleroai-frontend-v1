import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { promptService, UpdatePromptData, RevertPromptData } from '@/services/prompt.service';
import { toast } from 'sonner';

/**
 * Get current prompt for type (chatbot or voice)
 */
export function usePrompt(type: 'chatbot' | 'voice') {
  return useQuery({
    queryKey: ['prompt', type],
    queryFn: () => promptService.getCurrentPrompt(type),
  });
}

/**
 * Update prompt mutation
 */
export function useUpdatePrompt(type: 'chatbot' | 'voice') {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePromptData) => promptService.updatePrompt(type, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompt', type] });
      toast.success('Prompt updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update prompt');
    },
  });
}

/**
 * Revert prompt mutation
 */
export function useRevertPrompt(type: 'chatbot' | 'voice') {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RevertPromptData) => promptService.revertPrompt(type, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompt', type] });
      toast.success('Prompt reverted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to revert prompt');
    },
  });
}

