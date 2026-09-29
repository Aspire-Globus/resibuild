import React, { useEffect, useState } from "react";

const HeroSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const slider = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="home-hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`home-hero-slide ${
            index === currentSlide ? "is-active" : ""
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="home-hero-slide__image"
          />

          <div className="home-hero-slide__overlay"></div>

          <div className="home-container home-hero-slide__inner">
            <div className="home-hero-slide__content">
              <h1>{slide.title}</h1>

              <div className="home-hero-slide__buttons">
                <a
                  href={slide.primaryButton.url}
                  className="hero-primary-button"
                >
                  {slide.primaryButton.label}

                  <span className="hero-button-arrow">
                    →
                  </span>
                </a>

                <a
                  href={slide.secondaryButton.url}
                  className="hero-secondary-button"
                >
                  {slide.secondaryButton.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="home-container hero-slider-controls">
        <button
          className="hero-slider-control hero-slider-control--previous"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          className="hero-slider-control hero-slider-control--next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;