"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "../Icon/Icon";
import styles from "./Header.module.css";
import clsx from "clsx";

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/icons/logo.svg"
            alt="TravelTrucks Logo"
            width={136}
            height={16}
            priority
          />
        </Link>

        <button
          className={styles.burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Icon id="menu" className={styles.burgerIcon} />
        </button>

        <nav className={clsx(styles.nav, isMenuOpen && styles.navOpen)}>
          <ul className={styles.navList}>
            <li>
              <Link
                href="/"
                className={clsx(
                  styles.navLink,
                  pathname === "/" && styles.active
                )}
                onClick={closeMenu}
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
                onClick={closeMenu}
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
