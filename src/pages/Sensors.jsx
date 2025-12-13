import { useEffect, useState } from "react";
import { Radio, Search, Plus, Signal, Battery, Thermometer } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSensorsStore } from "@/features/sensors/sensors.store";

// TEMP UI DATA (OK FOR NOW)
const sensors = [
  { id: 1, name: "Temp Sensor A-101", type: "temperature", location: "Room 101", status: "online", battery: 95, lastUpdate: "2 min ago" },
  { id: 2, name: "Motion Sensor A-101", type: "occupancy", location: "Room 101", status: "online", battery: 87, lastUpdate: "1 min ago" },
  { id: 3, name: "Humidity Sensor A-102", type: "humidity", location: "Room 102", status: "online", battery: 92, lastUpdate: "3 min ago" },
  { id: 4, name: "Temp Sensor B-201", type: "temperature", location: "Lab 201", status: "warning", battery: 45, lastUpdate: "15 min ago" },
  { id: 5, name: "Air Quality C-301", type: "air quality", location: "Room 301", status: "offline", battery: 12, lastUpdate: "2 hours ago" },
];

export default function Sensors() {
  // ✅ ALL HOOKS FIRST
  const { fetchLatest, loading, error } = useSensorsStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  // ✅ SAFE RETURNS AFTER HOOKS
  if (loading) return <p>Loading sensor data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredSensors = sensors.filter(
    (sensor) =>
      sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "success";
      case "warning":
        return "warning";
      case "offline":
        return "destructive";
      default:
        return "default";
    }
  };

  const getSensorIcon = (type) => {
    switch (type) {
      case "temperature":
        return Thermometer;
      case "occupancy":
        return Radio;
      default:
        return Signal;
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 60) return "text-success";
    if (battery > 30) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sensor Management</h1>
          <p className="text-muted-foreground">Monitor and configure all campus sensors</p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Sensor
        </Button>
      </div>

      {/* TOP STATS */}
      <div className="grid gap-4 md:grid-cols-4">

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sensors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">856</p>
          </CardContent>
        </Card>

        <Card className="bg-success/10 border-success/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Online</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">823</p>
          </CardContent>
        </Card>

        <Card className="bg-warning/10 border-warning/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Warning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">18</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">15</p>
          </CardContent>
        </Card>

      </div>

      {/* MAIN SENSOR LIST */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">

            <div>
              <CardTitle>All Sensors</CardTitle>
              <CardDescription>View and manage sensor devices</CardDescription>
            </div>

            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search sensors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">

            {filteredSensors.map((sensor) => {
              const SensorIcon = getSensorIcon(sensor.type);

              return (
                <div
                  key={sensor.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-3 rounded-lg ${sensor.status === "online"
                          ? "bg-success/10"
                          : sensor.status === "warning"
                            ? "bg-warning/10"
                            : "bg-destructive/10"
                        }`}
                    >
                      <SensorIcon
                        className={`h-5 w-5 ${sensor.status === "online"
                            ? "text-success"
                            : sensor.status === "warning"
                              ? "text-warning"
                              : "text-destructive"
                          }`}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{sensor.name}</p>

                        <Badge variant="outline" className="text-xs capitalize">
                          {sensor.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{sensor.location}</span>
                        <span>•</span>
                        <span>Updated {sensor.lastUpdate}</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-4">

                    <div className="text-right min-w-[100px]">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <Battery className={`h-4 w-4 ${getBatteryColor(sensor.battery)}`} />
                        <span
                          className={`text-sm font-medium ${getBatteryColor(sensor.battery)}`}
                        >
                          {sensor.battery}%
                        </span>
                      </div>

                      <Progress value={sensor.battery} className="h-1.5" />
                    </div>

                    <Badge variant={getStatusColor(sensor.status)} className="min-w-20 justify-center">
                      {sensor.status}
                    </Badge>

                    <Button variant="outline" size="sm">
                      Configure
                    </Button>

                  </div>
                </div>
              );
            })}

          </div>
        </CardContent>

      </Card>

    </div>
  );
}
