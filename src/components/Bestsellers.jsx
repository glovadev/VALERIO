import React from "react";
import { products, getBestsellers } from "../data/products";
import { ProductCard } from "./ProductCard";

export const Bestsellers = ({ activeCategory, onSelectCategory, onQuickView, allProducts = products }) => {
  const isCategoryMatch = (productCategory, filterCategory) => {
    if (!filterCategory || filterCategory === "ALL") return true;
    const pCat = (productCategory || "").toUpperCase().trim();
    const fCat = filterCategory.toUpperCase().trim();
    if (pCat === fCat) return true;
    if (
      (fCat === "UNISEX" || fCat === "UNISEX & COMBO" || fCat === "COMBO") &&
      (pCat === "UNISEX" || pCat === "UNISEX & COMBO" || pCat === "COMBO")
    ) {
      return true;
    }
    if ((fCat === "KING" || fCat === "MEN") && (pCat === "KING" || pCat === "MEN")) return true;
    if ((fCat === "QUEEN" || fCat === "WOMEN") && (pCat === "QUEEN" || pCat === "WOMEN")) return true;
    return false;
  };

  const displayedProducts =
    activeCategory === "ALL"
      ? allProducts
      : activeCategory
      ? allProducts.filter((p) => isCategoryMatch(p.category, activeCategory))
      : allProducts.filter((p) => p.bestseller);

  const getSectionHeading = () => {
    if (activeCategory === "ALL") return "ALL COLLECTIONS";
    if (!activeCategory) return "BESTSELLERS";
    const upper = activeCategory.toUpperCase().trim();
    if (upper === "UNISEX" || upper === "UNISEX & COMBO") {
      return "UNISEX & COMBO";
    }
    return `${activeCategory} COLLECTION`;
  };

  return (
    <section
      id="bestsellers"
      className="bestsellers-section"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "4.5rem",
        paddingBottom: "5.5rem"
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1320px",
          paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3rem)"
        }}
      >
        {/* Section Header - Exactly matching reference */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            paddingBottom: "1.2rem",
            marginBottom: "2.2rem"
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                margin: 0
              }}
            >
              {getSectionHeading()}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {activeCategory && activeCategory !== "ALL" && (
              <button
                onClick={() => onSelectCategory("ALL")}
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  cursor: "pointer",
                  paddingBottom: "2px",
                  borderBottom: "1px solid var(--color-brass)",
                  background: "none",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none"
                }}
              >
                SHOW ALL
              </button>
            )}

            <a
              href="#bestsellers"
              className="editorial-link"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory(activeCategory === "ALL" ? null : "ALL");
              }}
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                borderBottom: "none"
              }}
            >
              <span>{activeCategory === "ALL" ? "SHOW BESTSELLERS" : activeCategory ? "VIEW ALL" : "VIEW ALL"}</span>
              <span className="arrow" style={{ marginLeft: "6px" }}>→</span>
            </a>
          </div>
        </div>

        {/* 4-Column Grid with Even Spacing & Matching Margins */}
        <div
          className="bestsellers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(1rem, 2vw, 1.8rem)",
            alignItems: "start"
          }}
        >
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
