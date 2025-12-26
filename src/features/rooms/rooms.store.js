import { create } from "zustand";
import { fetchRoomsRequest, toggleDeviceRequest } from "./rooms.api";
import { connectSocket } from "@/services/socketClient";

export const useRoomsStore = create((set, get) => ({
  rooms: [],
  loading: false,
  error: null,
  socketBound: false,

  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const rooms = await fetchRoomsRequest();
      set({ rooms, loading: false });

      // 🔥 Bind socket once after rooms load
      get().bindSocket();
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  bindSocket: () => {
    if (get().socketBound) return;

    const socket = connectSocket();
    if (!socket) return;

    socket.on("sensor:update", (payload) => {
      const { roomId, ...liveData } = payload;

      set((state) => ({
        rooms: state.rooms.map((room) =>
          room._id === roomId
            ? {
                ...room,
                currentTemperature: liveData.temperature,
                currentLight: liveData.light,
                currentOccupancy: liveData.occupancy,
                motionDetected: liveData.motion,
                lastSensorUpdate: liveData.createdAt,
                isOccupied: liveData.occupancy > 0,
              }
            : room
        ),
      }));
    });

    set({ socketBound: true });
  },

  toggleDevice: async (roomId, deviceType) => {
    try {
      const updated = await toggleDeviceRequest(roomId, deviceType);
      set((state) => ({
        rooms: state.rooms.map((r) =>
          r._id === updated._id ? updated : r
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
