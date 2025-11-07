"use client";

import { useState } from "react";
import { Lock, Folder, Plus, LayoutList, Kanban as KanbanIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Contact } from "@/data/mockContacts";
import { ContactsTable } from "@/components/contacts/ContactsTable";
import { KanbanBoard } from "@/components/contacts/KanbanBoard";
import { ContactModal } from "@/components/contacts/ContactModal";
import { CSVImportModal } from "@/components/contacts/CSVImportModal";
import { 
  useContacts, 
  useContactLists, 
  useCreateContact, 
  useUpdateContact, 
  useDeleteContact, 
  useBulkDeleteContacts,
  useCreateListWithCSV
} from "@/hooks/useContacts";
import { ContactCardSkeleton } from "@/components/LoadingSkeleton";
import { NoContacts } from "@/components/EmptyState";
import { toast } from "sonner";

export default function ContactsPage() {
  const [selectedList, setSelectedList] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCSVImportOpen, setIsCSVImportOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any | null>(null);

  // Fetch contacts and lists from API
  const { data: contactsData, isLoading, isError } = useContacts({ 
    listIds: selectedList === "all" ? undefined : [selectedList] 
  });
  const { data: listsData } = useContactLists();
  
  // Mutations
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  const bulkDeleteContacts = useBulkDeleteContacts();
  const createListWithCSV = useCreateListWithCSV();

  const contacts = contactsData?.contacts || [];
  const lists = listsData || [];

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    setSelectedIds(selectedIds.length === contacts.length ? [] : contacts.map((c: Contact) => c.id));
  };

  const handleEditContact = (contact: any) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleSaveContact = async (data: any) => {
    try {
      if (editingContact) {
        await updateContact.mutateAsync({ id: editingContact.id, data });
        setEditingContact(null);
      } else {
        await createContact.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      // Error is already handled by React Query and toast notifications
      // Keep modal open so user can correct the data
      console.error('Failed to save contact:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact.mutateAsync(id);
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } catch (error: any) {
      console.error('Failed to delete contact:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await bulkDeleteContacts.mutateAsync(selectedIds);
      setSelectedIds([]);
    } catch (error: any) {
      console.error('Failed to delete contacts:', error);
    }
  };

  const handleCSVImport = async (file: File, listName: string) => {
    await createListWithCSV.mutateAsync({ file, listName });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex" style={{ left: "240px" }}>
        <div className="w-60 bg-card border-r border-border" />
        <div className="flex-1 p-6">
          <ContactCardSkeleton count={6} />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ left: "240px" }}>
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Contacts</h2>
          <p className="text-muted-foreground">Failed to load contacts. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-foreground rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex" style={{ left: "240px" }}>
      {/* Left sidebar - Lists */}
      <div className="w-60 bg-card border-r border-border flex flex-col">
        <div className="px-3 py-4">
          <h2 className="text-base font-semibold text-foreground px-3">Lists</h2>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {/* All Contacts */}
          <button
            onClick={() => setSelectedList("all")}
            className={cn(
              "w-full flex items-center gap-3 h-10 px-3 rounded-md text-sm transition-colors",
              selectedList === "all"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            )}
          >
            <Folder className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left truncate">All Contacts</span>
            <span className="text-xs text-muted-foreground">{contacts.length}</span>
          </button>

          {/* Dynamic Lists from API */}
          {lists.map((list: any) => (
            <button
              key={list.id}
              onClick={() => setSelectedList(list.id)}
              className={cn(
                "w-full flex items-center gap-3 h-10 px-3 rounded-md text-sm transition-colors",
                selectedList === list.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              <Folder className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left truncate">{list.name}</span>
              <span className="text-xs text-muted-foreground">{list.contactCount || 0}</span>
            </button>
          ))}
        </nav>

        <div className="p-3">
          <button
            onClick={() => setIsCSVImportOpen(true)}
            className="w-full h-10 bg-primary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add List</span>
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-border">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-md transition-colors",
                viewMode === "table"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Table View"
            >
              <LayoutList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-md transition-colors",
                viewMode === "kanban"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Kanban View"
            >
              <KanbanIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsCSVImportOpen(true)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add List</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {/* Bulk actions toolbar */}
        {selectedIds.length > 0 && (
          <div className="mx-6 mt-4 h-14 px-6 bg-primary rounded-xl flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedIds.length} selected
            </span>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/10 text-foreground rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                Add to list
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-red-500 text-foreground rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {viewMode === "table" ? (
            <div className="p-6">
              <ContactsTable
                contacts={contacts}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            </div>
          ) : (
            <KanbanBoard contacts={contacts} />
          )}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        initialData={
          editingContact
            ? {
                name: editingContact.name,
                email: editingContact.email,
                phone: editingContact.phone,
                tags: editingContact.tags,
              }
            : undefined
        }
        mode={editingContact ? "edit" : "add"}
      />

      {/* CSV Import Modal */}
      <CSVImportModal
        isOpen={isCSVImportOpen}
        onClose={() => setIsCSVImportOpen(false)}
        onImport={handleCSVImport}
      />
    </div>
  );
}
