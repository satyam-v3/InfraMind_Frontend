import { useEffect } from "react";
import { useRoomsStore } from "./rooms.store";
import { useSocket } from "@/hooks/useSocket";

export const useRoomsSocket = () => {
  const socket = useSocket();
  const applyRoomUpdate = useRoomsStore((s) => s.applyRoomUpdate);

  useEffect(() => {
    if (!socket) return;

    const handler = (updatedRoom) => {
      applyRoomUpdate(updatedRoom);
    };

    socket.on("room:update", handler);

    return () => {
      socket.off("room:update", handler);
    };
  }, [socket, applyRoomUpdate]);
};
