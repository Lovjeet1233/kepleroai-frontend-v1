"use client";

import { useState } from "react";
import { Bookmark, Folder, Tag, MoreVertical, X } from "lucide-react";
import { Conversation } from "@/data/mockConversations";
import { MessageThread } from "./MessageThread";
import { ManualControlPanel } from "./ManualControlPanel";

interface ConversationDetailProps {
  conversation: Conversation;
  onClose: () => void;
}

export function ConversationDetail({
  conversation,
  onClose,
}: ConversationDetailProps) {
  const [isManualControl, setIsManualControl] = useState(false);

  const handleTakeControl = () => {
    setIsManualControl(true);
  };

  const handleReleaseControl = () => {
    setIsManualControl(false);
  };

  const handleSendMessage = (message: string, isInternal: boolean) => {
    // TODO: Implement send message logic
    console.log("Send message:", message, "Internal:", isInternal);
  };

  return (
    <div className="flex-1 bg-background flex flex-col">
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-border">
        {/* Left side - Avatar and name */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground font-semibold text-sm"
            style={{ backgroundColor: conversation.customer.color }}
          >
            {conversation.customer.avatar}
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {conversation.customer.name}
            </h3>
            <p className="text-xs text-muted-foreground">{conversation.customer.email}</p>
          </div>
        </div>

        {/* Right side - Action icons */}
        <div className="flex items-center gap-3">
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Bookmark"
          >
            <Bookmark className="w-[18px] h-[18px]" />
          </button>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Folder"
          >
            <Folder className="w-[18px] h-[18px]" />
          </button>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Tags"
          >
            <Tag className="w-[18px] h-[18px]" />
          </button>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="More"
          >
            <MoreVertical className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Close"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Message thread */}
      <MessageThread
        messages={conversation.messages}
        customerColor={conversation.customer.color}
        customerAvatar={conversation.customer.avatar}
      />

      {/* Control panel */}
      <ManualControlPanel
        isManualControl={isManualControl}
        onTakeControl={handleTakeControl}
        onReleaseControl={handleReleaseControl}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

