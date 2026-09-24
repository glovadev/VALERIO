import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { uploadToImgBB } from "../utils/imgbb";

export const AdminModal = ({
  isOpen,
  onClose,
  currentHeroBg,
  onUpdateHeroBg,
  customProducts = [],
  onAddProduct,
  onDeleteProduct,
}) => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("hero"); // 'hero' | 'add-product' | 'manage-products'

  // Auth States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Hero Upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Product Form states
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("KING");
  const [prodVolume, setProdVolume] = useState("20 ML");
  const [prodPrice, setProdPrice] = useState("400");
  const [prodMrp, setProdMrp] = useState("499");
  const [prodTagline, setProdTagline] = useState("");
  const [prodBadge, setProdBadge] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodTopNotes, setProdTopNotes] = useState("");
  const [prodHeartNotes, setProdHeartNotes] = useState("");
  const [prodBaseNotes, setProdBaseNotes] = useState("");
  const [prodImgFile, setProdImgFile] = useState(null);
  const [prodImgPreview, setProdImgPreview] = useState(null);

  const [prodSaving, setProdSaving] = useState(false);
  const [prodSuccess, setProdSuccess] = useState("");
  const [prodError, setProdError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthError("");
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Firebase auth error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setAuthError("Invalid email or password. If you don't have an account, click 'Register Admin Account'.");
      } else if (err.code === "auth/email-already-in-use") {
        setAuthError("An account with this email already exists. Please sign in instead.");
      } else if (err.code === "auth/weak-password") {
        setAuthError("Password should be at least 6 characters.");
      } else {
        setAuthError(err.message || "Failed to authenticate.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUploadSuccess("");
      setUploadError("");
      setSelectedFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Hero File Handler
  const handleHeroFileChange = (e) => {
    const file = e.target.files[0];
    setUploadError("");
    setUploadSuccess("");
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  // Upload Hero Image to ImgBB
  const handleUploadHeroImage = async () => {
    if (!selectedFile) {
      setUploadError("Please select an image file first.");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    // Optimistically apply high-res preview instantly (0.01s instant feedback with zero quality loss)
    const activePreview = filePreview;
    if (activePreview) {
      onUpdateHeroBg(activePreview);
      localStorage.setItem("valerioo_hero_bg", activePreview);
    }

    try {
      const imgbbResult = await uploadToImgBB(selectedFile);
      const newImageUrl = imgbbResult.url || imgbbResult.displayUrl;

      if (!newImageUrl) {
        throw new Error("Did not receive a valid image URL from ImgBB.");
      }

      localStorage.setItem("valerioo_hero_bg", newImageUrl);

      try {
        await setDoc(doc(db, "settings", "hero"), {
          background: newImageUrl,
          updatedAt: new Date().toISOString(),
          updatedBy: user.email,
        });
      } catch (firestoreErr) {
        console.warn("Firestore hero sync notice:", firestoreErr);
      }

      onUpdateHeroBg(newImageUrl);
      setUploadSuccess("Hero section image successfully uploaded in 4K resolution & saved live!");
      setSelectedFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error("Hero upload error:", err);
      setUploadError(err.message || "Failed to upload image to ImgBB.");
    } finally {
      setUploading(false);
    }
  };

  const handleResetDefaultHero = async () => {
    localStorage.removeItem("valerioo_hero_bg");
    try {
      await setDoc(doc(db, "settings", "hero"), {
        background: null,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {}
    onUpdateHeroBg(null);
    setUploadSuccess("Hero section reset to default image.");
    setUploadError("");
  };

  // Product Image File Handler
  const handleProdImgChange = (e) => {
    const file = e.target.files[0];
    setProdError("");
    setProdSuccess("");
    if (file) {
      setProdImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProdImgPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setProdImgFile(null);
      setProdImgPreview(null);
    }
  };

  // Create & Save New Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!prodName.trim()) {
      setProdError("Please enter a product name.");
      return;
    }
    if (!prodImgFile) {
      setProdError("Please select a product image file to upload.");
      return;
    }

    setProdSaving(true);
    setProdError("");
    setProdSuccess("");

    try {
      // 1. Upload Product Image to ImgBB
      const imgbbRes = await uploadToImgBB(prodImgFile);
      const imageUrl = imgbbRes.url || imgbbRes.displayUrl;

      if (!imageUrl) {
        throw new Error("Failed to receive image URL from ImgBB.");
      }

      // 2. Build product object
      const newProdId = `${prodName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;
      const newProduct = {
        id: newProdId,
        name: prodName.trim().toUpperCase(),
        subtitle: `${prodCategory} COLLECTION · EDP`,
        brand: "VALERIOO",
        tagline: prodTagline.trim() || "A FRAGRANCE OF DISTINCTION",
        category: prodCategory,
        price: Number(prodPrice) || 400,
        mrp: Number(prodMrp) || Number(prodPrice) || 499,
        volume: prodVolume,
        badge: prodBadge.trim() || null,
        concentration: "Eau de Parfum (EDP)",
        image: imageUrl,
        description: prodDesc.trim() || `${prodName} — An artisanal fragrance created with fine botanicals and luxury accords.`,
        details: prodDesc.trim() || "Crafted for the discerning fragrance lover. A signature scent of distinction.",
        notes: {
          top: prodTopNotes ? prodTopNotes.split(",").map((s) => s.trim()).filter(Boolean) : ["Citrus", "Spices"],
          heart: prodHeartNotes ? prodHeartNotes.split(",").map((s) => s.trim()).filter(Boolean) : ["Floral Accords", "Rose"],
          base: prodBaseNotes ? prodBaseNotes.split(",").map((s) => s.trim()).filter(Boolean) : ["Amber", "Musk", "Woody Notes"],
        },
        featured: true,
        bestseller: true,
        isCustom: true,
        createdAt: new Date().toISOString(),
      };

      // 3. Save to Firestore
      try {
        await setDoc(doc(db, "products", newProdId), newProduct);
      } catch (fsErr) {
        console.warn("Firestore product save notice:", fsErr);
      }

      // 4. Update parent & local state
      onAddProduct(newProduct);

      setProdSuccess(`Product "${newProduct.name}" successfully added to ${prodCategory} collection!`);
      // Reset form
      setProdName("");
      setProdTagline("");
      setProdBadge("");
      setProdDesc("");
      setProdTopNotes("");
      setProdHeartNotes("");
      setProdBaseNotes("");
      setProdImgFile(null);
      setProdImgPreview(null);
    } catch (err) {
      console.error("Add product error:", err);
      setProdError(err.message || "Failed to add new product.");
    } finally {
      setProdSaving(false);
    }
  };

  const handleDeleteCustomProd = async (id) => {
    if (!window.confirm("Are you sure you want to remove this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (e) {}
    onDeleteProduct(id);
  };

  return (
    <div
      className="admin-modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        backgroundColor: "rgba(20, 18, 16, 0.78)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.25s ease",
      }}
      onClick={onClose}
    >
      <div
        className="admin-modal-container"
        style={{
          backgroundColor: "#FAF8F5",
          width: "100%",
          maxWidth: "580px",
          borderRadius: "4px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          border: "1px solid var(--color-border, #E6DFD5)",
          padding: "2.2rem 2rem",
          position: "relative",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Admin Panel"
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            fontSize: "1.6rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#181614",
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        {/* Header Title */}
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-brass, #C5A059)",
              display: "block",
              marginBottom: "0.3rem",
            }}
          >
            VALERIOO CONTROL
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "1.55rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "#181614",
              margin: 0,
            }}
          >
            Admin Management Panel
          </h2>
        </div>

        {!user ? (
          /* LOGIN / REGISTER FORM */
          <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <p style={{ fontSize: "0.82rem", color: "#666", textAlign: "center", margin: "0 0 0.5rem" }}>
              {isSignUp ? "Create a new Admin account using Firebase" : "Sign in with your Firebase admin account to manage products & hero section"}
            </p>

            {authError && (
              <div style={{ backgroundColor: "#FFF2F2", color: "#D93025", border: "1px solid #F8C4C4", padding: "0.8rem 1rem", fontSize: "0.8rem", borderRadius: "3px" }}>
                {authError}
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600, color: "#181614" }}>
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@valerioo.com"
                style={{ width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem", border: "1px solid #D1C7BD", borderRadius: "2px", backgroundColor: "#FFF", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600, color: "#181614" }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "0.75rem 1rem", fontSize: "0.9rem", border: "1px solid #D1C7BD", borderRadius: "2px", backgroundColor: "#FFF", outline: "none" }}
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              style={{
                marginTop: "0.5rem",
                padding: "0.85rem",
                backgroundColor: "#181614",
                color: "#FAF8F5",
                border: "none",
                fontSize: "0.82rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: authLoading ? "not-allowed" : "pointer",
                opacity: authLoading ? 0.7 : 1,
              }}
            >
              {authLoading ? "Processing..." : isSignUp ? "Register Admin Account" : "Sign In to Admin Panel"}
            </button>

            <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setAuthError(""); }}
                style={{ background: "none", border: "none", fontSize: "0.78rem", color: "var(--color-brass, #C5A059)", textDecoration: "underline", cursor: "pointer" }}
              >
                {isSignUp ? "Already have an account? Sign In" : "Need an account? Register Admin Account"}
              </button>
            </div>
          </form>
        ) : (
          /* AUTHENTICATED ADMIN PANEL */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Top Bar: User email + Sign out */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.7rem 1rem", backgroundColor: "#EFECE6", borderRadius: "3px", fontSize: "0.78rem" }}>
              <div>
                <span style={{ color: "#777", display: "block", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Logged in as</span>
                <strong style={{ color: "#181614" }}>{user.email}</strong>
              </div>
              <button
                onClick={handleSignOut}
                style={{ backgroundColor: "transparent", border: "1px solid #181614", padding: "4px 12px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", color: "#181614" }}
              >
                Sign Out
              </button>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: "flex", borderBottom: "2px solid #E6DFD5", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setActiveTab("hero")}
                style={{
                  padding: "0.6rem 1rem",
                  border: "none",
                  borderBottom: activeTab === "hero" ? "2px solid var(--color-brass, #C5A059)" : "none",
                  backgroundColor: "transparent",
                  color: activeTab === "hero" ? "#181614" : "#888",
                  fontWeight: activeTab === "hero" ? 600 : 400,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginBottom: "-2px",
                }}
              >
                Hero Image
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("add-product")}
                style={{
                  padding: "0.6rem 1rem",
                  border: "none",
                  borderBottom: activeTab === "add-product" ? "2px solid var(--color-brass, #C5A059)" : "none",
                  backgroundColor: "transparent",
                  color: activeTab === "add-product" ? "#181614" : "#888",
                  fontWeight: activeTab === "add-product" ? 600 : 400,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginBottom: "-2px",
                }}
              >
                + Add Product
              </button>
              {customProducts.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("manage-products")}
                  style={{
                    padding: "0.6rem 1rem",
                    border: "none",
                    borderBottom: activeTab === "manage-products" ? "2px solid var(--color-brass, #C5A059)" : "none",
                    backgroundColor: "transparent",
                    color: activeTab === "manage-products" ? "#181614" : "#888",
                    fontWeight: activeTab === "manage-products" ? 600 : 400,
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginBottom: "-2px",
                  }}
                >
                  Custom Products ({customProducts.length})
                </button>
              )}
            </div>

            {/* TAB 1: HERO IMAGE MANAGER */}
            {activeTab === "hero" && (
              <div style={{ border: "1px solid #E6DFD5", padding: "1.4rem", backgroundColor: "#FFFFFF", borderRadius: "3px" }}>
                <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.05rem", fontWeight: 600, margin: "0 0 0.4rem 0", color: "#181614" }}>
                  Hero Section Background Image
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#666", margin: "0 0 1.2rem 0", lineHeight: 1.5 }}>
                  Upload a new high-resolution photo. It automatically uploads to <strong>ImgBB</strong> and updates the homepage Hero background seamlessly while maintaining perfect responsive proportions.
                </p>

                {uploadSuccess && <div style={{ backgroundColor: "#E8F5E9", color: "#2E7D32", padding: "0.7rem", fontSize: "0.8rem", borderRadius: "3px", marginBottom: "1rem" }}>{uploadSuccess}</div>}
                {uploadError && <div style={{ backgroundColor: "#FFEBEE", color: "#C62828", padding: "0.7rem", fontSize: "0.8rem", borderRadius: "3px", marginBottom: "1rem" }}>{uploadError}</div>}

                <div style={{ marginBottom: "1.2rem" }}>
                  <span style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: "6px" }}>Active Hero Preview</span>
                  <div style={{ width: "100%", height: "130px", borderRadius: "3px", overflow: "hidden", border: "1px solid #DDD", backgroundColor: "#000", position: "relative" }}>
                    <img src={filePreview || currentHeroBg} alt="Hero Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {filePreview && (
                      <span style={{ position: "absolute", bottom: "8px", left: "8px", backgroundColor: "var(--color-brass, #C5A059)", color: "#FFF", fontSize: "0.65rem", padding: "2px 8px", textTransform: "uppercase" }}>
                        New File Selected (Preview)
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600, color: "#181614" }}>
                    Choose Image File
                  </label>
                  <input type="file" accept="image/*" onChange={handleHeroFileChange} style={{ fontSize: "0.8rem", width: "100%" }} />
                </div>

                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  <button
                    onClick={handleUploadHeroImage}
                    disabled={uploading || !selectedFile}
                    style={{
                      flex: 1,
                      padding: "0.8rem 1rem",
                      backgroundColor: "#181614",
                      color: "#FAF8F5",
                      border: "none",
                      fontSize: "0.75rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      cursor: uploading || !selectedFile ? "not-allowed" : "pointer",
                      opacity: uploading || !selectedFile ? 0.6 : 1,
                    }}
                  >
                    {uploading ? "Uploading to ImgBB..." : "Upload & Save Hero Image"}
                  </button>

                  <button
                    onClick={handleResetDefaultHero}
                    type="button"
                    style={{ padding: "0.8rem 1rem", backgroundColor: "transparent", color: "#777", border: "1px solid #CCC", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}
                  >
                    Reset Default
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: ADD NEW PRODUCT */}
            {activeTab === "add-product" && (
              <form onSubmit={handleCreateProduct} style={{ border: "1px solid #E6DFD5", padding: "1.4rem", backgroundColor: "#FFFFFF", borderRadius: "3px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.05rem", fontWeight: 600, margin: 0, color: "#181614" }}>
                  Add New Product to Catalog
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#666", margin: "0 0 0.5rem 0" }}>
                  Fill in the perfume details below. The image will be uploaded directly to <strong>ImgBB</strong> and displayed automatically across the website.
                </p>

                {prodSuccess && <div style={{ backgroundColor: "#E8F5E9", color: "#2E7D32", padding: "0.7rem", fontSize: "0.8rem", borderRadius: "3px" }}>{prodSuccess}</div>}
                {prodError && <div style={{ backgroundColor: "#FFEBEE", color: "#C62828", padding: "0.7rem", fontSize: "0.8rem", borderRadius: "3px" }}>{prodError}</div>}

                {/* Grid for Name & Category */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ROYAL OUD"
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Category *
                    </label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px", backgroundColor: "#FFF" }}
                    >
                      <option value="KING">KING (Men)</option>
                      <option value="QUEEN">QUEEN (Women)</option>
                      <option value="UNISEX">UNISEX</option>
                    </select>
                  </div>
                </div>

                {/* Grid for Volume, Price & MRP */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Volume *
                    </label>
                    <select
                      value={prodVolume}
                      onChange={(e) => setProdVolume(e.target.value)}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px", backgroundColor: "#FFF" }}
                    >
                      <option value="10 ML">10 ML</option>
                      <option value="20 ML">20 ML</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="249"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                      MRP (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="499"
                      value={prodMrp}
                      onChange={(e) => setProdMrp(e.target.value)}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px" }}
                    />
                  </div>
                </div>

                {/* Tagline & Badge */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Tagline / Subtitle
                    </label>
                    <input
                      type="text"
                      placeholder="A FRAGRANCE OF DISTINCTION"
                      value={prodTagline}
                      onChange={(e) => setProdTagline(e.target.value)}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                      Badge (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Festive Offer"
                      value={prodBadge}
                      onChange={(e) => setProdBadge(e.target.value)}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px" }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description of notes and fragrance impression..."
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", fontSize: "0.85rem", border: "1px solid #CCC", borderRadius: "2px", resize: "vertical" }}
                  />
                </div>

                {/* Fragrance Notes */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.2rem" }}>Top Notes</label>
                    <input
                      type="text"
                      placeholder="Bergamot, Saffron"
                      value={prodTopNotes}
                      onChange={(e) => setProdTopNotes(e.target.value)}
                      style={{ width: "100%", padding: "0.5rem", fontSize: "0.8rem", border: "1px solid #CCC" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.2rem" }}>Heart Notes</label>
                    <input
                      type="text"
                      placeholder="Amber, Rose"
                      value={prodHeartNotes}
                      onChange={(e) => setProdHeartNotes(e.target.value)}
                      style={{ width: "100%", padding: "0.5rem", fontSize: "0.8rem", border: "1px solid #CCC" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.2rem" }}>Base Notes</label>
                    <input
                      type="text"
                      placeholder="Oud, Musk, Sandalwood"
                      value={prodBaseNotes}
                      onChange={(e) => setProdBaseNotes(e.target.value)}
                      style={{ width: "100%", padding: "0.5rem", fontSize: "0.8rem", border: "1px solid #CCC" }}
                    />
                  </div>
                </div>

                {/* Product Image File */}
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.4rem", color: "#181614" }}>
                    Product Image File * (Uploads to ImgBB)
                  </label>
                  <input type="file" accept="image/*" required onChange={handleProdImgChange} style={{ fontSize: "0.8rem", width: "100%" }} />

                  {prodImgPreview && (
                    <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={prodImgPreview} alt="Preview" style={{ width: "60px", height: "60px", objectFit: "contain", border: "1px solid #CCC", borderRadius: "2px", backgroundColor: "#F7F3EE" }} />
                      <span style={{ fontSize: "0.75rem", color: "#666" }}>Image Preview Ready</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={prodSaving}
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.85rem",
                    backgroundColor: "#181614",
                    color: "#FAF8F5",
                    border: "none",
                    fontSize: "0.8rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: prodSaving ? "not-allowed" : "pointer",
                    opacity: prodSaving ? 0.7 : 1,
                  }}
                >
                  {prodSaving ? "Uploading to ImgBB & Saving..." : "Add Product to Website"}
                </button>
              </form>
            )}

            {/* TAB 3: MANAGE CUSTOM PRODUCTS */}
            {activeTab === "manage-products" && (
              <div style={{ border: "1px solid #E6DFD5", padding: "1.4rem", backgroundColor: "#FFFFFF", borderRadius: "3px" }}>
                <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.05rem", fontWeight: 600, margin: "0 0 1rem 0" }}>
                  Custom Admin Added Products ({customProducts.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {customProducts.map((p) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0.8rem", border: "1px solid #EEE", borderRadius: "3px", backgroundColor: "#FAF8F5" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src={p.image} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "contain", backgroundColor: "#F7F3EE", border: "1px solid #DDD" }} />
                        <div>
                          <strong style={{ fontSize: "0.85rem", display: "block" }}>{p.name} ({p.volume})</strong>
                          <span style={{ fontSize: "0.72rem", color: "#666" }}>{p.category} COLLECTION · ₹{p.price}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCustomProd(p.id)}
                        style={{ backgroundColor: "#FFEBEE", color: "#C62828", border: "1px solid #EF9A9A", padding: "4px 10px", fontSize: "0.7rem", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModal;
