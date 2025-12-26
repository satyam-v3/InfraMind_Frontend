import { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSensorsStore } from "@/features/sensors/sensors.store";
import { useRoomsStore } from "@/features/rooms/rooms.store";
import { usePredictionsStore } from "@/features/predictions/predictions.store";

export default function Analytics() {
  const { readingsByRoom, fetchLatest } = useSensorsStore();
  const { rooms, fetchRooms } = useRoomsStore();
  const {
    predictions,
    fetchPredictions,
    loading: predictionsLoading,
  } = usePredictionsStore();

  useEffect(() => {
    fetchLatest();
    fetchRooms();
    fetchPredictions();
  }, [fetchLatest, fetchRooms, fetchPredictions]);

  const readings = Object.values(readingsByRoom);

  const avgTemp =
    readings.length > 0
      ? (
          readings.reduce((sum, r) => sum + (r.temperature || 0), 0) /
          readings.length
        ).toFixed(1)
      : "--";

  const avgOccupancy =
    readings.length > 0
      ? Math.round(
          readings.reduce((sum, r) => sum + (r.occupancy || 0), 0) /
            readings.length
        )
      : "--";

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics & Insights
        </h1>
        <p className="text-muted-foreground">
          System-wide understanding and predictions
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Average Temperature
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {avgTemp}°C
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Average Occupancy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {avgOccupancy}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {rooms.length}
          </CardContent>
        </Card>
      </div>

      {/* AI PREDICTIONS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Predictions
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {predictionsLoading && (
            <p className="text-muted-foreground">Loading predictions...</p>
          )}

          {!predictionsLoading && predictions.length === 0 && (
            <p className="text-muted-foreground">
              No predictions available
            </p>
          )}

          {predictions.map((p) => (
            <Card key={p.roomId}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {p.roomName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Expected Temp</span>
                  <strong>{p.predictedTemperature}°C</strong>
                </div>
                <div className="flex justify-between">
                  <span>Expected Occupancy</span>
                  <strong>{p.predictedOccupancy}</strong>
                </div>
                <Badge variant={getRiskColor(p.riskLevel)}>
                  {p.riskLevel.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
