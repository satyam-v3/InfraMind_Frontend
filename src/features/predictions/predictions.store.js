import { create } from "zustand";
import { fetchPredictionsRequest } from "./predictions.api";

export const usePredictionsStore = create((set) => ({
  predictions: [],
  loading: false,
  error: null,

  fetchPredictions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPredictionsRequest();
      set({ predictions: data, loading: false });
    } catch (err) {
      set({
        error: err.message || "Failed to load predictions",
        loading: false,
      });
    }
  },
}));
