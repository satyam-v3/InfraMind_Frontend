import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Bell, Shield, Cpu } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    alertsEnabled: true,
    autoControl: true,
    maintenanceMode: false,
    emailNotifications: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          System Settings
        </h1>
        <p className="text-muted-foreground">
          Configure Smart Campus system behavior
        </p>
      </div>

      {/* ALERT SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alerts & Notifications
          </CardTitle>
          <CardDescription>
            Control alert generation and notifications
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="alerts">Enable Alerts</Label>
            <Switch
              id="alerts"
              checked={settings.alertsEnabled}
              onCheckedChange={() => toggle("alertsEnabled")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Notifications</Label>
            <Switch
              id="email"
              checked={settings.emailNotifications}
              onCheckedChange={() => toggle("emailNotifications")}
            />
          </div>
        </CardContent>
      </Card>

      {/* AUTOMATION SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Automation
          </CardTitle>
          <CardDescription>
            System automation and device control
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto">Auto Device Control</Label>
            <Switch
              id="auto"
              checked={settings.autoControl}
              onCheckedChange={() => toggle("autoControl")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance">Maintenance Mode</Label>
            <Switch
              id="maintenance"
              checked={settings.maintenanceMode}
              onCheckedChange={() => toggle("maintenanceMode")}
            />
          </div>
        </CardContent>
      </Card>

      {/* SECURITY */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </CardTitle>
          <CardDescription>
            Authentication and access control
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            JWT authentication and role-based access control
            are enabled for administrators.
          </p>

          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>

      {/* SAVE */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
