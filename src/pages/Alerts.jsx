import { useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAlertsStore } from "@/features/alerts/alerts.store";

export default function Alerts() {
  // ✅ ALL HOOKS FIRST
  const { alerts = [], fetchAlerts, loading, error, markRead } =
    useAlertsStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // ✅ SAFE AFTER HOOKS
  if (loading) return <p>Loading alerts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  // ✅ REAL COUNTS
  const highCount = alerts.filter(a => a.severity === "high").length;
  const mediumCount = alerts.filter(a => a.severity === "medium").length;
  const lowCount = alerts.filter(a => a.severity === "low").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Alerts & Predictions
        </h1>
        <p className="text-muted-foreground">
          Monitor system alerts and AI-powered predictions
        </p>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* ACTIVE ALERTS */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{highCount}</CardTitle>
                <CardDescription>High Priority</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{mediumCount}</CardTitle>
                <CardDescription>Medium Priority</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{lowCount}</CardTitle>
                <CardDescription>Low Priority</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Requiring attention</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No active alerts
                </p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert._id}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3 flex-1">
                        <AlertTriangle className="h-5 w-5 mt-0.5" />
                        <div>
                          <h3 className="font-medium">{alert.type}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(alert.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>

                    {!alert.read && (
                      <Button
                        size="sm"
                        onClick={() => markRead(alert._id)}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PREDICTIONS — STATIC OK */}
        <TabsContent value="predictions">
          <div className="p-8 text-muted-foreground text-center">
            AI predictions can remain static for now.
          </div>
        </TabsContent>

        {/* HISTORY — STATIC OK */}
        <TabsContent value="history">
          <div className="p-8 text-muted-foreground text-center">
            Historical alerts summary.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
