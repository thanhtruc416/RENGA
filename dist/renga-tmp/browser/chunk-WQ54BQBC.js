import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵtext
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/reset-password/reset-password.component.ts
var ResetPasswordComponent = class _ResetPasswordComponent {
  newPassword = signal(
    "",
    ...ngDevMode ? [{ debugName: "newPassword" }] : (
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
  setNewPassword(value) {
    this.newPassword.set(value);
  }
  setConfirmPassword(value) {
    this.confirmPassword.set(value);
  }
  updatePassword() {
    if (this.isSubmitting())
      return;
    this.isSubmitting.set(true);
  }
  static \u0275fac = function ResetPasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResetPasswordComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResetPasswordComponent, selectors: [["app-reset-password"]], decls: 11, vars: 3, consts: [[1, "reset-password"], [1, "reset-password__content"], [1, "reset-password__title"], [1, "reset-password__form"], [1, "reset-password__field"], ["type", "password", "placeholder", "M\u1EACT KH\u1EA8U M\u1EDAI", "autocomplete", "new-password", 1, "reset-password__input", 3, "input", "value"], ["type", "password", "placeholder", "X\xC1C NH\u1EACN M\u1EACT KH\u1EA8U", "autocomplete", "new-password", 1, "reset-password__input", 3, "input", "value"], ["type", "button", 1, "reset-password__btn", 3, "click", "disabled"]], template: function ResetPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "M\u1EADt kh\u1EA9u m\u1EDBi");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 3)(5, "div", 4)(6, "input", 5);
      \u0275\u0275domListener("input", function ResetPasswordComponent_Template_input_input_6_listener($event) {
        return ctx.setNewPassword($event.target.value);
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "div", 4)(8, "input", 6);
      \u0275\u0275domListener("input", function ResetPasswordComponent_Template_input_input_8_listener($event) {
        return ctx.setConfirmPassword($event.target.value);
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "button", 7);
      \u0275\u0275domListener("click", function ResetPasswordComponent_Template_button_click_9_listener() {
        return ctx.updatePassword();
      });
      \u0275\u0275text(10, " C\u1EACP NH\u1EACT M\u1EACT KH\u1EA8U ");
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275domProperty("value", ctx.newPassword());
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("value", ctx.confirmPassword());
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.isSubmitting());
    }
  }, styles: ["\n.reset-password[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--color-primary-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 124px 24px;\n}\n.reset-password__content[_ngcontent-%COMP%] {\n  width: 448px;\n  max-width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.reset-password__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 700;\n  color: var(--color-black);\n  letter-spacing: -0.02em;\n  line-height: 1.125;\n  text-align: center;\n  text-shadow: 0 4px 2px rgba(0, 0, 0, 0.25);\n  margin-bottom: 40px;\n}\n.reset-password__form[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.reset-password__field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.reset-password__input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: none;\n  border: none;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  padding: 14px 0;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  outline: none;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.reset-password__input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(0, 0, 0, 0.4);\n}\n.reset-password__input[_ngcontent-%COMP%]:focus {\n  border-bottom-color: var(--color-primary);\n}\n.reset-password__btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 20px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.reset-password__btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.reset-password__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=reset-password.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResetPasswordComponent, [{
    type: Component,
    args: [{ selector: "app-reset-password", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [], template: '<div class="reset-password">\n\n  <div class="reset-password__content">\n\n    <!-- Title -->\n    <h1 class="reset-password__title">M\u1EADt kh\u1EA9u m\u1EDBi</h1>\n\n    <!-- Form -->\n    <div class="reset-password__form">\n\n      <div class="reset-password__field">\n        <input\n          class="reset-password__input"\n          type="password"\n          placeholder="M\u1EACT KH\u1EA8U M\u1EDAI"\n          [value]="newPassword()"\n          (input)="setNewPassword($any($event.target).value)"\n          autocomplete="new-password"\n        />\n      </div>\n\n      <div class="reset-password__field">\n        <input\n          class="reset-password__input"\n          type="password"\n          placeholder="X\xC1C NH\u1EACN M\u1EACT KH\u1EA8U"\n          [value]="confirmPassword()"\n          (input)="setConfirmPassword($any($event.target).value)"\n          autocomplete="new-password"\n        />\n      </div>\n\n      <button\n        class="reset-password__btn"\n        type="button"\n        (click)="updatePassword()"\n        [disabled]="isSubmitting()"\n      >\n        C\u1EACP NH\u1EACT M\u1EACT KH\u1EA8U\n      </button>\n\n    </div>\n\n  </div>\n\n</div>\n', styles: ["/* src/app/reset-password/reset-password.component.css */\n.reset-password {\n  min-height: 100vh;\n  background-color: var(--color-primary-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 124px 24px;\n}\n.reset-password__content {\n  width: 448px;\n  max-width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.reset-password__title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 700;\n  color: var(--color-black);\n  letter-spacing: -0.02em;\n  line-height: 1.125;\n  text-align: center;\n  text-shadow: 0 4px 2px rgba(0, 0, 0, 0.25);\n  margin-bottom: 40px;\n}\n.reset-password__form {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.reset-password__field {\n  width: 100%;\n}\n.reset-password__input {\n  width: 100%;\n  background: none;\n  border: none;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  padding: 14px 0;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  outline: none;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.reset-password__input::placeholder {\n  color: rgba(0, 0, 0, 0.4);\n}\n.reset-password__input:focus {\n  border-bottom-color: var(--color-primary);\n}\n.reset-password__btn {\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 20px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.reset-password__btn:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.reset-password__btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=reset-password.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent", filePath: "src/app/reset-password/reset-password.component.ts", lineNumber: 11 });
})();
export {
  ResetPasswordComponent
};
//# sourceMappingURL=chunk-WQ54BQBC.js.map
