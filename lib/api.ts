import axios from "axios";
import { User } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to requests if it exists
instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth token:', error);
      }
    }
  }
  return config;
});

export const getCampers = async (params?: Record<string, any>) => {
  const { data } = await instance.get("/campers", { params });
  return data;
};

export const getCamperById = async (id: string) => {
  const { data } = await instance.get(`/campers/${id}`);
  return data;
};

interface LoginResponse {
  user: User;
  token: string;
}

interface LogoutResponse {
  success: boolean;
}

// Auth API functions (simulated for demo)
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  // In a real application, this would make an API call to authenticate
  // For now, we simulate a successful login
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '1',
          email,
          name: email.split('@')[0],
        },
        token: `token_${Date.now()}`,
      });
    }, 500);
  });
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  // In a real application, this would invalidate the token on the server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 200);
  });
};
