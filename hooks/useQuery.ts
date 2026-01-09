import { useQuery } from "@tanstack/react-query";
import { getCampers, getCamperById } from "@/lib/api";
import { Camper } from "@/types";

export const useCampers = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["campers", params],
    queryFn: () => getCampers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  });
};

export const useCamperById = (id: string) => {
  return useQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
