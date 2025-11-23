"use client";

import { useState, useMemo } from "react";
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
  const [statusFilter, setStatusFilter] = useState("all"); // Changed from "open" to "all"
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort conversations
  const filteredConversations = useMemo(() => {
    let filtered = [...conversations];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (conv) =>
          conv.customer.name.toLowerCase().includes(query) ||
          conv.customer.email.toLowerCase().includes(query) ||
          conv.lastMessage.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((conv) => conv.status === statusFilter);
    }

    // Apply sorting
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    } else if (sortBy === "unread") {
      filtered.sort((a, b) => (b.unread ? 1 : 0) - (a.unread ? 1 : 0));
    }

    return filtered;
  }, [conversations, searchQuery, statusFilter, sortBy]);

  return (
    <div className="w-[360px] bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border">
        <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity">
          <UserCircle2 className="w-4 h-4" />
          <span>Assigned to me</span>
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className={`hover:text-foreground transition-colors ${
              showSearch ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`hover:text-foreground transition-colors ${
              showFilters ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <SlidersHorizontal className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-4 py-2 border-b border-border">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      )}

      {/* Filter Row */}
      {showFilters && (
        <div className="px-4 py-3 border-b border-border space-y-2">
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 bg-secondary border border-border rounded-md text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="unread">Unread</option>
              <option value="support_request">Support Request</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-3 py-2 bg-secondary border border-border rounded-md text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="unread">Unread First</option>
            </select>
          </div>
        </div>
      )}

      {/* Conversation Cards */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
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
              {searchQuery ? "No conversations match your search" : "No conversations found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

