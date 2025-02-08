import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  cleanUser: () => set({ user: null }),
}));

export default useUserStore;
