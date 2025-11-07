export interface DailyMetric {
  date: string;
  newConversations: number;
  closedConversations: number;
  reopenedConversations: number;
  wrongAnswers: number;
  linksClicked: number;
  closedByOperators: number;
}

export interface ChannelData {
  channel: string;
  count: number;
  color: string;
}

export interface TopicData {
  topic: string;
  count: number;
}

// Generate 90 days of data
const generateDailyData = (): DailyMetric[] => {
  const data: DailyMetric[] = [];
  const now = Date.now();
  
  for (let i = 90; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toISOString().split('T')[0],
      newConversations: Math.floor(Math.random() * 50) + 100,
      closedConversations: Math.floor(Math.random() * 40) + 80,
      reopenedConversations: Math.floor(Math.random() * 10) + 5,
      wrongAnswers: Math.floor(Math.random() * 15) + 3,
      linksClicked: Math.floor(Math.random() * 30) + 20,
      closedByOperators: Math.floor(Math.random() * 20) + 10,
    });
  }
  
  return data;
};

export const mockDailyMetrics: DailyMetric[] = generateDailyData();

export const mockChannelData: ChannelData[] = [
  { channel: "WhatsApp", count: 4500, color: "#10b981" },
  { channel: "Website", count: 3200, color: "#3b82f6" },
  { channel: "Email", count: 1800, color: "#8b5cf6" },
  { channel: "Social", count: 1200, color: "#ec4899" },
  { channel: "Phone", count: 800, color: "#f59e0b" },
];

export const mockTopicData: TopicData[] = [
  { topic: "Order Status", count: 450 },
  { topic: "Product Information", count: 380 },
  { topic: "Shipping & Delivery", count: 320 },
  { topic: "Returns & Refunds", count: 280 },
  { topic: "Account Issues", count: 240 },
  { topic: "Payment Problems", count: 190 },
  { topic: "Technical Support", count: 150 },
  { topic: "General Inquiry", count: 120 },
];

// Calculate aggregate metrics for different time periods
export const calculateMetrics = (days: number) => {
  const recentData = mockDailyMetrics.slice(-days);
  const previousData = mockDailyMetrics.slice(-(days * 2), -days);
  
  const sum = (data: DailyMetric[], key: keyof DailyMetric) =>
    data.reduce((acc, item) => acc + (typeof item[key] === 'number' ? item[key] as number : 0), 0);
  
  const calculateChange = (current: number, previous: number) =>
    previous === 0 ? 0 : Math.round(((current - previous) / previous) * 100);
  
  const metrics = {
    newConversations: {
      value: sum(recentData, 'newConversations'),
      change: calculateChange(
        sum(recentData, 'newConversations'),
        sum(previousData, 'newConversations')
      ),
    },
    closedConversations: {
      value: sum(recentData, 'closedConversations'),
      change: calculateChange(
        sum(recentData, 'closedConversations'),
        sum(previousData, 'closedConversations')
      ),
    },
    reopenedConversations: {
      value: sum(recentData, 'reopenedConversations'),
      change: calculateChange(
        sum(recentData, 'reopenedConversations'),
        sum(previousData, 'reopenedConversations')
      ),
    },
    wrongAnswers: {
      value: sum(recentData, 'wrongAnswers'),
      change: calculateChange(
        sum(recentData, 'wrongAnswers'),
        sum(previousData, 'wrongAnswers')
      ),
    },
    linksClicked: {
      value: sum(recentData, 'linksClicked'),
      change: calculateChange(
        sum(recentData, 'linksClicked'),
        sum(previousData, 'linksClicked')
      ),
    },
    closedByOperators: {
      value: sum(recentData, 'closedByOperators'),
      change: calculateChange(
        sum(recentData, 'closedByOperators'),
        sum(previousData, 'closedByOperators')
      ),
    },
  };
  
  return metrics;
};

export const getChartData = (days: number) => {
  return mockDailyMetrics.slice(-days);
};

