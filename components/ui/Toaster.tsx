"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#141414",
          border: "1px solid #262626",
          color: "#e5e5e5",
          padding: "16px",
          borderRadius: "12px",
        },
        className: "group",
        descriptionClassName: "text-muted-foreground",
      }}
    />
  );
}

