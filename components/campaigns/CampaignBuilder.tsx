"use client";

import { useState } from "react";
import { Check, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { FollowUpBuilder } from "./FollowUpBuilder";

interface CampaignBuilderProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function CampaignBuilder({ onClose, onSave }: CampaignBuilderProps) {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [contactList, setContactList] = useState("");
  const [template, setTemplate] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [followUps, setFollowUps] = useState<any[]>([]);

  const steps = [
    { number: 1, label: "Details" },
    { number: 2, label: "Template" },
    { number: 3, label: "Follow-ups" },
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    onSave({
      name: campaignName,
      contactList,
      template,
      scheduleDate,
      scheduleTime,
      followUps,
    });
  };

  const handleAddFollowUp = () => {
    setFollowUps([
      ...followUps,
      {
        id: Date.now().toString(),
        template: "",
        condition: "no_response",
        delay: 1,
        delayUnit: "days",
      },
    ]);
  };

  const handleUpdateFollowUp = (id: string, updates: any) => {
    setFollowUps(followUps.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const handleDeleteFollowUp = (id: string) => {
    setFollowUps(followUps.filter((f) => f.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  step > s.number
                    ? "bg-green-600 text-foreground"
                    : step === s.number
                    ? "bg-primary text-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s.number ? <Check className="w-5 h-5" /> : s.number}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm",
                  step >= s.number ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-24 h-0.5 mx-4",
                  step > s.number ? "bg-green-600" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-card border border-border rounded-xl p-6">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-white mb-3">
                Campaign Name
              </label>
              <input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name"
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-white mb-3">
                Contact List
              </label>
              <select
                value={contactList}
                onChange={(e) => setContactList(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select list</option>
                <option value="all">All</option>
                <option value="newsletter">Newsletter</option>
                <option value="vip">VIP Customers</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-white mb-3">
                WhatsApp Template
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select template</option>
                <option value="greeting">Greeting Message</option>
                <option value="promotion">Promotion</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-white mb-3">
                Schedule
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex-1 relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Follow-up Messages
            </h3>
            <FollowUpBuilder
              followUps={followUps}
              onAdd={handleAddFollowUp}
              onUpdate={handleUpdateFollowUp}
              onDelete={handleDeleteFollowUp}
            />
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={step === 1 ? onClose : handleBack}
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors"
        >
          {step === 1 ? "Cancel" : "Back"}
        </button>
        {step < 3 ? (
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && (!campaignName || !contactList)) ||
              (step === 2 && !template)
            }
            className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all"
          >
            Start Campaign 🚀
          </button>
        )}
      </div>
    </div>
  );
}

