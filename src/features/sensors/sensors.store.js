import { create } from "zustand";
import { fetchLatestSensorsRequest } from "./sensors.api";

export const useSensorsStore = create((set, get) => ({
  readingsByRoom: {}, // { [roomId]: reading }
  loading: false,
  error: null,

  fetchLatest: async () => {
    set({ loading: true, error: null });
    try {
      const list = await fetchLatestSensorsRequest();
      const map = {};
      list.forEach((r) => {
        map[r.roomId] = r;
      });
      set({ readingsByRoom: map, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  applySensorUpdate: (reading) => {
    const { readingsByRoom } = get();
    set({
      readingsByRoom: {
        ...readingsByRoom,
        [reading.roomId]: reading,
      },
    });
  },
}));
