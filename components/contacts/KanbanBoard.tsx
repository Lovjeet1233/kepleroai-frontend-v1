"use client";

import { Plus, MoreVertical } from "lucide-react";
import { Contact } from "@/data/mockContacts";
import { ContactCard } from "./ContactCard";

interface KanbanBoardProps {
  contacts: Contact[];
}

export function KanbanBoard({ contacts }: KanbanBoardProps) {
  const statuses = ["New", "Contacted", "Qualified", "Won"];

  // Group contacts by status (mock logic)
  const getContactsByStatus = (status: string) => {
    return contacts.slice(0, Math.floor(Math.random() * 5) + 1);
  };

  return (
    <div className="flex gap-4 overflow-x-auto p-6">
      {statuses.map((status) => {
        const statusContacts = getContactsByStatus(status);
        
        return (
          <div
            key={status}
            className="shrink-0 w-[300px] bg-card rounded-xl p-4"
            style={{ minHeight: "600px" }}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">{status}</h3>
                <span className="px-2 py-1 bg-secondary text-xs text-muted-foreground rounded-lg">
                  {statusContacts.length}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {statusContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Add status column */}
      <div
        className="shrink-0 w-[300px] border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center"
        style={{ minHeight: "600px" }}
      >
        <div className="rounded-full bg-secondary p-3 mb-3">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Add Status</p>
      </div>
    </div>
  );
}

