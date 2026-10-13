"use client";

import { useEffect, useState } from "react";

export default function HeroSlider({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length || slides.length === 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goPrevious = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  if (!slides.length) {
    return null;
  }

  return (
    <section className="home-hero-slider">
      <div
        className="home-hero-slider__track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            className="home-hero-slide"
            key={slide.id || index}
          >
            {slide.video ? (
              <video
                className="home-hero-slide__image"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src={slide.video}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                className="home-hero-slide__image"
                src={slide.image}
                alt={slide.title || ""}
              />
            )}

            <div className="home-hero-slide__overlay"></div>

            <div className="home-container home-hero-slide__inner">
              <div className="home-hero-slide__content">
                <h1>{slide.title}</h1>

                <div className="home-hero-slide__buttons">
                  {slide.primaryButton?.label && (
                    <a
                      href={slide.primaryButton.url || "#"}
                      className="hero-primary-button"
                    >
                      <span>
                        {slide.primaryButton.label}
                      </span>

                      <span className="hero-button-arrow">
                        →
                      </span>
                    </a>
                  )}

                  {slide.secondaryButton?.label && (
                    <a
                      href={slide.secondaryButton.url || "#"}
                      className="hero-secondary-button"
                    >
                      {slide.secondaryButton.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="hero-slider-controls">
          <button
            type="button"
            onClick={goPrevious}
            className="hero-slider-control hero-slider-control--previous"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goNext}
            className="hero-slider-control"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}