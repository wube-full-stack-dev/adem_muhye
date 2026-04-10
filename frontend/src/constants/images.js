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

import soft1 from "../assets/images/products/s1.jpg";
import soft2 from "../assets/images/products/s2.jpg";
import soft3 from "../assets/images/products/s3.jpg";
import soft4 from "../assets/images/products/s4.jpg";
import soft5 from "../assets/images/products/s5.jpg";
import sevenup from "../assets/images/products/7up.png";
import juiceImg from "../assets/images/products/j1.png";
//juice images
import yoyo from "../assets/images/products/j1.png";
import mango from "../assets/images/products/j2.png";
import lomon from "../assets/images/products/j3.png";
import kk from "../assets/images/products/j4.png";
import avo from "../assets/images/products/j5.png";
import kk2 from "../assets/images/products/j6.jpg";
import kk3 from "../assets/images/products/j7.png";

// import coca from "../assets/images/products/s1.jpg";
import w1 from "../assets/images/products/w1.jpg";
import w2 from "../assets/images/products/w2.jpg";
import w3 from "../assets/images/products/w3.jpg";
import top from "../assets/images/products/w4.png";

import delt from "../assets/images/products/delt.png";
import delp from "../assets/images/products/delta.png";
import ff from "../assets/images/products/flow water.jpg";
import topp from "../assets/images/products/top1.png";

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
    coke: soft2,
    pepsi: pepsiImg,
    sprite: spriteImg,
    water1: top,
    water: topp,
    juice: juiceImg,
    cocaCola: cokeImg,
    mineralWater: topp,
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
    // "7up": spriteImg,
    "Mineral Water": topp,
    "Spring Water": w1,
    "Sparkling Water": w2,
    "Orange Juice": juiceImg,
    "Apple Juice": juiceImg,
    "Mango Juice": juiceImg,
    "Mixed Fruit": juiceImg,
    softy: soft1,
    softy1: soft2,
    softy2: soft3,
    softy3: soft4,
    softy4: soft5,
    "7up": sevenup,
    //juice images
    mangor: mango,
    yoyo: yoyo,
    lomon: lomon,
    kk: kk,
    "mango cr": kk2,
    "alang yo": kk3,
    avo: avo,

    one: w1,
    dega: w2,
    woa: w3,
    top: top,
    delt: delt,
    delp: delp,
    ff: ff,
    topp: topp,
  };
  return map[productName] || cokeImg;
};

export default images;
