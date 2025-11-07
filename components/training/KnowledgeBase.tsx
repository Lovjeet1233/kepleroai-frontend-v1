"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQTab } from "./FAQTab";
import { WebsiteTab } from "./WebsiteTab";
import { FileTab } from "./FileTab";
import { 
  useFAQs, 
  useCreateFAQ, 
  useUpdateFAQ, 
  useDeleteFAQ,
  useWebsites,
  useAddWebsite,
  useRemoveWebsite,
  useFiles,
  useUploadFile,
  useDeleteFile
} from "@/hooks/useKnowledgeBase";

interface KnowledgeBaseData {
  id: string;
  name: string;
}

interface KnowledgeBaseProps {
  knowledgeBases: KnowledgeBaseData[];
}

export function KnowledgeBase({
  knowledgeBases,
}: KnowledgeBaseProps) {
  const [selectedKB, setSelectedKB] = useState(knowledgeBases[0]?.id || '');
  const [activeTab, setActiveTab] = useState<"faq" | "website" | "file">("faq");

  // Fetch data from API only if we have a valid KB ID
  const { data: faqsData, isLoading: loadingFAQs } = useFAQs(selectedKB || null);
  const { data: websitesData, isLoading: loadingWebsites } = useWebsites(selectedKB || null);
  const { data: filesData, isLoading: loadingFiles } = useFiles(selectedKB || null);

  // Mutations - only initialize if we have a valid KB ID
  const createFAQ = useCreateFAQ(selectedKB);
  const updateFAQ = useUpdateFAQ(selectedKB);
  const deleteFAQ = useDeleteFAQ(selectedKB);
  const addWebsite = useAddWebsite(selectedKB);
  const removeWebsite = useRemoveWebsite(selectedKB);
  const uploadFile = useUploadFile(selectedKB);
  const deleteFile = useDeleteFile(selectedKB);

  const faqs = faqsData || [];
  const websites = websitesData || [];
  const files = filesData || [];

  // Check if no knowledge bases exist
  const hasNoKnowledgeBases = !knowledgeBases || knowledgeBases.length === 0;

  // FAQ handlers
  const handleAddFAQ = async (data: { question: string; answer: string }) => {
    if (!selectedKB) {
      throw new Error('No knowledge base selected');
    }
    await createFAQ.mutateAsync(data);
  };

  const handleEditFAQ = async (id: string, data: { question: string; answer: string }) => {
    if (!selectedKB) {
      throw new Error('No knowledge base selected');
    }
    await updateFAQ.mutateAsync({ faqId: id, data });
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!selectedKB) {
      throw new Error('No knowledge base selected');
    }
    await deleteFAQ.mutateAsync(id);
  };

  // Website handlers
  const handleAddWebsite = async (url: string) => {
    if (!selectedKB) {
      throw new Error('No knowledge base selected');
    }
    await addWebsite.mutateAsync({ url });
  };

  const handleDeleteWebsite = async (id: string) => {
    if (!selectedKB) {
      throw new Error('No knowledge base selected');
    }
    await removeWebsite.mutateAsync(id);
  };

  const handleTogglePage = (websiteId: string, pageId: string) => {
    // This would be handled on the backend in a real implementation
    console.log('Toggle page:', websiteId, pageId);
  };

  const handleAddAllPages = (websiteId: string) => {
    // This would be handled on the backend in a real implementation
    console.log('Add all pages:', websiteId);
  };

  // File handlers
  const handleFilesAdded = async (newFiles: File[]) => {
    if (!selectedKB) {
      throw new Error('No knowledge base selected');
    }
    for (const file of newFiles) {
      await uploadFile.mutateAsync(file);
    }
  };

  const handleDeleteFile = async (id: string) => {
    if (!selectedKB) {
      throw new Error('No knowledge base selected');
    }
    await deleteFile.mutateAsync(id);
  };

  const selectedKnowledgeBase = knowledgeBases.find(kb => kb.id === selectedKB);

  // Show empty state if no knowledge bases
  if (hasNoKnowledgeBases) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Knowledge Base Found
          </h3>
          <p className="text-muted-foreground mb-6">
            You need to create a knowledge base first. Run the seed script to create a default knowledge base.
          </p>
          <div className="bg-secondary border border-border rounded-lg p-4 text-left">
            <p className="text-sm text-muted-foreground mb-2">Run this command in your backend folder:</p>
            <code className="text-sm text-primary block bg-black/50 p-2 rounded">
              npm run seed:kb
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 px-6 flex items-center border-b border-border">
        <div className="relative">
          <button className="flex items-center gap-2 w-[280px] px-4 py-2.5 bg-secondary rounded-lg text-sm text-white hover:bg-accent transition-colors">
            <span className="flex-1 text-left">{selectedKnowledgeBase?.name || 'Select Knowledge Base'}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="px-6 pt-4 border-b border-border">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("faq")}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === "faq" ? "text-foreground" : "text-muted-foreground hover:text-secondary-foreground"
            )}
          >
            FAQ
            {activeTab === "faq" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("website")}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === "website" ? "text-foreground" : "text-muted-foreground hover:text-secondary-foreground"
            )}
          >
            Website
            {activeTab === "website" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("file")}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === "file" ? "text-foreground" : "text-muted-foreground hover:text-secondary-foreground"
            )}
          >
            File
            {activeTab === "file" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "faq" && (
          <FAQTab
            faqs={faqs}
            onAddFAQ={handleAddFAQ}
            onEditFAQ={handleEditFAQ}
            onDeleteFAQ={handleDeleteFAQ}
          />
        )}
        {activeTab === "website" && (
          <WebsiteTab
            websites={websites}
            onAddWebsite={handleAddWebsite}
            onDeleteWebsite={handleDeleteWebsite}
            onTogglePage={handleTogglePage}
            onAddAllPages={handleAddAllPages}
          />
        )}
        {activeTab === "file" && (
          <FileTab
            files={files}
            onFilesAdded={handleFilesAdded}
            onDeleteFile={handleDeleteFile}
          />
        )}
      </div>
    </div>
  );
}
