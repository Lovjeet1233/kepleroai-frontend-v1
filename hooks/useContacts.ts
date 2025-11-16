import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { contactService, ContactFilters, CreateContactData, UpdateContactData } from '@/services/contact.service';
import { toast } from 'sonner';

/**
 * Fetch all contacts with filters
 */
export function useContacts(filters?: ContactFilters) {
  return useQuery({
    queryKey: ['contacts', filters],
    queryFn: () => contactService.getAll(filters),
  });
}

/**
 * Fetch contacts with infinite scroll
 */
export function useInfiniteContacts(filters?: ContactFilters) {
  return useInfiniteQuery({
    queryKey: ['contacts', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      contactService.getAll({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pagination?.hasMore) {
        return pages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

/**
 * Fetch single contact by ID
 */
export function useContact(contactId: string | null) {
  return useQuery({
    queryKey: ['contact', contactId],
    queryFn: () => contactService.getById(contactId!),
    enabled: !!contactId,
  });
}

/**
 * Fetch contact lists
 */
export function useContactLists() {
  return useQuery({
    queryKey: ['contact-lists'],
    queryFn: () => contactService.getLists(),
    retry: 1, // Only retry once
    retryDelay: 1000,
  });
}

/**
 * Fetch custom properties
 */
export function useCustomProperties() {
  return useQuery({
    queryKey: ['custom-properties'],
    queryFn: () => contactService.getCustomProperties(),
  });
}

/**
 * Create contact mutation
 */
export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContactData) => contactService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact created');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create contact');
    },
  });
}

/**
 * Update contact mutation
 */
export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactData }) =>
      contactService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contact', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update contact');
    },
  });
}

/**
 * Delete contact mutation
 */
export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete contact');
    },
  });
}

/**
 * Bulk delete contacts mutation
 */
export function useBulkDeleteContacts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactIds: string[]) => contactService.bulkDelete(contactIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contacts deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete contacts');
    },
  });
}

/**
 * Import CSV mutation
 */
export function useImportContactsCSV() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, listId }: { file: File; listId?: string }) =>
      contactService.importCSV(file, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contacts imported successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to import contacts');
    },
  });
}

/**
 * Create list with CSV import mutation
 */
export function useCreateListWithCSV() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, listName }: { file: File; listName: string }) => {
      // First create the list
      const list = await contactService.createList(listName);
      // Then import the CSV to that list
      await contactService.importCSV(file, list.id);
      return list;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact-lists'] });
      toast.success('List created and contacts imported successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create list and import contacts');
    },
  });
}

/**
 * Update kanban status mutation
 */
export function useUpdateKanbanStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactId, status }: { contactId: string; status: string }) =>
      contactService.updateKanbanStatus(contactId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contact', variables.contactId] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update status');
    },
  });
}

/**
 * Add to list mutation
 */
export function useAddToList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactIds, listId }: { contactIds: string[]; listId: string }) =>
      contactService.addToList(contactIds, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Added to list');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add to list');
    },
  });
}

/**
 * Create list mutation
 */
export function useCreateList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => contactService.createList(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-lists'] });
      toast.success('List created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create list');
    },
  });
}

/**
 * Bulk add to list mutation
 */
export function useBulkAddToList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactIds, listId }: { contactIds: string[]; listId: string }) =>
      contactService.bulkAddToList(contactIds, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact-lists'] });
      toast.success('Contacts added to list successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add contacts to list');
    },
  });
}

