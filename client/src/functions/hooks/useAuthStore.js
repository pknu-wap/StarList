import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    accessToken: null,
    login: (token) => set({
        isLoggedIn: true,
        accessToken: token,
    }),
    logout: () => set({
        isLoggedIn: false,
        accessToken: null
    }),
}));

export default useAuthStore;
