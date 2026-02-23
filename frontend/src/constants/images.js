// ============================================
// IMAGE MANAGEMENT
// ============================================

// ---------- HERO SECTION IMAGES ----------
import heroBg from "../assets/images/hero/bg.jpg";
import heroDrinks from "../assets/images/hero/hero dl.jpg";

// ---------- SLIDER IMAGES (from assets/images/slide/) ----------
import slide1 from "../assets/images/slide/slide1.jpg";
import slide2 from "../assets/images/slide/slide2.jpg";
import slide3 from "../assets/images/slide/slide3.jpg";
import slide4 from "../assets/images/slide/slide4.jpg";

import slide5 from "../assets/images/slide/slide5.jpg";
import slide6 from "../assets/images/slide/slide6.jpg";
import slide7 from "../assets/images/slide/slide7.jpg";
// ---------- PRODUCT IMAGES ----------
import cokeImg from "../assets/images/products/coke.jpg";
import pepsiImg from "../assets/images/products/pepsi.jpg";
import spriteImg from "../assets/images/products/sprite.jpg";
import fantaImg from "../assets/images/products/fanta.jpg";
import waterImg from "../assets/images/products/water.jpg";
import juiceImg from "../assets/images/products/juice.jpg";

// ============================================
// EXPORT ORGANIZED IMAGES
// ============================================

export const images = {
  // Hero section images
  hero: {
    bg: heroBg,
    drinks: heroDrinks,
  },

  // Slider images (now separate)
  slider: {
    slide1: slide1,
    slide2: slide2,
    slide3: slide3,
    slide4: slide4,
    slide5: slide5,
    slide6: slide6,
    slide7: slide7,
  },

  // Product images
  products: {
    coke: cokeImg,
    pepsi: pepsiImg,
    sprite: spriteImg,
    fanta: fantaImg,
    water: waterImg,
    juice: juiceImg,
    cocaCola: cokeImg,
    mineralWater: waterImg,
    orangeJuice: juiceImg,
  },
};

// ============================================
// HELPER FUNCTION
// ============================================

export const getProductImage = (productName) => {
  const map = {
    "Coca Cola": cokeImg,
    "Coca-Cola": cokeImg,
    Coke: cokeImg,
    Pepsi: pepsiImg,
    Sprite: spriteImg,
    Fanta: fantaImg,
    "7up": spriteImg,
    "Mineral Water": waterImg,
    "Spring Water": waterImg,
    "Sparkling Water": waterImg,
    "Orange Juice": juiceImg,
    "Apple Juice": juiceImg,
    "Mango Juice": juiceImg,
    "Mixed Fruit": juiceImg,
  };
  return map[productName] || cokeImg;
};

export default images;
