export interface Campaign {
  id: string;
  name: string;
  contactList: string;
  status: "draft" | "scheduled" | "sent";
  scheduledDate?: string;
  sentCount: number;
  openedCount: number;
  createdAt: string;
}

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Spring Sale Announcement",
    contactList: "Newsletter",
    status: "sent",
    sentCount: 1250,
    openedCount: 875,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "2",
    name: "New Product Launch",
    contactList: "All",
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    sentCount: 0,
    openedCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "3",
    name: "VIP Exclusive Offer",
    contactList: "VIP Customers",
    status: "sent",
    sentCount: 450,
    openedCount: 390,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "4",
    name: "Weekly Newsletter #24",
    contactList: "Newsletter",
    status: "sent",
    sentCount: 1100,
    openedCount: 680,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "5",
    name: "Customer Feedback Survey",
    contactList: "All",
    status: "draft",
    sentCount: 0,
    openedCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: "6",
    name: "Holiday Special Campaign",
    contactList: "VIP Customers",
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    sentCount: 0,
    openedCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "7",
    name: "Product Update Notification",
    contactList: "All",
    status: "sent",
    sentCount: 2100,
    openedCount: 1450,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: "8",
    name: "Flash Sale Alert",
    contactList: "Newsletter",
    status: "draft",
    sentCount: 0,
    openedCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "9",
    name: "Welcome Series - Day 1",
    contactList: "From Contact Form",
    status: "sent",
    sentCount: 850,
    openedCount: 620,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: "10",
    name: "Re-engagement Campaign",
    contactList: "All",
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    sentCount: 0,
    openedCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

