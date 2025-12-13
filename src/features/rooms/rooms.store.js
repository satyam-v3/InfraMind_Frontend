import { create } from "zustand";
import { fetchRoomsRequest, toggleDeviceRequest } from "./rooms.api";

export const useRoomsStore = create((set, get) => ({
  rooms: [],
  loading: false,
  error: null,

  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const rooms = await fetchRoomsRequest();
      set({ rooms, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  toggleDevice: async (roomId, deviceType) => {
    try {
      const updated = await toggleDeviceRequest(roomId, deviceType);
      const { rooms } = get();
      set({
        rooms: rooms.map((r) => (r._id === updated._id ? updated : r)),
      });
    } catch (err) {
      console.error(err);
    }
  },

  applyRoomUpdate: (updatedRoom) => {
    const { rooms } = get();
    set({
      rooms: rooms.map((r) => (r._id === updatedRoom._id ? updatedRoom : r)),
    });
  },
}));
