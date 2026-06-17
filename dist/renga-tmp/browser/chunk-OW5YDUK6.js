import {
  RouterLink
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/home/home.component.ts
var _c0 = () => ["/products"];
var _c1 = (a0) => ({ category: a0 });
var _c2 = (a0) => ["/products", a0];
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.slug;
var _forTrack2 = ($index, $item) => $item.id;
function HomeComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "img", 47);
    \u0275\u0275elementStart(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const feature_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", feature_r1.icon, \u0275\u0275sanitizeUrl)("alt", feature_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r1.label);
  }
}
function HomeComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14)(1, "div", 49);
    \u0275\u0275element(2, "img", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(5, _c0))("queryParams", \u0275\u0275pureFunction1(6, _c1, cat_r2.slug));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", cat_r2.imageUrl, \u0275\u0275sanitizeUrl)("alt", cat_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r2.name);
  }
}
function HomeComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20)(1, "span", 52);
    \u0275\u0275text(2, "BEST SELLER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 53);
    \u0275\u0275element(4, "img", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 55)(6, "p", 56);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 57);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c2, product_r3.id));
    \u0275\u0275advance(4);
    \u0275\u0275property("src", product_r3.imageUrl, \u0275\u0275sanitizeUrl)("alt", product_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatPrice(product_r3.price));
  }
}
function HomeComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 25)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r5 = ctx.$implicit;
    const $index_r6 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("0", $index_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r5);
  }
}
function HomeComponent_For_71_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 63);
  }
}
function HomeComponent_For_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 60);
    \u0275\u0275element(2, "img", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 62);
    \u0275\u0275repeaterCreate(4, HomeComponent_For_71_For_5_Template, 1, 0, "img", 63, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 64);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const review_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", review_r7.imageUrl, \u0275\u0275sanitizeUrl)("alt", review_r7.author);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.stars);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", review_r7.quote, " - ", review_r7.author);
  }
}
var HomeComponent = class _HomeComponent {
  categories = signal(
    [
      { name: "NH\u1EAAN", imageUrl: "/images/category-nhan.png", slug: "nhan" },
      { name: "D\xC2Y CHUY\u1EC0N", imageUrl: "/images/category-day-chuyen.png", slug: "day-chuyen" },
      { name: "HOA TAI", imageUrl: "/images/category-hoa-tai.png", slug: "hoa-tai" },
      { name: "L\u1EAEC TAY", imageUrl: "/images/category-lac-tay.png", slug: "lac-tay" },
      { name: "CHARM", imageUrl: "/images/category-charm.png", slug: "charm" }
    ],
    ...ngDevMode ? [{ debugName: "categories" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bestSellers = signal(
    [
      { id: "1", name: "Aura Diamond Studs", price: 125e5, imageUrl: "/images/product-aura-diamond-studs.png" },
      { id: "2", name: "Eternal Gold Band", price: 89e5, imageUrl: "/images/product-eternal-gold-band.png" },
      { id: "3", name: "Silk Gold Bangle", price: 152e5, imageUrl: "/images/product-silk-gold-bangle.png" },
      { id: "4", name: "Solo Sparkle Pendant", price: 64e5, imageUrl: "/images/product-solo-sparkle-pendant.png" }
    ],
    ...ngDevMode ? [{ debugName: "bestSellers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviews = signal(
    [
      { id: 1, quote: '"Chi\u1EBFc nh\u1EABn ho\xE0n h\u1EA3o h\u01A1n c\u1EA3 mong \u0111\u1EE3i!"', author: "Lan Anh", imageUrl: "/images/review-customer.png" },
      { id: 2, quote: '"D\u1ECBch v\u1EE5 t\u01B0 v\u1EA5n r\u1EA5t chuy\xEAn nghi\u1EC7p v\xE0 t\u1EADn t\xE2m!"', author: "Minh T\xFA", imageUrl: "/images/review-customer.png" },
      { id: 3, quote: '"Trang s\u1EE9c \u0111\u1EB9p, ch\u1EA5t l\u01B0\u1EE3ng v\u01B0\u1EE3t tr\u1ED9i!"', author: "Thu H\u01B0\u01A1ng", imageUrl: "/images/review-customer.png" },
      { id: 4, quote: '"S\u1EBD quay l\u1EA1i mua th\xEAm cho ng\u01B0\u1EDDi th\xE2n!"', author: "Ng\u1ECDc H\xE0", imageUrl: "/images/review-customer.png" }
    ],
    ...ngDevMode ? [{ debugName: "reviews" }] : (
      /* istanbul ignore next */
      []
    )
  );
  features = [
    { icon: "/icons/ic-feature-customize.png", label: "T\u1EF1 thi\u1EBFt k\u1EBF s\u1EA3n ph\u1EA9m theo \xFD th\xEDch" },
    { icon: "/icons/ic-feature-consult.png", label: "\u0110\u1EB7t l\u1ECBch t\u01B0 v\u1EA5n 1-1" },
    { icon: "/icons/ic-feature-quality.png", label: "V\u1EADt li\u1EC7u ch\u1EA5t l\u01B0\u1EE3ng" },
    { icon: "/icons/ic-feature-warranty.png", label: "Ch\xEDnh s\xE1ch b\u1EA3o h\xE0nh h\u1EA5p d\u1EABn" }
  ];
  studioSteps = [
    "Ch\u1ECDn ki\u1EC3u d\xE1ng nh\u1EABn t\u1EEB b\u1ED9 s\u01B0u t\u1EADp khung c\u01A1 b\u1EA3n \u0111a d\u1EA1ng.",
    "L\u1EF1a ch\u1ECDn ch\u1EA5t li\u1EC7u: V\xE0ng tr\u1EAFng, V\xE0ng h\u1ED3ng ho\u1EB7c Platinum.",
    "C\xE1 nh\xE2n h\xF3a v\u1EDBi \u0111\xE1 ch\u1EE7 Moissanite ho\u1EB7c Kim c\u01B0\u01A1ng thi\xEAn nhi\xEAn."
  ];
  stars = [1, 2, 3, 4, 5];
  formatPrice(price) {
    return price.toLocaleString("vi-VN") + "\u20AB";
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 74, vars: 0, consts: [[1, "home"], [1, "home__hero"], [1, "home__hero-content"], [1, "home__hero-title"], [1, "home__hero-subtitle"], [1, "home__hero-actions"], ["routerLink", "/products", 1, "home__hero-btn"], ["routerLink", "/studio", 1, "home__hero-btn"], ["routerLink", "/the-designer", 1, "home__hero-btn"], [1, "home__features"], [1, "home__features-item"], [1, "home__categories"], [1, "home__categories-title"], [1, "home__categories-grid"], [1, "home__category-item", 3, "routerLink", "queryParams"], [1, "home__bestsellers"], [1, "home__bestsellers-header"], [1, "home__bestsellers-title"], ["routerLink", "/products", 1, "home__bestsellers-link"], [1, "home__bestsellers-grid"], [1, "home__product-card", 3, "routerLink"], [1, "home__studio"], [1, "home__studio-content"], [1, "home__studio-title"], [1, "home__studio-steps"], [1, "home__studio-step"], ["routerLink", "/studio", 1, "home__studio-btn"], [1, "home__studio-visual"], ["src", "/images/product-detail-nhan-aeterna-1.png", "alt", "Studio Ring", 1, "home__studio-img"], [1, "home__studio-callout", "home__studio-callout--top"], [1, "home__studio-callout", "home__studio-callout--bottom"], [1, "home__designer"], [1, "home__designer-visual"], ["src", "/images/designer-photo.png", "alt", "The Designer", 1, "home__designer-img"], [1, "home__designer-content"], [1, "home__designer-title"], [1, "home__designer-subtitle"], [1, "home__designer-desc"], [1, "home__designer-fee"], ["src", "/icons/ic-fee.png", "alt", "", 1, "home__designer-fee-icon"], ["routerLink", "/the-designer", 1, "home__designer-btn"], [1, "home__reviews"], [1, "home__reviews-title"], [1, "home__reviews-grid"], [1, "home__review-card"], ["aria-label", "M\u1EDF chatbot h\u1ED7 tr\u1EE3", 1, "home__chatbot-btn"], ["src", "/icons/ic-chatbot.png", "alt", "Chatbot"], [1, "home__features-icon", 3, "src", "alt"], [1, "home__features-label"], [1, "home__category-arch"], [1, "home__category-img", 3, "src", "alt"], [1, "home__category-name"], [1, "home__product-badge"], [1, "home__product-img-wrap"], [1, "home__product-img", 3, "src", "alt"], [1, "home__product-info"], [1, "home__product-name"], [1, "home__product-price"], [1, "home__studio-step-num"], [1, "home__studio-step-text"], [1, "home__review-img-wrap"], [1, "home__review-img", 3, "src", "alt"], [1, "home__review-stars"], ["src", "/icons/ic-star.png", "alt", "\u2605", 1, "home__review-star"], [1, "home__review-quote"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "K\u1EC3 C\xE2u Chuy\u1EC7n C\u1EE7a Ri\xEAng B\u1EA1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, " T\u1EF1 tay thi\u1EBFt k\u1EBF chi\u1EBFc nh\u1EABn trong m\u01A1 ho\u1EB7c l\xE0m vi\u1EC7c tr\u1EF1c ti\u1EBFp c\xF9ng Nh\xE0 thi\u1EBFt k\u1EBF c\u1EE7a RENGA. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 5)(8, "a", 6);
      \u0275\u0275text(9, "\u0110\u1EB7t h\xE0ng c\xF3 s\u1EB5n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "a", 7);
      \u0275\u0275text(11, "THE STUDIO");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "a", 8);
      \u0275\u0275text(13, "THE DESIGNER");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "section", 9);
      \u0275\u0275repeaterCreate(15, HomeComponent_For_16_Template, 4, 3, "div", 10, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "section", 11)(18, "h2", 12);
      \u0275\u0275text(19, "Kh\xE1m ph\xE1 Danh m\u1EE5c s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 13);
      \u0275\u0275repeaterCreate(21, HomeComponent_For_22_Template, 5, 8, "a", 14, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "section", 15)(24, "div", 16)(25, "h3", 17);
      \u0275\u0275text(26, "Best Sellers");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "a", 18);
      \u0275\u0275text(28, "Xem t\u1EA5t c\u1EA3");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 19);
      \u0275\u0275repeaterCreate(30, HomeComponent_For_31_Template, 10, 7, "a", 20, _forTrack2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "section", 21)(33, "div", 22)(34, "h2", 23);
      \u0275\u0275text(35, " The Studio");
      \u0275\u0275element(36, "br");
      \u0275\u0275text(37, " S\xE1ng t\u1EA1o kh\xF4ng gi\u1EDBi h\u1EA1n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "ol", 24);
      \u0275\u0275repeaterCreate(39, HomeComponent_For_40_Template, 5, 2, "li", 25, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "a", 26);
      \u0275\u0275text(42, "B\u1EAET \u0110\u1EA6U THI\u1EBET K\u1EBE NGAY");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 27);
      \u0275\u0275element(44, "img", 28);
      \u0275\u0275elementStart(45, "div", 29);
      \u0275\u0275text(46, "\u0110\xEDnh \u0111\xE1 Moissanite");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 30);
      \u0275\u0275text(48, "Ch\u1ECDn V\xE0ng 14K");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "section", 31)(50, "div", 32);
      \u0275\u0275element(51, "img", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 34)(53, "h2", 35);
      \u0275\u0275text(54, " The Designer");
      \u0275\u0275element(55, "br");
      \u0275\u0275elementStart(56, "span", 36);
      \u0275\u0275text(57, "Hi\u1EC7n th\u1EF1c h\xF3a \xFD t\u01B0\u1EDFng c\xF9ng Chuy\xEAn gia");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "p", 37);
      \u0275\u0275text(59, " Tr\u1EA3i nghi\u1EC7m d\u1ECBch v\u1EE5 t\u01B0 v\u1EA5n c\xE1 nh\xE2n h\xF3a cao c\u1EA5p nh\u1EA5t. V\u1EDBi ph\xED d\u1ECBch v\u1EE5 500.000\u20AB, b\u1EA1n s\u1EBD \u0111\u01B0\u1EE3c trao \u0111\u1ED5i tr\u1EF1c ti\u1EBFp c\xF9ng c\xE1c chuy\xEAn gia h\xE0ng \u0111\u1EA7u c\u1EE7a RENGA \u0111\u1EC3 ph\xE1c th\u1EA3o v\xE0 ch\u1EBF t\xE1c m\xF3n trang s\u1EE9c \u0111\u1ED9c b\u1EA3n c\u1EE7a ri\xEAng b\u1EA1n. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 38);
      \u0275\u0275element(61, "img", 39);
      \u0275\u0275elementStart(62, "strong");
      \u0275\u0275text(63, "Ph\xED t\u01B0 v\u1EA5n: 500.000\u20AB (Tr\u1EEB tr\u1EF1c ti\u1EBFp v\xE0o \u0111\u01A1n h\xE0ng)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "a", 40);
      \u0275\u0275text(65, "\u0110\u1EB6T L\u1ECACH H\u1EB8N NGAY");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(66, "section", 41)(67, "h2", 42);
      \u0275\u0275text(68, "\u0110\xC1NH GI\xC1 V\u1EC0 RENGA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "div", 43);
      \u0275\u0275repeaterCreate(70, HomeComponent_For_71_Template, 8, 4, "div", 44, _forTrack2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "button", 45);
      \u0275\u0275element(73, "img", 46);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275repeater(ctx.features);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.categories());
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.bestSellers());
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.studioSteps);
      \u0275\u0275advance(31);
      \u0275\u0275repeater(ctx.reviews());
    }
  }, dependencies: [RouterLink], styles: ["\n.home[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: var(--max-width);\n  margin: 0 auto;\n  overflow-x: hidden;\n}\n.home__hero[_ngcontent-%COMP%] {\n  position: relative;\n  height: 832px;\n  background-image: url(/images/hero-bg.png);\n  background-size: cover;\n  background-position: center top;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.home__hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 620px;\n  padding-left: var(--container-px);\n  padding-top: 80px;\n}\n.home__hero-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  line-height: 1.25;\n  letter-spacing: -1.28px;\n  color: var(--color-primary);\n  margin-bottom: 24px;\n}\n.home__hero-subtitle[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 1.6;\n  color: var(--color-dark);\n  margin-bottom: 32px;\n  max-width: 588px;\n}\n.home__hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.home__hero-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16.5px 40px;\n  border-radius: 50px;\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition: opacity 0.2s;\n}\n.home__hero-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.home__features[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  height: 191px;\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  padding: 0 var(--container-px);\n  gap: 24px;\n}\n.home__features-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  text-align: center;\n}\n.home__features-icon[_ngcontent-%COMP%] {\n  width: 33px;\n  height: 33px;\n  object-fit: contain;\n}\n.home__features-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.home__categories[_ngcontent-%COMP%] {\n  background-color: var(--color-white);\n  padding: 48px var(--container-px) 64px;\n  min-height: 549px;\n}\n.home__categories-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  margin-bottom: 48px;\n}\n.home__categories-grid[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  justify-content: center;\n}\n.home__category-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  cursor: pointer;\n  text-decoration: none;\n  transition: transform 0.2s;\n}\n.home__category-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n}\n.home__category-arch[_ngcontent-%COMP%] {\n  width: 216px;\n  height: 324px;\n  border-radius: 9999px 9999px 0 0;\n  overflow: hidden;\n  border: 1px solid transparent;\n}\n.home__category-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n}\n.home__category-name[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 24px;\n  font-weight: 500;\n  color: var(--color-muted);\n  text-align: center;\n  white-space: nowrap;\n}\n.home__bestsellers[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  padding: 48px var(--container-px) 64px;\n  min-height: 598px;\n}\n.home__bestsellers-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 32px;\n}\n.home__bestsellers-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-primary);\n}\n.home__bestsellers-link[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  text-decoration: underline;\n}\n.home__bestsellers-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.home__bestsellers-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 320px);\n  gap: 24px;\n  overflow-x: auto;\n}\n.home__product-card[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: var(--color-white);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  display: flex;\n  flex-direction: column;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s, transform 0.2s;\n  flex-shrink: 0;\n}\n.home__product-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-card);\n  transform: translateY(-2px);\n}\n.home__product-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  left: 16px;\n  z-index: 1;\n  background-color: var(--color-badge-bg);\n  padding: 4px 12px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n}\n.home__product-img-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  background-color: var(--color-bg-card);\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.home__product-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.home__product-info[_ngcontent-%COMP%] {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.home__product-name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.5;\n}\n.home__product-price[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.5;\n}\n.home__studio[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 741px;\n  background-color: var(--color-studio-bg);\n  display: flex;\n  align-items: center;\n  gap: 48px;\n  padding: 80px var(--container-px);\n  overflow: hidden;\n}\n.home__studio-content[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 600px;\n}\n.home__studio-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  margin-bottom: 48px;\n}\n.home__studio-steps[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  margin-bottom: 48px;\n}\n.home__studio-step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 24px;\n}\n.home__studio-step-num[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 400;\n  color: var(--color-primary);\n  line-height: 1;\n  flex-shrink: 0;\n  min-width: 48px;\n}\n.home__studio-step-text[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  color: var(--color-primary-light);\n  line-height: 1.6;\n  padding-top: 4px;\n}\n.home__studio-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16.5px 40px;\n  border-radius: 50px;\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition: opacity 0.2s;\n}\n.home__studio-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.home__studio-visual[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n  width: 430px;\n  height: 550px;\n}\n.home__studio-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 12px;\n  box-shadow: 0 0 30px rgba(196, 96, 126, 0.4);\n}\n.home__studio-callout[_ngcontent-%COMP%] {\n  position: absolute;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  background-color: rgba(196, 96, 126, 0.2);\n  border: 1px solid var(--color-primary);\n  border-radius: 12px;\n  padding: 13px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-primary);\n  white-space: nowrap;\n}\n.home__studio-callout--top[_ngcontent-%COMP%] {\n  top: 60%;\n  right: -10%;\n}\n.home__studio-callout--bottom[_ngcontent-%COMP%] {\n  top: 28%;\n  left: -15%;\n}\n.home__designer[_ngcontent-%COMP%] {\n  min-height: 694px;\n  background-color: var(--color-designer-bg);\n  display: flex;\n  align-items: center;\n  gap: 48px;\n  padding: 80px var(--container-px);\n  overflow: hidden;\n}\n.home__designer-visual[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 512px;\n  height: 512px;\n  border-radius: 100px 0 100px 0;\n  overflow: hidden;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n}\n.home__designer-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.home__designer-content[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 843px;\n}\n.home__designer-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-dark);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  margin-bottom: 32px;\n}\n.home__designer-subtitle[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 45px;\n}\n.home__designer-desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  color: var(--color-primary-light);\n  line-height: 1.6;\n  margin-bottom: 24px;\n  max-width: 739px;\n}\n.home__designer-fee[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.home__designer-fee-icon[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 16px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.home__designer-fee[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-dark);\n  white-space: nowrap;\n}\n.home__designer-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 17px 41px;\n  border-radius: 50px;\n  background-color: var(--color-primary-light);\n  border: 1px solid rgba(196, 96, 126, 0.7);\n  color: var(--color-primary);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition: background-color 0.2s, color 0.2s;\n}\n.home__designer-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n  color: var(--color-white);\n}\n.home__reviews[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: var(--color-primary-light);\n  padding: 48px var(--container-px) 64px;\n  min-height: 559px;\n}\n.home__reviews-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  text-align: center;\n  margin-bottom: 48px;\n}\n.home__reviews-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n}\n.home__review-card[_ngcontent-%COMP%] {\n  background-color: var(--color-review-card-bg);\n  border-radius: 12px;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.home__review-img-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  border-radius: 12px;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.home__review-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.home__review-stars[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  padding-top: 8px;\n}\n.home__review-star[_ngcontent-%COMP%] {\n  width: 13.3px;\n  height: 12.7px;\n  object-fit: contain;\n}\n.home__review-quote[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-style: italic;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.5;\n}\n.home__chatbot-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 48px;\n  right: var(--container-px);\n  width: 85px;\n  height: 85px;\n  border-radius: 20px;\n  background-color: var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border: none;\n  transition: opacity 0.2s;\n}\n.home__chatbot-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.home__chatbot-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 75px;\n  height: 79px;\n  object-fit: contain;\n}\n/*# sourceMappingURL=home.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="home">

  <!-- Hero Section -->
  <section class="home__hero">
    <div class="home__hero-content">
      <h1 class="home__hero-title">K\u1EC3 C\xE2u Chuy\u1EC7n C\u1EE7a Ri\xEAng B\u1EA1n</h1>
      <p class="home__hero-subtitle">
        T\u1EF1 tay thi\u1EBFt k\u1EBF chi\u1EBFc nh\u1EABn trong m\u01A1 ho\u1EB7c l\xE0m vi\u1EC7c tr\u1EF1c ti\u1EBFp c\xF9ng Nh\xE0 thi\u1EBFt k\u1EBF c\u1EE7a RENGA.
      </p>
      <div class="home__hero-actions">
        <a routerLink="/products" class="home__hero-btn">\u0110\u1EB7t h\xE0ng c\xF3 s\u1EB5n</a>
        <a routerLink="/studio" class="home__hero-btn">THE STUDIO</a>
        <a routerLink="/the-designer" class="home__hero-btn">THE DESIGNER</a>
      </div>
    </div>
  </section>

  <!-- Features Bar -->
  <section class="home__features">
    @for (feature of features; track feature.label) {
      <div class="home__features-item">
        <img [src]="feature.icon" [alt]="feature.label" class="home__features-icon" />
        <span class="home__features-label">{{ feature.label }}</span>
      </div>
    }
  </section>

  <!-- Product Categories -->
  <section class="home__categories">
    <h2 class="home__categories-title">Kh\xE1m ph\xE1 Danh m\u1EE5c s\u1EA3n ph\u1EA9m</h2>
    <div class="home__categories-grid">
      @for (cat of categories(); track cat.slug) {
        <a [routerLink]="['/products']" [queryParams]="{ category: cat.slug }" class="home__category-item">
          <div class="home__category-arch">
            <img [src]="cat.imageUrl" [alt]="cat.name" class="home__category-img" />
          </div>
          <span class="home__category-name">{{ cat.name }}</span>
        </a>
      }
    </div>
  </section>

  <!-- Best Sellers -->
  <section class="home__bestsellers">
    <div class="home__bestsellers-header">
      <h3 class="home__bestsellers-title">Best Sellers</h3>
      <a routerLink="/products" class="home__bestsellers-link">Xem t\u1EA5t c\u1EA3</a>
    </div>
    <div class="home__bestsellers-grid">
      @for (product of bestSellers(); track product.id) {
        <a [routerLink]="['/products', product.id]" class="home__product-card">
          <span class="home__product-badge">BEST SELLER</span>
          <div class="home__product-img-wrap">
            <img [src]="product.imageUrl" [alt]="product.name" class="home__product-img" />
          </div>
          <div class="home__product-info">
            <p class="home__product-name">{{ product.name }}</p>
            <p class="home__product-price">{{ formatPrice(product.price) }}</p>
          </div>
        </a>
      }
    </div>
  </section>

  <!-- The Studio -->
  <section class="home__studio">
    <div class="home__studio-content">
      <h2 class="home__studio-title">
        The Studio<br />
        S\xE1ng t\u1EA1o kh\xF4ng gi\u1EDBi h\u1EA1n
      </h2>
      <ol class="home__studio-steps">
        @for (step of studioSteps; track $index) {
          <li class="home__studio-step">
            <span class="home__studio-step-num">0{{ $index + 1 }}</span>
            <span class="home__studio-step-text">{{ step }}</span>
          </li>
        }
      </ol>
      <a routerLink="/studio" class="home__studio-btn">B\u1EAET \u0110\u1EA6U THI\u1EBET K\u1EBE NGAY</a>
    </div>
    <div class="home__studio-visual">
      <img src="/images/product-detail-nhan-aeterna-1.png" alt="Studio Ring" class="home__studio-img" />
      <div class="home__studio-callout home__studio-callout--top">\u0110\xEDnh \u0111\xE1 Moissanite</div>
      <div class="home__studio-callout home__studio-callout--bottom">Ch\u1ECDn V\xE0ng 14K</div>
    </div>
  </section>

  <!-- The Designer -->
  <section class="home__designer">
    <div class="home__designer-visual">
      <img src="/images/designer-photo.png" alt="The Designer" class="home__designer-img" />
    </div>
    <div class="home__designer-content">
      <h2 class="home__designer-title">
        The Designer<br />
        <span class="home__designer-subtitle">Hi\u1EC7n th\u1EF1c h\xF3a \xFD t\u01B0\u1EDFng c\xF9ng Chuy\xEAn gia</span>
      </h2>
      <p class="home__designer-desc">
        Tr\u1EA3i nghi\u1EC7m d\u1ECBch v\u1EE5 t\u01B0 v\u1EA5n c\xE1 nh\xE2n h\xF3a cao c\u1EA5p nh\u1EA5t. V\u1EDBi ph\xED d\u1ECBch v\u1EE5 500.000\u20AB, b\u1EA1n s\u1EBD \u0111\u01B0\u1EE3c
        trao \u0111\u1ED5i tr\u1EF1c ti\u1EBFp c\xF9ng c\xE1c chuy\xEAn gia h\xE0ng \u0111\u1EA7u c\u1EE7a RENGA \u0111\u1EC3 ph\xE1c th\u1EA3o v\xE0 ch\u1EBF t\xE1c m\xF3n trang
        s\u1EE9c \u0111\u1ED9c b\u1EA3n c\u1EE7a ri\xEAng b\u1EA1n.
      </p>
      <div class="home__designer-fee">
        <img src="/icons/ic-fee.png" alt="" class="home__designer-fee-icon" />
        <strong>Ph\xED t\u01B0 v\u1EA5n: 500.000\u20AB (Tr\u1EEB tr\u1EF1c ti\u1EBFp v\xE0o \u0111\u01A1n h\xE0ng)</strong>
      </div>
      <a routerLink="/the-designer" class="home__designer-btn">\u0110\u1EB6T L\u1ECACH H\u1EB8N NGAY</a>
    </div>
  </section>

  <!-- Reviews -->
  <section class="home__reviews">
    <h2 class="home__reviews-title">\u0110\xC1NH GI\xC1 V\u1EC0 RENGA</h2>
    <div class="home__reviews-grid">
      @for (review of reviews(); track review.id) {
        <div class="home__review-card">
          <div class="home__review-img-wrap">
            <img [src]="review.imageUrl" [alt]="review.author" class="home__review-img" />
          </div>
          <div class="home__review-stars">
            @for (star of stars; track star) {
              <img src="/icons/ic-star.png" alt="\u2605" class="home__review-star" />
            }
          </div>
          <p class="home__review-quote">{{ review.quote }} - {{ review.author }}</p>
        </div>
      }
    </div>
    <button class="home__chatbot-btn" aria-label="M\u1EDF chatbot h\u1ED7 tr\u1EE3">
      <img src="/icons/ic-chatbot.png" alt="Chatbot" />
    </button>
  </section>

</div>
`, styles: ["/* src/app/home/home.component.css */\n.home {\n  width: 100%;\n  max-width: var(--max-width);\n  margin: 0 auto;\n  overflow-x: hidden;\n}\n.home__hero {\n  position: relative;\n  height: 832px;\n  background-image: url(/images/hero-bg.png);\n  background-size: cover;\n  background-position: center top;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.home__hero-content {\n  position: relative;\n  z-index: 1;\n  max-width: 620px;\n  padding-left: var(--container-px);\n  padding-top: 80px;\n}\n.home__hero-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  line-height: 1.25;\n  letter-spacing: -1.28px;\n  color: var(--color-primary);\n  margin-bottom: 24px;\n}\n.home__hero-subtitle {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 1.6;\n  color: var(--color-dark);\n  margin-bottom: 32px;\n  max-width: 588px;\n}\n.home__hero-actions {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.home__hero-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16.5px 40px;\n  border-radius: 50px;\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition: opacity 0.2s;\n}\n.home__hero-btn:hover {\n  opacity: 0.85;\n}\n.home__features {\n  background-color: var(--color-primary-light);\n  height: 191px;\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  padding: 0 var(--container-px);\n  gap: 24px;\n}\n.home__features-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  text-align: center;\n}\n.home__features-icon {\n  width: 33px;\n  height: 33px;\n  object-fit: contain;\n}\n.home__features-label {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.home__categories {\n  background-color: var(--color-white);\n  padding: 48px var(--container-px) 64px;\n  min-height: 549px;\n}\n.home__categories-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  margin-bottom: 48px;\n}\n.home__categories-grid {\n  display: flex;\n  gap: 24px;\n  justify-content: center;\n}\n.home__category-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  cursor: pointer;\n  text-decoration: none;\n  transition: transform 0.2s;\n}\n.home__category-item:hover {\n  transform: translateY(-4px);\n}\n.home__category-arch {\n  width: 216px;\n  height: 324px;\n  border-radius: 9999px 9999px 0 0;\n  overflow: hidden;\n  border: 1px solid transparent;\n}\n.home__category-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n}\n.home__category-name {\n  font-family: var(--font-sans);\n  font-size: 24px;\n  font-weight: 500;\n  color: var(--color-muted);\n  text-align: center;\n  white-space: nowrap;\n}\n.home__bestsellers {\n  background-color: var(--color-primary-light);\n  padding: 48px var(--container-px) 64px;\n  min-height: 598px;\n}\n.home__bestsellers-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 32px;\n}\n.home__bestsellers-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-primary);\n}\n.home__bestsellers-link {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  text-decoration: underline;\n}\n.home__bestsellers-link:hover {\n  color: var(--color-primary);\n}\n.home__bestsellers-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 320px);\n  gap: 24px;\n  overflow-x: auto;\n}\n.home__product-card {\n  position: relative;\n  background-color: var(--color-white);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  display: flex;\n  flex-direction: column;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s, transform 0.2s;\n  flex-shrink: 0;\n}\n.home__product-card:hover {\n  box-shadow: var(--shadow-card);\n  transform: translateY(-2px);\n}\n.home__product-badge {\n  position: absolute;\n  top: 16px;\n  left: 16px;\n  z-index: 1;\n  background-color: var(--color-badge-bg);\n  padding: 4px 12px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n}\n.home__product-img-wrap {\n  width: 100%;\n  aspect-ratio: 1;\n  background-color: var(--color-bg-card);\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.home__product-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.home__product-info {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.home__product-name {\n  font-family: var(--font-serif);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.5;\n}\n.home__product-price {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.5;\n}\n.home__studio {\n  position: relative;\n  min-height: 741px;\n  background-color: var(--color-studio-bg);\n  display: flex;\n  align-items: center;\n  gap: 48px;\n  padding: 80px var(--container-px);\n  overflow: hidden;\n}\n.home__studio-content {\n  flex: 1;\n  max-width: 600px;\n}\n.home__studio-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  margin-bottom: 48px;\n}\n.home__studio-steps {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  margin-bottom: 48px;\n}\n.home__studio-step {\n  display: flex;\n  align-items: flex-start;\n  gap: 24px;\n}\n.home__studio-step-num {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 400;\n  color: var(--color-primary);\n  line-height: 1;\n  flex-shrink: 0;\n  min-width: 48px;\n}\n.home__studio-step-text {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  color: var(--color-primary-light);\n  line-height: 1.6;\n  padding-top: 4px;\n}\n.home__studio-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16.5px 40px;\n  border-radius: 50px;\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition: opacity 0.2s;\n}\n.home__studio-btn:hover {\n  opacity: 0.85;\n}\n.home__studio-visual {\n  position: relative;\n  flex-shrink: 0;\n  width: 430px;\n  height: 550px;\n}\n.home__studio-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 12px;\n  box-shadow: 0 0 30px rgba(196, 96, 126, 0.4);\n}\n.home__studio-callout {\n  position: absolute;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  background-color: rgba(196, 96, 126, 0.2);\n  border: 1px solid var(--color-primary);\n  border-radius: 12px;\n  padding: 13px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-primary);\n  white-space: nowrap;\n}\n.home__studio-callout--top {\n  top: 60%;\n  right: -10%;\n}\n.home__studio-callout--bottom {\n  top: 28%;\n  left: -15%;\n}\n.home__designer {\n  min-height: 694px;\n  background-color: var(--color-designer-bg);\n  display: flex;\n  align-items: center;\n  gap: 48px;\n  padding: 80px var(--container-px);\n  overflow: hidden;\n}\n.home__designer-visual {\n  flex-shrink: 0;\n  width: 512px;\n  height: 512px;\n  border-radius: 100px 0 100px 0;\n  overflow: hidden;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n}\n.home__designer-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.home__designer-content {\n  flex: 1;\n  max-width: 843px;\n}\n.home__designer-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-dark);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  margin-bottom: 32px;\n}\n.home__designer-subtitle {\n  display: block;\n  font-size: 45px;\n}\n.home__designer-desc {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  color: var(--color-primary-light);\n  line-height: 1.6;\n  margin-bottom: 24px;\n  max-width: 739px;\n}\n.home__designer-fee {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.home__designer-fee-icon {\n  width: 22px;\n  height: 16px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.home__designer-fee strong {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-dark);\n  white-space: nowrap;\n}\n.home__designer-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 17px 41px;\n  border-radius: 50px;\n  background-color: var(--color-primary-light);\n  border: 1px solid rgba(196, 96, 126, 0.7);\n  color: var(--color-primary);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 1.6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition: background-color 0.2s, color 0.2s;\n}\n.home__designer-btn:hover {\n  background-color: var(--color-primary);\n  color: var(--color-white);\n}\n.home__reviews {\n  position: relative;\n  background-color: var(--color-primary-light);\n  padding: 48px var(--container-px) 64px;\n  min-height: 559px;\n}\n.home__reviews-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -1.28px;\n  line-height: 1.25;\n  text-align: center;\n  margin-bottom: 48px;\n}\n.home__reviews-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n}\n.home__review-card {\n  background-color: var(--color-review-card-bg);\n  border-radius: 12px;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.home__review-img-wrap {\n  width: 100%;\n  aspect-ratio: 1;\n  border-radius: 12px;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.home__review-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.home__review-stars {\n  display: flex;\n  gap: 4px;\n  padding-top: 8px;\n}\n.home__review-star {\n  width: 13.3px;\n  height: 12.7px;\n  object-fit: contain;\n}\n.home__review-quote {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-style: italic;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.5;\n}\n.home__chatbot-btn {\n  position: absolute;\n  bottom: 48px;\n  right: var(--container-px);\n  width: 85px;\n  height: 85px;\n  border-radius: 20px;\n  background-color: var(--color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border: none;\n  transition: opacity 0.2s;\n}\n.home__chatbot-btn:hover {\n  opacity: 0.85;\n}\n.home__chatbot-btn img {\n  width: 75px;\n  height: 79px;\n  object-fit: contain;\n}\n/*# sourceMappingURL=home.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/home/home.component.ts", lineNumber: 32 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-OW5YDUK6.js.map
