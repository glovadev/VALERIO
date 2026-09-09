# VALERIOO — Haute Parfumerie Landing Page

A bespoke, ultra-luxury digital storefront and landing page for **VALERIOO (House of Valerioo)** — artisanal Extrait de Parfum crafted in Guwahati, Assam.

---

## ✨ Features

- **Luxury Design System**: Custom cream (`#FAF8F5`), brass gold (`#C5A059`), and deep charcoal palette with warm editorial typography.
- **Dedicated Brand Stories**:
  - `01. THE JOURNEY`: From a Dream in Guwahati to Gujarat and beyond.
  - `02. THE VALERIOO SIGNATURE`: Contemporary in spirit, timeless in character.
  - `03. OUR PHILOSOPHY`: Where fragrance becomes emotion.
  - `04. THE ART OF PERFUMERY`: Olfactory architecture (Top, Heart, Base) and the 4 pillars of the craft.
  - `05. NEW CAMPAIGN`: *Timeless. Yours.*
- **Direct WhatsApp Ordering**: Seamless WhatsApp integration (`+91 98765 43210`) for orders and concierge consultations.
- **100% Mobile Optimized**: Tested across desktop (1920px/1400px), laptops (1200px), tablets (768px-991px), and mobile devices (390px-480px).
- **Zero Layout-Break Image Architecture**: Containers use fixed aspect ratios and CSS `object-fit: cover / contain`, ensuring that any newly replaced image maintains layout, margins, and alignment.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory, ready to deploy to Vercel, Netlify, GitHub Pages, or any web host.

---

## 🖼️ How the Client Can Change or Replace Any Image

All active images are organized inside the `public/assets/` folder.

### Option 1: Drop-In Replacement (Zero Code Needed)
To replace any image, simply save your new image with the **exact same filename** in the respective folder:

| Image Description | File Location | Recommended Size / Aspect Ratio |
| :--- | :--- | :--- |
| **Hero Background** | `public/assets/hero/hero-full-row.jpg` | 1920 × 860 px (Panoramic) |
| **Hero 3D Cutout Layer** | `public/assets/hero/hero-bottle-cutout-panoramic.png` | 1920 × 860 px (Transparent PNG) |
| **Collections: Men** | `public/assets/collections/men.jpg` | 800 × 1000 px (4:5 portrait) |
| **Collections: Women** | `public/assets/collections/women.jpg` | 800 × 1000 px (4:5 portrait) |
| **Collections: Unisex** | `public/assets/collections/unisex.jpg` | 800 × 1000 px (4:5 portrait) |
| **Collections: Bestsellers** | `public/assets/collections/bestsellers.jpg` | 800 × 1000 px (4:5 portrait) |
| **Product 1 (Noir Intense)** | `public/assets/products/noir-intense.jpg` | 1200 × 1016 px (or square 1:1) |
| **Product 2 (Oud Royale)** | `public/assets/products/oud-royale.jpg` | 1200 × 1016 px (or square 1:1) |
| **Product 3 (Blue Allure)** | `public/assets/products/blue-allure.jpg` | 1200 × 1016 px (or square 1:1) |
| **Product 4 (Amber Noir)** | `public/assets/products/amber-noir.jpg` | 1200 × 1016 px (or square 1:1) |
| **Editorial Philosophy Banner** | `public/assets/editorial/philosophy.jpg` | 1400 × 750 px |
| **Editorial Campaign Banner** | `public/assets/editorial/campaign.jpg` | 1200 × 750 px |
| **Newsletter Packaging Box** | `public/assets/newsletter/newsletter-box.jpg` | 800 × 600 px |

*Note: You do not need to restart the server or rebuild if you keep the same filename—the browser will display your new image immediately.*

### Option 2: Changing Filenames in the Central Asset Registry
If your client prefers to use new filenames (e.g. `valerioo-summer-drop.jpg`):
1. Copy the image into `public/assets/products/` (or whichever folder).
2. Open [`src/data/assets.js`](src/data/assets.js).
3. Update the corresponding path:
   ```javascript
   products: {
     noirIntense: "/assets/products/valerioo-summer-drop.jpg",
     // ...
   }
   ```

---

## ⚙️ How to Update Brand Details & Phone Number

All brand configuration is located in a single file: [`src/data/siteConfig.js`](src/data/siteConfig.js)

```javascript
export const siteConfig = {
  brandName: "VALERIOO",
  tagline: "HOUSE OF VALERIOO",
  contact: {
    phone: "+91 98765 43210", // Updates all WhatsApp order buttons automatically
    email: "concierge@valerioo.com",
    address: "Guwahati, Assam, India",
    hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST"
  }
};
```
Updating the phone number here will automatically update:
- The floating WhatsApp concierge button
- Every product "ORDER VIA WHATSAPP" button
- The header and mobile menu contact links
- The footer inquiry links

---

## 📁 Project Architecture

```
PurfumeBrandLandingPage/
├── public/
│   ├── assets/
│   │   ├── brand/          # Favicon & brand badges
│   │   ├── collections/    # Men, Women, Unisex, Bestsellers cards
│   │   ├── editorial/      # Philosophy & Campaign editorial photos
│   │   ├── hero/           # Panoramic hero background & flacon layer
│   │   ├── newsletter/     # Gift packaging box
│   │   └── products/       # 4 signature bottle packshots
│   └── favicon.svg
├── src/
│   ├── components/         # Modular React components
│   │   ├── Header.jsx      # Symmetric 3-column navigation
│   │   ├── Hero.jsx        # Mobile-centered hero section
│   │   ├── StoryPage.jsx   # The 5 dedicated story chapters
│   │   ├── Collections.jsx # 2x2 luxury mobile grid
│   │   ├── Bestsellers.jsx # Product catalog & WhatsApp orders
│   │   └── ...
│   ├── data/
│   │   ├── assets.js       # Central image registry
│   │   ├── navigation.js   # Header, mobile menu & footer links
│   │   ├── products.js     # Fragrance notes, prices, volumes
│   │   └── siteConfig.js   # Brand name, WhatsApp number, hours
│   └── styles/
│       ├── variables.css   # Color tokens, fonts, spacing
│       ├── globals.css     # Base typography and container layouts
│       └── responsive.css  # Mobile, tablet, and laptop media queries
├── ASSETS_GUIDE.md         # Detailed image specification manual
├── package.json
└── vite.config.js
```

---

## 🔒 License & Client Handover
Created exclusively for **House of Valerioo**. All brand assets, stories, and designs are proprietary.
