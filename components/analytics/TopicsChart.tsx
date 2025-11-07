"use client";

import { MoreVertical } from "lucide-react";
import { TopicData } from "@/data/mockAnalytics";

interface TopicsChartProps {
  data: TopicData[];
}

export function TopicsChart({ data }: TopicsChartProps) {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Most Discussed Topics
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {data.map((item) => {
          const percentage = (item.count / maxCount) * 100;
          
          return (
            <div key={item.topic}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{item.topic}</span>
              </div>
              <div className="relative h-8 bg-secondary rounded overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded transition-all"
                  style={{ width: `${percentage}%` }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white font-medium z-10">
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

