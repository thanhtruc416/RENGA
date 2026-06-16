import "./chunk-GOMI4DH3.js";

// src/app/products/products.routes.ts
var productsRoutes = [
  {
    path: "",
    loadComponent: () => import("./chunk-UC67CLOG.js").then((m) => m.ProductListComponent)
  },
  {
    path: ":id",
    loadComponent: () => import("./chunk-5TA455RY.js").then((m) => m.ProductDetailComponent)
  }
];
export {
  productsRoutes
};
//# sourceMappingURL=chunk-64RWJSWP.js.map
