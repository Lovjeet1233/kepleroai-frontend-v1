import { useEffect, useRef } from 'react';
import { socketClient } from '@/lib/socket';
import { authService } from '@/services/auth.service';

/**
 * Custom hook to manage Socket.IO connection
 */
export function useSocket() {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Initialize socket connection
    if (!isInitialized.current && authService.isAuthenticated()) {
      const token = authService.getAccessToken();
      if (token) {
        socketClient.connect(token);
        isInitialized.current = true;
      }
    }

    // Cleanup on unmount
    return () => {
      // Don't disconnect on component unmount, only when user logs out
      // socketClient.disconnect();
    };
  }, []);

  return {
    socket: socketClient,
    isConnected: socketClient.isConnected(),
  };
}

/**
 * Hook to join/leave conversation rooms
 */
export function useConversationRoom(conversationId: string | null) {
  const { socket } = useSocket();

  useEffect(() => {
    if (conversationId) {
      socket.joinConversation(conversationId);

      return () => {
        socket.leaveConversation(conversationId);
      };
    }
  }, [conversationId, socket]);

  return socket;
}

/**
 * Hook to listen for new messages
 */
export function useNewMessage(callback: (message: any) => void) {
  const { socket } = useSocket();

  useEffect(() => {
    socket.onNewMessage(callback);

    return () => {
      socket.off('message:new', callback);
    };
  }, [callback, socket]);
}

/**
 * Hook to listen for conversation updates
 */
export function useConversationUpdates(callback: (conversation: any) => void) {
  const { socket } = useSocket();

  useEffect(() => {
    socket.onConversationUpdate(callback);

    return () => {
      socket.off('conversation:updated', callback);
    };
  }, [callback, socket]);
}

/**
 * Hook to handle typing indicators
 */
export function useTypingIndicator(conversationId: string) {
  const { socket } = useSocket();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = () => {
    socket.startTyping(conversationId);

    // Auto-stop typing after 3 seconds
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.stopTyping(conversationId);
    }, 3000);
  };

  const stopTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.stopTyping(conversationId);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return { startTyping, stopTyping };
}

/**
 * Hook to listen for notifications
 */
export function useNotifications(callback: (notification: any) => void) {
  const { socket } = useSocket();

  useEffect(() => {
    socket.onNotification(callback);

    return () => {
      socket.off('notification:new', callback);
    };
  }, [callback, socket]);
}

