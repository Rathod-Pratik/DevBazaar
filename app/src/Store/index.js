import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./Slice/Auth-slice";
import { createWishListSlice } from "./Slice/WishList-slice";
import { createCartSlice } from "./Slice/Cart-slice";
import { createProductDataSlice } from "./Slice/Product-slice";
import { createOrderSlice } from "./Slice/Order-slice";
import { createProcessSlice } from "./Slice/Process-slice";
import { createCategorySlice } from "./Slice/category.slice";

export const useAppStore = create(
  persist(
    (set, get) => ({
      ...createCategorySlice(set,get),
      ...createProcessSlice(set,get),
      ...createOrderSlice(set,get),
      ...createProductDataSlice(set,get), 
      ...createAuthSlice(set, get), 
      ...createWishListSlice(set,get),
      ...createCartSlice(set,get),
      loggedIn: false, 
      setLoggedIn: (status) => set({ loggedIn: status }), 
    }),
    {
      name: "auth-storage", 
      getStorage: () => localStorage,
    }
  )
);
