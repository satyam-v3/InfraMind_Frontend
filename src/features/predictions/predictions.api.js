import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchPredictionsRequest = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/api/predictions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ✅ FIXED
  return res.data;
};
