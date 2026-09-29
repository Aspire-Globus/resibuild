"use client";

import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">

        <Link href="/" className="site-header__logo">
          <span className="site-header__logo-main">Resibuild</span>
          <span className="site-header__logo-events">Events</span>
        </Link>

        <nav className={`site-header__nav ${menuOpen ? "is-open" : ""}`}>
         <Link href="/about">About Us</Link>

            <Link href="/events">Events</Link>
          <Link href="/#podcast">Podcasts</Link>
          <Link href="/#cpd">CPD</Link>
          <Link href="/#insights">Insight</Link>
          <Link href="/#contact">Contact Us</Link>
        </nav>

        <div className="site-header__search">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <button type="button" aria-label="Submit search">
            <span className="search-icon"></span>
          </button>
        </div>

        <button
          type="button"
          className="site-header__menu"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
};

export default Header;