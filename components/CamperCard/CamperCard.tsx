"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camper } from "@/types";
import { useFavoritesStore } from "@/store/favorites";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import styles from "./CamperCard.module.css";
import clsx from "clsx";

interface CamperCardProps {
    camper: Camper;
}

export const CamperCard: React.FC<CamperCardProps> = ({ camper }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const favorite = isFavorite(camper.id);

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(camper.id);
        } else {
            addFavorite(camper);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={camper.gallery[0].thumb}
                    alt={camper.name}
                    width={290}
                    height={310}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2 className={styles.name}>{camper.name}</h2>
                    <div className={styles.priceRow}>
                        <span className={styles.price}>
                            €{camper.price.toFixed(2)}
                        </span>
                        <button
                            onClick={toggleFavorite}
                            className={clsx(
                                styles.favoriteButton,
                                favorite && styles.active
                            )}
                        >
                            <Icon
                                id="heart"
                                className={clsx(
                                    styles.heartIcon,
                                    favorite && styles.heartActive
                                )}
                            />
                        </button>
                    </div>
                </div>
                <div className={styles.ratingLocation}>
                    <div className={styles.rating}>
                        <Icon id="star" className={styles.starIcon} />
                        <span className={styles.ratingText}>
                            {camper.rating} ({camper.reviews.length} Reviews)
                        </span>
                    </div>
                    <div className={styles.location}>
                        <Icon id="map" className={styles.mapIcon} />
                        {camper.location}
                    </div>
                </div>
                <p className={styles.description}>{camper.description}</p>
                <div className={styles.categories}>
                    <span className={styles.category}>
                        <Icon id="diagram" className={styles.categoryIcon} />
                        {camper.transmission}
                    </span>
                    <span className={styles.category}>
                        <Icon id="fuel-pump" className={styles.categoryIcon} />
                        {camper.engine}
                    </span>
                    {camper.kitchen && (
                        <span className={styles.category}>
                            <Icon
                                id="cup-hot"
                                className={styles.categoryIcon}
                            />
                            Kitchen
                        </span>
                    )}
                    {camper.AC && (
                        <span className={styles.category}>
                            <Icon id="wind" className={styles.categoryIcon} />
                            AC
                        </span>
                    )}
                    {camper.bathroom && (
                        <span className={styles.category}>
                            <Icon
                                id="ph_shower"
                                className={styles.categoryIcon}
                            />
                            Bathroom
                        </span>
                    )}
                    {camper.TV && (
                        <span className={styles.category}>
                            <Icon id="tv" className={styles.categoryIcon} />
                            TV
                        </span>
                    )}
                    {camper.radio && (
                        <span className={styles.category}>
                            <Icon
                                id="ui-radios"
                                className={styles.categoryIcon}
                            />
                            Radio
                        </span>
                    )}
                    {camper.refrigerator && (
                        <span className={styles.category}>
                            <Icon
                                id="solar_fridge-outline"
                                className={styles.categoryIcon}
                            />
                            Refrigerator
                        </span>
                    )}
                    {camper.microwave && (
                        <span className={styles.category}>
                            <Icon
                                id="lucide_microwave"
                                className={styles.categoryIcon}
                            />
                            Microwave
                        </span>
                    )}
                    {camper.gas && (
                        <span className={styles.category}>
                            <Icon
                                id="hugeicons_gas-stove"
                                className={styles.categoryIcon}
                            />
                            Gas
                        </span>
                    )}
                    {camper.water && (
                        <span className={styles.category}>
                            <Icon
                                id="ion_water-outline"
                                className={styles.categoryIcon}
                            />
                            Water
                        </span>
                    )}
                </div>
                <Link
                    href={`/catalog/${camper.id}`}
                    className={styles.showMoreLink}
                >
                    <Button>Show more</Button>
                </Link>
            </div>
        </div>
    );
};
