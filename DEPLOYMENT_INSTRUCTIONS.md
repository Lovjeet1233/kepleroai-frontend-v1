# 🚀 Deployment Instructions

This guide will help you deploy KepleroAI to production using **Render** (Backend + Python Services) and **Vercel** (Frontend).

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Deploy Backend to Render](#deploy-backend-to-render)
4. [Deploy Python Services to Render](#deploy-python-services-to-render)
5. [Deploy Frontend to Vercel](#deploy-frontend-to-vercel)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Webhook & OAuth Updates](#webhook--oauth-updates)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub repository with your code
- ✅ MongoDB Atlas account (free tier available)
- ✅ Redis Cloud account or Render Redis addon
- ✅ AWS S3 bucket (for file uploads)
- ✅ Google Cloud Console project (for OAuth & Workspace integrations)
- ✅ Dialog360 account (for WhatsApp/Instagram/Facebook)
- ✅ Render account
- ✅ Vercel account

---

## Environment Setup

### 1. Generate Secure Keys

Generate secure keys for production:

```bash
# JWT Secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key (32 characters exactly)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 2. Setup External Services

#### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
4. Whitelist all IPs (`0.0.0.0/0`) for Render deployment

#### Redis Cloud
1. Go to [Redis Cloud](https://redis.com/try-free/)
2. Create a free database
3. Get your connection URL: `redis://default:password@host:port`

#### AWS S3
1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Create a bucket
3. Create IAM user with S3 access
4. Get Access Key ID and Secret Access Key

---

## Deploy Backend to Render

### Step 1: Push Code to GitHub

```bash
cd /Users/lovjeetsingh/Desktop/KepleroAI_v1

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - prepare for deployment"

# Add your GitHub remote
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Create Backend Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `kepleroai-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### Step 3: Configure Environment Variables

In Render dashboard, add all environment variables from `backend/.env.production.example`:

**Critical Variables (MUST CHANGE):**
- `NODE_ENV=production`
- `MONGODB_URI=your_mongodb_atlas_connection_string`
- `REDIS_URL=your_redis_cloud_url`
- `JWT_SECRET=your_generated_jwt_secret`
- `ENCRYPTION_KEY=your_generated_encryption_key`
- `CORS_ORIGIN=https://your-app.vercel.app` (update after Vercel deployment)
- `SOCKET_IO_CORS_ORIGIN=https://your-app.vercel.app`
- `FRONTEND_URL=https://your-app.vercel.app`

**Important URLs (update after deployment):**
- `GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/v1/auth/google/callback`
- `GOOGLE_REDIRECT_URI=https://your-backend.onrender.com/api/v1/integrations/google/callback`
- `RAG_API_URL=https://your-python-service.onrender.com` (update after Python service deployment)
- `COMM_API_URL=https://your-python-service.onrender.com`

### Step 4: Deploy

Click **"Create Web Service"**. Render will automatically:
- Build your backend
- Deploy it
- Assign a URL like: `https://kepleroai-backend.onrender.com`

**Save this URL!** You'll need it for frontend and webhook configuration.

---

## Deploy Python Services to Render

### Step 1: Create Python Service on Render

1. Go to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `kepleroai-python-services`
   - **Root Directory**: (path to your Python service)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free (or paid)

### Step 2: Configure Environment Variables

Add any required environment variables for your Python service (API keys, etc.)

### Step 3: Deploy

Click **"Create Web Service"**. Save the deployed URL (e.g., `https://kepleroai-python.onrender.com`)

### Step 4: Update Backend Environment

Go back to your backend service on Render and update:
- `RAG_API_URL=https://kepleroai-python.onrender.com`
- `COMM_API_URL=https://kepleroai-python.onrender.com`

---

## Deploy Frontend to Vercel

### Step 1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 2: Configure Environment Variables

In Vercel project settings → Environment Variables, add:

```bash
# Backend API URL (from Render deployment)
NEXT_PUBLIC_API_URL=https://kepleroai-backend.onrender.com/api/v1

# WebSocket URL (from Render deployment)
NEXT_PUBLIC_SOCKET_URL=https://kepleroai-backend.onrender.com

# Python RAG Service URL (from Render deployment)
NEXT_PUBLIC_RAG_API_URL=https://kepleroai-python.onrender.com

# Google OAuth Client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=248167343505-s35tohfpegqmba4i34m692dg6efesdsv.apps.googleusercontent.com
```

### Step 3: Deploy

Click **"Deploy"**. Vercel will assign a URL like: `https://your-app.vercel.app`

**Save this URL!** You need to update backend CORS settings.

### Step 4: Update Backend CORS

Go back to Render backend service and update:
- `CORS_ORIGIN=https://your-app.vercel.app`
- `SOCKET_IO_CORS_ORIGIN=https://your-app.vercel.app`
- `FRONTEND_URL=https://your-app.vercel.app`

Then **restart** your backend service on Render.

---

## Post-Deployment Configuration

### 1. Update Google Cloud Console

Since you're replacing ngrok with production URLs:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. **Authorized JavaScript origins**, add:
   - `https://your-app.vercel.app`
5. **Authorized redirect URIs**, add:
   - `https://kepleroai-backend.onrender.com/api/v1/auth/google/callback`
   - `https://kepleroai-backend.onrender.com/api/v1/integrations/google/callback`
   - `https://your-app.vercel.app/auth/callback`
6. Click **Save**

### 2. Update Dialog360 Webhook

**Old webhook (with ngrok):**
- `https://your-ngrok-url.ngrok.io/api/v1/webhooks/360dialog`

**New production webhook:**
- `https://kepleroai-backend.onrender.com/api/v1/webhooks/360dialog`

**To update:**
1. Go to [Dialog360 Dashboard](https://hub.360dialog.com/)
2. Navigate to **Webhooks** settings
3. Update webhook URL to: `https://kepleroai-backend.onrender.com/api/v1/webhooks/360dialog`
4. Keep the same **Verify Token** (from your `DIALOG360_WEBHOOK_TOKEN` env variable)
5. Save changes

### 3. Test Webhooks

Test that webhooks are working:

```bash
# Test Dialog360 webhook
curl -X POST https://kepleroai-backend.onrender.com/api/v1/webhooks/360dialog \
  -H "Content-Type: application/json" \
  -d '{"test": "message"}'
```

---

## Webhook & OAuth Updates Summary

### ❌ Remove ngrok (No longer needed)

Since you were using ngrok on port 5001 for local development and webhooks, you can now **completely remove ngrok** because:

1. ✅ **Backend is deployed** to Render with a permanent URL
2. ✅ **Webhooks** can point directly to your Render backend
3. ✅ **OAuth callbacks** use your production URLs

**What to do with ngrok:**
- You can uninstall it or keep it for future local testing
- Just stop using it for production webhooks

### 🔄 URLs to Update

| Service | Old URL (ngrok) | New URL (Production) |
|---------|----------------|----------------------|
| Backend API | `http://localhost:5001` or `https://xxxxx.ngrok.io` | `https://kepleroai-backend.onrender.com` |
| Python Services | `http://localhost:8000` | `https://kepleroai-python.onrender.com` |
| Frontend | `http://localhost:3000` | `https://your-app.vercel.app` |
| Dialog360 Webhook | `https://xxxxx.ngrok.io/api/v1/webhooks/360dialog` | `https://kepleroai-backend.onrender.com/api/v1/webhooks/360dialog` |
| Google OAuth Callback | `http://localhost:5001/api/v1/auth/google/callback` | `https://kepleroai-backend.onrender.com/api/v1/auth/google/callback` |

---

## 🎉 Deployment Complete!

Your application is now live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://kepleroai-backend.onrender.com`
- **Python Services**: `https://kepleroai-python.onrender.com`

### Final Checklist

- [ ] All environment variables configured correctly
- [ ] MongoDB Atlas connection working
- [ ] Redis connection working
- [ ] AWS S3 file uploads working
- [ ] Google OAuth working
- [ ] Dialog360 webhooks working
- [ ] Frontend can communicate with backend
- [ ] Python RAG service accessible
- [ ] CORS properly configured
- [ ] SSL certificates active (Render/Vercel provide this automatically)

---

## 🔒 Security Notes

1. **Never commit `.env` files** to GitHub
2. **Rotate secrets regularly** (JWT_SECRET, ENCRYPTION_KEY)
3. **Enable 2FA** on all service accounts
4. **Monitor logs** for suspicious activity
5. **Set up error tracking** (e.g., Sentry)
6. **Regular backups** of MongoDB database

---

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Check MongoDB Atlas IP whitelist (should include `0.0.0.0/0`)
- Verify connection string format
- Check MongoDB Atlas cluster is active

### CORS errors
- Ensure `CORS_ORIGIN` matches your exact Vercel URL
- Include protocol (`https://`)
- No trailing slash in URLs

### Webhooks not working
- Check webhook URL is publicly accessible
- Verify webhook token matches Dialog360 settings
- Check Render logs for errors

### Environment variables not updating
- After changing env vars, **manually restart** the service on Render
- In Vercel, redeploy after changing env vars

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Dialog360 API Documentation](https://docs.360dialog.com/)

---

**Need help?** Open an issue on GitHub or check the logs in Render/Vercel dashboards.

