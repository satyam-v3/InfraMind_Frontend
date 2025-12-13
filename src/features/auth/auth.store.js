import { create } from "zustand";
import { loginRequest } from "./auth.api";
import { setToken, removeToken, getToken } from "@/services/tokenService";

const initialToken = getToken();

export const useAuthStore = create((set) => ({
  token: initialToken,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const { token } = await loginRequest(credentials);
      setToken(token);
      set({ token, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  logout: () => {
    removeToken();
    set({ token: null, isAuthenticated: false });
  },
}));
