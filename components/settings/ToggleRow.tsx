"use client";

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isLast?: boolean;
}

export function ToggleRow({ label, description, checked, onChange, isLast = false }: ToggleRowProps) {
  return (
    <div
      className={`flex items-center justify-between h-14 ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {description && (
          <div className="text-[13px] text-muted-foreground mt-1">{description}</div>
        )}
      </div>

      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

