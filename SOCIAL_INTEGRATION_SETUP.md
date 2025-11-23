# Social Integration Setup Guide (360dialog)

This guide explains how to set up WhatsApp, Instagram, and Facebook integrations using 360dialog in your KepleroAI platform.

## Overview

Your users can connect their WhatsApp Business, Instagram, and Facebook Messenger accounts through the Settings > Socials page. All messages from these platforms will appear in the Conversations section.

## Backend Setup

### 1. Environment Variables

Add these to your `.env` file:

```env
# Encryption key for storing API keys securely (must be 32 characters)
ENCRYPTION_KEY=your-32-character-encryption-key

# Webhook verification token (create a secure random string)
DIALOG360_WEBHOOK_TOKEN=kepleroai_webhook_token_2024
```

### 2. Database Migration

The integration uses a new `SocialIntegration` model. Start your backend to automatically create the collection:

```bash
cd backend
npm run dev
```

### 3. Configure Webhook URL

Your webhook endpoint is:
```
https://yourdomain.com/api/v1/webhooks/360dialog
```

This webhook will receive ALL messages from ALL users' accounts.

## 360dialog Setup (For Each User)

### 1. Create 360dialog Account

1. Go to https://hub.360dialog.com/
2. Sign up for an account
3. Complete business verification

### 2. Get API Credentials

#### For WhatsApp:
- **API Key**: Found in 360dialog dashboard
- **Phone Number ID**: From WhatsApp Business setup
- **WABA ID** (optional): WhatsApp Business Account ID

#### For Instagram:
- **API Key**: Same 360dialog API key
- **Instagram Account ID**: Instagram business account ID

#### For Facebook:
- **API Key**: Same 360dialog API key
- **Facebook Page ID**: Facebook page ID

### 3. Configure Webhook in 360dialog

In the 360dialog dashboard:

1. Go to Webhooks settings
2. Add webhook URL: `https://yourdomain.com/api/v1/webhooks/360dialog`
3. Verification token: Use the value from `DIALOG360_WEBHOOK_TOKEN` in your .env
4. Subscribe to message events

## User Flow

### 1. Connect Integration

1. User goes to **Settings > Socials**
2. Clicks "Connect WhatsApp" (or Instagram/Facebook)
3. Enters their 360dialog credentials
4. System verifies connection
5. Shows "Connected" status

### 2. Receive Messages

When a customer sends a message:

1. 360dialog receives message (WhatsApp/Instagram/Facebook)
2. 360dialog webhook calls your backend
3. Backend identifies which user's account
4. Creates/updates conversation
5. Stores message in database
6. Shows in Conversations section

### 3. Send Replies

From Conversations page:

1. User selects conversation
2. Types reply
3. Backend sends via appropriate channel (WhatsApp/Instagram/Facebook)
4. Message delivered through 360dialog

## Filtering Conversations

In the Conversations page sidebar:

- **Channels** section allows filtering by:
  - Chatbot/Website
  - WhatsApp
  - Instagram
  - Facebook
  - Phone/Call

## API Endpoints

### Get All Integrations
```
GET /api/v1/social-integrations
```

### Get Specific Platform
```
GET /api/v1/social-integrations/{platform}
```
Platform: `whatsapp`, `instagram`, or `facebook`

### Connect Integration
```
POST /api/v1/social-integrations/{platform}/connect
Body:
{
  "apiKey": "360dialog_api_key",
  "phoneNumberId": "...",      // For WhatsApp
  "instagramAccountId": "...", // For Instagram
  "facebookPageId": "..."      // For Facebook
}
```

### Test Connection
```
POST /api/v1/social-integrations/{platform}/test
```

### Disconnect
```
POST /api/v1/social-integrations/{platform}/disconnect
```

### Delete Integration
```
DELETE /api/v1/social-integrations/{platform}
```

## Webhook Payload

360dialog sends webhooks with message data. The backend:

1. Verifies webhook signature
2. Identifies platform (WhatsApp/Instagram/Facebook)
3. Finds organization by platform IDs
4. Creates/updates customer
5. Creates/updates conversation
6. Saves message

## Security

- API keys are **encrypted** before storing in database
- Uses AES-256-CBC encryption
- Decrypted only when needed to send messages
- Never returned in API responses (masked as `***********`)

## Database Schema

### SocialIntegration Collection
```javascript
{
  organizationId: ObjectId,
  platform: 'whatsapp' | 'instagram' | 'facebook',
  status: 'connected' | 'disconnected' | 'error',
  credentials: {
    apiKey: String,           // Encrypted
    phoneNumberId: String,    // WhatsApp
    instagramAccountId: String,
    facebookPageId: String
  },
  webhookVerified: Boolean,
  lastSyncedAt: Date,
  errorMessage: String
}
```

### Conversation Updates
Conversations now support:
- `channel: 'whatsapp'` - WhatsApp messages
- `channel: 'social'` - Instagram/Facebook messages
- `metadata.platform` - Distinguishes between Instagram/Facebook

## Testing

### Test Your Own Integration

1. Add your 360dialog credentials in Settings > Socials
2. Send a message to your connected number/account
3. Check Conversations section for the message
4. Reply from the conversation
5. Verify customer receives the reply

### Test Webhook Locally

Use ngrok to expose your local server:

```bash
ngrok http 5001
```

Update 360dialog webhook URL to ngrok URL.

## Troubleshooting

### Connection Failed
- Verify API key is correct
- Check Phone Number ID / Account IDs
- Ensure 360dialog account is active

### Messages Not Appearing
- Check webhook is configured in 360dialog
- Verify webhook token matches
- Check backend logs for errors
- Ensure customer exists in database

### Cannot Send Messages
- Verify integration status is "connected"
- Check API key hasn't expired
- Ensure customer has platform ID (phone/instagramId/facebookId)
- Review backend logs for send errors

## Multi-Tenant Support

Each organization has separate integrations:
- Credentials stored per organization
- Webhooks automatically routed to correct organization
- Conversations isolated by organization
- No cross-contamination between users

## Rate Limits

360dialog has rate limits:
- WhatsApp: Business tier limits
- Instagram: Standard API limits
- Facebook: Messenger API limits

Monitor your 360dialog dashboard for rate limit status.

## Cost

- 360dialog charges per message
- Pricing varies by platform and region
- Check their website for current rates
- Consider costs when scaling

## Production Checklist

- [ ] Generate secure 32-character ENCRYPTION_KEY
- [ ] Set strong DIALOG360_WEBHOOK_TOKEN
- [ ] Configure HTTPS webhook URL
- [ ] Test all three platforms
- [ ] Monitor error logs
- [ ] Set up alerting for failed messages
- [ ] Document setup process for users
- [ ] Create help documentation

## Support

For issues:
1. Check backend logs
2. Review 360dialog dashboard
3. Test webhook delivery
4. Verify credentials are correct
5. Check network connectivity

## Future Enhancements

Possible improvements:
- Message templates for marketing
- Bulk sending via social channels
- Media attachments (images, videos)
- Read receipts
- Typing indicators
- Message reactions
- Story replies (Instagram)

