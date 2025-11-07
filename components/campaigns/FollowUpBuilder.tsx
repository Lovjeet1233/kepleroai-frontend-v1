"use client";

import { X } from "lucide-react";

interface FollowUp {
  id: string;
  template: string;
  condition: "no_response" | "always";
  delay: number;
  delayUnit: "minutes" | "hours" | "days" | "weeks" | "months";
}

interface FollowUpBuilderProps {
  followUps: FollowUp[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<FollowUp>) => void;
  onDelete: (id: string) => void;
}

export function FollowUpBuilder({
  followUps,
  onAdd,
  onUpdate,
  onDelete,
}: FollowUpBuilderProps) {
  return (
    <div className="space-y-4">
      {followUps.map((followUp, index) => (
        <div
          key={followUp.id}
          className="border border-border rounded-xl p-5 relative"
        >
          <button
            onClick={() => onDelete(followUp.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-4 pr-8">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Follow-up #{index + 1} Template
              </label>
              <select
                value={followUp.template}
                onChange={(e) =>
                  onUpdate(followUp.id, { template: e.target.value })
                }
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select template</option>
                <option value="reminder">Reminder Message</option>
                <option value="special-offer">Special Offer</option>
                <option value="last-chance">Last Chance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Condition
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={followUp.condition === "no_response"}
                    onChange={() =>
                      onUpdate(followUp.id, { condition: "no_response" })
                    }
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-secondary-foreground">If no response</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={followUp.condition === "always"}
                    onChange={() => onUpdate(followUp.id, { condition: "always" })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-secondary-foreground">Always</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Delay
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={followUp.delay}
                  onChange={(e) =>
                    onUpdate(followUp.id, { delay: parseInt(e.target.value) })
                  }
                  min="1"
                  className="w-24 bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
                <select
                  value={followUp.delayUnit}
                  onChange={(e) =>
                    onUpdate(followUp.id, {
                      delayUnit: e.target.value as FollowUp["delayUnit"],
                    })
                  }
                  className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="w-full h-15 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-foreground transition-colors flex items-center justify-center py-4"
      >
        + Add Follow-up
      </button>
    </div>
  );
}

