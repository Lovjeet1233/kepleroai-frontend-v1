# IslandAIAI - AI Chatbot Management Platform

A comprehensive Next.js 14 application for managing AI-powered chatbots with a beautiful dark theme UI.

## 🚀 Features

### Authentication
- Hardcoded sign-in system (admin@test.com / admin123)
- Session management with localStorage
- Protected routes with automatic redirection
- User menu with profile and sign-out

### Dashboard Layout
- Collapsible sidebar navigation (240px → 60px)
- 8 main sections with icons (lucide-react)
- Smooth transitions and hover effects
- Dark theme with custom color palette

### Conversations Management
- **3-column layout:**
  - Filters sidebar (260px) - Quick filters, colleagues, folders
  - Conversation list (360px) - Sorted with status badges
  - Detail view (flex-1) - Full conversation thread
- Real-time message display
- Manual control panel with tabs (Conversation / Internal Note)
- Take control / Release to AI functionality
- Message templates and attachments
- Voice message indicators

### AI Training (Knowledge Base)
- **FAQ Management:**
  - Add, edit, delete FAQs
  - Character counters (300/1200)
  - Search functionality
  - Import CSV feature
- **Website Scraping:**
  - Add domains and individual URLs
  - Grouped by domain with checkboxes
  - Update and manage scraped pages
- **File Uploads:**
  - Drag & drop interface (react-dropzone)
  - Supported formats: PDF, DOC, DOCX, TXT, CSV, XLSX
  - File size limit: 100 MB
  - Space usage indicator
- **AI Behavior:**
  - Chatbot/Voice prompt editor
  - Advanced prompt view
  - Version control (revert feature)

### Contacts & Lists
- **Table View:**
  - Avatar, Name, Email, Phone, Tags, Actions
  - Bulk selection and actions
  - Inline editing
- **Kanban View:**
  - Drag & drop cards
  - Custom status columns
  - Count badges per status
- Contact modal with custom properties
- List management (system and custom lists)

### Campaigns
- Campaign builder (multi-step):
  - Step 1: Details (name, list)
  - Step 2: Template & Schedule
  - Step 3: Follow-ups with conditions
- Campaign list table with status badges
- Status tracking: Draft, Scheduled, Sent, Paused
- Open rate and delivery metrics

### Automations
- Visual flow builder:
  - Trigger selection (8 types)
  - Action selection (6 types)
  - Configuration for each
- Automation list with toggle switches
- Active/Inactive status management
- Run count tracking

### Analytics
- **6 Metric Cards:**
  - New Conversations, Closed, Reopened
  - Wrong Answers, Links Clicked, Operator Closed
  - Change indicators with trend arrows
  - Mini line charts (recharts)
- **Charts:**
  - Conversations by Channel (Donut chart)
  - Most Discussed Topics (Horizontal bar chart)
- Date range selector with presets
- Settings modal for chart customization

### Settings
- **Chatbot Settings:**
  - General toggles (4 options)
  - Customization (logo, name, color picker, personality, character)
  - Quick buttons management
  - Welcome messages (multi-language tabs)
  - Notification preferences
- **Team Management:**
  - Operators table with roles (Admin, Operator, Viewer)
  - Add operator modal with permission checkboxes
  - 8 granular permissions
- **Channels:**
  - 5 channel cards (WhatsApp, Email, Phone, Facebook, Instagram)
  - Connection status badges
  - Phone/Voice settings (mode, voice, speed, call forwarding)
- **Additional Sections:**
  - Conversations, Contacts, Analytics, Language & Privacy

### Chatbot Test
- **Split view (2 columns):**
  - Installation guide (left):
    - 4 platform tabs (HTML, Shopify, WordPress, PrestaShop)
    - Code blocks with copy button
    - Advanced attributes (collapsible)
    - Share widget link
  - Live preview (right):
    - Widget simulator with chat interface
    - Status indicator (ready/almost ready)
    - Interactive message testing
    - Reset conversation button

### Profile
- **3 tabs:**
  - Account: Avatar upload, name, email (disabled), phone
  - Billing:
    - Current plan card (gradient background)
    - Usage stats (3 cards with progress bars)
    - Payment method with card details
    - Invoice history table with download
  - Security:
    - Change password form with requirements
    - Two-factor authentication toggle
    - QR code display
    - Backup codes

### UI Components
- **EmptyState:** Icon, title, description, optional CTA
- **ConfirmDialog:** Modal with variants (default/danger)
- **SkeletonCard:** Shimmer animation for loading states
- **Toaster:** Toast notifications (sonner) - bottom-right position
- **Breadcrumb:** Home icon + section + page navigation
- **UserMenu:** Dropdown with profile, settings, help, sign out
- **Header:** Title + breadcrumbs + actions + user menu

### Help & Notifications
- Help page with 4 resource cards
- Notifications page with unread indicators
- Categorized notifications (conversation, team, automation, system)

## 🎨 Design System

### Colors
- Background: `#1a1a1a` (main), `#0a0a0a` (secondary)
- Card: `#141414`
- Sidebar: `#2d2d2d`
- Primary: `#6366f1` (indigo)
- Text: `#e5e5e5`, Muted: `#a3a3a3`
- Borders: `#262626`, `#404040`
- Success: `#10b981`, Error: `#ef4444`, Warning: `#f59e0b`

### Typography
- Font: Geist Sans (variable) & Geist Mono
- Headings: 20px (sections), 24px (page titles)
- Body: 14px, Small: 13px, Tiny: 12px
- Font weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Sizing
- Border radius: 8px (standard), 12px (cards), 16px (large)
- Padding: 8px, 12px, 16px, 24px, 32px
- Heights: 40px (nav items), 44px (inputs), 48px (buttons)
- Gaps: 8px, 12px, 16px, 24px, 32px

### Animations
- Transitions: 150ms (hover), 200ms (modals), 300ms (page)
- Easing: ease-in-out
- Shimmer effect for loading skeletons
- Fade-in and zoom-in for modals
- Hover: brightness(110%)

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **Charts:** recharts
- **Forms:** react-hook-form + zod
- **File Upload:** react-dropzone
- **Notifications:** sonner
- **Date Utilities:** date-fns
- **Command Palette:** cmdk (ready to implement)

## 🗂️ Project Structure

```
├── app/
│   ├── (dashboard)/
│   │   ├── ai/
│   │   ├── analytics/
│   │   ├── automations/
│   │   ├── campaigns/
│   │   ├── chatbot-test/
│   │   ├── contacts/
│   │   ├── conversations/
│   │   ├── help/
│   │   ├── notifications/
│   │   ├── profile/
│   │   └── settings/
│   │       ├── analytics/
│   │       ├── channels/
│   │       ├── chatbot/
│   │       ├── contacts/
│   │       ├── conversations/
│   │       ├── language-privacy/
│   │       └── team/
│   ├── auth/
│   │   └── signin/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── analytics/
│   ├── automations/
│   ├── campaigns/
│   ├── chatbot-test/
│   ├── contacts/
│   ├── conversations/
│   ├── layout/
│   ├── settings/
│   ├── training/
│   └── ui/
├── data/
│   ├── mockAnalytics.ts
│   ├── mockAutomations.ts
│   ├── mockBilling.ts
│   ├── mockCampaigns.ts
│   ├── mockContacts.ts
│   ├── mockConversations.ts
│   ├── mockFAQs.ts
│   ├── mockFiles.ts
│   ├── mockKnowledgeBases.ts
│   ├── mockLists.ts
│   ├── mockOperators.ts
│   ├── mockPrompts.ts
│   ├── mockSettings.ts
│   ├── mockTemplates.ts
│   ├── mockUser.ts
│   └── mockWebsites.ts
├── lib/
│   ├── auth.ts
│   ├── constants.ts
│   ├── types.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Authentication

- **Email:** admin@test.com
- **Password:** admin123

Session is stored in `localStorage` and persists until sign out.

## 📊 Mock Data

All data is currently mocked in the `/data` directory:
- 10-12 conversations with full message threads
- 25+ contacts with various properties
- 10-12 FAQs
- 7-10 campaigns
- 6 operators
- 10+ websites
- 5+ files
- Analytics data with trends
- Billing information

## 🎯 Key Features Implementation

### State Management
- React useState for local component state
- localStorage for authentication persistence
- No external state management library (intentionally kept simple)

### Forms & Validation
- react-hook-form for form handling
- zod for schema validation
- Inline error messages
- Character counters

### Data Visualization
- recharts for all charts (Pie, Donut, Line, Bar)
- Mini trend charts in metric cards
- Custom tooltips and legends
- Responsive sizing

### File Handling
- react-dropzone for drag & drop
- File type validation
- Size limit enforcement (100 MB)
- Preview and management

### Responsive Design
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Mobile: Sidebar overlay, full-width cards
- Tablet: Single column grids
- Desktop: Full multi-column layouts

## 🔮 Future Enhancements

- [ ] Command palette (⌘K / Ctrl+K) with cmdk
- [ ] Keyboard shortcuts helper (⌘/ / Ctrl+/)
- [ ] Real-time WebSocket connections
- [ ] Backend API integration
- [ ] Database persistence
- [ ] Advanced search with filters
- [ ] Export functionality (CSV, PDF)
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Mobile app (React Native)

## 📝 License

This project is private and proprietary.

## 👥 Team

Built for IslandAIAI by the development team.

---

**Version:** 1.0.0
**Last Updated:** October 29, 2025
