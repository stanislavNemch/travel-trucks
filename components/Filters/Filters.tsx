"use client";

import React, { useState } from "react";
import { useFilterStore } from "@/store/filters";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import styles from "./Filters.module.css";
import clsx from "clsx";

export const Filters = () => {
    const { filters, setFilters } = useFilterStore();
    const [localFilters, setLocalFilters] = useState(filters);

    // Обробка зміни локації
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilters({ ...localFilters, location: e.target.value });
    };

    // Обробка зміни чекбоксів (обладнання)
    const handleCheckboxChange = (key: keyof typeof localFilters) => {
        setLocalFilters({
            ...localFilters,
            [key]: !localFilters[key as keyof typeof localFilters],
        });
    };

    // Обробка зміни типу транспортного засобу
    const handleTypeChange = (value: string) => {
        setLocalFilters({ ...localFilters, form: value });
    };

    // Відправка форми фільтрації
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters(localFilters);
    };

    return (
        <aside className={styles.filters}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.locationGroup}>
                    <label htmlFor="location" className={styles.label}>
                        Location
                    </label>
                    <div className={styles.inputWrapper}>
                        <Icon id="map-pin" className={styles.inputIcon} />
                        <input
                            type="text"
                            id="location"
                            placeholder="City"
                            value={localFilters.location}
                            onChange={handleLocationChange}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <h3 className={styles.groupTitle}>Filters</h3>

                    <div className={styles.subGroup}>
                        <h4 className={styles.subTitle}>Vehicle equipment</h4>
                        <div className={styles.checkboxGrid}>
                            {[
                                { key: "AC", label: "AC", icon: "wind" },
                                {
                                    key: "transmission",
                                    label: "Automatic",
                                    icon: "diagram",
                                    value: "automatic",
                                },
                                {
                                    key: "kitchen",
                                    label: "Kitchen",
                                    icon: "cup-hot",
                                },
                                { key: "TV", label: "TV", icon: "tv" },
                                {
                                    key: "bathroom",
                                    label: "Shower/WC",
                                    icon: "ph_shower",
                                },
                            ].map((item) => (
                                <label
                                    key={item.key}
                                    className={clsx(
                                        styles.checkboxLabel,
                                        (item.key === "transmission"
                                            ? localFilters.transmission ===
                                              "automatic"
                                            : localFilters[
                                                  item.key as keyof typeof localFilters
                                              ]) && styles.checked
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        className={styles.hiddenCheckbox}
                                        checked={
                                            item.key === "transmission"
                                                ? localFilters.transmission ===
                                                  "automatic"
                                                : !!localFilters[
                                                      item.key as keyof typeof localFilters
                                                  ]
                                        }
                                        onChange={() => {
                                            if (item.key === "transmission") {
                                                setLocalFilters({
                                                    ...localFilters,
                                                    transmission:
                                                        localFilters.transmission ===
                                                        "automatic"
                                                            ? ""
                                                            : "automatic",
                                                });
                                            } else {
                                                handleCheckboxChange(
                                                    item.key as any
                                                );
                                            }
                                        }}
                                    />
                                    <Icon
                                        id={item.icon}
                                        className={styles.filterIcon}
                                    />
                                    <span className={styles.filterText}>
                                        {item.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.subGroup}>
                        <h4 className={styles.subTitle}>Vehicle type</h4>
                        <div className={styles.radioGrid}>
                            {[
                                {
                                    value: "panelTruck",
                                    label: "Van",
                                    icon: "bi_grid-1x2",
                                },
                                {
                                    value: "fullyIntegrated",
                                    label: "Fully Integrated",
                                    icon: "bi_grid",
                                },
                                {
                                    value: "alcove",
                                    label: "Alcove",
                                    icon: "bi_grid-3x3-gap",
                                },
                            ].map((item) => (
                                <label
                                    key={item.value}
                                    className={clsx(
                                        styles.radioLabel,
                                        localFilters.form === item.value &&
                                            styles.checked
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="form"
                                        value={item.value}
                                        checked={
                                            localFilters.form === item.value
                                        }
                                        onChange={() =>
                                            handleTypeChange(item.value)
                                        }
                                        className={styles.hiddenRadio}
                                    />
                                    <Icon
                                        id={item.icon}
                                        className={styles.filterIcon}
                                    />
                                    <span className={styles.filterText}>
                                        {item.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <Button type="submit" className={styles.searchButton}>
                    Search
                </Button>
            </form>
        </aside>
    );
};
