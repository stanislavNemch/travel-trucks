import React from "react";
import { Camper } from "@/types";
import { Icon } from "../Icon/Icon";
import styles from "./Features.module.css";

interface FeaturesProps {
  camper: Camper;
}

export const Features: React.FC<FeaturesProps> = ({ camper }) => {
  return (
    <div className={styles.featuresWrapper}>
      <div className={styles.categories}>
        <span className={styles.category}>
          <Icon id="diagram" className={styles.categoryIcon} />
          {camper.transmission}
        </span>
        <span className={styles.category}>
          <Icon id="fuel-pump" className={styles.categoryIcon} />
          {camper.engine}
        </span>
        {camper.AC && (
          <span className={styles.category}>
            <Icon id="wind-20" className={styles.categoryIcon} />
            AC
          </span>
        )}
        {camper.bathroom && (
          <span className={styles.category}>
            <Icon id="ph_shower" className={styles.categoryIcon} />
            Bathroom
          </span>
        )}
        {camper.kitchen && (
          <span className={styles.category}>
            <Icon id="cup-hot" className={styles.categoryIcon} />
            Kitchen
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
            <Icon id="ui-radios" className={styles.categoryIcon} />
            Radio
          </span>
        )}
        {camper.refrigerator && (
          <span className={styles.category}>
            <Icon id="solar_fridge-outline" className={styles.categoryIcon} />
            Refrigerator
          </span>
        )}
        {camper.microwave && (
          <span className={styles.category}>
            <Icon id="lucide_microwave-20" className={styles.categoryIcon} />
            Microwave
          </span>
        )}
        {camper.gas && (
          <span className={styles.category}>
            <Icon id="hugeicons_gas-stove-20" className={styles.categoryIcon} />
            Gas
          </span>
        )}
        {camper.water && (
          <span className={styles.category}>
            <Icon id="ion_water-outline-20" className={styles.categoryIcon} />
            Water
          </span>
        )}
      </div>

      <div className={styles.details}>
        <h3 className={styles.detailsTitle}>Vehicle details</h3>
        <ul className={styles.detailsList}>
          <li className={styles.detailsItem}>
            <span>Form</span>
            <span className={styles.detailsValue}>{camper.form}</span>
          </li>
          <li className={styles.detailsItem}>
            <span>Length</span>
            <span className={styles.detailsValue}>{camper.length}</span>
          </li>
          <li className={styles.detailsItem}>
            <span>Width</span>
            <span className={styles.detailsValue}>{camper.width}</span>
          </li>
          <li className={styles.detailsItem}>
            <span>Height</span>
            <span className={styles.detailsValue}>{camper.height}</span>
          </li>
          <li className={styles.detailsItem}>
            <span>Tank</span>
            <span className={styles.detailsValue}>{camper.tank}</span>
          </li>
          <li className={styles.detailsItem}>
            <span>Consumption</span>
            <span className={styles.detailsValue}>{camper.consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
