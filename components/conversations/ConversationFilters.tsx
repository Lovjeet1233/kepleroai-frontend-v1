"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  UserCircle2,
  ChevronDown,
  ChevronRight,
  Folder,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationFiltersProps {
  onFilterChange?: (filter: string) => void;
}

export function ConversationFilters({
  onFilterChange,
}: ConversationFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [colleaguesExpanded, setColleaguesExpanded] = useState(false);
  const [foldersExpanded, setFoldersExpanded] = useState(true);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className="w-[260px] bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Conversations</h2>
        <button className="text-foreground hover:opacity-80 transition-opacity">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Icons Row */}
      <div className="px-3 mb-3">
        <div className="flex items-center gap-2">
          <button className="flex-1 h-9 flex items-center justify-center bg-secondary rounded-md hover:bg-accent transition-colors">
            <Search className="w-[18px] h-[18px] text-muted-foreground" />
          </button>
          <button className="flex-1 h-9 flex items-center justify-center bg-secondary rounded-md hover:bg-accent transition-colors">
            <SlidersHorizontal className="w-[18px] h-[18px] text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="px-3 mb-4 space-y-2">
        <button
          onClick={() => handleFilterSelect("all")}
          className={cn(
            "w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left",
            selectedFilter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          )}
        >
          All
        </button>
        <button
          onClick={() => handleFilterSelect("assigned")}
          className={cn(
            "w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left flex items-center gap-2",
            selectedFilter === "assigned"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          )}
        >
          <UserCircle2 className="w-4 h-4" />
          <span>Assigned to me</span>
        </button>
      </div>

      {/* Colleagues Section */}
      <div className="px-3 mb-4">
        <button
          onClick={() => setColleaguesExpanded(!colleaguesExpanded)}
          className="w-full flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          {colleaguesExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span>Colleagues</span>
        </button>
        {colleaguesExpanded && (
          <div className="pl-6 text-sm text-muted-foreground">
            <p className="py-2">No colleagues online</p>
          </div>
        )}
      </div>

      {/* Folders Section */}
      <div className="px-3 flex-1">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setFoldersExpanded(!foldersExpanded)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {foldersExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span>Folders</span>
          </button>
          <div className="flex items-center gap-1">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        {foldersExpanded && (
          <div className="space-y-1">
            <button
              onClick={() => handleFilterSelect("all-folders")}
              className={cn(
                "w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left flex items-center gap-2",
                selectedFilter === "all-folders"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              )}
            >
              <Folder className="w-4 h-4" />
              <span>All folders</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

