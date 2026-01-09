"use client";

import React, { useEffect, useState } from "react";
import { useCampersStore } from "@/store/campers";
import { useFilterStore } from "@/store/filters";
import { useCampers } from "@/hooks/useQuery";
import { CamperCard } from "../CamperCard/CamperCard";
import { Button } from "../Button/Button";
import styles from "./CamperList.module.css";
import { Loader } from "../Loader/Loader";

export const CamperList = () => {
  const { limit, page, resetPage, incrementPage } = useCampersStore();
  const { filters } = useFilterStore();
  const [allCampers, setAllCampers] = useState<any[]>([]);

  // Reset page when filters change
  useEffect(() => {
    resetPage();
    setAllCampers([]);
  }, [filters, resetPage]);

  // Prepare query params from filters + pagination
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

  const { data: response, isLoading, isFetching } = useCampers(params);

  // Accumulate campers from multiple page loads
  useEffect(() => {
    if (response) {
      const currentPageCampers = Array.isArray(response)
        ? response
        : response?.items || [];

      if (page === 1) {
        setAllCampers(currentPageCampers);
      } else {
        setAllCampers((prev) => [...prev, ...currentPageCampers]);
      }
    }
  }, [response, page]);

  const handleLoadMore = () => {
    incrementPage();
  };

  const currentPageCampers = Array.isArray(response)
    ? response
    : response?.items || [];
  const isLoadingMore = isFetching && page > 1;
  const hasMore = currentPageCampers.length === limit;
  const showLoadMore = isLoadingMore || hasMore;

  if (isLoading && allCampers.length === 0) {
    return <Loader />;
  }

  if (!isLoading && allCampers.length === 0) {
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
        {allCampers.map((camper: any) => (
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
