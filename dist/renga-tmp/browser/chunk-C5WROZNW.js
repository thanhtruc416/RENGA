import {
  DefaultValueAccessor,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-UV6W5DLS.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/design/design.component.ts
var _c0 = () => ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
var _forTrack0 = ($index, $item) => $item.n;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.value;
function DesignComponent_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 5);
    \u0275\u0275element(1, "path", 8);
    \u0275\u0275elementEnd();
  }
}
function DesignComponent_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const step_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", step_r2.n, " ");
  }
}
function DesignComponent_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 9);
  }
  if (rf & 2) {
    const step_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("step-progress__connector--done", ctx_r2.currentStep() > step_r2.n);
  }
}
function DesignComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275listener("click", function DesignComponent_For_3_Template_div_click_0_listener() {
      const step_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.currentStep() > step_r2.n && ctx_r2.goToStep(step_r2.n));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275conditionalCreate(2, DesignComponent_For_3_Conditional_2_Template, 2, 0, ":svg:svg", 5)(3, DesignComponent_For_3_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, DesignComponent_For_3_Conditional_6_Template, 1, 2, "div", 7);
  }
  if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const \u0275$index_5_r4 = ctx.$index;
    const \u0275$count_5_r5 = ctx.$count;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("cursor", ctx_r2.currentStep() > step_r2.n ? "pointer" : "default");
    \u0275\u0275classProp("step-progress__item--active", ctx_r2.currentStep() === step_r2.n)("step-progress__item--done", ctx_r2.currentStep() > step_r2.n);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.currentStep() > step_r2.n ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r2.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_5_r4 === \u0275$count_5_r5 - 1) ? 6 : -1);
  }
}
function DesignComponent_Conditional_4_For_5_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 25);
    \u0275\u0275element(1, "path", 32);
    \u0275\u0275elementEnd();
  }
}
function DesignComponent_Conditional_4_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 15);
    \u0275\u0275listener("click", function DesignComponent_Conditional_4_For_5_Template_article_click_0_listener() {
      const designer_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectDesigner(designer_r7));
    })("keydown.enter", function DesignComponent_Conditional_4_For_5_Template_article_keydown_enter_0_listener() {
      const designer_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectDesigner(designer_r7));
    });
    \u0275\u0275elementStart(1, "div", 16);
    \u0275\u0275element(2, "img", 17)(3, "div", 18);
    \u0275\u0275elementStart(4, "div", 19)(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 21)(8, "div", 22)(9, "h3", 23);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 24);
    \u0275\u0275repeaterCreate(12, DesignComponent_Conditional_4_For_5_For_13_Template, 2, 0, ":svg:svg", 25, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 26);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 27)(17, "div", 28)(18, "span", 29);
    \u0275\u0275text(19, "PH\xCD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 30);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "button", 31);
    \u0275\u0275listener("click", function DesignComponent_Conditional_4_For_5_Template_button_click_22_listener($event) {
      const designer_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r2.selectDesigner(designer_r7));
    });
    \u0275\u0275text(23, "Ch\u1ECDn");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const designer_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("designer-card--selected", ctx_r2.selectedDesigner()?.id === designer_r7.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", designer_r7.image, \u0275\u0275sanitizeUrl)("alt", designer_r7.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(designer_r7.badge);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(designer_r7.name);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", designer_r7.rating + " sao");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.starsArray(designer_r7.rating));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(designer_r7.specialty);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(designer_r7.fee));
  }
}
function DesignComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "h1", 10);
    \u0275\u0275text(2, "Ch\u1ECDn Designer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11);
    \u0275\u0275repeaterCreate(4, DesignComponent_Conditional_4_For_5_Template, 24, 9, "article", 12, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 13)(7, "button", 14);
    \u0275\u0275text(8, "T\u1EA2I TH\xCAM");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.designers);
  }
}
function DesignComponent_Conditional_5_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const header_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(header_r9);
  }
}
function DesignComponent_Conditional_5_For_46_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 58);
  }
}
function DesignComponent_Conditional_5_For_46_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function DesignComponent_Conditional_5_For_46_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const day_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectDate(day_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-selected", ctx_r2.isDateSelected()(day_r11.date))("is-disabled", day_r11.disabled);
    \u0275\u0275property("disabled", day_r11.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(day_r11.dayNum);
  }
}
function DesignComponent_Conditional_5_For_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DesignComponent_Conditional_5_For_46_Conditional_0_Template, 1, 0, "div", 58)(1, DesignComponent_Conditional_5_For_46_Conditional_1_Template, 2, 6, "button", 59);
  }
  if (rf & 2) {
    const day_r11 = ctx.$implicit;
    \u0275\u0275conditional(day_r11.date === null ? 0 : 1);
  }
}
function DesignComponent_Conditional_5_Conditional_47_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function DesignComponent_Conditional_5_Conditional_47_For_5_Template_button_click_0_listener() {
      const slot_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectTime(slot_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("is-selected", ctx_r2.selectedTime() === slot_r13)("is-unavailable", ctx_r2.unavailableSlots.has(slot_r13));
    \u0275\u0275property("disabled", ctx_r2.unavailableSlots.has(slot_r13));
    \u0275\u0275attribute("aria-selected", ctx_r2.selectedTime() === slot_r13);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(slot_r13);
  }
}
function DesignComponent_Conditional_5_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "h3", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 62);
    \u0275\u0275repeaterCreate(4, DesignComponent_Conditional_5_Conditional_47_For_5_Template, 2, 7, "button", 63, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedDateLabel());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.timeSlots);
  }
}
function DesignComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h1", 10);
    \u0275\u0275text(2, "Ch\u1ECDn th\u1EDDi gian t\u01B0 v\u1EA5n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 33)(4, "aside", 34)(5, "div", 35);
    \u0275\u0275element(6, "img", 36)(7, "div", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h2", 38);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 39);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 40);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "hr", 41);
    \u0275\u0275elementStart(15, "div", 42)(16, "div", 43)(17, "span", 44);
    \u0275\u0275text(18, "D\u1ECBch v\u1EE5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 45);
    \u0275\u0275text(20, "T\u01B0 v\u1EA5n thi\u1EBFt k\u1EBF");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 43)(22, "span", 44);
    \u0275\u0275text(23, "Ng\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 45);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 43)(27, "span", 44);
    \u0275\u0275text(28, "Gi\u1EDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 45);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "button", 46);
    \u0275\u0275listener("click", function DesignComponent_Conditional_5_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmSchedule());
    });
    \u0275\u0275text(32, "X\xC1C NH\u1EACN L\u1ECACH H\u1EB8N");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 47)(34, "div", 48)(35, "div", 49)(36, "button", 50);
    \u0275\u0275listener("click", function DesignComponent_Conditional_5_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.prevMonth());
    });
    \u0275\u0275text(37, "\u2039");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 51);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 52);
    \u0275\u0275listener("click", function DesignComponent_Conditional_5_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.nextMonth());
    });
    \u0275\u0275text(41, "\u203A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 53);
    \u0275\u0275repeaterCreate(43, DesignComponent_Conditional_5_For_44_Template, 2, 1, "div", 54, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275repeaterCreate(45, DesignComponent_Conditional_5_For_46_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(47, DesignComponent_Conditional_5_Conditional_47_Template, 6, 1, "div", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 56)(49, "button", 57);
    \u0275\u0275listener("click", function DesignComponent_Conditional_5_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(1));
    });
    \u0275\u0275text(50, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("src", ctx_r2.selectedDesigner()?.image, \u0275\u0275sanitizeUrl)("alt", ctx_r2.selectedDesigner()?.name ?? "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.selectedDesigner()?.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedDesigner()?.role);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedDesigner()?.bio);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r2.selectedDate() ? ctx_r2.selectedDateLabel() : "Ch\u01B0a ch\u1ECDn");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedTime() ?? "Ch\u01B0a ch\u1ECDn");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.selectedDate() || !ctx_r2.selectedTime());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.calendarMonthLabel());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(10, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.calendarDays());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedDate() ? 47 : -1);
  }
}
function DesignComponent_Conditional_6_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 105);
    \u0275\u0275listener("click", function DesignComponent_Conditional_6_For_25_Template_button_click_0_listener() {
      const opt_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectOccasion(opt_r16.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-active", ctx_r2.selectedOccasion() === opt_r16.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r16.label);
  }
}
function DesignComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h1", 10);
    \u0275\u0275text(2, "M\xF4 t\u1EA3 \xFD t\u01B0\u1EDFng c\u1EE7a b\u1EA1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 65);
    \u0275\u0275listener("ngSubmit", function DesignComponent_Conditional_6_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmIdea());
    });
    \u0275\u0275elementStart(4, "div", 66)(5, "div", 67)(6, "label", 68);
    \u0275\u0275text(7, "Lo\u1EA1i trang s\u1EE9c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 69)(9, "select", 70)(10, "option", 71);
    \u0275\u0275text(11, "Ch\u1ECDn lo\u1EA1i trang s\u1EE9c...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 72);
    \u0275\u0275text(13, "Nh\u1EABn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 73);
    \u0275\u0275text(15, "D\xE2y chuy\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 74);
    \u0275\u0275text(17, "V\xF2ng tay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 75);
    \u0275\u0275text(19, "B\xF4ng tai");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 67)(21, "p", 76);
    \u0275\u0275text(22, "D\u1ECBp l\u1EC5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 77);
    \u0275\u0275repeaterCreate(24, DesignComponent_Conditional_6_For_25_Template, 2, 3, "button", 78, _forTrack2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 67)(27, "label", 79);
    \u0275\u0275text(28, "Phong c\xE1ch");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 80);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 67)(31, "label", 81);
    \u0275\u0275text(32, "Ch\u1EA5t li\u1EC7u trang s\u1EE9c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 69)(34, "select", 82)(35, "option", 83);
    \u0275\u0275text(36, "V\xE0ng 18K");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 84);
    \u0275\u0275text(38, "V\xE0ng tr\u1EAFng 18K");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 85);
    \u0275\u0275text(40, "V\xE0ng h\u1ED3ng 18K");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 86);
    \u0275\u0275text(42, "B\u1EA1ch kim");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 67)(44, "label", 87);
    \u0275\u0275text(45, "Ng\xE2n s\xE1ch");
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "input", 88);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 67)(48, "label", 89);
    \u0275\u0275text(49, "Ng\xE0y k\u1EF3 v\u1ECDng");
    \u0275\u0275elementEnd();
    \u0275\u0275element(50, "input", 90);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 91)(52, "label", 92);
    \u0275\u0275text(53, "Nh\u1EADp m\xF4 t\u1EA3 \xFD t\u01B0\u1EDFng chi ti\u1EBFt");
    \u0275\u0275elementEnd();
    \u0275\u0275element(54, "textarea", 93);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 91)(56, "p", 76);
    \u0275\u0275text(57, "T\u1EA3i h\xECnh \u1EA3nh li\xEAn quan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "label", 94);
    \u0275\u0275element(59, "input", 95);
    \u0275\u0275elementStart(60, "span", 96);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(61, "svg", 97);
    \u0275\u0275element(62, "path", 98)(63, "polyline", 99)(64, "line", 100);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(65, "span", 101);
    \u0275\u0275text(66, "K\xE9o ho\u1EB7c th\u1EA3 t\u1EC7p v\xE0o \u0111\xE2y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "span", 102);
    \u0275\u0275text(68, "PNG, JPG \u2014 T\u1ED1i \u0111a 10MB/\u1EA3nh");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(69, "div", 56)(70, "div", 103)(71, "button", 57);
    \u0275\u0275listener("click", function DesignComponent_Conditional_6_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(2));
    });
    \u0275\u0275text(72, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "button", 104);
    \u0275\u0275text(74, "X\xC1C NH\u1EACN L\u1ECACH H\u1EB8N");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.ideaForm);
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.occasionOptions);
    \u0275\u0275advance(5);
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275control();
    \u0275\u0275advance(12);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
  }
}
function DesignComponent_Conditional_7_For_43_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 136);
    \u0275\u0275element(1, "rect", 138)(2, "rect", 139)(3, "rect", 140)(4, "rect", 141)(5, "circle", 142);
    \u0275\u0275elementEnd();
  }
}
function DesignComponent_Conditional_7_For_43_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 136);
    \u0275\u0275element(1, "rect", 143)(2, "rect", 144)(3, "rect", 145)(4, "rect", 146)(5, "rect", 147)(6, "rect", 148)(7, "rect", 149)(8, "rect", 150)(9, "rect", 151)(10, "rect", 152)(11, "rect", 153)(12, "rect", 154)(13, "rect", 155)(14, "rect", 156)(15, "rect", 157)(16, "rect", 158)(17, "rect", 159)(18, "rect", 160)(19, "rect", 161)(20, "rect", 162);
    \u0275\u0275elementEnd();
  }
}
function DesignComponent_Conditional_7_For_43_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 136);
    \u0275\u0275element(1, "rect", 163)(2, "polygon", 164)(3, "rect", 165)(4, "rect", 166)(5, "rect", 167)(6, "rect", 168)(7, "rect", 169);
    \u0275\u0275elementEnd();
  }
}
function DesignComponent_Conditional_7_For_43_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 136);
    \u0275\u0275element(1, "rect", 170)(2, "rect", 171)(3, "rect", 172)(4, "rect", 173)(5, "circle", 174)(6, "circle", 175);
    \u0275\u0275elementEnd();
  }
}
function DesignComponent_Conditional_7_For_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 133)(1, "input", 134);
    \u0275\u0275listener("change", function DesignComponent_Conditional_7_For_43_Template_input_change_1_listener() {
      const method_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectPayment(method_r19.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 135);
    \u0275\u0275conditionalCreate(3, DesignComponent_Conditional_7_For_43_Case_3_Template, 6, 0, ":svg:svg", 136)(4, DesignComponent_Conditional_7_For_43_Case_4_Template, 21, 0, ":svg:svg", 136)(5, DesignComponent_Conditional_7_For_43_Case_5_Template, 8, 0, ":svg:svg", 136)(6, DesignComponent_Conditional_7_For_43_Case_6_Template, 7, 0, ":svg:svg", 136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 137);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const method_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-selected", ctx_r2.selectedPayment() === method_r19.id);
    \u0275\u0275advance();
    \u0275\u0275property("value", method_r19.id)("checked", ctx_r2.selectedPayment() === method_r19.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_14_0 = method_r19.id) === "momo" ? 3 : tmp_14_0 === "vnpay" ? 4 : tmp_14_0 === "bank" ? 5 : tmp_14_0 === "card" ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(method_r19.label);
  }
}
function DesignComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h1", 10);
    \u0275\u0275text(2, "Thanh to\xE1n \u0111\u1EB7t c\u1ECDc");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 106)(4, "div", 107)(5, "div", 108)(6, "h3", 109);
    \u0275\u0275text(7, "Chi ti\u1EBFt l\u1ECBch h\u1EB9n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 110)(9, "span", 111);
    \u0275\u0275text(10, "Designer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 112);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 110)(14, "span", 111);
    \u0275\u0275text(15, "D\u1ECBch v\u1EE5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 112);
    \u0275\u0275text(17, "T\u01B0 v\u1EA5n thi\u1EBFt k\u1EBF");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 110)(19, "span", 111);
    \u0275\u0275text(20, "Ng\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 112);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 110)(24, "span", 111);
    \u0275\u0275text(25, "Gi\u1EDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 112);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 113)(29, "div", 114)(30, "p", 115);
    \u0275\u0275text(31, "RENGA MEMBER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 116);
    \u0275\u0275text(33, "Nguy\u1EC5n Th\u1ECB Tr\xFAc");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p", 117);
    \u0275\u0275text(35, "Gold Member");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 118)(37, "span", 119);
    \u0275\u0275text(38, "\u01AFu \u0111\xE3i 10%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 120)(40, "h3", 121);
    \u0275\u0275text(41, "Ph\u01B0\u01A1ng th\u1EE9c thanh to\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(42, DesignComponent_Conditional_7_For_43_Template, 9, 6, "label", 122, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "aside", 123)(45, "h3", 124);
    \u0275\u0275text(46, "T\xF3m t\u1EAFt thanh to\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 125)(48, "div", 126)(49, "span");
    \u0275\u0275text(50, "Ph\xED t\u01B0 v\u1EA5n Designer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 127)(54, "span");
    \u0275\u0275text(55, "\u01AFu \u0111\xE3i th\xE0nh vi\xEAn (10%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span");
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 126)(59, "span");
    \u0275\u0275text(60, "\u0110\u1EB7t c\u1ECDc (50%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span");
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 128)(64, "span", 129);
    \u0275\u0275text(65, "T\u1ED5ng thanh to\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "span", 130);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "button", 131);
    \u0275\u0275listener("click", function DesignComponent_Conditional_7_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.completeBooking());
    });
    \u0275\u0275text(69, " HO\xC0N T\u1EA4T \u0110\u1EB6T L\u1ECACH ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "p", 132);
    \u0275\u0275text(71, " \u0110\u1EB7t c\u1ECDc 50% \u0111\u1EC3 x\xE1c nh\u1EADn l\u1ECBch h\u1EB9n. S\u1ED1 ti\u1EC1n c\xF2n l\u1EA1i s\u1EBD \u0111\u01B0\u1EE3c thanh to\xE1n sau bu\u1ED5i t\u01B0 v\u1EA5n. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(72, "div", 56)(73, "button", 57);
    \u0275\u0275listener("click", function DesignComponent_Conditional_7_Template_button_click_73_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(3));
    });
    \u0275\u0275text(74, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r2.selectedDesigner()?.name);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.selectedDateLabel());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedTime());
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.paymentMethods);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.consultationFee()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("- ", ctx_r2.formatVnd(ctx_r2.memberDiscount()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.depositAmount()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.depositAmount()));
  }
}
var DesignComponent = class _DesignComponent {
  // ─── Static data ──────────────────────────────────────────────────────
  steps = [
    { n: 1, label: "Ch\u1ECDn Designer" },
    { n: 2, label: "\u0110\u1EB7t l\u1ECBch" },
    { n: 3, label: "T\u01B0 v\u1EA5n" },
    { n: 4, label: "X\xE1c nh\u1EADn" }
  ];
  designers = [
    {
      id: "henri-de-luca",
      name: "Master Henri de Luca",
      role: "Nh\xE0 thi\u1EBFt k\u1EBF kim ho\xE0n cao c\u1EA5p",
      specialty: "Nh\xE0 thi\u1EBFt k\u1EBF kim c\u01B0\u01A1ng",
      badge: "SIGNATURE WORK",
      bio: "B\u1EADc th\u1EA7y thi\u1EBFt k\u1EBF kim c\u01B0\u01A1ng v\u1EDBi h\u01A1n 20 n\u0103m kinh nghi\u1EC7m t\u1EA1i c\xE1c kinh \u0111\xF4 trang s\u1EE9c ch\xE2u \xC2u.",
      fee: 13e6,
      image: "https://www.figma.com/api/mcp/asset/d331c70c-a7eb-4fd4-925e-5103568cd8f0",
      rating: 5
    },
    {
      id: "isabella-moretti",
      name: "Isabella Moretti",
      role: "Nh\xE0 thi\u1EBFt k\u1EBF kim ho\xE0n cao c\u1EA5p",
      specialty: "Nh\xE0 thi\u1EBFt k\u1EBF v\xF2ng c\u1ED5",
      badge: "HERITAGE REVIVAL",
      bio: "Chuy\xEAn gia ph\u1EE5c h\u1ED3i phong c\xE1ch di s\u1EA3n, k\u1EBFt h\u1EE3p n\xE9t c\u1ED5 \u0111i\u1EC3n \xDD v\u1EDBi c\u1EA3m quan hi\u1EC7n \u0111\u1EA1i.",
      fee: 13e6,
      image: "https://www.figma.com/api/mcp/asset/b4caeee8-a646-4e0f-bed4-5c2f36e7c974",
      rating: 5
    },
    {
      id: "elena-vance",
      name: "Elena Vance",
      role: "Nh\xE0 thi\u1EBFt k\u1EBF kim ho\xE0n cao c\u1EA5p",
      specialty: "Nh\xE0 thi\u1EBFt k\u1EBF trang s\u1EE9c tay",
      badge: "AVANT-GARDE METALS",
      bio: "Chuy\xEAn gia thi\u1EBFt k\u1EBF trang s\u1EE9c cao c\u1EA5p v\u1EDBi phong c\xE1ch avant-garde \u0111\u1ED9c \u0111\xE1o.",
      fee: 13e6,
      image: "https://www.figma.com/api/mcp/asset/3fbcec17-e28e-4a1b-be69-0bbff5ae980c",
      rating: 5
    }
  ];
  timeSlots = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];
  unavailableSlots = /* @__PURE__ */ new Set(["17:30"]);
  paymentMethods = [
    { id: "momo", label: "V\xED MoMo" },
    { id: "vnpay", label: "VNPay" },
    { id: "bank", label: "Chuy\u1EC3n kho\u1EA3n ng\xE2n h\xE0ng" },
    { id: "card", label: "Th\u1EBB t\xEDn d\u1EE5ng / Ghi n\u1EE3" }
  ];
  occasionOptions = [
    { value: "qua-tang", label: "QU\xC0 T\u1EB6NG" },
    { value: "tang-ban-than", label: "T\u1EB6NG B\u1EA2N TH\xC2N" },
    { value: "cap-doi", label: "C\u1EB6P \u0110\xD4I" }
  ];
  // ─── Step state ───────────────────────────────────────────────────────
  currentStep = signal(
    1,
    ...ngDevMode ? [{ debugName: "currentStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 1
  selectedDesigner = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedDesigner" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 2 – calendar
  calendarYear = signal(
    2026,
    ...ngDevMode ? [{ debugName: "calendarYear" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calendarMonth = signal(
    5,
    ...ngDevMode ? [{ debugName: "calendarMonth" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // 0-based: 5 = June
  selectedDate = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedDate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedTime = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedTime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 3
  selectedOccasion = signal(
    "qua-tang",
    ...ngDevMode ? [{ debugName: "selectedOccasion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ideaForm = new FormGroup({
    jewelryType: new FormControl("", { nonNullable: true }),
    style: new FormControl("", { nonNullable: true }),
    material: new FormControl("18k-yellow", { nonNullable: true }),
    budget: new FormControl("", { nonNullable: true }),
    expectedDate: new FormControl("", { nonNullable: true }),
    ideaDesc: new FormControl("", { nonNullable: true, validators: [Validators.required] })
  });
  // Step 4
  selectedPayment = signal(
    "momo",
    ...ngDevMode ? [{ debugName: "selectedPayment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  MEMBER_DISCOUNT = 0.1;
  DEPOSIT_RATIO = 0.5;
  // ─── Computed ─────────────────────────────────────────────────────────
  calendarMonthLabel = computed(
    () => {
      const d = new Date(this.calendarYear(), this.calendarMonth(), 1);
      return d.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
    },
    ...ngDevMode ? [{ debugName: "calendarMonthLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calendarDays = computed(
    () => {
      const year = this.calendarYear();
      const month = this.calendarMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const startOffset = (firstDay + 6) % 7;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = [];
      for (let i = 0; i < startOffset; i++) {
        days.push({ date: null, dayNum: null, disabled: true });
      }
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        days.push({ date, dayNum: d, disabled: date < today });
      }
      return days;
    },
    ...ngDevMode ? [{ debugName: "calendarDays" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedDateLabel = computed(
    () => {
      const d = this.selectedDate();
      if (!d)
        return "Ch\u01B0a ch\u1ECDn";
      return d.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    },
    ...ngDevMode ? [{ debugName: "selectedDateLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isDateSelected = computed(
    () => (date) => {
      const sel = this.selectedDate();
      if (!date || !sel)
        return false;
      return date.toDateString() === sel.toDateString();
    },
    ...ngDevMode ? [{ debugName: "isDateSelected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  consultationFee = computed(
    () => this.selectedDesigner()?.fee ?? 0,
    ...ngDevMode ? [{ debugName: "consultationFee" }] : (
      /* istanbul ignore next */
      []
    )
  );
  memberDiscount = computed(
    () => Math.round(this.consultationFee() * this.MEMBER_DISCOUNT),
    ...ngDevMode ? [{ debugName: "memberDiscount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  depositAmount = computed(
    () => Math.round((this.consultationFee() - this.memberDiscount()) * this.DEPOSIT_RATIO),
    ...ngDevMode ? [{ debugName: "depositAmount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // ─── Methods ──────────────────────────────────────────────────────────
  goToStep(n) {
    this.currentStep.set(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  selectDesigner(designer) {
    this.selectedDesigner.set(designer);
    this.goToStep(2);
  }
  prevMonth() {
    if (this.calendarMonth() === 0) {
      this.calendarMonth.set(11);
      this.calendarYear.update((y) => y - 1);
    } else {
      this.calendarMonth.update((m) => m - 1);
    }
  }
  nextMonth() {
    if (this.calendarMonth() === 11) {
      this.calendarMonth.set(0);
      this.calendarYear.update((y) => y + 1);
    } else {
      this.calendarMonth.update((m) => m + 1);
    }
  }
  selectDate(day) {
    if (!day.disabled && day.date) {
      this.selectedDate.set(day.date);
      this.selectedTime.set(null);
    }
  }
  selectTime(slot) {
    if (!this.unavailableSlots.has(slot)) {
      this.selectedTime.set(slot);
    }
  }
  confirmSchedule() {
    if (this.selectedDate() && this.selectedTime()) {
      this.goToStep(3);
    }
  }
  selectOccasion(value) {
    this.selectedOccasion.set(value);
  }
  confirmIdea() {
    this.goToStep(4);
  }
  selectPayment(id) {
    this.selectedPayment.set(id);
  }
  completeBooking() {
  }
  formatVnd(value) {
    return value.toLocaleString("vi-VN") + " VN\u0110";
  }
  starsArray(n) {
    return Array.from({ length: n });
  }
  static \u0275fac = function DesignComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DesignComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DesignComponent, selectors: [["app-design"]], decls: 8, vars: 4, consts: [[1, "design-page"], ["aria-label", "Ti\u1EBFn tr\xECnh t\u01B0 v\u1EA5n thi\u1EBFt k\u1EBF", 1, "step-progress"], [1, "design-step"], [1, "step-progress__item", 3, "click"], [1, "step-progress__circle"], ["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none"], [1, "step-progress__label"], [1, "step-progress__connector", 3, "step-progress__connector--done"], ["d", "M2 7l3.5 3.5L12 4", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "step-progress__connector"], [1, "design-step__title"], [1, "designer-grid"], ["tabindex", "0", 1, "designer-card", 3, "designer-card--selected"], [1, "designer-load-more-wrap"], ["type", "button", 1, "designer-load-more"], ["tabindex", "0", 1, "designer-card", 3, "click", "keydown.enter"], [1, "designer-card__photo"], ["loading", "lazy", 1, "designer-card__photo-img", 3, "src", "alt"], ["aria-hidden", "true", 1, "designer-card__desaturate"], ["aria-hidden", "true", 1, "designer-card__gradient"], [1, "designer-card__badge"], [1, "designer-card__body"], [1, "designer-card__header"], [1, "designer-card__name"], [1, "designer-card__stars"], ["viewBox", "0 0 16 16", "fill", "currentColor", "aria-hidden", "true", 1, "designer-card__star"], [1, "designer-card__specialty"], [1, "designer-card__footer"], [1, "designer-card__fee"], [1, "designer-card__fee-label"], [1, "designer-card__fee-amount"], ["type", "button", 1, "designer-card__select", 3, "click"], ["d", "M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.14L8 10.37l-3.71 2.19.71-4.14L2 5.5l4.15-.75L8 1z"], [1, "ds-time-layout"], [1, "ds-designer-panel"], [1, "ds-designer-panel__photo"], ["loading", "lazy", 1, "ds-designer-panel__photo-img", 3, "src", "alt"], ["aria-hidden", "true", 1, "ds-designer-panel__desaturate"], [1, "ds-designer-panel__name"], [1, "ds-designer-panel__role"], [1, "ds-designer-panel__bio"], [1, "ds-designer-panel__divider"], [1, "ds-booking-summary"], [1, "ds-booking-summary__row"], [1, "ds-booking-summary__label"], [1, "ds-booking-summary__value"], ["type", "button", 1, "ds-cta-btn", 3, "click", "disabled"], [1, "ds-calendar-panel"], [1, "ds-calendar"], [1, "ds-calendar__header"], ["type", "button", "aria-label", "Th\xE1ng tr\u01B0\u1EDBc", 1, "ds-calendar__nav", 3, "click"], [1, "ds-calendar__month-label"], ["type", "button", "aria-label", "Th\xE1ng sau", 1, "ds-calendar__nav", 3, "click"], ["role", "grid", 1, "ds-calendar__grid"], ["aria-hidden", "true", 1, "ds-calendar__day-header"], [1, "ds-timeslot-section"], [1, "design-step__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "ds-calendar__date", "ds-calendar__date--empty"], ["type", "button", 1, "ds-calendar__date", 3, "is-selected", "is-disabled", "disabled"], ["type", "button", 1, "ds-calendar__date", 3, "click", "disabled"], [1, "ds-timeslot-section__title"], ["role", "listbox", "aria-label", "Ch\u1ECDn gi\u1EDD t\u01B0 v\u1EA5n", 1, "ds-timeslot-grid"], ["role", "option", "type", "button", 1, "ds-timeslot", 3, "is-selected", "is-unavailable", "disabled"], ["role", "option", "type", "button", 1, "ds-timeslot", 3, "click", "disabled"], [1, "ds-idea-form", 3, "ngSubmit", "formGroup"], [1, "ds-form-grid"], [1, "ds-form__group"], ["for", "jewelry-type", 1, "ds-form__label"], [1, "ds-form__select-wrap"], ["id", "jewelry-type", "formControlName", "jewelryType", 1, "ds-form__select"], ["value", ""], ["value", "nhan"], ["value", "day-chuyen"], ["value", "vong-tay"], ["value", "bong-tai"], [1, "ds-form__label"], ["role", "group", "aria-label", "Ch\u1ECDn d\u1ECBp", 1, "ds-toggle-group"], ["type", "button", 1, "ds-toggle-btn", 3, "is-active"], ["for", "style", 1, "ds-form__label"], ["type", "text", "id", "style", "formControlName", "style", "placeholder", "VD: T\u1ED1i gi\u1EA3n, c\u1ED5 \u0111i\u1EC3n, hi\u1EC7n \u0111\u1EA1i...", 1, "ds-form__input"], ["for", "material", 1, "ds-form__label"], ["id", "material", "formControlName", "material", 1, "ds-form__select"], ["value", "18k-yellow"], ["value", "18k-white"], ["value", "18k-rose"], ["value", "platinum"], ["for", "budget", 1, "ds-form__label"], ["type", "text", "id", "budget", "formControlName", "budget", "placeholder", "VD: 5.000.000 VN\u0110", 1, "ds-form__input"], ["for", "expected-date", 1, "ds-form__label"], ["type", "date", "id", "expected-date", "formControlName", "expectedDate", 1, "ds-form__input"], [1, "ds-form__group", "ds-form__group--full"], ["for", "idea-desc", 1, "ds-form__label"], ["id", "idea-desc", "formControlName", "ideaDesc", "rows", "6", "placeholder", "Chia s\u1EBB \xFD t\u01B0\u1EDFng, c\u1EA3m h\u1EE9ng v\xE0 y\xEAu c\u1EA7u \u0111\u1EB7c bi\u1EC7t c\u1EE7a b\u1EA1n...", 1, "ds-form__textarea"], ["for", "idea-images", "aria-label", "T\u1EA3i \u1EA3nh tham kh\u1EA3o", 1, "ds-upload-zone"], ["type", "file", "id", "idea-images", "name", "images", "accept", "image/*", "multiple", "", 1, "ds-upload-zone__input"], [1, "ds-upload-zone__icon"], ["width", "32", "height", "32", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "17 8 12 3 7 8"], ["x1", "12", "y1", "3", "x2", "12", "y2", "15"], [1, "ds-upload-zone__text"], [1, "ds-upload-zone__hint"], [1, "step3-actions"], ["type", "submit", 1, "ds-cta-btn", "step3-cta"], ["type", "button", 1, "ds-toggle-btn", 3, "click"], [1, "ds-payment-layout"], [1, "ds-payment-left"], [1, "ds-appt-detail"], [1, "ds-appt-detail__title"], [1, "ds-appt-detail__row"], [1, "ds-appt-detail__label"], [1, "ds-appt-detail__value"], [1, "ds-member-card"], [1, "ds-member-card__info"], [1, "ds-member-card__label"], [1, "ds-member-card__name"], [1, "ds-member-card__tier"], [1, "ds-member-card__benefit"], [1, "ds-member-card__discount"], [1, "ds-pay-methods"], [1, "ds-pay-methods__title"], [1, "ds-pay-method", 3, "is-selected"], [1, "ds-pay-summary"], [1, "ds-pay-summary__title"], [1, "ds-pay-summary__rows"], [1, "ds-pay-summary__row"], [1, "ds-pay-summary__row", "ds-pay-summary__row--discount"], [1, "ds-pay-summary__total"], [1, "ds-pay-summary__total-label"], [1, "ds-pay-summary__total-val"], ["type", "button", 1, "ds-pay-summary__pay-btn", 3, "click"], [1, "ds-pay-summary__note"], [1, "ds-pay-method"], ["type", "radio", "name", "payment", 3, "change", "value", "checked"], [1, "ds-pay-method__icon"], ["width", "36", "height", "36", "viewBox", "0 0 36 36", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], [1, "ds-pay-method__label"], ["width", "36", "height", "36", "rx", "8", "fill", "#AE2070"], ["x", "8", "y", "13", "width", "20", "height", "13", "rx", "2.5", "fill", "white"], ["x", "8", "y", "17", "width", "20", "height", "3.5", "fill", "#AE2070"], ["x", "11", "y", "21.5", "width", "6", "height", "2.5", "rx", "1.25", "fill", "#AE2070", "fill-opacity", "0.6"], ["cx", "24.5", "cy", "22.75", "r", "1.75", "fill", "#AE2070", "fill-opacity", "0.6"], ["width", "36", "height", "36", "rx", "8", "fill", "#003087"], ["x", "7", "y", "7", "width", "9", "height", "9", "rx", "1.5", "fill", "white", "fill-opacity", "0.9"], ["x", "9", "y", "9", "width", "2", "height", "2", "fill", "#003087"], ["x", "12", "y", "9", "width", "2", "height", "2", "fill", "#003087"], ["x", "9", "y", "12", "width", "2", "height", "2", "fill", "#003087"], ["x", "20", "y", "7", "width", "9", "height", "9", "rx", "1.5", "fill", "white", "fill-opacity", "0.9"], ["x", "22", "y", "9", "width", "2", "height", "2", "fill", "#003087"], ["x", "25", "y", "9", "width", "2", "height", "2", "fill", "#003087"], ["x", "22", "y", "12", "width", "2", "height", "2", "fill", "#003087"], ["x", "7", "y", "20", "width", "9", "height", "9", "rx", "1.5", "fill", "white", "fill-opacity", "0.9"], ["x", "9", "y", "22", "width", "2", "height", "2", "fill", "#003087"], ["x", "9", "y", "25", "width", "2", "height", "2", "fill", "#003087"], ["x", "12", "y", "22", "width", "2", "height", "2", "fill", "#003087"], ["x", "20", "y", "20", "width", "2", "height", "2", "fill", "white"], ["x", "23", "y", "20", "width", "2", "height", "2", "fill", "white"], ["x", "26", "y", "20", "width", "2", "height", "2", "fill", "white"], ["x", "20", "y", "23", "width", "2", "height", "2", "fill", "white"], ["x", "24", "y", "23", "width", "4", "height", "2", "fill", "white"], ["x", "20", "y", "26", "width", "2", "height", "2", "fill", "white"], ["x", "23", "y", "26", "width", "2", "height", "2", "fill", "white"], ["width", "36", "height", "36", "rx", "8", "fill", "#1a3c5e"], ["points", "18,8 6.5,15.5 29.5,15.5", "fill", "white"], ["x", "9", "y", "16.5", "width", "3", "height", "8.5", "fill", "white"], ["x", "13.5", "y", "16.5", "width", "3", "height", "8.5", "fill", "white"], ["x", "19.5", "y", "16.5", "width", "3", "height", "8.5", "fill", "white"], ["x", "24", "y", "16.5", "width", "3", "height", "8.5", "fill", "white"], ["x", "7", "y", "26", "width", "22", "height", "2.5", "rx", "1.25", "fill", "white"], ["width", "36", "height", "36", "rx", "8", "fill", "#2c5f8a"], ["x", "5", "y", "11", "width", "26", "height", "16", "rx", "3", "stroke", "white", "stroke-width", "1.5", "fill", "none"], ["x", "5", "y", "15", "width", "26", "height", "4.5", "fill", "white"], ["x", "8", "y", "23", "width", "8", "height", "2.5", "rx", "1.25", "fill", "white", "fill-opacity", "0.8"], ["cx", "24.5", "cy", "24.25", "r", "2.5", "fill", "#e8c547", "fill-opacity", "0.8"], ["cx", "27", "cy", "24.25", "r", "2.5", "fill", "#e8c547", "fill-opacity", "0.5"]], template: function DesignComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "nav", 1);
      \u0275\u0275repeaterCreate(2, DesignComponent_For_3_Template, 7, 9, null, null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, DesignComponent_Conditional_4_Template, 9, 0, "div", 2);
      \u0275\u0275conditionalCreate(5, DesignComponent_Conditional_5_Template, 51, 11, "div", 2);
      \u0275\u0275conditionalCreate(6, DesignComponent_Conditional_6_Template, 75, 1, "div", 2);
      \u0275\u0275conditionalCreate(7, DesignComponent_Conditional_7_Template, 75, 7, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.steps);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep() === 1 ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep() === 2 ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep() === 3 ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep() === 4 ? 7 : -1);
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n.design-page[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px) 120px;\n  font-family: var(--font-sans);\n}\n.step-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 0 48px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.step-progress__item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  position: relative;\n  z-index: 1;\n}\n.step-progress__circle[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  background: var(--color-white);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-muted);\n  transition: all 0.25s;\n}\n.step-progress__item--active[_ngcontent-%COMP%]   .step-progress__circle[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n.step-progress__item--done[_ngcontent-%COMP%]   .step-progress__circle[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n.step-progress__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  white-space: nowrap;\n}\n.step-progress__item--active[_ngcontent-%COMP%]   .step-progress__label[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.step-progress__connector[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 160px;\n  height: 1px;\n  background: var(--color-border);\n  margin-bottom: 22px;\n  transition: background 0.2s;\n}\n.step-progress__connector--done[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n}\n.design-step[_ngcontent-%COMP%] {\n  padding-bottom: 40px;\n}\n.design-step__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 40px;\n  font-weight: 500;\n  color: var(--color-primary);\n  text-align: center;\n  margin: 0 0 48px;\n  letter-spacing: -0.5px;\n}\n.design-step__actions[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  padding-top: 24px;\n}\n.step3-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.step3-cta[_ngcontent-%COMP%] {\n  flex: 1;\n  width: auto;\n  margin: 0;\n}\n.designer-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n  margin-bottom: 40px;\n}\n.designer-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  transition: box-shadow 0.2s, border-color 0.2s;\n  outline: none;\n}\n.designer-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n  border-color: var(--color-primary);\n}\n.designer-card[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n}\n.designer-card--selected[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 2px rgba(196, 96, 126, 0.3);\n}\n.designer-card__photo[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 3 / 4;\n  overflow: hidden;\n}\n.designer-card__photo-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: top center;\n  display: block;\n  filter: grayscale(30%);\n  transition: filter 0.3s, transform 0.4s;\n}\n.designer-card[_ngcontent-%COMP%]:hover   .designer-card__photo-img[_ngcontent-%COMP%] {\n  filter: grayscale(0%);\n  transform: scale(1.03);\n}\n.designer-card__desaturate[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.08);\n  transition: opacity 0.3s;\n}\n.designer-card[_ngcontent-%COMP%]:hover   .designer-card__desaturate[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.designer-card__gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 32px 16px 16px;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.75) 0%,\n      transparent 100%);\n  display: flex;\n  align-items: flex-end;\n}\n.designer-card__badge[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  padding: 4px 10px;\n}\n.designer-card__body[_ngcontent-%COMP%] {\n  padding: 20px 20px 16px;\n}\n.designer-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n.designer-card__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 17px;\n  font-weight: 500;\n  color: var(--color-dark);\n  line-height: 1.3;\n  margin: 0;\n}\n.designer-card__stars[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.designer-card__star[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  color: #f5a623;\n}\n.designer-card__specialty[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n  margin: 0 0 16px;\n}\n.designer-card__footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-top: 1px solid var(--color-border);\n  padding-top: 14px;\n  margin-top: 4px;\n}\n.designer-card__fee[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.designer-card__fee-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n}\n.designer-card__fee-amount[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-dark);\n}\n.designer-card__select[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  border: 1px solid var(--color-primary);\n  background: transparent;\n  padding: 8px 18px;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.designer-card__select[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n.designer-load-more-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 8px;\n}\n.designer-load-more[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  border: 1px solid var(--color-border);\n  background: transparent;\n  padding: 14px 40px;\n  cursor: pointer;\n  transition: border-color 0.2s, color 0.2s;\n}\n.designer-load-more[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-time-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 48px;\n  align-items: start;\n}\n.ds-designer-panel[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  padding-bottom: 24px;\n  position: sticky;\n  top: 100px;\n}\n.ds-designer-panel__photo[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  overflow: hidden;\n}\n.ds-designer-panel__photo-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: top;\n  filter: grayscale(20%);\n}\n.ds-designer-panel__desaturate[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.1);\n}\n.ds-designer-panel__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  font-weight: 500;\n  color: var(--color-dark);\n  margin: 20px 20px 4px;\n}\n.ds-designer-panel__role[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  margin: 0 20px 8px;\n}\n.ds-designer-panel__bio[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  margin: 0 20px 16px;\n}\n.ds-designer-panel__divider[_ngcontent-%COMP%] {\n  border: none;\n  border-top: 1px solid var(--color-border);\n  margin: 0 20px 16px;\n}\n.ds-booking-summary[_ngcontent-%COMP%] {\n  padding: 0 20px;\n  margin-bottom: 20px;\n}\n.ds-booking-summary__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 8px 0;\n  border-bottom: 1px solid rgba(196, 199, 199, 0.4);\n}\n.ds-booking-summary__row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.ds-booking-summary__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n}\n.ds-booking-summary__value[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  font-weight: 500;\n  max-width: 140px;\n  text-align: right;\n}\n.ds-cta-btn[_ngcontent-%COMP%] {\n  display: block;\n  width: calc(100% - 40px);\n  margin: 0 20px;\n  background: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 16px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n  text-align: center;\n}\n.ds-cta-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.ds-cta-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  opacity: 0.88;\n}\n.ds-calendar-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.ds-calendar[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  padding: 24px;\n  background: var(--color-white);\n}\n.ds-calendar__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.ds-calendar__nav[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  font-size: 20px;\n  color: var(--color-dark);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: border-color 0.2s;\n}\n.ds-calendar__nav[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-calendar__month-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--color-dark);\n  text-transform: capitalize;\n}\n.ds-calendar__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n}\n.ds-calendar__day-header[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-align: center;\n  color: var(--color-muted);\n  padding: 6px 0;\n}\n.ds-calendar__date[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  border: none;\n  background: transparent;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  cursor: pointer;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s, color 0.15s;\n}\n.ds-calendar__date[_ngcontent-%COMP%]:hover:not(:disabled):not(.is-disabled) {\n  background: var(--color-primary-light);\n  color: var(--color-primary);\n}\n.ds-calendar__date.is-selected[_ngcontent-%COMP%] {\n  background: var(--color-primary) !important;\n  color: var(--color-white) !important;\n}\n.ds-calendar__date.is-disabled[_ngcontent-%COMP%], \n.ds-calendar__date[_ngcontent-%COMP%]:disabled {\n  color: var(--color-border);\n  cursor: default;\n}\n.ds-calendar__date--empty[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.ds-timeslot-section[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  padding: 24px;\n  background: var(--color-white);\n}\n.ds-timeslot-section__title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  text-transform: capitalize;\n}\n.ds-timeslot-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n}\n.ds-timeslot[_ngcontent-%COMP%] {\n  padding: 12px 8px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-dark);\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    color 0.15s;\n  text-align: center;\n}\n.ds-timeslot[_ngcontent-%COMP%]:hover:not(:disabled):not(.is-unavailable) {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-timeslot.is-selected[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.ds-timeslot.is-unavailable[_ngcontent-%COMP%], \n.ds-timeslot[_ngcontent-%COMP%]:disabled {\n  background: var(--color-bg-card);\n  color: var(--color-border);\n  cursor: not-allowed;\n  border-color: transparent;\n  font-size: 11px;\n}\n.ds-idea-form[_ngcontent-%COMP%] {\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  padding: 40px 48px;\n}\n.ds-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 28px 40px;\n}\n.ds-form__group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ds-form__group--full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.ds-form__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0;\n}\n.ds-form__input[_ngcontent-%COMP%], \n.ds-form__select[_ngcontent-%COMP%], \n.ds-form__textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  padding: 13px 16px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  background: var(--color-white);\n  outline: none;\n  transition: border-color 0.15s;\n}\n[_ngcontent-%COMP%]:is(.ds-form__input, .ds-form__select, .ds-form__textarea):focus {\n  border-color: var(--color-primary);\n}\n[_ngcontent-%COMP%]:is(.ds-form__input, .ds-form__select, .ds-form__textarea)::placeholder {\n  color: #bbb;\n}\n.ds-form__textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 120px;\n}\n.ds-form__select-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.ds-form__select-wrap[_ngcontent-%COMP%]::after {\n  content: "\\e2\\2c6\\a8";\n  position: absolute;\n  right: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 12px;\n  color: var(--color-muted);\n  pointer-events: none;\n}\n.ds-form__select[_ngcontent-%COMP%] {\n  appearance: none;\n  padding-right: 36px;\n  cursor: pointer;\n}\n.ds-toggle-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.ds-toggle-btn[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  padding: 10px 18px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  color: var(--color-muted);\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.ds-toggle-btn.is-active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.ds-toggle-btn[_ngcontent-%COMP%]:not(.is-active):hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-upload-zone[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  border: 2px dashed var(--color-border);\n  padding: 40px 24px;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  text-align: center;\n}\n.ds-upload-zone[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n}\n.ds-upload-zone__input[_ngcontent-%COMP%] {\n  display: none;\n}\n.ds-upload-zone__icon[_ngcontent-%COMP%] {\n  color: var(--color-muted);\n  margin-bottom: 4px;\n}\n.ds-upload-zone__text[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  font-weight: 500;\n}\n.ds-upload-zone__hint[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n}\n.ds-payment-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 340px;\n  gap: 48px;\n  align-items: start;\n}\n.ds-payment-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.ds-appt-detail[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n}\n.ds-appt-detail__title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.ds-appt-detail__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 10px 0;\n  border-bottom: 1px solid rgba(196, 199, 199, 0.35);\n}\n.ds-appt-detail__row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.ds-appt-detail__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n}\n.ds-appt-detail__value[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  font-weight: 500;\n  text-align: right;\n}\n.ds-member-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-primary);\n  padding: 20px 24px;\n  background: var(--color-primary-light);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.ds-member-card__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  margin: 0 0 4px;\n}\n.ds-member-card__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 17px;\n  font-weight: 500;\n  color: var(--color-dark);\n  margin: 0 0 2px;\n}\n.ds-member-card__tier[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  margin: 0;\n}\n.ds-member-card__discount[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-primary);\n  border: 1px solid var(--color-primary);\n  padding: 8px 16px;\n}\n.ds-pay-methods[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n}\n.ds-pay-methods__title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.ds-pay-method[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border: 1px solid var(--color-border);\n  margin-bottom: 10px;\n  cursor: pointer;\n  transition: border-color 0.15s;\n}\n.ds-pay-method[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.ds-pay-method.is-selected[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: var(--color-primary-light);\n}\n.ds-pay-method[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%] {\n  accent-color: var(--color-primary);\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.ds-pay-method__icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n.ds-pay-method__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: 6px;\n}\n.ds-pay-method__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.ds-pay-summary[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n  position: sticky;\n  top: 100px;\n}\n.ds-pay-summary__title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.ds-pay-summary__rows[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.ds-pay-summary__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n}\n.ds-pay-summary__row--discount[_ngcontent-%COMP%] {\n  color: #27ae60;\n}\n.ds-pay-summary__total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 16px 0;\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n  margin-bottom: 20px;\n}\n.ds-pay-summary__total-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.ds-pay-summary__total-val[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.ds-pay-summary__pay-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 16px;\n  border: none;\n  cursor: pointer;\n  margin-bottom: 16px;\n  transition: opacity 0.2s;\n}\n.ds-pay-summary__pay-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.ds-pay-summary__note[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  text-align: center;\n  margin: 0;\n}\n.btn[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 14px 28px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--color-border);\n  color: var(--color-dark);\n}\n.btn--ghost[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-dark);\n}\n@media (max-width: 1024px) {\n  .designer-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .ds-time-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 240px 1fr;\n    gap: 32px;\n  }\n  .ds-payment-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 300px;\n    gap: 32px;\n  }\n}\n@media (max-width: 768px) {\n  .design-page[_ngcontent-%COMP%] {\n    padding: 0 24px 80px;\n  }\n  .designer-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    max-width: 400px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n  .ds-time-layout[_ngcontent-%COMP%], \n   .ds-payment-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ds-designer-panel[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .ds-pay-summary[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .ds-form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ds-form__group--full[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n  .ds-idea-form[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .step-progress__connector[_ngcontent-%COMP%] {\n    max-width: 40px;\n  }\n  .step-progress__label[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n}\n/*# sourceMappingURL=design.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DesignComponent, [{
    type: Component,
    args: [{ selector: "app-design", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule], template: `<section class="design-page">\r
\r
  <!-- \u2500\u2500 Step Progress \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\r
  <nav class="step-progress" aria-label="Ti\u1EBFn tr\xECnh t\u01B0 v\u1EA5n thi\u1EBFt k\u1EBF">\r
    @for (step of steps; track step.n) {\r
      <div\r
        class="step-progress__item"\r
        [class.step-progress__item--active]="currentStep() === step.n"\r
        [class.step-progress__item--done]="currentStep() > step.n"\r
        (click)="currentStep() > step.n && goToStep(step.n)"\r
        [style.cursor]="currentStep() > step.n ? 'pointer' : 'default'"\r
      >\r
        <span class="step-progress__circle">\r
          @if (currentStep() > step.n) {\r
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">\r
              <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
            </svg>\r
          } @else {\r
            {{ step.n }}\r
          }\r
        </span>\r
        <span class="step-progress__label">{{ step.label }}</span>\r
      </div>\r
      @if (!$last) {\r
        <div class="step-progress__connector" [class.step-progress__connector--done]="currentStep() > step.n"></div>\r
      }\r
    }\r
  </nav>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 1 \u2014 Ch\u1ECDn Designer\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 1) {\r
    <div class="design-step">\r
      <h1 class="design-step__title">Ch\u1ECDn Designer</h1>\r
\r
      <div class="designer-grid">\r
        @for (designer of designers; track designer.id) {\r
          <article\r
            class="designer-card"\r
            [class.designer-card--selected]="selectedDesigner()?.id === designer.id"\r
            tabindex="0"\r
            (click)="selectDesigner(designer)"\r
            (keydown.enter)="selectDesigner(designer)"\r
          >\r
            <div class="designer-card__photo">\r
              <img class="designer-card__photo-img" [src]="designer.image" [alt]="designer.name" loading="lazy" />\r
              <div class="designer-card__desaturate" aria-hidden="true"></div>\r
              <div class="designer-card__gradient" aria-hidden="true">\r
                <span class="designer-card__badge">{{ designer.badge }}</span>\r
              </div>\r
            </div>\r
            <div class="designer-card__body">\r
              <div class="designer-card__header">\r
                <h3 class="designer-card__name">{{ designer.name }}</h3>\r
                <div class="designer-card__stars" [attr.aria-label]="designer.rating + ' sao'">\r
                  @for (star of starsArray(designer.rating); track $index) {\r
                    <svg class="designer-card__star" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">\r
                      <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.14L8 10.37l-3.71 2.19.71-4.14L2 5.5l4.15-.75L8 1z"/>\r
                    </svg>\r
                  }\r
                </div>\r
              </div>\r
              <p class="designer-card__specialty">{{ designer.specialty }}</p>\r
              <div class="designer-card__footer">\r
                <div class="designer-card__fee">\r
                  <span class="designer-card__fee-label">PH\xCD</span>\r
                  <span class="designer-card__fee-amount">{{ formatVnd(designer.fee) }}</span>\r
                </div>\r
                <button class="designer-card__select" type="button" (click)="$event.stopPropagation(); selectDesigner(designer)">Ch\u1ECDn</button>\r
              </div>\r
            </div>\r
          </article>\r
        }\r
      </div>\r
\r
      <div class="designer-load-more-wrap">\r
        <button class="designer-load-more" type="button">T\u1EA2I TH\xCAM</button>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 2 \u2014 Ch\u1ECDn th\u1EDDi gian t\u01B0 v\u1EA5n\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 2) {\r
    <div class="design-step">\r
      <h1 class="design-step__title">Ch\u1ECDn th\u1EDDi gian t\u01B0 v\u1EA5n</h1>\r
\r
      <div class="ds-time-layout">\r
\r
        <!-- Left: designer info + summary -->\r
        <aside class="ds-designer-panel">\r
          <div class="ds-designer-panel__photo">\r
            <img class="ds-designer-panel__photo-img"\r
              [src]="selectedDesigner()?.image"\r
              [alt]="selectedDesigner()?.name ?? ''"\r
              loading="lazy" />\r
            <div class="ds-designer-panel__desaturate" aria-hidden="true"></div>\r
          </div>\r
          <h2 class="ds-designer-panel__name">{{ selectedDesigner()?.name }}</h2>\r
          <p class="ds-designer-panel__role">{{ selectedDesigner()?.role }}</p>\r
          <p class="ds-designer-panel__bio">{{ selectedDesigner()?.bio }}</p>\r
          <hr class="ds-designer-panel__divider" />\r
          <div class="ds-booking-summary">\r
            <div class="ds-booking-summary__row">\r
              <span class="ds-booking-summary__label">D\u1ECBch v\u1EE5</span>\r
              <span class="ds-booking-summary__value">T\u01B0 v\u1EA5n thi\u1EBFt k\u1EBF</span>\r
            </div>\r
            <div class="ds-booking-summary__row">\r
              <span class="ds-booking-summary__label">Ng\xE0y</span>\r
              <span class="ds-booking-summary__value">{{ selectedDate() ? selectedDateLabel() : 'Ch\u01B0a ch\u1ECDn' }}</span>\r
            </div>\r
            <div class="ds-booking-summary__row">\r
              <span class="ds-booking-summary__label">Gi\u1EDD</span>\r
              <span class="ds-booking-summary__value">{{ selectedTime() ?? 'Ch\u01B0a ch\u1ECDn' }}</span>\r
            </div>\r
          </div>\r
          <button\r
            class="ds-cta-btn"\r
            type="button"\r
            [disabled]="!selectedDate() || !selectedTime()"\r
            (click)="confirmSchedule()"\r
          >X\xC1C NH\u1EACN L\u1ECACH H\u1EB8N</button>\r
        </aside>\r
\r
        <!-- Right: calendar + timeslots -->\r
        <div class="ds-calendar-panel">\r
          <div class="ds-calendar">\r
            <div class="ds-calendar__header">\r
              <button class="ds-calendar__nav" type="button" aria-label="Th\xE1ng tr\u01B0\u1EDBc" (click)="prevMonth()">&#8249;</button>\r
              <span class="ds-calendar__month-label">{{ calendarMonthLabel() }}</span>\r
              <button class="ds-calendar__nav" type="button" aria-label="Th\xE1ng sau" (click)="nextMonth()">&#8250;</button>\r
            </div>\r
            <div class="ds-calendar__grid" role="grid">\r
              @for (header of ['T2','T3','T4','T5','T6','T7','CN']; track $index) {\r
                <div class="ds-calendar__day-header" aria-hidden="true">{{ header }}</div>\r
              }\r
              @for (day of calendarDays(); track $index) {\r
                @if (day.date === null) {\r
                  <div class="ds-calendar__date ds-calendar__date--empty"></div>\r
                } @else {\r
                  <button\r
                    class="ds-calendar__date"\r
                    [class.is-selected]="isDateSelected()(day.date)"\r
                    [class.is-disabled]="day.disabled"\r
                    [disabled]="day.disabled"\r
                    type="button"\r
                    (click)="selectDate(day)"\r
                  >{{ day.dayNum }}</button>\r
                }\r
              }\r
            </div>\r
          </div>\r
\r
          @if (selectedDate()) {\r
            <div class="ds-timeslot-section">\r
              <h3 class="ds-timeslot-section__title">{{ selectedDateLabel() }}</h3>\r
              <div class="ds-timeslot-grid" role="listbox" aria-label="Ch\u1ECDn gi\u1EDD t\u01B0 v\u1EA5n">\r
                @for (slot of timeSlots; track slot) {\r
                  <button\r
                    class="ds-timeslot"\r
                    [class.is-selected]="selectedTime() === slot"\r
                    [class.is-unavailable]="unavailableSlots.has(slot)"\r
                    [disabled]="unavailableSlots.has(slot)"\r
                    role="option"\r
                    [attr.aria-selected]="selectedTime() === slot"\r
                    type="button"\r
                    (click)="selectTime(slot)"\r
                  >{{ slot }}</button>\r
                }\r
              </div>\r
            </div>\r
          }\r
        </div>\r
\r
      </div>\r
\r
      <div class="design-step__actions">\r
        <button class="btn btn--ghost" type="button" (click)="goToStep(1)">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 3 \u2014 M\xF4 t\u1EA3 \xFD t\u01B0\u1EDFng c\u1EE7a b\u1EA1n\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 3) {\r
    <div class="design-step">\r
      <h1 class="design-step__title">M\xF4 t\u1EA3 \xFD t\u01B0\u1EDFng c\u1EE7a b\u1EA1n</h1>\r
\r
      <form class="ds-idea-form" [formGroup]="ideaForm" (ngSubmit)="confirmIdea()">\r
        <div class="ds-form-grid">\r
\r
          <div class="ds-form__group">\r
            <label class="ds-form__label" for="jewelry-type">Lo\u1EA1i trang s\u1EE9c</label>\r
            <div class="ds-form__select-wrap">\r
              <select class="ds-form__select" id="jewelry-type" formControlName="jewelryType">\r
                <option value="">Ch\u1ECDn lo\u1EA1i trang s\u1EE9c...</option>\r
                <option value="nhan">Nh\u1EABn</option>\r
                <option value="day-chuyen">D\xE2y chuy\u1EC1n</option>\r
                <option value="vong-tay">V\xF2ng tay</option>\r
                <option value="bong-tai">B\xF4ng tai</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="ds-form__group">\r
            <p class="ds-form__label">D\u1ECBp l\u1EC5</p>\r
            <div class="ds-toggle-group" role="group" aria-label="Ch\u1ECDn d\u1ECBp">\r
              @for (opt of occasionOptions; track opt.value) {\r
                <button\r
                  class="ds-toggle-btn"\r
                  [class.is-active]="selectedOccasion() === opt.value"\r
                  type="button"\r
                  (click)="selectOccasion(opt.value)"\r
                >{{ opt.label }}</button>\r
              }\r
            </div>\r
          </div>\r
\r
          <div class="ds-form__group">\r
            <label class="ds-form__label" for="style">Phong c\xE1ch</label>\r
            <input class="ds-form__input" type="text" id="style" formControlName="style"\r
              placeholder="VD: T\u1ED1i gi\u1EA3n, c\u1ED5 \u0111i\u1EC3n, hi\u1EC7n \u0111\u1EA1i..." />\r
          </div>\r
\r
          <div class="ds-form__group">\r
            <label class="ds-form__label" for="material">Ch\u1EA5t li\u1EC7u trang s\u1EE9c</label>\r
            <div class="ds-form__select-wrap">\r
              <select class="ds-form__select" id="material" formControlName="material">\r
                <option value="18k-yellow">V\xE0ng 18K</option>\r
                <option value="18k-white">V\xE0ng tr\u1EAFng 18K</option>\r
                <option value="18k-rose">V\xE0ng h\u1ED3ng 18K</option>\r
                <option value="platinum">B\u1EA1ch kim</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="ds-form__group">\r
            <label class="ds-form__label" for="budget">Ng\xE2n s\xE1ch</label>\r
            <input class="ds-form__input" type="text" id="budget" formControlName="budget"\r
              placeholder="VD: 5.000.000 VN\u0110" />\r
          </div>\r
\r
          <div class="ds-form__group">\r
            <label class="ds-form__label" for="expected-date">Ng\xE0y k\u1EF3 v\u1ECDng</label>\r
            <input class="ds-form__input" type="date" id="expected-date" formControlName="expectedDate" />\r
          </div>\r
\r
          <div class="ds-form__group ds-form__group--full">\r
            <label class="ds-form__label" for="idea-desc">Nh\u1EADp m\xF4 t\u1EA3 \xFD t\u01B0\u1EDFng chi ti\u1EBFt</label>\r
            <textarea class="ds-form__textarea" id="idea-desc" formControlName="ideaDesc" rows="6"\r
              placeholder="Chia s\u1EBB \xFD t\u01B0\u1EDFng, c\u1EA3m h\u1EE9ng v\xE0 y\xEAu c\u1EA7u \u0111\u1EB7c bi\u1EC7t c\u1EE7a b\u1EA1n..."></textarea>\r
          </div>\r
\r
          <div class="ds-form__group ds-form__group--full">\r
            <p class="ds-form__label">T\u1EA3i h\xECnh \u1EA3nh li\xEAn quan</p>\r
            <label class="ds-upload-zone" for="idea-images" aria-label="T\u1EA3i \u1EA3nh tham kh\u1EA3o">\r
              <input class="ds-upload-zone__input" type="file" id="idea-images"\r
                name="images" accept="image/*" multiple />\r
              <span class="ds-upload-zone__icon">\r
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">\r
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>\r
                  <polyline points="17 8 12 3 7 8"/>\r
                  <line x1="12" y1="3" x2="12" y2="15"/>\r
                </svg>\r
              </span>\r
              <span class="ds-upload-zone__text">K\xE9o ho\u1EB7c th\u1EA3 t\u1EC7p v\xE0o \u0111\xE2y</span>\r
              <span class="ds-upload-zone__hint">PNG, JPG \u2014 T\u1ED1i \u0111a 10MB/\u1EA3nh</span>\r
            </label>\r
          </div>\r
\r
        </div>\r
\r
        <div class="design-step__actions">\r
          <div class="step3-actions">\r
            <button class="btn btn--ghost" type="button" (click)="goToStep(2)">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
            <button class="ds-cta-btn step3-cta" type="submit">X\xC1C NH\u1EACN L\u1ECACH H\u1EB8N</button>\r
          </div>\r
        </div>\r
      </form>\r
    </div>\r
  }\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 4 \u2014 Thanh to\xE1n \u0111\u1EB7t c\u1ECDc\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 4) {\r
    <div class="design-step">\r
      <h1 class="design-step__title">Thanh to\xE1n \u0111\u1EB7t c\u1ECDc</h1>\r
\r
      <div class="ds-payment-layout">\r
\r
        <div class="ds-payment-left">\r
\r
          <!-- Appointment details -->\r
          <div class="ds-appt-detail">\r
            <h3 class="ds-appt-detail__title">Chi ti\u1EBFt l\u1ECBch h\u1EB9n</h3>\r
            <div class="ds-appt-detail__row">\r
              <span class="ds-appt-detail__label">Designer</span>\r
              <span class="ds-appt-detail__value">{{ selectedDesigner()?.name }}</span>\r
            </div>\r
            <div class="ds-appt-detail__row">\r
              <span class="ds-appt-detail__label">D\u1ECBch v\u1EE5</span>\r
              <span class="ds-appt-detail__value">T\u01B0 v\u1EA5n thi\u1EBFt k\u1EBF</span>\r
            </div>\r
            <div class="ds-appt-detail__row">\r
              <span class="ds-appt-detail__label">Ng\xE0y</span>\r
              <span class="ds-appt-detail__value">{{ selectedDateLabel() }}</span>\r
            </div>\r
            <div class="ds-appt-detail__row">\r
              <span class="ds-appt-detail__label">Gi\u1EDD</span>\r
              <span class="ds-appt-detail__value">{{ selectedTime() }}</span>\r
            </div>\r
          </div>\r
\r
          <!-- Member card -->\r
          <div class="ds-member-card">\r
            <div class="ds-member-card__info">\r
              <p class="ds-member-card__label">RENGA MEMBER</p>\r
              <p class="ds-member-card__name">Nguy\u1EC5n Th\u1ECB Tr\xFAc</p>\r
              <p class="ds-member-card__tier">Gold Member</p>\r
            </div>\r
            <div class="ds-member-card__benefit">\r
              <span class="ds-member-card__discount">\u01AFu \u0111\xE3i 10%</span>\r
            </div>\r
          </div>\r
\r
          <!-- Payment methods -->\r
          <div class="ds-pay-methods">\r
            <h3 class="ds-pay-methods__title">Ph\u01B0\u01A1ng th\u1EE9c thanh to\xE1n</h3>\r
            @for (method of paymentMethods; track method.id) {\r
              <label class="ds-pay-method" [class.is-selected]="selectedPayment() === method.id">\r
                <input type="radio" name="payment" [value]="method.id"\r
                  [checked]="selectedPayment() === method.id"\r
                  (change)="selectPayment(method.id)" />\r
                <span class="ds-pay-method__icon">\r
                  @switch (method.id) {\r
                    @case ('momo') {\r
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                        <rect width="36" height="36" rx="8" fill="#AE2070"/>\r
                        <rect x="8" y="13" width="20" height="13" rx="2.5" fill="white"/>\r
                        <rect x="8" y="17" width="20" height="3.5" fill="#AE2070"/>\r
                        <rect x="11" y="21.5" width="6" height="2.5" rx="1.25" fill="#AE2070" fill-opacity="0.6"/>\r
                        <circle cx="24.5" cy="22.75" r="1.75" fill="#AE2070" fill-opacity="0.6"/>\r
                      </svg>\r
                    }\r
                    @case ('vnpay') {\r
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                        <rect width="36" height="36" rx="8" fill="#003087"/>\r
                        <rect x="7" y="7" width="9" height="9" rx="1.5" fill="white" fill-opacity="0.9"/>\r
                        <rect x="9" y="9" width="2" height="2" fill="#003087"/>\r
                        <rect x="12" y="9" width="2" height="2" fill="#003087"/>\r
                        <rect x="9" y="12" width="2" height="2" fill="#003087"/>\r
                        <rect x="20" y="7" width="9" height="9" rx="1.5" fill="white" fill-opacity="0.9"/>\r
                        <rect x="22" y="9" width="2" height="2" fill="#003087"/>\r
                        <rect x="25" y="9" width="2" height="2" fill="#003087"/>\r
                        <rect x="22" y="12" width="2" height="2" fill="#003087"/>\r
                        <rect x="7" y="20" width="9" height="9" rx="1.5" fill="white" fill-opacity="0.9"/>\r
                        <rect x="9" y="22" width="2" height="2" fill="#003087"/>\r
                        <rect x="9" y="25" width="2" height="2" fill="#003087"/>\r
                        <rect x="12" y="22" width="2" height="2" fill="#003087"/>\r
                        <rect x="20" y="20" width="2" height="2" fill="white"/>\r
                        <rect x="23" y="20" width="2" height="2" fill="white"/>\r
                        <rect x="26" y="20" width="2" height="2" fill="white"/>\r
                        <rect x="20" y="23" width="2" height="2" fill="white"/>\r
                        <rect x="24" y="23" width="4" height="2" fill="white"/>\r
                        <rect x="20" y="26" width="2" height="2" fill="white"/>\r
                        <rect x="23" y="26" width="2" height="2" fill="white"/>\r
                      </svg>\r
                    }\r
                    @case ('bank') {\r
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                        <rect width="36" height="36" rx="8" fill="#1a3c5e"/>\r
                        <polygon points="18,8 6.5,15.5 29.5,15.5" fill="white"/>\r
                        <rect x="9" y="16.5" width="3" height="8.5" fill="white"/>\r
                        <rect x="13.5" y="16.5" width="3" height="8.5" fill="white"/>\r
                        <rect x="19.5" y="16.5" width="3" height="8.5" fill="white"/>\r
                        <rect x="24" y="16.5" width="3" height="8.5" fill="white"/>\r
                        <rect x="7" y="26" width="22" height="2.5" rx="1.25" fill="white"/>\r
                      </svg>\r
                    }\r
                    @case ('card') {\r
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                        <rect width="36" height="36" rx="8" fill="#2c5f8a"/>\r
                        <rect x="5" y="11" width="26" height="16" rx="3" stroke="white" stroke-width="1.5" fill="none"/>\r
                        <rect x="5" y="15" width="26" height="4.5" fill="white"/>\r
                        <rect x="8" y="23" width="8" height="2.5" rx="1.25" fill="white" fill-opacity="0.8"/>\r
                        <circle cx="24.5" cy="24.25" r="2.5" fill="#e8c547" fill-opacity="0.8"/>\r
                        <circle cx="27" cy="24.25" r="2.5" fill="#e8c547" fill-opacity="0.5"/>\r
                      </svg>\r
                    }\r
                  }\r
                </span>\r
                <span class="ds-pay-method__label">{{ method.label }}</span>\r
              </label>\r
            }\r
          </div>\r
\r
        </div>\r
\r
        <!-- Summary sidebar -->\r
        <aside class="ds-pay-summary">\r
          <h3 class="ds-pay-summary__title">T\xF3m t\u1EAFt thanh to\xE1n</h3>\r
          <div class="ds-pay-summary__rows">\r
            <div class="ds-pay-summary__row">\r
              <span>Ph\xED t\u01B0 v\u1EA5n Designer</span>\r
              <span>{{ formatVnd(consultationFee()) }}</span>\r
            </div>\r
            <div class="ds-pay-summary__row ds-pay-summary__row--discount">\r
              <span>\u01AFu \u0111\xE3i th\xE0nh vi\xEAn (10%)</span>\r
              <span>- {{ formatVnd(memberDiscount()) }}</span>\r
            </div>\r
            <div class="ds-pay-summary__row">\r
              <span>\u0110\u1EB7t c\u1ECDc (50%)</span>\r
              <span>{{ formatVnd(depositAmount()) }}</span>\r
            </div>\r
          </div>\r
          <div class="ds-pay-summary__total">\r
            <span class="ds-pay-summary__total-label">T\u1ED5ng thanh to\xE1n</span>\r
            <span class="ds-pay-summary__total-val">{{ formatVnd(depositAmount()) }}</span>\r
          </div>\r
          <button class="ds-pay-summary__pay-btn" type="button" (click)="completeBooking()">\r
            HO\xC0N T\u1EA4T \u0110\u1EB6T L\u1ECACH\r
          </button>\r
          <p class="ds-pay-summary__note">\r
            \u0110\u1EB7t c\u1ECDc 50% \u0111\u1EC3 x\xE1c nh\u1EADn l\u1ECBch h\u1EB9n. S\u1ED1 ti\u1EC1n c\xF2n l\u1EA1i s\u1EBD \u0111\u01B0\u1EE3c thanh to\xE1n sau bu\u1ED5i t\u01B0 v\u1EA5n.\r
          </p>\r
        </aside>\r
\r
      </div>\r
\r
      <div class="design-step__actions">\r
        <button class="btn btn--ghost" type="button" (click)="goToStep(3)">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
      </div>\r
    </div>\r
  }\r
\r
</section>\r
`, styles: ['/* src/app/design/design.component.css */\n.design-page {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px) 120px;\n  font-family: var(--font-sans);\n}\n.step-progress {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 0 48px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.step-progress__item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  position: relative;\n  z-index: 1;\n}\n.step-progress__circle {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  background: var(--color-white);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-muted);\n  transition: all 0.25s;\n}\n.step-progress__item--active .step-progress__circle {\n  border-color: var(--color-primary);\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n.step-progress__item--done .step-progress__circle {\n  border-color: var(--color-primary);\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n.step-progress__label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  white-space: nowrap;\n}\n.step-progress__item--active .step-progress__label {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.step-progress__connector {\n  flex: 1;\n  max-width: 160px;\n  height: 1px;\n  background: var(--color-border);\n  margin-bottom: 22px;\n  transition: background 0.2s;\n}\n.step-progress__connector--done {\n  background: var(--color-primary);\n}\n.design-step {\n  padding-bottom: 40px;\n}\n.design-step__title {\n  font-family: var(--font-serif);\n  font-size: 40px;\n  font-weight: 500;\n  color: var(--color-primary);\n  text-align: center;\n  margin: 0 0 48px;\n  letter-spacing: -0.5px;\n}\n.design-step__actions {\n  margin-top: 32px;\n  padding-top: 24px;\n}\n.step3-actions {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.step3-cta {\n  flex: 1;\n  width: auto;\n  margin: 0;\n}\n.designer-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n  margin-bottom: 40px;\n}\n.designer-card {\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  transition: box-shadow 0.2s, border-color 0.2s;\n  outline: none;\n}\n.designer-card:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n  border-color: var(--color-primary);\n}\n.designer-card:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n}\n.designer-card--selected {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 2px rgba(196, 96, 126, 0.3);\n}\n.designer-card__photo {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 3 / 4;\n  overflow: hidden;\n}\n.designer-card__photo-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: top center;\n  display: block;\n  filter: grayscale(30%);\n  transition: filter 0.3s, transform 0.4s;\n}\n.designer-card:hover .designer-card__photo-img {\n  filter: grayscale(0%);\n  transform: scale(1.03);\n}\n.designer-card__desaturate {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.08);\n  transition: opacity 0.3s;\n}\n.designer-card:hover .designer-card__desaturate {\n  opacity: 0;\n}\n.designer-card__gradient {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 32px 16px 16px;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.75) 0%,\n      transparent 100%);\n  display: flex;\n  align-items: flex-end;\n}\n.designer-card__badge {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  padding: 4px 10px;\n}\n.designer-card__body {\n  padding: 20px 20px 16px;\n}\n.designer-card__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n.designer-card__name {\n  font-family: var(--font-serif);\n  font-size: 17px;\n  font-weight: 500;\n  color: var(--color-dark);\n  line-height: 1.3;\n  margin: 0;\n}\n.designer-card__stars {\n  display: flex;\n  gap: 2px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.designer-card__star {\n  width: 12px;\n  height: 12px;\n  color: #f5a623;\n}\n.designer-card__specialty {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n  margin: 0 0 16px;\n}\n.designer-card__footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-top: 1px solid var(--color-border);\n  padding-top: 14px;\n  margin-top: 4px;\n}\n.designer-card__fee {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.designer-card__fee-label {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n}\n.designer-card__fee-amount {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--color-dark);\n}\n.designer-card__select {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  border: 1px solid var(--color-primary);\n  background: transparent;\n  padding: 8px 18px;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.designer-card__select:hover {\n  background: var(--color-primary);\n  color: var(--color-white);\n}\n.designer-load-more-wrap {\n  display: flex;\n  justify-content: center;\n  margin-top: 8px;\n}\n.designer-load-more {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  border: 1px solid var(--color-border);\n  background: transparent;\n  padding: 14px 40px;\n  cursor: pointer;\n  transition: border-color 0.2s, color 0.2s;\n}\n.designer-load-more:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-time-layout {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 48px;\n  align-items: start;\n}\n.ds-designer-panel {\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  padding-bottom: 24px;\n  position: sticky;\n  top: 100px;\n}\n.ds-designer-panel__photo {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  overflow: hidden;\n}\n.ds-designer-panel__photo-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: top;\n  filter: grayscale(20%);\n}\n.ds-designer-panel__desaturate {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.1);\n}\n.ds-designer-panel__name {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  font-weight: 500;\n  color: var(--color-dark);\n  margin: 20px 20px 4px;\n}\n.ds-designer-panel__role {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  margin: 0 20px 8px;\n}\n.ds-designer-panel__bio {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  margin: 0 20px 16px;\n}\n.ds-designer-panel__divider {\n  border: none;\n  border-top: 1px solid var(--color-border);\n  margin: 0 20px 16px;\n}\n.ds-booking-summary {\n  padding: 0 20px;\n  margin-bottom: 20px;\n}\n.ds-booking-summary__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 8px 0;\n  border-bottom: 1px solid rgba(196, 199, 199, 0.4);\n}\n.ds-booking-summary__row:last-child {\n  border-bottom: none;\n}\n.ds-booking-summary__label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n}\n.ds-booking-summary__value {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  font-weight: 500;\n  max-width: 140px;\n  text-align: right;\n}\n.ds-cta-btn {\n  display: block;\n  width: calc(100% - 40px);\n  margin: 0 20px;\n  background: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 16px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.2s;\n  text-align: center;\n}\n.ds-cta-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.ds-cta-btn:not(:disabled):hover {\n  opacity: 0.88;\n}\n.ds-calendar-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.ds-calendar {\n  border: 1px solid var(--color-border);\n  padding: 24px;\n  background: var(--color-white);\n}\n.ds-calendar__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.ds-calendar__nav {\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  font-size: 20px;\n  color: var(--color-dark);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: border-color 0.2s;\n}\n.ds-calendar__nav:hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-calendar__month-label {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--color-dark);\n  text-transform: capitalize;\n}\n.ds-calendar__grid {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n}\n.ds-calendar__day-header {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-align: center;\n  color: var(--color-muted);\n  padding: 6px 0;\n}\n.ds-calendar__date {\n  aspect-ratio: 1;\n  border: none;\n  background: transparent;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  cursor: pointer;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s, color 0.15s;\n}\n.ds-calendar__date:hover:not(:disabled):not(.is-disabled) {\n  background: var(--color-primary-light);\n  color: var(--color-primary);\n}\n.ds-calendar__date.is-selected {\n  background: var(--color-primary) !important;\n  color: var(--color-white) !important;\n}\n.ds-calendar__date.is-disabled,\n.ds-calendar__date:disabled {\n  color: var(--color-border);\n  cursor: default;\n}\n.ds-calendar__date--empty {\n  cursor: default;\n}\n.ds-timeslot-section {\n  border: 1px solid var(--color-border);\n  padding: 24px;\n  background: var(--color-white);\n}\n.ds-timeslot-section__title {\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  text-transform: capitalize;\n}\n.ds-timeslot-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n}\n.ds-timeslot {\n  padding: 12px 8px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--color-dark);\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    color 0.15s;\n  text-align: center;\n}\n.ds-timeslot:hover:not(:disabled):not(.is-unavailable) {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-timeslot.is-selected {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.ds-timeslot.is-unavailable,\n.ds-timeslot:disabled {\n  background: var(--color-bg-card);\n  color: var(--color-border);\n  cursor: not-allowed;\n  border-color: transparent;\n  font-size: 11px;\n}\n.ds-idea-form {\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  padding: 40px 48px;\n}\n.ds-form-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 28px 40px;\n}\n.ds-form__group {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ds-form__group--full {\n  grid-column: 1 / -1;\n}\n.ds-form__label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0;\n}\n.ds-form__input,\n.ds-form__select,\n.ds-form__textarea {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  padding: 13px 16px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  background: var(--color-white);\n  outline: none;\n  transition: border-color 0.15s;\n}\n:is(.ds-form__input, .ds-form__select, .ds-form__textarea):focus {\n  border-color: var(--color-primary);\n}\n:is(.ds-form__input, .ds-form__select, .ds-form__textarea)::placeholder {\n  color: #bbb;\n}\n.ds-form__textarea {\n  resize: vertical;\n  min-height: 120px;\n}\n.ds-form__select-wrap {\n  position: relative;\n}\n.ds-form__select-wrap::after {\n  content: "\\e2\\2c6\\a8";\n  position: absolute;\n  right: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 12px;\n  color: var(--color-muted);\n  pointer-events: none;\n}\n.ds-form__select {\n  appearance: none;\n  padding-right: 36px;\n  cursor: pointer;\n}\n.ds-toggle-group {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.ds-toggle-btn {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  padding: 10px 18px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  color: var(--color-muted);\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.ds-toggle-btn.is-active {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.ds-toggle-btn:not(.is-active):hover {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.ds-upload-zone {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  border: 2px dashed var(--color-border);\n  padding: 40px 24px;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  text-align: center;\n}\n.ds-upload-zone:hover {\n  border-color: var(--color-primary);\n}\n.ds-upload-zone__input {\n  display: none;\n}\n.ds-upload-zone__icon {\n  color: var(--color-muted);\n  margin-bottom: 4px;\n}\n.ds-upload-zone__text {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  font-weight: 500;\n}\n.ds-upload-zone__hint {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n}\n.ds-payment-layout {\n  display: grid;\n  grid-template-columns: 1fr 340px;\n  gap: 48px;\n  align-items: start;\n}\n.ds-payment-left {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.ds-appt-detail {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n}\n.ds-appt-detail__title {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.ds-appt-detail__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 10px 0;\n  border-bottom: 1px solid rgba(196, 199, 199, 0.35);\n}\n.ds-appt-detail__row:last-child {\n  border-bottom: none;\n}\n.ds-appt-detail__label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n}\n.ds-appt-detail__value {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  font-weight: 500;\n  text-align: right;\n}\n.ds-member-card {\n  border: 1px solid var(--color-primary);\n  padding: 20px 24px;\n  background: var(--color-primary-light);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.ds-member-card__label {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  margin: 0 0 4px;\n}\n.ds-member-card__name {\n  font-family: var(--font-serif);\n  font-size: 17px;\n  font-weight: 500;\n  color: var(--color-dark);\n  margin: 0 0 2px;\n}\n.ds-member-card__tier {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  margin: 0;\n}\n.ds-member-card__discount {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--color-primary);\n  border: 1px solid var(--color-primary);\n  padding: 8px 16px;\n}\n.ds-pay-methods {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n}\n.ds-pay-methods__title {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.ds-pay-method {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border: 1px solid var(--color-border);\n  margin-bottom: 10px;\n  cursor: pointer;\n  transition: border-color 0.15s;\n}\n.ds-pay-method:last-child {\n  margin-bottom: 0;\n}\n.ds-pay-method.is-selected {\n  border-color: var(--color-primary);\n  background: var(--color-primary-light);\n}\n.ds-pay-method input[type=radio] {\n  accent-color: var(--color-primary);\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.ds-pay-method__icon {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n.ds-pay-method__icon svg {\n  display: block;\n  border-radius: 6px;\n}\n.ds-pay-method__label {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.ds-pay-summary {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n  position: sticky;\n  top: 100px;\n}\n.ds-pay-summary__title {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.ds-pay-summary__rows {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.ds-pay-summary__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n}\n.ds-pay-summary__row--discount {\n  color: #27ae60;\n}\n.ds-pay-summary__total {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 16px 0;\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n  margin-bottom: 20px;\n}\n.ds-pay-summary__total-label {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.ds-pay-summary__total-val {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.ds-pay-summary__pay-btn {\n  width: 100%;\n  background: var(--color-primary);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 16px;\n  border: none;\n  cursor: pointer;\n  margin-bottom: 16px;\n  transition: opacity 0.2s;\n}\n.ds-pay-summary__pay-btn:hover {\n  opacity: 0.88;\n}\n.ds-pay-summary__note {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  text-align: center;\n  margin: 0;\n}\n.btn {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  padding: 14px 28px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn--ghost {\n  background: transparent;\n  border: 1px solid var(--color-border);\n  color: var(--color-dark);\n}\n.btn--ghost:hover {\n  border-color: var(--color-dark);\n}\n@media (max-width: 1024px) {\n  .designer-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .ds-time-layout {\n    grid-template-columns: 240px 1fr;\n    gap: 32px;\n  }\n  .ds-payment-layout {\n    grid-template-columns: 1fr 300px;\n    gap: 32px;\n  }\n}\n@media (max-width: 768px) {\n  .design-page {\n    padding: 0 24px 80px;\n  }\n  .designer-grid {\n    grid-template-columns: 1fr;\n    max-width: 400px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n  .ds-time-layout,\n  .ds-payment-layout {\n    grid-template-columns: 1fr;\n  }\n  .ds-designer-panel {\n    position: static;\n  }\n  .ds-pay-summary {\n    position: static;\n  }\n  .ds-form-grid {\n    grid-template-columns: 1fr;\n  }\n  .ds-form__group--full {\n    grid-column: 1;\n  }\n  .ds-idea-form {\n    padding: 24px;\n  }\n  .step-progress__connector {\n    max-width: 40px;\n  }\n  .step-progress__label {\n    font-size: 9px;\n  }\n}\n/*# sourceMappingURL=design.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DesignComponent, { className: "DesignComponent", filePath: "src/app/design/design.component.ts", lineNumber: 30 });
})();
export {
  DesignComponent
};
//# sourceMappingURL=chunk-C5WROZNW.js.map
