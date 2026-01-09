import { create } from "zustand";
import { Camper } from "@/types";

interface CampersState {
  limit: number;
  page: number; // 1-based page for MockAPI
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  incrementPage: () => void;
  resetPage: () => void;
}

export const useCampersStore = create<CampersState>((set) => ({
  limit: 4,
  page: 1,
  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => set({ page }),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  resetPage: () => set({ page: 1 }),
}));
