"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, UserCircle2 } from "lucide-react";
import { Conversation } from "@/data/mockConversations";
import { ConversationCard } from "./ConversationCard";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelectConversation?: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelectConversation,
}: ConversationListProps) {
  const [statusFilter, setStatusFilter] = useState("open");
  const [sortBy, setSortBy] = useState("recent");

  return (
    <div className="w-[360px] bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border">
        <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity">
          <UserCircle2 className="w-4 h-4" />
          <span>Assigned to me</span>
        </button>
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SlidersHorizontal className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="px-4 py-3 flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md text-sm text-secondary-foreground hover:bg-accent transition-colors">
          <span>Open</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md text-sm text-secondary-foreground hover:bg-accent transition-colors">
          <span>From the most recent</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Conversation Cards */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedId === conversation.id}
              onClick={() => onSelectConversation?.(conversation.id)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              No conversations found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

