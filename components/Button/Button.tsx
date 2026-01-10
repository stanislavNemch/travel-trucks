import React from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "small" | "medium" | "large";
    href?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = "primary",
    size = "medium",
    href,
    ...props
}) => {
    const commonClasses = clsx(
        styles.button,
        styles[variant],
        styles[size],
        className
    );

    if (href) {
        return (
            <Link href={href} className={commonClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={commonClasses} {...props}>
            {children}
        </button>
    );
};
