# 🔧 Post-Deployment Configuration

## ✅ Your Deployed URLs

- **Backend**: https://kepleroai-backend-v1.onrender.com
- **Frontend**: https://kepleroai-frontend-v1.vercel.app

---

## 1️⃣ Update Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Credentials**

### Step 2: Update OAuth 2.0 Client ID

Click on your OAuth 2.0 Client ID to edit it.

#### **Authorized JavaScript origins**

**Remove:**
- Any ngrok URLs (e.g., `https://xxxxx.ngrok.io`)
- Old localhost URLs if not needed

**Add:**
```
https://kepleroai-frontend-v1.vercel.app
https://kepleroai-backend-v1.onrender.com
```

#### **Authorized redirect URIs**

**Remove:**
- Any ngrok URLs
- Old localhost URLs if not needed

**Add:**
```
https://kepleroai-backend-v1.onrender.com/api/v1/auth/google/callback
https://kepleroai-backend-v1.onrender.com/api/v1/integrations/google/callback
https://kepleroai-frontend-v1.vercel.app/auth/callback
```

#### **Screenshot of What It Should Look Like:**

```
Authorized JavaScript origins:
  https://kepleroai-frontend-v1.vercel.app
  https://kepleroai-backend-v1.onrender.com

Authorized redirect URIs:
  https://kepleroai-backend-v1.onrender.com/api/v1/auth/google/callback
  https://kepleroai-backend-v1.onrender.com/api/v1/integrations/google/callback
  https://kepleroai-frontend-v1.vercel.app/auth/callback
```

### Step 3: Save Changes
Click **"Save"** at the bottom

---

## 2️⃣ Update Dialog360 Webhook

### Step 1: Go to Dialog360 Hub
1. Visit: https://hub.360dialog.com/
2. Log in to your account
3. Go to your **Client** settings

### Step 2: Update Webhook URL

#### **Navigate to Webhooks:**
- Client Settings → Configuration → Webhooks

#### **Old Webhook URL (ngrok - DELETE THIS):**
```
https://xxxxx.ngrok.io/api/v1/webhooks/360dialog
```

#### **New Webhook URL (Production - ADD THIS):**
```
https://kepleroai-backend-v1.onrender.com/api/v1/webhooks/360dialog
```

#### **Webhook Configuration:**
- **Webhook URL**: `https://kepleroai-backend-v1.onrender.com/api/v1/webhooks/360dialog`
- **Verify Token**: Keep your existing token (e.g., `kepleroai_webhook_token_2024`)
- **Events**: Keep all selected events (messages, status updates, etc.)

### Step 3: Test Webhook
Click **"Test"** or **"Verify"** button to ensure it's working.

### Step 4: Save Changes
Click **"Save"** or **"Update"**

---

## 3️⃣ Update Render Backend Environment Variables

### Step 1: Go to Render Dashboard
1. Visit: https://dashboard.render.com/
2. Click on **kepleroai-backend** service
3. Go to **"Environment"** tab

### Step 2: Update These Variables

**Add or Update:**

```bash
# CORS - Frontend URL
CORS_ORIGIN=https://kepleroai-frontend-v1.vercel.app

# Socket.IO CORS
SOCKET_IO_CORS_ORIGIN=https://kepleroai-frontend-v1.vercel.app

# Frontend URL (for email links)
FRONTEND_URL=https://kepleroai-frontend-v1.vercel.app

# Google OAuth Callbacks (Production)
GOOGLE_CALLBACK_URL=https://kepleroai-backend-v1.onrender.com/api/v1/auth/google/callback
GOOGLE_REDIRECT_URI=https://kepleroai-backend-v1.onrender.com/api/v1/integrations/google/callback

# Python RAG Service (update when deployed)
RAG_API_URL=http://localhost:8000
COMM_API_URL=http://localhost:8000

# Dialog360 Webhook Token (should already be set)
DIALOG360_WEBHOOK_TOKEN=kepleroai_webhook_token_2024
```

**Important Variables to Set (if not already):**

```bash
# Database
MONGODB_URI=mongodb+srv://your-connection-string

# Redis
REDIS_URL=redis://your-redis-url

# JWT & Encryption (CHANGE THESE!)
JWT_SECRET=your-generated-secret
ENCRYPTION_KEY=your-generated-key

# AWS S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket

# Google OAuth
GOOGLE_CLIENT_ID=248167343505-s35tohfpegqmba4i34m692dg6efesdsv.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### Step 3: Save and Restart
1. Click **"Save Changes"**
2. Service will automatically restart

---

## 4️⃣ Update Vercel Frontend Environment Variables

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on **kepleroai-frontend-v1** project
3. Go to **"Settings"** → **"Environment Variables"**

### Step 2: Update These Variables

**Add or Update:**

```bash
# Backend API URL (Production)
NEXT_PUBLIC_API_URL=https://kepleroai-backend-v1.onrender.com/api/v1

# WebSocket URL (Production)
NEXT_PUBLIC_SOCKET_URL=https://kepleroai-backend-v1.onrender.com

# Python RAG Service (update when deployed)
NEXT_PUBLIC_RAG_API_URL=http://localhost:8000

# Google OAuth Client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=248167343505-s35tohfpegqmba4i34m692dg6efesdsv.apps.googleusercontent.com
```

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Check **"Use existing build cache"** (optional)
4. Click **"Redeploy"**

---

## 5️⃣ What About ngrok?

### ❌ ngrok is NO LONGER NEEDED for Production

**Before (Development):**
- You used ngrok to expose `localhost:5001` to the internet
- Dialog360 webhook pointed to ngrok URL
- Google OAuth callbacks used ngrok URL

**After (Production):**
- Your backend has a permanent URL on Render
- Dialog360 webhook points directly to Render
- Google OAuth uses Render URL
- No need to keep ngrok running

### ✅ You Can Uninstall ngrok (Optional)

If you want to remove it:
```bash
# If installed via npm
npm uninstall -g ngrok

# If installed via Homebrew (Mac)
brew uninstall ngrok

# If installed manually, just delete the binary
```

### 🔧 Keep ngrok for Local Testing (Optional)

You can keep ngrok if you want to test webhooks locally during development:
- Just don't use it for production
- Update Dialog360 webhook back to ngrok when testing locally
- Switch back to production URL when done testing

---

## 6️⃣ Verification Checklist

After updating everything, verify:

### Test Backend
```bash
# Health check
curl https://kepleroai-backend-v1.onrender.com/api/v1/health

# Should return:
# {"status":"ok","message":"Server is running","timestamp":"..."}
```

### Test Frontend
Visit: https://kepleroai-frontend-v1.vercel.app

### Test Google OAuth
1. Go to frontend
2. Click "Sign in with Google"
3. Should redirect to Google
4. After authentication, should redirect back to your app

### Test Dialog360 Webhook
1. Send a test message to your WhatsApp Business number
2. Check Render logs to see if webhook was received
3. Message should appear in your conversations

### Test Frontend → Backend Connection
1. Open browser console (F12)
2. Visit https://kepleroai-frontend-v1.vercel.app
3. Check for any CORS errors
4. Try logging in
5. Try creating a conversation

---

## 7️⃣ Common Issues & Fixes

### Issue: CORS Error
**Fix:** 
- Ensure `CORS_ORIGIN` in Render exactly matches Vercel URL
- No trailing slash: ✅ `https://kepleroai-frontend-v1.vercel.app`
- With trailing slash: ❌ `https://kepleroai-frontend-v1.vercel.app/`

### Issue: Google OAuth "redirect_uri_mismatch"
**Fix:**
- Double-check redirect URIs in Google Cloud Console
- Make sure they exactly match (including `/api/v1/auth/google/callback`)
- No trailing slashes

### Issue: Dialog360 Webhook Not Working
**Fix:**
- Verify webhook URL in Dialog360 dashboard
- Check Render logs for incoming requests
- Ensure `DIALOG360_WEBHOOK_TOKEN` matches in both places

### Issue: Frontend Shows "Network Error"
**Fix:**
- Check `NEXT_PUBLIC_API_URL` is correct in Vercel
- Redeploy frontend after changing env vars
- Check backend is running on Render

---

## 8️⃣ Python Services Deployment

When you deploy Python services (port 8000), update:

**Render Backend Environment:**
```bash
RAG_API_URL=https://your-python-service.onrender.com
COMM_API_URL=https://your-python-service.onrender.com
```

**Vercel Frontend Environment:**
```bash
NEXT_PUBLIC_RAG_API_URL=https://your-python-service.onrender.com
```

---

## ✅ Final Checklist

- [ ] Google Cloud Console updated (JavaScript origins + redirect URIs)
- [ ] Dialog360 webhook URL updated to production URL
- [ ] Render backend environment variables updated
- [ ] Vercel frontend environment variables updated
- [ ] Backend restarted after env changes
- [ ] Frontend redeployed after env changes
- [ ] ngrok stopped/removed (optional)
- [ ] Tested Google OAuth login
- [ ] Tested Dialog360 webhook
- [ ] Tested frontend-backend connection
- [ ] Checked for CORS errors in browser console

---

## 🎉 You're Done!

Your application is now fully deployed and configured:

- ✅ Backend: https://kepleroai-backend-v1.onrender.com
- ✅ Frontend: https://kepleroai-frontend-v1.vercel.app
- ✅ Google OAuth configured
- ✅ Dialog360 webhooks configured
- ✅ ngrok replaced with production URLs

Your users can now access your app at the Vercel URL! 🚀

