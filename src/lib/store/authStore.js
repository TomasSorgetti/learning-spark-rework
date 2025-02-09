import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      cleanAuth: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
