import { create } from "zustand";
import { Camper } from "@/types";
import { getCampers } from "@/lib/api";

interface CampersState {
    campers: Camper[];
    loading: boolean;
    error: string | null;
    fetchCampers: (filters?: any) => Promise<void>;
}

export const useCampersStore = create<CampersState>((set) => ({
    campers: [],
    loading: false,
    error: null,
    // Функція для отримання кемперів з API з урахуванням фільтрів
    fetchCampers: async (filters?: any) => {
        set({ loading: true, error: null });
        try {
            const params: Record<string, any> = {};
            if (filters) {
                // Додавання параметрів фільтрації до запиту
                if (filters.location) params.location = filters.location;
                if (filters.form) params.form = filters.form;
                if (filters.AC) params.AC = true;
                if (filters.bathroom) params.bathroom = true;
                if (filters.kitchen) params.kitchen = true;
                if (filters.TV) params.TV = true;
                if (filters.transmission)
                    params.transmission = filters.transmission;
            }

            const data = await getCampers(params);

            const items = Array.isArray(data) ? data : data.items || [];
            set({ campers: items, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));
