"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { mockCampaigns, Campaign } from "@/data/mockCampaigns";
import { CampaignList } from "@/components/campaigns/CampaignList";
import { CampaignBuilder } from "@/components/campaigns/CampaignBuilder";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const handleCreateCampaign = (data: any) => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: data.name,
      contactList: data.contactList,
      status: "draft",
      sentCount: 0,
      openedCount: 0,
      createdAt: new Date().toISOString(),
    };
    setCampaigns([newCampaign, ...campaigns]);
    setShowBuilder(false);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowBuilder(true);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  if (showBuilder) {
    return (
      <div className="fixed inset-0" style={{ left: "240px" }}>
        <CampaignBuilder
          onClose={() => {
            setShowBuilder(false);
            setEditingCampaign(null);
          }}
          onSave={handleCreateCampaign}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
        <button
          onClick={() => setShowBuilder(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="rounded-full bg-secondary p-6 mb-4">
              <svg
                className="w-16 h-16 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No campaigns yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first campaign to get started
            </p>
            <button
              onClick={() => setShowBuilder(true)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>
        ) : (
          <CampaignList
            campaigns={campaigns}
            onEdit={handleEditCampaign}
            onDelete={handleDeleteCampaign}
          />
        )}
      </div>
    </div>
  );
}
