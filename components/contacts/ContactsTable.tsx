"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Contact } from "@/data/mockContacts";

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

export function ContactsTable({
  contacts,
  onEdit,
  onDelete,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: ContactsTableProps) {
  const allSelected = contacts.length > 0 && selectedIds.length === contacts.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Header */}
        <thead>
          <tr className="bg-secondary rounded-lg">
            <th className="w-12 px-4 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
              />
            </th>
            <th className="w-14 px-4 py-3"></th>
            <th className="px-4 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Name
              </span>
            </th>
            <th className="px-4 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Email
              </span>
            </th>
            <th className="w-[200px] px-4 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Phone
              </span>
            </th>
            <th className="w-[160px] px-4 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Tags
              </span>
            </th>
            <th className="w-20 px-4 py-3 text-right">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Actions
              </span>
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="border-b border-border hover:bg-secondary transition-colors"
            >
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(contact.id)}
                  onChange={() => onToggleSelect(contact.id)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                />
              </td>
              <td className="px-4 py-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: contact.color }}
                >
                  {contact.avatar}
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-medium text-foreground">
                  {contact.name}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-muted-foreground">{contact.email}</span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-muted-foreground">{contact.phone}</span>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-secondary text-xs text-secondary-foreground rounded-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(contact)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(contact.id)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

