"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header({
  data,
  menuItems = [],
}) {
  const pathname = usePathname();

  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const normalLogo =
    data?.headerLogo?.node?.sourceUrl;

  const stickyLogo =
    data?.stickeyHeaderLogo?.node?.sourceUrl;

  const currentLogo =
    isSticky && stickyLogo
      ? stickyLogo
      : normalLogo;

  const topLevelItems = menuItems.filter(
    (item) => !item.parentDatabaseId
  );

  const getUrl = (item) => {
    if (item.path) {
      return item.path;
    }

    if (!item.url) {
      return "#";
    }

    try {
      const url = new URL(item.url);

      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return item.url;
    }
  };

  /* =========================================
     CHECK ACTIVE MENU ITEM
  ========================================= */

  const normalizePath = (path) => {
    if (!path) return "/";

    const cleanPath = path.split("?")[0].split("#")[0];

    return cleanPath === "/"
      ? "/"
      : cleanPath.replace(/\/+$/, "");
  };

  const isActiveLink = (url) => {
    if (!url || url === "#") return false;

    const currentPath = normalizePath(pathname);
    const menuPath = normalizePath(url);

    // Homepage should only be active on homepage
    if (menuPath === "/") {
      return currentPath === "/";
    }

    // Exact page match
    return currentPath === menuPath;
  };

  return (
    <header
      className={`${styles["site-header"]} ${
        isSticky
          ? styles["site-header--sticky"]
          : ""
      }`}
    >
      <div className={styles["site-header__container"]}>

        {/* LOGO */}

        <Link
          href="/"
          className={styles["site-header__logo"]}
          onClick={() => setMenuOpen(false)}
        >
          {currentLogo ? (
            <img
              src={currentLogo}
              alt={
                data?.headerLogo?.node?.altText ||
                "Resibuild Events"
              }
            />
          ) : (
            <span>Resibuild Events</span>
          )}
        </Link>

        {/* NAVIGATION */}

        <nav className={`${styles["site-header__nav"]} ${
          menuOpen
            ? styles["site-header__nav--open"]
            : ""
        }`}>
          {topLevelItems.map((item) => {
            const itemUrl = getUrl(item);
            const isActive = isActiveLink(itemUrl);

            return (
              <Link
                key={item.id}
                href={itemUrl}
                className={
                  isActive
                    ? styles["site-header__nav--active"]
                    : ""
                }
                aria-current={
                  isActive ? "page" : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* SEARCH */}

        <form
          className={styles["site-header__search"]}
          action="/search"
          method="get"
        >
          <input
            type="search"
            name="q"
            placeholder="Search"
            aria-label="Search"
          />

          <button
            type="submit"
            aria-label="Submit search"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" />
            </svg>
          </button>
        </form>

        {/* MOBILE MENU TOGGLE */}

        <button
          className={`${styles["site-header__toggle"]} ${
            menuOpen
              ? styles["site-header__toggle--open"]
              : ""
          }`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}