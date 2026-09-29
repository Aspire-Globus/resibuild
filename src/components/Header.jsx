import { Link } from "react-router-dom";
import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">

        <a href="/" className="site-header__logo">
          <span className="site-header__logo-main">Resibuild</span>
          <span className="site-header__logo-events">Events</span>
        </a>

        <nav className={`site-header__nav ${menuOpen ? "is-open" : ""}`}>
         <Link to="/about">About Us</Link>

            <Link to="/events">Events</Link>
          <a href="#podcast">Podcasts</a>
          <a href="#cpd">CPD</a>
          <a href="#insights">Insight</a>
          <a href="#contact">Contact Us</a>
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