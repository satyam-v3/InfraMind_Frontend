import { useEffect, useState } from "react";
import {
  Building2,
  Search,
  Download,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRoomsStore } from "@/features/rooms/rooms.store";

export default function Rooms() {
  const { rooms, fetchRooms, loading, error } = useRoomsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // 🔥 Load rooms + bind socket
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // 🔥 Select first room safely
  useEffect(() => {
    if (!selectedRoom && rooms.length > 0) {
      setSelectedRoom(rooms[0]);
    }
  }, [rooms, selectedRoom]);

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedRoom) return <p>No rooms available</p>;

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔥 Derived status from backend fields
  const getRoomStatus = (room) => {
    if (!room.lastSensorUpdate) return "idle";
    if (!room.isOccupied) return "idle";
    if (room.currentOccupancy > room.capacity) return "warning";
    return "active";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "warning":
        return "warning";
      case "idle":
        return "secondary";
      default:
        return "default";
    }
  };

  const occupancyPercentage =
    selectedRoom.capacity > 0
      ? Math.round(
          (selectedRoom.currentOccupancy / selectedRoom.capacity) * 100
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Room Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all campus rooms
          </p>
        </div>

        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT PANEL */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">All Rooms</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredRooms.map((room) => {
              const status = getRoomStatus(room);

              return (
                <div
                  key={room._id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRoom._id === room._id
                      ? "bg-primary/10 border border-primary"
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{room.name}</span>
                    </div>

                    <Badge variant={getStatusColor(status)}>
                      {status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Building {room.building}</span>
                    <span>
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* RIGHT PANEL */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedRoom.name}</CardTitle>
            <CardDescription>
              Building {selectedRoom.building} – Floor{" "}
              {selectedRoom.floor}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-semibold">
                Occupancy: {occupancyPercentage}%
              </span>
            </div>

            <Progress value={occupancyPercentage} />
            <p className="text-sm text-muted-foreground">
              {selectedRoom.currentOccupancy} / {selectedRoom.capacity} people
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
