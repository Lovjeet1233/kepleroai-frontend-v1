# 🔄 ngrok Replacement Guide

## What Was ngrok Used For?

During local development, you used **ngrok on port 5001** to:
1. ✅ Expose your local backend to the internet
2. ✅ Receive webhooks from Dialog360 (WhatsApp/Instagram/Facebook)
3. ✅ Test OAuth callbacks from Google

**ngrok URL format**: `https://xxxxx-xxxx-xxxx.ngrok-free.app`

## What Replaces ngrok in Production?

Your **Render deployment** completely replaces ngrok with a permanent, stable URL.

### Before (Development with ngrok)

```
Local Backend (port 5001)
    ↓
ngrok tunnel (https://xxxxx.ngrok.io)
    ↓
Dialog360 Webhooks → https://xxxxx.ngrok.io/api/v1/webhooks/360dialog
Google OAuth → https://xxxxx.ngrok.io/api/v1/auth/google/callback
```

### After (Production without ngrok)

```
Render Backend (permanent URL)
    ↓
https://kepleroai-backend.onrender.com
    ↓
Dialog360 Webhooks → https://kepleroai-backend.onrender.com/api/v1/webhooks/360dialog
Google OAuth → https://kepleroai-backend.onrender.com/api/v1/auth/google/callback
```

## ✅ Complete Replacement Checklist

### 1. Dialog360 Webhook Configuration

**Before (ngrok):**
- Webhook URL: `https://xxxxx.ngrok.io/api/v1/webhooks/360dialog`
- Problem: URL changes every time ngrok restarts

**After (Render):**
- Webhook URL: `https://kepleroai-backend.onrender.com/api/v1/webhooks/360dialog`
- Benefit: Permanent URL, never changes

**Action Required:**
1. Go to [Dialog360 Hub](https://hub.360dialog.com/)
2. Navigate to your client → **Configuration** → **Webhooks**
3. Replace the ngrok URL with your Render URL
4. Verify Token: Keep the same token (`kepleroai_webhook_token_2024`)
5. Click **Save**

### 2. Google Cloud Console OAuth

**Before (ngrok):**
```
Authorized JavaScript origins:
  - https://xxxxx.ngrok.io

Authorized redirect URIs:
  - https://xxxxx.ngrok.io/api/v1/auth/google/callback
  - https://xxxxx.ngrok.io/api/v1/integrations/google/callback
```

**After (Render + Vercel):**
```
Authorized JavaScript origins:
  - https://your-app.vercel.app
  - https://kepleroai-backend.onrender.com

Authorized redirect URIs:
  - https://kepleroai-backend.onrender.com/api/v1/auth/google/callback
  - https://kepleroai-backend.onrender.com/api/v1/integrations/google/callback
  - https://your-app.vercel.app/auth/callback
```

**Action Required:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. **Remove** all ngrok URLs
5. **Add** the production URLs above
6. Click **Save**

### 3. Testing on Port 5001

**Before:**
- Backend running on `localhost:5001`
- ngrok exposing it as `https://xxxxx.ngrok.io`

**After:**
- **Local development**: Still use `localhost:5001` (no ngrok needed unless testing webhooks)
- **Production**: Use `https://kepleroai-backend.onrender.com`

**For Local Development:**
```bash
# Start backend locally
cd backend
npm run dev

# Frontend connects to local backend via .env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
```

**For Production:**
```bash
# Frontend connects to Render backend via Vercel env vars
NEXT_PUBLIC_API_URL=https://kepleroai-backend.onrender.com/api/v1
```

## 🧪 Testing Webhooks in Development

### Option 1: Use Production Backend (Recommended)
Just deploy to Render and use the production URL. No ngrok needed.

### Option 2: Use ngrok for Local Testing
If you still want to test webhooks locally:

```bash
# Start your backend
npm run dev

# In another terminal, start ngrok (if installed)
ngrok http 5001

# Update Dialog360 webhook temporarily to ngrok URL for testing
# Remember to change it back to production URL after testing
```

## 📋 Environment Variable Changes

### Backend Environment Variables

**Development (.env)**
```bash
PORT=5001
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
GOOGLE_CALLBACK_URL=http://localhost:5001/api/v1/auth/google/callback
```

**Production (Render)**
```bash
PORT=5000  # Render uses 5000 by default
FRONTEND_URL=https://your-app.vercel.app
CORS_ORIGIN=https://your-app.vercel.app
GOOGLE_CALLBACK_URL=https://kepleroai-backend.onrender.com/api/v1/auth/google/callback
```

### Frontend Environment Variables

**Development (.env.local)**
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
```

**Production (Vercel)**
```bash
NEXT_PUBLIC_API_URL=https://kepleroai-backend.onrender.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://kepleroai-backend.onrender.com
```

## ✅ Can I Remove ngrok Completely?

**Yes!** After deploying to production, you can:

1. **Uninstall ngrok** (optional, keep it if you want to test webhooks locally):
```bash
# If installed via npm
npm uninstall -g ngrok

# If installed via Homebrew
brew uninstall ngrok
```

2. **Or keep it** for occasional local webhook testing, but you don't need it running anymore

## 🎯 Summary

| What | Before (ngrok) | After (Render) |
|------|----------------|----------------|
| **Backend URL** | `https://xxxxx.ngrok.io` | `https://kepleroai-backend.onrender.com` |
| **Stability** | Changes on restart | Permanent |
| **Cost** | Free (limited) | Free tier available |
| **Setup** | Run ngrok manually | Deploy once, works forever |
| **Webhooks** | Must update on every restart | Set once, never change |
| **SSL/HTTPS** | ✅ Provided by ngrok | ✅ Provided by Render |
| **Custom Domain** | ❌ Not available on free tier | ✅ Possible with paid plan |

## 🚀 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Get your permanent Render URL
3. ✅ Update Dialog360 webhook
4. ✅ Update Google Cloud Console
5. ✅ Test webhooks with production URL
6. ✅ Stop using ngrok for production
7. ✅ (Optional) Keep ngrok for local webhook testing

**You're done! ngrok is successfully replaced with a production-grade solution.** 🎉

