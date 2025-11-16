import { apiClient } from '@/lib/api';

export interface BulkCommunicationContact {
  name: string;
  email?: string;
  phone?: string;
}

export interface BulkCommunicationRequest {
  contacts: BulkCommunicationContact[];
  communication_types: string[];
  sms_body?: {
    message: string;
  };
  email_body?: {
    subject: string;
    body: string;
    is_html?: boolean;
  };
  dynamic_instruction?: string;
  language?: string;
  emotion?: string;
}

export interface BulkCommunicationResult {
  name: string;
  email?: string;
  phone?: string;
  call_status?: string;
  transcript?: Record<string, any>;
  sms_status?: string;
  email_status?: string;
  created_at?: string;
  ended_at?: string;
  errors?: Record<string, any>;
}

export interface BulkCommunicationResponse {
  status: string;
  message: string;
  total_contacts: number;
  results: BulkCommunicationResult[];
}

/**
 * Bulk Communication Service
 * Handles sending bulk SMS, Email, and AI Calls
 */
class BulkCommunicationService {
  /**
   * Send bulk communication to contacts
   */
  async send(data: BulkCommunicationRequest): Promise<BulkCommunicationResponse> {
    try {
      const response = await apiClient.post('/bulk-communication/send', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send bulk communication');
    }
  }

  /**
   * Send campaign (fetches contacts from list and sends)
   */
  async sendCampaign(campaignData: {
    listId: string;
    communicationTypes: string[];
    smsBody?: { message: string };
    emailBody?: { subject: string; body: string; is_html?: boolean };
    dynamicInstruction?: string;
    language?: string;
    emotion?: string;
    campaignId?: string;
  }): Promise<BulkCommunicationResponse> {
    try {
      // First, get contacts from the list
      const contactsResponse = await apiClient.get('/contacts', {
        params: { listId: campaignData.listId, limit: 1000 },
      });

      const contacts = (contactsResponse.data?.items || []).map((contact: any) => ({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        _id: contact._id || contact.id, // Keep contact ID for creating conversations
      }));

      if (contacts.length === 0) {
        throw new Error('No contacts found in this list');
      }

      // Send bulk communication
      const result = await this.send({
        contacts: contacts.map((c: any) => ({ name: c.name, email: c.email, phone: c.phone })),
        communication_types: campaignData.communicationTypes,
        sms_body: campaignData.smsBody,
        email_body: campaignData.emailBody,
        dynamic_instruction: campaignData.dynamicInstruction,
        language: campaignData.language || 'en',
        emotion: campaignData.emotion || 'Calm',
      });

      // Save transcripts as conversations for contacts with call transcripts
      if (result.results && campaignData.communicationTypes.includes('call')) {
        const conversationsToCreate = result.results
          .filter(r => r.transcript && Object.keys(r.transcript).length > 0)
          .map((r, index) => {
            const contact = contacts.find((c: any) => c.name === r.name);
            return {
              customerId: contact?._id,
              channel: 'phone' as const,
              status: 'closed' as const,
              transcript: r.transcript,
              campaignId: campaignData.campaignId,
              isAiManaging: true,
              unread: false,
            };
          });

        // Create conversations in batches
        if (conversationsToCreate.length > 0) {
          try {
            await apiClient.post('/conversations/bulk', {
              conversations: conversationsToCreate,
            });
          } catch (error) {
            console.warn('Failed to save transcripts as conversations:', error);
            // Don't fail the entire campaign if saving transcripts fails
          }
        }
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send campaign');
    }
  }
}

// Export singleton instance
export const bulkCommunicationService = new BulkCommunicationService();

