'use client'
import { create } from "zustand";
interface DrawerStore {
  openDimension: boolean;
  setOpenDimension: (value: boolean) => void;
}
export const useDrawerStore = create<DrawerStore>((set) => ({
  openDimension: false,
  setOpenDimension: (value) => set({ openDimension: value }),
  
}));
