import React, { useState } from "react";
import { sendProductInquiry } from "../utils/whatsapp";

export const ProductCard = ({ product, onQuickView }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[1] || product.variants[0] : null
  );

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const activeBadge = selectedVariant?.badge;

  const handleOrderWhatsApp = (e) => {
    e.stopPropagation();
    sendProductInquiry(product, 1, selectedVariant);
  };

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%"
      }}
    >
      {/* Product Image Box */}
      <div
        className="product-image-container"
        onClick={() => onQuickView(product, selectedVariant)}
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#F7F3EE",
          cursor: "pointer",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "2px",
          marginBottom: "1.25rem",
          aspectRatio: "170 / 144",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)"
        }}
      >
        <img
          src={product.image}
          alt={`${product.name} - ${product.subtitle}`}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        {activeBadge && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "var(--color-brass)",
              color: "#FFFFFF",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: "1px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
            }}
          >
            {activeBadge}
          </div>
        )}
      </div>

      {/* Product Meta Info */}
      <div
        className="product-meta"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%"
        }}
      >
        <h3
          className="product-name"
          onClick={() => onQuickView(product, selectedVariant)}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-near-black)",
            cursor: "pointer",
            marginBottom: "0.32rem",
            transition: "color 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
        >
          {product.name}
        </h3>

        <p
          className="product-subtitle"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.62rem",
            fontWeight: 400,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-muted-brown)",
            marginBottom: "0.48rem"
          }}
        >
          {product.subtitle}
        </p>

        {/* Size Selection Categories (10 ML / 20 ML) */}
        {product.variants && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "0.65rem"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {product.variants.map((v) => {
              const isSelected = selectedVariant?.size === v.size;
              return (
                <button
                  key={v.size}
                  onClick={() => setSelectedVariant(v)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.62rem",
                    fontWeight: isSelected ? 600 : 500,
                    letterSpacing: "0.1em",
                    padding: "3px 8px",
                    borderRadius: "1px",
                    cursor: "pointer",
                    border: isSelected
                      ? "1px solid var(--color-brass)"
                      : "1px solid rgba(197, 185, 172, 0.6)",
                    backgroundColor: isSelected ? "#FAF8F5" : "transparent",
                    color: isSelected ? "var(--color-near-black)" : "var(--color-muted-brown)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {v.size} {v.price ? `· ₹${v.price}` : ""}
                </button>
              );
            })}
          </div>
        )}

        {/* Pricing Display */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "0.8rem" }}>
          <span
            className="product-price"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-near-black)"
            }}
          >
            ₹{activePrice.toLocaleString("en-IN")}
          </span>

          {activeMrp && activeMrp > activePrice && (
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "var(--color-muted-brown)",
                textDecoration: "line-through"
              }}
            >
              MRP ₹{activeMrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Action Buttons: View Details & WhatsApp Order */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem", width: "100%" }}>
          <button
            onClick={() => onQuickView(product, selectedVariant)}
            aria-label={`View details for ${product.name}`}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-near-black)",
              paddingBottom: "2px",
              borderBottom: "1.5px solid var(--color-near-black)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-brass)";
              e.currentTarget.style.borderBottomColor = "var(--color-brass)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-near-black)";
              e.currentTarget.style.borderBottomColor = "var(--color-near-black)";
            }}
          >
            VIEW DETAILS
          </button>

          <button
            onClick={handleOrderWhatsApp}
            aria-label={`Order ${product.name} via WhatsApp`}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-muted-brown)",
              cursor: "pointer",
              transition: "color 0.2s ease",
              background: "none",
              border: "none",
              padding: "0"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#25D366";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-muted-brown)";
            }}
          >
            ORDER VIA WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
