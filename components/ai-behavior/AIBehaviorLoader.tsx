"use client";

import { useEffect } from 'react';
import { useKnowledgeBase } from '@/contexts/KnowledgeBaseContext';

export function AIBehaviorLoader() {
  const { setChatAgentPrompt, setVoiceAgentPrompt, loadCollections } = useKnowledgeBase();

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        // Load knowledge bases from database
        await loadCollections();

        // Load AI behavior settings from backend
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';
        const response = await fetch(`${API_URL}/ai-behavior`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          const aiBehavior = result.data;

          // Load chat agent prompt
          if (aiBehavior.chatAgent?.systemPrompt) {
            setChatAgentPrompt(aiBehavior.chatAgent.systemPrompt);
          }

          // Load voice agent prompt
          if (aiBehavior.voiceAgent?.systemPrompt) {
            setVoiceAgentPrompt(aiBehavior.voiceAgent.systemPrompt);
          }

          console.log('✅ AI Behavior and Knowledge Bases loaded from database');
        }
      } catch (error) {
        console.error('Failed to load data from backend:', error);
      }
    };

    loadData();
  }, [setChatAgentPrompt, setVoiceAgentPrompt, loadCollections]);

  return null; // This is a data loader component, doesn't render anything
}

