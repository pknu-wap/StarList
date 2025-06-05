import { create } from "zustand";

const useAuthStore = create((set) => {
  const token = sessionStorage.getItem("accessToken");

  return {
    accessToken: token,

    login: (token) => {
      sessionStorage.setItem("accessToken", token);
      set({ accessToken: token });
    },

    logout: () => {
      sessionStorage.removeItem("accessToken");
      set({ accessToken: null });
    }
  };
})

export default useAuthStore;