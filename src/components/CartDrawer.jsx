import React from "react";
import { useCart } from "../context/CartContext";
import { sendCartOrder } from "../utils/whatsapp";

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    sendCartOrder(cart, totalAmount, totalItems);
  };

  return (
    <div
      className="cart-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 250,
        backgroundColor: "rgba(24, 22, 20, 0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "flex-end",
        transition: "opacity 0.3s ease"
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="cart-drawer"
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "var(--color-cream-subtle)",
          boxShadow: "var(--shadow-elevated)",
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.8rem 2rem",
            borderBottom: "1px solid var(--color-border)"
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.35rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                fontWeight: 500
              }}
            >
              YOUR SELECTION
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                color: "var(--color-muted-brown)",
                marginTop: "2px"
              }}
            >
              {totalItems} {totalItems === 1 ? "FRAGRANCE" : "FRAGRANCES"}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Shopping Cart"
            style={{
              fontSize: "1.6rem",
              color: "var(--color-near-black)",
              lineHeight: 1,
              padding: "4px 8px"
            }}
          >
            &times;
          </button>
        </div>

        {/* Drawer Body / Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.8rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.6rem"
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                gap: "1.2rem",
                color: "var(--color-muted-brown)"
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p style={{ fontSize: "0.88rem", letterSpacing: "0.08em" }}>
                Your fragrance selection is currently empty.
              </p>
              <a
                href="#bestsellers"
                onClick={() => setIsCartOpen(false)}
                className="editorial-link"
                style={{ marginTop: "0.5rem" }}
              >
                <span>EXPLORE BESTSELLERS</span>
                <span className="arrow">→</span>
              </a>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  gap: "1.2rem",
                  paddingBottom: "1.4rem",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  alignItems: "center"
                }}
              >
                {/* Product Thumb */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    backgroundColor: "#F1ECE3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "1px",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "80%", height: "80%", objectFit: "contain" }}
                  />
                </div>

                {/* Info & Quantity */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "0.95rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-near-black)",
                          marginBottom: "2px"
                        }}
                      >
                        {item.name}
                      </h4>
                      <span style={{ fontSize: "0.65rem", letterSpacing: "0.14em", color: "var(--color-muted-brown)", textTransform: "uppercase" }}>
                        {item.subtitle}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--color-muted-brown)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-brown)")}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Pricing and Quantity Control */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "0.8rem"
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid var(--color-border)",
                        borderRadius: "1px",
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                      >
                        -
                      </button>
                      <span style={{ padding: "0 8px", fontSize: "0.78rem", fontWeight: 500 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-near-black)" }}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "1.8rem 2rem",
              backgroundColor: "var(--color-cream)",
              borderTop: "1px solid var(--color-border)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-muted-brown)" }}>
                Estimated Total
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "var(--color-near-black)"
                }}
              >
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <p style={{ fontSize: "0.68rem", color: "var(--color-muted-brown)", lineHeight: 1.45, marginBottom: "1.4rem" }}>
              No online checkout required. Clicking below generates an official order request directly sent to our concierge on WhatsApp.
            </p>

            <button
              onClick={handleWhatsAppCheckout}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "#22201D",
                color: "#F1ECE3"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>ORDER ON WHATSAPP</span>
            </button>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button
                onClick={clearCart}
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-muted-brown)",
                  borderBottom: "1px dotted var(--color-border-dark)"
                }}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
