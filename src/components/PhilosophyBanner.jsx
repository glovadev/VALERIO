import React from "react";
import { siteAssets } from "../data/assets";

export const PhilosophyBanner = ({ onOpenPhilosophyModal }) => {
  return (
    <section
      id="philosophy"
      className="philosophy-section"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "2.5rem",
        paddingBottom: "4.5rem"
      }}
    >
      <div className="container">
        <div
          className="art-banner-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            backgroundColor: "#E4D9CE",
            overflow: "hidden",
            borderRadius: "1px",
            height: "clamp(380px, 32vw, 480px)",
            alignItems: "stretch"
          }}
        >
          {/* Left Text Block */}
          <div
            className="editorial-box"
            style={{
              padding: "clamp(2.5rem, 5vw, 4.8rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              height: "100%"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--color-brass)",
                display: "block",
                marginBottom: "0.75rem"
              }}
            >
              The Art of Signature Scent
            </span>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 3.4vw, 3.2rem)",
                fontWeight: 400,
                lineHeight: 1.14,
                letterSpacing: "0.03em",
                color: "var(--color-near-black)",
                marginBottom: "1.5rem"
              }}
            >
              THE ART
              <br />
              OF PERFUMERY
            </h2>

            <div style={{ marginBottom: "2.2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-near-black)",
                  lineHeight: 1.7,
                  marginBottom: "0.25rem"
                }}
              >
                A SCENT. A MEMORY. AN IDENTITY.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)",
                  color: "var(--color-muted-brown)",
                  lineHeight: 1.6
                }}
              >
                Where fragrance becomes emotion.
              </p>
            </div>

            <a
              href="#/philosophy"
              className="editorial-link"
              onClick={(e) => {
                if (onOpenPhilosophyModal) {
                  e.preventDefault();
                  onOpenPhilosophyModal();
                }
              }}
              style={{
                fontSize: "0.74rem",
                letterSpacing: "0.2em",
                borderBottomWidth: "1.5px"
              }}
            >
              <span>OUR PHILOSOPHY</span>
              <span className="arrow">→</span>
            </a>
          </div>

          {/* Right Cinematic Monochrome Photo */}
          <div
            className="art-image-col"
            style={{
              position: "relative",
              overflow: "hidden",
              height: "100%",
              width: "100%"
            }}
          >
            <img
              src={siteAssets.editorial.philosophy}
              alt="The Art of Perfumery - Woman with Valerioo Fragrance in Cinematic Black and White"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 25%",
                display: "block",
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
