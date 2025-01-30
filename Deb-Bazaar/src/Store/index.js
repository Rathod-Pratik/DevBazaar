import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./Slice/Auth-slice";
import { createWishListSlice } from "./Slice/WishList-slice";
import { createCartSlice } from "./Slice/Cart-slice";
import { createProductDataSlice } from "./Slice/Product-slice";
import { createOrderSlice } from "./Slice/Order-slice";

export const useAppStore = create(
  persist(
    (set, get) => ({
      ...createOrderSlice(set,get),
      ...createProductDataSlice(set,get), // Include the productData slice logic
      ...createAuthSlice(set, get), // Include the auth slice logic
      ...createWishListSlice(set,get), // Include the WishList slice logic
      ...createCartSlice(set,get), // Include the Cart slice logic
      loggedIn: false, // Default state
      setLoggedIn: (status) => set({ loggedIn: status }), // Update loggedIn state
    }),
    {
      name: "auth-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
