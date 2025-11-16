import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { phoneSettingsService, PhoneSettings, UpdatePhoneSettingsData } from '@/services/phoneSettings.service';
import { toast } from 'sonner';

export function usePhoneSettings() {
  const queryClient = useQueryClient();

  // Get phone settings
  const { data: settings, isLoading, error } = useQuery<PhoneSettings>({
    queryKey: ['phoneSettings'],
    queryFn: () => phoneSettingsService.getSettings(),
  });

  // Update phone settings
  const updateMutation = useMutation({
    mutationFn: (data: UpdatePhoneSettingsData) => phoneSettingsService.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phoneSettings'] });
      toast.success('Phone settings updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || 'Failed to update phone settings');
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}

