import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      cleanAuth: () => set({ isAuthenticated: false, isAdmin: false }),
    }),
    { name: "auth-storage", getStorage: () => localStorage }
  )
);

export default useAuthStore;
