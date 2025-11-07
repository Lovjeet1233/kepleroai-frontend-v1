"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Campaign } from "@/data/mockCampaigns";
import { cn } from "@/lib/utils";

interface CampaignListProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
}

export function CampaignList({ campaigns, onEdit, onDelete }: CampaignListProps) {
  const getStatusBadge = (status: Campaign["status"]) => {
    const styles = {
      draft: "bg-gray-600 text-foreground",
      scheduled: "bg-blue-500 text-foreground",
      sent: "bg-green-500 text-foreground",
    };

    return (
      <span
        className={cn(
          "px-2.5 py-1 rounded-xl text-xs font-medium",
          styles[status]
        )}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatOpenRate = (sent: number, opened: number) => {
    if (sent === 0) return "—";
    return `${Math.round((opened / sent) * 100)}%`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-secondary">
            <th className="px-6 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Name
              </span>
            </th>
            <th className="px-6 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Contact List
              </span>
            </th>
            <th className="px-6 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Status
              </span>
            </th>
            <th className="px-6 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Scheduled
              </span>
            </th>
            <th className="px-6 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Sent
              </span>
            </th>
            <th className="px-6 py-3 text-left">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Opened
              </span>
            </th>
            <th className="px-6 py-3 text-right">
              <span className="text-[13px] font-semibold text-muted-foreground uppercase">
                Actions
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="border-b border-border hover:bg-secondary transition-colors"
            >
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-foreground">
                  {campaign.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">{campaign.contactList}</span>
              </td>
              <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {campaign.scheduledDate
                    ? formatDate(campaign.scheduledDate)
                    : "—"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {campaign.sentCount > 0 ? campaign.sentCount : "—"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {formatOpenRate(campaign.sentCount, campaign.openedCount)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(campaign)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(campaign.id)}
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

