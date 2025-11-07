"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface FileUploadZoneProps {
  onFilesAdded: (files: File[]) => void;
}

export function FileUploadZone({ onFilesAdded }: FileUploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/csv": [".csv"],
      "text/tab-separated-values": [".tsv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer transition-colors ${
        isDragActive ? "bg-secondary border-[#6366f1]" : "hover:bg-secondary"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-secondary p-4">
          <Upload className="w-12 h-12 text-muted-foreground" />
        </div>
        <div>
          <p className="text-base font-medium text-white mb-1">
            {isDragActive
              ? "Drop files here"
              : "Click to upload or drag files here"}
          </p>
          <p className="text-[13px] text-muted-foreground">
            PDF, DOCX, CSV, TSV, XLSX • Max 5MB
          </p>
        </div>
      </div>
    </div>
  );
}

