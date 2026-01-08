import { create } from "zustand";
import { Filters } from "@/types";

interface FilterState {
    filters: Filters;
    setFilter: (key: keyof Filters, value: any) => void;
    setFilters: (filters: Filters) => void;
    resetFilters: () => void;
}

const initialFilters: Filters = {
    location: "",
    form: "",
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    transmission: "",
};

export const useFilterStore = create<FilterState>((set) => ({
    filters: initialFilters,
    setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),
    setFilters: (newFilters) => set({ filters: newFilters }),
    resetFilters: () => set({ filters: initialFilters }),
}));
