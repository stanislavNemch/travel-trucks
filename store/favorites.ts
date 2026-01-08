import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper } from "@/types";

interface FavoritesState {
    favorites: Camper[];
    addFavorite: (camper: Camper) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (camper) =>
                set((state) => ({ favorites: [...state.favorites, camper] })),
            removeFavorite: (id) =>
                set((state) => ({
                    favorites: state.favorites.filter((c) => c.id !== id),
                })),
            isFavorite: (id) => get().favorites.some((c) => c.id === id),
        }),
        {
            name: "favorites-storage",
        }
    )
);
