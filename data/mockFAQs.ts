export interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "What are your business hours?",
    answer: "We are open Monday through Friday from 9:00 AM to 6:00 PM EST. We are closed on weekends and major holidays.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "2",
    question: "How do I reset my password?",
    answer: "To reset your password, click on 'Forgot Password' on the login page. You'll receive an email with instructions to create a new password. The link expires in 24 hours.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "3",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secure and encrypted.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "4",
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping is available and takes 2-3 business days. International shipping times vary by destination.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "5",
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused items in original packaging. Returns are free for defective products. Customer-initiated returns may incur a restocking fee.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "6",
    question: "Do you offer technical support?",
    answer: "Yes! Our technical support team is available 24/7 via chat, email, or phone. Premium customers receive priority support with faster response times.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "7",
    question: "Can I upgrade my plan later?",
    answer: "Absolutely! You can upgrade your plan at any time from your account settings. The new features will be available immediately, and you'll be charged a prorated amount.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: "8",
    question: "Is my data secure?",
    answer: "Yes, we take security very seriously. All data is encrypted at rest and in transit using industry-standard protocols. We are SOC 2 Type II certified and GDPR compliant.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "9",
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period. No refunds for partial months.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "10",
    question: "Do you offer bulk discounts?",
    answer: "Yes! We offer discounts for teams of 10 or more users. Contact our sales team for a custom quote. Enterprise plans include additional features and dedicated support.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "11",
    question: "Can I export my data?",
    answer: "Yes, you can export all your data at any time in CSV or JSON format. Go to Settings > Data Export. The export process may take a few minutes for large datasets.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "12",
    question: "What's included in the free trial?",
    answer: "Our 14-day free trial includes access to all premium features with no credit card required. You can upgrade to a paid plan at any time or continue with our free tier.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
  },
];

