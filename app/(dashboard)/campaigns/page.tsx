"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CampaignList } from "@/components/campaigns/CampaignList";
import { CampaignBuilder } from "@/components/campaigns/CampaignBuilder";
import { useCampaigns, useCreateCampaign } from "@/hooks/useCampaigns";
import { campaignService } from "@/services/campaign.service";
import { toast } from "sonner";

export default function CampaignsPage() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Fetch campaigns from API
  const { data: campaigns = [], isLoading } = useCampaigns();
  const createCampaign = useCreateCampaign();

  const handleCreateCampaign = async (data: any) => {
    try {
      setIsSending(true);

      // Save campaign first to get ID
      const campaign = await createCampaign.mutateAsync({
        ...data,
        status: 'draft',
      });

      // Start campaign immediately via backend (which calls bulk communication API)
      const campaignId = campaign._id || campaign.id;
      const startResult = await campaignService.start(campaignId);

      toast.success(`Campaign sent successfully!`);
      setShowBuilder(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send campaign");
    } finally {
      setIsSending(false);
    }
  };

  const handleEditCampaign = (campaign: any) => {
    setEditingCampaign(campaign);
    setShowBuilder(true);
  };

  const handleDeleteCampaign = async (id: string) => {
    // TODO: Implement delete campaign API call
    console.log("Deleting campaign:", id);
  };

  if (showBuilder) {
    return (
      <div className="fixed inset-0" style={{ left: "240px" }}>
        {isSending ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg text-foreground font-medium">Sending campaign...</p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take a few minutes depending on the number of contacts
              </p>
            </div>
          </div>
        ) : (
          <CampaignBuilder
            onClose={() => {
              setShowBuilder(false);
              setEditingCampaign(null);
            }}
            onSave={handleCreateCampaign}
          />
        )}
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
          </div>
        ) : campaigns.length === 0 ? (
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
