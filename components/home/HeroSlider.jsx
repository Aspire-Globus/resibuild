// "use client";

// import { useEffect, useState } from "react";

// export default function HeroSlider({ slides = [] }) {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     if (!slides.length || slides.length === 1) return;

//     const timer = setInterval(() => {
//       setCurrent((prev) =>
//         prev === slides.length - 1 ? 0 : prev + 1
//       );
//     }, 6000);

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const goPrevious = () => {
//     setCurrent((prev) =>
//       prev === 0 ? slides.length - 1 : prev - 1
//     );
//   };

//   const goNext = () => {
//     setCurrent((prev) =>
//       prev === slides.length - 1 ? 0 : prev + 1
//     );
//   };

//   if (!slides.length) {
//     return null;
//   }

//   return (
//     <section className="home-hero-slider">
//       <div
//         className="home-hero-slider__track"
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <div
//             className="home-hero-slide"
//             key={slide.id || index}
//           >
//             {slide.video ? (
//               <video
//                 className="home-hero-slide__image"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 preload="metadata"
//               >
//                 <source
//                   src={slide.video}
//                   type="video/mp4"
//                 />
//               </video>
//             ) : (
//               <img
//                 className="home-hero-slide__image"
//                 src={slide.image}
//                 alt={slide.title || ""}
//               />
//             )}

//             <div className="home-hero-slide__overlay"></div>

//             <div className="home-container home-hero-slide__inner">
//               <div className="home-hero-slide__content">
//                 <h1>{slide.title}</h1>

//                 <div className="home-hero-slide__buttons">
//                   {slide.primaryButton?.label && (
//                     <a
//                       href={slide.primaryButton.url || "#"}
//                       className="hero-primary-button"
//                     >
//                       <span>
//                         {slide.primaryButton.label}
//                       </span>

//                       <span className="hero-button-arrow">
//                         →
//                       </span>
//                     </a>
//                   )}

//                   {slide.secondaryButton?.label && (
//                     <a
//                       href={slide.secondaryButton.url || "#"}
//                       className="hero-secondary-button"
//                     >
//                       {slide.secondaryButton.label}
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {slides.length > 1 && (
//         <div className="hero-slider-controls">
//           <button
//             type="button"
//             onClick={goPrevious}
//             className="hero-slider-control hero-slider-control--previous"
//             aria-label="Previous slide"
//           >
//             ‹
//           </button>

//           <button
//             type="button"
//             onClick={goNext}
//             className="hero-slider-control"
//             aria-label="Next slide"
//           >
//             ›
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import styles from "./HeroSlider.module.css";

export default function HeroSlider({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev >= slides.length - 1 ? 0 : prev + 1
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
      prev >= slides.length - 1 ? 0 : prev + 1
    );
  };

  if (!slides.length) return null;

  return (
    <section className={styles["home-hero-slider"]}>
      <div
        className={styles["home-hero-slider__track"]}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            className={styles["home-hero-slide"]}
            key={slide.id || index}
          >
            {/* Background image or video */}
            {slide.video ? (
              <video
                className={styles["home-hero-slide__image"]}
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
                className={styles["home-hero-slide__image"]}
                src={slide.image}
                alt={slide.title || ""}
              />
            )}

            {/* Background overlay */}
            <div
              className={styles["home-hero-slide__overlay"]}
            />

            {/* Content */}
            <div className={styles["home-hero-slide__inner"]}>
              <div className={styles["home-hero-slide__content"]}>
                <h1>{slide.title}</h1>

                <div className={styles["home-hero-slide__buttons"]}>
                  {slide.primaryButton?.label && (
                    <a
                      href={slide.primaryButton.url || "#"}
                      className={styles["hero-primary-button"]}
                    >
                      <span>
                        {slide.primaryButton.label}
                      </span>

                      <span
                        className={styles["hero-button-arrow"]}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </a>
                  )}

                  {slide.secondaryButton?.label && (
                    <a
                      href={slide.secondaryButton.url || "#"}
                      className={styles["hero-secondary-button"]}
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

      {/* Slider controls */}
      {slides.length > 1 && (
        <div className={styles["hero-slider-controls"]}>
          <button
            type="button"
            onClick={goPrevious}
            className={`${styles["hero-slider-control"]} ${
              styles["hero-slider-control--previous"]
            }`}
            aria-label="Previous slide"
          >
            <span className="dashicons dashicons-arrow-left-alt2" aria-hidden="true"></span>
          </button>

          <button
            type="button"
            onClick={goNext}
            className={styles["hero-slider-control"]}
            aria-label="Next slide"
          >
            <span className="dashicons dashicons-arrow-right-alt2" aria-hidden="true"></span>
          </button>
        </div>
      )}
    </section>
  );
}