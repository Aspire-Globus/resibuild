"use client";

import { useEffect, useState } from "react";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const finishLoading = () => {
      setHide(true);

      setTimeout(() => {
        setLoading(false);
      }, 400);
    };

    if (document.readyState === "complete") {
      const timer = setTimeout(finishLoading, 500);
      return () => clearTimeout(timer);
    }

    window.addEventListener("load", finishLoading);

    return () => {
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`${styles.globalPageLoader} ${
        hide ? styles.globalPageLoaderHide : ""
      }`}
    >
      <img
        src="https://rajwinderk6.sg-host.com/wp-content/uploads/2026/10/logo.png"
        alt="Resibuild"
        className={styles.globalPageLoaderLogo}
      />
    </div>
  );
}