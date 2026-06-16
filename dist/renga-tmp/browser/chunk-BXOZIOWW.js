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
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/appointment-history/appointment-history.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AppointmentHistoryComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 42);
    \u0275\u0275element(2, "img", 43)(3, "div", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 45)(5, "span", 46);
    \u0275\u0275text(6, "S\u1EAEP T\u1EDAI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 47);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 48)(10, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 50);
    \u0275\u0275element(12, "rect", 51)(13, "line", 52)(14, "line", 53)(15, "line", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 50);
    \u0275\u0275element(20, "circle", 55)(21, "polyline", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 50);
    \u0275\u0275element(26, "path", 57)(27, "circle", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(30, "div", 59)(31, "p", 60);
    \u0275\u0275text(32, "C\u1EA7n thay \u0111\u1ED5i l\u1ECBch h\u1EB9n?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p", 61);
    \u0275\u0275text(34, "Vui l\xF2ng th\u1EF1c hi\u1EC7n thay \u0111\u1ED5i \xEDt nh\u1EA5t 24 gi\u1EDD tr\u01B0\u1EDBc bu\u1ED5i t\u01B0 v\u1EA5n \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o ngh\u1EC7 nh\xE2n c\xF3 th\u1EC3 chu\u1EA9n b\u1ECB t\u1ED1t nh\u1EA5t.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 62)(36, "div", 63);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 64);
    \u0275\u0275element(38, "path", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(39, "span");
    \u0275\u0275text(40, "+84 1800 9999");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 63);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(42, "svg", 64);
    \u0275\u0275element(43, "path", 66)(44, "polyline", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(45, "span");
    \u0275\u0275text(46, "bespoke@renga.vn");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.upcomingAppointment.designerThumb, \u0275\u0275sanitizeUrl)("alt", ctx_r0.upcomingAppointment.designer);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.upcomingAppointment.designer);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.upcomingAppointment.date);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r0.upcomingAppointment.timeStart, " - ", ctx_r0.upcomingAppointment.timeEnd, " (GMT+7)");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.upcomingAppointment.location);
  }
}
function AppointmentHistoryComponent_For_42_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275element(1, "span", 76);
    \u0275\u0275elementStart(2, "span", 77);
    \u0275\u0275text(3, "Ho\xE0n th\xE0nh");
    \u0275\u0275elementEnd()();
  }
}
function AppointmentHistoryComponent_For_42_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275element(1, "span", 78);
    \u0275\u0275elementStart(2, "span", 79);
    \u0275\u0275text(3, "\u0110\xE3 h\u1EE7y");
    \u0275\u0275elementEnd()();
  }
}
function AppointmentHistoryComponent_For_42_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275text(1, "XEM B\u1EA2N PH\xC1C TH\u1EA2O");
    \u0275\u0275elementEnd();
  }
}
function AppointmentHistoryComponent_For_42_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 75);
    \u0275\u0275text(1, "\u0110\u1EB6T L\u1EA0I L\u1ECACH");
    \u0275\u0275elementEnd();
  }
}
function AppointmentHistoryComponent_For_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 68)(3, "div", 69);
    \u0275\u0275element(4, "img", 43)(5, "div", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 71);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "td")(9, "div", 72);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275conditionalCreate(12, AppointmentHistoryComponent_For_42_Conditional_12_Template, 4, 0, "div", 73)(13, AppointmentHistoryComponent_For_42_Conditional_13_Template, 4, 0, "div", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275conditionalCreate(15, AppointmentHistoryComponent_For_42_Conditional_15_Template, 2, 0, "button", 74)(16, AppointmentHistoryComponent_For_42_Conditional_16_Template, 2, 0, "a", 75);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const appt_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275property("src", appt_r2.designerThumb, \u0275\u0275sanitizeUrl)("alt", appt_r2.designer);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(appt_r2.designer);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", appt_r2.date, " \xB7 ", appt_r2.timeStart);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(appt_r2.status === "done" ? 12 : appt_r2.status === "cancelled" ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(appt_r2.status === "done" ? 15 : appt_r2.status === "cancelled" ? 16 : -1);
  }
}
var AppointmentHistoryComponent = class _AppointmentHistoryComponent {
  activeTab = signal(
    "sap-toi",
    ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cancelModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "cancelModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  upcomingAppointment = {
    id: "APT-2026-001",
    designer: "Master Henri de Luca",
    designerThumb: "https://www.figma.com/api/mcp/asset/d331c70c-a7eb-4fd4-925e-5103568cd8f0",
    date: "24 Th\xE1ng 10, 2026",
    timeStart: "14:30",
    timeEnd: "15:30",
    location: "Ph\xF2ng VIP Heritage, Flagship Store",
    status: "upcoming"
  };
  historyAppointments = [
    {
      id: "APT-2026-034",
      designer: "Elena Vance",
      designerThumb: "https://www.figma.com/api/mcp/asset/3fbcec17-e28e-4a1b-be69-0bbff5ae980c",
      date: "15 Th\xE1ng 9, 2026",
      timeStart: "10:00",
      status: "done"
    },
    {
      id: "APT-2026-021",
      designer: "Isabella Moretti",
      designerThumb: "https://www.figma.com/api/mcp/asset/b4caeee8-a646-4e0f-bed4-5c2f36e7c974",
      date: "02 Th\xE1ng 8, 2026",
      timeStart: "16:30",
      status: "cancelled"
    }
  ];
  setTab(tab) {
    this.activeTab.set(tab);
  }
  openCancel() {
    this.cancelModalOpen.set(true);
  }
  closeCancel() {
    this.cancelModalOpen.set(false);
  }
  confirmCancel() {
    this.closeCancel();
  }
  static \u0275fac = function AppointmentHistoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppointmentHistoryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppointmentHistoryComponent, selectors: [["app-appointment-history"]], decls: 86, vars: 8, consts: [[1, "appt-page"], [1, "appt-bcrumb-wrap"], [1, "appt-bcrumb-wrap__inner"], [1, "appt-bcrumb"], ["routerLink", "/the-designer", 1, "appt-bcrumb__item"], [1, "appt-bcrumb__sep"], [1, "appt-bcrumb__item", "appt-bcrumb__item--current"], [1, "appt-hero"], [1, "appt-hero__inner"], [1, "appt-hero__title"], ["type", "button", 1, "appt-hero__cancel-btn", 3, "click"], [1, "appt-tabs-bar"], [1, "appt-tabs-bar__inner"], [1, "appt-tabs"], [1, "appt-tab", 3, "click"], [1, "appt-body"], [1, "appt-card"], [1, "appt-history-section"], [1, "appt-history-title"], [1, "appt-table-wrap"], [1, "appt-table"], [1, "appt-load-more-wrap"], ["type", "button", 1, "appt-load-more"], [1, "ltv-modal-backdrop", 3, "click"], [1, "ltv-cancel-modal", 3, "click"], [1, "ltv-cancel-modal__header"], [1, "ltv-cancel-modal__heading"], [1, "ltv-cancel-modal__title"], [1, "ltv-cancel-modal__ref"], ["type", "button", 1, "ltv-cancel-modal__close", 3, "click"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "ltv-cancel-modal__refund-notice"], [1, "ltv-cancel-modal__reasons"], [1, "ltv-cancel-modal__reason-heading"], [1, "ltv-cancel-modal__reason"], ["type", "checkbox"], [1, "ltv-cancel-modal__reason-label"], [1, "ltv-cancel-modal__actions"], ["type", "button", 1, "ltv-cancel-modal__btn", "ltv-cancel-modal__btn--secondary", 3, "click"], ["type", "button", 1, "ltv-cancel-modal__btn", "ltv-cancel-modal__btn--primary", 3, "click"], [1, "appt-card__photo"], [3, "src", "alt"], [1, "appt-card__photo-overlay"], [1, "appt-card__content"], [1, "appt-card__badge"], [1, "appt-card__name"], [1, "appt-card__detail-rows"], [1, "appt-card__row"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "appt-card__banner"], [1, "appt-card__banner-title"], [1, "appt-card__banner-body"], [1, "appt-card__banner-rows"], [1, "appt-card__banner-row"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "white", "stroke-width", "1.8", "opacity", "0.8"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], [1, "appt-designer-cell"], [1, "appt-designer-cell__thumb"], [1, "appt-designer-cell__overlay"], [1, "appt-designer-cell__name"], [1, "appt-date-cell"], [1, "appt-status"], ["type", "button", 1, "appt-action-link"], ["routerLink", "/the-designer", 1, "appt-action-link"], [1, "appt-status__dot", "appt-status__dot--done"], [1, "appt-status__label"], [1, "appt-status__dot", "appt-status__dot--cancelled"], [1, "appt-status__label", "appt-status__label--cancelled"]], template: function AppointmentHistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "nav", 3)(4, "a", 4);
      \u0275\u0275text(5, "THE DESIGNER");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 6);
      \u0275\u0275text(9, "L\u1ECACH T\u01AF V\u1EA4N");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(10, "div", 7)(11, "div", 8)(12, "h1", 9);
      \u0275\u0275text(13, "Danh s\xE1ch l\u1ECBch t\u01B0 v\u1EA5n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 10);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_button_click_14_listener() {
        return ctx.openCancel();
      });
      \u0275\u0275text(15, " H\u1EE6Y L\u1ECACH T\u01AF V\u1EA4N ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 11)(17, "div", 12)(18, "div", 13)(19, "button", 14);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_button_click_19_listener() {
        return ctx.setTab("sap-toi");
      });
      \u0275\u0275text(20, "S\u1EAEP T\u1EDAI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 14);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_button_click_21_listener() {
        return ctx.setTab("lich-su");
      });
      \u0275\u0275text(22, "L\u1ECACH S\u1EEC");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(23, "div", 15);
      \u0275\u0275conditionalCreate(24, AppointmentHistoryComponent_Conditional_24_Template, 47, 7, "div", 16);
      \u0275\u0275elementStart(25, "div", 17)(26, "p", 18);
      \u0275\u0275text(27, "C\xC1C BU\u1ED4I T\u01AF V\u1EA4N TR\u01AF\u1EDAC \u0110\xD3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 19)(29, "table", 20)(30, "thead")(31, "tr")(32, "th");
      \u0275\u0275text(33, "Nh\xE0 thi\u1EBFt k\u1EBF");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "th");
      \u0275\u0275text(35, "Ng\xE0y & Gi\u1EDD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "th");
      \u0275\u0275text(37, "Tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "th");
      \u0275\u0275text(39, "H\xE0nh \u0111\u1ED9ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(40, "tbody");
      \u0275\u0275repeaterCreate(41, AppointmentHistoryComponent_For_42_Template, 17, 7, "tr", null, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 21)(44, "button", 22);
      \u0275\u0275text(45, "XEM TH\xCAM L\u1ECACH S\u1EEC \u2228");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(46, "div", 23);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_div_click_46_listener() {
        return ctx.closeCancel();
      });
      \u0275\u0275elementStart(47, "div", 24);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_div_click_47_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(48, "div", 25)(49, "div", 26)(50, "p", 27);
      \u0275\u0275text(51, "H\u1EE7y l\u1ECBch h\u1EB9n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p", 28);
      \u0275\u0275text(53);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "button", 29);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_button_click_54_listener() {
        return ctx.closeCancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(55, "svg", 30);
      \u0275\u0275element(56, "line", 31)(57, "line", 32);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(58, "div", 33)(59, "strong");
      \u0275\u0275text(60, "Ch\xEDnh s\xE1ch ho\xE0n ti\u1EC1n:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(61, " H\u1EE7y tr\u01B0\u1EDBc 24 gi\u1EDD s\u1EBD \u0111\u01B0\u1EE3c ho\xE0n 100% \u0111\u1EB7t c\u1ECDc. H\u1EE7y trong v\xF2ng 24 gi\u1EDD s\u1EBD m\u1EA5t ph\xED \u0111\u1EB7t c\u1ECDc. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "div", 34)(63, "p", 35);
      \u0275\u0275text(64, "L\xFD do h\u1EE7y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "label", 36);
      \u0275\u0275element(66, "input", 37);
      \u0275\u0275elementStart(67, "span", 38);
      \u0275\u0275text(68, "Thay \u0111\u1ED5i k\u1EBF ho\u1EA1ch c\xE1 nh\xE2n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "label", 36);
      \u0275\u0275element(70, "input", 37);
      \u0275\u0275elementStart(71, "span", 38);
      \u0275\u0275text(72, "Mu\u1ED1n \u0111\u1ED5i sang designer kh\xE1c");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "label", 36);
      \u0275\u0275element(74, "input", 37);
      \u0275\u0275elementStart(75, "span", 38);
      \u0275\u0275text(76, "Ch\u01B0a s\u1EB5n s\xE0ng v\u1EC1 ng\xE2n s\xE1ch");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "label", 36);
      \u0275\u0275element(78, "input", 37);
      \u0275\u0275elementStart(79, "span", 38);
      \u0275\u0275text(80, "L\xFD do kh\xE1c");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(81, "div", 39)(82, "button", 40);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_button_click_82_listener() {
        return ctx.closeCancel();
      });
      \u0275\u0275text(83, "GI\u1EEE L\u1ECACH H\u1EB8N");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "button", 41);
      \u0275\u0275listener("click", function AppointmentHistoryComponent_Template_button_click_84_listener() {
        return ctx.confirmCancel();
      });
      \u0275\u0275text(85, "X\xC1C NH\u1EACN H\u1EE6Y");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275classProp("is-active", ctx.activeTab() === "sap-toi");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.activeTab() === "lich-su");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeTab() === "sap-toi" ? 24 : -1);
      \u0275\u0275advance(17);
      \u0275\u0275repeater(ctx.historyAppointments);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("is-open", ctx.cancelModalOpen());
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.upcomingAppointment.id);
    }
  }, dependencies: [RouterLink], styles: ["\n.appt-page[_ngcontent-%COMP%] {\n  background: var(--color-white);\n}\n.appt-bcrumb-wrap[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-bcrumb-wrap__inner[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 14px var(--container-px);\n}\n.appt-bcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.appt-bcrumb__item[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 500;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  text-decoration: none;\n}\n.appt-bcrumb__item--current[_ngcontent-%COMP%] {\n  color: var(--color-dark);\n  font-weight: 700;\n}\n.appt-bcrumb__sep[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n}\n.appt-hero[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-hero__inner[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 40px var(--container-px) 32px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 24px;\n}\n.appt-hero__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 64px;\n  line-height: 1.1;\n  color: var(--color-primary);\n}\n.appt-hero__cancel-btn[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-white);\n  border: none;\n  font-family: var(--font-sans);\n  font-weight: 700;\n  font-size: 11px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 16px 32px;\n  cursor: pointer;\n  transition: background 0.15s;\n  flex-shrink: 0;\n}\n.appt-hero__cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #9a3f5c;\n}\n.appt-body[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 40px var(--container-px) 80px;\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.appt-tabs-bar[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-tabs-bar__inner[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px);\n}\n.appt-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-tab[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  padding: 16px 32px;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  transition: color 0.15s, border-color 0.15s;\n}\n.appt-tab[_ngcontent-%COMP%]:hover {\n  color: var(--color-dark);\n}\n.appt-tab.is-active[_ngcontent-%COMP%] {\n  color: #9a3f5c;\n  border-bottom-color: #9a3f5c;\n}\n.appt-card[_ngcontent-%COMP%] {\n  background: var(--color-primary-light);\n  border: 1px solid var(--color-black);\n  display: grid;\n  grid-template-columns: 192px 1fr 280px;\n  min-height: 295px;\n}\n.appt-card__photo[_ngcontent-%COMP%] {\n  position: relative;\n  width: 192px;\n  height: 100%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.appt-card__photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n  display: block;\n}\n.appt-card__photo-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: #fff;\n  mix-blend-mode: saturation;\n  pointer-events: none;\n}\n.appt-card__content[_ngcontent-%COMP%] {\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  position: relative;\n}\n.appt-card__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 24px;\n  right: 24px;\n  background: none;\n  border: 1px solid var(--color-primary);\n  color: var(--color-primary);\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 5px 12px;\n}\n.appt-card__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 32px;\n  color: var(--color-dark);\n  line-height: 1.2;\n}\n.appt-card__detail-rows[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.appt-card__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.appt-card__row[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.appt-card__banner[_ngcontent-%COMP%] {\n  background: var(--color-dark);\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  justify-content: center;\n}\n.appt-card__banner-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 22px;\n  color: var(--color-white);\n  line-height: 1.3;\n}\n.appt-card__banner-body[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: rgba(255, 255, 255, 0.7);\n  line-height: 1.6;\n}\n.appt-card__banner-rows[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 8px;\n}\n.appt-card__banner-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.appt-card__banner-row[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: invert(1);\n  opacity: 0.8;\n}\n.appt-card__banner-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-white);\n}\n.appt-history-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.appt-history-title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 16px;\n}\n.appt-table-wrap[_ngcontent-%COMP%] {\n  background: rgba(247, 240, 243, 0.7);\n  overflow: hidden;\n}\n.appt-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.appt-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.04);\n}\n.appt-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  padding: 14px 20px;\n  text-align: left;\n  white-space: nowrap;\n}\n.appt-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 20px;\n  vertical-align: middle;\n  border-top: 1px solid rgba(196, 199, 199, 0.4);\n}\n.appt-designer-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.appt-designer-cell__thumb[_ngcontent-%COMP%] {\n  position: relative;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.appt-designer-cell__thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.appt-designer-cell__overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: #fff;\n  mix-blend-mode: saturation;\n  border-radius: 50%;\n  pointer-events: none;\n}\n.appt-designer-cell__name[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-dark);\n}\n.appt-date-cell[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.appt-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.appt-status__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.appt-status__dot--done[_ngcontent-%COMP%] {\n  background: #888;\n}\n.appt-status__dot--cancelled[_ngcontent-%COMP%] {\n  background: #e05252;\n}\n.appt-status__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.appt-status__label--cancelled[_ngcontent-%COMP%] {\n  color: #e05252;\n}\n.appt-action-link[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  text-decoration: underline;\n  cursor: pointer;\n  background: none;\n  border: none;\n  transition: color 0.15s;\n}\n.appt-action-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.appt-load-more-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.appt-load-more[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  cursor: pointer;\n  padding: 12px 24px;\n  transition: color 0.15s;\n}\n.appt-load-more[_ngcontent-%COMP%]:hover {\n  color: var(--color-dark);\n}\n.ltv-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  z-index: 2000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.2s;\n}\n.ltv-modal-backdrop.is-open[_ngcontent-%COMP%] {\n  opacity: 1;\n  pointer-events: auto;\n}\n.ltv-confirm-modal[_ngcontent-%COMP%] {\n  background: var(--color-white);\n  border-radius: 30px;\n  width: min(600px, 100%);\n  padding: 48px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  text-align: center;\n}\n.ltv-confirm-modal__icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  object-fit: contain;\n}\n.ltv-confirm-modal__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 40px;\n  color: var(--color-dark);\n  line-height: 1.15;\n}\n.ltv-confirm-modal__ref[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.ltv-confirm-modal__body[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--color-muted);\n  line-height: 1.7;\n  max-width: 420px;\n}\n.ltv-confirm-modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  width: 100%;\n  margin-top: 8px;\n}\n.ltv-confirm-modal__btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 18px 24px;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.ltv-confirm-modal__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.ltv-confirm-modal__btn--primary[_ngcontent-%COMP%] {\n  background: #c4607e;\n  color: var(--color-white);\n}\n.ltv-confirm-modal__btn--secondary[_ngcontent-%COMP%] {\n  background: var(--color-primary-light);\n  color: var(--color-dark);\n  border: 1px solid #c4607e;\n}\n.ltv-cancel-modal[_ngcontent-%COMP%] {\n  background: var(--color-white);\n  border-radius: 20px;\n  width: min(540px, 100%);\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.ltv-cancel-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n.ltv-cancel-modal__heading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.ltv-cancel-modal__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  color: var(--color-dark);\n  line-height: 1.15;\n}\n.ltv-cancel-modal__ref[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.ltv-cancel-modal__close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  flex-shrink: 0;\n  opacity: 0.6;\n  transition: opacity 0.15s;\n}\n.ltv-cancel-modal__close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.ltv-cancel-modal__close[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  object-fit: contain;\n}\n.ltv-cancel-modal__refund-notice[_ngcontent-%COMP%] {\n  background: #f3f3f4;\n  border-left: 2px solid #9a3f5c;\n  padding: 14px 16px;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  line-height: 1.6;\n}\n.ltv-cancel-modal__refund-notice[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.ltv-cancel-modal__reasons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.ltv-cancel-modal__reason-heading[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 2px;\n}\n.ltv-cancel-modal__reason[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n}\n.ltv-cancel-modal__reason[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  accent-color: var(--color-primary);\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.ltv-cancel-modal__reason-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.ltv-cancel-modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.ltv-cancel-modal__btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 18px 24px;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.ltv-cancel-modal__btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.ltv-cancel-modal__btn--primary[_ngcontent-%COMP%] {\n  background: #c4607e;\n  color: var(--color-white);\n}\n.ltv-cancel-modal__btn--secondary[_ngcontent-%COMP%] {\n  background: var(--color-primary-light);\n  color: var(--color-dark);\n  border: 1px solid #c4607e;\n}\n/*# sourceMappingURL=appointment-history.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppointmentHistoryComponent, [{
    type: Component,
    args: [{ selector: "app-appointment-history", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="appt-page">\r
\r
  <!-- Breadcrumb -->\r
  <div class="appt-bcrumb-wrap">\r
    <div class="appt-bcrumb-wrap__inner">\r
      <nav class="appt-bcrumb">\r
        <a routerLink="/the-designer" class="appt-bcrumb__item">THE DESIGNER</a>\r
        <span class="appt-bcrumb__sep">\u203A</span>\r
        <span class="appt-bcrumb__item appt-bcrumb__item--current">L\u1ECACH T\u01AF V\u1EA4N</span>\r
      </nav>\r
    </div>\r
  </div>\r
\r
  <!-- Hero: title + action button -->\r
  <div class="appt-hero">\r
    <div class="appt-hero__inner">\r
      <h1 class="appt-hero__title">Danh s\xE1ch l\u1ECBch t\u01B0 v\u1EA5n</h1>\r
      <button class="appt-hero__cancel-btn" type="button" (click)="openCancel()">\r
        H\u1EE6Y L\u1ECACH T\u01AF V\u1EA4N\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Tabs -->\r
  <div class="appt-tabs-bar">\r
    <div class="appt-tabs-bar__inner">\r
      <div class="appt-tabs">\r
        <button class="appt-tab" [class.is-active]="activeTab() === 'sap-toi'" (click)="setTab('sap-toi')">S\u1EAEP T\u1EDAI</button>\r
        <button class="appt-tab" [class.is-active]="activeTab() === 'lich-su'" (click)="setTab('lich-su')">L\u1ECACH S\u1EEC</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="appt-body">\r
\r
    <!-- Upcoming appointment card -->\r
    @if (activeTab() === 'sap-toi') {\r
      <div class="appt-card">\r
        <div class="appt-card__photo">\r
          <img [src]="upcomingAppointment.designerThumb" [alt]="upcomingAppointment.designer">\r
          <div class="appt-card__photo-overlay"></div>\r
        </div>\r
\r
        <div class="appt-card__content">\r
          <span class="appt-card__badge">S\u1EAEP T\u1EDAI</span>\r
          <p class="appt-card__name">{{ upcomingAppointment.designer }}</p>\r
          <div class="appt-card__detail-rows">\r
            <div class="appt-card__row">\r
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">\r
                <rect x="3" y="4" width="18" height="18" rx="2"/>\r
                <line x1="16" y1="2" x2="16" y2="6"/>\r
                <line x1="8" y1="2" x2="8" y2="6"/>\r
                <line x1="3" y1="10" x2="21" y2="10"/>\r
              </svg>\r
              <span>{{ upcomingAppointment.date }}</span>\r
            </div>\r
            <div class="appt-card__row">\r
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">\r
                <circle cx="12" cy="12" r="10"/>\r
                <polyline points="12 6 12 12 16 14"/>\r
              </svg>\r
              <span>{{ upcomingAppointment.timeStart }} - {{ upcomingAppointment.timeEnd }} (GMT+7)</span>\r
            </div>\r
            <div class="appt-card__row">\r
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">\r
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>\r
                <circle cx="12" cy="10" r="3"/>\r
              </svg>\r
              <span>{{ upcomingAppointment.location }}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="appt-card__banner">\r
          <p class="appt-card__banner-title">C\u1EA7n thay \u0111\u1ED5i l\u1ECBch h\u1EB9n?</p>\r
          <p class="appt-card__banner-body">Vui l\xF2ng th\u1EF1c hi\u1EC7n thay \u0111\u1ED5i \xEDt nh\u1EA5t 24 gi\u1EDD tr\u01B0\u1EDBc bu\u1ED5i t\u01B0 v\u1EA5n \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o ngh\u1EC7 nh\xE2n c\xF3 th\u1EC3 chu\u1EA9n b\u1ECB t\u1ED1t nh\u1EA5t.</p>\r
          <div class="appt-card__banner-rows">\r
            <div class="appt-card__banner-row">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" opacity="0.8">\r
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>\r
              </svg>\r
              <span>+84 1800 9999</span>\r
            </div>\r
            <div class="appt-card__banner-row">\r
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" opacity="0.8">\r
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>\r
                <polyline points="22,6 12,13 2,6"/>\r
              </svg>\r
              <span>bespoke&#64;renga.vn</span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- History section -->\r
    <div class="appt-history-section">\r
      <p class="appt-history-title">C\xC1C BU\u1ED4I T\u01AF V\u1EA4N TR\u01AF\u1EDAC \u0110\xD3</p>\r
\r
      <div class="appt-table-wrap">\r
        <table class="appt-table">\r
          <thead>\r
            <tr>\r
              <th>Nh\xE0 thi\u1EBFt k\u1EBF</th>\r
              <th>Ng\xE0y &amp; Gi\u1EDD</th>\r
              <th>Tr\u1EA1ng th\xE1i</th>\r
              <th>H\xE0nh \u0111\u1ED9ng</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @for (appt of historyAppointments; track appt.id) {\r
              <tr>\r
                <td>\r
                  <div class="appt-designer-cell">\r
                    <div class="appt-designer-cell__thumb">\r
                      <img [src]="appt.designerThumb" [alt]="appt.designer">\r
                      <div class="appt-designer-cell__overlay"></div>\r
                    </div>\r
                    <span class="appt-designer-cell__name">{{ appt.designer }}</span>\r
                  </div>\r
                </td>\r
                <td>\r
                  <div class="appt-date-cell">{{ appt.date }} \xB7 {{ appt.timeStart }}</div>\r
                </td>\r
                <td>\r
                  @if (appt.status === 'done') {\r
                    <div class="appt-status">\r
                      <span class="appt-status__dot appt-status__dot--done"></span>\r
                      <span class="appt-status__label">Ho\xE0n th\xE0nh</span>\r
                    </div>\r
                  } @else if (appt.status === 'cancelled') {\r
                    <div class="appt-status">\r
                      <span class="appt-status__dot appt-status__dot--cancelled"></span>\r
                      <span class="appt-status__label appt-status__label--cancelled">\u0110\xE3 h\u1EE7y</span>\r
                    </div>\r
                  }\r
                </td>\r
                <td>\r
                  @if (appt.status === 'done') {\r
                    <button class="appt-action-link" type="button">XEM B\u1EA2N PH\xC1C TH\u1EA2O</button>\r
                  } @else if (appt.status === 'cancelled') {\r
                    <a routerLink="/the-designer" class="appt-action-link">\u0110\u1EB6T L\u1EA0I L\u1ECACH</a>\r
                  }\r
                </td>\r
              </tr>\r
            }\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <div class="appt-load-more-wrap">\r
        <button class="appt-load-more" type="button">XEM TH\xCAM L\u1ECACH S\u1EEC \u2228</button>\r
      </div>\r
    </div>\r
\r
  </div>\r
\r
  <!-- Cancel modal -->\r
  <div class="ltv-modal-backdrop" [class.is-open]="cancelModalOpen()" (click)="closeCancel()">\r
    <div class="ltv-cancel-modal" (click)="$event.stopPropagation()">\r
      <div class="ltv-cancel-modal__header">\r
        <div class="ltv-cancel-modal__heading">\r
          <p class="ltv-cancel-modal__title">H\u1EE7y l\u1ECBch h\u1EB9n</p>\r
          <p class="ltv-cancel-modal__ref">{{ upcomingAppointment.id }}</p>\r
        </div>\r
        <button class="ltv-cancel-modal__close" type="button" (click)="closeCancel()">\r
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <line x1="18" y1="6" x2="6" y2="18"/>\r
            <line x1="6" y1="6" x2="18" y2="18"/>\r
          </svg>\r
        </button>\r
      </div>\r
\r
      <div class="ltv-cancel-modal__refund-notice">\r
        <strong>Ch\xEDnh s\xE1ch ho\xE0n ti\u1EC1n:</strong> H\u1EE7y tr\u01B0\u1EDBc 24 gi\u1EDD s\u1EBD \u0111\u01B0\u1EE3c ho\xE0n 100% \u0111\u1EB7t c\u1ECDc. H\u1EE7y trong v\xF2ng 24 gi\u1EDD s\u1EBD m\u1EA5t ph\xED \u0111\u1EB7t c\u1ECDc.\r
      </div>\r
\r
      <div class="ltv-cancel-modal__reasons">\r
        <p class="ltv-cancel-modal__reason-heading">L\xFD do h\u1EE7y</p>\r
        <label class="ltv-cancel-modal__reason">\r
          <input type="checkbox">\r
          <span class="ltv-cancel-modal__reason-label">Thay \u0111\u1ED5i k\u1EBF ho\u1EA1ch c\xE1 nh\xE2n</span>\r
        </label>\r
        <label class="ltv-cancel-modal__reason">\r
          <input type="checkbox">\r
          <span class="ltv-cancel-modal__reason-label">Mu\u1ED1n \u0111\u1ED5i sang designer kh\xE1c</span>\r
        </label>\r
        <label class="ltv-cancel-modal__reason">\r
          <input type="checkbox">\r
          <span class="ltv-cancel-modal__reason-label">Ch\u01B0a s\u1EB5n s\xE0ng v\u1EC1 ng\xE2n s\xE1ch</span>\r
        </label>\r
        <label class="ltv-cancel-modal__reason">\r
          <input type="checkbox">\r
          <span class="ltv-cancel-modal__reason-label">L\xFD do kh\xE1c</span>\r
        </label>\r
      </div>\r
\r
      <div class="ltv-cancel-modal__actions">\r
        <button class="ltv-cancel-modal__btn ltv-cancel-modal__btn--secondary" type="button" (click)="closeCancel()">GI\u1EEE L\u1ECACH H\u1EB8N</button>\r
        <button class="ltv-cancel-modal__btn ltv-cancel-modal__btn--primary" type="button" (click)="confirmCancel()">X\xC1C NH\u1EACN H\u1EE6Y</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
</div>\r
`, styles: ["/* src/app/appointment-history/appointment-history.component.css */\n.appt-page {\n  background: var(--color-white);\n}\n.appt-bcrumb-wrap {\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-bcrumb-wrap__inner {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 14px var(--container-px);\n}\n.appt-bcrumb {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.appt-bcrumb__item {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 500;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  text-decoration: none;\n}\n.appt-bcrumb__item--current {\n  color: var(--color-dark);\n  font-weight: 700;\n}\n.appt-bcrumb__sep {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n}\n.appt-hero {\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-hero__inner {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 40px var(--container-px) 32px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 24px;\n}\n.appt-hero__title {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 64px;\n  line-height: 1.1;\n  color: var(--color-primary);\n}\n.appt-hero__cancel-btn {\n  background: var(--color-primary);\n  color: var(--color-white);\n  border: none;\n  font-family: var(--font-sans);\n  font-weight: 700;\n  font-size: 11px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 16px 32px;\n  cursor: pointer;\n  transition: background 0.15s;\n  flex-shrink: 0;\n}\n.appt-hero__cancel-btn:hover {\n  background: #9a3f5c;\n}\n.appt-body {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 40px var(--container-px) 80px;\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.appt-tabs-bar {\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-tabs-bar__inner {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px);\n}\n.appt-tabs {\n  display: flex;\n  gap: 0;\n  border-bottom: 1px solid var(--color-border);\n}\n.appt-tab {\n  background: none;\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  padding: 16px 32px;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  transition: color 0.15s, border-color 0.15s;\n}\n.appt-tab:hover {\n  color: var(--color-dark);\n}\n.appt-tab.is-active {\n  color: #9a3f5c;\n  border-bottom-color: #9a3f5c;\n}\n.appt-card {\n  background: var(--color-primary-light);\n  border: 1px solid var(--color-black);\n  display: grid;\n  grid-template-columns: 192px 1fr 280px;\n  min-height: 295px;\n}\n.appt-card__photo {\n  position: relative;\n  width: 192px;\n  height: 100%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.appt-card__photo img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n  display: block;\n}\n.appt-card__photo-overlay {\n  position: absolute;\n  inset: 0;\n  background: #fff;\n  mix-blend-mode: saturation;\n  pointer-events: none;\n}\n.appt-card__content {\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  position: relative;\n}\n.appt-card__badge {\n  position: absolute;\n  top: 24px;\n  right: 24px;\n  background: none;\n  border: 1px solid var(--color-primary);\n  color: var(--color-primary);\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 5px 12px;\n}\n.appt-card__name {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 32px;\n  color: var(--color-dark);\n  line-height: 1.2;\n}\n.appt-card__detail-rows {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.appt-card__row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.appt-card__row img {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.appt-card__banner {\n  background: var(--color-dark);\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  justify-content: center;\n}\n.appt-card__banner-title {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 22px;\n  color: var(--color-white);\n  line-height: 1.3;\n}\n.appt-card__banner-body {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: rgba(255, 255, 255, 0.7);\n  line-height: 1.6;\n}\n.appt-card__banner-rows {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 8px;\n}\n.appt-card__banner-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.appt-card__banner-row img {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: invert(1);\n  opacity: 0.8;\n}\n.appt-card__banner-row span {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-white);\n}\n.appt-history-section {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.appt-history-title {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 16px;\n}\n.appt-table-wrap {\n  background: rgba(247, 240, 243, 0.7);\n  overflow: hidden;\n}\n.appt-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.appt-table thead tr {\n  background: rgba(0, 0, 0, 0.04);\n}\n.appt-table th {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  padding: 14px 20px;\n  text-align: left;\n  white-space: nowrap;\n}\n.appt-table td {\n  padding: 20px;\n  vertical-align: middle;\n  border-top: 1px solid rgba(196, 199, 199, 0.4);\n}\n.appt-designer-cell {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.appt-designer-cell__thumb {\n  position: relative;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.appt-designer-cell__thumb img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.appt-designer-cell__overlay {\n  position: absolute;\n  inset: 0;\n  background: #fff;\n  mix-blend-mode: saturation;\n  border-radius: 50%;\n  pointer-events: none;\n}\n.appt-designer-cell__name {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-dark);\n}\n.appt-date-cell {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.appt-status {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.appt-status__dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.appt-status__dot--done {\n  background: #888;\n}\n.appt-status__dot--cancelled {\n  background: #e05252;\n}\n.appt-status__label {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.appt-status__label--cancelled {\n  color: #e05252;\n}\n.appt-action-link {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  text-decoration: underline;\n  cursor: pointer;\n  background: none;\n  border: none;\n  transition: color 0.15s;\n}\n.appt-action-link:hover {\n  color: var(--color-primary);\n}\n.appt-load-more-wrap {\n  display: flex;\n  justify-content: center;\n}\n.appt-load-more {\n  background: none;\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  cursor: pointer;\n  padding: 12px 24px;\n  transition: color 0.15s;\n}\n.appt-load-more:hover {\n  color: var(--color-dark);\n}\n.ltv-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  z-index: 2000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.2s;\n}\n.ltv-modal-backdrop.is-open {\n  opacity: 1;\n  pointer-events: auto;\n}\n.ltv-confirm-modal {\n  background: var(--color-white);\n  border-radius: 30px;\n  width: min(600px, 100%);\n  padding: 48px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  text-align: center;\n}\n.ltv-confirm-modal__icon {\n  width: 56px;\n  height: 56px;\n  object-fit: contain;\n}\n.ltv-confirm-modal__title {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  font-size: 40px;\n  color: var(--color-dark);\n  line-height: 1.15;\n}\n.ltv-confirm-modal__ref {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.ltv-confirm-modal__body {\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--color-muted);\n  line-height: 1.7;\n  max-width: 420px;\n}\n.ltv-confirm-modal__actions {\n  display: flex;\n  gap: 16px;\n  width: 100%;\n  margin-top: 8px;\n}\n.ltv-confirm-modal__btn {\n  flex: 1;\n  padding: 18px 24px;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.ltv-confirm-modal__btn:hover {\n  opacity: 0.85;\n}\n.ltv-confirm-modal__btn--primary {\n  background: #c4607e;\n  color: var(--color-white);\n}\n.ltv-confirm-modal__btn--secondary {\n  background: var(--color-primary-light);\n  color: var(--color-dark);\n  border: 1px solid #c4607e;\n}\n.ltv-cancel-modal {\n  background: var(--color-white);\n  border-radius: 20px;\n  width: min(540px, 100%);\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.ltv-cancel-modal__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n.ltv-cancel-modal__heading {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.ltv-cancel-modal__title {\n  font-family: var(--font-serif);\n  font-size: 32px;\n  color: var(--color-dark);\n  line-height: 1.15;\n}\n.ltv-cancel-modal__ref {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.ltv-cancel-modal__close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  flex-shrink: 0;\n  opacity: 0.6;\n  transition: opacity 0.15s;\n}\n.ltv-cancel-modal__close:hover {\n  opacity: 1;\n}\n.ltv-cancel-modal__close img {\n  width: 24px;\n  height: 24px;\n  object-fit: contain;\n}\n.ltv-cancel-modal__refund-notice {\n  background: #f3f3f4;\n  border-left: 2px solid #9a3f5c;\n  padding: 14px 16px;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  line-height: 1.6;\n}\n.ltv-cancel-modal__refund-notice strong {\n  font-weight: 700;\n}\n.ltv-cancel-modal__reasons {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.ltv-cancel-modal__reason-heading {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 2px;\n}\n.ltv-cancel-modal__reason {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n}\n.ltv-cancel-modal__reason input[type=checkbox] {\n  width: 18px;\n  height: 18px;\n  accent-color: var(--color-primary);\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.ltv-cancel-modal__reason-label {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.ltv-cancel-modal__actions {\n  display: flex;\n  gap: 16px;\n}\n.ltv-cancel-modal__btn {\n  flex: 1;\n  padding: 18px 24px;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.ltv-cancel-modal__btn:hover {\n  opacity: 0.85;\n}\n.ltv-cancel-modal__btn--primary {\n  background: #c4607e;\n  color: var(--color-white);\n}\n.ltv-cancel-modal__btn--secondary {\n  background: var(--color-primary-light);\n  color: var(--color-dark);\n  border: 1px solid #c4607e;\n}\n/*# sourceMappingURL=appointment-history.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppointmentHistoryComponent, { className: "AppointmentHistoryComponent", filePath: "src/app/appointment-history/appointment-history.component.ts", lineNumber: 23 });
})();
export {
  AppointmentHistoryComponent
};
//# sourceMappingURL=chunk-BXOZIOWW.js.map
