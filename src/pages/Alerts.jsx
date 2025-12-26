import { useEffect } from "react";
import { AlertTriangle, Clock } from "lucide-react";
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
import { connectSocket } from "@/services/socketClient";

export default function Alerts() {
  const {
    alerts = [],
    fetchAlerts,
    loading,
    error,
    markRead,
    applyNewAlert,
  } = useAlertsStore();

  useEffect(() => {
    fetchAlerts();

    const socket = connectSocket();
    if (!socket) return;

    const handleNewAlert = (alert) => {
      applyNewAlert(alert);
    };

    socket.on("alert:new", handleNewAlert);

    return () => {
      socket.off("alert:new", handleNewAlert);
    };
  }, [fetchAlerts, applyNewAlert]);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Alerts & Notifications
        </h1>
        <p className="text-muted-foreground">
          Real-time system alerts
        </p>
      </div>

      <Tabs defaultValue="alerts">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Live Alerts</CardTitle>
              <CardDescription>Triggered by sensor rules</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {alerts.length === 0 && (
                <p className="text-muted-foreground">No active alerts</p>
              )}

              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  className="p-4 rounded-lg border bg-card"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3">
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
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
