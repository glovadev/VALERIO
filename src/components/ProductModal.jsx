import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { sendProductInquiry } from "../utils/whatsapp";

export const ProductModal = ({ product, initialVariant, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product?.variants) {
      setSelectedVariant(initialVariant || product.variants[1] || product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setQuantity(1);
  }, [product, initialVariant]);

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const currentSize = selectedVariant ? selectedVariant.size : product.volume;
  const currentBadge = selectedVariant?.badge;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    sendProductInquiry(product, quantity, selectedVariant);
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
            padding: "1.5rem 1rem",
            position: "relative",
            minHeight: "420px"
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "480px",
              objectFit: "contain"
            }}
          />

          {currentBadge && (
            <span
              style={{
                position: "absolute",
                top: "1.2rem",
                left: "1.2rem",
                backgroundColor: "var(--color-brass)",
                color: "#FFFFFF",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: "1px"
              }}
            >
              {currentBadge}
            </span>
          )}
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
                {currentSize}
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
                marginBottom: "1rem"
              }}
            >
              {product.subtitle} · {product.concentration}
            </p>

            {/* Size Variants Category Selector */}
            {product.variants && (
              <div style={{ marginBottom: "1.2rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.66rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    display: "block",
                    color: "var(--color-muted-brown)",
                    marginBottom: "0.45rem"
                  }}
                >
                  Select Size & Category:
                </span>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.size === v.size;
                    return (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          flex: 1,
                          padding: "0.6rem 0.8rem",
                          border: isSelected
                            ? "1.5px solid var(--color-near-black)"
                            : "1px solid var(--color-border-dark)",
                          backgroundColor: isSelected ? "#FAF8F5" : "#FFFFFF",
                          borderRadius: "1px",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: isSelected ? 700 : 500, color: "var(--color-near-black)" }}>
                            {v.size}
                          </span>
                          {v.badge && (
                            <span style={{ fontSize: "0.58rem", color: "var(--color-brass)", fontWeight: 700, textTransform: "uppercase" }}>
                              {v.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-near-black)" }}>
                            ₹{v.price.toLocaleString("en-IN")}
                          </span>
                          {v.mrp && v.mrp > v.price && (
                            <span style={{ fontSize: "0.7rem", color: "var(--color-muted-brown)", textDecoration: "line-through" }}>
                              MRP ₹{v.mrp.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Row */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "1.2rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.45rem",
                  fontWeight: 600,
                  color: "var(--color-near-black)",
                  display: "block"
                }}
              >
                ₹{currentPrice.toLocaleString("en-IN")}
              </span>

              {currentMrp && currentMrp > currentPrice && (
                <>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.92rem",
                      color: "var(--color-muted-brown)",
                      textDecoration: "line-through"
                    }}
                  >
                    MRP ₹{currentMrp.toLocaleString("en-IN")}
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--color-brass)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase"
                    }}
                  >
                    (Save ₹{(currentMrp - currentPrice).toLocaleString("en-IN")})
                  </span>
                </>
              )}
            </div>

            <p
              style={{
                fontSize: "0.86rem",
                color: "var(--color-muted-brown)",
                lineHeight: 1.65,
                marginBottom: "1.4rem"
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
                  marginBottom: "1.2rem"
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
                    <strong style={{ color: "var(--color-near-black)", fontWeight: 500 }}>Top Notes: </strong>
                    <span style={{ color: "var(--color-muted-brown)" }}>{product.notes.top.join(" · ")}</span>
                  </div>
                  <div>
                    <strong style={{ color: "var(--color-near-black)", fontWeight: 500 }}>Heart Notes: </strong>
                    <span style={{ color: "var(--color-muted-brown)" }}>{product.notes.heart.join(" · ")}</span>
                  </div>
                  <div>
                    <strong style={{ color: "var(--color-near-black)", fontWeight: 500 }}>Base Notes: </strong>
                    <span style={{ color: "var(--color-muted-brown)" }}>{product.notes.base.join(" · ")}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Brand Story & Gratitude Section */}
            {product.story && (
              <div
                style={{
                  padding: "1rem 1.2rem",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(229, 214, 194, 0.6)",
                  borderRadius: "1px",
                  marginBottom: "1.6rem"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    display: "block",
                    color: "var(--color-brass)",
                    marginBottom: "0.5rem"
                  }}
                >
                  The Emotion & Gratitude
                </span>
                <p
                  style={{
                    fontSize: "0.76rem",
                    color: "var(--color-near-black)",
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                    margin: 0,
                    fontStyle: "italic"
                  }}
                >
                  {product.story}
                </p>
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
