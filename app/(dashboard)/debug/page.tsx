"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

export default function DebugPage() {
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [conversations, setConversations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    setAuthStatus({
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : null,
      user: user ? JSON.parse(user) : null,
    });
  };

  const testConversationsAPI = async () => {
    try {
      setError(null);
      const response = await apiClient.get('/conversations');
      console.log('API Response:', response);
      setConversations(response);
    } catch (err: any) {
      console.error('API Error:', err);
      setError(err.message || 'Unknown error');
      setConversations(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🔍 Debug Panel</h1>

      {/* Auth Status */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Authentication Status</h2>
        <pre className="text-sm bg-secondary p-3 rounded overflow-auto">
          {JSON.stringify(authStatus, null, 2)}
        </pre>
      </div>

      {/* Test API Button */}
      <button
        onClick={testConversationsAPI}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 mb-4"
      >
        Test Conversations API
      </button>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-4">
          <h3 className="text-red-500 font-semibold mb-2">❌ Error</h3>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Conversations Display */}
      {conversations && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">
            ✅ Conversations API Response (
            {conversations.data?.items?.length || 
             conversations.data?.data?.items?.length || 
             conversations.items?.length || 0} items)
          </h2>
          <pre className="text-sm bg-secondary p-3 rounded overflow-auto max-h-96">
            {JSON.stringify(conversations, null, 2)}
          </pre>
        </div>
      )}

      {/* Open Console Reminder */}
      <div className="mt-6 bg-blue-500/10 border border-blue-500 rounded-lg p-4">
        <p className="text-sm text-blue-400">
          💡 <strong>Tip:</strong> Open your browser console (F12) to see detailed logs
        </p>
      </div>
    </div>
  );
}

