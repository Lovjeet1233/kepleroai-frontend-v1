"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "html" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-background border border-border rounded-lg p-4 mt-4">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground rounded-md text-xs font-medium transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </>
        )}
      </button>

      <pre className="text-[13px] text-secondary-foreground font-mono overflow-x-auto pr-24">
        <code>{code}</code>
      </pre>
    </div>
  );
}

