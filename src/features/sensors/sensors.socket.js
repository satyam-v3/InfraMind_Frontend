import { useEffect } from "react";
import { useSensorsStore } from "./sensors.store";
import { useSocket } from "@/hooks/useSocket";

export const useSensorsSocket = () => {
  const socket = useSocket();
  const applySensorUpdate = useSensorsStore((s) => s.applySensorUpdate);

  useEffect(() => {
    if (!socket) return;

    const handler = (reading) => {
      applySensorUpdate(reading);
    };

    socket.on("sensor:update", handler);

    return () => {
      socket.off("sensor:update", handler);
    };
  }, [socket, applySensorUpdate]);
};
