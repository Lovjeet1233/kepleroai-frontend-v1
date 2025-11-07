import { apiClient } from '@/lib/api';

export interface ConversationFilters {
  status?: string;
  channel?: string;
  operatorId?: string;
  labelIds?: string[];
  folderId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface SendMessageData {
  content: string;
  type?: 'text' | 'image' | 'file' | 'audio' | 'video';
  mediaUrl?: string;
  metadata?: any;
}

/**
 * Conversation Service
 * Handles all conversation-related API calls
 */
class ConversationService {
  /**
   * Get all conversations with optional filters
   */
  async getAll(filters?: ConversationFilters) {
    try {
      const response = await apiClient.get('/conversations', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch conversations');
    }
  }

  /**
   * Get conversation by ID
   */
  async getById(id: string) {
    try {
      const response = await apiClient.get(`/conversations/${id}`);
      return response.data.conversation;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch conversation');
    }
  }

  /**
   * Get messages for a conversation
   */
  async getMessages(conversationId: string, page = 1, limit = 50) {
    try {
      const response = await apiClient.get(`/conversations/${conversationId}/messages`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch messages');
    }
  }

  /**
   * Send message in conversation
   */
  async sendMessage(conversationId: string, data: SendMessageData) {
    try {
      const response = await apiClient.post(
        `/conversations/${conversationId}/messages`,
        data
      );
      return response.data.message;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send message');
    }
  }

  /**
   * Take manual control of conversation
   */
  async takeControl(conversationId: string) {
    try {
      const response = await apiClient.post(
        `/conversations/${conversationId}/take-control`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to take control');
    }
  }

  /**
   * Release manual control of conversation
   */
  async releaseControl(conversationId: string) {
    try {
      const response = await apiClient.post(
        `/conversations/${conversationId}/release-control`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to release control');
    }
  }

  /**
   * Update conversation status
   */
  async updateStatus(conversationId: string, status: string) {
    try {
      const response = await apiClient.patch(
        `/conversations/${conversationId}/status`,
        { status }
      );
      return response.data.conversation;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update status');
    }
  }

  /**
   * Assign conversation to operator
   */
  async assignOperator(conversationId: string, operatorId: string) {
    try {
      const response = await apiClient.patch(
        `/conversations/${conversationId}/assign`,
        { operatorId }
      );
      return response.data.conversation;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to assign operator');
    }
  }

  /**
   * Update conversation labels
   */
  async updateLabels(
    conversationId: string,
    labelIdsToAdd: string[] = [],
    labelIdsToRemove: string[] = []
  ) {
    try {
      const response = await apiClient.patch(
        `/conversations/${conversationId}/labels`,
        {
          add: labelIdsToAdd,
          remove: labelIdsToRemove,
        }
      );
      return response.data.conversation;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update labels');
    }
  }

  /**
   * Move conversation to folder
   */
  async moveToFolder(conversationId: string, folderId: string | null) {
    try {
      const response = await apiClient.patch(
        `/conversations/${conversationId}/folder`,
        { folderId }
      );
      return response.data.conversation;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to move to folder');
    }
  }

  /**
   * Mark conversation as read
   */
  async markAsRead(conversationId: string) {
    try {
      const response = await apiClient.patch(
        `/conversations/${conversationId}/read`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to mark as read');
    }
  }

  /**
   * Mark conversation as unread
   */
  async markAsUnread(conversationId: string) {
    try {
      const response = await apiClient.patch(
        `/conversations/${conversationId}/unread`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to mark as unread');
    }
  }

  /**
   * Delete conversation
   */
  async delete(conversationId: string) {
    try {
      const response = await apiClient.delete(`/conversations/${conversationId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete conversation');
    }
  }

  /**
   * Bulk delete conversations
   */
  async bulkDelete(conversationIds: string[]) {
    try {
      const response = await apiClient.post('/conversations/bulk-delete', {
        conversationIds,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to bulk delete conversations');
    }
  }

  /**
   * Search messages across conversations
   */
  async searchMessages(query: string, filters?: ConversationFilters) {
    try {
      const response = await apiClient.get('/conversations/search-messages', {
        params: { query, ...filters },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to search messages');
    }
  }

  /**
   * Add internal note to conversation
   */
  async addNote(conversationId: string, note: string) {
    try {
      const response = await apiClient.post(
        `/conversations/${conversationId}/notes`,
        { note }
      );
      return response.data.note;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to add note');
    }
  }

  /**
   * Get conversation statistics
   */
  async getStats() {
    try {
      const response = await apiClient.get('/conversations/stats');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch stats');
    }
  }
}

// Export singleton instance
export const conversationService = new ConversationService();

