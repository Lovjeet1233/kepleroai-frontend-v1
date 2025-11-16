# ✅ Deployment Checklist

## Fixed Issues

### ✅ Hardcoded URLs Removed
All hardcoded `localhost` URLs have been replaced with environment variables:

- ✅ `contexts/KnowledgeBaseContext.tsx` - now uses `NEXT_PUBLIC_API_URL`
- ✅ `components/ai-behavior/AIBehaviorLoader.tsx` - now uses `NEXT_PUBLIC_API_URL`
- ✅ `app/widget/[widgetId]/page.tsx` - now uses `NEXT_PUBLIC_API_URL`
- ✅ `components/knowledge-base/CreateCollectionModal.tsx` - now uses `NEXT_PUBLIC_API_URL`
- ✅ `services/pythonRag.service.ts` - now uses `NEXT_PUBLIC_RAG_API_URL`
- ✅ `lib/socket.ts` - now uses `NEXT_PUBLIC_SOCKET_URL`

## Required Environment Variables

### Frontend (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-backend.onrender.com
NEXT_PUBLIC_RAG_API_URL=https://your-python-rag.onrender.com  # Optional if you deploy Python RAG
```

### Backend (Render)
```bash
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatbot_platform

# Redis
REDIS_URL=redis://default:password@your-redis.upstash.io:6379

# JWT
JWT_SECRET=your_random_32_character_secret_key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://your-app.vercel.app
SOCKET_IO_CORS_ORIGIN=https://your-app.vercel.app

# Frontend URL
FRONTEND_URL=https://your-app.vercel.app

# Optional: Python RAG Service
RAG_API_URL=https://your-python-rag.onrender.com
COMM_API_URL=https://your-comm-api.onrender.com

# File Storage (Cloudinary recommended for free tier)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Gmail SMTP - Free)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
MAX_KNOWLEDGE_BASE_SIZE=104857600
ALLOWED_FILE_TYPES=pdf,docx,csv,txt,tsv

# Other
LOG_LEVEL=info
ENABLE_SCHEDULED_JOBS=true
API_VERSION=v1
ENCRYPTION_KEY=your_32_char_encryption_key
```

## 🚀 Quick Deployment Steps

### 1. Setup Free Services

#### a) MongoDB Atlas (Database)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create FREE M0 cluster (512MB)
3. Create database user & whitelist IP: `0.0.0.0/0`
4. Get connection string

#### b) Upstash Redis (Cache)
1. Sign up at https://upstash.com
2. Create Redis database (10K commands/day free)
3. Get Redis URL

#### c) Cloudinary (File Storage)
1. Sign up at https://cloudinary.com
2. Get Cloud Name, API Key, API Secret from dashboard

### 2. Deploy Backend (Render)

1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add all backend environment variables
6. Deploy & copy your backend URL

### 3. Deploy Frontend (Vercel)

#### Option A: Vercel Dashboard
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./`
4. Add frontend environment variables:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1
   NEXT_PUBLIC_SOCKET_URL=https://your-backend.onrender.com
   ```
5. Deploy

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /Users/lovjeetsingh/Desktop/KepleroAI_v1
vercel --prod

# Follow prompts and add environment variables
```

### 4. Update CORS Settings

After frontend is deployed, update backend environment variables:
```bash
CORS_ORIGIN=https://your-app.vercel.app
SOCKET_IO_CORS_ORIGIN=https://your-app.vercel.app
FRONTEND_URL=https://your-app.vercel.app
```

### 5. Seed Database (Optional)

SSH into Render backend or run locally:
```bash
npm run seed:admin
npm run seed:folders
npm run seed:kb
npm run seed:lists
```

## ⚠️ Important Notes

### Free Tier Limitations

1. **Render Free Tier**:
   - Service sleeps after 15 min inactivity
   - Takes 30-60s to wake up on first request
   - 750 hours/month (enough for 1 service 24/7)

2. **Vercel Free Tier**:
   - 100GB bandwidth/month
   - Unlimited deployments
   - Custom domains supported (free)

3. **MongoDB Atlas Free**:
   - 512MB storage
   - Shared CPU
   - No backups

4. **Upstash Redis Free**:
   - 10K commands/day
   - 256MB storage

### Preventing Sleep (Optional)

Use a free ping service to keep Render awake:
- **UptimeRobot** (https://uptimerobot.com) - Free, ping every 5 min
- **BetterUptime** (https://betteruptime.com) - Free, ping every 3 min
- **Cron-Job.org** (https://cron-job.org) - Free scheduled pings

## 🧪 Testing After Deployment

1. ✅ Test login at `https://your-app.vercel.app/auth/signin`
2. ✅ Check dashboard loads
3. ✅ Test API connection (check browser console)
4. ✅ Create test conversation
5. ✅ Test file upload
6. ✅ Check WebSocket connection (real-time features)

## 🐛 Troubleshooting

### Frontend can't connect to backend
- ✅ Verify `NEXT_PUBLIC_API_URL` is correct in Vercel
- ✅ Check backend CORS settings include frontend URL
- ✅ Check browser console for errors

### Backend errors
- ✅ Check logs in Render dashboard
- ✅ Verify all environment variables are set
- ✅ Test MongoDB connection string locally

### Database connection failed
- ✅ Whitelist IP `0.0.0.0/0` in MongoDB Atlas
- ✅ Verify username/password in connection string
- ✅ Check database user has read/write permissions

### WebSocket not connecting
- ✅ Verify `SOCKET_IO_CORS_ORIGIN` matches frontend URL
- ✅ Check `NEXT_PUBLIC_SOCKET_URL` is correct

## 📚 Alternative Services (All Free)

### Backend Hosting
- **Railway** (500 hrs/month) - https://railway.app
- **Fly.io** (3 VMs free) - https://fly.io
- **Cyclic** (Unlimited serverless) - https://cyclic.sh

### Database
- **Supabase** (PostgreSQL, 500MB) - https://supabase.com
- **PlanetScale** (MySQL, 5GB) - https://planetscale.com

### Redis
- **Redis Cloud** (30MB free) - https://redis.com/cloud

## 🎉 Success!

Once deployed, your app will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share your deployed app with the world! 🚀

