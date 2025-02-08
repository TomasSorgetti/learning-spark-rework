import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setSession: (session) => set({ session }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => set({ user: null, isAuthenticated: false, session: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
