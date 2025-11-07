import { Bell, MessageSquare, Users, Zap, Settings } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      type: "conversation",
      icon: MessageSquare,
      title: "New conversation from Sarah Johnson",
      description: "WhatsApp message received",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: "2",
      type: "team",
      icon: Users,
      title: "New team member added",
      description: "John Smith joined your team",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: "3",
      type: "automation",
      icon: Zap,
      title: "Automation triggered",
      description: "Cart abandoned workflow sent 15 messages",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "4",
      type: "system",
      icon: Settings,
      title: "System update completed",
      description: "New features are now available",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              You have {notifications.filter((n) => n.unread).length} unread
              notifications
            </p>
          </div>
          <button className="px-4 py-2 bg-secondary hover:bg-accent text-foreground rounded-lg text-sm font-medium transition-colors">
            Mark all as read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`bg-card border rounded-xl p-4 transition-colors ${
                  notification.unread
                    ? "border-primary"
                    : "border-border hover:border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      notification.unread ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        notification.unread ? "text-foreground" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-sm font-medium ${
                          notification.unread ? "text-foreground" : "text-secondary-foreground"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
