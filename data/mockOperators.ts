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

export const mockOperators: Operator[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "JD",
    color: "#6366f1",
    role: "admin",
    permissions: ["conversations", "training", "automations", "contacts", "campaigns", "chatbot_test", "analytics", "settings"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    avatar: "JS",
    color: "#8b5cf6",
    role: "operator",
    permissions: ["conversations", "contacts", "chatbot_test", "analytics"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    avatar: "MJ",
    color: "#ec4899",
    role: "operator",
    permissions: ["conversations", "training", "contacts", "campaigns", "analytics"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    avatar: "SW",
    color: "#f59e0b",
    role: "viewer",
    permissions: ["conversations", "analytics"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    avatar: "DB",
    color: "#10b981",
    role: "operator",
    permissions: ["conversations", "automations", "contacts", "campaigns"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "6",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    avatar: "ED",
    color: "#3b82f6",
    role: "operator",
    permissions: ["conversations", "training", "chatbot_test"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
];

export const availablePermissions = [
  { id: "conversations", label: "Conversations" },
  { id: "training", label: "Training" },
  { id: "automations", label: "Automations" },
  { id: "contacts", label: "Contacts" },
  { id: "campaigns", label: "Campaigns" },
  { id: "chatbot_test", label: "Chatbot Test" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];

