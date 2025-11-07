import { apiClient } from '@/lib/api';
import config from '@/lib/config';
import { mockContacts } from '@/data/mockContacts';

export interface ContactFilters {
  search?: string;
  listIds?: string[];
  tags?: string[];
  status?: string;
  kanbanStatus?: string;
  page?: number;
  limit?: number;
}

export interface CreateContactData {
  name: string;
  phone?: string;
  email?: string;
  customProperties?: Record<string, any>;
  tags?: string[];
  listIds?: string[];
  kanbanStatus?: string;
}

export interface UpdateContactData extends Partial<CreateContactData> {}

/**
 * Contact Service
 * Handles all contact-related API calls
 */
class ContactService {
  /**
   * Get all contacts with optional filters
   */
  async getAll(filters?: ContactFilters) {
    try {
      // Demo mode - return mock data
      if (config.isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        let filteredContacts = mockContacts;
        
        // Apply search filter
        if (filters?.search) {
          const search = filters.search.toLowerCase();
          filteredContacts = filteredContacts.filter(c =>
            c.name.toLowerCase().includes(search) ||
            c.email?.toLowerCase().includes(search) ||
            c.phone?.toLowerCase().includes(search)
          );
        }
        
        return {
          contacts: filteredContacts,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: filteredContacts.length,
            itemsPerPage: 50,
          },
        };
      }

      // Real API mode
      const response = await apiClient.get('/contacts', {
        params: filters,
      });
      // Backend uses paginatedResponse which returns { data: { items: [...], pagination: {...} } }
      // Transform _id to id for frontend compatibility and add UI defaults
      const contacts = (response.data?.items || []).map((contact: any) => ({
        ...contact,
        id: contact._id,
        avatar: contact.avatar || contact.name?.charAt(0).toUpperCase() || '?',
        color: contact.color || '#6366f1',
        tags: contact.tags || [],
      }));
      
      return {
        contacts,
        pagination: response.data?.pagination,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch contacts');
    }
  }

  /**
   * Get contact by ID
   */
  async getById(id: string) {
    try {
      const response = await apiClient.get(`/contacts/${id}`);
      // Backend uses successResponse which returns { data: <contact> }
      // Transform _id to id for frontend compatibility
      return {
        ...response.data,
        id: response.data._id,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch contact');
    }
  }

  /**
   * Create new contact
   */
  async create(data: CreateContactData) {
    try {
      const response = await apiClient.post('/contacts', data);
      // Backend uses successResponse which returns { data: <contact> }
      // Transform _id to id for frontend compatibility and add UI defaults
      const contact = response.data;
      return {
        ...contact,
        id: contact._id,
        avatar: contact.avatar || contact.name?.charAt(0).toUpperCase() || '?',
        color: contact.color || '#6366f1',
        tags: contact.tags || [],
      };
    } catch (error: any) {
      // Handle specific error codes
      if (error.status === 409) {
        throw new Error('A contact with this email already exists');
      }
      throw new Error(error.message || 'Failed to create contact');
    }
  }

  /**
   * Update contact
   */
  async update(id: string, data: UpdateContactData) {
    try {
      const response = await apiClient.patch(`/contacts/${id}`, data);
      // Backend uses successResponse which returns { data: <contact> }
      // Transform _id to id for frontend compatibility
      return {
        ...response.data,
        id: response.data._id,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update contact');
    }
  }

  /**
   * Delete contact
   */
  async delete(id: string) {
    try {
      const response = await apiClient.delete(`/contacts/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete contact');
    }
  }

  /**
   * Bulk delete contacts
   */
  async bulkDelete(contactIds: string[]) {
    try {
      const response = await apiClient.post('/contacts/bulk-delete', {
        contactIds,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to bulk delete contacts');
    }
  }

  /**
   * Import contacts from CSV
   */
  async importCSV(file: File, listId?: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // If listId is provided, use the list-specific import endpoint
      const endpoint = listId 
        ? `/contacts/lists/${listId}/import`
        : '/contacts/import';

      const response = await apiClient.uploadFile(endpoint, formData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to import contacts');
    }
  }

  /**
   * Export contacts to CSV
   */
  async exportCSV(filters?: ContactFilters) {
    try {
      const response = await apiClient.get('/contacts/export', {
        params: filters,
        responseType: 'blob',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to export contacts');
    }
  }

  /**
   * Add contacts to list
   */
  async addToList(contactIds: string[], listId: string) {
    try {
      const response = await apiClient.post('/contacts/add-to-list', {
        contactIds,
        listId,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to add contacts to list');
    }
  }

  /**
   * Remove contacts from list
   */
  async removeFromList(contactIds: string[], listId: string) {
    try {
      const response = await apiClient.post('/contacts/remove-from-list', {
        contactIds,
        listId,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to remove contacts from list');
    }
  }

  /**
   * Update contact kanban status
   */
  async updateKanbanStatus(contactId: string, status: string) {
    try {
      const response = await apiClient.patch(`/contacts/${contactId}/kanban-status`, {
        status,
      });
      return response.data.contact;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update kanban status');
    }
  }

  /**
   * Add tags to contact
   */
  async addTags(contactId: string, tags: string[]) {
    try {
      const response = await apiClient.post(`/contacts/${contactId}/tags`, {
        tags,
      });
      return response.data.contact;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to add tags');
    }
  }

  /**
   * Remove tags from contact
   */
  async removeTags(contactId: string, tags: string[]) {
    try {
      const response = await apiClient.delete(`/contacts/${contactId}/tags`, {
        data: { tags },
      });
      return response.data.contact;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to remove tags');
    }
  }

  /**
   * Get contact lists
   */
  async getLists() {
    try {
      const response = await apiClient.get('/contacts/lists/all');
      return response.data?.lists || [];
    } catch (error: any) {
      // If endpoint doesn't exist, return empty array instead of failing
      console.warn('Contact lists endpoint not available:', error.message);
      return [];
    }
  }

  /**
   * Create contact list
   */
  async createList(name: string, description?: string) {
    try {
      const response = await apiClient.post('/contacts/lists', {
        name,
        description,
      });
      return response.data.list;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create list');
    }
  }

  /**
   * Update contact list
   */
  async updateList(listId: string, name: string, description?: string) {
    try {
      const response = await apiClient.patch(`/contacts/lists/${listId}`, {
        name,
        description,
      });
      return response.data.list;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update list');
    }
  }

  /**
   * Delete contact list
   */
  async deleteList(listId: string) {
    try {
      const response = await apiClient.delete(`/contacts/lists/${listId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete list');
    }
  }

  /**
   * Get custom property definitions
   */
  async getCustomProperties() {
    try {
      const response = await apiClient.get('/contacts/custom-properties/all');
      return response.data.properties;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch custom properties');
    }
  }

  /**
   * Create custom property definition
   */
  async createCustomProperty(name: string, type: string, options?: any) {
    try {
      const response = await apiClient.post('/contacts/custom-properties', {
        name,
        type,
        options,
      });
      return response.data.property;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create custom property');
    }
  }
}

// Export singleton instance
export const contactService = new ContactService();

