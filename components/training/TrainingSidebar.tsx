"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, ChevronRight, MessageSquare, Phone, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  children?: { icon: React.ElementType; label: string; href: string }[];
};

export function TrainingSidebar() {
  const [aiBehaviorExpanded, setAiBehaviorExpanded] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      icon: BookOpen,
      label: "Knowledge Base",
      href: "/ai",
    },
    {
      icon: ChevronDown,
      label: "AI Behavior",
      href: "/ai/behavior",
      children: [
        { icon: MessageSquare, label: "Chat Agent", href: "/ai/behavior" },
        { icon: Phone, label: "Voice Agent", href: "/ai/voice" },
      ],
    },
    {
      icon: Puzzle,
      label: "Integrations",
      href: "/ai/integrations",
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-[260px] bg-card border-r border-border h-full p-3">
      <div className="px-3 py-4">
        <h2 className="text-base font-semibold text-foreground">AI</h2>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          if (item.label === "AI Behavior") {
            return (
              <div key={item.label}>
                <button
                  onClick={() => setAiBehaviorExpanded(!aiBehaviorExpanded)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-secondary-foreground hover:bg-secondary transition-colors"
                >
                  {aiBehaviorExpanded ? (
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </button>
                {aiBehaviorExpanded && item.children && (
                  <div className="ml-8 space-y-1 mt-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-colors",
                            isActive(child.href)
                              ? "bg-primary text-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                          )}
                        >
                          <ChildIcon className="w-3 h-3 shrink-0" />
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary text-foreground"
                  : "text-secondary-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

