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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [editorialModal, setEditorialModal] = useState({ isOpen: false, type: "campaign" });

  const [storyState, setStoryState] = useState(() => getStoryStateFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      const state = getStoryStateFromHash(window.location.hash);
      setStoryState(state);
      if (state.isStory) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const { notification } = useCart();

  const handleOpenPhilosophy = () => {
    window.location.hash = "#/philosophy";
    setStoryState({ isStory: true, tab: "philosophy" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    window.location.hash = "";
    setStoryState({ isStory: false, tab: "about" });
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      />

      {storyState.isStory ? (
        /* Dedicated Story View (About / The Art / Philosophy / Perfumery / Campaign) */
        <StoryPage
          activeTab={storyState.tab}
          onBackToHome={handleBackToHome}
          onSelectFragrance={() => {
            handleBackToHome();
            setTimeout(() => {
              const el = document.getElementById("bestsellers");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
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
            onQuickView={(prod) => setSelectedProduct(prod)}
          />

          {/* 6. Timeless Yours Campaign Banner */}
          <CampaignBanner onOpenStoryModal={handleOpenStory} />

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
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Mobile Slide-out Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
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
