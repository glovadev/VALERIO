import React from "react";

export const CollectionCard = ({ collection, onClick }) => {
  return (
    <div
      className="collection-card"
      onClick={onClick}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "1px",
        aspectRatio: "3 / 4.4",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#DFD6CA"
      }}
    >
      <div
        className="collection-card-image-wrap"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden"
        }}
      >
        <img
          src={collection.image}
          alt={`Valerioo ${collection.title} Fragrance Collection`}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(18, 16, 14, 0.5) 0%, rgba(18, 16, 14, 0.1) 25%, transparent 45%)",
            pointerEvents: "none"
          }}
        />
      </div>

      {/* Centered Collection Label at bottom */}
      <div
        className="collection-card-label"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "1.1rem 0.5rem",
          textAlign: "center"
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(0.95rem, 1.15vw, 1.15rem)",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#FAF8F5",
            margin: 0
          }}
        >
          {collection.title}
        </h3>
      </div>
    </div>
  );
};
