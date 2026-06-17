import {
  RouterLink
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/profile/profile.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.label;
function ProfileComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5)(1, "div", 42);
    \u0275\u0275element(2, "img", 43);
    \u0275\u0275elementStart(3, "div", 44)(4, "p", 45);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 46);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(8, "img", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", link_r1.route);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", link_r1.iconUrl, \u0275\u0275sanitizeUrl)("alt", link_r1.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(link_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r1.description);
  }
}
function ProfileComponent_For_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span", 48);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 49);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("+", item_r2.points.toLocaleString("vi-VN"));
  }
}
var ProfileComponent = class _ProfileComponent {
  user = signal(
    {
      fullName: "Nguy\u1EC5n Th\u1ECB Ho\xE0ng Anh",
      email: "anhnth23416@gmail.com",
      phone: "+84 7700 900077",
      birthDate: "22/02/2005",
      address: "123 Nguy\u1EC5n V\u0103n C\u1EEB, Qu\u1EADn 7, TP. H\u1ED3 Ch\xED Minh"
    },
    ...ngDevMode ? [{ debugName: "user" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loyaltyTier = signal(
    "Gold",
    ...ngDevMode ? [{ debugName: "loyaltyTier" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loyaltyPoints = signal(
    4250,
    ...ngDevMode ? [{ debugName: "loyaltyPoints" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loyaltyNextTierPoints = signal(
    5e3,
    ...ngDevMode ? [{ debugName: "loyaltyNextTierPoints" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loyaltyHistory = signal(
    [
      { label: "Mua kim c\u01B0\u01A1ng", points: 1200 },
      { label: "Th\u01B0\u1EDFng k\u1EF7 ni\u1EC7m", points: 500 }
    ],
    ...ngDevMode ? [{ debugName: "loyaltyHistory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loyaltyProgress = computed(
    () => Math.round(this.loyaltyPoints() / this.loyaltyNextTierPoints() * 100),
    ...ngDevMode ? [{ debugName: "loyaltyProgress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loyaltyRemaining = computed(
    () => this.loyaltyNextTierPoints() - this.loyaltyPoints(),
    ...ngDevMode ? [{ debugName: "loyaltyRemaining" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dashboardLinks = [
    {
      key: "rewards",
      title: "\u0110\u1ED4I TH\u01AF\u1EDENG",
      description: "S\u1EED d\u1EE5ng \u0111i\u1EC3m t\xEDch l\u0169y cho c\xE1c \u0111\u1EB7c quy\u1EC1n cao c\u1EA5p",
      route: "/profile/rewards",
      iconUrl: "/icons/ic-profile-rewards.png"
    },
    {
      key: "history",
      title: "L\u1ECACH S\u1EEC T\xCDCH \u0110I\u1EC2M",
      description: "Xem chi ti\u1EBFt c\xE1c giao d\u1ECBch v\xE0 \u0111i\u1EC3m th\u01B0\u1EDFng",
      route: "/profile/points-history",
      iconUrl: "/icons/ic-profile-history.png"
    }
  ];
  currentPassword = signal(
    "",
    ...ngDevMode ? [{ debugName: "currentPassword" }] : (
      /* istanbul ignore next */
      []
    )
  );
  newPassword = signal(
    "",
    ...ngDevMode ? [{ debugName: "newPassword" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setCurrentPassword(value) {
    this.currentPassword.set(value);
  }
  setNewPassword(value) {
    this.newPassword.set(value);
  }
  updatePassword() {
  }
  static \u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 79, vars: 13, consts: [[1, "profile"], [1, "profile__hero"], [1, "profile__hero-title"], [1, "profile__hero-subtitle"], [1, "profile__gateway"], [1, "profile__gateway-card", 3, "routerLink"], [1, "profile__sections"], [1, "profile__info-card"], [1, "profile__info-header"], [1, "profile__info-title"], ["type", "button", 1, "profile__info-edit-btn"], [1, "profile__info-grid"], [1, "profile__info-field"], [1, "profile__field-label"], [1, "profile__field-value"], [1, "profile__field-value", "profile__field-value--with-icon"], [1, "profile__info-field", "profile__info-field--full"], [1, "profile__loyalty-card"], ["src", "/icons/ic-loyalty-sparkle.png", "alt", "", "aria-hidden", "true", 1, "profile__loyalty-sparkle"], [1, "profile__loyalty-top"], [1, "profile__loyalty-tier"], [1, "profile__loyalty-tier-label"], [1, "profile__loyalty-tier-name"], ["src", "/icons/ic-loyalty-diamond.png", "alt", "", 1, "profile__loyalty-diamond"], [1, "profile__loyalty-progress-section"], [1, "profile__loyalty-progress-labels"], [1, "profile__loyalty-points"], [1, "profile__loyalty-remaining"], [1, "profile__loyalty-progress-bg"], [1, "profile__loyalty-progress-fill"], [1, "profile__loyalty-history"], [1, "profile__loyalty-history-label"], [1, "profile__loyalty-history-item"], [1, "profile__security"], [1, "profile__security-title"], [1, "profile__security-fields"], [1, "profile__security-field"], ["for", "current-password", 1, "profile__security-label"], ["id", "current-password", "type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "profile__security-input", 3, "input", "value"], ["for", "new-password", 1, "profile__security-label"], ["id", "new-password", "type", "password", "placeholder", "Nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi", 1, "profile__security-input", 3, "input", "value"], ["type", "button", 1, "profile__security-btn", 3, "click"], [1, "profile__gateway-body"], [1, "profile__gateway-icon", 3, "src", "alt"], [1, "profile__gateway-text"], [1, "profile__gateway-title"], [1, "profile__gateway-desc"], ["src", "/icons/ic-arrow-right.png", "alt", "", 1, "profile__gateway-arrow"], [1, "profile__loyalty-history-name"], [1, "profile__loyalty-history-points"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "h1", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "Qu\u1EA3n l\xFD h\xE0nh tr\xECnh thi\u1EBFt k\u1EBF ri\xEAng v\xE0 c\xE1c \u0111\u1EB7c quy\u1EC1n th\xE0nh vi\xEAn c\u1EE7a b\u1EA1n.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275repeaterCreate(7, ProfileComponent_For_8_Template, 9, 5, "a", 5, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 6)(10, "section", 7)(11, "div", 8)(12, "h2", 9);
      \u0275\u0275text(13, "TH\xD4NG TIN C\xC1 NH\xC2N");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 10);
      \u0275\u0275text(15, "Ch\u1EC9nh s\u1EEDa");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 11)(17, "div", 12)(18, "label", 13);
      \u0275\u0275text(19, "H\u1ECD v\xE0 t\xEAn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 14);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 12)(23, "label", 13);
      \u0275\u0275text(24, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 14);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 12)(28, "label", 13);
      \u0275\u0275text(29, "S\u0110T");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 14);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 12)(33, "label", 13);
      \u0275\u0275text(34, "Ng\xE0y sinh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 15)(36, "span");
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(38, "div", 16)(39, "label", 13);
      \u0275\u0275text(40, "\u0110\u1ECBa ch\u1EC9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 14);
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "section", 17);
      \u0275\u0275element(44, "img", 18);
      \u0275\u0275elementStart(45, "div", 19)(46, "div", 20)(47, "p", 21);
      \u0275\u0275text(48, "H\u1EA0NG TH\xC0NH VI\xCAN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "h2", 22);
      \u0275\u0275text(50);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(51, "img", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 24)(53, "div", 25)(54, "span", 26);
      \u0275\u0275text(55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "span", 27);
      \u0275\u0275text(57);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 28);
      \u0275\u0275element(59, "div", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div", 30)(61, "p", 31);
      \u0275\u0275text(62, "\u0110i\u1EC3m t\xEDch l\u0169y");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(63, ProfileComponent_For_64_Template, 5, 2, "div", 32, _forTrack1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(65, "section", 33)(66, "h2", 34);
      \u0275\u0275text(67, "TH\xD4NG TIN B\u1EA2O M\u1EACT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div", 35)(69, "div", 36)(70, "label", 37);
      \u0275\u0275text(71, "M\u1EACT KH\u1EA8U HI\u1EC6N T\u1EA0I");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "input", 38);
      \u0275\u0275listener("input", function ProfileComponent_Template_input_input_72_listener($event) {
        return ctx.setCurrentPassword($event.target.value);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "div", 36)(74, "label", 39);
      \u0275\u0275text(75, "M\u1EACT KH\u1EA8U M\u1EDAI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "input", 40);
      \u0275\u0275listener("input", function ProfileComponent_Template_input_input_76_listener($event) {
        return ctx.setNewPassword($event.target.value);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(77, "button", 41);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_77_listener() {
        return ctx.updatePassword();
      });
      \u0275\u0275text(78, " C\u1EACP NH\u1EACT TH\xD4NG TIN ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i, ", ctx.user().fullName.split(" ").pop());
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.dashboardLinks);
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.user().fullName);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.user().email);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.user().phone);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.user().birthDate);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.user().address);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.loyaltyTier());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.loyaltyPoints().toLocaleString("vi-VN"), " \u0111i\u1EC3m");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.loyaltyRemaining().toLocaleString("vi-VN"), " n\u1EEFa");
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.loyaltyProgress(), "%");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.loyaltyHistory());
      \u0275\u0275advance(9);
      \u0275\u0275property("value", ctx.currentPassword());
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.newPassword());
    }
  }, dependencies: [RouterLink], styles: ["\n.profile[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 65px 80px;\n}\n.profile__hero[_ngcontent-%COMP%] {\n  padding: 48px 0 24px;\n}\n.profile__hero-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin-bottom: 12px;\n  width: 894px;\n  max-width: 100%;\n}\n.profile__hero-subtitle[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.6;\n}\n.profile__gateway[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 32px;\n  margin-bottom: 32px;\n}\n.profile__gateway-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: var(--color-primary-light);\n  border: 1px solid var(--color-border);\n  padding: 33px;\n  height: 134px;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s;\n}\n.profile__gateway-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-card);\n}\n.profile__gateway-body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n}\n.profile__gateway-icon[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 24px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.profile__gateway-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.profile__gateway-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.profile__gateway-desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.43;\n}\n.profile__gateway-arrow[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.profile__sections[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 540px;\n  gap: 33px;\n  margin-bottom: 32px;\n  align-items: start;\n}\n.profile__info-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-black);\n  background-color: var(--color-white);\n  padding: 41px;\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  min-height: 487px;\n}\n.profile__info-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.profile__info-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.profile__info-edit-btn[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-price);\n  letter-spacing: 0.1em;\n  border-bottom: 1px solid var(--color-price);\n  padding-bottom: 5px;\n  background: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.profile__info-edit-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.profile__info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n}\n.profile__info-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.profile__info-field--full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.profile__field-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.profile__field-value[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #1a1c1c;\n  padding: 8px 0 9px;\n  border-bottom: 1px solid var(--color-black);\n  line-height: 1.6;\n}\n.profile__field-value--with-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.profile__loyalty-card[_ngcontent-%COMP%] {\n  background-color: var(--color-black);\n  padding: 40px;\n  min-height: 487px;\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  position: relative;\n  overflow: hidden;\n}\n.profile__loyalty-sparkle[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -40px;\n  right: -40px;\n  width: 165px;\n  height: 170px;\n  pointer-events: none;\n}\n.profile__loyalty-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n.profile__loyalty-tier[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.profile__loyalty-tier-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.7);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.profile__loyalty-tier-name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 36px;\n  font-weight: 700;\n  color: var(--color-white);\n  line-height: 1.5;\n}\n.profile__loyalty-diamond[_ngcontent-%COMP%] {\n  width: 38.5px;\n  height: 34px;\n  object-fit: contain;\n}\n.profile__loyalty-progress-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.profile__loyalty-progress-labels[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n.profile__loyalty-points[_ngcontent-%COMP%], \n.profile__loyalty-remaining[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-white);\n  letter-spacing: 0.15em;\n}\n.profile__loyalty-progress-bg[_ngcontent-%COMP%] {\n  height: 4px;\n  background-color: #858383;\n  width: 100%;\n  border-radius: 2px;\n  overflow: hidden;\n}\n.profile__loyalty-progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background-color: #fe8fae;\n  border-radius: 2px;\n  transition: width 0.4s ease;\n}\n.profile__loyalty-history[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.profile__loyalty-history-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.7);\n  letter-spacing: 0.15em;\n  padding-bottom: 9px;\n  border-bottom: 1px solid #858383;\n}\n.profile__loyalty-history-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.profile__loyalty-history-name[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-white);\n  line-height: 1.6;\n}\n.profile__loyalty-history-points[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #fe8fae;\n  line-height: 1.6;\n}\n.profile__security[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  border: 1px solid var(--color-border);\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.profile__security-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.profile__security-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 546px 1fr;\n  gap: 40px;\n}\n.profile__security-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.profile__security-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 400;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.profile__security-input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  padding: 11px 1px 12px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(68, 71, 72, 0.3);\n  background: none;\n  outline: none;\n  transition: border-color 0.2s;\n}\n.profile__security-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  color: var(--color-dark);\n}\n.profile__security-input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(68, 71, 72, 0.3);\n}\n.profile__security-btn[_ngcontent-%COMP%] {\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  padding: 16px 48px;\n  width: fit-content;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.profile__security-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n/*# sourceMappingURL=profile.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileComponent, [{
    type: Component,
    args: [{ selector: "app-profile", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="profile">

  <!-- Welcome Hero -->
  <section class="profile__hero">
    <h1 class="profile__hero-title">Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i, {{ user().fullName.split(' ').pop() }}</h1>
    <p class="profile__hero-subtitle">Qu\u1EA3n l\xFD h\xE0nh tr\xECnh thi\u1EBFt k\u1EBF ri\xEAng v\xE0 c\xE1c \u0111\u1EB7c quy\u1EC1n th\xE0nh vi\xEAn c\u1EE7a b\u1EA1n.</p>
  </section>

  <!-- Dashboard Gateway Links -->
  <div class="profile__gateway">
    @for (link of dashboardLinks; track link.key) {
      <a [routerLink]="link.route" class="profile__gateway-card">
        <div class="profile__gateway-body">
          <img [src]="link.iconUrl" [alt]="link.title" class="profile__gateway-icon" />
          <div class="profile__gateway-text">
            <p class="profile__gateway-title">{{ link.title }}</p>
            <p class="profile__gateway-desc">{{ link.description }}</p>
          </div>
        </div>
        <img src="/icons/ic-arrow-right.png" alt="" class="profile__gateway-arrow" />
      </a>
    }
  </div>

  <!-- Main Sections: Personal Info + Loyalty Card -->
  <div class="profile__sections">

    <!-- Personal Info -->
    <section class="profile__info-card">
      <div class="profile__info-header">
        <h2 class="profile__info-title">TH\xD4NG TIN C\xC1 NH\xC2N</h2>
        <button class="profile__info-edit-btn" type="button">Ch\u1EC9nh s\u1EEDa</button>
      </div>

      <div class="profile__info-grid">
        <div class="profile__info-field">
          <label class="profile__field-label">H\u1ECD v\xE0 t\xEAn</label>
          <div class="profile__field-value">{{ user().fullName }}</div>
        </div>
        <div class="profile__info-field">
          <label class="profile__field-label">Email</label>
          <div class="profile__field-value">{{ user().email }}</div>
        </div>
        <div class="profile__info-field">
          <label class="profile__field-label">S\u0110T</label>
          <div class="profile__field-value">{{ user().phone }}</div>
        </div>
        <div class="profile__info-field">
          <label class="profile__field-label">Ng\xE0y sinh</label>
          <div class="profile__field-value profile__field-value--with-icon">
            <span>{{ user().birthDate }}</span>
          </div>
        </div>
      </div>

      <div class="profile__info-field profile__info-field--full">
        <label class="profile__field-label">\u0110\u1ECBa ch\u1EC9</label>
        <div class="profile__field-value">{{ user().address }}</div>
      </div>
    </section>

    <!-- Loyalty Status Card -->
    <section class="profile__loyalty-card">
      <img src="/icons/ic-loyalty-sparkle.png" alt="" class="profile__loyalty-sparkle" aria-hidden="true" />

      <div class="profile__loyalty-top">
        <div class="profile__loyalty-tier">
          <p class="profile__loyalty-tier-label">H\u1EA0NG TH\xC0NH VI\xCAN</p>
          <h2 class="profile__loyalty-tier-name">{{ loyaltyTier() }}</h2>
        </div>
        <img src="/icons/ic-loyalty-diamond.png" alt="" class="profile__loyalty-diamond" />
      </div>

      <div class="profile__loyalty-progress-section">
        <div class="profile__loyalty-progress-labels">
          <span class="profile__loyalty-points">{{ loyaltyPoints().toLocaleString('vi-VN') }} \u0111i\u1EC3m</span>
          <span class="profile__loyalty-remaining">{{ loyaltyRemaining().toLocaleString('vi-VN') }} n\u1EEFa</span>
        </div>
        <div class="profile__loyalty-progress-bg">
          <div class="profile__loyalty-progress-fill" [style.width.%]="loyaltyProgress()"></div>
        </div>
      </div>

      <div class="profile__loyalty-history">
        <p class="profile__loyalty-history-label">\u0110i\u1EC3m t\xEDch l\u0169y</p>
        @for (item of loyaltyHistory(); track item.label) {
          <div class="profile__loyalty-history-item">
            <span class="profile__loyalty-history-name">{{ item.label }}</span>
            <span class="profile__loyalty-history-points">+{{ item.points.toLocaleString('vi-VN') }}</span>
          </div>
        }
      </div>
    </section>

  </div>

  <!-- Security Section -->
  <section class="profile__security">
    <h2 class="profile__security-title">TH\xD4NG TIN B\u1EA2O M\u1EACT</h2>
    <div class="profile__security-fields">
      <div class="profile__security-field">
        <label class="profile__security-label" for="current-password">M\u1EACT KH\u1EA8U HI\u1EC6N T\u1EA0I</label>
        <input
          id="current-password"
          type="password"
          class="profile__security-input"
          [value]="currentPassword()"
          (input)="setCurrentPassword($any($event.target).value)"
          placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
        />
      </div>
      <div class="profile__security-field">
        <label class="profile__security-label" for="new-password">M\u1EACT KH\u1EA8U M\u1EDAI</label>
        <input
          id="new-password"
          type="password"
          class="profile__security-input"
          [value]="newPassword()"
          (input)="setNewPassword($any($event.target).value)"
          placeholder="Nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi"
        />
      </div>
    </div>
    <button class="profile__security-btn" type="button" (click)="updatePassword()">
      C\u1EACP NH\u1EACT TH\xD4NG TIN
    </button>
  </section>

</div>
`, styles: ["/* src/app/profile/profile.component.css */\n.profile {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 65px 80px;\n}\n.profile__hero {\n  padding: 48px 0 24px;\n}\n.profile__hero-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin-bottom: 12px;\n  width: 894px;\n  max-width: 100%;\n}\n.profile__hero-subtitle {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.6;\n}\n.profile__gateway {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 32px;\n  margin-bottom: 32px;\n}\n.profile__gateway-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: var(--color-primary-light);\n  border: 1px solid var(--color-border);\n  padding: 33px;\n  height: 134px;\n  text-decoration: none;\n  color: inherit;\n  transition: box-shadow 0.2s;\n}\n.profile__gateway-card:hover {\n  box-shadow: var(--shadow-card);\n}\n.profile__gateway-body {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n}\n.profile__gateway-icon {\n  width: 26px;\n  height: 24px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.profile__gateway-text {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.profile__gateway-title {\n  font-family: var(--font-serif);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.profile__gateway-desc {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.43;\n}\n.profile__gateway-arrow {\n  width: 15px;\n  height: 15px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.profile__sections {\n  display: grid;\n  grid-template-columns: 1fr 540px;\n  gap: 33px;\n  margin-bottom: 32px;\n  align-items: start;\n}\n.profile__info-card {\n  border: 1px solid var(--color-black);\n  background-color: var(--color-white);\n  padding: 41px;\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  min-height: 487px;\n}\n.profile__info-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.profile__info-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.profile__info-edit-btn {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-price);\n  letter-spacing: 0.1em;\n  border-bottom: 1px solid var(--color-price);\n  padding-bottom: 5px;\n  background: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.profile__info-edit-btn:hover {\n  opacity: 0.75;\n}\n.profile__info-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n}\n.profile__info-field {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.profile__info-field--full {\n  grid-column: 1 / -1;\n}\n.profile__field-label {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.profile__field-value {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #1a1c1c;\n  padding: 8px 0 9px;\n  border-bottom: 1px solid var(--color-black);\n  line-height: 1.6;\n}\n.profile__field-value--with-icon {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.profile__loyalty-card {\n  background-color: var(--color-black);\n  padding: 40px;\n  min-height: 487px;\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  position: relative;\n  overflow: hidden;\n}\n.profile__loyalty-sparkle {\n  position: absolute;\n  bottom: -40px;\n  right: -40px;\n  width: 165px;\n  height: 170px;\n  pointer-events: none;\n}\n.profile__loyalty-top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n.profile__loyalty-tier {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.profile__loyalty-tier-label {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.7);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.profile__loyalty-tier-name {\n  font-family: var(--font-serif);\n  font-size: 36px;\n  font-weight: 700;\n  color: var(--color-white);\n  line-height: 1.5;\n}\n.profile__loyalty-diamond {\n  width: 38.5px;\n  height: 34px;\n  object-fit: contain;\n}\n.profile__loyalty-progress-section {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.profile__loyalty-progress-labels {\n  display: flex;\n  justify-content: space-between;\n}\n.profile__loyalty-points,\n.profile__loyalty-remaining {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-white);\n  letter-spacing: 0.15em;\n}\n.profile__loyalty-progress-bg {\n  height: 4px;\n  background-color: #858383;\n  width: 100%;\n  border-radius: 2px;\n  overflow: hidden;\n}\n.profile__loyalty-progress-fill {\n  height: 100%;\n  background-color: #fe8fae;\n  border-radius: 2px;\n  transition: width 0.4s ease;\n}\n.profile__loyalty-history {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.profile__loyalty-history-label {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.7);\n  letter-spacing: 0.15em;\n  padding-bottom: 9px;\n  border-bottom: 1px solid #858383;\n}\n.profile__loyalty-history-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.profile__loyalty-history-name {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-white);\n  line-height: 1.6;\n}\n.profile__loyalty-history-points {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #fe8fae;\n  line-height: 1.6;\n}\n.profile__security {\n  background-color: var(--color-primary-light);\n  border: 1px solid var(--color-border);\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.profile__security-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.profile__security-fields {\n  display: grid;\n  grid-template-columns: 546px 1fr;\n  gap: 40px;\n}\n.profile__security-field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.profile__security-label {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 400;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.profile__security-input {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  padding: 11px 1px 12px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(68, 71, 72, 0.3);\n  background: none;\n  outline: none;\n  transition: border-color 0.2s;\n}\n.profile__security-input:focus {\n  border-color: var(--color-primary);\n  color: var(--color-dark);\n}\n.profile__security-input::placeholder {\n  color: rgba(68, 71, 72, 0.3);\n}\n.profile__security-btn {\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  padding: 16px 48px;\n  width: fit-content;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.profile__security-btn:hover {\n  opacity: 0.85;\n}\n/*# sourceMappingURL=profile.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/profile/profile.component.ts", lineNumber: 33 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-A5RW3DBZ.js.map
