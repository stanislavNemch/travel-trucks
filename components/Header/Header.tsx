"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import clsx from "clsx";

export const Header = () => {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/icons/logo.svg"
                        alt="TravelTrucks Logo"
                        width={136}
                        height={16}
                        priority
                    />
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li>
                            <Link
                                href="/"
                                className={clsx(
                                    styles.navLink,
                                    pathname === "/" && styles.active
                                )}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/catalog"
                                className={clsx(
                                    styles.navLink,
                                    pathname === "/catalog" && styles.active
                                )}
                            >
                                Catalog
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
