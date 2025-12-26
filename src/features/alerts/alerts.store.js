import { create } from "zustand";
import { fetchAlertsRequest, markAlertReadRequest } from "./alerts.api";
import { connectSocket } from "@/services/socketClient";

export const useAlertsStore = create((set, get) => ({
  alerts: [],
  loading: false,
  error: null,
  socketBound: false,

  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const alerts = await fetchAlertsRequest();
      set({ alerts, loading: false });

      // 🔥 Bind socket once
      get().bindSocket();
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  bindSocket: () => {
    if (get().socketBound) return;

    const socket = connectSocket();
    if (!socket) return;

    socket.on("alert:new", (alert) => {
      set((state) => ({
        alerts: [alert, ...state.alerts],
      }));
    });

    set({ socketBound: true });
  },

  markRead: async (id) => {
    try {
      await markAlertReadRequest(id);
      set((state) => ({
        alerts: state.alerts.map((a) =>
          a._id === id ? { ...a, read: true } : a
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
