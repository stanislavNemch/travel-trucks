import { useQuery } from "@tanstack/react-query";
import { getCampers, getCamperById } from "@/lib/api";
import { Camper } from "@/types";

type CampersApiResponse =
  | Camper[]
  | {
      items?: Camper[];
      total?: number;
    };

export type CampersResult = {
  items: Camper[];
  total: number | null;
};

export const useCampers = (params?: Record<string, any>) => {
  return useQuery<CampersApiResponse, Error, CampersResult>({
    queryKey: ["campers", params],
    queryFn: () => getCampers(params) as Promise<CampersApiResponse>,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    select: (data): CampersResult => ({
      items: Array.isArray(data) ? data : (data.items ?? []),
      total: Array.isArray(data)
        ? ((data as Camper[]).length ?? null)
        : (data.total ?? null),
    }),
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
