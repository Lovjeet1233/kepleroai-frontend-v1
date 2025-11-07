import { InstallationGuide } from "@/components/chatbot-test/InstallationGuide";
import { WidgetSimulator } from "@/components/chatbot-test/WidgetSimulator";

export default function ChatbotTestPage() {
  return (
    <div className="flex h-full overflow-hidden">
      <InstallationGuide />
      <WidgetSimulator />
    </div>
  );
}
