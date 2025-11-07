import { TrainingSidebar } from "@/components/training/TrainingSidebar";
import { Link2, CheckCircle, XCircle } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    {
      id: "shopify",
      name: "Shopify",
      description: "Sync products, orders, and customer data",
      icon: "🛍️",
      connected: true,
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Process payments and manage subscriptions",
      icon: "💳",
      connected: true,
    },
    {
      id: "hubspot",
      name: "HubSpot CRM",
      description: "Sync contacts and deals",
      icon: "📊",
      connected: false,
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Enterprise CRM integration",
      icon: "☁️",
      connected: false,
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with 5000+ apps",
      icon: "⚡",
      connected: false,
    },
    {
      id: "slack",
      name: "Slack",
      description: "Get notifications in Slack channels",
      icon: "💬",
      connected: false,
    },
  ];

  return (
    <div className="flex h-full">
      <TrainingSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Integrations</h1>
        <p className="text-muted-foreground mb-8">
          Connect your favorite tools and platforms
        </p>

        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {integration.name}
                    </h3>
                    {integration.connected ? (
                      <div className="flex items-center gap-1.5 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-500">Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 mt-1">
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Not connected</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link2 className="w-5 h-5 text-muted-foreground" />
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {integration.description}
              </p>

              <button
                className={`w-full h-10 rounded-lg text-sm font-medium transition-all ${
                  integration.connected
                    ? "bg-secondary text-foreground hover:bg-accent"
                    : "bg-primary text-foreground hover:brightness-110"
                }`}
              >
                {integration.connected ? "Configure" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

