"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">

      <div className="home-container site-footer__top">

        <div className="site-footer__about">
          <a href="/" className="site-footer__logo">
            Resibuild
            <span>Events</span>
          </a>

          <p>
            In person or online Construction specific CPD courses available
            with our partners in person or online Construction specific!
          </p>
        </div>


        <div className="site-footer__column">
          <h3>Links</h3>

          <nav className="site-footer__links">
            <a href="#about">About Us</a>
            <a href="#events">Events</a>
            <a href="#podcast">Podcasts</a>
            <a href="#insights">CPD &amp; Insights</a>
            <a href="#contact">Contact Us</a>
          </nav>
        </div>


        <div className="site-footer__column">
          <h3>Get in Touch</h3>

          <div className="site-footer__contact-list">

            <div className="site-footer__contact-item">
              <span className="site-footer__contact-icon">
                ⌖
              </span>

              <span>
                Lorem Ipsum Lorem Ipsum
                <br />
                Lorem ipsum
              </span>
            </div>

            <div className="site-footer__contact-item">
              <span className="site-footer__contact-icon">
                ✉
              </span>

              <a href="mailto:events@resi.build">
                events@resi.build
              </a>
            </div>

            <div className="site-footer__contact-item">
              <span className="site-footer__contact-icon">
                ◔
              </span>

              <a href="tel:01184024938">
                01184 024938
              </a>
            </div>

          </div>
        </div>


        <div className="site-footer__column site-footer__newsletter">
          <h3>Join a Newsletter</h3>

          <form
            className="site-footer__newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              aria-label="Email address"
            />

            <button type="submit">
              Subscribe
              <span>→</span>
            </button>
          </form>

          <div className="site-footer__socials">
            <a href="#" aria-label="Dribbble">Dr</a>
            <a href="#" aria-label="Behance">Be</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="Twitter">Tw</a>
          </div>
        </div>

      </div>


      <div className="site-footer__bottom">
        <div className="home-container">
          <p>
            ©2024 by Resibuild | Construction events for the high-rise
            residential sector | Part of the ATW Group
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;