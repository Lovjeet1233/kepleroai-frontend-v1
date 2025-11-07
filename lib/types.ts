export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "operator" | "viewer";
  phone?: string;
  createdAt: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  color: string;
}

export type Channel = "whatsapp" | "website" | "email" | "social" | "phone";
export type ConversationStatus = "open" | "unread" | "support_request" | "closed";

export interface Message {
  id: string;
  sender: "customer" | "agent";
  content: string;
  timestamp: string;
  type: "text" | "voice" | "image" | "file";
}

export interface Conversation {
  id: string;
  customer: Customer;
  channel: Channel;
  status: ConversationStatus;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  labels: string[];
  folder: string | null;
  messages: Message[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface Website {
  id: string;
  domain: string;
  urls: string[];
  lastUpdated: string;
  status: "active" | "pending" | "error";
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  status: "active" | "processing" | "error";
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  color: string;
  tags: string[];
  lists: string[];
  status: string;
  createdAt: string;
}

export interface ContactList {
  id: string;
  name: string;
  contactCount: number;
  isSystem: boolean;
  icon?: string;
}

export interface Campaign {
  id: string;
  name: string;
  listId: string;
  listName: string;
  status: "draft" | "scheduled" | "sent" | "paused";
  scheduledDate?: string;
  sentCount: number;
  openedCount: number;
  template: string;
  createdAt: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: {
    type: string;
    config: Record<string, any>;
  };
  action: {
    type: string;
    config: Record<string, any>;
  };
  isActive: boolean;
  runsCount: number;
  createdAt: string;
}

export interface AnalyticsMetric {
  name: string;
  value: number;
  change: number;
  trend: number[];
}

export interface Operator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  color: string;
  role: "admin" | "operator" | "viewer";
  permissions: string[];
  createdAt: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export interface ChatbotSettings {
  general: {
    enableWebsiteWidget: boolean;
    emailRequired: boolean;
    phoneRequired: boolean;
    bubbleMessages: boolean;
  };
  customization: {
    chatbotName: string;
    widgetColor: string;
    personality: "neutral" | "casual" | "formal";
    character: "adventurous" | "confident" | "convincing" | "energetic" | "friendly" | "funny" | "professional";
  };
  quickButtons: Array<{
    id: string;
    text: string;
    action: string;
  }>;
  welcomeMessages: {
    en: string;
    es: string;
    fr: string;
  };
  notifications: {
    newConversation: boolean;
    contactFormSubmitted: boolean;
    supportRequest: boolean;
    operatorMentioned: boolean;
  };
}

export interface BillingPlan {
  name: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
}

export interface UsageStat {
  label: string;
  value: number;
  limit: number;
  unit: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  downloadUrl: string;
}

export interface ToastType {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}

