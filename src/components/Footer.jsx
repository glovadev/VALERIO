import React from "react";
import { siteConfig } from "../data/siteConfig";
import { footerLinks } from "../data/navigation";

export const Footer = () => {
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
          </div>
        </div>
      </div>
    </footer>
  );
};
