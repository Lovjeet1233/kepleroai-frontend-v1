import { Plus } from "lucide-react";

interface NodeConnectorProps {
  onAddNode: () => void;
}

export function NodeConnector({ onAddNode }: NodeConnectorProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-0.5 h-6 bg-border" />
      <button
        onClick={onAddNode}
        className="w-8 h-8 bg-card border-2 border-border rounded-full flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-all"
      >
        <Plus className="w-4 h-4" />
      </button>
      <div className="w-0.5 h-6 bg-border" />
    </div>
  );
}

