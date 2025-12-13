import axios from "axios";
import { getToken } from "@/services/tokenService";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchLatestSensorsRequest = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/sensors/latest`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data; // [{ roomId, temperature, humidity, ... }]
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch sensors"
    );
  }
};
