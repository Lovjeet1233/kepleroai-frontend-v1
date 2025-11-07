"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Note: Authentication is handled by ProtectedRoute wrapper in layout.tsx
  // No need to duplicate authentication checks here

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onCollapseChange={setIsSidebarCollapsed} />
      <main
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: isSidebarCollapsed ? "60px" : "240px",
        }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
