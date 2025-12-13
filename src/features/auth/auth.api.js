import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res)
    return res.data; // { token }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};
