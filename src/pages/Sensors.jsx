import { useEffect, useState } from "react";
import { Signal, Thermometer, Radio } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSensorsStore } from "@/features/sensors/sensors.store";

export default function Sensors() {
  const { readingsByRoom, fetchLatest, loading, error } =
    useSensorsStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  if (loading) return <p>Loading sensor data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const sensors = Object.values(readingsByRoom).filter((s) =>
    s.roomId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Sensors</CardTitle>
          <CardDescription>Real-time ESP32 data</CardDescription>
        </CardHeader>

        <CardContent>
          <Input
            placeholder="Search by Room ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          {sensors.length === 0 && (
            <p className="text-muted-foreground">No live data</p>
          )}

          {sensors.map((s) => (
            <div
              key={s.roomId}
              className="p-4 mb-3 rounded-lg border bg-card"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">Room: {s.roomId}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(s.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <Badge variant="outline">LIVE</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  {s.temperature ?? "--"} °C
                </div>

                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  {s.occupancy ?? 0} people
                </div>

                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4" />
                  {s.light ? "Light ON" : "Light OFF"}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
