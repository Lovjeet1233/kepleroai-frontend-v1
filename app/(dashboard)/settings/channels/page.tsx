"use client";

import { MessageCircle, Mail, Phone, Facebook, Instagram } from "lucide-react";

const channels = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    status: "connected",
    description: "Connect your WhatsApp Business account",
  },
  {
    id: "email",
    name: "Email",
    icon: Mail,
    status: "connected",
    description: "Manage email conversations",
  },
  {
    id: "phone",
    name: "Phone (Voice)",
    icon: Phone,
    status: "connected",
    description: "AI-powered voice conversations",
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    icon: Facebook,
    status: "not_connected",
    description: "Connect Facebook Messenger",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    status: "not_connected",
    description: "Connect Instagram Direct Messages",
  },
];

export default function ChannelsSettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Channels</h1>

      <div className="grid grid-cols-2 gap-6">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isConnected = channel.status === "connected";

          return (
            <div
              key={channel.id}
              className="bg-card border border-border rounded-xl p-6 h-[180px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium ${
                    isConnected
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-muted-foreground"
                  }`}
                >
                  {isConnected ? "Connected" : "Not Connected"}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{channel.name}</h3>
              <p className="text-sm text-muted-foreground mb-auto">{channel.description}</p>

              <button className="w-full mt-4 h-10 bg-primary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all">
                Configure
              </button>
            </div>
          );
        })}
      </div>

      {/* Phone (Voice) Settings Example */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Phone (Voice) Settings</h2>

        <div className="space-y-6">
          {/* Voice mode tabs */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Voice Mode</label>
            <div className="inline-flex bg-secondary rounded-lg p-1">
              <button className="px-6 py-2 rounded-md text-sm font-medium bg-primary text-foreground transition-all">
                Realistic Mode
              </button>
              <button className="px-6 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-all">
                Efficient Mode
              </button>
            </div>
          </div>

          {/* Voice selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Voice</label>
            <select className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
              <option>Sarah - Female (US English)</option>
              <option>John - Male (US English)</option>
              <option>Emma - Female (UK English)</option>
              <option>James - Male (UK English)</option>
            </select>
          </div>

          {/* Voice speed slider */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Voice Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              defaultValue="1"
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0.5x</span>
              <span>1x</span>
              <span>2x</span>
            </div>
          </div>

          {/* Call forwarding */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Call Forwarding</label>
            <div className="space-y-2">
              <div className="bg-background border border-border rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Activate:</div>
                <code className="text-[13px] text-foreground font-mono">*21*NUMBER#</code>
              </div>
              <div className="bg-background border border-border rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Check:</div>
                <code className="text-[13px] text-foreground font-mono">*#21#</code>
              </div>
              <div className="bg-background border border-border rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Deactivate:</div>
                <code className="text-[13px] text-foreground font-mono">#21#</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

