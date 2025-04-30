import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: true,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;