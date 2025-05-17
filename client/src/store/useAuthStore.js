import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist(
    (set) => ({
        isLoggedIn: false,
        accessToken: null,
        login: (token) => set({
            isLoggedIn: true,
            accessToken: token,
        }),
        logout: () => set({
            isLoggedIn: false,
            token: null
        }),
    }),
    {
        name: "auth-storage",
        getStorage: () => localStorage,
        partialize: (state) => ({
            isLoggedIn: state.isLoggedIn,
            accessToken: state.accessToken,
        }),
    }
));

export default useAuthStore;
