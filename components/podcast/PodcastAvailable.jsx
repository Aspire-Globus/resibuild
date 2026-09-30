import React from "react";

const PodcastAvailable = () => {
  return (
    <section className="podcast-available">
      <div className="home-container podcast-available__inner">
        <span>Podcast Available On</span>

        <div className="podcast-available__platforms">
          <a href="#" className="podcast-platform">
            <span className="podcast-platform__youtube">▶</span>
            YouTube
          </a>

          <a href="#" className="podcast-platform">
            <span className="podcast-platform__spotify">●</span>
            Spotify
          </a>
        </div>
      </div>
    </section>
  );
};

export default PodcastAvailable;