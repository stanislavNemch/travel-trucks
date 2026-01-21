import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

export const AUTH_STORAGE_KEY = "auth-storage";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (email: string, password: string) => {
                // Simulated login logic - in a real app, this would call an API
                // For now, we'll accept any email/password combination
                const mockUser: User = {
                    id: "1",
                    email: email,
                    name: email.split("@")[0],
                };
                const mockToken = `token_${Date.now()}`;
                
                set({
                    user: mockUser,
                    token: mockToken,
                    isAuthenticated: true,
                });
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },
            setUser: (user: User, token: string) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                });
            },
        }),
        {
            name: AUTH_STORAGE_KEY,
        }
    )
);
