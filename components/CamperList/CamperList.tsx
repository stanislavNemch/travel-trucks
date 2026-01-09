"use client";

import React, { useEffect, useState } from "react";
import { useCampersStore } from "@/store/campers";
import { useFilterStore } from "@/store/filters";
import { CamperCard } from "../CamperCard/CamperCard";
import { Button } from "../Button/Button";
import styles from "./CamperList.module.css";

import { Loader } from "../Loader/Loader";

export const CamperList = () => {
    const { campers, fetchCampers, loading } = useCampersStore();
    const { filters } = useFilterStore();
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        fetchCampers(filters);
        setVisibleCount(4);
    }, [fetchCampers, filters]);

    const filteredCampers = campers;

    const visibleCampers = filteredCampers.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    if (loading && campers.length === 0) {
        return <Loader />;
    }

    if (!loading && filteredCampers.length === 0) {
        return (
            <div className={styles.noResults}>
                <p className={styles.noResultsText}>
                    No campers found matching your criteria. Try adjusting your
                    filters.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.listWrapper}>
            <ul className={styles.list}>
                {visibleCampers.map((camper) => (
                    <li key={camper.id}>
                        <CamperCard camper={camper} />
                    </li>
                ))}
            </ul>
            {visibleCount < filteredCampers.length && (
                <Button
                    variant="secondary"
                    onClick={handleLoadMore}
                    className={styles.loadMore}
                >
                    Load More
                </Button>
            )}
        </div>
    );
};
