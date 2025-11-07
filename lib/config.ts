/**
 * Application Configuration
 * Centralized config for demo mode and API settings
 */

export const config = {
  // Demo mode - uses mock data instead of API calls
  isDemoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
  
  // API configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5001',
  
  // App info
  appName: 'AiStein.it',
  appVersion: '1.0.0',
} as const;

export default config;

