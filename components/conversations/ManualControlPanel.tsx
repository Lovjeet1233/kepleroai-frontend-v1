"use client";

import { useState } from "react";
import { Zap, Paperclip, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface ManualControlPanelProps {
  isManualControl: boolean;
  onTakeControl: () => void;
  onReleaseControl: () => void;
  onSendMessage: (message: string, isInternal: boolean) => void;
}

export function ManualControlPanel({
  isManualControl,
  onTakeControl,
  onReleaseControl,
  onSendMessage,
}: ManualControlPanelProps) {
  const [activeTab, setActiveTab] = useState<"conversation" | "internal">("conversation");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, activeTab === "internal");
      setMessage("");
    }
  };

  if (!isManualControl) {
    return (
      <div className="border-t border-border p-4">
        <button
          onClick={onTakeControl}
          className="w-full h-11 bg-primary rounded-lg text-foreground text-sm font-medium hover:brightness-110 transition-all"
        >
          Take Control
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-border">
      {/* Tabs */}
      <div className="flex px-4 pt-3 border-b border-border">
        <button
          onClick={() => setActiveTab("conversation")}
          className={cn(
            "px-4 pb-3 text-sm font-medium transition-colors relative",
            activeTab === "conversation"
              ? "text-foreground"
              : "text-muted-foreground hover:text-secondary-foreground"
          )}
        >
          Conversation
          {activeTab === "conversation" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("internal")}
          className={cn(
            "px-4 pb-3 text-sm font-medium transition-colors relative",
            activeTab === "internal"
              ? "text-foreground"
              : "text-muted-foreground hover:text-secondary-foreground"
          )}
        >
          Internal Note
          {activeTab === "internal" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Input area */}
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          {/* Text input */}
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                activeTab === "conversation"
                  ? "Type your message..."
                  : "Add an internal note..."
              }
              className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary transition-colors"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          {/* Button column */}
          <div className="flex flex-col gap-2">
            <button
              className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Templates"
            >
              <Zap className="w-4 h-4" />
            </button>
            <button
              className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Attachments"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Emoji"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="px-5 py-2.5 bg-primary rounded-lg text-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
          <button
            onClick={onReleaseControl}
            className="px-5 py-2.5 bg-secondary rounded-lg text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
          >
            Release to Kepler
          </button>
        </div>
      </div>
    </div>
  );
}

