import React from "react";
import { siteConfig } from "../data/siteConfig";
import { siteAssets } from "../data/assets";

export const Hero = ({ heroBg }) => {
  const activeBg = heroBg || siteAssets.hero.background;

  return (
    <section id="hero" className="hero-section">
      {/* Layer 1: Full-Row Responsive 4K Hero Panorama Background */}
      <picture className="hero-panorama-picture">
        <source
          media="(max-width: 767px)"
          srcSet={siteAssets.hero.mobileBackground || siteAssets.hero.background}
        />
        <img
          src={activeBg}
          alt="Valerioo 5 Signature Fragrance Lineup on Travertine Stone Pedestal"
          className="hero-panorama-bg"
        />
      </picture>

      {/* Layer 2: Giant Architectural Brand Typography across the top */}
      <div className="hero-giant-watermark">
        <div className="container" style={{ padding: "0 1rem" }}>
          <span className="hero-watermark-text">
            {siteConfig.brandName}
          </span>
        </div>
      </div>

      {/* Layer 3: Pixel-Perfect Transparent Bottle Cutout Overlapping Typography (if present) */}
      {siteAssets.hero.bottleCutout ? (
        <img
          src={siteAssets.hero.bottleCutout}
          alt="Valerioo Luxury Flacon Depth"
          aria-hidden="true"
          className="hero-cutout-layer"
        />
      ) : null}

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
