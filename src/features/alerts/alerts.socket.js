import { useEffect } from "react";
import { useAlertsStore } from "./alerts.store";
import { useSocket } from "@/hooks/useSocket";

export const useAlertsSocket = () => {
  const socket = useSocket();
  const applyNewAlert = useAlertsStore((s) => s.applyNewAlert);

  useEffect(() => {
    if (!socket) return;

    const handler = (alert) => {
      applyNewAlert(alert);
    };

    socket.on("alert:new", handler);

    return () => {
      socket.off("alert:new", handler);
    };
  }, [socket, applyNewAlert]);
};
