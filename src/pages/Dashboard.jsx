import { Building2, Radio, AlertTriangle, Users, Activity } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Rooms"
          value="142"
          icon={Building2}
          trend={{ value: "8% from last month", isPositive: true }}
          variant="default"
        />

        <MetricCard
          title="Sensors Online"
          value="856"
          icon={Radio}
          trend={{ value: "12 new this week", isPositive: true }}
          variant="success"
        />

        <MetricCard
          title="Active Alerts"
          value="23"
          icon={AlertTriangle}
          trend={{ value: "5 less than yesterday", isPositive: true }}
          variant="warning"
        />

        <MetricCard
          title="System Users"
          value="89"
          icon={Users}
          trend={{ value: "3 new users", isPositive: true }}
          variant="default"
        />
      </div>

      {/* REAL TIME OCCUPANCY */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Real-Time Occupancy</CardTitle>
            <CardDescription>Current room utilization across campus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* PROGRESS BARS */}
            {[
              { label: "Building A", value: 78 },
              { label: "Building B", value: 62 },
              { label: "Building C", value: 91 },
              { label: "Library", value: 45 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}

          </CardContent>
        </Card>

        {/* ENVIRONMENTAL STATUS */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Status</CardTitle>
            <CardDescription>Average readings today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium">Temperature</p>
                <p className="text-2xl font-bold">22°C</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium">Humidity</p>
                <p className="text-2xl font-bold">45%</p>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium">Air Quality</p>
                <p className="text-2xl font-bold">Good</p>
              </div>
              <Activity className="h-8 w-8 text-success" />
            </div>

          </CardContent>
        </Card>
      </div>

      {/* RECENT ALERTS + SYSTEM PERFORMANCE */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* RECENT ALERTS */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "High occupancy in Room 301", time: "5 min ago", severity: "warning" },
              { title: "Temperature spike in Building B", time: "1 hour ago", severity: "alert" },
              { title: "Sensor maintenance due", time: "2 hours ago", severity: "info" },
            ].map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div
                  className={`h-2 w-2 mt-2 rounded-full ${
                    alert.severity === "warning"
                      ? "bg-warning"
                      : alert.severity === "alert"
                      ? "bg-destructive"
                      : "bg-primary"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* SYSTEM PERFORMANCE */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="text-sm font-medium">99.9%</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Response Time</span>
              <span className="text-sm font-medium">145ms</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Connections</span>
              <span className="text-sm font-medium">1,247</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Processed</span>
              <span className="text-sm font-medium">2.3 TB</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
