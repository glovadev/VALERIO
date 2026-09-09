import { siteAssets } from "./assets";

export const products = [
  {
    id: "noir-intense",
    name: "NOIR INTENSE",
    subtitle: "EXTRAIT DE PARFUM",
    category: "MEN",
    price: 2499,
    volume: "100 ML / 3.4 FL.OZ",
    concentration: "30% Pure Perfume Oil",
    image: siteAssets.products.noirIntense,
    description: "A commanding nocturnal presence. NOIR INTENSE balances smoked agarwood and rich black amber with hints of spicy cardamom and velvet leather.",
    details: "Crafted for the bold individual who commands reverence. Matured over six months in controlled cellars to reach its full olfactive depth.",
    notes: {
      top: ["Cardamom", "Sicilian Bergamot", "Pink Peppercorn"],
      heart: ["Smoked Incense", "Nutmeg", "Tuscan Leather"],
      base: ["Black Amber", "Cambodian Oud", "Bourbon Vanilla"]
    },
    featured: true,
    bestseller: true
  },
  {
    id: "oud-royale",
    name: "OUD ROYALE",
    subtitle: "EXTRAIT DE PARFUM",
    category: "UNISEX",
    price: 2799,
    volume: "100 ML / 3.4 FL.OZ",
    concentration: "32% Pure Perfume Oil",
    image: siteAssets.products.oudRoyale,
    description: "An opulent expression of royal heritage. Rare wild-harvested oud enveloped in golden saffron, velvet damask rose, and liquid honeycomb.",
    details: "Our crown jewel. Distilled using artisanal alembic stills, yielding a warm, intoxicating trail that endures beyond twenty-four hours.",
    notes: {
      top: ["Golden Saffron", "Cinnamon Bark", "Pomergranate"],
      heart: ["Damask Rose", "Myrrh", "Honeyed Labdanum"],
      base: ["Precious Royal Oud", "Sandalwood", "Tonka Bean"]
    },
    featured: true,
    bestseller: true
  },
  {
    id: "blue-allure",
    name: "BLUE ALLURE",
    subtitle: "EAU DE PARFUM",
    category: "MEN",
    price: 2299,
    volume: "100 ML / 3.4 FL.OZ",
    concentration: "22% Pure Perfume Oil",
    image: siteAssets.products.blueAllure,
    description: "Magnetic sophistication. Crisp Mediterranean bergamot and mineral oceanic accords merge seamlessly into crystalline cedarwood and white musk.",
    details: "Vibrant yet profoundly sensual. Captures the electric aura of twilight over azure waters.",
    notes: {
      top: ["Calabrian Bergamot", "Sea Salt Accord", "Crushed Mint"],
      heart: ["Blue Sage", "Pink Pepper", "Geranium"],
      base: ["Atlas Cedarwood", "White Amber", "Haitian Vetiver"]
    },
    featured: true,
    bestseller: true
  },
  {
    id: "amber-noir",
    name: "AMBER NOIR",
    subtitle: "EXTRAIT DE PARFUM",
    category: "WOMEN",
    price: 2499,
    volume: "100 ML / 3.4 FL.OZ",
    concentration: "30% Pure Perfume Oil",
    image: siteAssets.products.amberNoir,
    description: "An irresistible elixir of dark plum, night-blooming jasmine, and warm balsamic amber dusted with roasted Madagascar vanilla pods.",
    details: "Intimate and unforgettable. Wraps the wearer like bespoke cashmere on a moonlit Parisian terrace.",
    notes: {
      top: ["Black Plum", "Italian Mandarin", "Liquorice Accord"],
      heart: ["Night Jasmine", "Orris Concrete", "Cacao Blossom"],
      base: ["Resinous Amber", "Madagascar Vanilla", "Benzoin"]
    },
    featured: true,
    bestseller: true
  },
  {
    id: "velvet-rose",
    name: "VELVET ROSE",
    subtitle: "EXTRAIT DE PARFUM",
    category: "WOMEN",
    price: 2599,
    volume: "100 ML / 3.4 FL.OZ",
    concentration: "28% Pure Perfume Oil",
    image: "/assets/collections/women.jpg",
    description: "A dark, romantic Turkish rose intertwined with cloves, smoky woods, and sensual patchouli.",
    details: "A dramatic floral that defies convention. Deep, sultry, and lingering.",
    notes: {
      top: ["Damascena Rose", "Clove Bud"],
      heart: ["Taif Rose", "Praline", "Agarwood Smoke"],
      base: ["Ambergris", "Patchouli", "Musk"]
    },
    featured: false,
    bestseller: false
  },
  {
    id: "santal-imperial",
    name: "SANTAL IMPERIAL",
    subtitle: "EXTRAIT DE PARFUM",
    category: "UNISEX",
    price: 2899,
    volume: "100 ML / 3.4 FL.OZ",
    concentration: "30% Pure Perfume Oil",
    image: "/assets/collections/unisex.jpg",
    description: "Creamy Mysore sandalwood bathed in warm cardamom, iris root, and violet leaves.",
    details: "The zenith of meditative luxury. Soothing, refined, and distinctly sophisticated.",
    notes: {
      top: ["Cardamom", "Violet Leaf"],
      heart: ["Iris Butter", "Papyrus", "Cypress"],
      base: ["Mysore Sandalwood", "Cedar", "Leather"]
    },
    featured: false,
    bestseller: false
  }
];

export const getBestsellers = () => products.filter(p => p.bestseller);
export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (category) => 
  category === "ALL" ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase());
