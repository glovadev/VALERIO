import React from "react";
import { siteAssets } from "../data/assets";

export const CampaignBanner = ({ onOpenStoryModal }) => {
  return (
    <section
      id="campaign"
      className="campaign-section"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "2.5rem",
        paddingBottom: "4.5rem"
      }}
    >
      <div className="container">
        <div
          className="campaign-banner-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            backgroundColor: "#E4D9CE",
            overflow: "hidden",
            borderRadius: "1px",
            minHeight: "clamp(420px, 36vw, 520px)",
            alignItems: "stretch"
          }}
        >
          {/* Left Column: Cinematic Monochrome Couple Image */}
          <div
            className="campaign-image-col"
            style={{
              position: "relative",
              overflow: "hidden",
              height: "100%",
              width: "100%",
              minHeight: "300px"
            }}
          >
            <img
              src={siteAssets.editorial.campaign}
              alt="Valerioo New Campaign - Timeless. Yours. in Cinematic Black and White"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          {/* Right Column: Editorial Campaign Copy */}
          <div
            className="campaign-text-col"
            style={{
              padding: "clamp(2.5rem, 5vw, 4.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              height: "100%"
            }}
          >
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--color-brass)",
                marginBottom: "0.75rem",
                display: "block"
              }}
            >
              NEW CAMPAIGN
            </span>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)",
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "0.04em",
                color: "var(--color-near-black)",
                marginBottom: "2.5rem"
              }}
            >
              TIMELESS.
              <br />
              YOURS.
            </h2>

            <a
              href="#/campaign"
              className="editorial-link"
              onClick={(e) => {
                if (onOpenStoryModal) {
                  e.preventDefault();
                  onOpenStoryModal();
                }
              }}
              style={{
                fontSize: "0.74rem",
                letterSpacing: "0.2em",
                borderBottomWidth: "1.5px"
              }}
            >
              <span>EXPLORE THE STORY</span>
              <span className="arrow">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CampaignBanner;
