'use client'
import { create } from "zustand";
interface FacilityStore {
  facilityId: number | null;
  setFacilityId: (id: number | null) => void;
}
export const useFacilityStore = create<FacilityStore>((set) => ({
  facilityId: null,
  setFacilityId: (id) => set({ facilityId: id }),
}));
