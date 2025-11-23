"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ConversationFilters } from "@/components/conversations/ConversationFilters";
import { ConversationList } from "@/components/conversations/ConversationList";
import { ConversationDetail } from "@/components/conversations/ConversationDetail";
import { useConversations, useConversation } from "@/hooks/useConversations";
import { ConversationListSkeleton } from "@/components/LoadingSkeleton";
import { NoConversations } from "@/components/EmptyState";
import { useSidebar } from "@/contexts/SidebarContext";

export default function ConversationsPage() {
  const { getSidebarWidth } = useSidebar();
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [filter, setFilter] = useState("all");

  // Parse filter to determine if it's a channel filter
  const getFilterParams = () => {
    if (filter.startsWith('channel:')) {
      const channel = filter.replace('channel:', '');
      // Map channel names to backend format
      const channelMap: Record<string, string> = {
        'website': 'website',
        'whatsapp': 'whatsapp',
        'instagram': 'social',
        'facebook': 'social',
        'phone': 'phone',
      };
      return { channel: channelMap[channel] || channel };
    }
    return { status: filter === "all" ? undefined : filter };
  };

  // Fetch conversations from API
  const { data: conversationsData, isLoading, isError, error } = useConversations(getFilterParams());

  // Fetch selected conversation details
  const { data: selectedConversationData } = useConversation(selectedConversationId);

  const conversations = conversationsData?.conversations || [];
  const selectedConversation = selectedConversationData || null;

  const handleCloseDetail = () => {
    setSelectedConversationId(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header title="Conversations" />
        <div className="fixed inset-0 flex transition-all duration-300" style={{ left: `${getSidebarWidth()}px`, top: "80px" }}>
          <ConversationFilters onFilterChange={setFilter} />
          <div className="flex-1 p-4">
            <ConversationListSkeleton count={5} />
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (isError) {
    return (
      <>
        <Header title="Conversations" />
        <div className="fixed inset-0 flex items-center justify-center transition-all duration-300" style={{ left: `${getSidebarWidth()}px`, top: "80px" }}>
          <div className="text-center">
            <h2 className="text-xl font-bold text-destructive mb-2">Error Loading Conversations</h2>
            <p className="text-muted-foreground">{error?.message || 'Failed to load conversations'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Conversations" />
      <div className="fixed inset-0 flex transition-all duration-300" style={{ left: `${getSidebarWidth()}px`, top: "80px" }}>
        {/* Column 1 - Filters */}
        <ConversationFilters onFilterChange={setFilter} />

        {/* Column 2 - Conversation List */}
        {conversations.length === 0 ? (
          <div className="flex-1">
            <NoConversations />
          </div>
        ) : (
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversationId || undefined}
            onSelectConversation={setSelectedConversationId}
          />
        )}

        {/* Column 3 - Detail View */}
        {selectedConversation ? (
          <ConversationDetail
            conversation={selectedConversation}
            onClose={handleCloseDetail}
          />
        ) : (
          <div className="flex-1 bg-background flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">
                Select a conversation to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
