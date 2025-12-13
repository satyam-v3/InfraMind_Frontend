import axios from "axios";
import { getToken } from "@/services/tokenService";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const fetchRoomsRequest = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/rooms`, {
      headers: authHeader(),
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch rooms");
  }
};

export const toggleDeviceRequest = async (roomId, deviceType) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/rooms/${roomId}/devices/toggle`,
      { deviceType },
      { headers: authHeader() }
    );
    return res.data; // updated room
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to toggle device");
  }
};
