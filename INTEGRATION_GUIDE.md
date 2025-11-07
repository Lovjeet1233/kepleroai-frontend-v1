# Frontend API Integration Guide

This guide explains how to integrate the API client infrastructure and authentication services into your Next.js application.

## 📋 Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Provider Setup](#provider-setup)
4. [Authentication Flow](#authentication-flow)
5. [API Services Usage](#api-services-usage)
6. [WebSocket Integration](#websocket-integration)
7. [React Query Hooks](#react-query-hooks)
8. [Error Handling](#error-handling)
9. [Testing](#testing)

---

## 🔧 Installation

All required dependencies have been installed:

```bash
npm install axios socket.io-client @tanstack/react-query react-hook-form zod sonner
```

**Installed Packages:**
- `axios` - HTTP client for API requests
- `socket.io-client` - WebSocket client for real-time updates
- `@tanstack/react-query` - Data fetching and caching
- `react-hook-form` - Form validation
- `zod` - Schema validation
- `sonner` - Toast notifications

---

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:5001

# App Configuration
NEXT_PUBLIC_APP_NAME=ChatBot Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags (Optional)
NEXT_PUBLIC_ENABLE_VOICE=false
NEXT_PUBLIC_ENABLE_SOCIAL_CHANNELS=false

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
```

**Important:** Replace `http://localhost:5001` with your actual backend URL in production.

---

## 🎯 Provider Setup

### Step 1: Update Root Layout

Update your `app/layout.tsx` to include all providers:

```tsx
import { AppProviders } from '@/providers/AppProviders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

### Step 2: Protect Dashboard Routes

Update your dashboard layout `app/(dashboard)/layout.tsx`:

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        {/* Your dashboard layout components */}
        {children}
      </div>
    </ProtectedRoute>
  );
}
```

---

## 🔐 Authentication Flow

### Login Page Example

Create/update `app/auth/signin/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### Using Auth Context

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 📡 API Services Usage

### Conversation Service Example

```tsx
'use client';

import { useConversations, useSendMessage } from '@/hooks/useConversations';
import { ConversationListSkeleton } from '@/components/LoadingSkeleton';
import { NoConversations } from '@/components/EmptyState';

export function ConversationsList() {
  const { data, isLoading, isError, error } = useConversations({ 
    status: 'open',
    page: 1,
    limit: 20 
  });
  
  const sendMessage = useSendMessage();

  const handleSendMessage = async (conversationId: string, content: string) => {
    try {
      await sendMessage.mutateAsync({
        conversationId,
        data: { content, type: 'text' }
      });
    } catch (error) {
      // Error already shown via toast
    }
  };

  if (isLoading) return <ConversationListSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data?.conversations?.length) return <NoConversations />;

  return (
    <div>
      {data.conversations.map((conversation) => (
        <div key={conversation.id}>
          {/* Render conversation */}
        </div>
      ))}
    </div>
  );
}
```

### Contact Service Example

```tsx
import { useContacts, useCreateContact } from '@/hooks/useContacts';

export function ContactsList() {
  const { data, isLoading } = useContacts();
  const createContact = useCreateContact();

  const handleCreateContact = async () => {
    await createContact.mutateAsync({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    });
  };

  // ... rest of component
}
```

---

## 🔄 WebSocket Integration

### Basic WebSocket Usage

```tsx
'use client';

import { useEffect } from 'react';
import { useSocket, useConversationRoom } from '@/hooks/useSocket';

export function ConversationDetail({ conversationId }: { conversationId: string }) {
  const socket = useConversationRoom(conversationId);

  useEffect(() => {
    // Listen for new messages
    const handleNewMessage = (message: any) => {
      console.log('New message:', message);
      // Update UI
    };

    socket.onNewMessage(handleNewMessage);

    // Cleanup
    return () => {
      socket.off('message:new', handleNewMessage);
    };
  }, [conversationId, socket]);

  return (
    <div>
      {/* Conversation UI */}
    </div>
  );
}
```

### Typing Indicators

```tsx
import { useTypingIndicator } from '@/hooks/useSocket';

export function MessageInput({ conversationId }: { conversationId: string }) {
  const { startTyping, stopTyping } = useTypingIndicator(conversationId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTyping();
    // Your input handling logic
  };

  const handleBlur = () => {
    stopTyping();
  };

  return (
    <input
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Type a message..."
    />
  );
}
```

---

## 🎣 React Query Hooks

### Available Hooks

**Conversations:**
- `useConversations(filters)` - Fetch conversations list
- `useConversation(id)` - Fetch single conversation
- `useSendMessage()` - Send message mutation
- `useTakeControl()` - Take manual control
- `useReleaseControl()` - Release control
- `useUpdateConversationStatus()` - Update status

**Contacts:**
- `useContacts(filters)` - Fetch contacts list
- `useContact(id)` - Fetch single contact
- `useCreateContact()` - Create contact
- `useUpdateContact()` - Update contact
- `useDeleteContact()` - Delete contact
- `useBulkDeleteContacts()` - Bulk delete

**Campaigns:**
- `useCampaigns(filters)` - Fetch campaigns
- `useCampaign(id)` - Fetch single campaign
- `useCreateCampaign()` - Create campaign
- `useStartCampaign()` - Start campaign
- `usePauseCampaign()` - Pause campaign

**Analytics:**
- `useDashboardMetrics(filters)` - Dashboard metrics
- `useConversationTrends(filters)` - Conversation trends
- `useRealTimeStats()` - Real-time statistics

**Settings:**
- `useSettings()` - App settings
- `useOperators()` - Team operators
- `useChannels()` - Communication channels
- `useLabels()` - Labels/tags
- `useFolders()` - Folders

### Query Invalidation

React Query automatically invalidates and refetches data after mutations:

```tsx
const deleteContact = useDeleteContact();

// Deleting a contact will automatically refetch the contacts list
await deleteContact.mutateAsync(contactId);
```

---

## ⚠️ Error Handling

### Using Toast Notifications

```tsx
import { toast } from 'sonner';

// Success
toast.success('Contact created successfully!');

// Error
toast.error('Failed to create contact');

// Info
toast.info('New message received');

// Warning
toast.warning('Connection unstable');

// Promise (auto-loading)
toast.promise(
  createContact.mutateAsync(data),
  {
    loading: 'Creating contact...',
    success: 'Contact created!',
    error: 'Failed to create contact'
  }
);
```

### Error Boundaries

Already set up globally in `AppProviders`. For component-specific error boundaries:

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function MyComponent() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {/* Component content */}
    </ErrorBoundary>
  );
}
```

### API Error Handling

```tsx
import { formatErrorMessage } from '@/lib/errors';

try {
  await someApiCall();
} catch (error) {
  const message = formatErrorMessage(error);
  toast.error(message);
}
```

---

## 🧪 Testing

### Test Login Flow

1. Start your backend server on port 5001
2. Open your Next.js app
3. Navigate to `/auth/signin`
4. Enter credentials and login
5. Check localStorage for tokens:
   ```js
   localStorage.getItem('accessToken')
   localStorage.getItem('refreshToken')
   localStorage.getItem('user')
   ```

### Test API Calls

Open browser console and test:

```js
// Check if user is authenticated
const { isAuthenticated } = useAuth();
console.log('Authenticated:', isAuthenticated);

// Test API call (in component)
const { data } = useConversations();
console.log('Conversations:', data);
```

### Test WebSocket Connection

```js
// Check socket connection status
import { socketClient } from '@/lib/socket';
console.log('Socket connected:', socketClient.isConnected());
```

### Test Token Refresh

1. Login to get tokens
2. Wait for access token to expire (or manually expire it)
3. Make an API call
4. API client should automatically refresh token and retry

---

## 📚 Additional Resources

### File Structure

```
src/
├── lib/
│   ├── api.ts              # API client with interceptors
│   ├── socket.ts           # WebSocket client
│   ├── queryClient.ts      # React Query config
│   ├── errors.ts           # Error utilities
│   └── toast.ts            # Toast utilities
├── services/
│   ├── auth.service.ts     # Authentication
│   ├── conversation.service.ts
│   ├── contact.service.ts
│   ├── campaign.service.ts
│   ├── knowledgeBase.service.ts
│   ├── automation.service.ts
│   ├── analytics.service.ts
│   └── settings.service.ts
├── hooks/
│   ├── useSocket.ts        # Socket hooks
│   ├── useConversations.ts # Conversation queries
│   ├── useContacts.ts      # Contact queries
│   ├── useCampaigns.ts     # Campaign queries
│   ├── useAnalytics.ts     # Analytics queries
│   └── useSettings.ts      # Settings queries
├── contexts/
│   └── AuthContext.tsx     # Auth context
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── ErrorBoundary.tsx
│   ├── LoadingSkeleton.tsx
│   └── EmptyState.tsx
└── providers/
    ├── QueryProvider.tsx
    └── AppProviders.tsx
```

### Common Patterns

**Loading States:**
```tsx
if (isLoading) return <ConversationListSkeleton />;
```

**Empty States:**
```tsx
if (!data?.length) return <NoConversations />;
```

**Error States:**
```tsx
if (isError) return <div>Error: {error.message}</div>;
```

**Optimistic Updates:**
Already handled in mutation hooks automatically.

---

## 🚀 Next Steps

1. **Create Login Page**: Implement the signin page with the example above
2. **Test Authentication**: Login and verify token storage
3. **Integrate Conversations**: Use conversation hooks in your conversation components
4. **Add WebSocket**: Integrate real-time updates in conversation detail
5. **Test API Calls**: Verify all CRUD operations work correctly
6. **Handle Errors**: Test error scenarios and verify error handling
7. **Deploy**: Update environment variables for production

---

## 🆘 Troubleshooting

### Issue: "Network Error" on API calls
- Check backend server is running on correct port
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

### Issue: Token not refreshing
- Verify refresh token endpoint works: `/auth/refresh`
- Check token expiry settings
- Verify backend returns `accessToken` and `refreshToken`

### Issue: WebSocket not connecting
- Check `NEXT_PUBLIC_WS_URL` is correct
- Verify backend WebSocket server is running
- Check browser console for connection errors

### Issue: TypeScript errors
- Run `npm install` to ensure all types are installed
- Check import paths are correct
- Verify TypeScript version compatibility

---

## 📝 Notes

- All services use singleton pattern for consistent instances
- Tokens are stored in localStorage (consider more secure options for production)
- WebSocket automatically reconnects on disconnect
- React Query handles caching and refetching automatically
- All mutations show toast notifications automatically
- Error boundaries catch and display React errors gracefully

---

For more help, refer to:
- [Axios Documentation](https://axios-http.com/)
- [Socket.IO Client Documentation](https://socket.io/docs/v4/client-api/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Sonner Documentation](https://sonner.emilkowal.ski/)

