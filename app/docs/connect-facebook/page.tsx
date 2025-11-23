'use client';

import { Card } from '@/components/ui/card';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ConnectFacebookDocs() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Connect Facebook Messenger</h1>
          <p className="text-muted-foreground">
            Step-by-step guide to get your Meta Graph API credentials for Facebook Messenger
          </p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Prerequisites</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Facebook Business Page (not personal profile)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Admin access to the Facebook Page</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Meta Business Account (verified)</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🚀 Step 1: Create Meta App</h2>
          <ol className="space-y-4 text-sm list-decimal list-inside">
            <li>
              Go to <a href="https://developers.facebook.com/apps/" target="_blank" className="text-primary hover:underline inline-flex items-center gap-1">
                Meta for Developers <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>Click <strong>"Create App"</strong></li>
            <li>Select <strong>"Business"</strong> as app type</li>
            <li>Fill in app details:
              <ul className="ml-6 mt-2 space-y-1 list-disc">
                <li>App Name: Your company name</li>
                <li>Contact Email: Your email</li>
                <li>Business Account: Select your Meta Business Account</li>
              </ul>
            </li>
            <li>Click <strong>"Create App"</strong></li>
          </ol>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🔧 Step 2: Add Messenger Product</h2>
          <ol className="space-y-4 text-sm list-decimal list-inside">
            <li>In your app dashboard, find <strong>"Messenger"</strong> product</li>
            <li>Click <strong>"Set Up"</strong></li>
            <li>Scroll to <strong>"Access Tokens"</strong> section</li>
            <li>Click <strong>"Add or Remove Pages"</strong></li>
            <li>Select your Facebook Page and authorize</li>
            <li>Click <strong>"Generate Token"</strong> for your page</li>
            <li>Copy the <strong>Page Access Token</strong> (starts with EAAA...)</li>
          </ol>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🔑 Step 3: Get Your Credentials</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Meta App ID:</h3>
              <p>Go to <strong>App Settings → Basic</strong>, copy <strong>"App ID"</strong></p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Meta App Secret:</h3>
              <p>In the same page, copy <strong>"App Secret"</strong> (click "Show")</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Facebook Page ID:</h3>
              <ol className="ml-6 mt-2 space-y-1 list-decimal">
                <li>Go to your Facebook Page</li>
                <li>Click <strong>"Settings"</strong></li>
                <li>Scroll to <strong>"About"</strong> section</li>
                <li>Find <strong>"Page ID"</strong> and copy the number</li>
              </ol>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🪝 Step 4: Set Up Webhooks</h2>
          <ol className="space-y-4 text-sm list-decimal list-inside">
            <li>In your Meta App, go to <strong>Messenger → Settings</strong></li>
            <li>Scroll to <strong>"Webhooks"</strong> section</li>
            <li>Click <strong>"Add Callback URL"</strong></li>
            <li>Enter Callback URL: <code className="bg-muted px-2 py-1 rounded text-xs">https://yourdomain.com/api/v1/webhooks/360dialog</code></li>
            <li>Enter Verify Token: Use the token from your backend env</li>
            <li>Click <strong>"Verify and Save"</strong></li>
            <li>Subscribe to webhook fields:
              <ul className="ml-6 mt-2 space-y-1 list-disc">
                <li><code className="bg-muted px-1 py-0.5 rounded">messages</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">messaging_postbacks</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">message_deliveries</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">message_reads</code></li>
              </ul>
            </li>
          </ol>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Step 5: Request Permissions</h2>
          <p className="text-sm mb-4">
            For your app to work in production, you need to request permissions:
          </p>
          <ol className="space-y-2 text-sm list-decimal list-inside">
            <li>Go to <strong>App Review → Permissions and Features</strong></li>
            <li>Request these permissions:
              <ul className="ml-6 mt-2 space-y-1 list-disc">
                <li><code className="bg-muted px-1 py-0.5 rounded">pages_messaging</code></li>
                <li><code className="bg-muted px-1 py-0.5 rounded">pages_manage_metadata</code></li>
              </ul>
            </li>
            <li>Fill in the required information</li>
            <li>Submit for review (usually takes 3-5 business days)</li>
          </ol>
        </Card>

        <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <h2 className="text-xl font-semibold mb-4">⚠️ Important Notes</h2>
          <ul className="space-y-2 text-sm">
            <li>• Page Access Tokens don't expire if page permissions remain unchanged</li>
            <li>• Test in Development Mode before submitting for review</li>
            <li>• Only page admins can test during development</li>
            <li>• Rate limits: 200 API calls per hour per user</li>
            <li>• 24-hour messaging window applies (outside window requires message templates)</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">✅ Final Step: Enter in Settings</h2>
          <p className="text-sm mb-4">
            Once you have all credentials, go to your <strong>Settings → Socials</strong> page and enter:
          </p>
          <ul className="space-y-1 text-sm list-disc list-inside ml-4">
            <li>Meta Access Token (Page Access Token)</li>
            <li>Meta App ID</li>
            <li>Meta App Secret</li>
            <li>Facebook Page ID</li>
          </ul>
          <p className="text-sm mt-4 text-muted-foreground">
            Click "Save & Connect" to test the connection!
          </p>
        </Card>

        <div className="flex gap-4">
          <a
            href="https://developers.facebook.com/docs/messenger-platform"
            target="_blank"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Official Messenger Platform Docs <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

