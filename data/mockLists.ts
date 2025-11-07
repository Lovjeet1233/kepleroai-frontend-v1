export interface ContactList {
  id: string;
  name: string;
  icon: "lock" | "folder";
  count: number;
  isSystem: boolean;
}

export const mockLists: ContactList[] = [
  {
    id: "all",
    name: "All",
    icon: "lock",
    count: 25,
    isSystem: true,
  },
  {
    id: "contact-form",
    name: "From Contact Form",
    icon: "lock",
    count: 12,
    isSystem: true,
  },
  {
    id: "vip",
    name: "VIP Customers",
    icon: "folder",
    count: 8,
    isSystem: false,
  },
  {
    id: "newsletter",
    name: "Newsletter",
    icon: "folder",
    count: 15,
    isSystem: false,
  },
];

