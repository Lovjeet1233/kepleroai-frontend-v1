import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from '@/lib/toast';

interface AIBehavior {
  _id: string;
  userId: string;
  knowledgeBaseId?: string;
  chatAgent: {
    improvements: string;
    systemPrompt: string;
    humanOperator: {
      escalationRules: string[];
      availability: {
        alwaysAvailable: boolean;
        schedule: Record<string, { enabled: boolean; from: string; to: string }>;
      };
    };
  };
  voiceAgent: {
    improvements: string;
    systemPrompt: string;
    humanOperator: {
      phoneNumber: string;
      escalationRules: string[];
      availability: {
        alwaysAvailable: boolean;
        schedule: Record<string, { enabled: boolean; from: string; to: string }>;
      };
    };
  };
}

export function useAIBehavior() {
  const queryClient = useQueryClient();

  // Get AI behavior
  const { data: aiBehavior, isLoading } = useQuery({
    queryKey: ['ai-behavior'],
    queryFn: async () => {
      const response = await apiClient.get<{ data: AIBehavior }>('/ai-behavior');
      return (response as { data: AIBehavior }).data;
    },
  });

  // Update chat agent prompt
  const updateChatAgentPrompt = useMutation({
    mutationFn: async (systemPrompt: string) => {
      const response = await apiClient.patch('/ai-behavior/chat-agent/prompt', { systemPrompt });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-behavior'] });
      toast.success('Chat agent prompt saved successfully');
    },
    onError: () => {
      toast.error('Failed to save chat agent prompt');
    },
  });

  // Update chat agent improvements
  const updateChatAgentImprovements = useMutation({
    mutationFn: async (improvements: string) => {
      const response = await apiClient.patch('/ai-behavior/chat-agent/improvements', { improvements });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-behavior'] });
      toast.success('Chat agent improvements saved');
    },
    onError: () => {
      toast.error('Failed to save improvements');
    },
  });

  // Update chat agent human operator
  const updateChatAgentHumanOperator = useMutation({
    mutationFn: async (config: {
      escalationRules?: string[];
      availability?: {
        alwaysAvailable: boolean;
        schedule: Record<string, { enabled: boolean; from: string; to: string }>;
      };
    }) => {
      const response = await apiClient.patch('/ai-behavior/chat-agent/human-operator', config);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-behavior'] });
      toast.success('Human operator settings saved');
    },
    onError: () => {
      toast.error('Failed to save human operator settings');
    },
  });

  // Update voice agent prompt
  const updateVoiceAgentPrompt = useMutation({
    mutationFn: async (systemPrompt: string) => {
      const response = await apiClient.patch('/ai-behavior/voice-agent/prompt', { systemPrompt });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-behavior'] });
      toast.success('Voice agent prompt saved successfully');
    },
    onError: () => {
      toast.error('Failed to save voice agent prompt');
    },
  });

  // Update voice agent human operator
  const updateVoiceAgentHumanOperator = useMutation({
    mutationFn: async (config: {
      phoneNumber?: string;
      escalationRules?: string[];
      availability?: {
        alwaysAvailable: boolean;
        schedule: Record<string, { enabled: boolean; from: string; to: string }>;
      };
    }) => {
      const response = await apiClient.patch('/ai-behavior/voice-agent/human-operator', config);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-behavior'] });
      toast.success('Voice human operator settings saved');
    },
    onError: () => {
      toast.error('Failed to save voice human operator settings');
    },
  });

  // Link knowledge base
  const linkKnowledgeBase = useMutation({
    mutationFn: async (knowledgeBaseId: string) => {
      const response = await apiClient.patch('/ai-behavior/knowledge-base', { knowledgeBaseId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-behavior'] });
      toast.success('Knowledge base linked successfully');
    },
    onError: () => {
      toast.error('Failed to link knowledge base');
    },
  });

  return {
    aiBehavior,
    isLoading,
    updateChatAgentPrompt,
    updateChatAgentImprovements,
    updateChatAgentHumanOperator,
    updateVoiceAgentPrompt,
    updateVoiceAgentHumanOperator,
    linkKnowledgeBase,
  };
}

