import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { sendProductInquiry } from "../utils/whatsapp";

export const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    sendProductInquiry(product, quantity);
  };

  return (
    <div
      className="product-modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 280,
        backgroundColor: "rgba(24, 22, 20, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}
      onClick={onClose}
    >
      <div
        className="product-modal-container"
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "var(--color-cream)",
          borderRadius: "2px",
          boxShadow: "var(--shadow-elevated)",
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          position: "relative",
          animation: "fadeIn 0.3s ease"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            fontSize: "1.8rem",
            lineHeight: 1,
            color: "var(--color-near-black)",
            zIndex: 10
          }}
        >
          &times;
        </button>

        {/* Left: Product Imagery */}
        <div
          style={{
            backgroundColor: "#F5EFE8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem 2rem",
            position: "relative"
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "85%",
              height: "auto",
              maxHeight: "360px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div
          style={{
            padding: "clamp(2rem, 4vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span className="eyebrow" style={{ margin: 0 }}>
                {product.category} COLLECTION
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--color-muted-brown)", letterSpacing: "0.1em" }}>
                {product.volume}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 2.8vw, 2.2rem)",
                fontWeight: 400,
                letterSpacing: "0.12em",
                color: "var(--color-near-black)",
                marginBottom: "0.3rem"
              }}
            >
              {product.name}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-brass)",
                fontWeight: 600,
                marginBottom: "1.2rem"
              }}
            >
              {product.subtitle} · {product.concentration}
            </p>

            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "var(--color-near-black)",
                display: "block",
                marginBottom: "1.4rem"
              }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <p
              style={{
                fontSize: "0.86rem",
                color: "var(--color-muted-brown)",
                lineHeight: 1.65,
                marginBottom: "1.6rem"
              }}
            >
              {product.description}
            </p>

            {/* Olfactive Notes Pyramid */}
            {product.notes && (
              <div
                style={{
                  padding: "1rem 1.2rem",
                  backgroundColor: "rgba(229, 214, 194, 0.4)",
                  borderRadius: "1px",
                  marginBottom: "1.8rem"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    display: "block",
                    color: "var(--color-near-black)",
                    marginBottom: "0.6rem"
                  }}
                >
                  Olfactive Pyramid
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.75rem" }}>
                  <div>
                    <strong style={{ color: "var(--color-near-black)", fontWeight: 500 }}>Top: </strong>
                    <span style={{ color: "var(--color-muted-brown)" }}>{product.notes.top.join(", ")}</span>
                  </div>
                  <div>
                    <strong style={{ color: "var(--color-near-black)", fontWeight: 500 }}>Heart: </strong>
                    <span style={{ color: "var(--color-muted-brown)" }}>{product.notes.heart.join(", ")}</span>
                  </div>
                  <div>
                    <strong style={{ color: "var(--color-near-black)", fontWeight: 500 }}>Base: </strong>
                    <span style={{ color: "var(--color-muted-brown)" }}>{product.notes.base.join(", ")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid var(--color-border-dark)",
                  backgroundColor: "#FFFFFF"
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ padding: "8px 14px", fontSize: "0.9rem" }}
                >
                  -
                </button>
                <span style={{ padding: "0 10px", fontSize: "0.85rem", fontWeight: 600 }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ padding: "8px 14px", fontSize: "0.9rem" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                ADD TO CART
              </button>
            </div>

            {/* Direct WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              style={{
                width: "100%",
                padding: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                borderRadius: "1px",
                transition: "opacity 0.2s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>ORDER VIA WHATSAPP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
