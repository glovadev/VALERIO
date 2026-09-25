import React from "react";
import { siteConfig } from "../data/siteConfig";
import { footerLinks } from "../data/navigation";

export const Footer = ({ onOpenAdmin }) => {
  return (
    <footer
      id="contact"
      className="site-footer"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "5rem",
        paddingBottom: "2.5rem"
      }}
    >
      <div className="container">
        {/* Main Columns Grid */}
        <div
          className="footer-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1.3fr",
            gap: "2.5rem",
            paddingBottom: "4.5rem",
            borderBottom: "1px solid var(--color-border)"
          }}
        >
          {/* Brand Col */}
          <div className="footer-brand-col">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.45rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                fontWeight: 500,
                display: "block",
                marginBottom: "4px"
              }}
            >
              {siteConfig.brandName}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.62rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--color-muted-brown)",
                display: "block",
                marginBottom: "1.6rem"
              }}
            >
              {siteConfig.tagline}
            </span>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--color-muted-brown)",
                lineHeight: 1.65,
                maxWidth: "240px"
              }}
            >
              Artisanal fragrances crafted with rare botanicals and time-honored distillation traditions.
            </p>
          </div>

          {/* Shop Col */}
          <div className="footer-col">
            <h5
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                marginBottom: "1.4rem"
              }}
            >
              SHOP
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-muted-brown)",
                      transition: "color 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-brown)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Col */}
          <div className="footer-col">
            <h5
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                marginBottom: "1.4rem"
              }}
            >
              ABOUT US
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-muted-brown)",
                      transition: "color 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-brown)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Col */}
          <div className="footer-col">
            <h5
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                marginBottom: "1.4rem"
              }}
            >
              CUSTOMER
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.customer.map((link) => (
                <li key={link.label}>
                  {link.href === "/admin" ? (
                    <a
                      href="/admin"
                      id="footer-nav-admin-link"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenAdmin();
                      }}
                      title="Open Dedicated Admin Panel"
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--color-brass)",
                        transition: "color 0.2s ease",
                        cursor: "pointer",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--color-muted-brown)",
                        transition: "color 0.2s ease"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-brown)")}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer-col footer-contact-col">
            <h5
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                marginBottom: "1.4rem"
              }}
            >
              CONTACT
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.78rem", color: "var(--color-muted-brown)" }}>
              <div>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  style={{ color: "var(--color-near-black)", display: "block", fontWeight: 500, marginBottom: "4px" }}
                >
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  style={{ color: "var(--color-muted-brown)", display: "block" }}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingTop: "2rem",
            fontSize: "0.72rem",
            color: "var(--color-muted-brown)"
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.tagline}. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.6rem", flexWrap: "wrap" }}>
            <a
              href="#privacy"
              onClick={(e) => { e.preventDefault(); alert("Valerioo Privacy Policy: Client confidentiality and security is our foremost priority."); }}
              style={{ color: "var(--color-muted-brown)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-brown)")}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => { e.preventDefault(); alert("Valerioo Terms: Orders placed via WhatsApp are confirmed directly by client concierges."); }}
              style={{ color: "var(--color-muted-brown)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-brown)")}
            >
              Terms &amp; Conditions
            </a>
            <a
              href="/admin"
              id="footer-admin-panel-link"
              onClick={(e) => {
                e.preventDefault();
                onOpenAdmin();
              }}
              title="Redirect to dedicated Admin Panel"
              aria-label="Redirect to dedicated Admin Panel"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--color-brass, #C5A059)",
                textDecoration: "none",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
                padding: "5px 12px",
                borderRadius: "3px",
                border: "1px solid rgba(197, 160, 89, 0.4)",
                backgroundColor: "rgba(197, 160, 89, 0.08)",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-brass, #C5A059)";
                e.currentTarget.style.backgroundColor = "rgba(197, 160, 89, 0.18)";
                e.currentTarget.style.color = "var(--color-near-black, #181614)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.4)";
                e.currentTarget.style.backgroundColor = "rgba(197, 160, 89, 0.08)";
                e.currentTarget.style.color = "var(--color-brass, #C5A059)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Admin Panel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
