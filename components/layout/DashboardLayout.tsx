"use client";

import { Sidebar } from "./Sidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutInner({ children }: DashboardLayoutProps) {
  const { isCollapsed, setIsCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onCollapseChange={setIsCollapsed} />
      <main
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: isCollapsed ? "60px" : "240px",
        }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </SidebarProvider>
  );
}
