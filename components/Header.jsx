"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({
  data,
  menuItems = [],
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
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

  const topLevelItems =
    menuItems.filter(
      (item) =>
        !item.parentDatabaseId
    );

  const getUrl = (item) => {
    if (item.path) {
      return item.path;
    }

    if (!item.url) {
      return "#";
    }

    try {
      const url =
        new URL(item.url);

      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return item.url;
    }
  };

  return (
    <header
      className={`site-header ${
        isSticky
          ? "site-header--sticky"
          : ""
      }`}
    >
      <div className="site-header__container">

        <Link
          href="/"
          className="site-header__logo"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          {currentLogo ? (
            <img
              src={currentLogo}
              alt={
                data?.headerLogo?.node
                  ?.altText ||
                "Resibuild Events"
              }
            />
          ) : (
            <span>
              Resibuild Events
            </span>
          )}
        </Link>

        <nav
          className={`site-header__nav ${
            menuOpen
              ? "site-header__nav--open"
              : ""
          }`}
        >
          {topLevelItems.map(
            (item) => (
              <Link
                key={item.id}
                href={getUrl(item)}
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <form
          className="site-header__search"
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
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="M16.5 16.5L21 21" />
            </svg>
          </button>
        </form>

        <button
          className="site-header__toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              (prev) => !prev
            )
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}