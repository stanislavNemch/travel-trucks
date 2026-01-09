"use client";

import React, { useState } from "react";
import { Camper } from "@/types";
import { Gallery } from "../Gallery/Gallery";
import { Features } from "../Features/Features";
import { Reviews } from "../Reviews/Reviews";
import { BookingForm } from "../BookingForm/BookingForm";
import { Icon } from "../Icon/Icon";
import styles from "@/app/catalog/[id]/page.module.css";
import clsx from "clsx";

interface CamperDetailsProps {
  camper: Camper;
}

export const CamperDetails: React.FC<CamperDetailsProps> = ({ camper }) => {
  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features"
  );

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.ratingLocation}>
          <div className={styles.rating}>
            <Icon id="star" className={styles.starIcon} />
            <span className={styles.ratingText}>
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <Icon id="map-16" className={styles.mapIcon} />
            {camper.location}
          </div>
        </div>
        <div className={styles.price}>€{camper.price.toFixed(2)}</div>
      </div>

      <Gallery items={camper.gallery} />

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <button
          className={clsx(
            styles.tab,
            activeTab === "features" && styles.activeTab
          )}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={clsx(
            styles.tab,
            activeTab === "reviews" && styles.activeTab
          )}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          {activeTab === "features" ? (
            <Features camper={camper} />
          ) : (
            <Reviews reviews={camper.reviews} />
          )}
        </div>
        <div className={styles.rightColumn}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};
