import { NodeBasedBuilder } from "@/components/automations/NodeBasedBuilder";
import { mockAutomations } from "@/data/mockAutomations";

export default function AutomationsPage() {
  return (
    <div className="h-screen flex flex-col">
      <NodeBasedBuilder automations={mockAutomations} />
    </div>
  );
}
