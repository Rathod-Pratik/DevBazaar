import { create } from "zustand";
import { createAuthSlice } from "./Slice/Auth-slice";

export const useAppStore=create()((...a)=>({
    ...createAuthSlice(...a)
}))