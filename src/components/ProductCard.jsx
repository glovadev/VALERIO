import React from "react";
import { sendProductInquiry } from "../utils/whatsapp";

export const ProductCard = ({ product, onQuickView }) => {
  const handleOrderWhatsApp = (e) => {
    e.stopPropagation();
    sendProductInquiry(product, 1);
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
      {/* Product Image Box - Exactly proportional to reference card box (170 / 144) */}
      <div
        className="product-image-container"
        onClick={() => onQuickView(product)}
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
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
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
          onClick={() => onQuickView(product)}
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

        <span
          className="product-price"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.92rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "var(--color-near-black)",
            marginBottom: "0.8rem"
          }}
        >
          ₹{product.price.toLocaleString("en-IN")}
        </span>

        {/* Direct WhatsApp Ordering */}
        <div>
          <button
            onClick={handleOrderWhatsApp}
            aria-label={`Order ${product.name} via WhatsApp`}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-near-black)",
              paddingBottom: "2px",
              borderBottom: "1px solid var(--color-near-black)",
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
            ORDER VIA WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
