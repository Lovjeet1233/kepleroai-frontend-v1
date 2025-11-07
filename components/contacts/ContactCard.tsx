"use client";

import { Contact } from "@/data/mockContacts";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <div className="bg-secondary border border-border rounded-lg p-4 cursor-move hover:border-primary transition-colors">
      <div className="flex flex-col items-center text-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
          style={{ backgroundColor: contact.color }}
        >
          {contact.avatar}
        </div>
        <h4 className="mt-2 text-sm font-medium text-foreground">{contact.name}</h4>
        <p className="mt-1 text-[13px] text-muted-foreground truncate w-full">
          {contact.email}
        </p>
      </div>
    </div>
  );
}

