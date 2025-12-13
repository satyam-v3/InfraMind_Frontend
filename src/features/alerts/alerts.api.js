import axios from "axios";
import { getToken } from "@/services/tokenService";

const BASE_URL = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const fetchAlertsRequest = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/alerts`, {
      headers: authHeader(),
    });
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch alerts"
    );
  }
};

export const markAlertReadRequest = async (id) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/alerts/${id}/read`,
      {},
      { headers: authHeader() }
    );
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to update alert"
    );
  }
};
