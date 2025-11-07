"use client";

import { useState } from "react";
import { Upload, Plus, Pencil, Trash2 } from "lucide-react";
import { mockChatbotSettings } from "@/data/mockSettings";
import { ToggleRow } from "@/components/settings/ToggleRow";
import { ColorPicker } from "@/components/settings/ColorPicker";

export default function ChatbotSettingsPage() {
  const [settings, setSettings] = useState(mockChatbotSettings);
  const [activeLanguage, setActiveLanguage] = useState("en");

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // TODO: Implement save logic
  };

  return (
    <div className="p-8">
      <div className="max-w-[900px] mx-auto space-y-6">
        {/* Section 1 - General */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">General</h2>
          
          <div className="space-y-0">
            <ToggleRow
              label="Enable website widget"
              description="Show the chat widget on your website"
              checked={settings.general.enableWebsiteWidget}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, enableWebsiteWidget: checked },
                })
              }
            />
            <ToggleRow
              label="Email required"
              description="Require email before starting conversation"
              checked={settings.general.emailRequired}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, emailRequired: checked },
                })
              }
            />
            <ToggleRow
              label="Phone required"
              description="Require phone number before starting conversation"
              checked={settings.general.phoneRequired}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, phoneRequired: checked },
                })
              }
            />
            <ToggleRow
              label="Bubble messages"
              description="Show messages in bubble style"
              checked={settings.general.bubbleMessages}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, bubbleMessages: checked },
                })
              }
              isLast
            />
          </div>
        </div>

        {/* Section 2 - Customization */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">Customization</h2>
          
          <div className="grid gap-5">
            {/* Logo upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Logo
              </label>
              <button className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center hover:border-primary transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            {/* Chatbot name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Chatbot Name
              </label>
              <input
                value={settings.customization.chatbotName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    customization: { ...settings.customization, chatbotName: e.target.value },
                  })
                }
                className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Color picker */}
            <ColorPicker
              selectedColor={settings.customization.widgetColor}
              onColorChange={(color) =>
                setSettings({
                  ...settings,
                  customization: { ...settings.customization, widgetColor: color },
                })
              }
            />

            {/* Personality */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Personality
              </label>
              <select
                value={settings.customization.personality}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    customization: {
                      ...settings.customization,
                      personality: e.target.value as any,
                    },
                  })
                }
                className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="neutral">Neutral 👋</option>
                <option value="casual">Casual 🤙</option>
                <option value="formal">Formal 🤝</option>
              </select>
            </div>

            {/* Character */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Character
              </label>
              <select
                value={settings.customization.character}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    customization: {
                      ...settings.customization,
                      character: e.target.value as any,
                    },
                  })
                }
                className="w-full h-11 bg-secondary border border-border rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="adventurous">Adventurous 🦁</option>
                <option value="confident">Confident 💪</option>
                <option value="convincing">Convincing 🤝</option>
                <option value="energetic">Energetic ⚡</option>
                <option value="friendly">Friendly 🙂</option>
                <option value="funny">Funny 🤣</option>
                <option value="professional">Professional 💼</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3 - Quick Buttons */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">Quick Buttons</h2>
          
          <div className="space-y-2">
            {settings.quickButtons.map((button, index) => (
              <div
                key={button.id}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg"
              >
                <span className="text-sm text-foreground">{button.text}</span>
                <div className="flex gap-2">
                  <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            
            <button className="w-full h-12 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-foreground transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Button</span>
            </button>
          </div>
        </div>

        {/* Section 4 - Welcome Messages */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">Welcome Messages</h2>
          
          <div className="flex gap-2 mb-4">
            {Object.keys(settings.welcomeMessages).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeLanguage === lang
                    ? "bg-primary text-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <textarea
            value={settings.welcomeMessages[activeLanguage]}
            onChange={(e) =>
              setSettings({
                ...settings,
                welcomeMessages: {
                  ...settings.welcomeMessages,
                  [activeLanguage]: e.target.value,
                },
              })
            }
            className="w-full min-h-[100px] bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground resize-none focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Section 5 - Notifications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">Notifications</h2>
          
          <div className="space-y-3">
            {[
              { key: "newConversation", label: "New conversation started" },
              { key: "contactFormSubmitted", label: "Contact form submitted" },
              { key: "supportRequest", label: "Support request from chat" },
              { key: "operatorMentioned", label: "Operator mentioned" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 h-12 px-3 cursor-pointer hover:bg-secondary rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={settings.notifications[key as keyof typeof settings.notifications]}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: e.target.checked,
                      },
                    })
                  }
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-background">
          <button
            onClick={handleSave}
            className="w-full h-12 bg-primary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

