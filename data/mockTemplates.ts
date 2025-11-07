export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

export const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Greeting",
    content: "Hello! Thank you for contacting us. How can I help you today?",
    category: "General",
  },
  {
    id: "2",
    name: "Order Status",
    content: "Let me check the status of your order. Could you please provide your order number?",
    category: "Orders",
  },
  {
    id: "3",
    name: "Refund Process",
    content: "I understand you'd like to process a refund. I'll be happy to help you with that. The refund will be processed within 5-7 business days.",
    category: "Refunds",
  },
  {
    id: "4",
    name: "Technical Support",
    content: "I'm here to help with your technical issue. Could you please describe the problem you're experiencing in more detail?",
    category: "Support",
  },
  {
    id: "5",
    name: "Thank You",
    content: "Thank you for contacting us! Is there anything else I can help you with today?",
    category: "General",
  },
];

