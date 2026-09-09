import React, { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { siteAssets } from "../data/assets";

export const StoryPage = ({ activeTab = "about", onBackToHome, onSelectFragrance }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  useEffect(() => {
    setCurrentTab(activeTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const switchTab = (tabKey) => {
    setCurrentTab(tabKey);
    window.location.hash = `#/${tabKey}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = [
    { key: "about", label: "01. THE JOURNEY" },
    { key: "the-art", label: "02. THE VALERIOO SIGNATURE" },
    { key: "philosophy", label: "03. OUR PHILOSOPHY" },
    { key: "art-of-perfumery", label: "04. THE ART OF PERFUMERY" },
    { key: "campaign", label: "05. NEW CAMPAIGN" }
  ];

  return (
    <div
      className="story-dedicated-page"
      style={{
        backgroundColor: "var(--color-cream)",
        color: "var(--color-near-black)",
        minHeight: "100vh",
        paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
        paddingBottom: "6rem"
      }}
    >
      <div className="container" style={{ maxWidth: "1080px" }}>
        
        {/* Top Control Bar: Return to House & Registered Office */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--color-border)",
            flexWrap: "nowrap",
            gap: "0.5rem"
          }}
        >
          <button
            onClick={onBackToHome}
            aria-label="Return to House of Valerioo"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.68rem, 2vw, 0.75rem)",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-near-black)",
              padding: "4px 0",
              whiteSpace: "nowrap",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-near-black)")}
          >
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>←</span>
            <span>Return to House</span>
          </button>

          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(0.72rem, 2vw, 0.85rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-muted-brown)",
              whiteSpace: "nowrap"
            }}
          >
            Guwahati • Assam
          </span>
        </div>

        {/* Luxury Sub-Navigation Tabs */}
        <nav
          className="story-tabs-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(0.75rem, 2vw, 2rem)",
            flexWrap: "wrap",
            padding: "0.8rem 1rem",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            backgroundColor: "rgba(228, 217, 206, 0.35)",
            borderRadius: "2px",
            border: "1px solid rgba(26, 23, 20, 0.06)"
          }}
        >
          {tabs.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: isActive ? "2px solid var(--color-brass)" : "2px solid transparent",
                  padding: "6px 8px",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.65rem, 1.4vw, 0.72rem)",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--color-near-black)" : "var(--color-muted-brown)",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* =========================================================================
            VIEW 1: ABOUT → THE JOURNEY
           ========================================================================= */}
        {currentTab === "about" && (
          <article className="story-content-view" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  display: "block",
                  marginBottom: "0.75rem"
                }}
              >
                About The House
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "0.06em",
                  color: "var(--color-near-black)",
                  marginBottom: "1rem",
                  textTransform: "uppercase"
                }}
              >
                THE JOURNEY
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "var(--color-brass)",
                  letterSpacing: "0.04em"
                }}
              >
                From a Dream in Guwahati to a Fragrance with a Vision
              </p>
            </header>

            {/* Editorial Visual */}
            <div
              style={{
                width: "100%",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
                marginBottom: "3.5rem",
                backgroundColor: "#2B211A"
              }}
            >
              <img
                src={siteAssets.editorial.campaign}
                alt="Valerioo The Journey - From Guwahati to Gujarat"
                style={{
                  width: "100%",
                  height: "clamp(240px, 38vw, 460px)",
                  objectFit: "cover",
                  objectPosition: "center 25%",
                  display: "block"
                }}
              />
            </div>

            {/* Body Copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.6rem",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.94rem, 1.2vw, 1.05rem)",
                lineHeight: 1.85,
                color: "var(--color-charcoal)"
              }}
            >
              <p style={{ fontWeight: 600, color: "var(--color-near-black)", fontSize: "1.1rem" }}>
                Every remarkable journey begins with a dream.
              </p>

              <p>
                For VALERIOO, that dream began with two friends and a shared vision—to create a fragrance house where scent could connect with emotion, memory, and individuality.
              </p>

              <p>
                In November 2025, their journey took them from Guwahati, Assam, to Gujarat, where they began exploring the world behind the fragrance.
              </p>

              <p>
                They met manufacturers, studied the fragrance industry, explored emerging trends, and discovered the intricate processes behind developing, blending, and producing perfumes.
              </p>

              <p>
                Their exploration took them across Ahmedabad, Vadodara, and Surat, offering valuable insight into the craftsmanship and possibilities within the fragrance world.
              </p>

              <p>
                With every conversation and every discovery, the vision became clearer.
              </p>

              {/* Purpose Highlight Stanza */}
              <div
                style={{
                  backgroundColor: "#EAE3D7",
                  padding: "clamp(2rem, 3.5vw, 2.8rem)",
                  borderRadius: "2px",
                  borderLeft: "3px solid var(--color-brass)",
                  margin: "1rem 0"
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)",
                    color: "var(--color-near-black)",
                    fontStyle: "italic",
                    marginBottom: "1.2rem"
                  }}
                >
                  What began as an idea slowly became a purpose:
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.05rem, 1.5vw, 1.22rem)",
                    color: "var(--color-near-black)"
                  }}
                >
                  <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "var(--color-brass)" }}>✦</span>
                    <span>To create fragrances that are not merely worn, but felt.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "var(--color-brass)" }}>✦</span>
                    <span>Fragrances that become memories.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "var(--color-brass)" }}>✦</span>
                    <span>Fragrances that become part of one’s identity.</span>
                  </li>
                </ul>
              </div>

              <p>
                After months of exploration, learning, planning, and preparation, the dream began taking shape.
              </p>

              {/* Milestone Box */}
              <div
                style={{
                  padding: "2rem 0",
                  marginTop: "1.5rem",
                  borderTop: "1px dashed rgba(26, 23, 20, 0.2)",
                  borderBottom: "1px dashed rgba(26, 23, 20, 0.2)"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--color-brass)",
                    display: "block",
                    marginBottom: "0.8rem"
                  }}
                >
                  September 2026 — A New Beginning
                </span>

                <p style={{ marginBottom: "1.2rem" }}>
                  In September 2026, VALERIOO begins its journey from its registered office in Guwahati, Assam.
                </p>

                <p style={{ marginBottom: "1.2rem" }}>
                  Born from a journey of curiosity and discovery, VALERIOO carries forward the experience gathered along the way while looking towards a new generation of fragrance lovers.
                </p>

                <p style={{ marginBottom: "1.5rem" }}>
                  From the first conversation between two friends to the creation of a fragrance brand with a vision, VALERIOO represents courage, friendship, curiosity, and the belief that an ordinary idea can become something extraordinary.
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    fontStyle: "italic",
                    color: "var(--color-near-black)",
                    fontWeight: 500,
                    margin: 0
                  }}
                >
                  This is only the beginning.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* =========================================================================
            VIEW 2: THE ART → THE VALERIOO SIGNATURE
           ========================================================================= */}
        {currentTab === "the-art" && (
          <article className="story-content-view" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  display: "block",
                  marginBottom: "0.75rem"
                }}
              >
                Artistic Identity
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "0.06em",
                  color: "var(--color-near-black)",
                  marginBottom: "1rem",
                  textTransform: "uppercase"
                }}
              >
                THE VALERIOO SIGNATURE
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "var(--color-brass)",
                  letterSpacing: "0.04em"
                }}
              >
                Contemporary in spirit. Timeless in character.
              </p>
            </header>

            {/* Editorial Visual */}
            <div
              style={{
                width: "100%",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
                marginBottom: "3.5rem",
                backgroundColor: "#2B211A"
              }}
            >
              <img
                src={siteAssets.editorial.philosophy}
                alt="The Valerioo Signature - Contemporary in Spirit. Timeless in Character."
                style={{
                  width: "100%",
                  height: "clamp(240px, 38vw, 460px)",
                  objectFit: "cover",
                  objectPosition: "center 25%",
                  display: "block"
                }}
              />
            </div>

            {/* Body Copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.96rem, 1.25vw, 1.08rem)",
                lineHeight: 1.85,
                color: "var(--color-charcoal)",
                textAlign: "center"
              }}
            >
              <p style={{ maxWidth: "780px", margin: "0 auto" }}>
                VALERIOO brings together modern aesthetics and the enduring art of perfumery to create fragrances for individuals who embrace their personality and choose to define their own signature.
              </p>

              <div
                style={{
                  padding: "2.5rem 1.5rem",
                  backgroundColor: "#FAF7F2",
                  borderRadius: "2px",
                  border: "1px solid var(--color-border-subtle)",
                  margin: "1rem auto",
                  maxWidth: "760px",
                  width: "100%"
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                    fontStyle: "italic",
                    color: "var(--color-near-black)",
                    marginBottom: "1.5rem",
                    lineHeight: 1.6
                  }}
                >
                  “We do not believe there is one fragrance for everyone. <br />
                  There is only the fragrance that feels like you.”
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "clamp(1rem, 2.5vw, 2.2rem)",
                    margin: "1.5rem 0"
                  }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)" }}>
                    YOUR MOOD
                  </span>
                  <span style={{ color: "var(--color-border)" }}>•</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)" }}>
                    YOUR CHARACTER
                  </span>
                  <span style={{ color: "var(--color-border)" }}>•</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)" }}>
                    YOUR MEMORIES
                  </span>
                  <span style={{ color: "var(--color-border)" }}>•</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)" }}>
                    YOUR STORY
                  </span>
                </div>
              </div>

              <p style={{ maxWidth: "680px", margin: "0 auto", fontSize: "1.1rem" }}>
                Because your scent should not simply accompany you. <br />
                <strong style={{ color: "var(--color-near-black)", fontWeight: 700 }}>
                  It should become part of you.
                </strong>
              </p>

              {/* Creed Block */}
              <div
                style={{
                  backgroundColor: "#2B211A",
                  color: "#FAF8F5",
                  padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)",
                  borderRadius: "2px",
                  boxShadow: "var(--shadow-elevated)",
                  marginTop: "2rem"
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    color: "#FFFFFF",
                    marginBottom: "1.2rem",
                    textTransform: "uppercase"
                  }}
                >
                  VALERIOO
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                    fontStyle: "italic",
                    color: "#E4D9CE",
                    marginBottom: "2rem"
                  }}
                >
                  <span>Born from a Dream.</span>
                  <span>Crafted with a Vision.</span>
                  <span>Connected to Emotions.</span>
                </div>

                <div
                  style={{
                    width: "48px",
                    height: "1px",
                    backgroundColor: "var(--color-brass)",
                    margin: "0 auto 2rem"
                  }}
                />

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "var(--color-brass)",
                    marginBottom: "1.2rem"
                  }}
                >
                  A SCENT. A MEMORY. AN IDENTITY.
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                    lineHeight: 1.7,
                    color: "#FAF8F5",
                    maxWidth: "600px",
                    margin: "0 auto",
                    fontStyle: "italic"
                  }}
                >
                  Discover a fragrance that doesn’t simply accompany you— <br />
                  <strong style={{ color: "#FFFFFF", fontStyle: "normal" }}>
                    it becomes part of your story.
                  </strong>
                </p>
              </div>
            </div>
          </article>
        )}

        {/* =========================================================================
            VIEW 3: OUR PHILOSOPHY → WHERE FRAGRANCE BECOMES EMOTION
           ========================================================================= */}
        {currentTab === "philosophy" && (
          <article className="story-content-view" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  display: "block",
                  marginBottom: "0.75rem"
                }}
              >
                Core Belief
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "0.06em",
                  color: "var(--color-near-black)",
                  marginBottom: "1rem",
                  textTransform: "uppercase"
                }}
              >
                OUR PHILOSOPHY
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "var(--color-brass)",
                  letterSpacing: "0.04em"
                }}
              >
                Where Fragrance Becomes Emotion
              </p>
            </header>

            {/* Editorial Visual */}
            <div
              style={{
                width: "100%",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
                marginBottom: "3.5rem",
                backgroundColor: "#2B211A"
              }}
            >
              <img
                src={siteAssets.editorial.philosophy}
                alt="Our Philosophy - Where Fragrance Becomes Emotion"
                style={{
                  width: "100%",
                  height: "clamp(240px, 38vw, 460px)",
                  objectFit: "cover",
                  objectPosition: "center 25%",
                  display: "block"
                }}
              />
            </div>

            {/* Body Copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.6rem",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.96rem, 1.25vw, 1.08rem)",
                lineHeight: 1.85,
                color: "var(--color-charcoal)"
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  fontStyle: "italic",
                  color: "var(--color-near-black)",
                  textAlign: "center",
                  maxWidth: "760px",
                  margin: "0 auto 1.5rem",
                  lineHeight: 1.6
                }}
              >
                “At VALERIOO, we believe fragrance is emotion captured in a bottle.”
              </p>

              <p>
                A scent can take you back to a cherished moment, remind you of someone special, awaken confidence, or become inseparably connected to a memory.
              </p>

              <p>
                That invisible connection between fragrance and feeling lies at the heart of VALERIOO.
              </p>

              <p>
                Every fragrance is created to evoke a mood and tell a story.
              </p>

              <p>
                It may be the excitement of a first encounter, the confidence of an important moment, the quiet elegance of an ordinary day, or the warmth of an unforgettable celebration.
              </p>

              <p style={{ fontWeight: 700, color: "var(--color-near-black)" }}>
                Because fragrance is personal.
              </p>

              <p>
                It becomes part of the moments we live, the people we meet, and the memories we carry.
              </p>

              {/* Poetic Stanza Callout */}
              <div
                style={{
                  backgroundColor: "#2B211A",
                  color: "#FAF8F5",
                  padding: "clamp(2.5rem, 5vw, 3.8rem)",
                  borderRadius: "2px",
                  textAlign: "center",
                  margin: "2rem 0",
                  boxShadow: "var(--shadow-medium)"
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.3rem, 2.5vw, 1.85rem)",
                    letterSpacing: "0.08em",
                    color: "#E4D9CE",
                    marginBottom: "1.5rem"
                  }}
                >
                  Memories fade. Scents remain.
                </p>

                <div
                  style={{
                    width: "36px",
                    height: "1px",
                    backgroundColor: "var(--color-brass)",
                    margin: "0 auto 1.5rem"
                  }}
                />

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "var(--color-brass)",
                    marginBottom: "1rem"
                  }}
                >
                  VALERIOO IS NOT SIMPLY WORN.
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                    fontStyle: "italic",
                    lineHeight: 1.8,
                    margin: 0
                  }}
                >
                  It is experienced. <br />
                  It is remembered. <br />
                  It is felt.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* =========================================================================
            VIEW 4: THE ART OF PERFUMERY → CRAFT & NOTE ARCHITECTURE
           ========================================================================= */}
        {currentTab === "art-of-perfumery" && (
          <article className="story-content-view" style={{ maxWidth: "980px", margin: "0 auto" }}>
            <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  display: "block",
                  marginBottom: "0.75rem"
                }}
              >
                Sensory Architecture
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "0.06em",
                  color: "var(--color-near-black)",
                  marginBottom: "1.2rem",
                  textTransform: "uppercase"
                }}
              >
                THE ART OF PERFUMERY
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.96rem, 1.25vw, 1.08rem)",
                  lineHeight: 1.8,
                  color: "var(--color-charcoal)",
                  maxWidth: "760px",
                  margin: "0 auto 1.5rem"
                }}
              >
                A fragrance is an expression of character. It makes an entrance, reveals its personality, evolves over time, and finally leaves behind a signature.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
                  lineHeight: 1.6,
                  color: "var(--color-near-black)",
                  maxWidth: "740px",
                  margin: "0 auto"
                }}
              >
                “At VALERIOO, perfumery is an art of balance—where aromatic materials, craftsmanship, imagination, and emotion come together to create something deeply personal. Every fragrance is carefully composed to unfold like a story.”
              </p>
            </header>

            {/* 3 Notes Triad */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.8rem",
                marginBottom: "3rem"
              }}
            >
              {/* Top Notes */}
              <div
                style={{
                  backgroundColor: "#FAF7F2",
                  padding: "2.5rem 2rem",
                  borderRadius: "2px",
                  borderTop: "3px solid var(--color-brass)",
                  boxShadow: "var(--shadow-subtle)"
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)", display: "block", marginBottom: "0.5rem" }}>
                  TOP NOTES
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--color-near-black)", marginBottom: "1rem" }}>
                  The First Impression
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-charcoal)", margin: 0 }}>
                  Fresh, vibrant, and captivating, the top notes create the first encounter with a fragrance—the moment that catches attention and invites you closer.
                </p>
              </div>

              {/* Heart Notes */}
              <div
                style={{
                  backgroundColor: "#FAF7F2",
                  padding: "2.5rem 2rem",
                  borderRadius: "2px",
                  borderTop: "3px solid var(--color-brass)",
                  boxShadow: "var(--shadow-subtle)"
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)", display: "block", marginBottom: "0.5rem" }}>
                  HEART NOTES
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--color-near-black)", marginBottom: "1rem" }}>
                  The Soul
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-charcoal)", margin: 0 }}>
                  As the fragrance develops, the heart begins to emerge. Floral, fruity, spicy, aromatic, or expressive, these notes reveal the personality and character of the composition.
                </p>
              </div>

              {/* Base Notes */}
              <div
                style={{
                  backgroundColor: "#FAF7F2",
                  padding: "2.5rem 2rem",
                  borderRadius: "2px",
                  borderTop: "3px solid var(--color-brass)",
                  boxShadow: "var(--shadow-subtle)"
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-brass)", display: "block", marginBottom: "0.5rem" }}>
                  BASE NOTES
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--color-near-black)", marginBottom: "1rem" }}>
                  The Signature
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-charcoal)", margin: 0 }}>
                  Deep woods, warm amber, musk, vanilla, and precious accords form the lasting foundation. These are the notes that remain closest to the skin and create the fragrance’s enduring signature.
                </p>
              </div>
            </div>

            {/* Triad Stanza */}
            <div
              style={{
                textAlign: "center",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                lineHeight: 1.8,
                color: "var(--color-near-black)",
                maxWidth: "600px",
                margin: "0 auto 4.5rem",
                padding: "2rem 0",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)"
              }}
            >
              The first impression may captivate. <br />
              The heart may intrigue. <br />
              <strong style={{ color: "var(--color-brass)", fontStyle: "normal" }}>
                But the signature is what is remembered.
              </strong>
            </div>

            {/* Section: The Craft Behind the Scent */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  display: "block",
                  marginBottom: "0.75rem"
                }}
              >
                Master Blending & Creation
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: "var(--color-near-black)",
                  textTransform: "uppercase"
                }}
              >
                THE CRAFT BEHIND THE SCENT
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem"
              }}
            >
              {/* Ingredients */}
              <div style={{ backgroundColor: "#EAE3D7", padding: "2.2rem 1.8rem", borderRadius: "2px" }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-near-black)", marginBottom: "1rem" }}>
                  INGREDIENTS
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-charcoal)", margin: 0 }}>
                  Every fragrance begins with the selection of aromatic materials. Each ingredient possesses its own personality, intensity, texture, and character.
                </p>
              </div>

              {/* Composition */}
              <div style={{ backgroundColor: "#EAE3D7", padding: "2.2rem 1.8rem", borderRadius: "2px" }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-near-black)", marginBottom: "1rem" }}>
                  COMPOSITION
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-charcoal)", margin: 0 }}>
                  Like music, perfumery is built through harmony and contrast. Individual notes are carefully brought together to create balance, depth, and expression.
                </p>
              </div>

              {/* Evolution */}
              <div style={{ backgroundColor: "#EAE3D7", padding: "2.2rem 1.8rem", borderRadius: "2px" }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-near-black)", marginBottom: "1rem" }}>
                  EVOLUTION
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-charcoal)", margin: 0 }}>
                  A great fragrance is never static. It changes with time, skin, temperature, and environment—revealing new layers as its journey unfolds.
                </p>
              </div>

              {/* Memory */}
              <div style={{ backgroundColor: "#EAE3D7", padding: "2.2rem 1.8rem", borderRadius: "2px" }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-near-black)", marginBottom: "1rem" }}>
                  MEMORY
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-charcoal)", marginBottom: "0.8rem" }}>
                  The most powerful fragrance is the one that becomes connected to a moment.
                </p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.96rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--color-near-black)", margin: 0 }}>
                  A person. A place. A celebration. A feeling.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.86rem", fontWeight: 600, color: "var(--color-brass)", marginTop: "0.8rem", margin: "0.8rem 0 0" }}>
                  That is when a fragrance becomes more than a fragrance. It becomes a memory.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* =========================================================================
            VIEW 5: NEW CAMPAIGN → A SCENT. A MEMORY. AN IDENTITY.
           ========================================================================= */}
        {currentTab === "campaign" && (
          <article className="story-content-view" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  display: "block",
                  marginBottom: "0.75rem"
                }}
              >
                New Campaign
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "0.06em",
                  color: "var(--color-near-black)",
                  marginBottom: "1rem",
                  textTransform: "uppercase"
                }}
              >
                TIMELESS. YOURS.
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "var(--color-brass)",
                  letterSpacing: "0.04em"
                }}
              >
                A Scent. A Memory. An Identity.
              </p>
            </header>

            {/* Campaign Visual */}
            <div
              style={{
                width: "100%",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "var(--shadow-medium)",
                marginBottom: "3.5rem",
                backgroundColor: "#2B211A"
              }}
            >
              <img
                src={siteAssets.editorial.campaign}
                alt="Valerioo New Campaign - Timeless. Yours."
                style={{
                  width: "100%",
                  height: "clamp(240px, 38vw, 460px)",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block"
                }}
              />
            </div>

            {/* Campaign Copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.96rem, 1.25vw, 1.08rem)",
                lineHeight: 1.85,
                color: "var(--color-charcoal)",
                textAlign: "center"
              }}
            >
              <p style={{ fontWeight: 600, color: "var(--color-near-black)", fontSize: "1.15rem", maxWidth: "760px", margin: "0 auto" }}>
                VALERIOO is a celebration of fragrance, individuality, and timeless elegance.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--color-near-black)",
                  maxWidth: "760px",
                  margin: "0 auto"
                }}
              >
                “We believe a perfume is more than a beautiful scent. It is an invisible expression of who you are—a feeling captured in a bottle, a memory waiting to be awakened, and a signature that remains long after you have left.”
              </p>

              {/* Poetic Stanza */}
              <div
                style={{
                  backgroundColor: "#FAF7F2",
                  padding: "2.5rem 1.5rem",
                  borderRadius: "2px",
                  border: "1px solid var(--color-border-subtle)",
                  maxWidth: "600px",
                  margin: "1rem auto",
                  width: "100%"
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
                    color: "var(--color-near-black)"
                  }}
                >
                  <li>More than a fragrance.</li>
                  <li>An expression of who you are.</li>
                  <li>A feeling captured in a bottle.</li>
                  <li>A memory waiting to be awakened.</li>
                  <li>A signature that remains.</li>
                </ul>
                <div style={{ marginTop: "1.5rem", paddingTop: "1.2rem", borderTop: "1px solid var(--color-border-subtle)" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-brass)" }}>
                    DISCOVER YOUR SIGNATURE
                  </span>
                </div>
              </div>

              <p style={{ maxWidth: "740px", margin: "0 auto" }}>
                From refined everyday moments to unforgettable evenings, VALERIOO fragrances are created for those who believe their scent should say something about them.
              </p>
            </div>
          </article>
        )}

        {/* =========================================================================
            BOTTOM ACTIONS (WHATSAPP ORDER & EXPLORE COLLECTION)
           ========================================================================= */}
        <section
          style={{
            marginTop: "clamp(3.5rem, 6vw, 5rem)",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--color-border)",
            textAlign: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              justifyContent: "center",
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
                gap: "10px",
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                padding: "15px 32px",
                borderRadius: "2px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(37, 211, 102, 0.25)",
                transition: "all 0.3s ease"
              }}
            >
              <span>Order via WhatsApp</span>
              <span>→</span>
            </a>

            <button
              onClick={() => {
                if (onSelectFragrance) {
                  onSelectFragrance();
                } else if (onBackToHome) {
                  onBackToHome();
                }
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--color-near-black)",
                color: "#FAF8F5",
                padding: "15px 32px",
                borderRadius: "2px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              <span>Explore The Fragrances</span>
              <span>→</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default StoryPage;
