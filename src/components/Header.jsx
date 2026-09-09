import React, { useState, useEffect } from "react";
import { siteConfig } from "../data/siteConfig";

export const Header = ({ onOpenSearch, onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="container header-inner">
        {/* Mobile Left: Navigation Hamburger Toggle */}
        <div className="mobile-nav-toggle">
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "40px",
              height: "40px",
              padding: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            <span style={{ width: "22px", height: "1.5px", backgroundColor: "var(--color-near-black)", display: "block" }}></span>
            <span style={{ width: "15px", height: "1.5px", backgroundColor: "var(--color-near-black)", display: "block" }}></span>
            <span style={{ width: "22px", height: "1.5px", backgroundColor: "var(--color-near-black)", display: "block" }}></span>
          </button>
        </div>

        {/* Desktop Left Navigation (3 Items: Collections, Bestsellers, The Art) */}
        <nav className="header-nav-left" aria-label="Primary Navigation">
          <a href="#collections" className="header-nav-link">
            COLLECTIONS
          </a>
          <a href="#bestsellers" className="header-nav-link">
            BESTSELLERS
          </a>
          <a href="#/the-art" className="header-nav-link">
            THE ART
          </a>
        </nav>

        {/* Center Brand Identity (Dead-Center Mathematical Alignment) */}
        <div className="header-brand-center">
          <a href="#" className="header-brand-link">
            <span className="header-brand-name">
              {siteConfig.brandName}
            </span>
            <span className="header-brand-tagline">
              {siteConfig.tagline}
            </span>
          </a>
        </div>

        {/* Desktop Right Navigation (3 Items: About, Contact, Search) */}
        <nav className="header-nav-right" aria-label="Secondary Navigation">
          <a href="#/about" className="header-nav-link">
            ABOUT
          </a>
          <a href="#contact" className="header-nav-link">
            CONTACT
          </a>
          <button
            onClick={onOpenSearch}
            className="header-nav-link"
            aria-label="Search Fragrances"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>SEARCH</span>
          </button>
        </nav>

        {/* Mobile Right: Search Action Button */}
        <div className="mobile-action-right">
          <button
            onClick={onOpenSearch}
            aria-label="Search Fragrances"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              padding: "8px",
              color: "var(--color-near-black)",
              background: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
