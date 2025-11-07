import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex" style={{ left: "240px" }}>
      <SettingsSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

