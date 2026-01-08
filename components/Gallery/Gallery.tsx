import React from "react";
import Image from "next/image";
import { GalleryItem } from "@/types";
import styles from "./Gallery.module.css";

interface GalleryProps {
    items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
    return (
        <div className={styles.gallery}>
            {items.map((item, index) => (
                <div key={index} className={styles.imageWrapper}>
                    <Image
                        src={item.original}
                        alt={`Gallery image ${index + 1}`}
                        width={290}
                        height={310}
                        className={styles.image}
                    />
                </div>
            ))}
        </div>
    );
};
