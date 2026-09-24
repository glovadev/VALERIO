import React, { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { siteAssets } from "../data/assets";

export const Hero = ({ heroBg }) => {
  const activeBg = heroBg || siteAssets.hero.background;
  const [isWideLandscape, setIsWideLandscape] = useState(false);
  const [heroBgColor, setHeroBgColor] = useState("#FAF2E6");

  const handleImageLoad = (e) => {
    const img = e.target;
    if (img.naturalWidth && img.naturalHeight) {
      setIsWideLandscape(img.naturalWidth / img.naturalHeight > 1.8);
    }
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 10, 10, 0, 0, 10, 10);
      const p = ctx.getImageData(5, 2, 1, 1).data;
      if (p && p[3] > 0) {
        setHeroBgColor(`rgb(${p[0]}, ${p[1]}, ${p[2]})`);
      }
    } catch (_) {
      setHeroBgColor("#FAF2E6");
    }
  };

  return (
    <section id="hero" className="hero-section" style={{ backgroundColor: heroBgColor }}>
      {/* Layer 1: Full-Row Responsive 4K Hero Panorama Background */}
      <picture className="hero-panorama-picture">
        <source
          media="(max-width: 767px)"
          srcSet={heroBg || siteAssets.hero.mobileBackground || siteAssets.hero.background}
        />
        <img
          src={activeBg}
          alt="Valerioo 5 Signature Fragrance Lineup on Travertine Stone Pedestal"
          className={`hero-panorama-bg ${isWideLandscape ? "hero-landscape-mode" : ""}`}
          crossOrigin="anonymous"
          onLoad={handleImageLoad}
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
          className={`hero-cutout-layer ${isWideLandscape ? "hero-landscape-mode" : ""}`}
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
