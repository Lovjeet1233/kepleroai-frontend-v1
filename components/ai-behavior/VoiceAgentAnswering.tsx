"use client";

import { useState, useEffect } from "react";
import { Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useKnowledgeBase } from "@/contexts/KnowledgeBaseContext";
import { toast } from "sonner";

export function VoiceAgentAnswering() {
  const { voiceAgentPrompt, setVoiceAgentPrompt } = useKnowledgeBase();
  const [improvements, setImprovements] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setImprovements(voiceAgentPrompt);
  }, [voiceAgentPrompt]);

  return (
    <div className="space-y-6">
      {/* Main Question */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What would you like to improve?
            </h3>
            <p className="text-sm text-muted-foreground">
              Describe how you want your AI voice agent to respond during phone calls
            </p>
          </div>
        </div>

        <textarea
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
          placeholder="E.g., Speak clearly and at a moderate pace, be empathetic when handling complaints, confirm important information before ending calls..."
          rows={6}
          className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button 
            onClick={() => {
              const defaultPrompt = "You are a helpful AI voice assistant. Speak clearly and be empathetic.";
              setImprovements(defaultPrompt);
              setVoiceAgentPrompt(defaultPrompt);
            }}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={async () => {
              if (improvements.trim()) {
                setVoiceAgentPrompt(improvements);
                
                try {
                  const response = await fetch('/api/v1/ai-behavior/voice-agent/prompt', {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ systemPrompt: improvements })
                  });
                  
                  if (response.ok) {
                    toast.success('Voice agent prompt saved to database!');
                  } else {
                    toast.error('Failed to save prompt');
                  }
                } catch (error) {
                  console.error('Error saving voice agent prompt:', error);
                }
              }
            }}
            className="px-6 py-2 bg-primary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all"
          >
            Save Prompt
          </button>
        </div>
      </div>

      {/* Advanced Section */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-foreground">Advanced Settings</div>
            <span className="text-xs text-muted-foreground">
              Manually edit the voice agent prompt
            </span>
          </div>
          {showAdvanced ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {showAdvanced && (
          <div className="px-6 pb-6 pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              This is the current system prompt that will be used for your AI voice agent
            </p>
            <div className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground font-mono whitespace-pre-wrap min-h-[200px]">
              {voiceAgentPrompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

