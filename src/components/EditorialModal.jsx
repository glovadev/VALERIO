import React from "react";
import { siteConfig } from "../data/siteConfig";

export const EditorialModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 290,
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
        style={{
          width: "100%",
          maxWidth: "760px",
          backgroundColor: "var(--color-cream)",
          padding: "clamp(2rem, 5vw, 3.5rem)",
          position: "relative",
          borderRadius: "2px",
          boxShadow: "var(--shadow-elevated)",
          maxHeight: "88vh",
          overflowY: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            fontSize: "1.8rem",
            lineHeight: 1,
            color: "var(--color-near-black)",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          &times;
        </button>

        <span
          className="eyebrow"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-brass)",
            marginBottom: "0.8rem",
            display: "block"
          }}
        >
          NEW CAMPAIGN
        </span>

        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            letterSpacing: "0.04em",
            color: "var(--color-near-black)",
            marginBottom: "0.6rem",
            lineHeight: 1.15
          }}
        >
          TIMELESS. YOURS.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
            fontStyle: "italic",
            color: "var(--color-brass)",
            letterSpacing: "0.04em",
            marginBottom: "1.8rem"
          }}
        >
          A Scent. A Memory. An Identity.
        </p>

        {/* Campaign Poetic Stanza */}
        <div
          style={{
            backgroundColor: "#FAF7F2",
            padding: "1.8rem 1.6rem",
            borderRadius: "2px",
            borderLeft: "3px solid var(--color-brass)",
            marginBottom: "1.8rem"
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              fontFamily: "var(--font-serif)",
              fontSize: "1.08rem",
              color: "var(--color-near-black)"
            }}
          >
            <li>More than a fragrance.</li>
            <li>An expression of who you are.</li>
            <li>A feeling captured in a bottle.</li>
            <li>A memory waiting to be awakened.</li>
            <li>A signature that remains.</li>
          </ul>
          <div style={{ marginTop: "1rem", paddingTop: "0.8rem", borderTop: "1px solid var(--color-border-subtle)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)" }}>
              DISCOVER YOUR SIGNATURE
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            fontSize: "0.94rem",
            color: "var(--color-charcoal)",
            lineHeight: 1.8
          }}
        >
          <p>
            <strong>VALERIOO</strong> is a celebration of fragrance, individuality, and timeless elegance. We believe a perfume is more than a beautiful scent. It is an invisible expression of who you are—a feeling captured in a bottle, a memory waiting to be awakened, and a signature that remains long after you have left.
          </p>
          <p>
            From refined everyday moments to unforgettable evenings, VALERIOO fragrances are created for those who believe their scent should say something about them.
          </p>
        </div>

        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <a
            href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello House of Valerioo, I would like to order your fragrances via WhatsApp.")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              padding: "10px 20px",
              borderRadius: "2px",
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none"
            }}
          >
            <span>Order via WhatsApp</span>
            <span>→</span>
          </a>

          <button
            onClick={onClose}
            className="editorial-link"
          >
            <span>RETURN TO COLLECTION</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorialModal;
