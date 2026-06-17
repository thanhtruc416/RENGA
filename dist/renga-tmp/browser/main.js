import {
  AuthService
} from "./chunk-H2E3UNRK.js";
import {
  HttpClient,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  bootstrapApplication,
  provideHttpClient,
  provideRouter,
  withInterceptors
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Injectable,
  catchError,
  computed,
  inject,
  provideBrowserGlobalErrorListeners,
  setClassMetadata,
  signal,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtext
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-OW5YDUK6.js").then((m) => m.HomeComponent)
  },
  {
    path: "products",
    loadChildren: () => import("./chunk-64RWJSWP.js").then((m) => m.productsRoutes)
  },
  {
    path: "studio",
    loadComponent: () => import("./chunk-4JCPX4KV.js").then((m) => m.StudioComponent)
  },
  {
    path: "the-designer",
    loadComponent: () => import("./chunk-C5WROZNW.js").then((m) => m.DesignComponent)
  },
  {
    path: "appointment-history",
    loadComponent: () => import("./chunk-BXOZIOWW.js").then((m) => m.AppointmentHistoryComponent)
  },
  {
    path: "profile",
    loadComponent: () => import("./chunk-A5RW3DBZ.js").then((m) => m.ProfileComponent)
  },
  {
    path: "profile/rewards",
    loadComponent: () => import("./chunk-XFUL65CY.js").then((m) => m.ProfileRewardsComponent)
  },
  {
    path: "danh-muc",
    loadComponent: () => import("./chunk-6UCI5UXW.js").then((m) => m.CategoriesComponent)
  },
  {
    path: "dang-ki",
    loadComponent: () => import("./chunk-IY55Z3IA.js").then((m) => m.RegisterComponent)
  },
  {
    path: "dang-nhap",
    loadComponent: () => import("./chunk-FEGGFEEU.js").then((m) => m.LoginComponent)
  },
  {
    path: "quen-mat-khau",
    loadComponent: () => import("./chunk-KIYGV45I.js").then((m) => m.ForgotPasswordComponent)
  },
  {
    path: "mat-khau-moi",
    loadComponent: () => import("./chunk-WQ54BQBC.js").then((m) => m.ResetPasswordComponent)
  },
  {
    path: "**",
    loadComponent: () => import("./chunk-RI2LAD5C.js").then((m) => m.NotFoundComponent)
  }
];

// src/app/services/auth.service.ts
var TOKEN_KEY = "renga_token";
var USER_KEY = "renga_user";
var AuthService2 = class _AuthService {
  http;
  router;
  _currentUser = signal(
    this._loadUser(),
    ...ngDevMode ? [{ debugName: "_currentUser" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _token = signal(
    this._loadToken(),
    ...ngDevMode ? [{ debugName: "_token" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(
    () => this._token() !== null,
    ...ngDevMode ? [{ debugName: "isLoggedIn" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isAdmin = computed(
    () => this._currentUser()?.role === "admin",
    ...ngDevMode ? [{ debugName: "isAdmin" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  login(payload) {
    return this.http.post("/api/auth/login", payload).pipe(tap((res) => {
      if (res.success) {
        this._saveSession(res.data.token, res.data.user);
      }
    }));
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null);
    this._token.set(null);
    this.router.navigate(["/auth/dang-nhap"]);
  }
  getToken() {
    return this._token();
  }
  _saveSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._token.set(token);
    this._currentUser.set(user);
  }
  _loadToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  _loadUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService2, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

// src/app/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const token = inject(AuthService2).getToken();
  if (!token) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(cloned);
};

// src/app/interceptors/error.interceptor.ts
var errorInterceptor = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService2);
  return next(req).pipe(catchError((err) => {
    switch (err.status) {
      case 401:
        auth.logout();
        break;
      case 403:
        router.navigate(["/"]);
        break;
      case 404:
        console.error("Kh\xF4ng t\xECm th\u1EA5y t\xE0i nguy\xEAn:", req.url);
        break;
      case 500:
        console.error("L\u1ED7i m\xE1y ch\u1EE7. Vui l\xF2ng th\u1EED l\u1EA1i sau.");
        break;
      default:
        console.error(`L\u1ED7i ${err.status}:`, err.message);
    }
    return throwError(() => err);
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))
  ]
};

// src/app/shared/components/header/header.ts
var _c0 = () => ({ exact: true });
var _c1 = () => ({ category: "nhan" });
var _c2 = () => ({ category: "day-chuyen" });
var _c3 = () => ({ category: "hoa-tai" });
var _c4 = () => ({ category: "lac-tay" });
var _c5 = () => ({ category: "charm" });
function HeaderComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 43);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 44);
    \u0275\u0275element(2, "path", 45)(3, "circle", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " T\xE0i kho\u1EA3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "button", 47);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_23_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.authService.logout();
      return \u0275\u0275resetView(ctx_r1.closeAll());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 44);
    \u0275\u0275element(7, "path", 48)(8, "polyline", 49)(9, "line", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0110\u0103ng xu\u1EA5t ");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 51);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 44);
    \u0275\u0275element(2, "path", 52)(3, "polyline", 53)(4, "line", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0110\u0103ng nh\u1EADp ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "a", 55);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 44);
    \u0275\u0275element(8, "path", 56)(9, "circle", 57)(10, "line", 58)(11, "line", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " \u0110\u0103ng k\xFD ");
    \u0275\u0275elementEnd();
  }
}
var HeaderComponent = class _HeaderComponent {
  authService = inject(AuthService);
  userMenuOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "userMenuOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openNav = signal(
    null,
    ...ngDevMode ? [{ debugName: "openNav" }] : (
      /* istanbul ignore next */
      []
    )
  );
  toggleUserMenu(e) {
    e.stopPropagation();
    this.openNav.set(null);
    this.userMenuOpen.update((v) => !v);
  }
  openNavItem(key) {
    this.userMenuOpen.set(false);
    this.openNav.set(key);
  }
  closeNavItem() {
    this.openNav.set(null);
  }
  closeAll() {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
  }
  onEscape() {
    this.userMenuOpen.set(false);
    this.openNav.set(null);
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], hostBindings: function HeaderComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function HeaderComponent_click_HostBindingHandler() {
        return ctx.closeAll();
      }, \u0275\u0275resolveDocument)("keydown.escape", function HeaderComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscape();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 79, vars: 27, consts: [[1, "site-header"], [1, "site-header__inner"], [1, "site-header__top"], ["routerLink", "/", 1, "site-header__logo-left"], ["src", "assets/images/logo-icon.png", "alt", "RENGA", "width", "44", "height", "44", 1, "site-header__logo-icon"], ["routerLink", "/", 1, "site-header__logo-center"], ["src", "assets/images/logo-wordmark.png", "alt", "RENGA", "height", "32", 1, "site-header__logo-wordmark"], [1, "site-header__actions"], ["routerLink", "/gio-hang", "aria-label", "Gi\u1ECF h\xE0ng", 1, "site-header__action-btn"], ["viewBox", "0 0 24 24"], ["d", "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["d", "M16 10a4 4 0 0 1-8 0"], ["routerLink", "/lich-su-don-hang", "aria-label", "\u0110\u01A1n h\xE0ng", 1, "site-header__action-btn"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], [1, "user-menu"], ["aria-label", "T\xE0i kho\u1EA3n", 1, "site-header__action-btn", "user-menu__trigger", 3, "click"], ["src", "https://placehold.co/45x45/f3f3f4/444748?text=U", "alt", "T\xE0i kho\u1EA3n", 1, "site-header__avatar"], [1, "user-menu__dropdown"], [1, "site-header__bottom"], ["aria-label", "Menu ch\xEDnh", 1, "site-header__nav"], [1, "site-header__nav-item"], ["routerLink", "/", 1, "site-header__nav-link", 3, "routerLinkActive", "routerLinkActiveOptions"], [1, "site-header__nav-item", 3, "mouseenter", "mouseleave"], ["routerLink", "/danh-muc", 1, "site-header__nav-link", 3, "routerLinkActive"], [1, "mega-menu"], [1, "mega-menu__col"], [1, "mega-menu__col-title"], ["routerLink", "/products", 1, "mega-menu__link", 3, "queryParams"], ["routerLink", "/bo-suu-tap", 1, "site-header__nav-link", 3, "routerLinkActive"], ["routerLink", "/bo-suu-tap", 1, "mega-menu__link"], ["routerLink", "/studio", 1, "site-header__nav-link", 3, "routerLinkActive"], ["routerLink", "/the-designer", 1, "site-header__nav-link", 3, "routerLinkActive"], ["routerLink", "/the-designer", 1, "mega-menu__link"], ["routerLink", "/appointment-history", 1, "mega-menu__link"], [1, "site-header__search"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "site-header__search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.35-4.35"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm...", 1, "site-header__search-input"], ["routerLink", "/profile", 1, "user-menu__item"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], ["type", "button", 1, "user-menu__item", "user-menu__item--btn", 3, "click"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16 17 21 12 16 7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"], ["routerLink", "/dang-nhap", 1, "user-menu__item"], ["d", "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"], ["points", "10 17 15 12 10 7"], ["x1", "15", "y1", "12", "x2", "3", "y2", "12"], ["routerLink", "/dang-ki", 1, "user-menu__item"], ["d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["x1", "19", "y1", "8", "x2", "19", "y2", "14"], ["x1", "22", "y1", "11", "x2", "16", "y2", "11"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "a", 5);
      \u0275\u0275element(6, "img", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 7)(8, "a", 8);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(9, "svg", 9);
      \u0275\u0275element(10, "path", 10)(11, "line", 11)(12, "path", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(13, "a", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(14, "svg", 9);
      \u0275\u0275element(15, "path", 14)(16, "polyline", 15)(17, "line", 16)(18, "line", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(19, "div", 18)(20, "button", 19);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_20_listener($event) {
        return ctx.toggleUserMenu($event);
      });
      \u0275\u0275element(21, "img", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 21);
      \u0275\u0275conditionalCreate(23, HeaderComponent_Conditional_23_Template, 11, 0)(24, HeaderComponent_Conditional_24_Template, 13, 0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(25, "div", 22)(26, "nav", 23)(27, "div", 24)(28, "a", 25);
      \u0275\u0275text(29, "Trang ch\u1EE7");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 26);
      \u0275\u0275listener("mouseenter", function HeaderComponent_Template_div_mouseenter_30_listener() {
        return ctx.openNavItem("danh-muc");
      })("mouseleave", function HeaderComponent_Template_div_mouseleave_30_listener() {
        return ctx.closeNavItem();
      });
      \u0275\u0275elementStart(31, "a", 27);
      \u0275\u0275text(32, "Danh m\u1EE5c S\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 28)(34, "div", 29)(35, "p", 30);
      \u0275\u0275text(36, "Danh m\u1EE5c s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "a", 31);
      \u0275\u0275text(38, "Nh\u1EABn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "a", 31);
      \u0275\u0275text(40, "D\xE2y chuy\u1EC1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "a", 31);
      \u0275\u0275text(42, "Hoa tai");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "a", 31);
      \u0275\u0275text(44, "L\u1EAFc tay & V\xF2ng tay");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "a", 31);
      \u0275\u0275text(46, "Charm");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "div", 26);
      \u0275\u0275listener("mouseenter", function HeaderComponent_Template_div_mouseenter_47_listener() {
        return ctx.openNavItem("bo-suu-tap");
      })("mouseleave", function HeaderComponent_Template_div_mouseleave_47_listener() {
        return ctx.closeNavItem();
      });
      \u0275\u0275elementStart(48, "a", 32);
      \u0275\u0275text(49, "B\u1ED9 s\u01B0u t\u1EADp");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 28)(51, "div", 29)(52, "p", 30);
      \u0275\u0275text(53, "B\u1ED9 s\u01B0u t\u1EADp");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "a", 33);
      \u0275\u0275text(55, "B\u1ED9 trang s\u1EE9c \u0111\u1ED3ng b\u1ED9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "a", 33);
      \u0275\u0275text(57, "B\u1ED9 trang s\u1EE9c c\u1EB7p \u0111\xF4i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "a", 33);
      \u0275\u0275text(59, "B\u1ED9 s\u01B0u t\u1EADp Ho\xE0ng Gia");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(60, "div", 24)(61, "a", 34);
      \u0275\u0275text(62, "The Studio");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 26);
      \u0275\u0275listener("mouseenter", function HeaderComponent_Template_div_mouseenter_63_listener() {
        return ctx.openNavItem("designer");
      })("mouseleave", function HeaderComponent_Template_div_mouseleave_63_listener() {
        return ctx.closeNavItem();
      });
      \u0275\u0275elementStart(64, "a", 35);
      \u0275\u0275text(65, "The Designer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 28)(67, "div", 29)(68, "p", 30);
      \u0275\u0275text(69, "The Designer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "a", 36);
      \u0275\u0275text(71, "\u0110\u1EB7t l\u1ECBch t\u01B0 v\u1EA5n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "a", 37);
      \u0275\u0275text(73, "L\u1ECBch t\u01B0 v\u1EA5n c\u1EE7a t\xF4i");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(74, "div", 38);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(75, "svg", 39);
      \u0275\u0275element(76, "circle", 40)(77, "path", 41);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275element(78, "input", 42);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275classProp("is-open", ctx.userMenuOpen());
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.userMenuOpen());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.authService.isLoggedIn() ? 23 : 24);
      \u0275\u0275advance(5);
      \u0275\u0275property("routerLinkActive", "is-active")("routerLinkActiveOptions", \u0275\u0275pureFunction0(21, _c0));
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-open", ctx.openNav() === "danh-muc");
      \u0275\u0275advance();
      \u0275\u0275property("routerLinkActive", "is-active");
      \u0275\u0275advance(6);
      \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(22, _c1));
      \u0275\u0275advance(2);
      \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(23, _c2));
      \u0275\u0275advance(2);
      \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(24, _c3));
      \u0275\u0275advance(2);
      \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(25, _c4));
      \u0275\u0275advance(2);
      \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(26, _c5));
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-open", ctx.openNav() === "bo-suu-tap");
      \u0275\u0275advance();
      \u0275\u0275property("routerLinkActive", "is-active");
      \u0275\u0275advance(13);
      \u0275\u0275property("routerLinkActive", "is-active");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-open", ctx.openNav() === "designer");
      \u0275\u0275advance();
      \u0275\u0275property("routerLinkActive", "is-active");
    }
  }, dependencies: [RouterLink, RouterLinkActive], styles: ['\n.site-header[_ngcontent-%COMP%] {\n  background: var(--color-primary-light);\n  border-bottom: 1px solid rgba(196, 199, 199, 0.3);\n  width: 100%;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n.site-header__inner[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px);\n}\n.site-header__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 0 8px;\n  position: relative;\n}\n.site-header__logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  text-decoration: none;\n}\n.site-header__logo-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  object-fit: contain;\n}\n.site-header__logo-wordmark[_ngcontent-%COMP%] {\n  width: 140px;\n  height: 44px;\n  object-fit: contain;\n}\n.site-header__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.site-header__action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n}\n.site-header__action-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  stroke: var(--color-dark);\n  fill: none;\n  stroke-width: 2;\n}\n.site-header__avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.user-menu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.user-menu__dropdown[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  background: var(--color-white);\n  border: 1px solid rgba(196, 199, 199, 0.4);\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n  padding: 6px 0;\n  min-width: 160px;\n  z-index: 300;\n  flex-direction: column;\n}\n.user-menu.is-open[_ngcontent-%COMP%]   .user-menu__dropdown[_ngcontent-%COMP%] {\n  display: flex;\n}\n.user-menu__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  font-size: 13px;\n  color: var(--color-dark);\n  text-decoration: none;\n  transition: background 0.15s;\n  white-space: nowrap;\n}\n.user-menu__item[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.user-menu__item[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-light);\n}\n.site-header__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  padding-bottom: 16px;\n}\n.site-header__nav-item[_ngcontent-%COMP%] {\n  position: relative;\n}\n.site-header__nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 40px;\n}\n.site-header__nav-link[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-weight: 600;\n  font-size: 14px;\n  letter-spacing: 1.4px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  white-space: nowrap;\n  position: relative;\n  padding-bottom: 4px;\n  transition: color 0.2s;\n}\n.site-header__nav-link.is-active[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.site-header__nav-link.is-active[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 1px;\n  background: var(--color-dark);\n}\n.site-header__nav-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.site-header__search[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  border: 1px solid var(--color-primary);\n  border-radius: 10px;\n  background: var(--color-white);\n  padding: 4px 12px 4px 32px;\n  height: 27px;\n  width: 200px;\n  position: absolute;\n  right: 0;\n}\n.site-header__search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 17px;\n  height: 17px;\n}\n.site-header__search-input[_ngcontent-%COMP%] {\n  font-family: var(--font-ui);\n  font-size: 12px;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: var(--color-border);\n  border: none;\n  outline: none;\n  background: transparent;\n  width: 100%;\n}\n.site-header__search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-border);\n}\n.mega-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  left: 0;\n  width: auto;\n  min-width: 220px;\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  border-radius: 6px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n  display: none;\n  padding: 20px 24px;\n  gap: 40px;\n  z-index: 200;\n}\n.site-header__nav-item.is-open[_ngcontent-%COMP%]   .mega-menu[_ngcontent-%COMP%] {\n  display: flex;\n}\n.mega-menu__col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  min-width: 140px;\n}\n.mega-menu__col-title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-weight: 700;\n  font-size: 12px;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 4px;\n}\n.mega-menu__link[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--color-dark);\n  transition: color 0.2s;\n}\n.mega-menu__link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.user-menu__item--btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  width: 100%;\n  text-align: left;\n  cursor: pointer;\n  color: var(--color-dark);\n}\n/*# sourceMappingURL=header.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-header", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, RouterLinkActive], template: `<header class="site-header">
  <div class="site-header__inner">

    <div class="site-header__top">
      <a routerLink="/" class="site-header__logo-left">
        <img class="site-header__logo-icon" src="assets/images/logo-icon.png" alt="RENGA" width="44" height="44">
      </a>

      <a routerLink="/" class="site-header__logo-center">
        <img class="site-header__logo-wordmark" src="assets/images/logo-wordmark.png" alt="RENGA" height="32">
      </a>

      <div class="site-header__actions">
        <a routerLink="/gio-hang" class="site-header__action-btn" aria-label="Gi\u1ECF h\xE0ng">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </a>
        <a routerLink="/lich-su-don-hang" class="site-header__action-btn" aria-label="\u0110\u01A1n h\xE0ng">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </a>
        <div class="user-menu" [class.is-open]="userMenuOpen()">
          <button
            class="site-header__action-btn user-menu__trigger"
            aria-label="T\xE0i kho\u1EA3n"
            [attr.aria-expanded]="userMenuOpen()"
            (click)="toggleUserMenu($event)"
          >
            <img class="site-header__avatar" src="https://placehold.co/45x45/f3f3f4/444748?text=U" alt="T\xE0i kho\u1EA3n">
          </button>
          <div class="user-menu__dropdown">
            @if (authService.isLoggedIn()) {
              <a routerLink="/profile" class="user-menu__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                T\xE0i kho\u1EA3n
              </a>
              <button type="button" class="user-menu__item user-menu__item--btn" (click)="authService.logout(); closeAll()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                \u0110\u0103ng xu\u1EA5t
              </button>
            } @else {
              <a routerLink="/dang-nhap" class="user-menu__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                \u0110\u0103ng nh\u1EADp
              </a>
              <a routerLink="/dang-ki" class="user-menu__item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                \u0110\u0103ng k\xFD
              </a>
            }
          </div>
        </div>
      </div>
    </div>

    <div class="site-header__bottom">
      <nav class="site-header__nav" aria-label="Menu ch\xEDnh">
        <div class="site-header__nav-item">
          <a routerLink="/" [routerLinkActive]="'is-active'" [routerLinkActiveOptions]="{exact: true}" class="site-header__nav-link">Trang ch\u1EE7</a>
        </div>
        <div class="site-header__nav-item"
             [class.is-open]="openNav() === 'danh-muc'"
             (mouseenter)="openNavItem('danh-muc')"
             (mouseleave)="closeNavItem()">
          <a routerLink="/danh-muc" [routerLinkActive]="'is-active'" class="site-header__nav-link">Danh m\u1EE5c S\u1EA3n ph\u1EA9m</a>
          <div class="mega-menu">
            <div class="mega-menu__col">
              <p class="mega-menu__col-title">Danh m\u1EE5c s\u1EA3n ph\u1EA9m</p>
              <a routerLink="/products" [queryParams]="{category: 'nhan'}" class="mega-menu__link">Nh\u1EABn</a>
              <a routerLink="/products" [queryParams]="{category: 'day-chuyen'}" class="mega-menu__link">D\xE2y chuy\u1EC1n</a>
              <a routerLink="/products" [queryParams]="{category: 'hoa-tai'}" class="mega-menu__link">Hoa tai</a>
              <a routerLink="/products" [queryParams]="{category: 'lac-tay'}" class="mega-menu__link">L\u1EAFc tay &amp; V\xF2ng tay</a>
              <a routerLink="/products" [queryParams]="{category: 'charm'}" class="mega-menu__link">Charm</a>
            </div>
          </div>
        </div>
        <div class="site-header__nav-item"
             [class.is-open]="openNav() === 'bo-suu-tap'"
             (mouseenter)="openNavItem('bo-suu-tap')"
             (mouseleave)="closeNavItem()">
          <a routerLink="/bo-suu-tap" [routerLinkActive]="'is-active'" class="site-header__nav-link">B\u1ED9 s\u01B0u t\u1EADp</a>
          <div class="mega-menu">
            <div class="mega-menu__col">
              <p class="mega-menu__col-title">B\u1ED9 s\u01B0u t\u1EADp</p>
              <a routerLink="/bo-suu-tap" class="mega-menu__link">B\u1ED9 trang s\u1EE9c \u0111\u1ED3ng b\u1ED9</a>
              <a routerLink="/bo-suu-tap" class="mega-menu__link">B\u1ED9 trang s\u1EE9c c\u1EB7p \u0111\xF4i</a>
              <a routerLink="/bo-suu-tap" class="mega-menu__link">B\u1ED9 s\u01B0u t\u1EADp Ho\xE0ng Gia</a>
            </div>
          </div>
        </div>
        <div class="site-header__nav-item">
          <a routerLink="/studio" [routerLinkActive]="'is-active'" class="site-header__nav-link">The Studio</a>
        </div>
        <div class="site-header__nav-item"
             [class.is-open]="openNav() === 'designer'"
             (mouseenter)="openNavItem('designer')"
             (mouseleave)="closeNavItem()">
          <a routerLink="/the-designer" [routerLinkActive]="'is-active'" class="site-header__nav-link">The Designer</a>
          <div class="mega-menu">
            <div class="mega-menu__col">
              <p class="mega-menu__col-title">The Designer</p>
              <a routerLink="/the-designer" class="mega-menu__link">\u0110\u1EB7t l\u1ECBch t\u01B0 v\u1EA5n</a>
              <a routerLink="/appointment-history" class="mega-menu__link">L\u1ECBch t\u01B0 v\u1EA5n c\u1EE7a t\xF4i</a>
            </div>
          </div>
        </div>
      </nav>
      <div class="site-header__search">
        <svg class="site-header__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input class="site-header__search-input" type="text" placeholder="T\xECm ki\u1EBFm...">
      </div>
    </div>

  </div>
</header>
`, styles: ['/* src/app/shared/components/header/header.component.css */\n.site-header {\n  background: var(--color-primary-light);\n  border-bottom: 1px solid rgba(196, 199, 199, 0.3);\n  width: 100%;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n.site-header__inner {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px);\n}\n.site-header__top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 0 8px;\n  position: relative;\n}\n.site-header__logo {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  text-decoration: none;\n}\n.site-header__logo-icon {\n  width: 50px;\n  height: 50px;\n  object-fit: contain;\n}\n.site-header__logo-wordmark {\n  width: 140px;\n  height: 44px;\n  object-fit: contain;\n}\n.site-header__actions {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.site-header__action-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n}\n.site-header__action-btn svg {\n  width: 20px;\n  height: 20px;\n  stroke: var(--color-dark);\n  fill: none;\n  stroke-width: 2;\n}\n.site-header__avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.user-menu {\n  position: relative;\n}\n.user-menu__dropdown {\n  display: none;\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  background: var(--color-white);\n  border: 1px solid rgba(196, 199, 199, 0.4);\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n  padding: 6px 0;\n  min-width: 160px;\n  z-index: 300;\n  flex-direction: column;\n}\n.user-menu.is-open .user-menu__dropdown {\n  display: flex;\n}\n.user-menu__item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  font-size: 13px;\n  color: var(--color-dark);\n  text-decoration: none;\n  transition: background 0.15s;\n  white-space: nowrap;\n}\n.user-menu__item svg {\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.user-menu__item:hover {\n  background: var(--color-primary-light);\n}\n.site-header__bottom {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  padding-bottom: 16px;\n}\n.site-header__nav-item {\n  position: relative;\n}\n.site-header__nav {\n  display: flex;\n  align-items: center;\n  gap: 40px;\n}\n.site-header__nav-link {\n  font-family: var(--font-sans);\n  font-weight: 600;\n  font-size: 14px;\n  letter-spacing: 1.4px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  white-space: nowrap;\n  position: relative;\n  padding-bottom: 4px;\n  transition: color 0.2s;\n}\n.site-header__nav-link.is-active {\n  font-weight: 800;\n}\n.site-header__nav-link.is-active::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 1px;\n  background: var(--color-dark);\n}\n.site-header__nav-link:hover {\n  color: var(--color-primary);\n}\n.site-header__search {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  border: 1px solid var(--color-primary);\n  border-radius: 10px;\n  background: var(--color-white);\n  padding: 4px 12px 4px 32px;\n  height: 27px;\n  width: 200px;\n  position: absolute;\n  right: 0;\n}\n.site-header__search-icon {\n  position: absolute;\n  left: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 17px;\n  height: 17px;\n}\n.site-header__search-input {\n  font-family: var(--font-ui);\n  font-size: 12px;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: var(--color-border);\n  border: none;\n  outline: none;\n  background: transparent;\n  width: 100%;\n}\n.site-header__search-input::placeholder {\n  color: var(--color-border);\n}\n.mega-menu {\n  position: absolute;\n  top: calc(100% + 8px);\n  left: 0;\n  width: auto;\n  min-width: 220px;\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  border-radius: 6px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n  display: none;\n  padding: 20px 24px;\n  gap: 40px;\n  z-index: 200;\n}\n.site-header__nav-item.is-open .mega-menu {\n  display: flex;\n}\n.mega-menu__col {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  min-width: 140px;\n}\n.mega-menu__col-title {\n  font-family: var(--font-sans);\n  font-weight: 700;\n  font-size: 12px;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 4px;\n}\n.mega-menu__link {\n  font-size: 14px;\n  color: var(--color-dark);\n  transition: color 0.2s;\n}\n.mega-menu__link:hover {\n  color: var(--color-primary);\n}\n.user-menu__item--btn {\n  background: none;\n  border: none;\n  width: 100%;\n  text-align: left;\n  cursor: pointer;\n  color: var(--color-dark);\n}\n/*# sourceMappingURL=header.component.css.map */\n'] }]
  }], null, { closeAll: [{
    type: HostListener,
    args: ["document:click"]
  }], onEscape: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/shared/components/header/header.ts", lineNumber: 13 });
})();

// src/app/app.ts
var App = class _App {
  title = signal(
    "renga-tmp",
    ...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-header")(1, "router-outlet");
    }
  }, dependencies: [RouterOutlet, HeaderComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet, HeaderComponent], template: "<app-header />\r\n<router-outlet />\r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 11 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
