import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "@/services/socketClient";
import { useAuth } from "./useAuth";

export const useSocket = () => {
  const { isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket();
      setSocket(null);
      return;
    }

    const s = connectSocket();
    setSocket(s);

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [isAuthenticated]);

  return socket || getSocket();
};
