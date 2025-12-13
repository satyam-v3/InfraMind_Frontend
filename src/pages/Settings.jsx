import { Building2, Bell, Users, Key, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and integrations</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">

        {/* Tabs Navigation */}
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="sensors">Sensors</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* GENERAL TAB */}
        <TabsContent value="general" className="space-y-6">

          {/* CAMPUS INFO */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Campus Information</CardTitle>
              </div>
              <CardDescription>Basic campus details and configuration</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="campus-name">Campus Name</Label>
                  <Input id="campus-name" placeholder="University Campus" defaultValue="Smart Campus" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campus-code">Campus Code</Label>
                  <Input id="campus-code" placeholder="CAM-001" defaultValue="SC-001" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campus-address">Address</Label>
                <Input id="campus-address" placeholder="123 University Ave" defaultValue="123 Education Drive" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-5 (EST)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English" />
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* SYSTEM PREFERENCES */}
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system behavior</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Auto Refresh */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-refresh Dashboard</Label>
                  <p className="text-sm text-muted-foreground">Automatically update dashboard data</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme</p>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>

              <Separator />

              {/* Data Export */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Export</Label>
                  <p className="text-sm text-muted-foreground">Allow data export to CSV/Excel</p>
                </div>
                <Switch defaultChecked />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-6">

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Configure when and how you receive alerts</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {[
                ["Email Notifications", "Receive alerts via email", true],
                ["High Priority Alerts", "Immediate notification for critical issues", true],
                ["Occupancy Alerts", "Notify when rooms reach capacity", true],
                ["Environmental Alerts", "Temperature and humidity warnings", true],
                ["Daily Reports", "Receive daily summary emails", false],
              ].map(([title, desc, checked], i) => (
                <div key={i}>
                  <div className="flex items-center justify-between pb-2">
                    <div className="space-y-0.5">
                      <Label>{title}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch defaultChecked={checked} />
                  </div>
                  {i < 4 && <Separator />}
                </div>
              ))}

            </CardContent>
          </Card>

          {/* ALERT RECIPIENTS */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Recipients</CardTitle>
              <CardDescription>Manage who receives system notifications</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="primary-email">Primary Email</Label>
                <Input id="primary-email" type="email" placeholder="admin@campus.edu" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-email">Secondary Email</Label>
                <Input id="secondary-email" type="email" placeholder="backup@campus.edu" />
              </div>

              <Button>Update Recipients</Button>
            </CardContent>
          </Card>

        </TabsContent>

        {/* SENSORS TAB */}
        <TabsContent value="sensors" className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Sensor Configuration</CardTitle>
              <CardDescription>Default sensor settings and thresholds</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Temp Min/Max */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="temp-min">Min Temperature (°C)</Label>
                  <Input id="temp-min" type="number" defaultValue="18" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temp-max">Max Temperature (°C)</Label>
                  <Input id="temp-max" type="number" defaultValue="26" />
                </div>
              </div>

              {/* Humidity Min/Max */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="humidity-min">Min Humidity (%)</Label>
                  <Input id="humidity-min" type="number" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity-max">Max Humidity (%)</Label>
                  <Input id="humidity-max" type="number" defaultValue="60" />
                </div>
              </div>

              {/* Occupancy Threshold */}
              <div className="space-y-2">
                <Label htmlFor="occupancy-threshold">Occupancy Alert Threshold (%)</Label>
                <Input id="occupancy-threshold" type="number" defaultValue="85" />
              </div>

              <Button>Save Thresholds</Button>

            </CardContent>
          </Card>

        </TabsContent>

        {/* INTEGRATIONS TAB */}
        <TabsContent value="integrations" className="space-y-6">

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>External Integrations</CardTitle>
              </div>
              <CardDescription>Connect with third-party services</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Backup */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Database Backup</p>
                  <p className="text-sm text-muted-foreground">Automated daily backups</p>
                </div>
                <Switch defaultChecked />
              </div>

              {/* Weather */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Weather API</p>
                  <p className="text-sm text-muted-foreground">External weather data integration</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Analytics Platform</p>
                  <p className="text-sm text-muted-foreground">Advanced analytics integration</p>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>

            </CardContent>
          </Card>

        </TabsContent>

      </Tabs>
    </div>
  );
}
