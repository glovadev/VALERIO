import React, { useState, useEffect, useRef } from "react";
import { products } from "../data/products";

export const SearchOverlay = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className="search-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        backgroundColor: "rgba(24, 22, 20, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(2rem, 8vh, 6rem) 1.5rem"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          backgroundColor: "var(--color-cream)",
          borderRadius: "2px",
          boxShadow: "var(--shadow-elevated)",
          padding: "2.5rem",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close search"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            fontSize: "1.8rem",
            lineHeight: 1,
            color: "var(--color-near-black)"
          }}
        >
          &times;
        </button>

        <span className="eyebrow" style={{ marginBottom: "0.8rem" }}>
          SEARCH VALERIOO
        </span>

        {/* Input Field */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1.5px solid var(--color-near-black)",
            paddingBottom: "10px",
            marginBottom: "2rem"
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by fragrance name, note, or collection..."
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.1rem, 2.4vw, 1.4rem)",
              color: "var(--color-near-black)",
              letterSpacing: "0.04em"
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ fontSize: "0.75rem", color: "var(--color-muted-brown)", textTransform: "uppercase" }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Suggestions when empty */}
        {!query && (
          <div>
            <span style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-muted-brown)", display: "block", marginBottom: "0.8rem" }}>
              Suggested Searches
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {["EGAN", "VIAAN", "SAPPHIRE", "HELIUS", "ZINNIA", "HERR", "KING", "QUEEN", "UNISEX"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    padding: "6px 14px",
                    backgroundColor: "var(--color-beige)",
                    color: "var(--color-near-black)",
                    borderRadius: "1px",
                    textTransform: "uppercase"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div style={{ maxHeight: "380px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.length === 0 ? (
              <p style={{ textAlign: "center", padding: "2rem 0", color: "var(--color-muted-brown)" }}>
                No fragrances found matching "{query}".
              </p>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "#FAF8F5",
                    borderRadius: "1px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-beige)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FAF8F5")}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "48px", height: "48px", objectFit: "contain" }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--color-near-black)" }}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-muted-brown)" }}>
                      {item.subtitle} · {item.category}
                    </span>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--color-near-black)" }}>
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
