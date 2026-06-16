import {
  ProductsService,
  toObservable,
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
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/products/product-list/product-list.component.ts
var _c0 = (a0) => ["/products", a0];
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function ProductListComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 9)(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 19);
    \u0275\u0275element(4, "path", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const filter_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(filter_r1.label);
  }
}
function ProductListComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11)(1, "div", 21);
    \u0275\u0275element(2, "img", 22);
    \u0275\u0275elementStart(3, "div", 23)(4, "span", 24);
    \u0275\u0275text(5, "QUICK VIEW");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 25)(7, "span", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h3", 27);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 28);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, product_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", product_r2.imageUrl, \u0275\u0275sanitizeUrl)("alt", product_r2.name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(product_r2.collection);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatPrice(product_r2.price));
  }
}
var CATEGORY_NAMES = {
  "nhan": "Nh\u1EABn",
  "day-chuyen": "D\xE2y Chuy\u1EC1n",
  "hoa-tai": "Hoa Tai",
  "lac-tay": "L\u1EAFc Tay & V\xF2ng Tay",
  "charm": "Charm"
};
var CATEGORY_DESCS = {
  "nhan": "M\u1ED7i tuy\u1EC7t t\xE1c nh\u1EABn t\u1EEB RENGA l\xE0 s\u1EF1 k\u1EBFt tinh gi\u1EEFa ngh\u1EC7 thu\u1EADt ch\u1EBF t\xE1c th\u1EE7 c\xF4ng di s\u1EA3n v\xE0 v\u1EBB \u0111\u1EB9p v\u0129nh c\u1EEDu c\u1EE7a nh\u1EEFng vi\xEAn \u0111\xE1 qu\xFD hi\u1EBFm nh\u1EA5t.",
  "day-chuyen": "D\xE2y chuy\u1EC1n RENGA \u2014 t\u1EEBng m\u1EAFt x\xEDch \u0111\u01B0\u1EE3c ch\u1EBF t\xE1c t\u1EC9 m\u1EC9, n\xE2ng t\u1EA7m phong c\xE1ch v\u1EDBi v\u1EBB \u0111\u1EB9p thanh l\u1ECBch v\xE0 tinh t\u1EBF.",
  "hoa-tai": "Hoa tai RENGA mang \u0111\u1EBFn s\u1EF1 ho\xE0n h\u1EA3o cho t\u1EEBng kho\u1EA3nh kh\u1EAFc, t\u1EEB nh\u1EB9 nh\xE0ng tinh t\u1EBF \u0111\u1EBFn sang tr\u1ECDng cu\u1ED1n h\xFAt.",
  "lac-tay": "L\u1EAFc tay & v\xF2ng tay RENGA \u2014 \u0111i\u1EC3m nh\u1EA5n th\u1EDDi th\u01B0\u1EE3ng tr\xEAn c\u1ED5 tay, k\u1EC3 c\xE2u chuy\u1EC7n ri\xEAng c\u1EE7a ch\u1EE7 nh\xE2n.",
  "charm": "Charm RENGA \u2014 nh\u1EEFng bi\u1EC3u t\u01B0\u1EE3ng nh\u1ECF xinh mang theo \xFD ngh\u0129a l\u1EDBn lao, c\xE1 nh\xE2n h\xF3a phong c\xE1ch c\u1EE7a ri\xEAng b\u1EA1n."
};
var ProductListComponent = class _ProductListComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  activeCategory = toSignal(this.route.queryParamMap.pipe(map((p) => p.get("category") ?? "nhan")), { initialValue: this.route.snapshot.queryParamMap.get("category") ?? "nhan" });
  categoryTitle = computed(
    () => CATEGORY_NAMES[this.activeCategory()] ?? "S\u1EA3n Ph\u1EA9m",
    ...ngDevMode ? [{ debugName: "categoryTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  categoryDescription = computed(
    () => CATEGORY_DESCS[this.activeCategory()] ?? "",
    ...ngDevMode ? [{ debugName: "categoryDescription" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Khi activeCategory thay đổi → tự động gọi lại service.getProducts()
  // Sau này chỉ cần đổi of([...]) trong service thành http.get() là xong
  products = toSignal(toObservable(this.activeCategory).pipe(switchMap((category) => this.productsService.getProducts(category))), { initialValue: [] });
  filters = [
    { key: "chat-lieu", label: "CH\u1EA4T LI\u1EC6U" },
    { key: "khoang-gia", label: "KHO\u1EA2NG GI\xC1" },
    { key: "loai-da", label: "LO\u1EA0I \u0110\xC1" },
    { key: "ban-chay", label: "B\xC1N CH\u1EA0Y" }
  ];
  displayCount = signal(
    8,
    ...ngDevMode ? [{ debugName: "displayCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalCount = computed(
    () => this.products().length,
    ...ngDevMode ? [{ debugName: "totalCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  displayedProducts = computed(
    () => this.products().slice(0, this.displayCount()),
    ...ngDevMode ? [{ debugName: "displayedProducts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formatPrice(price) {
    return price.toLocaleString("vi-VN") + "\u0111";
  }
  loadMore() {
    this.displayCount.update((count) => count + 8);
  }
  static \u0275fac = function ProductListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["app-product-list"]], decls: 27, vars: 5, consts: [[1, "product-list"], ["aria-label", "Breadcrumb", 1, "product-list__breadcrumb"], ["routerLink", "/", 1, "product-list__breadcrumb-link"], [1, "product-list__breadcrumb-sep"], [1, "product-list__breadcrumb-current"], [1, "product-list__hero"], [1, "product-list__hero-title"], [1, "product-list__hero-desc"], ["role", "group", "aria-label", "B\u1ED9 l\u1ECDc s\u1EA3n ph\u1EA9m", 1, "product-list__filters"], ["type", "button", 1, "product-list__filter-btn"], [1, "product-list__grid"], [1, "product-list__card", 3, "routerLink"], [1, "product-list__pagination"], [1, "product-list__pagination-count"], [1, "product-list__pagination-divider"], ["type", "button", 1, "product-list__load-more", 3, "click"], ["aria-label", "M\u1EDF chatbot h\u1ED7 tr\u1EE3", 1, "product-list__chatbot"], ["src", "/icons/ic-chatbot.png", "alt", "Chatbot"], [1, "product-list__filter-label"], ["width", "9", "height", "6", "viewBox", "0 0 9 6", "fill", "none", 1, "product-list__filter-chevron"], ["d", "M1 1L4.5 5L8 1", "stroke", "#1a1c1c", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "product-list__card-img-wrap"], [1, "product-list__card-img", 3, "src", "alt"], [1, "product-list__card-overlay"], [1, "product-list__card-quick-view"], [1, "product-list__card-info"], [1, "product-list__card-collection"], [1, "product-list__card-name"], [1, "product-list__card-price"]], template: function ProductListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "a", 2);
      \u0275\u0275text(3, "DANH M\u1EE4C S\u1EA2N PH\u1EA8M");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 3);
      \u0275\u0275text(5, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 5)(9, "h1", 6);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p", 7);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8);
      \u0275\u0275repeaterCreate(14, ProductListComponent_For_15_Template, 5, 1, "button", 9, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "section", 10);
      \u0275\u0275repeaterCreate(17, ProductListComponent_For_18_Template, 13, 8, "a", 11, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "footer", 12)(20, "p", 13);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "div", 14);
      \u0275\u0275elementStart(23, "button", 15);
      \u0275\u0275listener("click", function ProductListComponent_Template_button_click_23_listener() {
        return ctx.loadMore();
      });
      \u0275\u0275text(24, "T\u1EA2I TH\xCAM");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "button", 16);
      \u0275\u0275element(26, "img", 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.categoryTitle());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.categoryTitle());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.categoryDescription());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filters);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.displayedProducts());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2("HI\u1EC2N TH\u1ECA ", ctx.displayCount(), " TR\xCAN ", ctx.totalCount(), " S\u1EA2N PH\u1EA8M");
    }
  }, dependencies: [RouterLink], styles: ["\n.product-list[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 56px 80px;\n}\n.product-list__breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 24px 0;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-list__breadcrumb-link[_ngcontent-%COMP%] {\n  color: var(--color-muted);\n}\n.product-list__breadcrumb-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.product-list__breadcrumb-sep[_ngcontent-%COMP%] {\n  color: var(--color-muted);\n  font-size: 18px;\n  line-height: 1;\n}\n.product-list__breadcrumb-current[_ngcontent-%COMP%] {\n  color: var(--color-dark);\n  font-weight: 700;\n}\n.product-list__hero[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px 0 24px;\n}\n.product-list__hero-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-dark);\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin-bottom: 16px;\n}\n.product-list__hero-desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-style: italic;\n  font-weight: 500;\n  color: var(--color-primary);\n  line-height: 1.6;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.product-list__filters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  background-color: var(--color-primary-light);\n  padding: 20px 45px;\n  margin: 24px -56px 32px;\n}\n.product-list__filter-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 80px 0 0;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  transition: color 0.2s;\n}\n.product-list__filter-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.product-list__filter-btn[_ngcontent-%COMP%]:last-child {\n  padding-right: 0;\n}\n.product-list__filter-chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.product-list__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n  margin-bottom: 48px;\n}\n.product-list__card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  background-color: var(--color-product-card-bg);\n  border-radius: 20px;\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s ease;\n}\n.product-list__card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-card);\n}\n.product-list__card-img-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: var(--color-bg-card);\n  height: 256px;\n  overflow: hidden;\n}\n.product-list__card-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-list__card-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: flex-end;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.product-list__card[_ngcontent-%COMP%]:hover   .product-list__card-overlay[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.product-list__card-quick-view[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--color-dark);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 16px;\n}\n.product-list__card-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6.8px;\n  padding: 0 16px 24px;\n  text-align: center;\n}\n.product-list__card-collection[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-list__card-name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.4;\n}\n.product-list__card-price[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 400;\n  color: var(--color-price);\n  line-height: 1.3;\n}\n.product-list__pagination[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 0 32px;\n}\n.product-list__pagination-count[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-list__pagination-divider[_ngcontent-%COMP%] {\n  width: 256px;\n  height: 1px;\n  background-color: rgba(196, 199, 199, 0.5);\n}\n.product-list__load-more[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-dark);\n  padding: 21px 49px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.product-list__load-more[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-dark);\n  color: var(--color-white);\n}\n.product-list__chatbot[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 32px;\n  right: 32px;\n  width: 85px;\n  height: 85px;\n  background-color: var(--color-primary);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 100;\n  transition: opacity 0.2s;\n}\n.product-list__chatbot[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.product-list__chatbot[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 75px;\n  height: 79px;\n  object-fit: contain;\n}\n/*# sourceMappingURL=product-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductListComponent, [{
    type: Component,
    args: [{ selector: "app-product-list", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="product-list">

  <!-- Breadcrumb -->
  <nav class="product-list__breadcrumb" aria-label="Breadcrumb">
    <a routerLink="/" class="product-list__breadcrumb-link">DANH M\u1EE4C S\u1EA2N PH\u1EA8M</a>
    <span class="product-list__breadcrumb-sep">\u203A</span>
    <span class="product-list__breadcrumb-current">{{ categoryTitle() }}</span>
  </nav>

  <!-- Page Hero -->
  <section class="product-list__hero">
    <h1 class="product-list__hero-title">{{ categoryTitle() }}</h1>
    <p class="product-list__hero-desc">{{ categoryDescription() }}</p>
  </section>

  <!-- Filter Bar -->
  <div class="product-list__filters" role="group" aria-label="B\u1ED9 l\u1ECDc s\u1EA3n ph\u1EA9m">
    @for (filter of filters; track filter.key) {
      <button class="product-list__filter-btn" type="button">
        <span class="product-list__filter-label">{{ filter.label }}</span>
        <svg class="product-list__filter-chevron" width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1 1L4.5 5L8 1" stroke="#1a1c1c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    }
  </div>

  <!-- Product Grid -->
  <section class="product-list__grid">
    @for (product of displayedProducts(); track product.id) {
      <a [routerLink]="['/products', product.id]" class="product-list__card">
        <div class="product-list__card-img-wrap">
          <img [src]="product.imageUrl" [alt]="product.name" class="product-list__card-img" />
          <div class="product-list__card-overlay">
            <span class="product-list__card-quick-view">QUICK VIEW</span>
          </div>
        </div>
        <div class="product-list__card-info">
          <span class="product-list__card-collection">{{ product.collection }}</span>
          <h3 class="product-list__card-name">{{ product.name }}</h3>
          <p class="product-list__card-price">{{ formatPrice(product.price) }}</p>
        </div>
      </a>
    }
  </section>

  <!-- Pagination -->
  <footer class="product-list__pagination">
    <p class="product-list__pagination-count">HI\u1EC2N TH\u1ECA {{ displayCount() }} TR\xCAN {{ totalCount() }} S\u1EA2N PH\u1EA8M</p>
    <div class="product-list__pagination-divider"></div>
    <button class="product-list__load-more" type="button" (click)="loadMore()">T\u1EA2I TH\xCAM</button>
  </footer>

</div>

<!-- Chatbot FAB -->
<button class="product-list__chatbot" aria-label="M\u1EDF chatbot h\u1ED7 tr\u1EE3">
  <img src="/icons/ic-chatbot.png" alt="Chatbot" />
</button>
`, styles: ["/* src/app/products/product-list/product-list.component.css */\n.product-list {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 56px 80px;\n}\n.product-list__breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 24px 0;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-list__breadcrumb-link {\n  color: var(--color-muted);\n}\n.product-list__breadcrumb-link:hover {\n  color: var(--color-primary);\n}\n.product-list__breadcrumb-sep {\n  color: var(--color-muted);\n  font-size: 18px;\n  line-height: 1;\n}\n.product-list__breadcrumb-current {\n  color: var(--color-dark);\n  font-weight: 700;\n}\n.product-list__hero {\n  text-align: center;\n  padding: 32px 0 24px;\n}\n.product-list__hero-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-dark);\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin-bottom: 16px;\n}\n.product-list__hero-desc {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-style: italic;\n  font-weight: 500;\n  color: var(--color-primary);\n  line-height: 1.6;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.product-list__filters {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  background-color: var(--color-primary-light);\n  padding: 20px 45px;\n  margin: 24px -56px 32px;\n}\n.product-list__filter-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 80px 0 0;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  transition: color 0.2s;\n}\n.product-list__filter-btn:hover {\n  color: var(--color-primary);\n}\n.product-list__filter-btn:last-child {\n  padding-right: 0;\n}\n.product-list__filter-chevron {\n  flex-shrink: 0;\n}\n.product-list__grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n  margin-bottom: 48px;\n}\n.product-list__card {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  background-color: var(--color-product-card-bg);\n  border-radius: 20px;\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s ease;\n}\n.product-list__card:hover {\n  box-shadow: var(--shadow-card);\n}\n.product-list__card-img-wrap {\n  position: relative;\n  background-color: var(--color-bg-card);\n  height: 256px;\n  overflow: hidden;\n}\n.product-list__card-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-list__card-overlay {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: flex-end;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.product-list__card:hover .product-list__card-overlay {\n  opacity: 1;\n}\n.product-list__card-quick-view {\n  width: 100%;\n  background-color: var(--color-dark);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 16px;\n}\n.product-list__card-info {\n  display: flex;\n  flex-direction: column;\n  gap: 6.8px;\n  padding: 0 16px 24px;\n  text-align: center;\n}\n.product-list__card-collection {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-list__card-name {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1.4;\n}\n.product-list__card-price {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  font-weight: 400;\n  color: var(--color-price);\n  line-height: 1.3;\n}\n.product-list__pagination {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 0 32px;\n}\n.product-list__pagination-count {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.product-list__pagination-divider {\n  width: 256px;\n  height: 1px;\n  background-color: rgba(196, 199, 199, 0.5);\n}\n.product-list__load-more {\n  border: 1px solid var(--color-dark);\n  padding: 21px 49px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.product-list__load-more:hover {\n  background-color: var(--color-dark);\n  color: var(--color-white);\n}\n.product-list__chatbot {\n  position: fixed;\n  bottom: 32px;\n  right: 32px;\n  width: 85px;\n  height: 85px;\n  background-color: var(--color-primary);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 100;\n  transition: opacity 0.2s;\n}\n.product-list__chatbot:hover {\n  opacity: 0.9;\n}\n.product-list__chatbot img {\n  width: 75px;\n  height: 79px;\n  object-fit: contain;\n}\n/*# sourceMappingURL=product-list.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src/app/products/product-list/product-list.component.ts", lineNumber: 36 });
})();
export {
  ProductListComponent
};
//# sourceMappingURL=chunk-UC67CLOG.js.map
