"use client";

import { Message } from "@/data/mockConversations";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  customerColor: string;
  customerAvatar: string;
}

export function MessageBubble({
  message,
  customerColor,
  customerAvatar,
}: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const isCustomer = message.sender === "customer";

  return (
    <div
      className={cn(
        "flex gap-3",
        isCustomer ? "justify-start" : "justify-end"
      )}
    >
      {/* Avatar for customer messages */}
      {isCustomer && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0"
          style={{ backgroundColor: customerColor }}
        >
          {customerAvatar}
        </div>
      )}

      {/* Message content */}
      <div className={cn("flex flex-col", isCustomer ? "items-start" : "items-end", "max-w-[70%]")}>
        <div
          className={cn(
            "px-4 py-3 text-white text-sm",
            isCustomer
              ? "bg-secondary rounded-[12px_12px_12px_4px]"
              : "bg-primary rounded-[12px_12px_4px_12px]"
          )}
        >
          {message.content}
        </div>
        
        {/* Timestamp and translate button */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          {isCustomer && (
            <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              Translate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

