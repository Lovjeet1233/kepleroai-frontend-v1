# ✅ Pre-Deployment Checklist

Complete this checklist before pushing to GitHub and deploying.

## 🔐 Security & Secrets

- [ ] Generate new JWT_SECRET (32+ bytes)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Generate new ENCRYPTION_KEY (16 bytes)
  ```bash
  node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
  ```
- [ ] Verify `.env` files are in `.gitignore` (already done ✅)
- [ ] Never commit `.env`, `.env.local`, or `.env.production` files
- [ ] Remove any hardcoded API keys from code
- [ ] Review all console.log statements for sensitive data

## 🗄️ Database Setup

- [ ] Create MongoDB Atlas cluster (free tier available)
- [ ] Get connection string: `mongodb+srv://...`
- [ ] Whitelist all IPs: `0.0.0.0/0` (required for Render)
- [ ] Create database user with read/write permissions
- [ ] Test connection locally

## 💾 Redis Setup

- [ ] Create Redis Cloud database (free tier available) OR
- [ ] Plan to use Render Redis addon
- [ ] Get Redis connection URL: `redis://...`
- [ ] Test connection locally

## ☁️ AWS S3 Setup

- [ ] Create S3 bucket for file uploads
- [ ] Create IAM user with S3 access
- [ ] Get Access Key ID and Secret Access Key
- [ ] Configure bucket CORS policy
- [ ] Test file upload locally

## 🔑 OAuth & API Keys

### Google Cloud Console
- [ ] Create project (or use existing)
- [ ] Enable Google+ API and Gmail API
- [ ] Create OAuth 2.0 credentials
- [ ] Save Client ID and Client Secret
- [ ] **Don't add redirect URIs yet** (add after deployment)

### Dialog360
- [ ] Have Dialog360 account set up
- [ ] API key ready (configured via UI after deployment)
- [ ] Webhook verify token ready: `kepleroai_webhook_token_2024`
- [ ] **Don't configure webhook yet** (configure after backend deployment)

## 📧 Email Configuration

- [ ] Gmail account for sending emails
- [ ] Enable 2FA on Gmail
- [ ] Generate App Password (not regular password)
- [ ] Test SMTP connection

## 📁 File Review

- [ ] Review `backend/.env.production.example` - all variables listed
- [ ] Review `.env.example` - all frontend variables listed
- [ ] Check `.gitignore` includes `.env*` files
- [ ] Remove any test/debug files
- [ ] Remove any `node_modules` from git (should be in `.gitignore`)

## 🧪 Local Testing

- [ ] Backend starts without errors: `cd backend && npm run dev`
- [ ] Frontend starts without errors: `npm run dev`
- [ ] Database connection works
- [ ] Redis connection works
- [ ] File upload to S3 works
- [ ] Google OAuth works locally
- [ ] Can create conversations
- [ ] Can send messages

## 📦 Dependencies

### Backend
- [ ] Run `cd backend && npm install` - no errors
- [ ] Run `cd backend && npm run build` - builds successfully
- [ ] Check `backend/package.json` has correct start script: `node dist/server.js`

### Frontend
- [ ] Run `npm install` - no errors
- [ ] Run `npm run build` - builds successfully
- [ ] Check `package.json` has correct build script

### Python Services
- [ ] Python service has `requirements.txt`
- [ ] All dependencies listed
- [ ] Test `pip install -r requirements.txt`
- [ ] Test `uvicorn main:app --host 0.0.0.0 --port 8000`

## 📝 Documentation Review

- [ ] Read `DEPLOYMENT_QUICK_START.md`
- [ ] Read `DEPLOYMENT_INSTRUCTIONS.md`
- [ ] Read `NGROK_REPLACEMENT_GUIDE.md`
- [ ] Understand the deployment flow
- [ ] Have Render account ready
- [ ] Have Vercel account ready

## 🗃️ Git Preparation

- [ ] Initialize git: `git init` (if not already)
- [ ] Review changes: `git status`
- [ ] Stage files: `git add .`
- [ ] Commit: `git commit -m "Prepare for deployment"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin YOUR_REPO_URL`
- [ ] **Don't push yet** - complete checklist first

## 🔍 Code Review

- [ ] No hardcoded `localhost` URLs without env fallback
- [ ] No hardcoded `127.0.0.1` URLs
- [ ] All sensitive configs use environment variables
- [ ] CORS configured with environment variables
- [ ] Socket.IO CORS configured
- [ ] All API endpoints use `process.env` for external services

## 🌐 Service Accounts

- [ ] Render account created: [render.com](https://render.com)
- [ ] Vercel account created: [vercel.com](https://vercel.com)
- [ ] GitHub account connected to Render
- [ ] GitHub account connected to Vercel
- [ ] MongoDB Atlas account: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- [ ] Redis Cloud account: [redis.com](https://redis.com) (optional if using Render addon)
- [ ] AWS account with S3 access

## 📊 Environment Variables Prepared

### Backend (for Render)
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `MONGODB_URI=...`
- [ ] `REDIS_URL=...`
- [ ] `JWT_SECRET=...` (new, secure)
- [ ] `ENCRYPTION_KEY=...` (new, secure)
- [ ] `AWS_ACCESS_KEY_ID=...`
- [ ] `AWS_SECRET_ACCESS_KEY=...`
- [ ] `AWS_REGION=...`
- [ ] `AWS_S3_BUCKET=...`
- [ ] `GOOGLE_CLIENT_ID=...`
- [ ] `GOOGLE_CLIENT_SECRET=...`
- [ ] `SMTP_USER=...`
- [ ] `SMTP_PASSWORD=...` (Gmail App Password)
- [ ] `DIALOG360_WEBHOOK_TOKEN=...`

### Frontend (for Vercel)
- [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID=...`

**Note**: URLs like `CORS_ORIGIN`, `FRONTEND_URL`, `NEXT_PUBLIC_API_URL` will be set after deployment.

## 🚨 Important Reminders

### ❌ DO NOT COMMIT:
- `.env` files
- `.env.local` files
- `.env.production` files
- `node_modules/`
- `dist/` or `build/` directories
- Any files with API keys or secrets

### ✅ DO COMMIT:
- `.env.example`
- `.env.production.example`
- Source code
- `package.json` and `package-lock.json`
- Configuration files
- Documentation

## 🎯 Deployment Order

After completing this checklist, deploy in this order:

1. **Push to GitHub**
2. **Deploy Backend to Render** → Get backend URL
3. **Deploy Python Services to Render** → Get Python URL
4. **Update Backend env vars** with Python URL
5. **Deploy Frontend to Vercel** → Get frontend URL
6. **Update Backend env vars** with frontend URL (CORS)
7. **Update Google Cloud Console** with production URLs
8. **Update Dialog360** webhook with production URL
9. **Test everything**

## ✅ Ready to Deploy?

If all items are checked, you're ready to:

1. Push to GitHub:
```bash
git push -u origin main
```

2. Follow the [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) guide

---

**Good luck with your deployment!** 🚀

