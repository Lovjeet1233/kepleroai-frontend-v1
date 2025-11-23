"use client";

import { useState, useRef } from "react";
import { X, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<void>;
  listName?: string;
}

export function CSVImportModal({ isOpen, onClose, onImport, listName }: CSVImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        setError("Please select a valid CSV file");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type !== "text/csv" && !droppedFile.name.endsWith(".csv")) {
        setError("Please select a valid CSV file");
        return;
      }
      setFile(droppedFile);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please provide a CSV file");
      return;
    }

    try {
      setImporting(true);
      setError(null);
      await onImport(file);
      handleClose();
    } catch (err: any) {
      setError(err.message || "Failed to import contacts");
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setError(null);
    setImporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-xl w-full max-w-lg mx-4 shadow-2xl border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Import Contacts from CSV</h2>
            {listName && (
              <p className="text-sm text-muted-foreground mt-1">Importing to: {listName}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            disabled={importing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-secondary-foreground mb-2">
              CSV File *
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                file ? "border-green-500 bg-green-500/5" : "border-border hover:border-primary"
              )}
            >
              {file ? (
                <div className="space-y-3">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    <span className="text-green-400 font-medium">{file.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    disabled={importing}
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      Drop your CSV file here, or{" "}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-primary hover:underline"
                        disabled={importing}
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      CSV should contain: name, email, phone, and other fields
                    </p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* CSV Format Info */}
          <div className="p-4 bg-background rounded-lg border border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Expected CSV Format:</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Your CSV file should have headers in the first row. Common columns:
            </p>
            <code className="text-xs text-secondary-foreground bg-black/50 px-2 py-1 rounded block mb-3">
              name,email,phone,company,notes,tags
            </code>
            <a
              href="/contacts-template.csv"
              download="contacts-template.csv"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download Template CSV
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={importing}
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!file || importing}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              !file || importing
                ? "bg-gray-700 text-muted-foreground cursor-not-allowed"
                : "bg-primary text-foreground hover:brightness-110"
            )}
          >
            {importing ? "Importing..." : "Import Contacts"}
          </button>
        </div>
      </div>
    </div>
  );
}

