# Frontend Testing Guide

## 🚀 Quick Start Testing

Your servers are running:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001

## 📋 Step-by-Step Testing

### **Test 1: Check Frontend Loads** ✅

1. Open browser: http://localhost:3000
2. You should see your Next.js app
3. Check browser console (F12) for any errors

### **Test 2: Check Environment Variables** 🔧

Open browser console (F12 or Cmd+Option+I) and run:

```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('WS URL:', process.env.NEXT_PUBLIC_WS_URL);
```

**Expected Output:**
```
API URL: http://localhost:5001/api/v1
WS URL: http://localhost:5001
```

❌ If `undefined`: You need to create `.env.local` file (see ENV_SETUP.md)

### **Test 3: Test Backend Connection** 🔌

Open a new terminal and run:

```bash
curl http://localhost:5001/api/v1/auth/test
```

Or in browser, visit: http://localhost:5001

**Expected**: Backend should respond (not "connection refused")

### **Test 4: Check Protected Routes** 🔒

1. Visit: http://localhost:3000/conversations
2. **Expected**: Should redirect to `/auth/signin` (if not logged in)
3. Check browser console for redirect logs

### **Test 5: Test Login Page** 🔐

You need to create the login page first. Here's how:

**Check if login page exists:**
- Visit: http://localhost:3000/auth/signin
- If you see Next.js 404 → **You need to create the login page**

**To create a simple test login page**, create this file:

**File**: `app/auth/signin/page.tsx`

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
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Debug Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded text-xs">
          <p className="font-semibold mb-2">Test Credentials:</p>
          <p>Check your backend for valid credentials</p>
          <p className="mt-2 text-gray-600">
            API: {process.env.NEXT_PUBLIC_API_URL || 'Not configured'}
          </p>
        </div>
      </div>
    </div>
  );
}
```

### **Test 6: Test Login Flow** 👤

After creating the login page:

1. Visit: http://localhost:3000/auth/signin
2. Enter credentials (get from your backend)
3. Click "Sign In"
4. Watch browser console for:
   - API request
   - Response
   - Token storage

**Check tokens after login:**

Open browser console and run:
```javascript
console.log('Access Token:', localStorage.getItem('accessToken'));
console.log('Refresh Token:', localStorage.getItem('refreshToken'));
console.log('User:', JSON.parse(localStorage.getItem('user')));
```

**Expected**: Should see tokens and user data

### **Test 7: Test Protected Routes After Login** 🛡️

After successful login:

1. Visit: http://localhost:3000/conversations
2. **Expected**: Should NOT redirect (you're authenticated)
3. Should stay on the page or show content

### **Test 8: Test WebSocket Connection** 📡

After login, open browser console:

```javascript
// Check if socket connected
console.log('Socket exists:', window.socketClient !== undefined);

// Check connection status (if socket initialized)
import { socketClient } from '@/lib/socket';
console.log('Socket Connected:', socketClient.isConnected());
```

**Expected**: `Socket Connected: true`

### **Test 9: Test API Calls** 📞

In browser console after login:

```javascript
// Test fetching conversations
fetch('http://localhost:5001/api/v1/conversations', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
})
.then(r => r.json())
.then(data => console.log('Conversations:', data))
.catch(err => console.error('Error:', err));
```

**Expected**: Should return conversations data (or empty array)

### **Test 10: Test React Query Hooks** 🎣

Create a test page: `app/test/page.tsx`

```tsx
'use client';

import { useConversations } from '@/hooks/useConversations';
import { ConversationListSkeleton } from '@/components/LoadingSkeleton';
import { NoConversations } from '@/components/EmptyState';

export default function TestPage() {
  const { data, isLoading, isError, error } = useConversations();

  if (isLoading) return <ConversationListSkeleton count={3} />;
  
  if (isError) {
    return (
      <div className="p-8 text-red-600">
        <h2 className="text-xl font-bold mb-2">Error!</h2>
        <pre className="bg-red-50 p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  if (!data?.conversations?.length) {
    return <NoConversations />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">✅ Test Passed!</h1>
      <p className="mb-4">Found {data.conversations.length} conversations</p>
      <pre className="bg-gray-50 p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
```

Visit: http://localhost:3000/test

### **Test 11: Test Toast Notifications** 🔔

In browser console:

```javascript
import { toast } from 'sonner';

toast.success('Success! This works!');
toast.error('Error! This works too!');
toast.info('Info notification');
toast.warning('Warning notification');
```

**Expected**: See toast notifications appear

### **Test 12: Test Loading Skeletons** 💀

Visit any page with data fetching. While loading, you should see:
- Gray animated skeleton placeholders
- Matching the shape of final content

### **Test 13: Test Error Handling** ⚠️

In browser console, test error handling:

```javascript
import { conversationService } from '@/services/conversation.service';

// This should trigger error handling
conversationService.getById('invalid-id-12345')
  .then(data => console.log('Data:', data))
  .catch(error => console.log('✅ Error caught:', error.message));
```

**Expected**: Error message displayed, toast notification shown

### **Test 14: Test Logout** 🚪

1. After login, find your logout button (in header/sidebar)
2. Click logout
3. Check:
   - Redirects to `/auth/signin`
   - Tokens cleared from localStorage
   - Socket disconnected

```javascript
// Check in console after logout
console.log('Token:', localStorage.getItem('accessToken')); // Should be null
```

## 🐛 Common Issues & Solutions

### Issue 1: Environment Variables Not Loading
**Symptom**: `process.env.NEXT_PUBLIC_API_URL` is `undefined`

**Solution**: 
1. Create `.env.local` file in project root
2. Add:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
   NEXT_PUBLIC_WS_URL=http://localhost:5001
   ```
3. Restart Next.js server

### Issue 2: CORS Errors
**Symptom**: API calls fail with CORS error

**Solution**: Check backend has CORS enabled for `http://localhost:3000`

### Issue 3: 404 on Protected Routes
**Symptom**: All routes show 404

**Solution**: Routes don't exist yet. You need to create the page files.

### Issue 4: Login Redirects Immediately
**Symptom**: Login page redirects to dashboard even though not logged in

**Solution**: Check if old tokens exist in localStorage. Clear them:
```javascript
localStorage.clear();
```

### Issue 5: WebSocket Not Connecting
**Symptom**: Socket shows disconnected

**Solution**:
1. Check backend WebSocket server is running
2. Verify `NEXT_PUBLIC_WS_URL` is correct
3. Check browser console for connection errors

## ✅ Testing Checklist

Use this checklist to verify everything works:

- [ ] Frontend loads at http://localhost:3000
- [ ] Backend responds at http://localhost:5001
- [ ] Environment variables loaded
- [ ] Login page exists and loads
- [ ] Can login with valid credentials
- [ ] Tokens stored in localStorage after login
- [ ] Protected routes redirect when not logged in
- [ ] Protected routes accessible after login
- [ ] API calls work after authentication
- [ ] WebSocket connects after login
- [ ] Toast notifications appear
- [ ] Loading skeletons show while loading
- [ ] Empty states show when no data
- [ ] Error messages display correctly
- [ ] Can logout successfully
- [ ] Tokens cleared after logout

## 🎯 Quick Command Reference

```bash
# Start backend
cd backend && npm run dev

# Start frontend
npm run dev

# Check running servers
lsof -i :3000,5001

# Kill servers
lsof -ti :3000,5001 | xargs kill -9

# Clear Next.js cache
rm -rf .next

# Test backend API
curl http://localhost:5001/api/v1

# View environment variables
cat .env.local
```

## 📚 Next Steps

After completing these tests:

1. ✅ **Create remaining pages**: conversations, contacts, campaigns, etc.
2. ✅ **Integrate WebSocket** in conversation components
3. ✅ **Add real-time updates** for new messages
4. ✅ **Test all CRUD operations**
5. ✅ **Add proper error boundaries**
6. ✅ **Test on different browsers**

## 🆘 Need Help?

- Check `INTEGRATION_GUIDE.md` for detailed examples
- Check `API_CLIENT_README.md` for API documentation
- Look at browser console for errors
- Check backend logs for API issues
- Verify `.env.local` is configured correctly

