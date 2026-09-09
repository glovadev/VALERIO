import React from "react";
import { siteConfig } from "../data/siteConfig";
import { navLinks } from "../data/navigation";

export const MobileMenu = ({ isOpen, onClose, onOpenSearch }) => {
  if (!isOpen) return null;

  return (
    <div
      className="mobile-menu-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "rgba(24, 22, 20, 0.6)",
        backdropFilter: "blur(6px)",
        transition: "opacity 0.3s ease"
      }}
      onClick={onClose}
    >
      <div
        className="mobile-menu-drawer"
        style={{
          width: "85%",
          maxWidth: "340px",
          height: "100%",
          backgroundColor: "var(--color-cream)",
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "var(--shadow-elevated)",
          animation: "slideInLeft 0.3s ease forwards"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" }}>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.4rem",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  display: "block"
                }}
              >
                {siteConfig.brandName}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "var(--color-muted-brown)",
                  display: "block"
                }}
              >
                {siteConfig.tagline}
              </span>
            </div>
            
            <button
              onClick={onClose}
              aria-label="Close Navigation Menu"
              style={{
                fontSize: "1.5rem",
                padding: "8px",
                color: "var(--color-near-black)",
                lineHeight: 1
              }}
            >
              &times;
            </button>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.35rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-near-black)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "0.6rem",
                  borderBottom: "1px solid var(--color-border-subtle)"
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: "0.9rem", color: "var(--color-brass)" }}>→</span>
              </a>
            ))}

            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--color-near-black)",
                marginTop: "1rem",
                textAlign: "left"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>SEARCH FRAGRANCES</span>
            </button>
          </nav>
        </div>

        {/* Bottom Contact & WhatsApp info */}
        <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Direct Inquiries
          </p>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            style={{ display: "block", fontSize: "0.85rem", color: "var(--color-near-black)", fontWeight: 500, marginBottom: "0.25rem" }}
          >
            {siteConfig.contact.phone}
          </a>
          <p style={{ fontSize: "0.75rem", color: "var(--color-muted-brown)" }}>
            {siteConfig.contact.hours}
          </p>
        </div>
      </div>
    </div>
  );
};
