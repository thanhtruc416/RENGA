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
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/login/login.component.ts
var LoginComponent = class _LoginComponent {
  authService = inject(AuthService);
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
  showPassword = signal(
    false,
    ...ngDevMode ? [{ debugName: "showPassword" }] : (
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
  setPhone(value) {
    this.phone.set(value);
  }
  setPassword(value) {
    this.password.set(value);
  }
  togglePassword() {
    this.showPassword.update((v) => !v);
  }
  login() {
    if (this.isSubmitting())
      return;
    this.isSubmitting.set(true);
    this.authService.login(this.phone(), this.password());
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 47, vars: 5, consts: [[1, "login"], [1, "login__left"], ["aria-hidden", "true", 1, "login__left-gradient"], [1, "login__left-content"], [1, "login__brand-text"], [1, "login__right"], ["routerLink", "/", "aria-label", "Quay l\u1EA1i", 1, "login__back"], ["src", "/icons/ic-back-arrow.png", "alt", ""], [1, "login__content"], [1, "login__brand-anchor"], [1, "login__title"], [1, "login__subtitle"], [1, "login__form", 3, "ngSubmit"], [1, "login__field"], ["for", "login-phone", 1, "login__label"], ["id", "login-phone", "type", "tel", "placeholder", "0881234567", "autocomplete", "tel", 1, "login__input", 3, "input", "value"], [1, "login__label-row"], ["for", "login-password", 1, "login__label"], ["routerLink", "/quen-mat-khau", 1, "login__forgot"], [1, "login__input-wrap"], ["id", "login-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 1, "login__input", 3, "input", "type", "value"], ["type", "button", 1, "login__eye-btn", 3, "click"], ["src", "/icons/ic-eye.png", "alt", ""], ["type", "submit", 1, "login__submit", 3, "disabled"], [1, "login__divider"], [1, "login__divider-line"], [1, "login__divider-text"], ["type", "button", 1, "login__social"], ["src", "/icons/ic-social-google.png", "alt", "", 1, "login__social-icon"], [1, "login__footer"], ["routerLink", "/dang-ki", 1, "login__register-link"], [1, "login__copyright"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "RENGA");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "div", 5)(7, "a", 6);
      \u0275\u0275element(8, "img", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "h1", 10);
      \u0275\u0275text(12, "Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 11);
      \u0275\u0275text(14, " \u0110\u0103ng nh\u1EADp \u0111\u1EC3 ti\u1EBFp t\u1EE5c h\xE0nh tr\xECnh s\xE1ng t\u1EA1o c\u1EE7a b\u1EA1n ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "form", 12);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_15_listener() {
        return ctx.login();
      });
      \u0275\u0275elementStart(16, "div", 13)(17, "label", 14);
      \u0275\u0275text(18, "S\u1ED0 \u0110I\u1EC6N THO\u1EA0I");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 15);
      \u0275\u0275listener("input", function LoginComponent_Template_input_input_19_listener($event) {
        return ctx.setPhone($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 13)(21, "div", 16)(22, "label", 17);
      \u0275\u0275text(23, "M\u1EACT KH\u1EA8U");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "a", 18);
      \u0275\u0275text(25, "Qu\xEAn m\u1EADt kh\u1EA9u?");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 19)(27, "input", 20);
      \u0275\u0275listener("input", function LoginComponent_Template_input_input_27_listener($event) {
        return ctx.setPassword($event.target.value);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "button", 21);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_28_listener() {
        return ctx.togglePassword();
      });
      \u0275\u0275element(29, "img", 22);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "button", 23);
      \u0275\u0275text(31, " \u0110\u0102NG NH\u1EACP ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 24);
      \u0275\u0275element(33, "div", 25);
      \u0275\u0275elementStart(34, "span", 26);
      \u0275\u0275text(35, "HO\u1EB6C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "div", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 27);
      \u0275\u0275element(38, "img", 28);
      \u0275\u0275elementStart(39, "span");
      \u0275\u0275text(40, "Ti\u1EBFp t\u1EE5c v\u1EDBi Google/Facebook");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "p", 29);
      \u0275\u0275text(42, " Ch\u01B0a c\xF3 t\xE0i kho\u1EA3n?\xA0");
      \u0275\u0275elementStart(43, "a", 30);
      \u0275\u0275text(44, "\u0110\u0103ng k\xFD ngay");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(45, "p", 31);
      \u0275\u0275text(46, "\xA9 2026 RENGA. All rights reserved.");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275property("value", ctx.phone());
      \u0275\u0275advance(8);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password")("value", ctx.password());
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.showPassword() ? "\u1EA8n m\u1EADt kh\u1EA9u" : "Hi\u1EC7n m\u1EADt kh\u1EA9u");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSubmitting());
    }
  }, dependencies: [RouterLink], styles: ['\n.login[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 58fr 42fr;\n  min-height: 100vh;\n}\n.login__left[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: var(--color-black);\n  overflow: hidden;\n}\n.login__left[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image: url(/images/login-bg.jpg);\n  background-size: cover;\n  background-position: center;\n  pointer-events: none;\n}\n.login__left-gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.6) 0%,\n      rgba(0, 0, 0, 0) 100%);\n  pointer-events: none;\n  z-index: 1;\n}\n.login__left-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  padding: 24px;\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n}\n.login__brand-text[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 96px;\n  font-weight: 600;\n  color: #f9f9f9;\n  line-height: 1;\n}\n.login__right[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  padding: 64px 96px;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.login__back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  width: 60px;\n  height: 52px;\n  flex-shrink: 0;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n  text-decoration: none;\n}\n.login__back[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.login__back[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 28px;\n  height: auto;\n  object-fit: contain;\n}\n.login__content[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 448px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 40px;\n  padding-top: 8px;\n}\n.login__brand-anchor[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.login__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 700;\n  color: var(--color-black);\n  letter-spacing: -0.02em;\n  line-height: 1.125;\n  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n}\n.login__subtitle[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: #1a1c1c;\n  line-height: 1.56;\n  opacity: 0.8;\n}\n.login__form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  padding-top: 8px;\n}\n.login__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.login__label-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.login__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--color-black);\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  line-height: 1;\n}\n.login__forgot[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: 0.075em;\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  transition: opacity 0.2s;\n}\n.login__forgot[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.login__input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.login__input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-white);\n  border: 1px solid #c4c7c7;\n  padding: 19px 17px 20px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  outline: none;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.login__input[_ngcontent-%COMP%]::placeholder {\n  color: #6b7280;\n}\n.login__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.login__eye-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 16px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n.login__eye-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.login__eye-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 15px;\n  object-fit: contain;\n}\n.login__submit[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 20px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.login__submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.login__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.login__divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.login__divider-line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 1px;\n  background-color: #c4c7c7;\n}\n.login__divider-text[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n  white-space: nowrap;\n}\n.login__social[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  background: var(--color-white);\n  border: 1px solid #747878;\n  padding: 13px 17px;\n  width: 100%;\n  cursor: pointer;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #1a1c1c;\n  text-align: center;\n  transition: border-color 0.2s;\n}\n.login__social[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n}\n.login__social-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.login__footer[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  text-align: center;\n  margin: 0;\n  padding-top: 7.5px;\n}\n.login__register-link[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--color-primary);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  transition: opacity 0.2s;\n}\n.login__register-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.login__copyright[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n  text-align: center;\n  opacity: 0.6;\n  margin: 0;\n  padding-top: 28px;\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="login">

  <!-- Left Panel: Visual Anchor -->
  <div class="login__left">
    <div class="login__left-gradient" aria-hidden="true"></div>
    <div class="login__left-content">
      <span class="login__brand-text">RENGA</span>
    </div>
  </div>

  <!-- Right Panel: Form -->
  <div class="login__right">

    <!-- Back Arrow -->
    <a routerLink="/" class="login__back" aria-label="Quay l\u1EA1i">
      <img src="/icons/ic-back-arrow.png" alt="" />
    </a>

    <!-- Main Content -->
    <div class="login__content">

      <!-- Brand Anchor -->
      <div class="login__brand-anchor">
        <h1 class="login__title">Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i</h1>
        <p class="login__subtitle">
          \u0110\u0103ng nh\u1EADp \u0111\u1EC3 ti\u1EBFp t\u1EE5c h\xE0nh tr\xECnh s\xE1ng t\u1EA1o c\u1EE7a b\u1EA1n
        </p>
      </div>

      <!-- Login Form -->
      <form class="login__form" (ngSubmit)="login()">

        <!-- S\u1ED1 \u0111i\u1EC7n tho\u1EA1i -->
        <div class="login__field">
          <label class="login__label" for="login-phone">S\u1ED0 \u0110I\u1EC6N THO\u1EA0I</label>
          <input
            id="login-phone"
            class="login__input"
            type="tel"
            placeholder="0881234567"
            [value]="phone()"
            (input)="setPhone($any($event.target).value)"
            autocomplete="tel"
          />
        </div>

        <!-- M\u1EADt kh\u1EA9u -->
        <div class="login__field">
          <div class="login__label-row">
            <label class="login__label" for="login-password">M\u1EACT KH\u1EA8U</label>
            <a routerLink="/quen-mat-khau" class="login__forgot">Qu\xEAn m\u1EADt kh\u1EA9u?</a>
          </div>
          <div class="login__input-wrap">
            <input
              id="login-password"
              class="login__input"
              [type]="showPassword() ? 'text' : 'password'"
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              [value]="password()"
              (input)="setPassword($any($event.target).value)"
              autocomplete="current-password"
            />
            <button
              class="login__eye-btn"
              type="button"
              (click)="togglePassword()"
              [attr.aria-label]="showPassword() ? '\u1EA8n m\u1EADt kh\u1EA9u' : 'Hi\u1EC7n m\u1EADt kh\u1EA9u'"
            >
              <img src="/icons/ic-eye.png" alt="" />
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          class="login__submit"
          type="submit"
          [disabled]="isSubmitting()"
        >
          \u0110\u0102NG NH\u1EACP
        </button>

      </form>

      <!-- Divider -->
      <div class="login__divider">
        <div class="login__divider-line"></div>
        <span class="login__divider-text">HO\u1EB6C</span>
        <div class="login__divider-line"></div>
      </div>

      <!-- Social Login -->
      <button class="login__social" type="button">
        <img src="/icons/ic-social-google.png" alt="" class="login__social-icon" />
        <span>Ti\u1EBFp t\u1EE5c v\u1EDBi Google/Facebook</span>
      </button>

      <!-- Footer Link -->
      <p class="login__footer">
        Ch\u01B0a c\xF3 t\xE0i kho\u1EA3n?&nbsp;<a routerLink="/dang-ki" class="login__register-link">\u0110\u0103ng k\xFD ngay</a>
      </p>

    </div>

    <!-- Copyright -->
    <p class="login__copyright">\xA9 2026 RENGA. All rights reserved.</p>

  </div>

</div>
`, styles: ['/* src/app/login/login.component.css */\n.login {\n  display: grid;\n  grid-template-columns: 58fr 42fr;\n  min-height: 100vh;\n}\n.login__left {\n  position: relative;\n  background-color: var(--color-black);\n  overflow: hidden;\n}\n.login__left::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image: url(/images/login-bg.jpg);\n  background-size: cover;\n  background-position: center;\n  pointer-events: none;\n}\n.login__left-gradient {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.6) 0%,\n      rgba(0, 0, 0, 0) 100%);\n  pointer-events: none;\n  z-index: 1;\n}\n.login__left-content {\n  position: relative;\n  z-index: 2;\n  padding: 24px;\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n}\n.login__brand-text {\n  font-family: var(--font-serif);\n  font-size: 96px;\n  font-weight: 600;\n  color: #f9f9f9;\n  line-height: 1;\n}\n.login__right {\n  background-color: var(--color-primary-light);\n  padding: 64px 96px;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.login__back {\n  display: inline-flex;\n  align-items: center;\n  width: 60px;\n  height: 52px;\n  flex-shrink: 0;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n  text-decoration: none;\n}\n.login__back:hover {\n  opacity: 1;\n}\n.login__back img {\n  width: 28px;\n  height: auto;\n  object-fit: contain;\n}\n.login__content {\n  flex: 1;\n  max-width: 448px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 40px;\n  padding-top: 8px;\n}\n.login__brand-anchor {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.login__title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 700;\n  color: var(--color-black);\n  letter-spacing: -0.02em;\n  line-height: 1.125;\n  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n}\n.login__subtitle {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: #1a1c1c;\n  line-height: 1.56;\n  opacity: 0.8;\n}\n.login__form {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  padding-top: 8px;\n}\n.login__field {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.login__label-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.login__label {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--color-black);\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  line-height: 1;\n}\n.login__forgot {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: 0.075em;\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  transition: opacity 0.2s;\n}\n.login__forgot:hover {\n  opacity: 0.8;\n}\n.login__input-wrap {\n  position: relative;\n}\n.login__input {\n  width: 100%;\n  background: var(--color-white);\n  border: 1px solid #c4c7c7;\n  padding: 19px 17px 20px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  outline: none;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.login__input::placeholder {\n  color: #6b7280;\n}\n.login__input:focus {\n  border-color: var(--color-primary);\n}\n.login__eye-btn {\n  position: absolute;\n  right: 16px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n.login__eye-btn:hover {\n  opacity: 1;\n}\n.login__eye-btn img {\n  width: 22px;\n  height: 15px;\n  object-fit: contain;\n}\n.login__submit {\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 20px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.login__submit:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.login__submit:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.login__divider {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.login__divider-line {\n  flex: 1;\n  height: 1px;\n  background-color: #c4c7c7;\n}\n.login__divider-text {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n  white-space: nowrap;\n}\n.login__social {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  background: var(--color-white);\n  border: 1px solid #747878;\n  padding: 13px 17px;\n  width: 100%;\n  cursor: pointer;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #1a1c1c;\n  text-align: center;\n  transition: border-color 0.2s;\n}\n.login__social:hover {\n  border-color: var(--color-primary);\n}\n.login__social-icon {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.login__footer {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  text-align: center;\n  margin: 0;\n  padding-top: 7.5px;\n}\n.login__register-link {\n  font-weight: 500;\n  color: var(--color-primary);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  transition: opacity 0.2s;\n}\n.login__register-link:hover {\n  opacity: 0.8;\n}\n.login__copyright {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n  text-align: center;\n  opacity: 0.6;\n  margin: 0;\n  padding-top: 28px;\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/login/login.component.ts", lineNumber: 13 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-FEGGFEEU.js.map
