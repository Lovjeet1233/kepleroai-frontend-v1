"use client";

import { useState } from "react";
import { Search, Upload, BookOpen, Pencil, Trash2 } from "lucide-react";
import { FAQ } from "@/data/mockFAQs";
import { FAQModal } from "./FAQModal";

interface FAQTabProps {
  faqs: FAQ[];
  onAddFAQ: (data: { question: string; answer: string }) => void;
  onEditFAQ: (id: string, data: { question: string; answer: string }) => void;
  onDeleteFAQ: (id: string) => void;
}

export function FAQTab({ faqs, onAddFAQ, onEditFAQ, onDeleteFAQ }: FAQTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (data: { question: string; answer: string }) => {
    if (editingFAQ) {
      onEditFAQ(editingFAQ.id, data);
      setEditingFAQ(null);
    } else {
      onAddFAQ(data);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFAQ(null);
  };

  return (
    <div className="p-6">
      {/* Top section */}
      <div className="flex items-center justify-between mb-6">
        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Find FAQ"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            <Upload className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <span>+ Add FAQ</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {filteredFAQs.length === 0 && searchQuery === "" ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-full bg-secondary p-4 mb-4">
            <BookOpen className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No FAQs yet</h3>
          <p className="text-sm text-muted-foreground">
            Click Add FAQ to get started
          </p>
        </div>
      ) : (
        /* FAQ list */
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="border border-border rounded-xl p-5 hover:border-primary transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {faq.answer}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteFAQ(faq.id)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <FAQModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={
          editingFAQ
            ? { question: editingFAQ.question, answer: editingFAQ.answer }
            : undefined
        }
        mode={editingFAQ ? "edit" : "add"}
      />
    </div>
  );
}

