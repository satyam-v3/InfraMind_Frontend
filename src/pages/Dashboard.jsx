import { useEffect } from "react";
import {
  Thermometer,
  Users,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoomsStore } from "@/features/rooms/rooms.store";
import { useSensorsStore } from "@/features/sensors/sensors.store";
import { useAlertsStore } from "@/features/alerts/alerts.store";

export default function Dashboard() {
  const { rooms, fetchRooms } = useRoomsStore();
  const { readingsByRoom, fetchLatest } = useSensorsStore();
  const { alerts, fetchAlerts } = useAlertsStore();

  useEffect(() => {
    fetchRooms();
    fetchLatest();
    fetchAlerts();
  }, [fetchRooms, fetchLatest, fetchAlerts]);

  // ---- DERIVED STATS ----
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.isOccupied).length;

  const readings = Object.values(readingsByRoom);
  const avgTemp =
    readings.length > 0
      ? (
          readings.reduce((sum, r) => sum + (r.temperature || 0), 0) /
          readings.length
        ).toFixed(1)
      : "--";

  const activeAlerts = alerts.filter((a) => !a.read).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Campus Dashboard
        </h1>
        <p className="text-muted-foreground">
          Live overview of campus infrastructure
        </p>
      </div>

      {/* METRICS */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{totalRooms}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Occupied Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Users className="h-5 w-5 text-success" />
            <span className="text-2xl font-bold">{occupiedRooms}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Avg Temperature
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Thermometer className="h-5 w-5 text-warning" />
            <span className="text-2xl font-bold">
              {avgTemp}°C
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="text-2xl font-bold">{activeAlerts}</span>
          </CardContent>
        </Card>
      </div>

      {/* RECENT ACTIVITY */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.slice(0, 5).map((alert) => (
            <div
              key={alert._id}
              className="flex justify-between items-center p-3 rounded-lg border bg-muted/40"
            >
              <div>
                <p className="font-medium">{alert.type}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(alert.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="text-sm capitalize">
                {alert.severity}
              </span>
            </div>
          ))}

          {alerts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No recent alerts
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
