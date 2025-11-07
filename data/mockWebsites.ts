export interface WebsitePage {
  id: string;
  url: string;
  selected: boolean;
}

export interface Website {
  id: string;
  domain: string;
  pages: WebsitePage[];
  addedAt: string;
}

export const mockWebsites: Website[] = [
  {
    id: "1",
    domain: "example.com",
    addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    pages: [
      { id: "1-1", url: "https://example.com/", selected: true },
      { id: "1-2", url: "https://example.com/about", selected: true },
      { id: "1-3", url: "https://example.com/products", selected: true },
      { id: "1-4", url: "https://example.com/pricing", selected: false },
      { id: "1-5", url: "https://example.com/contact", selected: true },
      { id: "1-6", url: "https://example.com/blog", selected: false },
      { id: "1-7", url: "https://example.com/support", selected: true },
    ],
  },
  {
    id: "2",
    domain: "docs.example.com",
    addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    pages: [
      { id: "2-1", url: "https://docs.example.com/", selected: true },
      { id: "2-2", url: "https://docs.example.com/getting-started", selected: true },
      { id: "2-3", url: "https://docs.example.com/api", selected: true },
      { id: "2-4", url: "https://docs.example.com/tutorials", selected: true },
      { id: "2-5", url: "https://docs.example.com/faq", selected: false },
    ],
  },
  {
    id: "3",
    domain: "blog.example.com",
    addedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    pages: [
      { id: "3-1", url: "https://blog.example.com/", selected: true },
      { id: "3-2", url: "https://blog.example.com/2024/01/product-launch", selected: true },
      { id: "3-3", url: "https://blog.example.com/2024/02/feature-update", selected: false },
      { id: "3-4", url: "https://blog.example.com/2024/03/company-news", selected: true },
      { id: "3-5", url: "https://blog.example.com/category/updates", selected: false },
      { id: "3-6", url: "https://blog.example.com/category/tutorials", selected: true },
      { id: "3-7", url: "https://blog.example.com/about-us", selected: false },
      { id: "3-8", url: "https://blog.example.com/contact", selected: false },
    ],
  },
];

