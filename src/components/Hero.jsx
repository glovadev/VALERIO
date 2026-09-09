import React from "react";
import { siteConfig } from "../data/siteConfig";
import { siteAssets } from "../data/assets";

export const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      {/* Layer 1: Full-Row Seamless Panorama Background (Wall, Shadows, Stone Pedestal, Tall Flacon, Flora) */}
      <img
        src={siteAssets.hero.background}
        alt="Valerioo Luxury Extrait de Parfum Bottle on Stone Pedestal with Botanical Flora"
        className="hero-panorama-bg"
      />

      {/* Layer 2: Giant Architectural Brand Typography across the top */}
      <div className="hero-giant-watermark">
        <div className="container" style={{ padding: "0 1rem" }}>
          <span className="hero-watermark-text">
            {siteConfig.brandName}
          </span>
        </div>
      </div>

      {/* Layer 3: Pixel-Perfect Transparent Bottle Cutout Overlapping Typography */}
      <img
        src={siteAssets.hero.bottleCutout}
        alt="Valerioo Luxury Flacon Depth"
        aria-hidden="true"
        className="hero-cutout-layer"
      />

      {/* Layer 4: Editorial Copy Container */}
      <div className="container hero-copy-container">
        <div className="hero-copy-box">
          <span className="eyebrow hero-eyebrow">
            {siteConfig.heroSubtitle}
          </span>

          <h1 className="hero-headline">
            <span className="hero-headline-desktop">
              {siteConfig.heroHeadline[0]}
              <br />
              {siteConfig.heroHeadline[1]}
              <br />
              {siteConfig.heroHeadline[2]}
            </span>
            <span className="hero-headline-mobile">
              {siteConfig.heroHeadline[0]} {siteConfig.heroHeadline[1]}
              <br />
              {siteConfig.heroHeadline[2]}
            </span>
          </h1>

          <div className="hero-cta-wrap">
            <a
              href="#collections"
              className="editorial-link"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.22em",
                borderBottomWidth: "1.5px"
              }}
            >
              <span>{siteConfig.heroCta}</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
