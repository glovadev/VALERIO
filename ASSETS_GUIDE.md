# VALERIOO - Image & Asset Replacement Guide

This project is configured so that you can **manually replace ANY image at any time** with zero hassle.

---

## 🚀 How to Replace Any Image (2 Methods)

### Method 1: Drop-In Replacement (Zero Code)
Every active image is stored in `public/assets/`. To change any image:
1. Export your new image in JPG, PNG, or WebP.
2. Place it in the appropriate folder inside `public/assets/` using the **exact same file name** listed in the table below.
3. Your browser will instantly display your new image!

---

### Method 2: Change Path in `src/data/assets.js`
If you want to use a new filename (e.g. `my-new-perfume.jpg`):
1. Save your file inside `public/assets/products/my-new-perfume.jpg`.
2. Open [`src/data/assets.js`](file:///d:/website/PurfumeBrandLandingPage/src/data/assets.js).
3. Change the path to your new file name:
   ```javascript
   noirIntense: "/assets/products/my-new-perfume.jpg",
   ```

---

## 📁 Exact File Locations & Recommended Sizes

| Section | File Path | Format | Recommended Size | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Favicon** | `public/assets/brand/favicon.svg` | SVG | 64 × 64 px | Browser tab icon |
| **Hero Background** | `public/assets/hero/hero-full-row.jpg` | JPG | 1920 × 860 px | Panoramic full-width hero background with pedestal |
| **Hero 3D Cutout** | `public/assets/hero/hero-bottle-cutout-panoramic.png` | PNG (transp.) | 1920 × 860 px | Bottle cutout layer that overlaps brand typography |
| **Collections: Men** | `public/assets/collections/men.jpg` | JPG | 800 × 1000 px (4:5) | Men collection card on pedestal |
| **Collections: Women** | `public/assets/collections/women.jpg` | JPG | 800 × 1000 px (4:5) | Women collection card on pedestal |
| **Collections: Unisex & Combo** | `public/assets/collections/unisex.jpg` | JPG | 800 × 1000 px (4:5) | Unisex & Combo collection card on pedestal |
| **Collections: Bestsellers** | `public/assets/collections/bestsellers.jpg` | JPG | 800 × 1000 px (4:5) | Bestsellers collection card on pedestal |
| **Bestsellers: Noir Intense** | `public/assets/products/noir-intense.jpg` | JPG | 1200 × 1016 px | Black glass bottle packshot on warm studio background |
| **Bestsellers: Oud Royale** | `public/assets/products/oud-royale.jpg` | JPG | 1200 × 1016 px | Amber glass + gold cap packshot on warm studio background |
| **Bestsellers: Blue Allure** | `public/assets/products/blue-allure.jpg` | JPG | 1200 × 1016 px | Blue glass bottle packshot on warm studio background |
| **Bestsellers: Amber Noir** | `public/assets/products/amber-noir.jpg` | JPG | 1200 × 1016 px | Cognac amber bottle packshot on warm studio background |
| **The Art of Perfumery** | `public/assets/editorial/philosophy.jpg` | JPG | 1400 × 750 px | Cinematic monochrome editorial image |
| **Campaign Banner** | `public/assets/editorial/campaign.jpg` | JPG | 1200 × 750 px | "Timeless. Yours." couple portrait editorial |
| **Newsletter / Concierge** | `public/assets/newsletter/newsletter-box.jpg` | JPG | 800 × 600 px | Bespoke gift packaging box with flacon |

---

## 🧹 Cleaned-Up Files
All temporary, unused, and duplicate test images have been permanently removed from the project:
- `hero-bottle-cutout.png` (old 1.9MB test cutout) -> **REMOVED**
- `hero-main.jpg` (old AI test) -> **REMOVED**
- `hero-scene-bg.jpg` (old AI test) -> **REMOVED**
- `src/assets/hero.png` -> **REMOVED**
- `src/assets/react.svg`, `src/assets/vite.svg` -> **REMOVED**
- `public/icons.svg` -> **REMOVED**
