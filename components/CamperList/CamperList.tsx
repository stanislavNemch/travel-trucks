"use client";

import { useEffect, useState } from "react";
import { useCampersStore } from "@/store/campers";
import { useFilterStore } from "@/store/filters";
import { useCampers, type CampersResult } from "@/hooks/useQuery";
import { Camper } from "@/types";
import { CamperCard } from "../CamperCard/CamperCard";
import { Button } from "../Button/Button";
import styles from "./CamperList.module.css";
import { Loader } from "../Loader/Loader";

export const CamperList = () => {
  const { limit, page, resetPage, incrementPage } = useCampersStore();
  const { filters } = useFilterStore();
  const [allCampers, setAllCampers] = useState<Camper[]>([]);
  const [lastLoadedPage, setLastLoadedPage] = useState(0);

  // Скидаємо сторінку та очищаємо список при зміні фільтрів
  useEffect(() => {
    resetPage();
    setAllCampers([]);
    setLastLoadedPage(0);
  }, [filters, resetPage]);

  // Формуємо параметри запиту для бекенду (фільтри + пагінація)
  const params: Record<string, any> = {
    page,
    limit,
  };

  if (filters) {
    if (filters.location) params.location = filters.location;
    if (filters.form) params.form = filters.form;
    if (filters.AC) params.AC = true;
    if (filters.bathroom) params.bathroom = true;
    if (filters.kitchen) params.kitchen = true;
    if (filters.TV) params.TV = true;
    if (filters.radio) params.radio = true;
    if (filters.refrigerator) params.refrigerator = true;
    if (filters.microwave) params.microwave = true;
    if (filters.gas) params.gas = true;
    if (filters.water) params.water = true;
    if (filters.transmission) params.transmission = filters.transmission;
  }

  const {
    data: response,
    isLoading,
    isFetching,
  } = useCampers(params) as {
    data?: CampersResult;
    isLoading: boolean;
    isFetching: boolean;
    error?: Error | null;
  };

  // Акумулюємо результати посторінкового завантаження
  useEffect(() => {
    if (!response) return;

    const currentPageCampers = response.items ?? [];

    // Запобігаємо дублюванню при placeholderData: оновлюємо лише коли сторінка змінилась
    if (page === 1) {
      setAllCampers(currentPageCampers);
      setLastLoadedPage(1);
      return;
    }

    if (page > lastLoadedPage) {
      setAllCampers((prev) => [...prev, ...currentPageCampers]);
      setLastLoadedPage(page);
    }
  }, [response, page, lastLoadedPage]);

  const handleLoadMore = () => {
    incrementPage();
  };

  const currentPageCampers = response?.items ?? [];
  const isLoadingMore = isFetching && page > lastLoadedPage;
  const total = response?.total;
  const hasMore =
    total != null
      ? allCampers.length < total
      : currentPageCampers.length === limit;
  const showLoadMore = isLoadingMore || hasMore;
  const isInitialLoading = (isLoading || isFetching) && allCampers.length === 0;
  const isEmptyState =
    !isLoading &&
    !isFetching &&
    (!response || (response.items ?? []).length === 0);

  if (isInitialLoading) {
    return <Loader />;
  }

  if (isEmptyState) {
    return (
      <div className={styles.noResults}>
        <p className={styles.noResultsText}>
          No campers found matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.listWrapper}>
      <ul className={styles.list}>
        {allCampers.map((camper: Camper) => (
          <li key={camper.id}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>
      {showLoadMore && (
        <Button
          variant="secondary"
          onClick={handleLoadMore}
          className={styles.loadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
};
