import { HelpCircle, Book, MessageCircle, Mail } from "lucide-react";

export default function HelpPage() {
  const helpResources = [
    {
      icon: Book,
      title: "Documentation",
      description: "Browse our comprehensive guides and tutorials",
      link: "#",
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      link: "#",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help directly from our support team",
      link: "mailto:support@IslandAIai.com",
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find quick answers to common questions",
      link: "#",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Help & Support</h1>
      <p className="text-muted-foreground mb-8">
        We're here to help you get the most out of IslandAIAI
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-4xl">
        {helpResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <a
              key={index}
              href={resource.link}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <Icon className="w-6 h-6 text-primary group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
