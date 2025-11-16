"use client";

import { useState, useMemo } from "react";
import { Bookmark, Folder, Tag, MoreVertical, X, Phone } from "lucide-react";
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

  // Convert messages to the format expected by MessageThread
  const messages = useMemo(() => {
    // @ts-ignore - messages may come from API with different structure
    if (conversation.messages && Array.isArray(conversation.messages)) {
      // @ts-ignore
      return conversation.messages.map((msg: any) => ({
        id: msg._id || msg.id,
        sender: (msg.sender === 'customer' ? 'customer' : 'agent') as 'customer' | 'agent',
        content: msg.text || msg.content,
        timestamp: msg.timestamp || msg.createdAt || new Date().toISOString(),
        type: 'text' as const,
      }));
    }
    
    // Fallback to transcript if no messages (shouldn't happen with new implementation)
    // @ts-ignore - transcript may exist on conversation
    if (conversation.transcript) {
      // @ts-ignore
      const transcript = conversation.transcript;
      const transcriptMessages = [];
      
      // Parse transcript object and convert to message format
      // Transcript format can be:
      // 1. { "0": { role: "user", content: "..." }, "1": { role: "assistant", content: "..." } }
      // 2. Array: [{ role: "user", content: "..." }, { role: "assistant", content: "..." }]
      
      if (Array.isArray(transcript)) {
        for (let i = 0; i < transcript.length; i++) {
          const item = transcript[i];
          if (item && (item.role || item.sender) && (item.content || item.text || item.message)) {
            const role = item.role || item.sender;
            const content = item.content || item.text || item.message;
            transcriptMessages.push({
              id: `transcript-${i}`,
              sender: (role === 'user' || role === 'customer' ? 'customer' : 'agent') as 'customer' | 'agent',
              content,
              timestamp: item.timestamp || conversation.timestamp || new Date().toISOString(),
              type: 'text' as const,
            });
          }
        }
      } else if (typeof transcript === 'object') {
        const keys = Object.keys(transcript).sort((a, b) => {
          const aNum = parseInt(a);
          const bNum = parseInt(b);
          return isNaN(aNum) || isNaN(bNum) ? 0 : aNum - bNum;
        });
        
        for (const key of keys) {
          const item = transcript[key];
          if (item && (item.role || item.sender) && (item.content || item.text || item.message)) {
            const role = item.role || item.sender;
            const content = item.content || item.text || item.message;
            transcriptMessages.push({
              id: `transcript-${key}`,
              sender: (role === 'user' || role === 'customer' ? 'customer' : 'agent') as 'customer' | 'agent',
              content,
              timestamp: item.timestamp || conversation.timestamp || new Date().toISOString(),
              type: 'text' as const,
            });
          }
        }
      }
      
      if (transcriptMessages.length > 0) {
        return transcriptMessages;
      }
    }
    
    // Final fallback to conversation.messages if it exists
    return conversation.messages || [];
  }, [conversation]);

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
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-foreground">
                {conversation.customer.name}
              </h3>
              {/* @ts-ignore */}
              {conversation.transcript && (
                <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  <Phone className="w-3 h-3" />
                  Call Transcript
                </span>
              )}
            </div>
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
        messages={messages}
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

