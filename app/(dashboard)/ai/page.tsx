"use client";

import { TrainingSidebar } from "@/components/training/TrainingSidebar";
import { KnowledgeBase } from "@/components/training/KnowledgeBase";
import { useKnowledgeBases } from "@/hooks/useKnowledgeBase";
import { CardSkeleton } from "@/components/LoadingSkeleton";

export default function AIPage() {
  const { data: knowledgeBases, isLoading } = useKnowledgeBases();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex" style={{ left: "240px" }}>
        <TrainingSidebar />
        <div className="flex-1 p-8">
          <CardSkeleton count={3} />
        </div>
      </div>
    );
  }

  const kbData = knowledgeBases || [];

  return (
    <div className="fixed inset-0 flex" style={{ left: "240px" }}>
      <TrainingSidebar />
      <KnowledgeBase knowledgeBases={kbData} />
    </div>
  );
}
