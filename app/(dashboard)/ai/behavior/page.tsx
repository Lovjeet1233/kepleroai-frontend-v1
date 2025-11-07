"use client";

import { useState } from "react";
import { TrainingSidebar } from "@/components/training/TrainingSidebar";
import { PromptEditor } from "@/components/training/PromptEditor";
import { cn } from "@/lib/utils";
import { usePrompt, useUpdatePrompt, useRevertPrompt } from "@/hooks/usePrompts";
import { CardSkeleton } from "@/components/LoadingSkeleton";

export default function AIBehaviorPage() {
  const [promptType, setPromptType] = useState<"chatbot" | "voice">("chatbot");
  
  const { data: promptData, isLoading } = usePrompt(promptType);
  const updatePrompt = useUpdatePrompt(promptType);
  const revertPrompt = useRevertPrompt(promptType);

  const handleSave = async (description: string) => {
    await updatePrompt.mutateAsync({ userInstructions: description });
  };

  const handleRevert = async (version: string) => {
    await revertPrompt.mutateAsync({ version: parseInt(version) });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex" style={{ left: "240px" }}>
        <TrainingSidebar />
        <div className="flex-1 p-8">
          <CardSkeleton count={3} />
        </div>
      </div>
    );
  }

  // Transform prompt data to match PromptEditor's expected format
  const currentPrompt = promptData ? {
    id: promptData.id || `${promptType}-current`,
    type: promptType,
    description: promptData.userInstructions || '',
    systemPrompt: promptData.systemPrompt || '',
    createdAt: promptData.createdAt || new Date().toISOString(),
  } : null;

  const previousVersions = promptData?.previousVersions?.map((v: any) => ({
    id: v.id || `${promptType}-${v.version}`,
    type: promptType,
    description: v.userInstructions || '',
    systemPrompt: v.systemPrompt || '',
    createdAt: v.createdAt || new Date().toISOString(),
  })) || [];

  return (
    <div className="fixed inset-0 flex" style={{ left: "240px" }}>
      <TrainingSidebar />
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full p-6">
          {/* Toggle switch */}
          <div className="mb-6">
            <div className="inline-flex bg-secondary rounded-lg p-1">
              <button
                onClick={() => setPromptType("chatbot")}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all",
                  promptType === "chatbot"
                    ? "bg-primary text-foreground"
                    : "text-muted-foreground hover:text-secondary-foreground"
                )}
              >
                Chatbot Prompt
              </button>
              <button
                onClick={() => setPromptType("voice")}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all",
                  promptType === "voice"
                    ? "bg-primary text-foreground"
                    : "text-muted-foreground hover:text-secondary-foreground"
                )}
              >
                Voice Prompt
              </button>
            </div>
          </div>

          {/* Prompt Editor */}
          {currentPrompt && (
            <PromptEditor
              prompt={currentPrompt}
              previousVersions={previousVersions}
              onSave={handleSave}
              onRevert={handleRevert}
            />
          )}
        </div>
      </div>
    </div>
  );
}

