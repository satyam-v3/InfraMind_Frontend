import { create } from "zustand";
import { fetchAlertsRequest, markAlertReadRequest } from "./alerts.api";

export const useAlertsStore = create((set, get) => ({
  alerts: [],
  loading: false,
  error: null,

  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const alerts = await fetchAlertsRequest();
      set({ alerts, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  markRead: async (id) => {
    try {
      await markAlertReadRequest(id);
      const { alerts } = get();
      set({
        alerts: alerts.map((a) =>
          a._id === id ? { ...a, read: true } : a
        ),
      });
    } catch (err) {
      console.error(err);
    }
  },

  applyNewAlert: (alert) => {
    const { alerts } = get();
    set({ alerts: [alert, ...alerts] });
  },
}));
