import { useAuthStore } from "@/features/auth/auth.store";

export const useAuth = () => {
  const { token, login, logout, loading, error } = useAuthStore();

  return {
    isAuthenticated: !!token,
    token,
    login,
    logout,
    loading,
    error,
  };
};
