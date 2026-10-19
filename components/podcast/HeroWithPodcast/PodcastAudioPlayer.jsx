"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HeroWithPodcast.module.css";

function getSpotifyEpisodeUri(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  const input = value.trim();

  if (/^spotify:episode:[a-zA-Z0-9]+$/.test(input)) {
    return input;
  }

  try {
    const parsed = new URL(input);

    if (parsed.protocol !== "https:") {
      return "";
    }

    const allowedHosts = [
      "open.spotify.com",
      "spotify.com",
      "www.spotify.com",
    ];

    if (!allowedHosts.includes(parsed.hostname.toLowerCase())) {
      return "";
    }

    const match = parsed.pathname.match(
      /\/(?:intl-[a-z]{2}\/)?episode\/([a-zA-Z0-9]+)/
    );

    return match ? `spotify:episode:${match[1]}` : "";
  } catch {
    return "";
  }
}

export default function PodcastAudioPlayer({ podcasts = [] }) {
  const embedRef = useRef(null);
  const controllerRef = useRef(null);
  const iframeApiRef = useRef(null);
  const loadTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const requestRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  const playablePodcasts = useMemo(
    () =>
      podcasts
        .map((podcast) => ({
          ...podcast,
          spotifyUri: getSpotifyEpisodeUri(podcast.spotifyUrl),
        }))
        .filter((podcast) => podcast.spotifyUri),
    [podcasts]
  );

  const activePodcast = playablePodcasts[activeIndex] || null;
  const activeUri = activePodcast?.spotifyUri || "";

  useEffect(() => {
    if (!activeUri || !embedRef.current) {
      return;
    }

    let cancelled = false;

    const initializePlayer = (IFrameAPI) => {
      if (cancelled || !embedRef.current || controllerRef.current) {
        return;
      }

      iframeApiRef.current = IFrameAPI;

      IFrameAPI.createController(
        embedRef.current,
        {
          width: "100%",
          height: "152",
          uri: activeUri,
        },
        (controller) => {
          if (cancelled) {
            controller.destroy?.();
            return;
          }

          controllerRef.current = controller;
          setApiReady(true);
          setEmbedError(false);
        }
      );
    };

    if (window.__resibuildSpotifyIframeAPI) {
      initializePlayer(window.__resibuildSpotifyIframeAPI);
    } else {
      const previousCallback = window.onSpotifyIframeApiReady;

      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.__resibuildSpotifyIframeAPI = IFrameAPI;

        if (typeof previousCallback === "function") {
          previousCallback(IFrameAPI);
        }

        initializePlayer(IFrameAPI);
      };

      if (
        !document.querySelector(
          'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;

        script.onerror = () => {
          if (!cancelled) {
            setEmbedError(true);
            setIsLoading(false);
          }
        };

        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;

      clearTimeout(loadTimerRef.current);
      clearTimeout(transitionTimerRef.current);

      if (controllerRef.current) {
        controllerRef.current.destroy?.();
        controllerRef.current = null;
      }
    };
  }, [Boolean(activeUri)]);

  useEffect(() => {
    if (!apiReady || !controllerRef.current || !activeUri) {
      return;
    }

    const requestId = ++requestRef.current;

    setIsLoading(true);
    setIsVisible(false);
    setEmbedError(false);

    clearTimeout(loadTimerRef.current);

    try {
      controllerRef.current.loadEntity(activeUri);
    } catch {
      setEmbedError(true);
      setIsLoading(false);
      return;
    }

    loadTimerRef.current = setTimeout(() => {
      if (requestRef.current !== requestId) {
        return;
      }

      setIsLoading(false);

      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 850);

    return () => {
      clearTimeout(loadTimerRef.current);
    };
  }, [activeUri, apiReady]);

  const changePodcast = (direction) => {
    if (playablePodcasts.length <= 1 || isLoading) {
      return;
    }

    setIsVisible(false);

    clearTimeout(transitionTimerRef.current);

    transitionTimerRef.current = setTimeout(() => {
      setActiveIndex(
        (previous) =>
          (previous + direction + playablePodcasts.length) %
          playablePodcasts.length
      );
    }, 200);
  };

  if (!playablePodcasts.length) {
    return (
      <div className={styles.player}>
        <div className={styles.player__header}>
          <h2>Latest Podcast</h2>
        </div>

        <div className={styles.player__empty}>
          No embeddable Spotify podcast episodes are available.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.player}>
      <div className={styles.player__header}>
        <div className={styles.player__heading}>
          <h2>Latest Podcast</h2>

          {/* <span
            className={`${styles.player__episodeTitle} ${
              isLoading ? styles["player__episodeTitle--loading"] : ""
            }`}
          >
            {activePodcast?.title}
          </span> */}
        </div>

        {playablePodcasts.length > 1 && (
          <div className={styles.player__navigation}>
            <button
              type="button"
              onClick={() => changePodcast(-1)}
              disabled={isLoading}
              aria-label="Previous podcast"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => changePodcast(1)}
              disabled={isLoading}
              aria-label="Next podcast"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className={styles.player__spotifyBody}>
        <div className={styles.player__embedWrapper}>
          <div
            ref={embedRef}
            className={`${styles.player__spotifyEmbed} ${
              isVisible && !isLoading
                ? styles["player__spotifyEmbed--visible"]
                : styles["player__spotifyEmbed--hidden"]
            }`}
          />

          {isLoading && !embedError && (
            <div
              className={styles.player__skeleton}
              aria-label="Loading podcast"
              role="status"
            >
              <div className={styles.player__skeletonArtwork} />

              <div className={styles.player__skeletonContent}>
                <div className={styles.player__skeletonTitle} />

                <div className={styles.player__skeletonSubtitle} />

                <div className={styles.player__skeletonControls}>
                  <div className={styles.player__skeletonPlay} />

                  <div className={styles.player__skeletonProgress} />
                </div>
              </div>
            </div>
          )}

          {embedError && (
            <div className={styles.player__loading}>
              Unable to load Spotify player.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}