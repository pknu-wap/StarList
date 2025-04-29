import { create } from 'zustand';

const useAuthStore = create((set) => ({
  jwt: null,
  setJwt: (token) => set({ jwt: token }),

  isLoggedIn: false,
  setIsLoggedIn: (flag) => set({ isLoggedIn: flag }),
}));

export default useAuthStore;
