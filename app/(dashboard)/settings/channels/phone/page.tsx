"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePhoneSettings } from "@/hooks/usePhoneSettings";
import { useAIBehavior } from "@/hooks/useAIBehavior";
import { VOICE_OPTIONS } from "@/services/phoneSettings.service";
import { toast } from "sonner";

export default function PhoneSettingsDetailPage() {
  const router = useRouter();
  const { settings, isLoading, updateSettings, isUpdating } = usePhoneSettings();
  const { aiBehavior, updateVoiceAgentHumanOperator } = useAIBehavior();

  const [activeTab, setActiveTab] = useState<"settings" | "endOfCall">("settings");
  const [copied, setCopied] = useState(false);

  // Form state
  const [selectedVoice, setSelectedVoice] = useState(settings?.selectedVoice || "adam");
  const [twilioPhoneNumber, setTwilioPhoneNumber] = useState(settings?.twilioPhoneNumber || "");
  const [livekitSipTrunkId, setLivekitSipTrunkId] = useState(settings?.livekitSipTrunkId || "");
  const [humanOperatorPhone, setHumanOperatorPhone] = useState(settings?.humanOperatorPhone || "");
  const [escalationRules, setEscalationRules] = useState<string[]>(
    aiBehavior?.voiceAgent?.humanOperator?.escalationRules || []
  );

  // Update form state when settings load
  useEffect(() => {
    if (settings) {
      setSelectedVoice(settings.selectedVoice);
      setTwilioPhoneNumber(settings.twilioPhoneNumber);
      setLivekitSipTrunkId(settings.livekitSipTrunkId);
      setHumanOperatorPhone(settings.humanOperatorPhone);
    }
  }, [settings]);

  useEffect(() => {
    if (aiBehavior?.voiceAgent?.humanOperator?.escalationRules) {
      setEscalationRules(aiBehavior.voiceAgent.humanOperator.escalationRules);
    }
  }, [aiBehavior]);

  const handleSaveSettings = () => {
    updateSettings({
      selectedVoice,
      twilioPhoneNumber,
      livekitSipTrunkId,
      humanOperatorPhone,
    });
  };

  const handleSaveEscalationRules = () => {
    if (!aiBehavior) return;

    updateVoiceAgentHumanOperator.mutate({
      escalationRules,
    });
  };

  const handleCopyNumber = () => {
    if (settings?.twilioPhoneNumber) {
      navigator.clipboard.writeText(settings.twilioPhoneNumber);
      setCopied(true);
      toast.success("Phone number copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const addEscalationRule = () => {
    setEscalationRules([...escalationRules, ""]);
  };

  const updateEscalationRule = (index: number, value: string) => {
    const updated = [...escalationRules];
    updated[index] = value;
    setEscalationRules(updated);
  };

  const removeEscalationRule = (index: number) => {
    setEscalationRules(escalationRules.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-secondary rounded mb-6"></div>
          <div className="h-64 bg-card rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/settings/channels")}
            className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Phone (Voice) Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your voice agent and phone integration
            </p>
          </div>
        </div>

        {settings?.isConfigured && settings.twilioPhoneNumber && (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <div className="text-xs text-green-400 font-medium mb-0.5">Number Connected</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-foreground">{settings.twilioPhoneNumber}</span>
                <button
                  onClick={handleCopyNumber}
                  className="p-1 hover:bg-green-500/10 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-lg p-1 mb-6 max-w-md">
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "settings"
              ? "bg-primary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Settings
        </button>
        <button
          onClick={() => setActiveTab("endOfCall")}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "endOfCall"
              ? "bg-primary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          End of Call
        </button>
      </div>

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-card border border-border rounded-xl p-6 max-w-2xl">
          <div className="space-y-6">
            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Voice <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                {VOICE_OPTIONS.map((voice) => (
                  <option key={voice.value} value={voice.value}>
                    {voice.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                Select the voice for your AI agent. You can preview voices in the AI Behavior section.
              </p>
            </div>

            {/* Twilio Phone Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Twilio Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={twilioPhoneNumber}
                onChange={(e) => setTwilioPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Enter your Twilio phone number in E.164 format (e.g., +1234567890)
              </p>
            </div>

            {/* LiveKit SIP Trunk ID */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                LiveKit SIP Trunk ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={livekitSipTrunkId}
                onChange={(e) => setLivekitSipTrunkId(e.target.value)}
                placeholder="ST_xxxxxxxxxxxxxxxxxx"
                className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Your LiveKit SIP Trunk ID from the LiveKit Console
              </p>
            </div>

            {/* Human Operator Phone Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Human Operator Phone Number (Transfer To)
              </label>
              <input
                type="text"
                value={humanOperatorPhone}
                onChange={(e) => setHumanOperatorPhone(e.target.value)}
                placeholder="+1234567890"
                className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Phone number to transfer calls to when escalation conditions are met (E.164 format)
              </p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveSettings}
                disabled={isUpdating || !selectedVoice || !twilioPhoneNumber || !livekitSipTrunkId}
                className="h-11 px-6 bg-primary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End of Call Tab */}
      {activeTab === "endOfCall" && (
        <div className="bg-card border border-border rounded-xl p-6 max-w-2xl">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Escalation Conditions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Define when calls should be escalated to a human operator
                  </p>
                </div>
                <button
                  onClick={addEscalationRule}
                  className="h-9 px-4 bg-secondary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all"
                >
                  Add Rule
                </button>
              </div>

              <div className="space-y-3">
                {escalationRules.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No escalation rules defined. Click "Add Rule" to create one.
                  </div>
                ) : (
                  escalationRules.map((rule, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => updateEscalationRule(index, e.target.value)}
                        placeholder="e.g., Customer requests to speak with human"
                        className="flex-1 h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                      <button
                        onClick={() => removeEscalationRule(index)}
                        className="h-11 px-4 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-400 mb-2">Example Escalation Rules:</h4>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>• Customer explicitly requests to speak with a human operator</li>
                  <li>• Customer expresses frustration or anger</li>
                  <li>• Complex technical issue that requires human expertise</li>
                  <li>• Request for refund or account changes</li>
                  <li>• Multiple failed attempts to resolve the issue</li>
                </ul>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveEscalationRules}
                disabled={updateVoiceAgentHumanOperator.isPending}
                className="h-11 px-6 bg-primary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateVoiceAgentHumanOperator.isPending ? "Saving..." : "Save Escalation Rules"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

