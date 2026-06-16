import {
  ProductsService,
  toSignal
} from "./chunk-OPX7IJLV.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  map,
  setClassMetadata,
  signal,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/products/product-detail/product-detail.component.ts
var _c0 = (a0) => ["/products", a0];
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function ProductDetailComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function ProductDetailComponent_For_16_Template_button_click_0_listener() {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectImage($index_r2));
    });
    \u0275\u0275element(1, "img", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r4 = ctx.$implicit;
    const $index_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("product-detail__thumb-btn--active", ctx_r2.activeImageIndex() === $index_r2);
    \u0275\u0275advance();
    \u0275\u0275property("src", img_r4, \u0275\u0275sanitizeUrl)("alt", ctx_r2.product().name + " - \u1EA3nh " + ($index_r2 + 1));
  }
}
function ProductDetailComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "S\u1EB4N C\xD3");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function ProductDetailComponent_For_35_Template_button_click_0_listener() {
      const size_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectSize(size_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const size_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("product-detail__size-btn--active", ctx_r2.selectedSize() === size_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", size_r6, " ");
  }
}
function ProductDetailComponent_For_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "p", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const spec_r7 = ctx.$implicit;
    const \u0275$index_100_r8 = ctx.$index;
    const \u0275$count_100_r9 = ctx.$count;
    \u0275\u0275classProp("product-detail__spec-item--last", \u0275$index_100_r8 === \u0275$count_100_r9 - 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(spec_r7.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(spec_r7.value);
  }
}
function ProductDetailComponent_For_63_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 55);
  }
}
function ProductDetailComponent_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "div", 52)(2, "span", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 54);
    \u0275\u0275repeaterCreate(5, ProductDetailComponent_For_63_For_6_Template, 1, 0, "img", 55, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(7, "img", 56);
    \u0275\u0275elementStart(8, "p", 57);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 58);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const review_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(review_r10.name);
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("", review_r10.rating, " sao"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.stars);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", review_r10.imageUrl, \u0275\u0275sanitizeUrl)("alt", review_r10.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r10.quote);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r10.date);
  }
}
function ProductDetailComponent_For_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 43)(1, "div", 59);
    \u0275\u0275element(2, "img", 60);
    \u0275\u0275elementStart(3, "div", 61)(4, "span", 62);
    \u0275\u0275text(5, "QUICK VIEW");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 63)(7, "span", 64);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h3", 65);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 66);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, item_r11.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r11.imageUrl, \u0275\u0275sanitizeUrl)("alt", item_r11.name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(item_r11.collection);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatPrice(item_r11.price));
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  // Đọc :id từ route → gọi service → sau này swap of() sang http.get() trong service là xong
  // Khi dùng http.get() (async): đổi requireSync thành initialValue: undefined và wrap template bằng @if (product(); as p)
  product = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "1"), switchMap((id) => this.productsService.getProductById(id))), { requireSync: true });
  // TODO: lấy từ API — product.specs
  specs = [
    { label: "CH\u1EA4T LI\u1EC6U", value: "V\xE0ng Tr\u1EAFng 18k" },
    { label: "KIM C\u01AF\u01A0NG CH\xCDNH", value: "1.50 Carat" },
    { label: "\u0110\u1ED8 TINH KHI\u1EBET", value: "VVS1 - Flawless" },
    { label: "TR\u1ECCNG L\u01AF\u1EE2NG", value: "4.2 Grams" }
  ];
  // TODO: lấy từ API — /api/products/:id/reviews
  reviews = signal(
    [
      {
        id: 1,
        name: "MINH TH\u01AF H.",
        imageUrl: "/images/product-detail-nhan-aeterna-3.png",
        rating: 5,
        quote: '"S\u1EA3n ph\u1EA9m th\u1EF1c t\u1EBF c\xF2n l\u1ED9ng l\u1EABy h\u01A1n trong h\xECnh. D\u1ECBch v\u1EE5 ch\u0103m s\xF3c kh\xE1ch h\xE0ng r\u1EA5t chuy\xEAn nghi\u1EC7p, kh\xE2u \u0111\xF3ng g\xF3i c\u1EF1c k\u1EF3 cao c\u1EA5p."',
        date: "20 TH\xC1NG 10, 2023"
      },
      {
        id: 2,
        name: "LAN ANH T.",
        imageUrl: "/images/product-detail-nhan-aeterna-2.png",
        rating: 5,
        quote: '"S\u1EA3n ph\u1EA9m th\u1EF1c t\u1EBF c\xF2n l\u1ED9ng l\u1EABy h\u01A1n trong h\xECnh. D\u1ECBch v\u1EE5 ch\u0103m s\xF3c kh\xE1ch h\xE0ng r\u1EA5t chuy\xEAn nghi\u1EC7p, kh\xE2u \u0111\xF3ng g\xF3i c\u1EF1c k\u1EF3 cao c\u1EA5p."',
        date: "15 TH\xC1NG 09, 2023"
      },
      {
        id: 3,
        name: "THU H\u01AF\u01A0NG N.",
        imageUrl: "/images/product-detail-nhan-aeterna-3.png",
        rating: 5,
        quote: '"S\u1EA3n ph\u1EA9m th\u1EF1c t\u1EBF c\xF2n l\u1ED9ng l\u1EABy h\u01A1n trong h\xECnh. D\u1ECBch v\u1EE5 ch\u0103m s\xF3c kh\xE1ch h\xE0ng r\u1EA5t chuy\xEAn nghi\u1EC7p, kh\xE2u \u0111\xF3ng g\xF3i c\u1EF1c k\u1EF3 cao c\u1EA5p."',
        date: "01 TH\xC1NG 08, 2023"
      }
    ],
    ...ngDevMode ? [{ debugName: "reviews" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // TODO: lấy từ API — /api/products?category=:category&exclude=:id&limit=4
  relatedProducts = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "1"), switchMap((id) => this.productsService.getProducts().pipe(map((all) => all.filter((p) => p.id !== id).slice(0, 4))))), { initialValue: [] });
  stars = [1, 2, 3, 4, 5];
  reviewCount = signal(
    30,
    ...ngDevMode ? [{ debugName: "reviewCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeImageIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "activeImageIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSize = signal(
    10,
    ...ngDevMode ? [{ debugName: "selectedSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  productImages = computed(
    () => {
      const p = this.product();
      return p?.images?.length ? p.images : [p?.imageUrl ?? ""];
    },
    ...ngDevMode ? [{ debugName: "productImages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  productSizes = computed(
    () => this.product()?.sizes ?? [],
    ...ngDevMode ? [{ debugName: "productSizes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectImage(index) {
    this.activeImageIndex.set(index);
  }
  selectSize(size) {
    this.selectedSize.set(size);
  }
  formatPrice(price) {
    return price.toLocaleString("vi-VN") + "\u20AB";
  }
  static \u0275fac = function ProductDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], decls: 72, vars: 9, consts: [[1, "product-detail"], ["aria-label", "Breadcrumb", 1, "product-detail__breadcrumb"], ["routerLink", "/", 1, "product-detail__breadcrumb-link"], [1, "product-detail__breadcrumb-sep"], ["routerLink", "/products", 1, "product-detail__breadcrumb-link"], [1, "product-detail__breadcrumb-current"], [1, "product-detail__main"], [1, "product-detail__gallery"], [1, "product-detail__gallery-thumbnails"], ["type", "button", 1, "product-detail__thumb-btn", 3, "product-detail__thumb-btn--active"], [1, "product-detail__gallery-main"], [1, "product-detail__main-img", 3, "src", "alt"], [1, "product-detail__info"], [1, "product-detail__collection"], [1, "product-detail__name"], [1, "product-detail__price-row"], [1, "product-detail__price"], [1, "product-detail__stock-badge"], [1, "product-detail__desc"], [1, "product-detail__size-section"], [1, "product-detail__size-label"], [1, "product-detail__size-options"], ["type", "button", 1, "product-detail__size-btn", 3, "product-detail__size-btn--active"], ["routerLink", ".", 1, "product-detail__size-guide"], [1, "product-detail__cta"], ["type", "button", 1, "product-detail__btn", "product-detail__btn--primary"], ["type", "button", 1, "product-detail__btn", "product-detail__btn--secondary"], [1, "product-detail__services"], [1, "product-detail__service-item"], ["src", "/icons/ic-feature-warranty.png", "alt", "", 1, "product-detail__service-icon"], [1, "product-detail__service-text"], ["src", "/icons/ic-feature-quality.png", "alt", "", 1, "product-detail__service-icon"], [1, "product-detail__specs"], [1, "product-detail__specs-title"], [1, "product-detail__specs-grid"], [1, "product-detail__spec-item", 3, "product-detail__spec-item--last"], [1, "product-detail__reviews"], [1, "product-detail__reviews-title"], [1, "product-detail__reviews-grid"], [1, "product-detail__review-card"], [1, "product-detail__related"], [1, "product-detail__related-title"], [1, "product-detail__related-grid"], [1, "product-detail__related-card", 3, "routerLink"], ["aria-label", "M\u1EDF chatbot h\u1ED7 tr\u1EE3", 1, "product-detail__chatbot"], ["src", "/icons/ic-chatbot.png", "alt", "Chatbot"], ["type", "button", 1, "product-detail__thumb-btn", 3, "click"], [1, "product-detail__thumb-img", 3, "src", "alt"], ["type", "button", 1, "product-detail__size-btn", 3, "click"], [1, "product-detail__spec-item"], [1, "product-detail__spec-label"], [1, "product-detail__spec-value"], [1, "product-detail__review-header"], [1, "product-detail__review-name"], [1, "product-detail__review-stars", 3, "aria-label"], ["src", "/icons/ic-star.png", "alt", "\u2605", 1, "product-detail__review-star"], [1, "product-detail__review-img", 3, "src", "alt"], [1, "product-detail__review-quote"], [1, "product-detail__review-date"], [1, "product-detail__related-img-wrap"], [1, "product-detail__related-img", 3, "src", "alt"], [1, "product-detail__related-overlay"], [1, "product-detail__related-quick-view"], [1, "product-detail__related-info"], [1, "product-detail__related-collection"], [1, "product-detail__related-name"], [1, "product-detail__related-price"]], template: function ProductDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "a", 2);
      \u0275\u0275text(3, "DANH M\u1EE4C S\u1EA2N PH\u1EA8M");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 3);
      \u0275\u0275text(5, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 4);
      \u0275\u0275text(7, "NH\u1EAAN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 3);
      \u0275\u0275text(9, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 5);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "section", 6)(13, "div", 7)(14, "div", 8);
      \u0275\u0275repeaterCreate(15, ProductDetailComponent_For_16_Template, 2, 4, "button", 9, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 10);
      \u0275\u0275element(18, "img", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 12)(20, "p", 13);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "h1", 14);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 15)(25, "span", 16);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(27, ProductDetailComponent_Conditional_27_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p", 18);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 19)(31, "p", 20);
      \u0275\u0275text(32, "K\xCDCH TH\u01AF\u1EDAC (SIZE)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 21);
      \u0275\u0275repeaterCreate(34, ProductDetailComponent_For_35_Template, 2, 3, "button", 22, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "a", 23);
      \u0275\u0275text(37, "H\u01AF\u1EDANG D\u1EAAN CH\u1ECCN SIZE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 24)(39, "button", 25);
      \u0275\u0275text(40, " TH\xCAM V\xC0O GI\u1ECE H\xC0NG ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "button", 26);
      \u0275\u0275text(42, " MUA NGAY ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 27)(44, "div", 28);
      \u0275\u0275element(45, "img", 29);
      \u0275\u0275elementStart(46, "span", 30);
      \u0275\u0275text(47, "MI\u1EC4N PH\xCD V\u1EACN CHUY\u1EC2N TO\xC0N QU\u1ED0C");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div", 28);
      \u0275\u0275element(49, "img", 31);
      \u0275\u0275elementStart(50, "span", 30);
      \u0275\u0275text(51, "B\u1EA2O H\xC0NH TR\u1ECCN \u0110\u1EDCI & KI\u1EC2M \u0110\u1ECANH GIA");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(52, "section", 32)(53, "h2", 33);
      \u0275\u0275text(54, "TH\xD4NG S\u1ED0 CHI TI\u1EBET");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 34);
      \u0275\u0275repeaterCreate(56, ProductDetailComponent_For_57_Template, 5, 4, "div", 35, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "section", 36)(59, "h2", 37);
      \u0275\u0275text(60);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 38);
      \u0275\u0275repeaterCreate(62, ProductDetailComponent_For_63_Template, 12, 7, "div", 39, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "section", 40)(65, "h2", 41);
      \u0275\u0275text(66, "S\u1EA2N PH\u1EA8M LI\xCAN QUAN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div", 42);
      \u0275\u0275repeaterCreate(68, ProductDetailComponent_For_69_Template, 13, 8, "a", 43, _forTrack1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(70, "button", 44);
      \u0275\u0275element(71, "img", 45);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.product().name);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.product().images);
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.product().images[ctx.activeImageIndex()], \u0275\u0275sanitizeUrl)("alt", ctx.product().name);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.product().collection);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.product().name);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.formatPrice(ctx.product().price));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.product().inStock ? 27 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.product().description);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.product().sizes);
      \u0275\u0275advance(22);
      \u0275\u0275repeater(ctx.specs);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("\u0110\xC1NH GI\xC1 T\u1EEA KH\xC1CH H\xC0NG (", ctx.reviewCount(), ")");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.reviews());
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.relatedProducts());
    }
  }, dependencies: [RouterLink], styles: ["\n.product-detail[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 56px 80px;\n}\n.product-detail__breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 24px 0;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-detail__breadcrumb-link[_ngcontent-%COMP%] {\n  color: var(--color-muted);\n}\n.product-detail__breadcrumb-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.product-detail__breadcrumb-sep[_ngcontent-%COMP%] {\n  color: var(--color-muted);\n  font-size: 18px;\n  line-height: 1;\n}\n.product-detail__breadcrumb-current[_ngcontent-%COMP%] {\n  color: var(--color-dark);\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.product-detail__main[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 620px 1fr;\n  gap: 48px;\n  padding-bottom: 48px;\n}\n.product-detail__gallery[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.product-detail__gallery-thumbnails[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  width: 80px;\n  flex-shrink: 0;\n  overflow-y: auto;\n  max-height: 600px;\n}\n.product-detail__thumb-btn[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 96px;\n  border: 1px solid rgba(196, 199, 199, 0.3);\n  overflow: hidden;\n  padding: 1px;\n  background: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n}\n.product-detail__thumb-btn--active[_ngcontent-%COMP%] {\n  border-color: var(--color-dark);\n}\n.product-detail__thumb-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-detail__gallery-main[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 600px;\n  overflow: hidden;\n  position: relative;\n  background-color: var(--color-bg-card);\n}\n.product-detail__main-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-detail__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding-top: 8px;\n}\n.product-detail__collection[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 12px;\n  font-weight: 400;\n  color: var(--color-primary);\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n}\n.product-detail__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 40px;\n  font-weight: 400;\n  color: #1b1c1c;\n  line-height: 1.3;\n}\n.product-detail__price-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.product-detail__price[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.4;\n}\n.product-detail__stock-badge[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 10px;\n  font-weight: 400;\n  color: var(--color-muted);\n  background-color: #efeded;\n  padding: 4px 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.product-detail__desc[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.625;\n}\n.product-detail__size-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.product-detail__size-label[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 11px;\n  font-weight: 400;\n  color: #1b1c1c;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.product-detail__size-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.product-detail__size-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 1px solid rgba(196, 199, 199, 0.5);\n  background: none;\n  cursor: pointer;\n  font-family: var(--font-ui);\n  font-size: 14px;\n  color: #1b1c1c;\n  transition: border-color 0.2s, background-color 0.2s;\n}\n.product-detail__size-btn--active[_ngcontent-%COMP%] {\n  border-color: var(--color-dark);\n  border-width: 2px;\n  font-weight: 600;\n}\n.product-detail__size-btn[_ngcontent-%COMP%]:hover:not(.product-detail__size-btn--active) {\n  border-color: var(--color-primary);\n}\n.product-detail__size-guide[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 11px;\n  color: #1b1c1c;\n  text-transform: uppercase;\n  border-bottom: 1px solid var(--color-dark);\n  padding-bottom: 2px;\n  width: fit-content;\n}\n.product-detail__cta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n}\n.product-detail__btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px 24px;\n  font-family: var(--font-ui);\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.product-detail__btn--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  border: none;\n  max-width: 301px;\n}\n.product-detail__btn--secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  color: var(--color-dark);\n  border: 1px solid var(--color-primary);\n}\n.product-detail__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.product-detail__services[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding-top: 16px;\n  border-top: 1px solid rgba(196, 199, 199, 0.3);\n}\n.product-detail__service-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.product-detail__service-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.product-detail__service-text[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 14px;\n  color: var(--color-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.product-detail__specs[_ngcontent-%COMP%] {\n  background-color: var(--color-product-card-bg);\n  padding: 32px 48px;\n  margin: 0 -56px;\n}\n.product-detail__specs-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-primary);\n  text-align: center;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.product-detail__specs-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  border-top: 1px solid rgba(196, 199, 199, 0.3);\n  border-bottom: 1px solid rgba(196, 199, 199, 0.3);\n  padding: 49px 0;\n}\n.product-detail__spec-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 0 32px;\n  border-right: 1px solid rgba(196, 199, 199, 0.2);\n}\n.product-detail__spec-item--last[_ngcontent-%COMP%] {\n  border-right: none;\n}\n.product-detail__spec-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 20px;\n  font-weight: 500;\n  color: var(--color-muted);\n  text-align: center;\n  text-transform: uppercase;\n  line-height: 1.2;\n}\n.product-detail__spec-value[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  font-weight: 400;\n  color: #1b1c1c;\n  text-align: center;\n  line-height: 1.56;\n}\n.product-detail__reviews[_ngcontent-%COMP%] {\n  background-color: rgba(196, 96, 126, 0.7);\n  padding: 32px 48px 48px;\n  margin: 0 -56px;\n}\n.product-detail__reviews-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-primary-light);\n  text-align: center;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.product-detail__reviews-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n  max-width: 1080px;\n  margin: 0 auto;\n}\n.product-detail__review-card[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.73);\n  border-radius: 20px;\n  overflow: hidden;\n  padding: 16px 19px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.product-detail__review-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.product-detail__review-name[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-black);\n  text-transform: uppercase;\n}\n.product-detail__review-stars[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.product-detail__review-star[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 11px;\n}\n.product-detail__review-img[_ngcontent-%COMP%] {\n  width: 94px;\n  height: 94px;\n  object-fit: cover;\n  margin-bottom: 16px;\n}\n.product-detail__review-quote[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 16px;\n  font-style: italic;\n  color: var(--color-muted);\n  line-height: 1.5;\n  margin-bottom: 24px;\n}\n.product-detail__review-date[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 10px;\n  color: #747878;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border-top: 1px solid rgba(196, 199, 199, 0.3);\n  padding-top: 12px;\n  margin-top: auto;\n}\n.product-detail__related[_ngcontent-%COMP%] {\n  padding-top: 48px;\n}\n.product-detail__related-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 500;\n  color: var(--color-dark);\n  text-align: center;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.product-detail__related-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n}\n.product-detail__related-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  background-color: var(--color-product-card-bg);\n  border-radius: 20px;\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s ease;\n}\n.product-detail__related-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-card);\n}\n.product-detail__related-img-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: var(--color-bg-card);\n  height: 256px;\n  overflow: hidden;\n}\n.product-detail__related-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-detail__related-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: flex-end;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.product-detail__related-card[_ngcontent-%COMP%]:hover   .product-detail__related-overlay[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.product-detail__related-quick-view[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--color-dark);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 16px;\n}\n.product-detail__related-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6.8px;\n  padding: 0 16px 24px;\n  text-align: center;\n}\n.product-detail__related-collection[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-detail__related-name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.4;\n}\n.product-detail__related-price[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 400;\n  color: var(--color-price);\n  line-height: 1.3;\n}\n.product-detail__chatbot[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 32px;\n  right: 32px;\n  width: 85px;\n  height: 85px;\n  background-color: var(--color-primary);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 100;\n  transition: opacity 0.2s;\n}\n.product-detail__chatbot[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.product-detail__chatbot[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 75px;\n  height: 79px;\n  object-fit: contain;\n}\n/*# sourceMappingURL=product-detail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductDetailComponent, [{
    type: Component,
    args: [{ selector: "app-product-detail", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="product-detail">

  <!-- Breadcrumb -->
  <nav class="product-detail__breadcrumb" aria-label="Breadcrumb">
    <a routerLink="/" class="product-detail__breadcrumb-link">DANH M\u1EE4C S\u1EA2N PH\u1EA8M</a>
    <span class="product-detail__breadcrumb-sep">\u203A</span>
    <a routerLink="/products" class="product-detail__breadcrumb-link">NH\u1EAAN</a>
    <span class="product-detail__breadcrumb-sep">\u203A</span>
    <span class="product-detail__breadcrumb-current">{{ product().name }}</span>
  </nav>

  <!-- Product Main -->
  <section class="product-detail__main">

    <!-- Gallery -->
    <div class="product-detail__gallery">
      <div class="product-detail__gallery-thumbnails">
        @for (img of product().images; track $index) {
          <button
            class="product-detail__thumb-btn"
            [class.product-detail__thumb-btn--active]="activeImageIndex() === $index"
            type="button"
            (click)="selectImage($index)"
          >
            <img [src]="img" [alt]="product().name + ' - \u1EA3nh ' + ($index + 1)" class="product-detail__thumb-img" />
          </button>
        }
      </div>
      <div class="product-detail__gallery-main">
        <img
          [src]="product().images[activeImageIndex()]"
          [alt]="product().name"
          class="product-detail__main-img"
        />
      </div>
    </div>

    <!-- Product Info -->
    <div class="product-detail__info">
      <p class="product-detail__collection">{{ product().collection }}</p>
      <h1 class="product-detail__name">{{ product().name }}</h1>

      <div class="product-detail__price-row">
        <span class="product-detail__price">{{ formatPrice(product().price) }}</span>
        @if (product().inStock) {
          <span class="product-detail__stock-badge">S\u1EB4N C\xD3</span>
        }
      </div>

      <p class="product-detail__desc">{{ product().description }}</p>

      <!-- Size Selector -->
      <div class="product-detail__size-section">
        <p class="product-detail__size-label">K\xCDCH TH\u01AF\u1EDAC (SIZE)</p>
        <div class="product-detail__size-options">
          @for (size of product().sizes; track size) {
            <button
              class="product-detail__size-btn"
              [class.product-detail__size-btn--active]="selectedSize() === size"
              type="button"
              (click)="selectSize(size)"
            >
              {{ size }}
            </button>
          }
        </div>
        <a class="product-detail__size-guide" routerLink=".">H\u01AF\u1EDANG D\u1EAAN CH\u1ECCN SIZE</a>
      </div>

      <!-- CTA Buttons -->
      <div class="product-detail__cta">
        <button class="product-detail__btn product-detail__btn--primary" type="button">
          TH\xCAM V\xC0O GI\u1ECE H\xC0NG
        </button>
        <button class="product-detail__btn product-detail__btn--secondary" type="button">
          MUA NGAY
        </button>
      </div>

      <!-- Service Info -->
      <div class="product-detail__services">
        <div class="product-detail__service-item">
          <img src="/icons/ic-feature-warranty.png" alt="" class="product-detail__service-icon" />
          <span class="product-detail__service-text">MI\u1EC4N PH\xCD V\u1EACN CHUY\u1EC2N TO\xC0N QU\u1ED0C</span>
        </div>
        <div class="product-detail__service-item">
          <img src="/icons/ic-feature-quality.png" alt="" class="product-detail__service-icon" />
          <span class="product-detail__service-text">B\u1EA2O H\xC0NH TR\u1ECCN \u0110\u1EDCI &amp; KI\u1EC2M \u0110\u1ECANH GIA</span>
        </div>
      </div>
    </div>

  </section>

  <!-- Product Specs -->
  <section class="product-detail__specs">
    <h2 class="product-detail__specs-title">TH\xD4NG S\u1ED0 CHI TI\u1EBET</h2>
    <div class="product-detail__specs-grid">
      @for (spec of specs; track spec.label; let last = $last) {
        <div class="product-detail__spec-item" [class.product-detail__spec-item--last]="last">
          <p class="product-detail__spec-label">{{ spec.label }}</p>
          <p class="product-detail__spec-value">{{ spec.value }}</p>
        </div>
      }
    </div>
  </section>

  <!-- Customer Reviews -->
  <section class="product-detail__reviews">
    <h2 class="product-detail__reviews-title">\u0110\xC1NH GI\xC1 T\u1EEA KH\xC1CH H\xC0NG ({{ reviewCount() }})</h2>
    <div class="product-detail__reviews-grid">
      @for (review of reviews(); track review.id) {
        <div class="product-detail__review-card">
          <div class="product-detail__review-header">
            <span class="product-detail__review-name">{{ review.name }}</span>
            <div class="product-detail__review-stars" aria-label="{{ review.rating }} sao">
              @for (star of stars; track star) {
                <img src="/icons/ic-star.png" alt="\u2605" class="product-detail__review-star" />
              }
            </div>
          </div>
          <img [src]="review.imageUrl" [alt]="review.name" class="product-detail__review-img" />
          <p class="product-detail__review-quote">{{ review.quote }}</p>
          <p class="product-detail__review-date">{{ review.date }}</p>
        </div>
      }
    </div>
  </section>

  <!-- Related Products -->
  <section class="product-detail__related">
    <h2 class="product-detail__related-title">S\u1EA2N PH\u1EA8M LI\xCAN QUAN</h2>
    <div class="product-detail__related-grid">
      @for (item of relatedProducts(); track item.id) {
        <a [routerLink]="['/products', item.id]" class="product-detail__related-card">
          <div class="product-detail__related-img-wrap">
            <img [src]="item.imageUrl" [alt]="item.name" class="product-detail__related-img" />
            <div class="product-detail__related-overlay">
              <span class="product-detail__related-quick-view">QUICK VIEW</span>
            </div>
          </div>
          <div class="product-detail__related-info">
            <span class="product-detail__related-collection">{{ item.collection }}</span>
            <h3 class="product-detail__related-name">{{ item.name }}</h3>
            <p class="product-detail__related-price">{{ formatPrice(item.price) }}</p>
          </div>
        </a>
      }
    </div>
  </section>

</div>

<!-- Chatbot FAB -->
<button class="product-detail__chatbot" aria-label="M\u1EDF chatbot h\u1ED7 tr\u1EE3">
  <img src="/icons/ic-chatbot.png" alt="Chatbot" />
</button>
`, styles: ["/* src/app/products/product-detail/product-detail.component.css */\n.product-detail {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 56px 80px;\n}\n.product-detail__breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 24px 0;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-detail__breadcrumb-link {\n  color: var(--color-muted);\n}\n.product-detail__breadcrumb-link:hover {\n  color: var(--color-primary);\n}\n.product-detail__breadcrumb-sep {\n  color: var(--color-muted);\n  font-size: 18px;\n  line-height: 1;\n}\n.product-detail__breadcrumb-current {\n  color: var(--color-dark);\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.product-detail__main {\n  display: grid;\n  grid-template-columns: 620px 1fr;\n  gap: 48px;\n  padding-bottom: 48px;\n}\n.product-detail__gallery {\n  display: flex;\n  gap: 16px;\n}\n.product-detail__gallery-thumbnails {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  width: 80px;\n  flex-shrink: 0;\n  overflow-y: auto;\n  max-height: 600px;\n}\n.product-detail__thumb-btn {\n  width: 80px;\n  height: 96px;\n  border: 1px solid rgba(196, 199, 199, 0.3);\n  overflow: hidden;\n  padding: 1px;\n  background: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n}\n.product-detail__thumb-btn--active {\n  border-color: var(--color-dark);\n}\n.product-detail__thumb-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-detail__gallery-main {\n  flex: 1;\n  height: 600px;\n  overflow: hidden;\n  position: relative;\n  background-color: var(--color-bg-card);\n}\n.product-detail__main-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-detail__info {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding-top: 8px;\n}\n.product-detail__collection {\n  font-family: var(--font-ui);\n  font-size: 12px;\n  font-weight: 400;\n  color: var(--color-primary);\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n}\n.product-detail__name {\n  font-family: var(--font-serif);\n  font-size: 40px;\n  font-weight: 400;\n  color: #1b1c1c;\n  line-height: 1.3;\n}\n.product-detail__price-row {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.product-detail__price {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.4;\n}\n.product-detail__stock-badge {\n  font-family: var(--font-ui);\n  font-size: 10px;\n  font-weight: 400;\n  color: var(--color-muted);\n  background-color: #efeded;\n  padding: 4px 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.product-detail__desc {\n  font-family: var(--font-ui);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.625;\n}\n.product-detail__size-section {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.product-detail__size-label {\n  font-family: var(--font-ui);\n  font-size: 11px;\n  font-weight: 400;\n  color: #1b1c1c;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.product-detail__size-options {\n  display: flex;\n  gap: 12px;\n}\n.product-detail__size-btn {\n  width: 40px;\n  height: 40px;\n  border: 1px solid rgba(196, 199, 199, 0.5);\n  background: none;\n  cursor: pointer;\n  font-family: var(--font-ui);\n  font-size: 14px;\n  color: #1b1c1c;\n  transition: border-color 0.2s, background-color 0.2s;\n}\n.product-detail__size-btn--active {\n  border-color: var(--color-dark);\n  border-width: 2px;\n  font-weight: 600;\n}\n.product-detail__size-btn:hover:not(.product-detail__size-btn--active) {\n  border-color: var(--color-primary);\n}\n.product-detail__size-guide {\n  font-family: var(--font-ui);\n  font-size: 11px;\n  color: #1b1c1c;\n  text-transform: uppercase;\n  border-bottom: 1px solid var(--color-dark);\n  padding-bottom: 2px;\n  width: fit-content;\n}\n.product-detail__cta {\n  display: flex;\n  gap: 20px;\n}\n.product-detail__btn {\n  flex: 1;\n  padding: 20px 24px;\n  font-family: var(--font-ui);\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.product-detail__btn--primary {\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  border: none;\n  max-width: 301px;\n}\n.product-detail__btn--secondary {\n  background-color: var(--color-primary-light);\n  color: var(--color-dark);\n  border: 1px solid var(--color-primary);\n}\n.product-detail__btn:hover {\n  opacity: 0.88;\n}\n.product-detail__services {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding-top: 16px;\n  border-top: 1px solid rgba(196, 199, 199, 0.3);\n}\n.product-detail__service-item {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.product-detail__service-icon {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.product-detail__service-text {\n  font-family: var(--font-ui);\n  font-size: 14px;\n  color: var(--color-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.product-detail__specs {\n  background-color: var(--color-product-card-bg);\n  padding: 32px 48px;\n  margin: 0 -56px;\n}\n.product-detail__specs-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-primary);\n  text-align: center;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.product-detail__specs-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  border-top: 1px solid rgba(196, 199, 199, 0.3);\n  border-bottom: 1px solid rgba(196, 199, 199, 0.3);\n  padding: 49px 0;\n}\n.product-detail__spec-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 0 32px;\n  border-right: 1px solid rgba(196, 199, 199, 0.2);\n}\n.product-detail__spec-item--last {\n  border-right: none;\n}\n.product-detail__spec-label {\n  font-family: var(--font-sans);\n  font-size: 20px;\n  font-weight: 500;\n  color: var(--color-muted);\n  text-align: center;\n  text-transform: uppercase;\n  line-height: 1.2;\n}\n.product-detail__spec-value {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  font-weight: 400;\n  color: #1b1c1c;\n  text-align: center;\n  line-height: 1.56;\n}\n.product-detail__reviews {\n  background-color: rgba(196, 96, 126, 0.7);\n  padding: 32px 48px 48px;\n  margin: 0 -56px;\n}\n.product-detail__reviews-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-primary-light);\n  text-align: center;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.product-detail__reviews-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n  max-width: 1080px;\n  margin: 0 auto;\n}\n.product-detail__review-card {\n  background-color: rgba(255, 255, 255, 0.73);\n  border-radius: 20px;\n  overflow: hidden;\n  padding: 16px 19px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.product-detail__review-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.product-detail__review-name {\n  font-family: var(--font-ui);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-black);\n  text-transform: uppercase;\n}\n.product-detail__review-stars {\n  display: flex;\n  gap: 4px;\n}\n.product-detail__review-star {\n  width: 12px;\n  height: 11px;\n}\n.product-detail__review-img {\n  width: 94px;\n  height: 94px;\n  object-fit: cover;\n  margin-bottom: 16px;\n}\n.product-detail__review-quote {\n  font-family: var(--font-ui);\n  font-size: 16px;\n  font-style: italic;\n  color: var(--color-muted);\n  line-height: 1.5;\n  margin-bottom: 24px;\n}\n.product-detail__review-date {\n  font-family: var(--font-ui);\n  font-size: 10px;\n  color: #747878;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border-top: 1px solid rgba(196, 199, 199, 0.3);\n  padding-top: 12px;\n  margin-top: auto;\n}\n.product-detail__related {\n  padding-top: 48px;\n}\n.product-detail__related-title {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 500;\n  color: var(--color-dark);\n  text-align: center;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.product-detail__related-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n}\n.product-detail__related-card {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  background-color: var(--color-product-card-bg);\n  border-radius: 20px;\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s ease;\n}\n.product-detail__related-card:hover {\n  box-shadow: var(--shadow-card);\n}\n.product-detail__related-img-wrap {\n  position: relative;\n  background-color: var(--color-bg-card);\n  height: 256px;\n  overflow: hidden;\n}\n.product-detail__related-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-detail__related-overlay {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: flex-end;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.product-detail__related-card:hover .product-detail__related-overlay {\n  opacity: 1;\n}\n.product-detail__related-quick-view {\n  width: 100%;\n  background-color: var(--color-dark);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 16px;\n}\n.product-detail__related-info {\n  display: flex;\n  flex-direction: column;\n  gap: 6.8px;\n  padding: 0 16px 24px;\n  text-align: center;\n}\n.product-detail__related-collection {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-detail__related-name {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.4;\n}\n.product-detail__related-price {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 400;\n  color: var(--color-price);\n  line-height: 1.3;\n}\n.product-detail__chatbot {\n  position: fixed;\n  bottom: 32px;\n  right: 32px;\n  width: 85px;\n  height: 85px;\n  background-color: var(--color-primary);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 100;\n  transition: opacity 0.2s;\n}\n.product-detail__chatbot:hover {\n  opacity: 0.9;\n}\n.product-detail__chatbot img {\n  width: 75px;\n  height: 79px;\n  object-fit: contain;\n}\n/*# sourceMappingURL=product-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "src/app/products/product-detail/product-detail.component.ts", lineNumber: 29 });
})();
export {
  ProductDetailComponent
};
//# sourceMappingURL=chunk-5TA455RY.js.map
