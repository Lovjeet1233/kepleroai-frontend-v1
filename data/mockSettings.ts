export interface ChatbotSettings {
  general: {
    enableWebsiteWidget: boolean;
    emailRequired: boolean;
    phoneRequired: boolean;
    bubbleMessages: boolean;
  };
  customization: {
    logo: string | null;
    chatbotName: string;
    widgetColor: string;
    personality: "neutral" | "casual" | "formal";
    character: "adventurous" | "confident" | "convincing" | "energetic" | "friendly" | "funny" | "professional";
  };
  quickButtons: Array<{ id: string; text: string }>;
  welcomeMessages: {
    [language: string]: string;
  };
  notifications: {
    newConversation: boolean;
    contactFormSubmitted: boolean;
    supportRequest: boolean;
    operatorMentioned: boolean;
  };
}

export const mockChatbotSettings: ChatbotSettings = {
  general: {
    enableWebsiteWidget: true,
    emailRequired: false,
    phoneRequired: false,
    bubbleMessages: true,
  },
  customization: {
    logo: null,
    chatbotName: "Support Assistant",
    widgetColor: "#6366f1",
    personality: "neutral",
    character: "friendly",
  },
  quickButtons: [
    { id: "1", text: "Contact Support" },
    { id: "2", text: "View Pricing" },
    { id: "3", text: "Track Order" },
  ],
  welcomeMessages: {
    en: "Hello! How can I help you today?",
    es: "¡Hola! ¿Cómo puedo ayudarte hoy?",
    fr: "Bonjour! Comment puis-je vous aider aujourd'hui?",
  },
  notifications: {
    newConversation: true,
    contactFormSubmitted: true,
    supportRequest: true,
    operatorMentioned: true,
  },
};

export const presetColors = [
  "#6366f1", // Indigo
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Green
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#6b7280", // Gray
];

