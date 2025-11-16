import { apiClient } from '@/lib/api';

export interface PhoneSettings {
  _id: string;
  userId: string;
  selectedVoice: string;
  twilioPhoneNumber: string;
  livekitSipTrunkId: string;
  humanOperatorPhone: string;
  isConfigured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePhoneSettingsData {
  selectedVoice?: string;
  twilioPhoneNumber?: string;
  livekitSipTrunkId?: string;
  humanOperatorPhone?: string;
}

export const phoneSettingsService = {
  /**
   * Get phone settings
   */
  async getSettings(): Promise<PhoneSettings> {
    const response = await apiClient.get('/phone-settings');
    return response.data;
  },

  /**
   * Update phone settings
   */
  async updateSettings(data: UpdatePhoneSettingsData): Promise<PhoneSettings> {
    const response = await apiClient.put('/phone-settings', data);
    return response.data;
  },
};

// Available voice options for the dropdown with their ElevenLabs voice IDs
export const VOICE_OPTIONS = [
  { value: 'adam', label: 'Adam - Male voice', voiceId: 'pNInz6obpgDQGcFmaJgB' },
  { value: 'alice', label: 'Alice - Female voice', voiceId: 'Xb7hH8MSUJpSbSDYk0k2' },
  { value: 'antoni', label: 'Antoni - Male voice', voiceId: 'ErXwobaYiN019PkySvjV' },
  { value: 'arnold', label: 'Arnold - Male voice', voiceId: 'VR6AewLTigWG4xSOukaG' },
  { value: 'bill', label: 'Bill - Male voice', voiceId: 'pqHfZKP75CvOlQylNhV4' },
  { value: 'bella', label: 'Bella - Female voice', voiceId: 'EXAVITQu4vr4xnSDxMaL' },
  { value: 'elli', label: 'Elli - Female voice', voiceId: 'MF3mGyEYCl7XYWbV9V6O' },
  { value: 'josh', label: 'Josh - Male voice', voiceId: 'TxGEqnHWrfWFTfGW9XjX' },
  { value: 'liam', label: 'Liam - Male voice', voiceId: 'TX3LPaxmHKxFdv7VOQHJ' },
  { value: 'domi', label: 'Domi - Male voice', voiceId: 'AZnzlk1XvdvUeBnXmlld' },
];

// Helper function to get voice ID from voice value
export const getVoiceIdFromValue = (voiceValue: string): string => {
  const voice = VOICE_OPTIONS.find(v => v.value === voiceValue);
  return voice?.voiceId || 'pNInz6obpgDQGcFmaJgB'; // Default to Adam
};

