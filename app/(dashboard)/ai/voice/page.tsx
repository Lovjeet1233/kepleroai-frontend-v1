"use client";

import { useState } from "react";
import { TrainingSidebar } from "@/components/training/TrainingSidebar";
import { PromptEditor } from "@/components/training/PromptEditor";
import { mockPrompts } from "@/data/mockPrompts";

export default function VoiceAgentPage() {
  const voicePrompt = mockPrompts.find((p) => p.type === "voice") || mockPrompts[1];
  const previousVersions = mockPrompts.filter((p) => p.type === "voice" && p.id !== voicePrompt.id);

  const handleSave = (description: string) => {
    console.log("Saving voice prompt:", description);
    // TODO: Implement save logic
  };

  const handleRevert = (promptId: string) => {
    console.log("Reverting to prompt:", promptId);
    // TODO: Implement revert logic
  };

  return (
    <div className="flex h-full">
      <TrainingSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Voice Agent Behavior</h1>
        <p className="text-muted-foreground mb-8">
          Configure how your AI voice agent responds to phone calls
        </p>

        <PromptEditor
          prompt={voicePrompt}
          previousVersions={previousVersions}
          onSave={handleSave}
          onRevert={handleRevert}
        />
      </div>
    </div>
  );
}

