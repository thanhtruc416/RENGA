import {
  RouterLink
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewChildren,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/forgot-password/forgot-password.component.ts
var _c0 = ["otpInput"];
function ForgotPasswordComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function ForgotPasswordComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendCode());
    });
    \u0275\u0275text(1, " G\u1EECI M\xC3 ");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("G\u1EEDi l\u1EA1i m\xE3 (", ctx_r1.countdown(), "s)");
  }
}
function ForgotPasswordComponent_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function ForgotPasswordComponent_Conditional_10_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resendCode());
    });
    \u0275\u0275text(1, " G\u1EEDi l\u1EA1i m\xE3 ");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_Conditional_10_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 21, 0);
    \u0275\u0275listener("input", function ForgotPasswordComponent_Conditional_10_For_9_Template_input_input_0_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onOtpInput(i_r6, $event));
    })("keydown", function ForgotPasswordComponent_Conditional_10_For_9_Template_input_keydown_0_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onOtpKeydown(i_r6, $event));
    })("paste", function ForgotPasswordComponent_Conditional_10_For_9_Template_input_paste_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onOtpPaste($event));
    });
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, ForgotPasswordComponent_Conditional_10_Conditional_1_Template, 2, 1, "span", 11)(2, ForgotPasswordComponent_Conditional_10_Conditional_2_Template, 2, 0, "button", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 5)(4, "div", 6)(5, "span", 13);
    \u0275\u0275text(6, "NH\u1EACP M\xC3 OTP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 14);
    \u0275\u0275repeaterCreate(8, ForgotPasswordComponent_Conditional_10_For_9_Template, 2, 0, "input", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 16)(11, "button", 17);
    \u0275\u0275listener("click", function ForgotPasswordComponent_Conditional_10_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmOtp());
    });
    \u0275\u0275text(12, " X\xC1C NH\u1EACN ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "a", 18);
    \u0275\u0275element(14, "img", 19);
    \u0275\u0275text(15, " QUAY L\u1EA0I \u0110\u0102NG NH\u1EACP ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.countdown() > 0 ? 1 : 2);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.otpIndices);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting());
  }
}
var ForgotPasswordComponent = class _ForgotPasswordComponent {
  destroyRef = inject(DestroyRef);
  otpInputs;
  phone = signal(
    "",
    ...ngDevMode ? [{ debugName: "phone" }] : (
      /* istanbul ignore next */
      []
    )
  );
  codeSent = signal(
    false,
    ...ngDevMode ? [{ debugName: "codeSent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  countdown = signal(
    0,
    ...ngDevMode ? [{ debugName: "countdown" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Source of truth khi submit — không dùng để bind ngược lại DOM
  otpDigits = signal(
    ["", "", "", "", "", ""],
    ...ngDevMode ? [{ debugName: "otpDigits" }] : (
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
  otpIndices = [0, 1, 2, 3, 4, 5];
  setPhone(value) {
    this.phone.set(value);
  }
  sendCode() {
    if (!this.phone().trim())
      return;
    this.codeSent.set(true);
    this.startCountdown();
  }
  resendCode() {
    if (this.countdown() > 0)
      return;
    this.startCountdown();
  }
  onOtpInput(index, event) {
    const input = event.target;
    const digit = input.value.replace(/\D/g, "").slice(-1);
    input.value = digit;
    const digits = [...this.otpDigits()];
    digits[index] = digit;
    this.otpDigits.set(digits);
    if (digit && index < 5) {
      this.focusBox(index + 1);
    }
  }
  onOtpKeydown(index, event) {
    const inputs = this.otpInputs?.toArray();
    if (!inputs)
      return;
    if (event.key === "Backspace") {
      event.preventDefault();
      const current = inputs[index].nativeElement;
      if (current.value) {
        current.value = "";
        const digits = [...this.otpDigits()];
        digits[index] = "";
        this.otpDigits.set(digits);
      } else if (index > 0) {
        inputs[index - 1].nativeElement.value = "";
        const digits = [...this.otpDigits()];
        digits[index - 1] = "";
        this.otpDigits.set(digits);
        this.focusBox(index - 1);
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      this.focusBox(index - 1);
    } else if (event.key === "ArrowRight" && index < 5) {
      this.focusBox(index + 1);
    }
  }
  onOtpPaste(event) {
    event.preventDefault();
    const text = (event.clipboardData?.getData("text") ?? "").replace(/\D/g, "").slice(0, 6);
    if (!text)
      return;
    const inputs = this.otpInputs?.toArray();
    const digits = ["", "", "", "", "", ""];
    [...text].forEach((d, i) => {
      digits[i] = d;
      if (inputs?.[i])
        inputs[i].nativeElement.value = d;
    });
    this.otpDigits.set(digits);
    this.focusBox(Math.min(text.length, 5));
  }
  focusBox(index) {
    const el = this.otpInputs?.toArray()?.[index]?.nativeElement;
    if (!el)
      return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }
  confirmOtp() {
    if (this.isSubmitting())
      return;
    this.isSubmitting.set(true);
  }
  startCountdown() {
    this.countdown.set(30);
    const interval = setInterval(() => {
      this.countdown.update((v) => {
        if (v <= 1) {
          clearInterval(interval);
          return 0;
        }
        return v - 1;
      });
    }, 1e3);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }
  static \u0275fac = function ForgotPasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ForgotPasswordComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgotPasswordComponent, selectors: [["app-forgot-password"]], viewQuery: function ForgotPasswordComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.otpInputs = _t);
    }
  }, decls: 11, vars: 4, consts: [["otpInput", ""], [1, "forgot-password"], [1, "forgot-password__content"], [1, "forgot-password__title"], [1, "forgot-password__subtitle"], [1, "forgot-password__section"], [1, "forgot-password__field"], ["type", "tel", "placeholder", "S\u1ED0 \u0110I\u1EC6N THO\u1EA0I", "autocomplete", "tel", 1, "forgot-password__input", 3, "input", "value", "disabled"], ["type", "button", 1, "forgot-password__btn"], ["type", "button", 1, "forgot-password__btn", 3, "click"], [1, "forgot-password__resend"], [1, "forgot-password__resend-countdown"], ["type", "button", 1, "forgot-password__resend-btn"], [1, "forgot-password__otp-label"], [1, "forgot-password__otp-row"], ["type", "text", "maxlength", "1", "inputmode", "numeric", "autocomplete", "one-time-code", 1, "forgot-password__otp-box"], [1, "forgot-password__actions"], ["type", "button", 1, "forgot-password__btn", 3, "click", "disabled"], ["routerLink", "/dang-nhap", 1, "forgot-password__back-link"], ["src", "/icons/ic-arrow-left.png", "alt", "", 1, "forgot-password__back-icon"], ["type", "button", 1, "forgot-password__resend-btn", 3, "click"], ["type", "text", "maxlength", "1", "inputmode", "numeric", "autocomplete", "one-time-code", 1, "forgot-password__otp-box", 3, "input", "keydown", "paste"]], template: function ForgotPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1", 3);
      \u0275\u0275text(3, "Qu\xEAn m\u1EADt kh\u1EA9u?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 4);
      \u0275\u0275text(5, " Nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i c\u1EE7a b\u1EA1n \u0111\u1EC3 nh\u1EADn m\xE3 kh\xF4i ph\u1EE5c ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "input", 7);
      \u0275\u0275listener("input", function ForgotPasswordComponent_Template_input_input_8_listener($event) {
        return ctx.setPhone($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, ForgotPasswordComponent_Conditional_9_Template, 2, 0, "button", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, ForgotPasswordComponent_Conditional_10_Template, 16, 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("value", ctx.phone())("disabled", ctx.codeSent());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.codeSent() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.codeSent() ? 10 : -1);
    }
  }, dependencies: [RouterLink], styles: ["\n.forgot-password[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--color-primary-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 124px 24px;\n}\n.forgot-password__content[_ngcontent-%COMP%] {\n  width: 448px;\n  max-width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.forgot-password__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 700;\n  color: var(--color-black);\n  letter-spacing: -0.02em;\n  line-height: 1.125;\n  text-shadow: 0 4px 2px rgba(0, 0, 0, 0.25);\n  margin-bottom: 24px;\n}\n.forgot-password__subtitle[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.8);\n  line-height: 1.56;\n  margin-bottom: 40px;\n}\n.forgot-password__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n  margin-bottom: 16px;\n}\n.forgot-password__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.forgot-password__input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: none;\n  border: none;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  padding: 14px 0;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  outline: none;\n  transition: border-color 0.2s;\n}\n.forgot-password__input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 16px;\n  letter-spacing: 0.1em;\n}\n.forgot-password__input[_ngcontent-%COMP%]:focus {\n  border-bottom-color: var(--color-primary);\n}\n.forgot-password__input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.forgot-password__btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 20px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.forgot-password__btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.forgot-password__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.forgot-password__resend[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 24px;\n  margin-top: 8px;\n}\n.forgot-password__resend-countdown[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n}\n.forgot-password__resend-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-primary);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.forgot-password__resend-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.forgot-password__otp-label[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 16px;\n}\n.forgot-password__otp-row[_ngcontent-%COMP%] {\n  display: flex;\n}\n.forgot-password__otp-box[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 64px;\n  border: 1px solid var(--color-black);\n  border-bottom: 2px solid var(--color-black);\n  background: none;\n  text-align: center;\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  outline: none;\n  transition: border-color 0.2s;\n  min-width: 0;\n}\n.forgot-password__otp-box[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.forgot-password__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.forgot-password__back-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  letter-spacing: 0.085em;\n  text-transform: uppercase;\n  text-decoration: none;\n  transition: color 0.2s;\n}\n.forgot-password__back-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.forgot-password__back-icon[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  object-fit: contain;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=forgot-password.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ForgotPasswordComponent, [{
    type: Component,
    args: [{ selector: "app-forgot-password", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: '<div class="forgot-password">\n\n  <div class="forgot-password__content">\n\n    <!-- Title -->\n    <h1 class="forgot-password__title">Qu\xEAn m\u1EADt kh\u1EA9u?</h1>\n    <p class="forgot-password__subtitle">\n      Nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i c\u1EE7a b\u1EA1n \u0111\u1EC3 nh\u1EADn m\xE3 kh\xF4i ph\u1EE5c\n    </p>\n\n    <!-- Section 1: Phone + Send -->\n    <div class="forgot-password__section">\n      <div class="forgot-password__field">\n        <input\n          class="forgot-password__input"\n          type="tel"\n          placeholder="S\u1ED0 \u0110I\u1EC6N THO\u1EA0I"\n          [value]="phone()"\n          (input)="setPhone($any($event.target).value)"\n          [disabled]="codeSent()"\n          autocomplete="tel"\n        />\n      </div>\n      @if (!codeSent()) {\n        <button class="forgot-password__btn" type="button" (click)="sendCode()">\n          G\u1EECI M\xC3\n        </button>\n      }\n    </div>\n\n    <!-- Resend link (after code sent) -->\n    @if (codeSent()) {\n      <div class="forgot-password__resend">\n        @if (countdown() > 0) {\n          <span class="forgot-password__resend-countdown">G\u1EEDi l\u1EA1i m\xE3 ({{ countdown() }}s)</span>\n        } @else {\n          <button class="forgot-password__resend-btn" type="button" (click)="resendCode()">\n            G\u1EEDi l\u1EA1i m\xE3\n          </button>\n        }\n      </div>\n\n      <!-- Section 2: OTP -->\n      <div class="forgot-password__section">\n        <div class="forgot-password__field">\n          <span class="forgot-password__otp-label">NH\u1EACP M\xC3 OTP</span>\n          <div class="forgot-password__otp-row">\n            @for (i of otpIndices; track i) {\n              <input\n                #otpInput\n                class="forgot-password__otp-box"\n                type="text"\n                maxlength="1"\n                inputmode="numeric"\n                autocomplete="one-time-code"\n                (input)="onOtpInput(i, $event)"\n                (keydown)="onOtpKeydown(i, $event)"\n                (paste)="onOtpPaste($event)"\n              />\n            }\n          </div>\n        </div>\n\n        <div class="forgot-password__actions">\n          <button\n            class="forgot-password__btn"\n            type="button"\n            (click)="confirmOtp()"\n            [disabled]="isSubmitting()"\n          >\n            X\xC1C NH\u1EACN\n          </button>\n          <a routerLink="/dang-nhap" class="forgot-password__back-link">\n            <img src="/icons/ic-arrow-left.png" alt="" class="forgot-password__back-icon" />\n            QUAY L\u1EA0I \u0110\u0102NG NH\u1EACP\n          </a>\n        </div>\n      </div>\n    }\n\n  </div>\n\n</div>\n', styles: ["/* src/app/forgot-password/forgot-password.component.css */\n.forgot-password {\n  min-height: 100vh;\n  background-color: var(--color-primary-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 124px 24px;\n}\n.forgot-password__content {\n  width: 448px;\n  max-width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.forgot-password__title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 700;\n  color: var(--color-black);\n  letter-spacing: -0.02em;\n  line-height: 1.125;\n  text-shadow: 0 4px 2px rgba(0, 0, 0, 0.25);\n  margin-bottom: 24px;\n}\n.forgot-password__subtitle {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.8);\n  line-height: 1.56;\n  margin-bottom: 40px;\n}\n.forgot-password__section {\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n  margin-bottom: 16px;\n}\n.forgot-password__field {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.forgot-password__input {\n  width: 100%;\n  background: none;\n  border: none;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n  padding: 14px 0;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  outline: none;\n  transition: border-color 0.2s;\n}\n.forgot-password__input::placeholder {\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 16px;\n  letter-spacing: 0.1em;\n}\n.forgot-password__input:focus {\n  border-bottom-color: var(--color-primary);\n}\n.forgot-password__input:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.forgot-password__btn {\n  width: 100%;\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  text-align: center;\n  padding: 20px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.forgot-password__btn:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.forgot-password__btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.forgot-password__resend {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 24px;\n  margin-top: 8px;\n}\n.forgot-password__resend-countdown {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n}\n.forgot-password__resend-btn {\n  background: none;\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-primary);\n  text-decoration: underline;\n  text-decoration-skip-ink: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.forgot-password__resend-btn:hover {\n  opacity: 0.8;\n}\n.forgot-password__otp-label {\n  display: block;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 16px;\n}\n.forgot-password__otp-row {\n  display: flex;\n}\n.forgot-password__otp-box {\n  flex: 1;\n  height: 64px;\n  border: 1px solid var(--color-black);\n  border-bottom: 2px solid var(--color-black);\n  background: none;\n  text-align: center;\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  outline: none;\n  transition: border-color 0.2s;\n  min-width: 0;\n}\n.forgot-password__otp-box:focus {\n  border-color: var(--color-primary);\n}\n.forgot-password__actions {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.forgot-password__back-link {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  letter-spacing: 0.085em;\n  text-transform: uppercase;\n  text-decoration: none;\n  transition: color 0.2s;\n}\n.forgot-password__back-link:hover {\n  color: var(--color-primary);\n}\n.forgot-password__back-icon {\n  width: 10px;\n  height: 10px;\n  object-fit: contain;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=forgot-password.component.css.map */\n"] }]
  }], null, { otpInputs: [{
    type: ViewChildren,
    args: ["otpInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgotPasswordComponent, { className: "ForgotPasswordComponent", filePath: "src/app/forgot-password/forgot-password.component.ts", lineNumber: 21 });
})();
export {
  ForgotPasswordComponent
};
//# sourceMappingURL=chunk-KIYGV45I.js.map
