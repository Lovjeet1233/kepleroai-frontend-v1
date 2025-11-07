"use client";

import { useState } from "react";
import { RotateCcw, Send, Minimize2 } from "lucide-react";
import { mockChatbotSettings } from "@/data/mockSettings";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  content: string;
  timestamp: string;
}

export function WidgetSimulator() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      content: mockChatbotSettings.welcomeMessages.en,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isReady] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: "user" as const,
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot" as const,
        content:
          "Thank you for your message! This is a simulated response. In production, your AI will handle this conversation automatically.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        sender: "bot" as const,
        content: mockChatbotSettings.welcomeMessages.en,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="w-1/2 bg-background p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Preview</h2>
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Open new chat</span>
        </button>
      </div>

      {/* Status indicator */}
      <div className="flex items-center justify-center mb-8">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isReady
              ? "bg-green-500/20 text-green-500"
              : "bg-yellow-500/20 text-yellow-500"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span className="text-sm font-medium">
            {isReady
              ? "🤖 Your AI Chatbot is ready!"
              : "💪 Your AI Chatbot is almost ready..."}
          </span>
        </div>
      </div>

      {/* Widget simulator */}
      <div className="max-w-[400px] mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
                K
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {mockChatbotSettings.customization.chatbotName}
                </h3>
                <p className="text-xs text-indigo-100">Online</p>
              </div>
            </div>
            <button className="text-white hover:bg-white/10 p-1 rounded transition-colors">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-secondary text-white rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-primary hover:brightness-110 text-white rounded-lg flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

