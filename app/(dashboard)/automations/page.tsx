"use client";

import { NodeBasedBuilder } from "@/components/automations/NodeBasedBuilder";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { Automation } from "@/data/mockAutomations";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAutomations();
  }, []);

  const loadAutomations = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/automations');
      
      console.log('Full response:', JSON.stringify(response, null, 2));
      console.log('Response data:', response.data);
      console.log('Response data.data:', response.data?.data);
      
      // Handle both response formats - the backend uses successResponse which wraps in data
      let automationsList: any[] = [];
      
      if (response.data?.success && response.data?.data) {
        // Standard format: { success: true, data: [...] }
        automationsList = Array.isArray(response.data.data) ? response.data.data : [];
      } else if (Array.isArray(response.data)) {
        // Direct array format
        automationsList = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        // Nested data format
        automationsList = response.data.data;
      }
      
      console.log('Automations list:', automationsList);
      
      if (automationsList.length > 0) {
        // Transform backend data to frontend format
        const transformedAutomations: Automation[] = automationsList.map((auto: any) => ({
          id: auto._id,
          name: auto.name,
          status: auto.isActive ? "enabled" : "disabled",
          nodes: auto.nodes || [],
          lastExecuted: auto.lastExecutedAt || null,
          executionCount: auto.executionCount || 0,
          createdAt: auto.createdAt,
        }));
        
        console.log('Transformed automations:', transformedAutomations);
        setAutomations(transformedAutomations);
      } else {
        console.log('No automations found, starting with empty array');
        setAutomations([]);
      }
    } catch (error: any) {
      console.error('Error loading automations:', error);
      console.error('Error details:', error.response?.data);
      // Start with empty array if error
      setAutomations([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading automations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <NodeBasedBuilder automations={automations} onAutomationsChange={setAutomations} />
    </div>
  );
}
