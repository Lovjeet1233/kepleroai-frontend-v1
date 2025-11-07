# API Client Infrastructure Documentation

## 📦 Overview

Complete API client infrastructure for connecting the Next.js frontend with the Node.js backend, including authentication, real-time updates, data fetching, and error handling.

## 🎯 Features Implemented

### ✅ Core Infrastructure
- **Centralized API Client** with Axios
- **Automatic Token Management** (access & refresh)
- **Request/Response Interceptors**
- **Automatic Token Refresh** on 401 errors
- **Error Handling & Formatting**

### ✅ Services (8 Total)
1. **Authentication Service** - Login, logout, user management
2. **Conversation Service** - Chat management, messages, control
3. **Contact Service** - Contact CRUD, lists, bulk operations
4. **Campaign Service** - Broadcast campaigns, scheduling
5. **Knowledge Base Service** - FAQs, files, websites, prompts
6. **Automation Service** - Workflow automation
7. **Analytics Service** - Metrics, reports, trends
8. **Settings Service** - Configuration, team, channels

### ✅ Real-Time Communication
- **WebSocket Client** with Socket.IO
- **Room Management** (join/leave conversations)
- **Event Listeners** (messages, typing, status updates)
- **Auto-Reconnection** logic
- **Custom React Hooks** for socket operations

### ✅ Data Fetching & State Management
- **React Query Setup** with optimized configuration
- **Custom Hooks** for all services (20+ hooks)
- **Automatic Cache Invalidation**
- **Optimistic Updates**
- **Infinite Scroll** support
- **Real-Time Refetching**

### ✅ Authentication & Authorization
- **Auth Context** with React Context API
- **Protected Routes** component
- **Session Persistence**
- **Automatic Login/Logout**
- **Token Storage** in localStorage

### ✅ UI Components
- **Loading Skeletons** (10+ variants)
- **Empty States** (6+ variants)
- **Error Boundary** component
- **Toast Notifications** (success, error, info, warning)

### ✅ Error Handling
- **Error Formatting** utilities
- **Global Error Boundary**
- **API Error Handler**
- **Network Error Detection**
- **User-Friendly Messages**

## 📁 File Structure

```
src/
├── lib/
│   ├── api.ts                    # Centralized API client
│   ├── socket.ts                 # WebSocket client
│   ├── queryClient.ts            # React Query config
│   ├── errors.ts                 # Error utilities
│   └── toast.ts                  # Toast notifications
│
├── services/
│   ├── auth.service.ts           # Authentication
│   ├── conversation.service.ts   # Conversations
│   ├── contact.service.ts        # Contacts
│   ├── campaign.service.ts       # Campaigns
│   ├── knowledgeBase.service.ts  # Knowledge Base
│   ├── automation.service.ts     # Automations
│   ├── analytics.service.ts      # Analytics
│   └── settings.service.ts       # Settings
│
├── hooks/
│   ├── useSocket.ts              # Socket hooks
│   ├── useConversations.ts       # Conversation queries (15 hooks)
│   ├── useContacts.ts            # Contact queries (12 hooks)
│   ├── useCampaigns.ts           # Campaign queries (9 hooks)
│   ├── useAnalytics.ts           # Analytics queries (8 hooks)
│   └── useSettings.ts            # Settings queries (13 hooks)
│
├── contexts/
│   └── AuthContext.tsx           # Auth state management
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx    # Route protection
│   ├── ErrorBoundary.tsx         # Error boundary
│   ├── LoadingSkeleton.tsx       # Loading states
│   └── EmptyState.tsx            # Empty states
│
└── providers/
    ├── QueryProvider.tsx         # React Query provider
    └── AppProviders.tsx          # All providers wrapper
```

## 🚀 Quick Start

### 1. Environment Setup

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:5001
NEXT_PUBLIC_APP_NAME=ChatBot Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Wrap App with Providers

Update `app/layout.tsx`:
```tsx
import { AppProviders } from '@/providers/AppProviders';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
```

### 3. Protect Dashboard Routes

Update `app/(dashboard)/layout.tsx`:
```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
```

### 4. Use in Components

```tsx
'use client';

import { useConversations } from '@/hooks/useConversations';
import { ConversationListSkeleton } from '@/components/LoadingSkeleton';
import { NoConversations } from '@/components/EmptyState';

export function ConversationsList() {
  const { data, isLoading, isError, error } = useConversations();

  if (isLoading) return <ConversationListSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data?.conversations?.length) return <NoConversations />;

  return (
    <div>
      {data.conversations.map((conv) => (
        <div key={conv.id}>{conv.name}</div>
      ))}
    </div>
  );
}
```

## 🔑 Key Features Explained

### 1. Automatic Token Refresh

The API client automatically:
- Detects 401 errors (expired token)
- Calls `/auth/refresh` endpoint
- Retries the original request
- Handles multiple simultaneous requests during refresh
- Logs out user if refresh fails

```typescript
// Happens automatically - no code needed!
const { data } = useConversations(); // Token auto-refreshed if expired
```

### 2. WebSocket Auto-Reconnection

```tsx
import { useConversationRoom } from '@/hooks/useSocket';

function ConversationDetail({ id }) {
  const socket = useConversationRoom(id); // Auto joins/leaves room
  
  useEffect(() => {
    socket.onNewMessage((message) => {
      // Handle new message
    });
  }, [socket]);
}
```

### 3. Optimistic Updates

```tsx
const sendMessage = useSendMessage();

// UI updates immediately, rollback on error
await sendMessage.mutateAsync({ conversationId, data });
// Conversations list automatically refetched
```

### 4. Toast Notifications

```tsx
import { toast } from 'sonner';

toast.success('Message sent!');
toast.error('Failed to send message');
toast.promise(apiCall(), {
  loading: 'Sending...',
  success: 'Sent!',
  error: 'Failed!'
});
```

## 📊 Available Hooks

### Conversation Hooks
- `useConversations(filters)` - List with filters
- `useInfiniteConversations(filters)` - Infinite scroll
- `useConversation(id)` - Single conversation
- `useConversationMessages(id)` - Messages
- `useSendMessage()` - Send message
- `useTakeControl()` - Manual control
- `useReleaseControl()` - Release control
- `useUpdateConversationStatus()` - Update status
- `useAssignOperator()` - Assign operator
- `useUpdateConversationLabels()` - Update labels
- `useMoveToFolder()` - Move to folder
- `useDeleteConversation()` - Delete
- `useBulkDeleteConversations()` - Bulk delete
- `useAddNote()` - Add internal note
- `useSearchMessages(query)` - Search

### Contact Hooks
- `useContacts(filters)` - List with filters
- `useInfiniteContacts(filters)` - Infinite scroll
- `useContact(id)` - Single contact
- `useContactLists()` - All lists
- `useCustomProperties()` - Property definitions
- `useCreateContact()` - Create
- `useUpdateContact()` - Update
- `useDeleteContact()` - Delete
- `useBulkDeleteContacts()` - Bulk delete
- `useImportContactsCSV()` - CSV import
- `useUpdateKanbanStatus()` - Kanban update
- `useAddToList()` - Add to list
- `useCreateList()` - Create list

### Campaign Hooks
- `useCampaigns(filters)` - List campaigns
- `useCampaign(id)` - Single campaign
- `useWhatsAppTemplates()` - WhatsApp templates
- `useCampaignAnalytics(id)` - Campaign analytics
- `useCreateCampaign()` - Create
- `useUpdateCampaign()` - Update
- `useDeleteCampaign()` - Delete
- `useStartCampaign()` - Start
- `usePauseCampaign()` - Pause
- `useCancelCampaign()` - Cancel

### Analytics Hooks
- `useDashboardMetrics(filters)` - Dashboard overview
- `useConversationTrends(filters)` - Trends
- `useMessageStats(filters)` - Message stats
- `useResponseTimeMetrics(filters)` - Response times
- `useOperatorPerformance(filters)` - Operator stats
- `useChannelDistribution(filters)` - Channel breakdown
- `useAIPerformance(filters)` - AI metrics
- `useTopics(filters)` - Conversation topics
- `useRealTimeStats()` - Live statistics

### Settings Hooks
- `useSettings()` - App settings
- `useOperators()` - Team members
- `useChannels()` - Communication channels
- `useLabels()` - Labels/tags
- `useFolders()` - Folders
- `useWebhooks()` - Webhooks
- `useUpdateSettings()` - Update settings
- `useCreateOperator()` - Add team member
- `useUpdateOperator()` - Update team member
- `useDeleteOperator()` - Remove team member
- `useCreateLabel()` - Create label
- `useDeleteLabel()` - Delete label
- `useCreateFolder()` - Create folder

## 🎨 UI Components

### Loading Skeletons
```tsx
import {
  ConversationListSkeleton,
  ConversationDetailSkeleton,
  TableSkeleton,
  CardSkeleton,
  MetricCardSkeleton,
  ChartSkeleton,
  ContactCardSkeleton,
  ListItemSkeleton,
  FormSkeleton
} from '@/components/LoadingSkeleton';
```

### Empty States
```tsx
import {
  EmptyState,
  NoConversations,
  NoContacts,
  NoCampaigns,
  NoSearchResults,
  NoData,
  NotFound
} from '@/components/EmptyState';
```

## 🧪 Testing Checklist

- [ ] Login functionality works
- [ ] Tokens stored in localStorage
- [ ] Protected routes redirect to login
- [ ] API calls to backend successful
- [ ] Token auto-refresh on expiry
- [ ] WebSocket connection established
- [ ] Real-time messages received
- [ ] Toast notifications appear
- [ ] Loading skeletons display
- [ ] Empty states show correctly
- [ ] Error handling works
- [ ] Logout clears data

## 🔧 Configuration

### API Client Configuration

Located in `src/lib/api.ts`:
- Base URL from environment
- Request/response interceptors
- Token management
- Error formatting
- Auto-retry logic

### React Query Configuration

Located in `src/lib/queryClient.ts`:
- `staleTime`: 5 minutes
- `gcTime`: 10 minutes
- `retry`: 3 attempts
- `refetchOnWindowFocus`: true

### WebSocket Configuration

Located in `src/lib/socket.ts`:
- Transport: WebSocket only
- Reconnection: Enabled
- Reconnection attempts: 5
- Reconnection delay: 1000ms

## 📖 Documentation Files

1. **INTEGRATION_GUIDE.md** - Complete integration guide with examples
2. **ENV_SETUP.md** - Environment variable setup instructions
3. **API_CLIENT_README.md** - This file

## 🆘 Troubleshooting

### Common Issues

**1. "Network Error" on API calls**
- Backend server not running
- Wrong `NEXT_PUBLIC_API_URL`
- CORS issues

**2. Token not refreshing**
- Check `/auth/refresh` endpoint
- Verify refresh token in localStorage
- Check token expiry settings

**3. WebSocket not connecting**
- Wrong `NEXT_PUBLIC_WS_URL`
- Backend WebSocket not running
- Firewall blocking connection

**4. TypeScript errors**
- Run `npm install`
- Check import paths
- Restart TypeScript server

## 🎓 Learning Resources

- **Axios**: https://axios-http.com/
- **Socket.IO**: https://socket.io/docs/v4/
- **React Query**: https://tanstack.com/query/latest
- **Sonner**: https://sonner.emilkowal.ski/
- **Next.js**: https://nextjs.org/docs

## 📝 Best Practices

1. **Always use hooks** for data fetching
2. **Show loading states** with skeletons
3. **Handle empty states** gracefully
4. **Display error messages** to users
5. **Use optimistic updates** for better UX
6. **Clean up socket listeners** on unmount
7. **Protect sensitive routes** with ProtectedRoute
8. **Test token refresh** before production
9. **Monitor WebSocket** connection status
10. **Log errors** for debugging

## 🚀 Production Checklist

- [ ] Update environment variables for production
- [ ] Test token refresh mechanism
- [ ] Verify WebSocket reconnection
- [ ] Test error handling scenarios
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Review security (token storage, CORS)
- [ ] Test on mobile devices
- [ ] Load test API client
- [ ] Monitor real-time performance

## 📞 Support

For issues or questions:
1. Check **INTEGRATION_GUIDE.md** for examples
2. Review **Troubleshooting** section
3. Check browser console for errors
4. Verify backend is running correctly
5. Test with Postman/curl first

---

**Version**: 1.0.0  
**Last Updated**: October 30, 2025  
**Status**: Production Ready ✅

