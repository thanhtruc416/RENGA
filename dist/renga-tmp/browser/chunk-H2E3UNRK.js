import {
  Router
} from "./chunk-TYNORSOC.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-HH4CWJAK.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  router = inject(Router);
  isLoggedIn = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoggedIn" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentUser = signal(
    null,
    ...ngDevMode ? [{ debugName: "currentUser" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // TODO: replace with HTTP call → this.http.post('/api/auth/login', { phone, password })
  login(phone, _password) {
    this.isLoggedIn.set(true);
    this.currentUser.set({ name: phone, phone });
    this.router.navigate(["/"]);
  }
  // TODO: replace with HTTP call → this.http.post('/api/auth/register', body)
  register(name, phone, _password) {
    this.isLoggedIn.set(true);
    this.currentUser.set({ name, phone });
    this.router.navigate(["/"]);
  }
  logout() {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-H2E3UNRK.js.map
