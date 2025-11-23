# 🚀 Quick Deployment Guide

## Prerequisites

Generate secure keys first:

```bash
# JWT Secret (32+ bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key (16 bytes = 32 hex chars)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## 1️⃣ Push to GitHub

```bash
cd /Users/lovjeetsingh/Desktop/KepleroAI_v1

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for deployment"

# Add your GitHub repository
git remote add origin YOUR_GITHUB_REPO_URL

# Push
git push -u origin main
```

## 2️⃣ Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. **New** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name**: `kepleroai-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free or Starter

5. **Add Environment Variables** (from `backend/.env.production.example`):
   - Copy all variables from `.env.production.example`
   - Replace placeholder values with real ones
   - **IMPORTANT**: Update `CORS_ORIGIN`, `FRONTEND_URL` after Vercel deployment

6. **Deploy** → Save the URL: `https://kepleroai-backend-XXXX.onrender.com`

## 3️⃣ Deploy Python Services to Render

1. **New** → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `kepleroai-python`
   - **Root Directory**: (path to your Python RAG service)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Deploy** → Save the URL: `https://kepleroai-python-XXXX.onrender.com`

5. **Update Backend Environment**:
   - Go back to your backend service on Render
   - Update: `RAG_API_URL=https://kepleroai-python-XXXX.onrender.com`
   - Update: `COMM_API_URL=https://kepleroai-python-XXXX.onrender.com`
   - **Manual Restart** the backend service

## 4️⃣ Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. **Add New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`

5. **Add Environment Variables** (from `.env.example`):

```bash
# Your deployed backend URL from Render
NEXT_PUBLIC_API_URL=https://kepleroai-backend-XXXX.onrender.com/api/v1

# Your deployed backend URL (for WebSocket)
NEXT_PUBLIC_SOCKET_URL=https://kepleroai-backend-XXXX.onrender.com

# Your deployed Python service URL
NEXT_PUBLIC_RAG_API_URL=https://kepleroai-python-XXXX.onrender.com

# Google OAuth Client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=248167343505-s35tohfpegqmba4i34m692dg6efesdsv.apps.googleusercontent.com
```

6. **Deploy** → Save the URL: `https://your-app.vercel.app`

7. **Update Backend CORS**:
   - Go back to Render backend service
   - Update: `CORS_ORIGIN=https://your-app.vercel.app`
   - Update: `SOCKET_IO_CORS_ORIGIN=https://your-app.vercel.app`
   - Update: `FRONTEND_URL=https://your-app.vercel.app`
   - **Manual Restart** the backend service

## 5️⃣ Update External Services

### Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client
4. Add **Authorized JavaScript origins**:
   - `https://your-app.vercel.app`
5. Add **Authorized redirect URIs**:
   - `https://kepleroai-backend-XXXX.onrender.com/api/v1/auth/google/callback`
   - `https://kepleroai-backend-XXXX.onrender.com/api/v1/integrations/google/callback`
   - `https://your-app.vercel.app/auth/callback`
6. **Save**

### Dialog360 Webhook

1. Go to [Dialog360 Dashboard](https://hub.360dialog.com/)
2. **Webhooks** settings
3. Update webhook URL:
   - **Old (ngrok)**: `https://xxxxx.ngrok.io/api/v1/webhooks/360dialog`
   - **New (Render)**: `https://kepleroai-backend-XXXX.onrender.com/api/v1/webhooks/360dialog`
4. Keep the same **Verify Token**: `kepleroai_webhook_token_2024`
5. **Save**

### MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Network Access** → **Add IP Address**
3. **Allow Access from Anywhere**: `0.0.0.0/0` (required for Render)
4. **Confirm**

## 6️⃣ Test Your Deployment

```bash
# Test backend health
curl https://kepleroai-backend-XXXX.onrender.com/api/v1/health

# Test Python service health
curl https://kepleroai-python-XXXX.onrender.com/health

# Test Dialog360 webhook
curl -X POST https://kepleroai-backend-XXXX.onrender.com/api/v1/webhooks/360dialog \
  -H "Content-Type: application/json" \
  -d '{"test": "message"}'
```

Visit your frontend: `https://your-app.vercel.app`

## ✅ Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Python services deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] All environment variables configured
- [ ] CORS settings updated
- [ ] Google OAuth redirect URIs updated
- [ ] Dialog360 webhook updated to production URL
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Tested all endpoints
- [ ] Frontend can authenticate users
- [ ] Webhooks receiving messages

## 🔧 Troubleshooting

### Backend can't connect to MongoDB
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string format in `MONGODB_URI`

### CORS errors
- Ensure `CORS_ORIGIN` exactly matches Vercel URL (with `https://`)
- No trailing slash in URLs
- Restart backend service after changing env vars

### Webhooks not working
- Verify webhook URL is publicly accessible
- Check webhook token matches Dialog360 settings
- View logs in Render dashboard

### Frontend not connecting to backend
- Check `NEXT_PUBLIC_API_URL` has correct backend URL
- Include `/api/v1` at the end
- Redeploy frontend after changing env vars in Vercel

## 📚 Important Notes

1. **ngrok is no longer needed** - your services have permanent URLs now
2. **Free tier limitations**:
   - Render: Services sleep after 15 mins of inactivity
   - First request after sleep takes ~30 seconds
   - Consider paid plan for production
3. **Environment variables**:
   - Frontend: Redeploy in Vercel after changing
   - Backend: Manual restart in Render after changing
4. **Security**:
   - Never commit `.env` files
   - Rotate secrets regularly
   - Enable 2FA on all accounts

## 🎉 Done!

Your app is live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://kepleroai-backend-XXXX.onrender.com`
- **Python Services**: `https://kepleroai-python-XXXX.onrender.com`

---

For detailed documentation, see [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md)

