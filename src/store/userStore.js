import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      token: false,
      setToken: (value) => set(() => ({ token: value })),
    }),
    { name: "user-storage" }
  )
);
