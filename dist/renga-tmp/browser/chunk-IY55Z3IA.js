import {
  AuthService
} from "./chunk-H2E3UNRK.js";
import {
  RouterLink
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/register/register.component.ts
var RegisterComponent = class _RegisterComponent {
  authService = inject(AuthService);
  fullName = signal(
    "",
    ...ngDevMode ? [{ debugName: "fullName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  email = signal(
    "",
    ...ngDevMode ? [{ debugName: "email" }] : (
      /* istanbul ignore next */
      []
    )
  );
  phone = signal(
    "",
    ...ngDevMode ? [{ debugName: "phone" }] : (
      /* istanbul ignore next */
      []
    )
  );
  password = signal(
    "",
    ...ngDevMode ? [{ debugName: "password" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmPassword = signal(
    "",
    ...ngDevMode ? [{ debugName: "confirmPassword" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSubmitting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setFullName(value) {
    this.fullName.set(value);
  }
  setEmail(value) {
    this.email.set(value);
  }
  setPhone(value) {
    this.phone.set(value);
  }
  setPassword(value) {
    this.password.set(value);
  }
  setConfirmPassword(value) {
    this.confirmPassword.set(value);
  }
  register() {
    if (this.isSubmitting())
      return;
    this.isSubmitting.set(true);
    this.authService.register(this.fullName(), this.phone(), this.password());
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 29, vars: 6, consts: [[1, "register"], ["aria-hidden", "true", 1, "register__bg"], [1, "register__card"], ["routerLink", "/", "aria-label", "\u0110\xF3ng", 1, "register__close"], ["src", "/icons/ic-close.png", "alt", ""], [1, "register__header"], [1, "register__title"], [1, "register__subtitle"], [1, "register__form", 3, "ngSubmit"], [1, "register__field"], ["type", "text", "placeholder", "H\u1ECD v\xE0 T\xEAn *", "autocomplete", "name", 1, "register__input", 3, "input", "value"], ["type", "email", "placeholder", "Email", "autocomplete", "email", 1, "register__input", 3, "input", "value"], ["type", "tel", "placeholder", "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i *", "autocomplete", "tel", 1, "register__input", 3, "input", "value"], ["type", "password", "placeholder", "M\u1EADt kh\u1EA9u *", "autocomplete", "new-password", 1, "register__input", 3, "input", "value"], ["type", "password", "placeholder", "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u *", "autocomplete", "new-password", 1, "register__input", 3, "input", "value"], ["type", "submit", 1, "register__submit", 3, "disabled"], [1, "register__footer"], ["routerLink", "/dang-nhap", 1, "register__login-link"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "a", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "h1", 6);
      \u0275\u0275text(7, " \u0110\u0103ng k\xED t\xE0i kho\u1EA3n");
      \u0275\u0275element(8, "br");
      \u0275\u0275text(9, "RENGA ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 7);
      \u0275\u0275text(11, " Kh\xE1m ph\xE1 th\u1EBF gi\u1EDBi trang s\u1EE9c cao c\u1EA5p d\xE0nh ri\xEAng cho b\u1EA1n. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "form", 8);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_12_listener() {
        return ctx.register();
      });
      \u0275\u0275elementStart(13, "div", 9)(14, "input", 10);
      \u0275\u0275listener("input", function RegisterComponent_Template_input_input_14_listener($event) {
        return ctx.setFullName($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 9)(16, "input", 11);
      \u0275\u0275listener("input", function RegisterComponent_Template_input_input_16_listener($event) {
        return ctx.setEmail($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9)(18, "input", 12);
      \u0275\u0275listener("input", function RegisterComponent_Template_input_input_18_listener($event) {
        return ctx.setPhone($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 9)(20, "input", 13);
      \u0275\u0275listener("input", function RegisterComponent_Template_input_input_20_listener($event) {
        return ctx.setPassword($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 9)(22, "input", 14);
      \u0275\u0275listener("input", function RegisterComponent_Template_input_input_22_listener($event) {
        return ctx.setConfirmPassword($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "button", 15);
      \u0275\u0275text(24, " \u0110\u0102NG K\xDD ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "p", 16);
      \u0275\u0275text(26, " \u0110\xE3 c\xF3 t\xE0i kho\u1EA3n?\xA0");
      \u0275\u0275elementStart(27, "a", 17);
      \u0275\u0275text(28, "\u0110\u0103ng nh\u1EADp ngay");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275property("value", ctx.fullName());
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.email());
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.phone());
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.password());
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.confirmPassword());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isSubmitting());
    }
  }, dependencies: [RouterLink], styles: ["\n.register[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 49px 24px;\n  overflow: hidden;\n}\n.register__bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image: url(/images/auth-bg.jpg);\n  background-size: cover;\n  background-position: bottom center;\n  filter: blur(2px);\n  transform: scale(1.04);\n  pointer-events: none;\n}\n.register__card[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: var(--color-primary-light);\n  width: 600px;\n  max-width: 100%;\n  padding: 48px;\n  border-radius: 12px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n  overflow: hidden;\n}\n.register__close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 17px;\n  right: 22px;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.5;\n  transition: opacity 0.2s;\n  text-decoration: none;\n}\n.register__close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.register__close[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  object-fit: contain;\n}\n.register__header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  align-items: center;\n}\n.register__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 50px;\n  font-weight: 700;\n  color: var(--color-black);\n  text-align: center;\n  letter-spacing: -0.026em;\n  line-height: 1.44;\n  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n}\n.register__subtitle[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: var(--color-black);\n  text-align: center;\n  line-height: 1.56;\n  opacity: 0.8;\n}\n.register__form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.register__field[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  padding: 14px 0 16px;\n  transition: border-color 0.2s;\n}\n.register__field[_ngcontent-%COMP%]:focus-within {\n  border-bottom-color: var(--color-primary);\n}\n.register__input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  background: none;\n  outline: none;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1;\n}\n.register__input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(0, 0, 0, 0.4);\n}\n.register__submit[_ngcontent-%COMP%] {\n  margin-top: 40px;\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  letter-spacing: 0.067em;\n  text-align: center;\n  padding: 16px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.register__submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.register__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.register__footer[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.6);\n  text-align: center;\n  line-height: 1.5;\n  margin: 0;\n}\n.register__login-link[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--color-primary);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  transition: opacity 0.2s;\n}\n.register__login-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n/*# sourceMappingURL=register.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: '<div class="register">\n\n  <!-- Blurred background -->\n  <div class="register__bg" aria-hidden="true"></div>\n\n  <!-- Card -->\n  <div class="register__card">\n\n    <!-- Close Button -->\n    <a routerLink="/" class="register__close" aria-label="\u0110\xF3ng">\n      <img src="/icons/ic-close.png" alt="" />\n    </a>\n\n    <!-- Brand Header -->\n    <div class="register__header">\n      <h1 class="register__title">\n        \u0110\u0103ng k\xED t\xE0i kho\u1EA3n<br />RENGA\n      </h1>\n      <p class="register__subtitle">\n        Kh\xE1m ph\xE1 th\u1EBF gi\u1EDBi trang s\u1EE9c cao c\u1EA5p d\xE0nh ri\xEAng cho b\u1EA1n.\n      </p>\n    </div>\n\n    <!-- Form -->\n    <form class="register__form" (ngSubmit)="register()">\n      <div class="register__field">\n        <input\n          class="register__input"\n          type="text"\n          placeholder="H\u1ECD v\xE0 T\xEAn *"\n          [value]="fullName()"\n          (input)="setFullName($any($event.target).value)"\n          autocomplete="name"\n        />\n      </div>\n\n      <div class="register__field">\n        <input\n          class="register__input"\n          type="email"\n          placeholder="Email"\n          [value]="email()"\n          (input)="setEmail($any($event.target).value)"\n          autocomplete="email"\n        />\n      </div>\n\n      <div class="register__field">\n        <input\n          class="register__input"\n          type="tel"\n          placeholder="S\u1ED1 \u0111i\u1EC7n tho\u1EA1i *"\n          [value]="phone()"\n          (input)="setPhone($any($event.target).value)"\n          autocomplete="tel"\n        />\n      </div>\n\n      <div class="register__field">\n        <input\n          class="register__input"\n          type="password"\n          placeholder="M\u1EADt kh\u1EA9u *"\n          [value]="password()"\n          (input)="setPassword($any($event.target).value)"\n          autocomplete="new-password"\n        />\n      </div>\n\n      <div class="register__field">\n        <input\n          class="register__input"\n          type="password"\n          placeholder="X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u *"\n          [value]="confirmPassword()"\n          (input)="setConfirmPassword($any($event.target).value)"\n          autocomplete="new-password"\n        />\n      </div>\n\n      <button\n        class="register__submit"\n        type="submit"\n        [disabled]="isSubmitting()"\n      >\n        \u0110\u0102NG K\xDD\n      </button>\n    </form>\n\n    <!-- Footer Link -->\n    <p class="register__footer">\n      \u0110\xE3 c\xF3 t\xE0i kho\u1EA3n?&nbsp;<a routerLink="/dang-nhap" class="register__login-link">\u0110\u0103ng nh\u1EADp ngay</a>\n    </p>\n\n  </div>\n</div>\n', styles: ["/* src/app/register/register.component.css */\n.register {\n  min-height: 100vh;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 49px 24px;\n  overflow: hidden;\n}\n.register__bg {\n  position: absolute;\n  inset: 0;\n  background-image: url(/images/auth-bg.jpg);\n  background-size: cover;\n  background-position: bottom center;\n  filter: blur(2px);\n  transform: scale(1.04);\n  pointer-events: none;\n}\n.register__card {\n  position: relative;\n  background-color: var(--color-primary-light);\n  width: 600px;\n  max-width: 100%;\n  padding: 48px;\n  border-radius: 12px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n  overflow: hidden;\n}\n.register__close {\n  position: absolute;\n  top: 17px;\n  right: 22px;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.5;\n  transition: opacity 0.2s;\n  text-decoration: none;\n}\n.register__close:hover {\n  opacity: 1;\n}\n.register__close img {\n  width: 17px;\n  height: 17px;\n  object-fit: contain;\n}\n.register__header {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  align-items: center;\n}\n.register__title {\n  font-family: var(--font-serif);\n  font-size: 50px;\n  font-weight: 700;\n  color: var(--color-black);\n  text-align: center;\n  letter-spacing: -0.026em;\n  line-height: 1.44;\n  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n}\n.register__subtitle {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: var(--color-black);\n  text-align: center;\n  line-height: 1.56;\n  opacity: 0.8;\n}\n.register__form {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.register__field {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  padding: 14px 0 16px;\n  transition: border-color 0.2s;\n}\n.register__field:focus-within {\n  border-bottom-color: var(--color-primary);\n}\n.register__input {\n  width: 100%;\n  border: none;\n  background: none;\n  outline: none;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  line-height: 1;\n}\n.register__input::placeholder {\n  color: rgba(0, 0, 0, 0.4);\n}\n.register__submit {\n  margin-top: 40px;\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  letter-spacing: 0.067em;\n  text-align: center;\n  padding: 16px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.register__submit:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.register__submit:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.register__footer {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.6);\n  text-align: center;\n  line-height: 1.5;\n  margin: 0;\n}\n.register__login-link {\n  font-weight: 500;\n  color: var(--color-primary);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  transition: opacity 0.2s;\n}\n.register__login-link:hover {\n  opacity: 0.8;\n}\n/*# sourceMappingURL=register.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/register/register.component.ts", lineNumber: 13 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-IY55Z3IA.js.map
