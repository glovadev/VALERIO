import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { Header } from "./components/Header";
import { MobileMenu } from "./components/MobileMenu";
import { Hero } from "./components/Hero";
import { Collections } from "./components/Collections";
import { PhilosophyBanner } from "./components/PhilosophyBanner";
import { Bestsellers } from "./components/Bestsellers";
import { CampaignBanner } from "./components/CampaignBanner";
import { FeatureBar } from "./components/FeatureBar";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { SearchOverlay } from "./components/SearchOverlay";
import { ProductModal } from "./components/ProductModal";
import { EditorialModal } from "./components/EditorialModal";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { StoryPage } from "./components/StoryPage";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/responsive.css";

const getStoryStateFromHash = (hash) => {
  const cleanHash = (hash || "").toLowerCase();
  if (cleanHash === "#/about" || cleanHash === "#/the-journey" || cleanHash === "#/journey") {
    return { isStory: true, tab: "about" };
  }
  if (cleanHash === "#/the-art" || cleanHash === "#/signature" || cleanHash === "#/art") {
    return { isStory: true, tab: "the-art" };
  }
  if (cleanHash === "#/philosophy" || cleanHash === "#/our-philosophy") {
    return { isStory: true, tab: "philosophy" };
  }
  if (cleanHash === "#/art-of-perfumery" || cleanHash === "#/craft") {
    return { isStory: true, tab: "art-of-perfumery" };
  }
  if (cleanHash === "#/campaign") {
    return { isStory: true, tab: "campaign" };
  }
  return { isStory: false, tab: "about" };
};

const MainContent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState({ product: null, variant: null });
  const [activeCategory, setActiveCategory] = useState(null);
  const [editorialModal, setEditorialModal] = useState({ isOpen: false, type: "campaign" });

  const [storyState, setStoryState] = useState(() => getStoryStateFromHash(window.location.hash));

  const scrollToSection = (targetId) => {
    if (!targetId || targetId === "top" || targetId === "#") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const performScroll = (retries = 0) => {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = window.innerWidth <= 768 ? 70 : 80;
        const elPosition = el.getBoundingClientRect().top;
        const offsetPosition = elPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "instant"
        });
      } else if (retries < 15) {
        setTimeout(() => performScroll(retries + 1), 40);
      }
    };

    performScroll();
  };

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash || "";
      const story = getStoryStateFromHash(rawHash);
      
      setStoryState(story);

      if (story.isStory) {
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        const cleanTarget = rawHash.replace(/^#\/?/, "").toLowerCase();
        if (cleanTarget && cleanTarget !== "top" && cleanTarget !== "") {
          const [sectionId, query] = cleanTarget.split("?");
          if (query && query.includes("category=")) {
            const cat = query.split("category=")[1].toUpperCase();
            setActiveCategory(cat);
          }
          scrollToSection(sectionId);
        }
      }
    };

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      
      const href = anchor.getAttribute("href") || "";
      // If it's a section anchor on the landing page (#bestsellers, #collections, #contact, etc.)
      if (href.startsWith("#") && !href.startsWith("#/")) {
        const cleanTarget = href.replace(/^#/, "").toLowerCase();
        if (!cleanTarget || cleanTarget === "" || cleanTarget === "top") {
          e.preventDefault();
          if (storyState.isStory) {
            setStoryState({ isStory: false, tab: "about" });
            window.location.hash = "";
          }
          window.scrollTo({ top: 0, behavior: "instant" });
        } else {
          e.preventDefault();
          const [sectionId, query] = cleanTarget.split("?");
          if (query && query.includes("category=")) {
            const cat = query.split("category=")[1].toUpperCase();
            setActiveCategory(cat);
          }
          
          if (storyState.isStory) {
            setStoryState({ isStory: false, tab: "about" });
            window.location.hash = href;
          } else {
            history.pushState(null, "", href);
          }
          scrollToSection(sectionId);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleAnchorClick);

    // Initial load check
    if (window.location.hash) {
      handleHashChange();
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [storyState.isStory]);

  const { notification } = useCart();

  const handleOpenPhilosophy = () => {
    window.location.hash = "#/philosophy";
    setStoryState({ isStory: true, tab: "philosophy" });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleOpenCampaign = () => {
    window.location.hash = "#/campaign";
    setStoryState({ isStory: true, tab: "campaign" });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBackToHome = () => {
    window.location.hash = "";
    setStoryState({ isStory: false, tab: "about" });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleOpenStory = () => {
    setEditorialModal({ isOpen: true, type: "campaign" });
  };

  const handleCloseEditorial = () => {
    setEditorialModal({ isOpen: false, type: "campaign" });
  };

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="app-layout" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Toast Notification for Cart Actions */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "96px",
            right: "24px",
            zIndex: 180,
            backgroundColor: "#181614",
            color: "#FAF8F5",
            padding: "12px 22px",
            borderRadius: "2px",
            fontSize: "0.78rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            boxShadow: "var(--shadow-medium)",
            borderLeft: "3px solid var(--color-brass)",
            animation: "fadeIn 0.3s ease"
          }}
        >
          {notification}
        </div>
      )}

      {/* 1. Header Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onBestsellerNav={() => {
          handleSelectCategory(null);
          if (storyState.isStory) {
            setStoryState({ isStory: false, tab: "about" });
            window.location.hash = "#bestsellers";
          }
          scrollToSection("bestsellers");
        }}
        onCollectionsNav={() => {
          if (storyState.isStory) {
            setStoryState({ isStory: false, tab: "about" });
            window.location.hash = "#collections";
          }
          scrollToSection("collections");
        }}
      />

      {storyState.isStory ? (
        /* Dedicated Story View (About / The Art / Philosophy / Perfumery / Campaign) */
        <StoryPage
          activeTab={storyState.tab}
          onBackToHome={handleBackToHome}
          onSelectFragrance={() => {
            setStoryState({ isStory: false, tab: "about" });
            window.location.hash = "#bestsellers";
            scrollToSection("bestsellers");
          }}
        />
      ) : (
        /* Main Home Landing Page */
        <>
          {/* 2. Hero Section (Mobile-Optimized & Panoramic) */}
          <Hero />

          {/* 3. Our Collections (2x2 Luxury Mobile Grid) */}
          <Collections onSelectCategory={handleSelectCategory} />

          {/* 4. The Art of Perfumery Banner */}
          <PhilosophyBanner onOpenPhilosophyModal={handleOpenPhilosophy} />

          {/* 5. Bestsellers Products (Direct WhatsApp Orders) */}
          <Bestsellers
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            onQuickView={(prod, variant) => setSelectedProductData({ product: prod, variant })}
          />

          {/* 6. Timeless Yours Campaign Banner */}
          <CampaignBanner onOpenStoryModal={handleOpenCampaign} />

          {/* 7. Features & Trust Bar */}
          <FeatureBar />

          {/* 8. Newsletter & Centerpiece */}
          <Newsletter />
        </>
      )}

      {/* 9. Refined Footer */}
      <Footer />

      {/* Cart Slide-in Drawer */}
      <CartDrawer />

      {/* Instant Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProductData({ product: prod, variant: null })}
      />

      {/* Mobile Slide-out Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductModal
        product={selectedProductData.product}
        initialVariant={selectedProductData.variant}
        onClose={() => setSelectedProductData({ product: null, variant: null })}
      />

      {/* Editorial Modal (Campaign Story) */}
      <EditorialModal
        isOpen={editorialModal.isOpen}
        onClose={handleCloseEditorial}
        type={editorialModal.type}
      />

      {/* Floating Concierge WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
