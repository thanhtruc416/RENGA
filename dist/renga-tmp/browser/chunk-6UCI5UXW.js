import {
  RouterLink
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/categories/categories.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function CategoriesComponent_For_5_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 23)(1, "a", 24)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "img", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", link_r1.route);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r1.label);
  }
}
function CategoriesComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 20);
    \u0275\u0275element(2, "img", 21)(3, "div", 7);
    \u0275\u0275elementStart(4, "div", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ul", 22);
    \u0275\u0275repeaterCreate(7, CategoriesComponent_For_5_For_8_Template, 5, 2, "li", 23, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", cat_r2.imageUrl, \u0275\u0275sanitizeUrl)("alt", cat_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", cat_r2.name, " (", cat_r2.englishName, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(cat_r2.links);
  }
}
function CategoriesComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r3 = ctx.$implicit;
    \u0275\u0275property("routerLink", link_r3.route);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", link_r3.label, " ");
  }
}
function CategoriesComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", link_r4.route);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", link_r4.label, " ");
  }
}
function CategoriesComponent_Conditional_36_For_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 41);
  }
}
function CategoriesComponent_Conditional_36_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275conditionalCreate(1, CategoriesComponent_Conditional_36_For_11_Conditional_1_Template, 1, 0, "img", 41);
    \u0275\u0275elementStart(2, "div", 42)(3, "div", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const msg_r7 = ctx.$implicit;
    \u0275\u0275classProp("categories__chat-msg--user", msg_r7.sender === "user");
    \u0275\u0275advance();
    \u0275\u0275conditional(msg_r7.sender === "bot" ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("categories__chat-bubble--user", msg_r7.sender === "user");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(msg_r7.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r7.timestamp);
  }
}
function CategoriesComponent_Conditional_36_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function CategoriesComponent_Conditional_36_For_19_Template_button_click_0_listener() {
      const chip_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.sendChip(chip_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const chip_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(chip_r9);
  }
}
function CategoriesComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 26)(2, "div")(3, "div", 27);
    \u0275\u0275text(4, "REN AI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 28);
    \u0275\u0275text(6, "CHATBOT AI TH\xD4NG MINH C\u1EE6A RENGA");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 29);
    \u0275\u0275listener("click", function CategoriesComponent_Conditional_36_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.closeChatbot());
    });
    \u0275\u0275element(8, "img", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 31);
    \u0275\u0275repeaterCreate(10, CategoriesComponent_Conditional_36_For_11_Template, 7, 7, "div", 32, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 33)(13, "div", 34)(14, "input", 35);
    \u0275\u0275listener("input", function CategoriesComponent_Conditional_36_Template_input_input_14_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.setInputValue($event.target.value));
    })("keydown.enter", function CategoriesComponent_Conditional_36_Template_input_keydown_enter_14_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.sendMessage());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 36);
    \u0275\u0275listener("click", function CategoriesComponent_Conditional_36_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.sendMessage());
    });
    \u0275\u0275element(16, "img", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 38);
    \u0275\u0275repeaterCreate(18, CategoriesComponent_Conditional_36_For_19_Template, 2, 1, "button", 39, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r5.chatMessages());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r5.inputValue());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r5.quickChips);
  }
}
var CategoriesComponent = class _CategoriesComponent {
  topCategories = [
    {
      id: "nhan",
      name: "Nh\u1EABn",
      englishName: "Rings",
      imageUrl: "/images/category-nhan.png",
      links: [
        { label: "Nh\u1EABn C\u01B0\u1EDBi & C\u1EA7u H\xF4n", route: "/products" },
        { label: "V\xE0ng 24K / 18K / 14K", route: "/products" },
        { label: "Kim C\u01B0\u01A1ng Lab-Grown", route: "/products" },
        { label: "Nh\u1EABn Phong Th\u1EE7y", route: "/products" }
      ]
    },
    {
      id: "day-chuyen",
      name: "D\xE2y Chuy\u1EC1n",
      englishName: "Necklaces",
      imageUrl: "/images/category-day-chuyen.png",
      links: [
        { label: "V\xE0ng & V\xE0ng Tr\u1EAFng", route: "/products" },
        { label: "Trang S\u1EE9c B\u1EA1c", route: "/products" },
        { label: "M\u1EB7t D\xE2y Phong Th\u1EE7y", route: "/products" }
      ]
    },
    {
      id: "hoa-tai",
      name: "Hoa Tai",
      englishName: "Earrings",
      imageUrl: "/images/category-hoa-tai.png",
      links: [
        { label: "V\xE0ng & V\xE0ng Tr\u1EAFng", route: "/products" },
        { label: "Hoa Tai B\u1EA1c", route: "/products" },
        { label: "G\u1EAFn \u0110\xE1 Qu\xFD", route: "/products" }
      ]
    }
  ];
  braceletsLinks = [
    { label: "V\xE0ng & V\xE0ng Tr\u1EAFng", route: "/products" },
    { label: "V\xF2ng Charm B\u1EA1c", route: "/products" },
    { label: "\u0110\xE1 Qu\xFD Phong Th\u1EE7y", route: "/products" },
    { label: "L\u1EAFc Charm C\xE1 T\xEDnh", route: "/products" }
  ];
  chatbotOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "chatbotOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chatMessages = signal(
    [
      {
        id: "1",
        sender: "bot",
        text: "Xin ch\xE0o! T\xF4i l\xE0 REN AI Concierge. T\xF4i c\xF3 th\u1EC3 gi\xFAp g\xEC cho b\u1EA1n?",
        timestamp: "REN AI \u2022 NOW"
      }
    ],
    ...ngDevMode ? [{ debugName: "chatMessages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputValue = signal(
    "",
    ...ngDevMode ? [{ debugName: "inputValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  quickChips = ["Collections", "Bespoke Service", "Order Status"];
  toggleChatbot() {
    this.chatbotOpen.update((v) => !v);
  }
  closeChatbot() {
    this.chatbotOpen.set(false);
  }
  setInputValue(value) {
    this.inputValue.set(value);
  }
  sendMessage() {
    const text = this.inputValue().trim();
    if (!text)
      return;
    this.chatMessages.update((msgs) => [
      ...msgs,
      { id: String(msgs.length + 1), sender: "user", text, timestamp: "YOU \u2022 NOW" }
    ]);
    this.inputValue.set("");
  }
  sendChip(chip) {
    this.chatMessages.update((msgs) => [
      ...msgs,
      { id: String(msgs.length + 1), sender: "user", text: chip, timestamp: "YOU \u2022 NOW" }
    ]);
  }
  static \u0275fac = function CategoriesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoriesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoriesComponent, selectors: [["app-categories"]], decls: 37, vars: 1, consts: [[1, "categories"], [1, "categories__title"], [1, "categories__top-grid"], [1, "categories__card"], [1, "categories__bottom-grid"], [1, "categories__card-img-wrap", "categories__card-img-wrap--short"], ["src", "/images/category-lac-vong-tay.png", "alt", "L\u1EAFc & V\xF2ng Tay", 1, "categories__card-img"], [1, "categories__card-gradient"], [1, "categories__card-label"], [1, "categories__bracelet-links"], [1, "categories__bracelet-col"], [1, "categories__card-link", "categories__card-link--plain", 3, "routerLink"], [1, "categories__charm-card"], [1, "categories__charm-inner"], [1, "categories__charm-title"], [1, "categories__charm-desc"], ["routerLink", "/products", 1, "categories__charm-cta"], ["type", "button", "aria-label", "M\u1EDF chatbot REN AI", 1, "categories__chatbot-fab", 3, "click"], ["src", "/icons/ic-chatbot-fab.png", "alt", "", 1, "categories__chatbot-fab-icon"], [1, "categories__chatbot-window"], [1, "categories__card-img-wrap"], [1, "categories__card-img", 3, "src", "alt"], [1, "categories__card-links"], [1, "categories__card-link-item"], [1, "categories__card-link", 3, "routerLink"], ["src", "/icons/ic-arrow-right.png", "alt", "", 1, "categories__link-chevron"], [1, "categories__chatbot-header"], [1, "categories__chatbot-name"], [1, "categories__chatbot-desc"], ["type", "button", "aria-label", "\u0110\xF3ng chatbot", 1, "categories__chatbot-close", 3, "click"], ["src", "/icons/ic-chatbot-close.png", "alt", ""], [1, "categories__chatbot-body"], [1, "categories__chat-msg", 3, "categories__chat-msg--user"], [1, "categories__chatbot-footer"], [1, "categories__chatbot-input-row"], ["type", "text", "placeholder", "Nh\u1EADp c\xE2u h\u1ECFi c\u1EE7a b\u1EA1n...", 1, "categories__chatbot-input", 3, "input", "keydown.enter", "value"], ["type", "button", "aria-label", "G\u1EEDi", 1, "categories__chatbot-send", 3, "click"], ["src", "/icons/ic-chatbot-send.png", "alt", ""], [1, "categories__chatbot-chips"], ["type", "button", 1, "categories__chatbot-chip"], [1, "categories__chat-msg"], ["src", "/icons/ic-chatbot-robot.png", "alt", "REN AI", 1, "categories__chat-avatar"], [1, "categories__chat-content"], [1, "categories__chat-bubble"], [1, "categories__chat-time"], ["type", "button", 1, "categories__chatbot-chip", 3, "click"]], template: function CategoriesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Danh m\u1EE5c s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275repeaterCreate(4, CategoriesComponent_For_5_Template, 9, 4, "div", 3, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 4)(7, "div", 3)(8, "div", 5);
      \u0275\u0275element(9, "img", 6)(10, "div", 7);
      \u0275\u0275elementStart(11, "div", 8);
      \u0275\u0275text(12, "L\u1EAFc & V\xF2ng Tay (Bracelets)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 9)(14, "div", 10);
      \u0275\u0275repeaterCreate(15, CategoriesComponent_For_16_Template, 2, 2, "a", 11, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 10);
      \u0275\u0275repeaterCreate(18, CategoriesComponent_For_19_Template, 2, 2, "a", 11, _forTrack1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 12)(21, "div", 13)(22, "h3", 14);
      \u0275\u0275text(23, " Charm");
      \u0275\u0275element(24, "br");
      \u0275\u0275text(25, "Collection ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p", 15);
      \u0275\u0275text(27, " Ghi l\u1EA1i t\u1EEBng kho\u1EA3nh");
      \u0275\u0275element(28, "br");
      \u0275\u0275text(29, "kh\u1EAFc \u0111\xE1ng nh\u1EDB c\u1EE7a");
      \u0275\u0275element(30, "br");
      \u0275\u0275text(31, "b\u1EA1n. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "a", 16);
      \u0275\u0275text(33, "KH\xC1M PH\xC1 NGAY");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(34, "button", 17);
      \u0275\u0275listener("click", function CategoriesComponent_Template_button_click_34_listener() {
        return ctx.toggleChatbot();
      });
      \u0275\u0275element(35, "img", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(36, CategoriesComponent_Conditional_36_Template, 20, 1, "div", 19);
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.topCategories);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.braceletsLinks.slice(0, 2));
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.braceletsLinks.slice(2, 4));
      \u0275\u0275advance(18);
      \u0275\u0275conditional(ctx.chatbotOpen() ? 36 : -1);
    }
  }, dependencies: [RouterLink], styles: ["\n.categories[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 80px 80px;\n}\n.categories__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-dark);\n  text-align: center;\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin: 48px 0 48px;\n}\n.categories__top-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 28px;\n  margin-bottom: 28px;\n}\n.categories__bottom-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2.14fr 1fr;\n  gap: 28px;\n}\n.categories__card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.categories__card-img-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid rgba(196, 199, 199, 0.2);\n  height: 424px;\n}\n.categories__card-img-wrap--short[_ngcontent-%COMP%] {\n  height: 400px;\n}\n.categories__card-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.categories__card-gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.8) 0%,\n      rgba(0, 0, 0, 0) 60%);\n  opacity: 0.4;\n  pointer-events: none;\n}\n.categories__card-label[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 32px;\n  left: 32px;\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-white);\n  line-height: 1.4;\n  pointer-events: none;\n}\n.categories__card-links[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0 8px;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 11.5px;\n}\n.categories__card-link-item[_ngcontent-%COMP%] {\n  display: block;\n}\n.categories__card-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  color: var(--color-dark);\n  text-decoration: none;\n  line-height: 1.33;\n  transition: color 0.2s;\n}\n.categories__card-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.categories__card-link--plain[_ngcontent-%COMP%] {\n  display: block;\n  justify-content: unset;\n}\n.categories__link-chevron[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 9px;\n  object-fit: contain;\n  flex-shrink: 0;\n  opacity: 0.5;\n}\n.categories__bracelet-links[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 32px;\n  padding: 0 8px;\n}\n.categories__bracelet-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 11.5px;\n}\n.categories__charm-card[_ngcontent-%COMP%] {\n  background-color: var(--color-black);\n  border: 1px solid rgba(196, 199, 199, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 400px;\n}\n.categories__charm-inner[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  padding: 33px;\n  width: calc(100% - 48px - 2px);\n  height: calc(100% - 48px - 2px);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0;\n  text-align: center;\n}\n.categories__charm-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-white);\n  line-height: 1.4;\n  margin-bottom: 24px;\n}\n.categories__charm-desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.7);\n  line-height: 1.5;\n  margin-bottom: 32px;\n}\n.categories__charm-cta[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-white);\n  letter-spacing: 0.1em;\n  text-decoration: none;\n  border-bottom: 1px solid var(--color-white);\n  padding-bottom: 5px;\n  transition: opacity 0.2s;\n}\n.categories__charm-cta[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.categories__chatbot-fab[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 40px;\n  right: 47px;\n  width: 85px;\n  height: 85px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 16px rgba(196, 96, 126, 0.4);\n  transition: transform 0.2s, box-shadow 0.2s;\n  z-index: 100;\n}\n.categories__chatbot-fab[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n  box-shadow: 0 6px 24px rgba(196, 96, 126, 0.5);\n}\n.categories__chatbot-fab-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  object-fit: contain;\n}\n.categories__chatbot-window[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 140px;\n  right: 37px;\n  width: 768px;\n  max-width: calc(100vw - 74px);\n  background-color: var(--color-white);\n  border: 1px solid var(--color-black);\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  z-index: 99;\n}\n.categories__chatbot-header[_ngcontent-%COMP%] {\n  background-color: var(--color-black);\n  border-bottom: 1px solid var(--color-black);\n  padding: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n}\n.categories__chatbot-name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-white);\n  letter-spacing: 0.025em;\n  line-height: 1.4;\n}\n.categories__chatbot-desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.6);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-top: 2px;\n}\n.categories__chatbot-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n.categories__chatbot-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.categories__chatbot-close[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  object-fit: contain;\n  filter: invert(1);\n}\n.categories__chatbot-body[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  height: 450px;\n  overflow-y: auto;\n  padding: 32px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  flex-shrink: 0;\n}\n.categories__chat-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.categories__chat-msg--user[_ngcontent-%COMP%] {\n  flex-direction: row-reverse;\n}\n.categories__chat-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.categories__chat-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 80%;\n}\n.categories__chat-msg--user[_ngcontent-%COMP%]   .categories__chat-content[_ngcontent-%COMP%] {\n  align-items: flex-end;\n}\n.categories__chat-bubble[_ngcontent-%COMP%] {\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 1.625;\n  padding: 20px;\n  border-radius: 10px;\n}\n.categories__chat-bubble--user[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n}\n.categories__chat-time[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 400;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n}\n.categories__chatbot-footer[_ngcontent-%COMP%] {\n  background-color: var(--color-white);\n  border-top: 1px solid var(--color-black);\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  flex-shrink: 0;\n}\n.categories__chatbot-input-row[_ngcontent-%COMP%] {\n  position: relative;\n}\n.categories__chatbot-input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  padding: 15px 48px 15px 13px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  background: none;\n  outline: none;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.categories__chatbot-input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(68, 71, 72, 0.4);\n}\n.categories__chatbot-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.categories__chatbot-send[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 11px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n.categories__chatbot-send[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.categories__chatbot-send[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  object-fit: contain;\n}\n.categories__chatbot-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.categories__chatbot-chip[_ngcontent-%COMP%] {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background: none;\n  padding: 9px 17px;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 400;\n  color: #1a1c1c;\n  cursor: pointer;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.categories__chatbot-chip[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary-light);\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n/*# sourceMappingURL=categories.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoriesComponent, [{
    type: Component,
    args: [{ selector: "app-categories", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="categories">

  <!-- Page Title -->
  <h1 class="categories__title">Danh m\u1EE5c s\u1EA3n ph\u1EA9m</h1>

  <!-- Top Row: 3 equal columns -->
  <div class="categories__top-grid">
    @for (cat of topCategories; track cat.id) {
      <div class="categories__card">
        <div class="categories__card-img-wrap">
          <img [src]="cat.imageUrl" [alt]="cat.name" class="categories__card-img" />
          <div class="categories__card-gradient"></div>
          <div class="categories__card-label">{{ cat.name }} ({{ cat.englishName }})</div>
        </div>
        <ul class="categories__card-links">
          @for (link of cat.links; track link.label) {
            <li class="categories__card-link-item">
              <a [routerLink]="link.route" class="categories__card-link">
                <span>{{ link.label }}</span>
                <img src="/icons/ic-arrow-right.png" alt="" class="categories__link-chevron" />
              </a>
            </li>
          }
        </ul>
      </div>
    }
  </div>

  <!-- Bottom Row -->
  <div class="categories__bottom-grid">

    <!-- L\u1EAFc & V\xF2ng Tay (wide) -->
    <div class="categories__card">
      <div class="categories__card-img-wrap categories__card-img-wrap--short">
        <img src="/images/category-lac-vong-tay.png" alt="L\u1EAFc & V\xF2ng Tay" class="categories__card-img" />
        <div class="categories__card-gradient"></div>
        <div class="categories__card-label">L\u1EAFc & V\xF2ng Tay (Bracelets)</div>
      </div>
      <div class="categories__bracelet-links">
        <div class="categories__bracelet-col">
          @for (link of braceletsLinks.slice(0, 2); track link.label) {
            <a [routerLink]="link.route" class="categories__card-link categories__card-link--plain">
              {{ link.label }}
            </a>
          }
        </div>
        <div class="categories__bracelet-col">
          @for (link of braceletsLinks.slice(2, 4); track link.label) {
            <a [routerLink]="link.route" class="categories__card-link categories__card-link--plain">
              {{ link.label }}
            </a>
          }
        </div>
      </div>
    </div>

    <!-- Charm Collection (dark callout) -->
    <div class="categories__charm-card">
      <div class="categories__charm-inner">
        <h3 class="categories__charm-title">
          Charm<br />Collection
        </h3>
        <p class="categories__charm-desc">
          Ghi l\u1EA1i t\u1EEBng kho\u1EA3nh<br />kh\u1EAFc \u0111\xE1ng nh\u1EDB c\u1EE7a<br />b\u1EA1n.
        </p>
        <a routerLink="/products" class="categories__charm-cta">KH\xC1M PH\xC1 NGAY</a>
      </div>
    </div>

  </div>

</div>

<!-- Chatbot FAB (fixed) -->
<button
  class="categories__chatbot-fab"
  type="button"
  (click)="toggleChatbot()"
  aria-label="M\u1EDF chatbot REN AI"
>
  <img src="/icons/ic-chatbot-fab.png" alt="" class="categories__chatbot-fab-icon" />
</button>

<!-- Chatbot Window (fixed) -->
@if (chatbotOpen()) {
  <div class="categories__chatbot-window">

    <!-- Header -->
    <div class="categories__chatbot-header">
      <div>
        <div class="categories__chatbot-name">REN AI</div>
        <div class="categories__chatbot-desc">CHATBOT AI TH\xD4NG MINH C\u1EE6A RENGA</div>
      </div>
      <button
        class="categories__chatbot-close"
        type="button"
        (click)="closeChatbot()"
        aria-label="\u0110\xF3ng chatbot"
      >
        <img src="/icons/ic-chatbot-close.png" alt="" />
      </button>
    </div>

    <!-- Chat Area -->
    <div class="categories__chatbot-body">
      @for (msg of chatMessages(); track msg.id) {
        <div
          class="categories__chat-msg"
          [class.categories__chat-msg--user]="msg.sender === 'user'"
        >
          @if (msg.sender === 'bot') {
            <img src="/icons/ic-chatbot-robot.png" alt="REN AI" class="categories__chat-avatar" />
          }
          <div class="categories__chat-content">
            <div
              class="categories__chat-bubble"
              [class.categories__chat-bubble--user]="msg.sender === 'user'"
            >{{ msg.text }}</div>
            <span class="categories__chat-time">{{ msg.timestamp }}</span>
          </div>
        </div>
      }
    </div>

    <!-- Input Area -->
    <div class="categories__chatbot-footer">
      <div class="categories__chatbot-input-row">
        <input
          class="categories__chatbot-input"
          type="text"
          placeholder="Nh\u1EADp c\xE2u h\u1ECFi c\u1EE7a b\u1EA1n..."
          [value]="inputValue()"
          (input)="setInputValue($any($event.target).value)"
          (keydown.enter)="sendMessage()"
        />
        <button
          class="categories__chatbot-send"
          type="button"
          (click)="sendMessage()"
          aria-label="G\u1EEDi"
        >
          <img src="/icons/ic-chatbot-send.png" alt="" />
        </button>
      </div>
      <div class="categories__chatbot-chips">
        @for (chip of quickChips; track chip) {
          <button
            class="categories__chatbot-chip"
            type="button"
            (click)="sendChip(chip)"
          >{{ chip }}</button>
        }
      </div>
    </div>

  </div>
}
`, styles: ["/* src/app/categories/categories.component.css */\n.categories {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 80px 80px;\n}\n.categories__title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-dark);\n  text-align: center;\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin: 48px 0 48px;\n}\n.categories__top-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 28px;\n  margin-bottom: 28px;\n}\n.categories__bottom-grid {\n  display: grid;\n  grid-template-columns: 2.14fr 1fr;\n  gap: 28px;\n}\n.categories__card {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.categories__card-img-wrap {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid rgba(196, 199, 199, 0.2);\n  height: 424px;\n}\n.categories__card-img-wrap--short {\n  height: 400px;\n}\n.categories__card-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.categories__card-gradient {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.8) 0%,\n      rgba(0, 0, 0, 0) 60%);\n  opacity: 0.4;\n  pointer-events: none;\n}\n.categories__card-label {\n  position: absolute;\n  bottom: 32px;\n  left: 32px;\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-white);\n  line-height: 1.4;\n  pointer-events: none;\n}\n.categories__card-links {\n  list-style: none;\n  padding: 0 8px;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 11.5px;\n}\n.categories__card-link-item {\n  display: block;\n}\n.categories__card-link {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 500;\n  color: var(--color-dark);\n  text-decoration: none;\n  line-height: 1.33;\n  transition: color 0.2s;\n}\n.categories__card-link:hover {\n  color: var(--color-primary);\n}\n.categories__card-link--plain {\n  display: block;\n  justify-content: unset;\n}\n.categories__link-chevron {\n  width: 5px;\n  height: 9px;\n  object-fit: contain;\n  flex-shrink: 0;\n  opacity: 0.5;\n}\n.categories__bracelet-links {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 32px;\n  padding: 0 8px;\n}\n.categories__bracelet-col {\n  display: flex;\n  flex-direction: column;\n  gap: 11.5px;\n}\n.categories__charm-card {\n  background-color: var(--color-black);\n  border: 1px solid rgba(196, 199, 199, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 400px;\n}\n.categories__charm-inner {\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  padding: 33px;\n  width: calc(100% - 48px - 2px);\n  height: calc(100% - 48px - 2px);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0;\n  text-align: center;\n}\n.categories__charm-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-white);\n  line-height: 1.4;\n  margin-bottom: 24px;\n}\n.categories__charm-desc {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.7);\n  line-height: 1.5;\n  margin-bottom: 32px;\n}\n.categories__charm-cta {\n  display: inline-block;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-white);\n  letter-spacing: 0.1em;\n  text-decoration: none;\n  border-bottom: 1px solid var(--color-white);\n  padding-bottom: 5px;\n  transition: opacity 0.2s;\n}\n.categories__charm-cta:hover {\n  opacity: 0.75;\n}\n.categories__chatbot-fab {\n  position: fixed;\n  bottom: 40px;\n  right: 47px;\n  width: 85px;\n  height: 85px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 16px rgba(196, 96, 126, 0.4);\n  transition: transform 0.2s, box-shadow 0.2s;\n  z-index: 100;\n}\n.categories__chatbot-fab:hover {\n  transform: scale(1.05);\n  box-shadow: 0 6px 24px rgba(196, 96, 126, 0.5);\n}\n.categories__chatbot-fab-icon {\n  width: 50px;\n  height: 50px;\n  object-fit: contain;\n}\n.categories__chatbot-window {\n  position: fixed;\n  bottom: 140px;\n  right: 37px;\n  width: 768px;\n  max-width: calc(100vw - 74px);\n  background-color: var(--color-white);\n  border: 1px solid var(--color-black);\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  z-index: 99;\n}\n.categories__chatbot-header {\n  background-color: var(--color-black);\n  border-bottom: 1px solid var(--color-black);\n  padding: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-shrink: 0;\n}\n.categories__chatbot-name {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-white);\n  letter-spacing: 0.025em;\n  line-height: 1.4;\n}\n.categories__chatbot-desc {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.6);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-top: 2px;\n}\n.categories__chatbot-close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n.categories__chatbot-close:hover {\n  opacity: 1;\n}\n.categories__chatbot-close img {\n  width: 14px;\n  height: 14px;\n  object-fit: contain;\n  filter: invert(1);\n}\n.categories__chatbot-body {\n  background-color: var(--color-primary-light);\n  height: 450px;\n  overflow-y: auto;\n  padding: 32px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  flex-shrink: 0;\n}\n.categories__chat-msg {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.categories__chat-msg--user {\n  flex-direction: row-reverse;\n}\n.categories__chat-avatar {\n  width: 48px;\n  height: 48px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.categories__chat-content {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 80%;\n}\n.categories__chat-msg--user .categories__chat-content {\n  align-items: flex-end;\n}\n.categories__chat-bubble {\n  background-color: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 1.625;\n  padding: 20px;\n  border-radius: 10px;\n}\n.categories__chat-bubble--user {\n  background-color: var(--color-primary);\n}\n.categories__chat-time {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 400;\n  color: var(--color-muted);\n  letter-spacing: 0.1em;\n}\n.categories__chatbot-footer {\n  background-color: var(--color-white);\n  border-top: 1px solid var(--color-black);\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  flex-shrink: 0;\n}\n.categories__chatbot-input-row {\n  position: relative;\n}\n.categories__chatbot-input {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  padding: 15px 48px 15px 13px;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-dark);\n  background: none;\n  outline: none;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.categories__chatbot-input::placeholder {\n  color: rgba(68, 71, 72, 0.4);\n}\n.categories__chatbot-input:focus {\n  border-color: var(--color-primary);\n}\n.categories__chatbot-send {\n  position: absolute;\n  right: 11px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n.categories__chatbot-send:hover {\n  opacity: 1;\n}\n.categories__chatbot-send img {\n  width: 16px;\n  height: 16px;\n  object-fit: contain;\n}\n.categories__chatbot-chips {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.categories__chatbot-chip {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background: none;\n  padding: 9px 17px;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 400;\n  color: #1a1c1c;\n  cursor: pointer;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.categories__chatbot-chip:hover {\n  background-color: var(--color-primary-light);\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n/*# sourceMappingURL=categories.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoriesComponent, { className: "CategoriesComponent", filePath: "src/app/categories/categories.component.ts", lineNumber: 32 });
})();
export {
  CategoriesComponent
};
//# sourceMappingURL=chunk-6UCI5UXW.js.map
