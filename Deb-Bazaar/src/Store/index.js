import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./Slice/Auth-slice";

export const useAppStore = create(
  persist(
    (set, get) => ({
      ...createAuthSlice(set, get), // Include the auth slice logic
      loggedIn: false, // Default state
      setLoggedIn: (status) => set({ loggedIn: status }), // Update loggedIn state
    }),
    {
      name: "auth-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
