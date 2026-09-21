import { getSettings } from "@/lib/store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-muted">Update your website information</p>
      <SettingsForm settings={settings} />
    </div>
  );
}
