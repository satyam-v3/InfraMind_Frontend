import { create } from "zustand";
import { fetchLatestSensorsRequest } from "./sensors.api";
import { connectSocket } from "@/services/socketClient";

export const useSensorsStore = create((set, get) => ({
  readingsByRoom: {},
  loading: false,
  error: null,
  socketBound: false,

  fetchLatest: async () => {
    set({ loading: true, error: null });

    try {
      const list = await fetchLatestSensorsRequest();

      const map = {};
      list.forEach((r) => {
        map[r.roomId] = r; // latest snapshot per room
      });

      set({ readingsByRoom: map, loading: false });

      // ✅ bind socket once
      get().bindSocket();
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  bindSocket: () => {
    if (get().socketBound) return;

    const socket = connectSocket();
    if (!socket) return;

    socket.on("sensor:update", (reading) => {
      set((state) => ({
        readingsByRoom: {
          ...state.readingsByRoom,
          [reading.roomId]: reading,
        },
      }));
    });

    set({ socketBound: true });
  },
}));
