import { X, Trash2 } from "lucide-react";
import { AutomationNode } from "@/data/mockAutomations";
import { nodeServices } from "@/data/mockAutomations";

interface NodeConfigPanelProps {
  node: AutomationNode;
  onClose: () => void;
  onUpdate: (config: AutomationNode["config"]) => void;
  onDelete: () => void;
}

export function NodeConfigPanel({
  node,
  onClose,
  onUpdate,
  onDelete,
}: NodeConfigPanelProps) {
  const getServiceInfo = () => {
    if (node.service === "delay") {
      return { name: "Delay", icon: "⏱️" };
    }

    const allServices = [
      ...nodeServices.triggers,
      ...nodeServices.actions,
    ];
    return allServices.find((s) => s.id === node.service) || {
      name: node.service,
      icon: "⚙️",
    };
  };

  const serviceInfo = getServiceInfo();

  return (
    <div className="w-[320px] bg-card border-l border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{serviceInfo.icon}</span>
            <h3 className="text-lg font-semibold text-foreground">
              {serviceInfo.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {node.service === "delay" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Delay Duration
              </label>
              <input
                type="number"
                value={node.config.delay || ""}
                onChange={(e) =>
                  onUpdate({ ...node.config, delay: parseInt(e.target.value) })
                }
                className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="5"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Unit
              </label>
              <select
                value={node.config.delayUnit || "minutes"}
                onChange={(e) =>
                  onUpdate({
                    ...node.config,
                    delayUnit: e.target.value as "minutes" | "hours" | "days",
                  })
                }
                className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>

            <p className="text-xs text-muted-foreground">
              The automation will wait for the specified duration before
              proceeding to the next step.
            </p>
          </div>
        )}

        {node.type === "trigger" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Event
              </label>
              <select
                value={node.config.event || ""}
                onChange={(e) =>
                  onUpdate({ ...node.config, event: e.target.value })
                }
                className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select event...</option>
                <option value="lead_created">New Lead Created</option>
                <option value="order_created">Order Created</option>
                <option value="cart_abandoned">Cart Abandoned</option>
                <option value="form_submitted">Form Submitted</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground">
              Choose which event will trigger this automation.
            </p>
          </div>
        )}

        {node.type === "action" && node.service === "whatsapp_template" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Template
              </label>
              <select
                value={node.config.template || ""}
                onChange={(e) =>
                  onUpdate({ ...node.config, template: e.target.value })
                }
                className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select template...</option>
                <option value="welcome">Welcome Message</option>
                <option value="follow_up">Follow Up</option>
                <option value="cart_reminder">Cart Reminder</option>
                <option value="order_confirmation">Order Confirmation</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground">
              Select the WhatsApp template message to send.
            </p>
          </div>
        )}

        {node.type === "action" && node.service === "send_email" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Subject
              </label>
              <input
                type="text"
                value={node.config.subject || ""}
                onChange={(e) =>
                  onUpdate({ ...node.config, subject: e.target.value })
                }
                className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Email subject..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Template
              </label>
              <select
                value={node.config.template || ""}
                onChange={(e) =>
                  onUpdate({ ...node.config, template: e.target.value })
                }
                className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select template...</option>
                <option value="welcome_email">Welcome Email</option>
                <option value="cart_reminder_email">Cart Reminder</option>
                <option value="order_confirmation_email">
                  Order Confirmation
                </option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border space-y-3">
        <button
          onClick={onDelete}
          className="w-full h-10 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-600/10 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
        <button
          onClick={onClose}
          className="w-full h-10 bg-primary text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
}

