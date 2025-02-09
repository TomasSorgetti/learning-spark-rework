import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessions: [],
  currentSession: null,
  setSessions: (sessions) => set({ sessions }),
  setCurrentSession: (currentSession) => set({ currentSession }),
}));

export default useSessionStore;
