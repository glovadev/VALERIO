import React from "react";
import { siteConfig } from "../data/siteConfig";

export const FeatureBar = () => {
  const getIcon = (type) => {
    switch (type) {
      case "flower":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 2a4 4 0 0 1 4 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 0 1 4-4z"></path>
            <path d="M12 22a4 4 0 0 1-4-4c0-3 4-6 4-6s4 3 4 6a4 4 0 0 1-4 4z"></path>
            <path d="M2 12a4 4 0 0 1 4-4c3 0 6 4 6 4s-3 4-6 4a4 4 0 0 1-4-4z"></path>
            <path d="M22 12a4 4 0 0 1-4 4c-3 0-6-4-6-4s3-4 6-4a4 4 0 0 1 4 4z"></path>
          </svg>
        );
      case "sparkle":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"></path>
          </svg>
        );
      case "box":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        );
      case "shield":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 11 14 15 10"></polyline>
          </svg>
        );
      case "truck":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="features"
      className="feature-bar-section"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "1.8rem",
        paddingBottom: "1.8rem",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)"
      }}
    >
      <div className="container">
        <div
          className="feature-bar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            alignItems: "center"
          }}
        >
          {siteConfig.features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-item"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0.4rem 0.8rem",
                borderRight: index < siteConfig.features.length - 1 ? "1px solid var(--color-border)" : "none"
              }}
            >
              <div
                style={{
                  color: "var(--color-brass)",
                  marginBottom: "0.65rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {getIcon(feature.icon)}
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.64rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-near-black)",
                  lineHeight: 1.35,
                  marginBottom: "0.2rem"
                }}
              >
                {feature.title}
              </h4>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.58rem",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-muted-brown)",
                  lineHeight: 1.25
                }}
              >
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
