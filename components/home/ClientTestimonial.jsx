"use client";

import { useEffect, useRef, useState } from "react";

export default function ClientTestimonial({ items = [] }) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const startX = useRef(null);
  const currentX = useRef(null);

  useEffect(() => {
    if (!items.length || items.length === 1 || isDragging) {
      return;
    }

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === items.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(timer);
  }, [items.length, isDragging]);

  if (!items.length) {
    return null;
  }

  const goPrevious = () => {
    setCurrent((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrent((prev) =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  };

  const handlePointerDown = (event) => {
    setIsDragging(true);

    startX.current = event.clientX;
    currentX.current = event.clientX;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (event) => {
    if (!isDragging || startX.current === null) {
      return;
    }

    currentX.current = event.clientX;

    const distance =
      currentX.current - startX.current;

    setDragOffset(distance);
  };

  const handlePointerUp = (event) => {
    if (
      !isDragging ||
      startX.current === null ||
      currentX.current === null
    ) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance =
      currentX.current - startX.current;

    const minimumSwipeDistance = 70;

    if (distance < -minimumSwipeDistance) {
      goNext();
    } else if (distance > minimumSwipeDistance) {
      goPrevious();
    }

    setIsDragging(false);
    setDragOffset(0);

    startX.current = null;
    currentX.current = null;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset(0);

    startX.current = null;
    currentX.current = null;
  };

  const backgroundImage =
    items[0]?.backgroundImage || "";

  return (
    <section
      className={`client-testimonial ${
        isDragging ? "is-dragging" : ""
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div className="client-testimonial__overlay"></div>

      <div className="home-container client-testimonial__inner">
        <div className="client-testimonial__quote-mark">
          “
        </div>

        <div className="client-testimonial__viewport">
          <div
            className="client-testimonial__track"
            style={{
              transform: `translateX(calc(-${
                current * 100
              }% + ${dragOffset}px))`,
              transition: isDragging
                ? "none"
                : "transform 0.8s ease-in-out",
            }}
          >
            {items.map((item, index) => (
              <div
                className="client-testimonial__slide"
                key={item.id || index}
              >
                <div className="client-testimonial__content">
                  {item.quote && (
                    <blockquote>
                      {item.quote}
                    </blockquote>
                  )}

                  {item.author && (
                    <div className="client-testimonial__author">
                      <strong>
                        {item.author}
                      </strong>

                      {item.role && (
                        <span>
                          {item.role}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="client-testimonial__end-quote">
          ”
        </div>
      </div>
    </section>
  );
}