"use client";

import { useState } from "react";
import { FileText, Trash2, File } from "lucide-react";
import { UploadedFile, formatFileSize } from "@/data/mockFiles";
import { FileUploadZone } from "./FileUploadZone";
import { SpaceUsageIndicator } from "./SpaceUsageIndicator";

interface FileTabProps {
  files: UploadedFile[];
  onFilesAdded: (files: File[]) => void;
  onDeleteFile: (id: string) => void;
}

export function FileTab({ files, onFilesAdded, onDeleteFile }: FileTabProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("word")) return "📝";
    if (type.includes("sheet") || type.includes("csv")) return "📊";
    return "📎";
  };

  return (
    <div className="relative">
      <div className="p-6">
        {files.length === 0 ? (
          /* Empty state with upload zone */
          <div className="max-w-2xl mx-auto">
            <FileUploadZone onFilesAdded={onFilesAdded} />
          </div>
        ) : (
          /* File list */
          <div>
            {/* Upload zone at top when files exist */}
            <div className="max-w-2xl mx-auto mb-6">
              <FileUploadZone onFilesAdded={onFilesAdded} />
            </div>

            {/* File table */}
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                      Size
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                      Date Uploaded
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr
                      key={file.id}
                      className="border-b border-border hover:bg-secondary transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getFileIcon(file.type)}</span>
                          <span className="text-sm text-foreground">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(file.uploadedAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onDeleteFile(file.id)}
                          className="inline-flex items-center justify-center p-2 text-red-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Space usage indicator */}
      <SpaceUsageIndicator />
    </div>
  );
}
