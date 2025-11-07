"use client";

import { useState } from "react";
import { Globe, RotateCw, Pencil, Trash2 } from "lucide-react";
import { Website } from "@/data/mockWebsites";

interface WebsiteTabProps {
  websites: Website[];
  onAddWebsite: (url: string) => void;
  onDeleteWebsite: (id: string) => void;
  onTogglePage: (websiteId: string, pageId: string) => void;
  onAddAllPages: (websiteId: string) => void;
}

export function WebsiteTab({
  websites,
  onAddWebsite,
  onDeleteWebsite,
  onTogglePage,
  onAddAllPages,
}: WebsiteTabProps) {
  const [urlInput, setUrlInput] = useState("");

  const handleAddWebsite = () => {
    if (urlInput.trim()) {
      onAddWebsite(urlInput.trim());
      setUrlInput("");
    }
  };

  return (
    <div className="p-6">
      {/* Top section - URL input */}
      <div className="max-w-[600px] mb-6">
        <div className="flex gap-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter website URL"
            className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddWebsite();
              }
            }}
          />
          <button
            onClick={handleAddWebsite}
            disabled={!urlInput.trim()}
            className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Website
          </button>
        </div>
        <button className="mt-3 text-sm text-indigo-400 hover:underline">
          or add individual URLs manually
        </button>
      </div>

      {/* Website cards */}
      {websites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-full bg-secondary p-4 mb-4">
            <Globe className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No websites added yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter a website URL above to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {websites.map((website) => {
            const selectedCount = website.pages.filter((p) => p.selected).length;
            
            return (
              <div
                key={website.id}
                className="border border-border rounded-xl p-5"
              >
                {/* Domain header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {website.domain}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedCount} of {website.pages.length} pages selected
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Update"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-green-400 hover:text-green-300 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteWebsite(website.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Page checkboxes */}
                <div className="space-y-0.5 mb-3">
                  {website.pages.map((page) => (
                    <label
                      key={page.id}
                      className="flex items-center gap-3 h-10 px-2 rounded hover:bg-secondary cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={page.selected}
                        onChange={() => onTogglePage(website.id, page.id)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="text-sm text-muted-foreground truncate">
                        {page.url}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Add all pages button */}
                {selectedCount < website.pages.length && (
                  <button
                    onClick={() => onAddAllPages(website.id)}
                    className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all"
                  >
                    Add all pages ({website.pages.length - selectedCount} remaining)
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
