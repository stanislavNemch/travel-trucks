import React from "react";
import { Review } from "@/types";
import { Icon } from "../Icon/Icon";
import styles from "./Reviews.module.css";
import clsx from "clsx";

interface ReviewsProps {
    reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
    return (
        <div className={styles.reviewsList}>
            {reviews.map((review, index) => (
                <div key={index} className={styles.reviewItem}>
                    <div className={styles.header}>
                        <div className={styles.avatar}>
                            {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.info}>
                            <span className={styles.name}>
                                {review.reviewer_name}
                            </span>
                            <div className={styles.rating}>
                                {[...Array(5)].map((_, i) => (
                                    <Icon
                                        key={i}
                                        id="star"
                                        className={clsx(
                                            styles.starIcon,
                                            i < review.reviewer_rating
                                                ? styles.filled
                                                : styles.empty
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className={styles.comment}>{review.comment}</p>
                </div>
            ))}
        </div>
    );
};
