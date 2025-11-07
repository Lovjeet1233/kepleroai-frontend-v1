"use client";

import { MessageCircle, Mail, Database, Phone, Bell, CheckSquare } from "lucide-react";

interface ActionBlockProps {
  selectedAction: string;
  onActionChange: (action: string) => void;
}

const actions = [
  { value: "send_whatsapp", label: "Send WhatsApp", icon: MessageCircle },
  { value: "send_email", label: "Send Email", icon: Mail },
  { value: "save_crm", label: "Save to CRM", icon: Database },
  { value: "make_call", label: "Make Call", icon: Phone },
  { value: "send_notification", label: "Send Notification", icon: Bell },
  { value: "create_task", label: "Create Task", icon: CheckSquare },
];

export function ActionBlock({ selectedAction, onActionChange }: ActionBlockProps) {
  return (
    <div className="w-[360px] bg-card border-2 border-border rounded-2xl p-6">
      <label className="block text-xs uppercase text-muted-foreground font-semibold mb-3">
        Action
      </label>
      
      <select
        value={selectedAction}
        onChange={(e) => onActionChange(e.target.value)}
        className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none"
      >
        <option value="">Select an action</option>
        {actions.map((action) => (
          <option key={action.value} value={action.value}>
            {action.label}
          </option>
        ))}
      </select>

      {selectedAction && (
        <div className="mt-4 space-y-3">
          <input
            placeholder="Action parameter"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      )}
    </div>
  );
}

