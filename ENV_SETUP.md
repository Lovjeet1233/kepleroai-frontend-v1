# Environment Variables Setup

## 📝 Instructions

Create a `.env.local` file in the root directory of your project with the following configuration:

## 🔧 Required Environment Variables

```bash
# ===========================================
# API Configuration (REQUIRED)
# ===========================================
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:5001

# ===========================================
# App Configuration (REQUIRED)
# ===========================================
NEXT_PUBLIC_APP_NAME=ChatBot Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🎛️ Optional Environment Variables

```bash
# ===========================================
# Feature Flags
# ===========================================
NEXT_PUBLIC_ENABLE_VOICE=false
NEXT_PUBLIC_ENABLE_SOCIAL_CHANNELS=false

# ===========================================
# File Upload Configuration
# ===========================================
# Maximum file size in bytes (5MB = 5242880 bytes)
NEXT_PUBLIC_MAX_FILE_SIZE=5242880

# Allowed file types for upload (comma-separated)
NEXT_PUBLIC_ALLOWED_FILE_TYPES=.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls

# ===========================================
# Analytics
# ===========================================
# Google Analytics Tracking ID
NEXT_PUBLIC_GA_TRACKING_ID=

# Google Tag Manager ID
NEXT_PUBLIC_GTM_ID=

# ===========================================
# Error Tracking
# ===========================================
# Sentry DSN for error tracking
NEXT_PUBLIC_SENTRY_DSN=

# Sentry environment
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development

# ===========================================
# Development Settings
# ===========================================
# Enable React Query Devtools (true in development)
NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS=true

# API Request Timeout (milliseconds)
NEXT_PUBLIC_API_TIMEOUT=30000

# ===========================================
# Authentication Configuration
# ===========================================
# Token expiry time (in seconds) - 1 hour
NEXT_PUBLIC_TOKEN_EXPIRY=3600

# Refresh token expiry time (in seconds) - 7 days
NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY=604800
```

## 🚀 Quick Start

1. **Copy the required variables above**
2. **Create `.env.local` file** in project root
3. **Paste the configuration**
4. **Update the values** for your environment:
   - Replace `http://localhost:5001` with your backend URL
   - Update port numbers if different
   - Set your app name and URL

## 🔒 Security Notes

- **Never commit `.env.local`** - it's already in `.gitignore`
- Use `.env.example` as a template for your team
- In production, use environment-specific variables
- Store sensitive keys in secure secret managers

## 🌍 Environment-Specific Setup

### Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:5001
```

### Staging
```bash
NEXT_PUBLIC_API_URL=https://staging-api.yourdomain.com/api/v1
NEXT_PUBLIC_WS_URL=https://staging-api.yourdomain.com
```

### Production
```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_WS_URL=https://api.yourdomain.com
```

## ✅ Verify Setup

After creating `.env.local`, restart your development server:

```bash
npm run dev
```

Then verify in browser console:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL);
// Should output: http://localhost:5001/api/v1
```

## 🔧 Troubleshooting

**Issue: Variables not loading**
- Restart the dev server after creating/modifying `.env.local`
- Ensure file is named exactly `.env.local`
- Check that variables start with `NEXT_PUBLIC_` for client-side access

**Issue: API connection fails**
- Verify backend server is running
- Check the port number matches your backend
- Ensure no firewall blocking the connection

## 📚 Additional Resources

- [Next.js Environment Variables Docs](https://nextjs.org/docs/basic-features/environment-variables)
- [Environment Variables Best Practices](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order)

