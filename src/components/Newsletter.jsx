import React, { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { siteAssets } from "../data/assets";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="newsletter-section"
      style={{
        backgroundColor: "var(--color-cream)",
        paddingTop: "4.5rem",
        paddingBottom: "4.5rem",
        borderBottom: "1px solid var(--color-border)"
      }}
    >
      <div className="container">
        <div
          className="newsletter-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr 0.85fr",
            alignItems: "center",
            gap: "2.5rem"
          }}
        >
          {/* Left: Email Subscription */}
          <div className="newsletter-form-col">
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2vw, 1.85rem)",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                marginBottom: "0.8rem",
                lineHeight: 1.22
              }}
            >
              JOIN THE WORLD
              <br />
              OF VALERIOO
            </h3>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                color: "var(--color-muted-brown)",
                lineHeight: 1.6,
                marginBottom: "1.8rem",
                maxWidth: "360px"
              }}
            >
              {siteConfig.newsletter.subtitle}
            </p>

            {isSubmitted ? (
              <div
                style={{
                  padding: "0.85rem 1.2rem",
                  backgroundColor: "#E4D9CE",
                  color: "var(--color-near-black)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  borderRadius: "1px"
                }}
              >
                {siteConfig.newsletter.successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: "340px" }}>
                <div
                  className="newsletter-input-group"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid var(--color-near-black)",
                    paddingBottom: "8px"
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      letterSpacing: "0.08em",
                      color: "var(--color-near-black)"
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--color-near-black)",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      padding: "0 6px",
                      transition: "transform 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                  >
                    →
                  </button>
                </div>
                {error && (
                  <span style={{ fontSize: "0.72rem", color: "#B33A3A", marginTop: "6px", display: "block" }}>
                    {error}
                  </span>
                )}
              </form>
            )}
          </div>

          {/* Center: Packaging Box Showcase */}
          <div
            className="newsletter-product-col"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "320px",
                overflow: "hidden",
                borderRadius: "1px"
              }}
            >
              <img
                src={siteAssets.newsletter.packagingBox}
                alt="Valerioo Luxury Bespoke Packaging Box and Flacon"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  transition: "transform 0.6s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          </div>

          {/* Right: Follow Us & Social Icons — hidden (no social accounts) */}
          <div
            className="newsletter-social-col"
            style={{
              display: "none",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: "1.5rem"
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.74rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                marginBottom: "1.2rem"
              }}
            >
              FOLLOW US
            </h4>

            <div
              className="social-icons-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.3rem"
              }}
            >
              {/* Instagram */}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "var(--color-near-black)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "var(--color-near-black)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ color: "var(--color-near-black)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href={siteConfig.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                style={{ color: "var(--color-near-black)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 20l4-9"></path>
                  <path d="M10.5 14c1.5 0 3.5-1 3.5-3.5 0-2-1.5-3-3.5-3-3 0-4.5 2-4.5 4.5 0 1 .5 2 1.5 2.5"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
