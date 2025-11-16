'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { QueryProvider } from './QueryProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { KnowledgeBaseProvider } from '@/contexts/KnowledgeBaseContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

/**
 * App Providers
 * Wraps the app with all necessary providers
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <KnowledgeBaseProvider>
              {children}
              {/* Toast notifications */}
              <Toaster 
                position="top-right" 
                richColors 
                closeButton
                toastOptions={{
                  duration: 3000,
                }}
              />
            </KnowledgeBaseProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

