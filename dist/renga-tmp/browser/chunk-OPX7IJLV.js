import {
  HttpClient
} from "./chunk-TYNORSOC.js";
import {
  DestroyRef,
  Injectable,
  Injector,
  ReplaySubject,
  RuntimeError,
  assertInInjectionContext,
  assertNotInReactiveContext,
  computed,
  effect,
  inject,
  of,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineInjectable
} from "./chunk-HH4CWJAK.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
/**
 * @license Angular v22.0.1
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
function toObservable(source, options) {
  if (ngDevMode && !options?.injector) {
    assertInInjectionContext(toObservable);
  }
  const injector = options?.injector ?? inject(Injector);
  const subject = new ReplaySubject(1);
  const watcher = effect(() => {
    let value;
    try {
      value = source();
    } catch (err) {
      untracked(() => subject.error(err));
      return;
    }
    untracked(() => subject.next(value));
  }, {
    injector,
    manualCleanup: true
  });
  injector.get(DestroyRef).onDestroy(() => {
    watcher.destroy();
    subject.complete();
  });
  return subject.asObservable();
}
function toSignal(source, options) {
  typeof ngDevMode !== "undefined" && ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  if (ngDevMode && requiresCleanup && !options?.injector) {
    assertInInjectionContext(toSignal);
  }
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
    }, __spreadValues({
      equal
    }, ngDevMode ? createDebugNameObject(options?.debugName, "state") : void 0));
  } else {
    state = signal({
      kind: 1,
      value: options?.initialValue
    }, __spreadValues({
      equal
    }, ngDevMode ? createDebugNameObject(options?.debugName, "state") : void 0));
  }
  let destroyUnregisterFn;
  const sub = source.subscribe({
    next: (value) => state.set({
      kind: 1,
      value
    }),
    error: (error) => {
      state.set({
        kind: 2,
        error
      });
      destroyUnregisterFn?.();
    },
    complete: () => {
      destroyUnregisterFn?.();
    }
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  destroyUnregisterFn = cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, __spreadValues({
    equal: options?.equal
  }, ngDevMode ? createDebugNameObject(options?.debugName, "source") : void 0));
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}
function createDebugNameObject(toSignalDebugName, internalSignalDebugName) {
  return {
    debugName: `toSignal${toSignalDebugName ? "#" + toSignalDebugName : ""}.${internalSignalDebugName}`
  };
}

// src/app/products/products.service.ts
var ProductsService = class _ProductsService {
  http = inject(HttpClient);
  // TODO: swap to → this.http.get<Product[]>('/api/products', { params: category ? { category } : {} })
  getProducts(category) {
    const filtered = category ? MOCK_PRODUCTS.filter((p) => p.category === category) : MOCK_PRODUCTS;
    return of(filtered);
  }
  // TODO: swap to → this.http.get<ProductDetail>(`/api/products/${id}`)
  getProductById(id) {
    const found = MOCK_PRODUCT_DETAILS.find((p) => p.id === id);
    return of(found ?? MOCK_PRODUCT_DETAILS[0]);
  }
  static \u0275fac = function ProductsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductsService, factory: _ProductsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();
var MOCK_PRODUCTS = [
  { id: "1", category: "nhan", collection: "HERITAGE COLLECTION", name: "Nh\u1EABn Kim C\u01B0\u01A1ng Solitaire", price: 245e5, imageUrl: "/images/product-nhan-kim-cuong-solitaire.png" },
  { id: "2", category: "nhan", collection: "ETERNAL LOVE", name: "Nh\u1EABn Eternal Love", price: 189e5, imageUrl: "/images/product-nhan-eternal-love.png" },
  { id: "3", category: "nhan", collection: "MODERN NOIR", name: "Nh\u1EABn Emerald Modernity", price: 42e6, imageUrl: "/images/product-nhan-emerald-modernity.png" },
  { id: "4", category: "nhan", collection: "PETITE GRACE", name: "Nh\u1EABn Rose Gold Sapphire", price: 125e5, imageUrl: "/images/product-nhan-rose-gold-sapphire.png" },
  { id: "5", category: "nhan", collection: "HERITAGE COLLECTION", name: "Nh\u1EABn Kim C\u01B0\u01A1ng Solitaire", price: 245e5, imageUrl: "/images/product-nhan-kim-cuong-solitaire.png" },
  { id: "6", category: "nhan", collection: "ETERNAL LOVE", name: "Nh\u1EABn Eternal Love", price: 189e5, imageUrl: "/images/product-nhan-eternal-love.png" },
  { id: "7", category: "nhan", collection: "MODERN NOIR", name: "Nh\u1EABn Emerald Modernity", price: 42e6, imageUrl: "/images/product-nhan-emerald-modernity.png" },
  { id: "8", category: "nhan", collection: "PETITE GRACE", name: "Nh\u1EABn Rose Gold Sapphire", price: 125e5, imageUrl: "/images/product-nhan-rose-gold-sapphire.png" },
  { id: "9", category: "day-chuyen", collection: "HERITAGE COLLECTION", name: "D\xE2y Chuy\u1EC1n V\xE0ng 18K", price: 158e5, imageUrl: "/images/product-aura-diamond-studs.png" },
  { id: "10", category: "day-chuyen", collection: "ETERNAL LOVE", name: "D\xE2y Chuy\u1EC1n Moissanite", price: 22e6, imageUrl: "/images/product-eternal-gold-band.png" },
  { id: "11", category: "hoa-tai", collection: "PETITE GRACE", name: "Hoa Tai Kim C\u01B0\u01A1ng", price: 185e5, imageUrl: "/images/product-aura-diamond-studs.png" },
  { id: "12", category: "hoa-tai", collection: "MODERN NOIR", name: "Hoa Tai V\xE0ng H\u1ED3ng", price: 98e5, imageUrl: "/images/product-silk-gold-bangle.png" },
  { id: "13", category: "lac-tay", collection: "HERITAGE COLLECTION", name: "L\u1EAFc Tay V\xE0ng Tr\u1EAFng", price: 28e6, imageUrl: "/images/product-silk-gold-bangle.png" },
  { id: "14", category: "lac-tay", collection: "ETERNAL LOVE", name: "V\xF2ng Tay Charm", price: 75e5, imageUrl: "/images/product-eternal-gold-band.png" },
  { id: "15", category: "charm", collection: "PETITE GRACE", name: "Charm Tr\xE1i Tim", price: 32e5, imageUrl: "/images/product-solo-sparkle-pendant.png" },
  { id: "16", category: "charm", collection: "MODERN NOIR", name: "Charm B\u01B0\u1EDBm V\xE0ng", price: 41e5, imageUrl: "/images/product-solo-sparkle-pendant.png" }
];
var MOCK_PRODUCT_DETAILS = [
  {
    id: "1",
    category: "nhan",
    collection: "BST HO\xC0NG GIA 2026",
    name: "Nh\u1EABn Kim C\u01B0\u01A1ng Aeterna",
    price: 85e6,
    imageUrl: "/images/product-detail-nhan-aeterna-1.png",
    description: "M\u1ED9t minh ch\u1EE9ng cho s\u1EF1 tinh x\u1EA3o v\u01B0\u1EE3t th\u1EDDi gian, chi\u1EBFc nh\u1EABn RENGA mang vi\xEAn kim c\u01B0\u01A1ng c\u1EAFt Brilliant 1.5 carat \u0111\u1EB7t gi\u1EEFa v\xF2ng h\xE0o quang pav\xE9 r\u1EF1c r\u1EE1, \u0111\u01B0\u1EE3c ch\u1EBF t\xE1c th\u1EE7 c\xF4ng tr\xEAn n\u1EC1n v\xE0ng tr\u1EAFng 18k chu\u1EA9n \xDD.",
    material: "V\xE0ng Tr\u1EAFng 18K, Kim c\u01B0\u01A1ng thi\xEAn nhi\xEAn",
    sizes: [10, 11, 12, 13],
    images: [
      "/images/product-detail-nhan-aeterna-1.png",
      "/images/product-detail-nhan-aeterna-2.png",
      "/images/product-detail-nhan-aeterna-3.png",
      "/images/product-detail-nhan-aeterna-4.png"
    ],
    inStock: true
  },
  ...MOCK_PRODUCTS.slice(1).map((p) => __spreadProps(__spreadValues({}, p), {
    description: "\u0110\u01B0\u1EE3c ch\u1EBF t\xE1c t\u1EC9 m\u1EC9 t\u1EEB nh\u1EEFng nguy\xEAn li\u1EC7u qu\xFD gi\xE1 nh\u1EA5t, s\u1EA3n ph\u1EA9m RENGA l\xE0 bi\u1EC3u t\u01B0\u1EE3ng c\u1EE7a s\u1EF1 sang tr\u1ECDng v\xE0 tinh t\u1EBF.",
    material: "V\xE0ng 18K",
    sizes: [10, 11, 12, 13],
    images: [p.imageUrl],
    inStock: true
  }))
];

export {
  toObservable,
  toSignal,
  ProductsService
};
//# sourceMappingURL=chunk-OPX7IJLV.js.map
