import React from "react";
import { collections } from "../data/collections";
import { CollectionCard } from "./CollectionCard";

export const Collections = ({ onSelectCategory }) => {
  return (
    <section
      id="collections"
      className="collections-section"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "4.5rem",
        paddingBottom: "4.5rem"
      }}
    >
      <div className="container">
        <div
          className="collections-container"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "3rem",
            alignItems: "center"
          }}
        >
          {/* Left Column Editorial Intro */}
          <div className="collections-left">
            <span
              className="eyebrow"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-muted-brown)",
                marginBottom: "1.2rem",
                display: "block"
              }}
            >
              OUR COLLECTIONS
            </span>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3vw, 2.6rem)",
                fontWeight: 400,
                lineHeight: 1.16,
                letterSpacing: "0.03em",
                color: "var(--color-near-black)",
                marginBottom: "2.6rem"
              }}
            >
              EXPLORE THE
              <br />
              WORLD OF
              <br />
              VALERIOO
            </h2>

            <div>
              <a
                href="#bestsellers"
                className="editorial-link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onSelectCategory) onSelectCategory("ALL");
                  history.pushState(null, "", "#bestsellers");
                  const el = document.getElementById("bestsellers");
                  if (el) el.scrollIntoView({ behavior: "instant" });
                }}
                style={{
                  fontSize: "0.74rem",
                  letterSpacing: "0.2em",
                  borderBottomWidth: "1.5px"
                }}
              >
                <span>VIEW ALL COLLECTIONS</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Cards Grid with Exact Identical Dimensions */}
          <div
            className="collections-right-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.2rem",
              alignItems: "stretch"
            }}
          >
            {collections.map((col) => (
              <CollectionCard
                key={col.id}
                collection={col}
                onClick={() => {
                  if (col.id === "bestsellers") {
                    if (onSelectCategory) onSelectCategory(null);
                    const el = document.getElementById("bestsellers");
                    if (el) el.scrollIntoView({ behavior: "instant" });
                  } else if (onSelectCategory) {
                    onSelectCategory(col.title);
                    const el = document.getElementById("bestsellers");
                    if (el) el.scrollIntoView({ behavior: "instant" });
                  }
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
