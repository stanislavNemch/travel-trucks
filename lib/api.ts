import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const getCampers = async (params?: Record<string, any>) => {
  const { data } = await instance.get("/campers", { params });
  return data;
};

export const getCamperById = async (id: string) => {
  const { data } = await instance.get(`/campers/${id}`);
  return data;
};
