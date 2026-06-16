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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/studio/studio.component.ts
var _forTrack0 = ($index, $item) => $item.n;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.src;
var _forTrack3 = ($index, $item) => $item.name;
function StudioComponent_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 7);
    \u0275\u0275element(1, "path", 10);
    \u0275\u0275elementEnd();
  }
}
function StudioComponent_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const step_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", step_r2.n, " ");
  }
}
function StudioComponent_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 11);
  }
  if (rf & 2) {
    const step_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("step-progress__connector--done", ctx_r2.currentStep() > step_r2.n);
  }
}
function StudioComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275listener("click", function StudioComponent_For_3_Template_div_click_0_listener() {
      const step_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.currentStep() > step_r2.n && ctx_r2.goToStep(step_r2.n));
    });
    \u0275\u0275elementStart(1, "span", 6);
    \u0275\u0275conditionalCreate(2, StudioComponent_For_3_Conditional_2_Template, 2, 0, ":svg:svg", 7)(3, StudioComponent_For_3_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, StudioComponent_For_3_Conditional_6_Template, 1, 2, "div", 9);
  }
  if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const \u0275$index_5_r4 = ctx.$index;
    const \u0275$count_5_r5 = ctx.$count;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("cursor", ctx_r2.currentStep() > step_r2.n ? "pointer" : "default");
    \u0275\u0275classProp("step-progress__item--active", ctx_r2.currentStep() === step_r2.n)("step-progress__item--done", ctx_r2.currentStep() > step_r2.n);
    \u0275\u0275attribute("aria-current", ctx_r2.currentStep() === step_r2.n ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.currentStep() > step_r2.n ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r2.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_5_r4 === \u0275$count_5_r5 - 1) ? 6 : -1);
  }
}
function StudioComponent_Conditional_4_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function StudioComponent_Conditional_4_For_8_Template_button_click_0_listener() {
      const cat_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectCategory(cat_r7.id));
    });
    \u0275\u0275elementStart(1, "div", 18);
    \u0275\u0275element(2, "img", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "div", 21)(5, "span", 22);
    \u0275\u0275text(6, "Danh m\u1EE5c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 24);
    \u0275\u0275text(10, "CH\u1ECCN");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", cat_r7.image, \u0275\u0275sanitizeUrl)("alt", cat_r7.name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(cat_r7.name);
  }
}
function StudioComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 12)(2, "h2", 13);
    \u0275\u0275text(3, "Ch\u1ECDn ph\xF4i s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275text(5, "B\u1EAFt \u0111\u1EA7u h\xE0nh tr\xECnh t\u1EA1o n\xEAn ki\u1EC7t t\xE1c c\u1EE7a ri\xEAng b\u1EA1n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 15);
    \u0275\u0275repeaterCreate(7, StudioComponent_Conditional_4_For_8_Template, 11, 3, "button", 16, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.categories);
  }
}
function StudioComponent_Conditional_5_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function StudioComponent_Conditional_5_For_25_Template_button_click_0_listener() {
      const mat_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectMaterial(mat_r10));
    });
    \u0275\u0275element(1, "span", 46);
    \u0275\u0275elementStart(2, "span", 47)(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const mat_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("material-option--selected", ctx_r2.selectedMaterial().id === mat_r10.id);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", mat_r10.color);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(mat_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mat_r10.tag);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mat_r10.price);
  }
}
function StudioComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 25);
    \u0275\u0275element(2, "img", 26);
    \u0275\u0275elementStart(3, "div", 27)(4, "span", 28);
    \u0275\u0275text(5, "G\xF3c nh\xECn 01");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 29)(7, "button", 30);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 31);
    \u0275\u0275element(9, "circle", 32)(10, "path", 33)(11, "line", 34)(12, "line", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "button", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 31);
    \u0275\u0275element(15, "polyline", 37)(16, "path", 38);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div", 39)(18, "div", 12)(19, "h2", 13);
    \u0275\u0275text(20, "Ch\u1ECDn ch\u1EA5t li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 14);
    \u0275\u0275text(22, "H\xE3y ch\u1ECDn lo\u1EA1i kim lo\u1EA1i qu\xFD cho ki\u1EC7t t\xE1c c\u1EE7a b\u1EA1n. M\u1ED7i ch\u1EA5t li\u1EC7u mang m\u1ED9t c\xE2u chuy\u1EC7n v\xE0 \u0111\u1ED9 b\u1EC1n ri\xEAng bi\u1EC7t.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 40);
    \u0275\u0275repeaterCreate(24, StudioComponent_Conditional_5_For_25_Template, 9, 7, "button", 41, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 42)(27, "button", 43);
    \u0275\u0275listener("click", function StudioComponent_Conditional_5_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(1));
    });
    \u0275\u0275text(28, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 44);
    \u0275\u0275listener("click", function StudioComponent_Conditional_5_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(3));
    });
    \u0275\u0275text(30, "TI\u1EBEP THEO");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(24);
    \u0275\u0275repeater(ctx_r2.materials);
  }
}
function StudioComponent_Conditional_6_For_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function StudioComponent_Conditional_6_For_36_Template_button_click_0_listener() {
      const stone_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectStone(stone_r13));
    });
    \u0275\u0275element(1, "img", 63);
    \u0275\u0275elementStart(2, "span", 64);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const stone_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("stone-option--selected", ctx_r2.selectedStone().id === stone_r13.id)("stone-option--muted", stone_r13.muted);
    \u0275\u0275advance();
    \u0275\u0275property("src", stone_r13.image, \u0275\u0275sanitizeUrl)("alt", stone_r13.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stone_r13.label);
  }
}
function StudioComponent_Conditional_6_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2, "02. TR\u1ECCNG L\u01AF\u1EE2NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 65)(6, "input", 66);
    \u0275\u0275listener("input", function StudioComponent_Conditional_6_Conditional_37_Template_input_input_6_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onCaratChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 67)(8, "span");
    \u0275\u0275text(9, "0.5ct");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "1ct");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "5.0ct");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "6.0ct");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 68)(17, "div", 69)(18, "span");
    \u0275\u0275text(19, "Ph\xF4i Di S\u1EA3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 69)(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 69)(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(32, "div", 70);
    \u0275\u0275elementStart(33, "div", 71)(34, "span");
    \u0275\u0275text(35, "T\u1ED4NG GI\xC1 TR\u1ECA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "strong");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r2.carat(), " carat");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r2.carat());
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.MOUNT_FEE));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.selectedMaterial().label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.selectedMaterial().priceVnd));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r2.selectedStone().label, " (", ctx_r2.carat(), "ct)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.stonePrice()));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.MOUNT_FEE + ctx_r2.selectedMaterial().priceVnd + ctx_r2.stonePrice()));
  }
}
function StudioComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 25);
    \u0275\u0275element(2, "img", 51);
    \u0275\u0275elementStart(3, "div", 52)(4, "p", 53);
    \u0275\u0275text(5, "Ph\xF4i Solitaire Heritage");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 54);
    \u0275\u0275text(7, "Thi\u1EBFt k\u1EBF \u0111\u1EB7c tr\u01B0ng ch\xFAng t\xF4i \u0111\u01B0\u1EE3c ch\u1EBF t\xE1c ch\xEDnh x\xE1c \u0111\u1EC3 l\xE0m t\u0103ng \u0111\u1ED9 s\xE1ng v\xE0 t\xF4n vinh v\u1EBB \u0111\u1EB9p t\u1EF1 nhi\xEAn c\u1EE7a vi\xEAn \u0111\xE1 trung t\xE2m m\xE0 b\u1EA1n \u0111\xE3 ch\u1ECDn.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 27)(9, "div", 29)(10, "button", 30);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 31);
    \u0275\u0275element(12, "circle", 32)(13, "path", 33)(14, "line", 34)(15, "line", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "button", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 31);
    \u0275\u0275element(18, "polyline", 37)(19, "path", 38);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "div", 39)(21, "div", 55)(22, "div")(23, "h2", 13);
    \u0275\u0275text(24, "T\xF9y bi\u1EBFn \u0111\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p", 14);
    \u0275\u0275text(26, "H\xE3y ch\u1ECDn lo\u1EA1i ph\u1EE5 ki\u1EC7n ph\xF9 h\u1EE3p v\u1EDBi thi\u1EBFt k\u1EBF c\u1EE7a b\u1EA1n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "button", 56);
    \u0275\u0275listener("click", function StudioComponent_Conditional_6_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(4));
    });
    \u0275\u0275text(28, "B\u1ECE QUA");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 57)(30, "span", 58);
    \u0275\u0275text(31, "01. CH\u1ECCN LO\u1EA0I \u0110\xC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 59);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 60);
    \u0275\u0275repeaterCreate(35, StudioComponent_Conditional_6_For_36_Template, 4, 7, "button", 61, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(37, StudioComponent_Conditional_6_Conditional_37_Template, 38, 9);
    \u0275\u0275elementStart(38, "div", 42)(39, "button", 43);
    \u0275\u0275listener("click", function StudioComponent_Conditional_6_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(2));
    });
    \u0275\u0275text(40, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 44);
    \u0275\u0275listener("click", function StudioComponent_Conditional_6_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(4));
    });
    \u0275\u0275text(42, "X\xC1C NH\u1EACN THI\u1EBET K\u1EBE");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(33);
    \u0275\u0275textInterpolate(ctx_r2.selectedStone().label);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.stones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedStone().id !== "none" ? 37 : -1);
  }
}
function StudioComponent_Conditional_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("engrave-gallery__overlay--serif", ctx_r2.engraveFont() === "serif-italic");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.engraveText(), " ");
  }
}
function StudioComponent_Conditional_7_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 89);
    \u0275\u0275listener("click", function StudioComponent_Conditional_7_For_7_Template_button_click_0_listener() {
      const \u0275$index_284_r17 = \u0275\u0275restoreView(_r16).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectThumb(\u0275$index_284_r17));
    });
    \u0275\u0275element(1, "img", 90);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const thumb_r18 = ctx.$implicit;
    const \u0275$index_284_r17 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("engrave-gallery__thumb--active", ctx_r2.selectedThumbIndex() === \u0275$index_284_r17);
    \u0275\u0275advance();
    \u0275\u0275property("src", thumb_r18.src, \u0275\u0275sanitizeUrl)("alt", thumb_r18.alt);
  }
}
function StudioComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 72)(2, "div", 73);
    \u0275\u0275element(3, "img", 74);
    \u0275\u0275conditionalCreate(4, StudioComponent_Conditional_7_Conditional_4_Template, 2, 3, "div", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 76);
    \u0275\u0275repeaterCreate(6, StudioComponent_Conditional_7_For_7_Template, 2, 4, "button", 77, _forTrack2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 39)(9, "div", 55)(10, "div")(11, "h2", 13);
    \u0275\u0275text(12, "T\xF9y ch\u1ECDn kh\u1EAFc ch\u1EEF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 14);
    \u0275\u0275text(14, "C\xF4ng ngh\u1EC7 kh\u1EAFc laser ch\xEDnh x\xE1c gi\xFAp l\u01B0u gi\u1EEF d\u1EA5u \u1EA5n \u1EA5y b\u1EC1n v\u1EEFng theo th\u1EDDi gian.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 56);
    \u0275\u0275listener("click", function StudioComponent_Conditional_7_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(5));
    });
    \u0275\u0275text(16, "B\u1ECE QUA");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 57)(18, "span", 58);
    \u0275\u0275text(19, "01. N\u1ED8I DUNG KH\u1EAEC CH\u1EEE");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 78)(21, "input", 79);
    \u0275\u0275listener("input", function StudioComponent_Conditional_7_Template_input_input_21_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onEngraveInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 80)(23, "span", 81);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 82);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 57)(28, "span", 58);
    \u0275\u0275text(29, "02. CH\u1ECCN FONT CH\u1EEE");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 83)(31, "button", 84);
    \u0275\u0275listener("click", function StudioComponent_Conditional_7_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectFont("serif-italic"));
    });
    \u0275\u0275text(32, " SERIF ITALIC ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 84);
    \u0275\u0275listener("click", function StudioComponent_Conditional_7_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectFont("classic-sans"));
    });
    \u0275\u0275text(34, " CLASSIC SANS ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 85)(36, "span", 86);
    \u0275\u0275text(37, "PH\xCD TR\u1EA2 TH\xCAM:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 87);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 42)(41, "button", 43);
    \u0275\u0275listener("click", function StudioComponent_Conditional_7_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(3));
    });
    \u0275\u0275text(42, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 44);
    \u0275\u0275listener("click", function StudioComponent_Conditional_7_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToStep(5));
    });
    \u0275\u0275text(44, "X\xC1C NH\u1EACN THI\u1EBET K\u1EBE");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r2.currentGalleryImage().src, \u0275\u0275sanitizeUrl)("alt", ctx_r2.currentGalleryImage().alt);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.engraveText() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.engraveGallery);
    \u0275\u0275advance(15);
    \u0275\u0275property("value", ctx_r2.engraveText());
    \u0275\u0275attribute("maxlength", ctx_r2.MAX_ENGRAVE_CHARS);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("engrave-input-wrap__count--warn", ctx_r2.engraveCharCount() > ctx_r2.ENGRAVE_FREE_CHARS);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.engraveCharCount(), " / ", ctx_r2.MAX_ENGRAVE_CHARS, " K\xDD T\u1EF0 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("MI\u1EC4N PH\xCD ", ctx_r2.ENGRAVE_FREE_CHARS, " K\xDD T\u1EF0");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("font-selector__option--active", ctx_r2.engraveFont() === "serif-italic");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("font-selector__option--active", ctx_r2.engraveFont() === "classic-sans");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.engraveFee() > 0 ? ctx_r2.formatVnd(ctx_r2.engraveFee()) : "0\u20AB");
  }
}
function StudioComponent_Conditional_8_Conditional_0_For_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 114);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r20 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", item_r20.subName, ")");
  }
}
function StudioComponent_Conditional_8_Conditional_0_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 96)(1, "span", 113);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, StudioComponent_Conditional_8_Conditional_0_For_12_Conditional_3_Template, 2, 1, "span", 114);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 115);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r20 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r20.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r20.subName ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(item_r20.price));
  }
}
function StudioComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 25);
    \u0275\u0275element(2, "img", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 39)(4, "div", 12)(5, "h2", 13);
    \u0275\u0275text(6, "X\xE1c nh\u1EADn & Thanh to\xE1n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 93)(8, "h3", 94);
    \u0275\u0275text(9, "PH\xC2N T\xCDCH GI\xC1 CHI TI\u1EBET");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "ul", 95);
    \u0275\u0275repeaterCreate(11, StudioComponent_Conditional_8_Conditional_0_For_12_Template, 6, 3, "li", 96, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "div", 97);
    \u0275\u0275elementStart(14, "div", 98)(15, "span");
    \u0275\u0275text(16, "T\u1ED4NG C\u1ED8NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 99)(20, "button", 100);
    \u0275\u0275listener("click", function StudioComponent_Conditional_8_Conditional_0_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToCheckout());
    });
    \u0275\u0275text(21, " \u0110\u1EB6T H\xC0NG NGAY \u2192 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 101);
    \u0275\u0275text(23, " TH\xCAM V\xC0O GI\u1ECE ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 102)(25, "button", 103);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(26, "svg", 104);
    \u0275\u0275element(27, "path", 105)(28, "polyline", 106)(29, "polyline", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " L\u01AFU THI\u1EBET K\u1EBE ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(31, "button", 103);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(32, "svg", 104);
    \u0275\u0275element(33, "circle", 108)(34, "circle", 109)(35, "circle", 110)(36, "line", 111)(37, "line", 112);
    \u0275\u0275elementEnd();
    \u0275\u0275text(38, " CHIA S\u1EBA ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(39, "div", 42)(40, "button", 43);
    \u0275\u0275listener("click", function StudioComponent_Conditional_8_Conditional_0_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToStep(4));
    });
    \u0275\u0275text(41, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.orderItems());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.totalPrice()));
  }
}
function StudioComponent_Conditional_8_Conditional_1_Conditional_12_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 152);
    \u0275\u0275text(1, "Vui l\xF2ng nh\u1EADp h\u1ECD t\xEAn");
    \u0275\u0275elementEnd();
  }
}
function StudioComponent_Conditional_8_Conditional_1_Conditional_12_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 152);
    \u0275\u0275text(1, "Vui l\xF2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
    \u0275\u0275elementEnd();
  }
}
function StudioComponent_Conditional_8_Conditional_1_Conditional_12_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 152);
    \u0275\u0275text(1, "Vui l\xF2ng nh\u1EADp \u0111\u1ECBa ch\u1EC9");
    \u0275\u0275elementEnd();
  }
}
function StudioComponent_Conditional_8_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 123)(1, "div", 149)(2, "label", 150);
    \u0275\u0275text(3, "H\u1ECC T\xCAN *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 151);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(5, StudioComponent_Conditional_8_Conditional_1_Conditional_12_Conditional_5_Template, 2, 0, "span", 152);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 149)(7, "label", 153);
    \u0275\u0275text(8, "S\u1ED0 \u0110I\u1EC6N THO\u1EA0I *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 154);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(10, StudioComponent_Conditional_8_Conditional_1_Conditional_12_Conditional_10_Template, 2, 0, "span", 152);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 155)(12, "label", 156);
    \u0275\u0275text(13, "EMAIL (T\xD9Y CH\u1ECCN)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 157);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 149)(16, "label", 158);
    \u0275\u0275text(17, "T\u1EC8NH/TH\xC0NH *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 159)(19, "option", 160);
    \u0275\u0275text(20, "Ch\u1ECDn T\u1EC9nh/Th\xE0nh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 161);
    \u0275\u0275text(22, "TP. H\u1ED3 Ch\xED Minh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 162);
    \u0275\u0275text(24, "H\xE0 N\u1ED9i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 163);
    \u0275\u0275text(26, "\u0110\xE0 N\u1EB5ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 149)(28, "label", 164);
    \u0275\u0275text(29, "PH\u01AF\u1EDCNG/X\xC3 *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "select", 165)(31, "option", 160);
    \u0275\u0275text(32, "Ch\u1ECDn Ph\u01B0\u1EDDng/X\xE3");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 155)(34, "label", 166);
    \u0275\u0275text(35, "S\u1ED0 NH\xC0, T\xCAN \u0110\u01AF\u1EDCNG *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 167);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(37, StudioComponent_Conditional_8_Conditional_1_Conditional_12_Conditional_37_Template, 2, 0, "span", 152);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.checkoutForm.controls.name.invalid && ctx_r2.checkoutForm.controls.name.touched ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.checkoutForm.controls.phone.invalid && ctx_r2.checkoutForm.controls.phone.touched ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(12);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.checkoutForm.controls.address.invalid && ctx_r2.checkoutForm.controls.address.touched ? 37 : -1);
  }
}
function StudioComponent_Conditional_8_Conditional_1_For_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 170);
  }
}
function StudioComponent_Conditional_8_Conditional_1_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 168);
    \u0275\u0275listener("click", function StudioComponent_Conditional_8_Conditional_1_For_18_Template_button_click_0_listener() {
      const method_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectPaymentMethod(method_r23.id));
    });
    \u0275\u0275elementStart(1, "span", 169);
    \u0275\u0275conditionalCreate(2, StudioComponent_Conditional_8_Conditional_1_For_18_Conditional_2_Template, 1, 0, "span", 170);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 171);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const method_r23 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("payment-method--selected", ctx_r2.selectedPaymentMethod() === method_r23.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedPaymentMethod() === method_r23.id ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(method_r23.label);
  }
}
function StudioComponent_Conditional_8_Conditional_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate2(" | ", ctx_r2.selectedStone().label, " ", ctx_r2.carat(), "ct ");
  }
}
function StudioComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 116);
    \u0275\u0275listener("ngSubmit", function StudioComponent_Conditional_8_Conditional_1_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.submitOrder());
    });
    \u0275\u0275elementStart(1, "div", 12)(2, "h2", 13);
    \u0275\u0275text(3, "X\xE1c nh\u1EADn & Thanh to\xE1n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 117)(5, "div", 118)(6, "div", 119)(7, "div", 120)(8, "h3", 121);
    \u0275\u0275text(9, "\u2460 TH\xD4NG TIN V\u1EACN CHUY\u1EC2N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 122);
    \u0275\u0275listener("click", function StudioComponent_Conditional_8_Conditional_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.shippingExpanded.set(!ctx_r2.shippingExpanded()));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, StudioComponent_Conditional_8_Conditional_1_Conditional_12_Template, 38, 3, "div", 123);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 119)(14, "h3", 121);
    \u0275\u0275text(15, "\u2461 PH\u01AF\u01A0NG TH\u1EE8C THANH TO\xC1N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 124);
    \u0275\u0275repeaterCreate(17, StudioComponent_Conditional_8_Conditional_1_For_18_Template, 5, 4, "button", 125, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "aside", 126)(20, "div", 127)(21, "h3", 128);
    \u0275\u0275text(22, "T\u1ED4NG \u0110\u01A0N H\xC0NG (01)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 129);
    \u0275\u0275element(24, "img", 130);
    \u0275\u0275elementStart(25, "div", 131)(26, "p", 132);
    \u0275\u0275text(27, "T\xF9y ch\u1EC9nh Di S\u1EA3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 133);
    \u0275\u0275text(29);
    \u0275\u0275conditionalCreate(30, StudioComponent_Conditional_8_Conditional_1_Conditional_30_Template, 1, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p", 134);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(33, "div", 135);
    \u0275\u0275elementStart(34, "div", 136)(35, "span");
    \u0275\u0275text(36, "T\u1EA1m t\xEDnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 136)(40, "span");
    \u0275\u0275text(41, "Ph\xED v\u1EADn chuy\u1EC3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 137);
    \u0275\u0275text(43, "MI\u1EC4N PH\xCD");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(44, "div", 135);
    \u0275\u0275elementStart(45, "p", 138);
    \u0275\u0275text(46, "M\xC3 VOUCHER / QU\xC0 T\u1EB6NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 139)(48, "input", 140);
    \u0275\u0275listener("input", function StudioComponent_Conditional_8_Conditional_1_Template_input_input_48_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.voucherCode.set($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 141);
    \u0275\u0275listener("click", function StudioComponent_Conditional_8_Conditional_1_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.applyVoucher());
    });
    \u0275\u0275text(50, "\xC1P D\u1EE4NG");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(51, "div", 135);
    \u0275\u0275elementStart(52, "div", 142)(53, "span");
    \u0275\u0275text(54, "T\u1ED4NG C\u1ED8NG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "strong");
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 143)(58, "div", 144)(59, "span");
    \u0275\u0275text(60, "50% \u0110\u1EB6T C\u1ECCC B\xC2Y GI\u1EDC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "strong");
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "div", 145)(64, "span");
    \u0275\u0275text(65, "S\u1ED0 TI\u1EC0N C\xD2N L\u1EA0I");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "strong");
    \u0275\u0275text(67);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(68, "p", 146);
    \u0275\u0275text(69, ' B\u1EB1ng vi\u1EC7c nh\u1EA5n "Thanh to\xE1n", b\u1EA1n \u0111\u1ED3ng \xFD v\u1EDBi c\xE1c \u0110i\u1EC1u kho\u1EA3n & Ch\xEDnh s\xE1ch b\u1EA3o m\u1EADt c\u1EE7a RENGA ');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "button", 147);
    \u0275\u0275text(71, " THANH TO\xC1N \u2192 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(72, "div", 148)(73, "button", 43);
    \u0275\u0275listener("click", function StudioComponent_Conditional_8_Conditional_1_Template_button_click_73_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.backFromCheckout());
    });
    \u0275\u0275text(74, "\u2190 Tr\u01B0\u1EDBc \u0111\xF3");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroup", ctx_r2.checkoutForm);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" CH\u1ECCN \u0110\u1ECAA CH\u1EC8 ", ctx_r2.shippingExpanded() ? "\u2227" : "\u2228", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.shippingExpanded() ? 12 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.paymentMethods);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" K\xEDch c\u1EE1 M | ", ctx_r2.selectedMaterial().label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedStone().id !== "none" ? 30 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("SL: ", ctx_r2.formatVnd(ctx_r2.totalPrice()));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.totalPrice()));
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r2.voucherCode());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.totalPrice()));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.depositAmount()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatVnd(ctx_r2.depositAmount()));
  }
}
function StudioComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, StudioComponent_Conditional_8_Conditional_0_Template, 42, 1, "div", 3);
    \u0275\u0275conditionalCreate(1, StudioComponent_Conditional_8_Conditional_1_Template, 75, 11, "form", 91);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.checkoutSubStep() === 1 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.checkoutSubStep() === 2 ? 1 : -1);
  }
}
function StudioComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 172);
    \u0275\u0275text(2, "T\u1ED5ng gi\xE1 tr\u1ECB hi\u1EC7n t\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 173);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 174);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.priceSummaryAmount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.priceSummaryDetail());
  }
}
var StudioComponent = class _StudioComponent {
  // ─── Constants ───────────────────────────────────────────────────────
  MOUNT_FEE = 4e6;
  CRAFT_FEE = 5e6;
  ENGRAVE_FEE_PER_CHAR = 5e4;
  ENGRAVE_FREE_CHARS = 10;
  MAX_ENGRAVE_CHARS = 25;
  // ─── Static data ──────────────────────────────────────────────────────
  steps = [
    { n: 1, label: "Ch\u1ECDn ph\xF4i" },
    { n: 2, label: "Ch\u1EA5t li\u1EC7u" },
    { n: 3, label: "\u0110\xE1 qu\xFD" },
    { n: 4, label: "Kh\u1EAFc ch\u1EEF" },
    { n: 5, label: "\u0110\u1EB7t h\xE0ng" }
  ];
  categories = [
    {
      id: "nhan",
      name: "Nh\u1EABn",
      image: "https://www.figma.com/api/mcp/asset/dc1a985c-947c-4266-97c9-8119fe0caf30"
    },
    {
      id: "day-chuyen",
      name: "D\xE2y chuy\u1EC1n",
      image: "https://www.figma.com/api/mcp/asset/4f425328-80a5-4f6f-a2b2-6bc553066238"
    },
    {
      id: "hoa-tai",
      name: "Hoa tai",
      image: "https://www.figma.com/api/mcp/asset/83b1346c-fa67-4b9f-82d0-d8a6622c2474"
    }
  ];
  materials = [
    { id: "vang-18k", label: "V\xE0ng 18K", tag: "L\u1EF1a ch\u1ECDn \u0111\u1EB7c tr\u01B0ng", color: "#d4af37", price: "15 tri\u1EC7u VN\u0110", priceVnd: 15e6 },
    { id: "vang-14k", label: "V\xE0ng 14K", tag: "Thanh l\u1ECBch c\xE2n b\u1EB1ng", color: "#e5c07b", price: "12 tri\u1EC7u VN\u0110", priceVnd: 12e6 },
    { id: "bach-kim", label: "B\u1EA1ch kim", tag: "S\u1EE9c m\u1EA1nh v\u0129nh c\u1EEDu", color: "#e5e4e2", price: "20 tri\u1EC7u VN\u0110", priceVnd: 2e7 },
    { id: "bac-925", label: "B\u1EA1c 925", tag: "C\u1ED5 \u0111i\u1EC3n hi\u1EC7n \u0111\u1EA1i", color: "#c0c0c0", price: "8 tri\u1EC7u VN\u0110", priceVnd: 8e6 }
  ];
  stones = [
    {
      id: "diamond",
      label: "Kim c\u01B0\u01A1ng",
      image: "https://www.figma.com/api/mcp/asset/67883825-e8c9-4cd2-b5f9-39299b8bf6c7",
      pricePerCarat: 1e7
    },
    {
      id: "ruby",
      label: "H\u1ED3ng ng\u1ECDc",
      image: "https://www.figma.com/api/mcp/asset/2294db08-47d6-4f95-9f9d-7e11bb50c2c3",
      pricePerCarat: 8e6
    },
    {
      id: "sapphire",
      label: "Lam ng\u1ECDc",
      image: "https://www.figma.com/api/mcp/asset/92ade0aa-43fe-4afa-bfdc-66c1468aa92c",
      pricePerCarat: 7e6
    },
    {
      id: "emerald",
      label: "Ng\u1ECDc l\u1EE5c b\u1EA3o",
      image: "https://www.figma.com/api/mcp/asset/c7b70169-ea45-4d68-ade1-1db78066391d",
      pricePerCarat: 6e6
    },
    {
      id: "none",
      label: "Kh\xF4ng \u0111\xE1",
      image: "https://www.figma.com/api/mcp/asset/429be43b-8e11-462f-8a03-2c9a7ba6f266",
      pricePerCarat: 0,
      muted: true
    }
  ];
  engraveGallery = [
    {
      src: "https://www.figma.com/api/mcp/asset/1366bf7e-90dc-405c-b9db-286001fa1621",
      alt: "G\xF3c nh\xECn ch\xEDnh"
    },
    {
      src: "https://www.figma.com/api/mcp/asset/a2c234ed-2b83-4413-8ff4-03942d6affec",
      alt: "G\xF3c nh\xECn 2"
    },
    {
      src: "https://www.figma.com/api/mcp/asset/185a999c-76c2-45b8-8b21-cbdc11b42896",
      alt: "G\xF3c nh\xECn 3"
    },
    {
      src: "https://www.figma.com/api/mcp/asset/7660327d-c0e3-424b-9688-3725d7b37077",
      alt: "G\xF3c nh\xECn 4"
    }
  ];
  paymentMethods = [
    { id: "bank-transfer", label: "Chuy\u1EC3n kho\u1EA3n ng\xE2n h\xE0ng" },
    { id: "e-wallet", label: "V\xED \u0111i\u1EC7n t\u1EED (MoMo/ZaloPay)" },
    { id: "credit-card", label: "Th\u1EBB t\xEDn d\u1EE5ng / Ghi n\u1EE3" }
  ];
  // ─── Step state ───────────────────────────────────────────────────────
  currentStep = signal(
    1,
    ...ngDevMode ? [{ debugName: "currentStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 5 has two sub-views: 1 = price analysis, 2 = checkout form
  checkoutSubStep = signal(
    1,
    ...ngDevMode ? [{ debugName: "checkoutSubStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 1
  selectedCategoryId = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedCategoryId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 2
  selectedMaterial = signal(
    this.materials[0],
    ...ngDevMode ? [{ debugName: "selectedMaterial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 3
  selectedStone = signal(
    this.stones[0],
    ...ngDevMode ? [{ debugName: "selectedStone" }] : (
      /* istanbul ignore next */
      []
    )
  );
  carat = signal(
    1,
    ...ngDevMode ? [{ debugName: "carat" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 4
  engraveText = signal(
    "",
    ...ngDevMode ? [{ debugName: "engraveText" }] : (
      /* istanbul ignore next */
      []
    )
  );
  engraveFont = signal(
    "serif-italic",
    ...ngDevMode ? [{ debugName: "engraveFont" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedThumbIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "selectedThumbIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Step 5
  selectedPaymentMethod = signal(
    "credit-card",
    ...ngDevMode ? [{ debugName: "selectedPaymentMethod" }] : (
      /* istanbul ignore next */
      []
    )
  );
  voucherCode = signal(
    "",
    ...ngDevMode ? [{ debugName: "voucherCode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shippingExpanded = signal(
    true,
    ...ngDevMode ? [{ debugName: "shippingExpanded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checkoutForm = new FormGroup({
    name: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl("", { nonNullable: true }),
    province: new FormControl("", { nonNullable: true }),
    ward: new FormControl("", { nonNullable: true }),
    address: new FormControl("", { nonNullable: true, validators: [Validators.required] })
  });
  // ─── Computed ─────────────────────────────────────────────────────────
  stonePrice = computed(
    () => this.selectedStone().id === "none" ? 0 : Math.round(this.selectedStone().pricePerCarat * this.carat()),
    ...ngDevMode ? [{ debugName: "stonePrice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  engraveFee = computed(
    () => {
      const extra = Math.max(0, this.engraveText().length - this.ENGRAVE_FREE_CHARS);
      return extra * this.ENGRAVE_FEE_PER_CHAR;
    },
    ...ngDevMode ? [{ debugName: "engraveFee" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalPrice = computed(
    () => this.MOUNT_FEE + this.selectedMaterial().priceVnd + this.stonePrice() + this.engraveFee() + this.CRAFT_FEE,
    ...ngDevMode ? [{ debugName: "totalPrice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  depositAmount = computed(
    () => Math.round(this.totalPrice() / 2),
    ...ngDevMode ? [{ debugName: "depositAmount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  orderItems = computed(
    () => {
      const items = [
        { name: this.selectedMaterial().label, subName: "D\xF2ng Di S\u1EA3n", price: this.selectedMaterial().priceVnd }
      ];
      if (this.selectedStone().id !== "none") {
        items.push({
          name: `${this.selectedStone().label} ${this.carat().toFixed(1)}ct`,
          price: this.stonePrice()
        });
      }
      items.push({ name: "Ph\xF4i Di S\u1EA3n", price: this.MOUNT_FEE });
      items.push({ name: "C\xF4ng ch\u1EBF t\xE1c th\u1EE7 c\xF4ng", price: this.CRAFT_FEE });
      if (this.engraveFee() > 0) {
        items.push({
          name: `Kh\u1EAFc ch\u1EEF (${this.engraveText().length} k\xFD t\u1EF1)`,
          price: this.engraveFee()
        });
      }
      return items;
    },
    ...ngDevMode ? [{ debugName: "orderItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  priceSummaryVisible = computed(
    () => this.currentStep() >= 2 && this.currentStep() < 5,
    ...ngDevMode ? [{ debugName: "priceSummaryVisible" }] : (
      /* istanbul ignore next */
      []
    )
  );
  priceSummaryAmount = computed(
    () => {
      if (this.currentStep() >= 3)
        return `${Math.round(this.totalPrice() / 1e6)} tri\u1EC7u`;
      return this.selectedMaterial().price.replace(" VN\u0110", "");
    },
    ...ngDevMode ? [{ debugName: "priceSummaryAmount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  priceSummaryDetail = computed(
    () => this.currentStep() >= 3 ? this.selectedStone().label : this.selectedMaterial().label,
    ...ngDevMode ? [{ debugName: "priceSummaryDetail" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentGalleryImage = computed(
    () => this.engraveGallery[this.selectedThumbIndex()],
    ...ngDevMode ? [{ debugName: "currentGalleryImage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  engraveCharCount = computed(
    () => this.engraveText().length,
    ...ngDevMode ? [{ debugName: "engraveCharCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // ─── Methods ──────────────────────────────────────────────────────────
  goToStep(n) {
    this.currentStep.set(n);
    this.checkoutSubStep.set(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  selectCategory(id) {
    this.selectedCategoryId.set(id);
    this.goToStep(2);
  }
  selectMaterial(material) {
    this.selectedMaterial.set(material);
  }
  selectStone(stone) {
    this.selectedStone.set(stone);
  }
  onCaratChange(event) {
    this.carat.set(parseFloat(event.target.value));
  }
  onEngraveInput(event) {
    this.engraveText.set(event.target.value);
  }
  selectFont(font) {
    this.engraveFont.set(font);
  }
  selectThumb(index) {
    this.selectedThumbIndex.set(index);
  }
  selectPaymentMethod(id) {
    this.selectedPaymentMethod.set(id);
  }
  goToCheckout() {
    this.checkoutSubStep.set(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  backFromCheckout() {
    this.checkoutSubStep.set(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  formatVnd(value) {
    return value.toLocaleString("vi-VN") + "\u20AB";
  }
  submitOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
  }
  applyVoucher() {
  }
  static \u0275fac = function StudioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudioComponent, selectors: [["app-studio"]], decls: 10, vars: 6, consts: [[1, "studio"], ["aria-label", "C\xE1c b\u01B0\u1EDBc t\u1EA1o trang s\u1EE9c", 1, "step-progress"], [1, "studio-card", "studio-card--wide"], [1, "studio-card", "studio-card--split"], ["aria-live", "polite", 1, "studio-price-summary"], [1, "step-progress__item", 3, "click"], [1, "step-progress__circle"], ["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "aria-hidden", "true"], [1, "step-progress__label"], [1, "step-progress__connector", 3, "step-progress__connector--done"], ["d", "M2 7l3.5 3.5L12 4", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "step-progress__connector"], [1, "studio-card__head"], [1, "studio-card__title"], [1, "studio-card__desc"], [1, "category-grid"], ["type", "button", 1, "category-card"], ["type", "button", 1, "category-card", 3, "click"], [1, "category-card__img-wrap"], ["loading", "lazy", 1, "category-card__img", 3, "src", "alt"], [1, "category-card__footer"], [1, "category-card__info"], [1, "category-card__eyebrow"], [1, "category-card__name"], [1, "category-card__cta"], [1, "studio-card__preview"], ["src", "https://www.figma.com/api/mcp/asset/644d2dc6-de4c-49c0-96b9-5f97e1095c9e", "alt", "Nh\u1EABn v\xE0ng Heritage", "loading", "eager", 1, "studio-card__preview-img"], [1, "studio-card__preview-foot"], [1, "studio-card__preview-label"], [1, "studio-card__preview-btns"], ["type", "button", "aria-label", "Ph\xF3ng to", 1, "studio-card__preview-btn"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.35-4.35"], ["x1", "11", "y1", "8", "x2", "11", "y2", "14"], ["x1", "8", "y1", "11", "x2", "14", "y2", "11"], ["type", "button", "aria-label", "Xoay", 1, "studio-card__preview-btn"], ["points", "23 4 23 10 17 10"], ["d", "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"], [1, "studio-card__options"], [1, "material-list"], ["type", "button", 1, "material-option", 3, "material-option--selected"], [1, "studio-card__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["type", "button", 1, "material-option", 3, "click"], [1, "material-option__swatch"], [1, "material-option__info"], [1, "material-option__name"], [1, "material-option__tag"], [1, "material-option__price"], ["src", "https://www.figma.com/api/mcp/asset/9668872f-01b4-4e57-9ebc-2b65b8ac1203", "alt", "Nh\u1EABn kim c\u01B0\u01A1ng Heritage", "loading", "eager", 1, "studio-card__preview-img"], [1, "studio-card__preview-name"], [1, "studio-card__preview-name-title"], [1, "studio-card__preview-name-desc"], [1, "studio-card__head", "studio-card__head--row"], ["type", "button", 1, "btn", "btn--primary", "btn--skip", 3, "click"], [1, "studio-section-header"], [1, "studio-section-label"], [1, "studio-section-chip"], [1, "stone-grid"], ["type", "button", 1, "stone-option", 3, "stone-option--selected", "stone-option--muted"], ["type", "button", 1, "stone-option", 3, "click"], ["loading", "lazy", 1, "stone-option__icon", 3, "src", "alt"], [1, "stone-option__label"], [1, "carat-control"], ["type", "range", "min", "0.5", "max", "3.0", "step", "0.1", "aria-label", "K\xEDch th\u01B0\u1EDBc \u0111\xE1 t\xEDnh b\u1EB1ng carat", 1, "carat-slider", 3, "input", "value"], [1, "carat-control__range-labels"], [1, "price-breakdown"], [1, "price-breakdown__row"], [1, "price-breakdown__divider"], [1, "price-breakdown__total"], [1, "engrave-gallery"], [1, "engrave-gallery__main"], ["loading", "eager", 1, "engrave-gallery__main-img", 3, "src", "alt"], [1, "engrave-gallery__overlay", 3, "engrave-gallery__overlay--serif"], [1, "engrave-gallery__thumbs"], ["type", "button", 1, "engrave-gallery__thumb", 3, "engrave-gallery__thumb--active"], [1, "engrave-input-wrap"], ["id", "engrave-input", "type", "text", "placeholder", "Nh\u1EADp t\u1EA1i \u0111\xE2y...", 1, "engrave-input", 3, "input", "value"], [1, "engrave-input-wrap__meta"], [1, "engrave-input-wrap__count"], [1, "engrave-input-wrap__free"], [1, "font-selector"], ["type", "button", 1, "font-selector__option", 3, "click"], [1, "engrave-fee-row"], [1, "engrave-fee-row__label"], [1, "engrave-fee-row__value"], [1, "engrave-gallery__overlay"], ["type", "button", 1, "engrave-gallery__thumb", 3, "click"], ["loading", "lazy", 3, "src", "alt"], [1, "studio-card", "studio-card--wide", 3, "formGroup"], ["src", "https://www.figma.com/api/mcp/asset/a1f97ec8-6265-4ed5-9229-df98077a79c5", "alt", "Trang s\u1EE9c t\xF9y ch\u1EC9nh c\u1EE7a b\u1EA1n", "loading", "eager", 1, "studio-card__preview-img"], [1, "order-card"], [1, "order-card__heading"], [1, "order-card__list"], [1, "order-card__item"], [1, "order-card__divider"], [1, "order-card__total"], [1, "order-card__actions"], ["type", "button", 1, "btn", "btn--primary", "btn--full", 3, "click"], ["type", "button", 1, "btn", "btn--secondary", "btn--full"], [1, "order-card__links"], ["type", "button", 1, "btn-link"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "width", "16", "height", "16"], ["d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"], ["points", "17 21 17 13 7 13 7 21"], ["points", "7 3 7 8 15 8"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], [1, "order-card__item-name"], [1, "order-card__item-sub"], [1, "order-card__item-price"], [1, "studio-card", "studio-card--wide", 3, "ngSubmit", "formGroup"], [1, "checkout-layout"], [1, "checkout-layout__main"], [1, "checkout-section"], [1, "checkout-section__header"], [1, "checkout-section__title"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "checkout-form-grid"], [1, "payment-methods"], ["type", "button", 1, "payment-method", 3, "payment-method--selected"], [1, "checkout-layout__aside"], [1, "checkout-summary"], [1, "checkout-summary__title"], [1, "checkout-summary__product"], ["src", "https://www.figma.com/api/mcp/asset/48641a6f-72f5-4524-8109-67072e259627", "alt", "S\u1EA3n ph\u1EA9m t\xF9y ch\u1EC9nh", "loading", "lazy", 1, "checkout-summary__product-img"], [1, "checkout-summary__product-info"], [1, "checkout-summary__product-name"], [1, "checkout-summary__product-config"], [1, "checkout-summary__product-price"], [1, "checkout-summary__divider"], [1, "checkout-summary__line"], [1, "checkout-summary__free"], [1, "checkout-summary__voucher-label"], [1, "voucher-row"], ["type", "text", "placeholder", "Nh\u1EADp m\xE3 \u01B0u \u0111\xE3i c\u1EE7a b\u1EA1n", "aria-label", "Nh\u1EADp m\xE3 voucher", 1, "voucher-row__input", 3, "input", "value"], ["type", "button", 1, "voucher-row__btn", 3, "click"], [1, "checkout-summary__total"], [1, "checkout-summary__deposit-block"], [1, "checkout-summary__deposit-row"], [1, "checkout-summary__deposit-row", "checkout-summary__deposit-row--remain"], [1, "checkout-summary__legal"], ["type", "submit", 1, "btn", "btn--primary", "btn--full", "checkout-summary__submit"], [1, "studio-card__actions", "studio-card__actions--bottom"], [1, "form-field"], ["for", "checkout-name", 1, "form-field__label"], ["id", "checkout-name", "type", "text", "formControlName", "name", 1, "form-field__input"], [1, "form-field__error"], ["for", "checkout-phone", 1, "form-field__label"], ["id", "checkout-phone", "type", "tel", "formControlName", "phone", 1, "form-field__input"], [1, "form-field", "form-field--full"], ["for", "checkout-email", 1, "form-field__label"], ["id", "checkout-email", "type", "email", "formControlName", "email", 1, "form-field__input"], ["for", "checkout-province", 1, "form-field__label"], ["id", "checkout-province", "formControlName", "province", 1, "form-field__input", "form-field__select"], ["value", ""], ["value", "hcm"], ["value", "hn"], ["value", "dn"], ["for", "checkout-ward", 1, "form-field__label"], ["id", "checkout-ward", "formControlName", "ward", 1, "form-field__input", "form-field__select"], ["for", "checkout-address", 1, "form-field__label"], ["id", "checkout-address", "type", "text", "formControlName", "address", 1, "form-field__input"], ["type", "button", 1, "payment-method", 3, "click"], [1, "payment-method__radio"], [1, "payment-method__radio-dot"], [1, "payment-method__label"], [1, "studio-price-summary__label"], [1, "studio-price-summary__amount"], [1, "studio-price-summary__detail"]], template: function StudioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "nav", 1);
      \u0275\u0275repeaterCreate(2, StudioComponent_For_3_Template, 7, 10, null, null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, StudioComponent_Conditional_4_Template, 9, 0, "div", 2);
      \u0275\u0275conditionalCreate(5, StudioComponent_Conditional_5_Template, 31, 0, "div", 3);
      \u0275\u0275conditionalCreate(6, StudioComponent_Conditional_6_Template, 43, 2, "div", 3);
      \u0275\u0275conditionalCreate(7, StudioComponent_Conditional_7_Template, 45, 15, "div", 3);
      \u0275\u0275conditionalCreate(8, StudioComponent_Conditional_8_Template, 2, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, StudioComponent_Conditional_9_Template, 7, 2, "div", 4);
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
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep() === 5 ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.priceSummaryVisible() ? 9 : -1);
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.studio[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px) 120px;\n  font-family: var(--font-sans);\n}\n.studio__header[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px 0 40px;\n}\n.studio__header-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 3px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  margin: 0 0 16px;\n}\n.studio__header-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 52px;\n  font-weight: 500;\n  letter-spacing: -0.5px;\n  line-height: 1.15;\n  color: var(--color-black);\n  margin: 0 0 16px;\n}\n.studio__header-sub[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  line-height: 1.7;\n  color: var(--color-muted);\n  max-width: 560px;\n  margin: 0 auto;\n}\n.step-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 0 48px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.step-progress__item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  position: relative;\n  z-index: 1;\n}\n.step-progress__circle[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  background: var(--color-white);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-muted);\n  transition:\n    background 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n}\n.step-progress__item--active[_ngcontent-%COMP%]   .step-progress__circle[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n  font-weight: 700;\n}\n.step-progress__item--done[_ngcontent-%COMP%]   .step-progress__circle[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.step-progress__label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  white-space: nowrap;\n}\n.step-progress__item--active[_ngcontent-%COMP%]   .step-progress__label[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.step-progress__connector[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 160px;\n  height: 1px;\n  background: var(--color-border);\n  margin-bottom: 22px;\n  transition: background 0.2s;\n}\n.step-progress__connector--done[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n}\n.studio-card[_ngcontent-%COMP%] {\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  margin-bottom: 32px;\n}\n.studio-card--wide[_ngcontent-%COMP%] {\n  padding: 48px;\n}\n.studio-card--split[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0;\n}\n.studio-card--split[_ngcontent-%COMP%]    > .studio-card__preview[_ngcontent-%COMP%] {\n  border-right: 1px solid var(--color-border);\n}\n.studio-card__head[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.studio-card__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 36px;\n  font-weight: 400;\n  line-height: 1.25;\n  color: var(--color-black);\n  margin: 0 0 10px;\n}\n.studio-card__desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--color-muted);\n  margin: 0;\n}\n.studio-card__preview[_ngcontent-%COMP%] {\n  position: relative;\n  background: #f5f0f2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 480px;\n  overflow: hidden;\n}\n.studio-card__preview-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  display: block;\n  position: absolute;\n  inset: 0;\n}\n.studio-card__preview-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 24px;\n  left: 24px;\n  background: rgba(0, 0, 0, 0.7);\n  color: var(--color-white);\n  padding: 10px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.studio-card__preview-badge-tag[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 400;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  opacity: 0.75;\n}\n.studio-card__options[_ngcontent-%COMP%] {\n  padding: 48px;\n  display: flex;\n  flex-direction: column;\n}\n.studio-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-top: auto;\n  padding-top: 32px;\n  border-top: 1px solid var(--color-border);\n}\n.studio-card__actions--bottom[_ngcontent-%COMP%] {\n  padding: 24px 48px;\n  border-top: 1px solid var(--color-border);\n  margin-top: 0;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 14px 32px;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  cursor: pointer;\n  border: none;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    opacity 0.2s;\n  white-space: nowrap;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: var(--color-black);\n  color: var(--color-white);\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.btn--secondary[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--color-black);\n  border: 1px solid var(--color-black);\n}\n.btn--secondary[_ngcontent-%COMP%]:hover {\n  background: var(--color-bg-card);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--color-muted);\n  border: 1px solid var(--color-border);\n}\n.btn--ghost[_ngcontent-%COMP%]:hover {\n  border-color: #999;\n  color: var(--color-dark);\n}\n.btn--full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  cursor: pointer;\n  text-decoration: underline;\n  transition: color 0.15s;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-dark);\n}\n.category-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n.category-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  padding: 0;\n  overflow: hidden;\n  transition: box-shadow 0.2s, border-color 0.2s;\n}\n.category-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);\n  border-color: #bbb;\n}\n.category-card__img-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1 / 1;\n  overflow: hidden;\n  background: #f5f0f2;\n  flex-shrink: 0;\n}\n.category-card__img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  display: block;\n  transition: transform 0.4s ease;\n}\n.category-card[_ngcontent-%COMP%]:hover   .category-card__img[_ngcontent-%COMP%] {\n  transform: scale(1.04);\n}\n.category-card__footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 16px 20px;\n  border-top: 1px solid var(--color-border);\n}\n.category-card__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.category-card__eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  letter-spacing: 1px;\n  color: var(--color-muted);\n}\n.category-card__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  font-weight: 400;\n  color: var(--color-black);\n}\n.category-card__cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 20px;\n  background: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  flex-shrink: 0;\n  transition: background 0.2s;\n}\n.category-card[_ngcontent-%COMP%]:hover   .category-card__cta[_ngcontent-%COMP%] {\n  background: #333;\n}\n.material-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 32px;\n}\n.material-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  transition: border-color 0.15s;\n}\n.material-option[_ngcontent-%COMP%]:hover {\n  border-color: #aaa;\n}\n.material-option--selected[_ngcontent-%COMP%] {\n  border: 2px solid var(--color-black);\n}\n.material-option__swatch[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border: 1px solid #ccc;\n  flex-shrink: 0;\n  display: block;\n}\n.material-option__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n}\n.material-option__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  color: var(--color-black);\n  line-height: 1.3;\n}\n.material-option__tag[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  color: var(--color-muted);\n  letter-spacing: 0.5px;\n}\n.material-option__price[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.stone-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 8px;\n  margin-bottom: 28px;\n}\n.stone-option[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  padding: 14px 6px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.stone-option[_ngcontent-%COMP%]:hover {\n  border-color: #999;\n}\n.stone-option--selected[_ngcontent-%COMP%] {\n  background: var(--color-black);\n  border-color: var(--color-black);\n}\n.stone-option--selected[_ngcontent-%COMP%]   .stone-option__label[_ngcontent-%COMP%] {\n  color: var(--color-white);\n}\n.stone-option--selected[_ngcontent-%COMP%]   .stone-option__icon[_ngcontent-%COMP%] {\n  filter: invert(1);\n}\n.stone-option--muted[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.stone-option__icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  object-fit: contain;\n  display: block;\n}\n.stone-option__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--color-black);\n  text-align: center;\n}\n.carat-control[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.carat-control__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.carat-control__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.carat-control__value[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-primary);\n}\n.carat-slider[_ngcontent-%COMP%] {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 2px;\n  background: var(--color-border);\n  outline: none;\n  cursor: pointer;\n  display: block;\n}\n.carat-slider[_ngcontent-%COMP%]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(196, 96, 126, 0.35);\n  transition: transform 0.15s;\n}\n.carat-slider[_ngcontent-%COMP%]::-moz-range-thumb {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  border: none;\n  cursor: pointer;\n}\n.carat-slider[_ngcontent-%COMP%]::-webkit-slider-thumb:hover {\n  transform: scale(1.15);\n}\n.carat-control__range-labels[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-family: var(--font-sans);\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-top: 6px;\n}\n.stone-details[_ngcontent-%COMP%] {\n  background: #faf5f7;\n  border: 1px solid var(--color-border);\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.stone-details__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.stone-details__key[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n  letter-spacing: 0.5px;\n}\n.stone-details__val[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n}\n.stone-details__val--accent[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.engrave-gallery[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: #f5f0f2;\n}\n.engrave-gallery__main[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 1 / 1;\n  overflow: hidden;\n  background: var(--color-bg-card);\n  flex: 1;\n}\n.engrave-gallery__main-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  display: block;\n}\n.engrave-gallery__overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  padding-bottom: 40px;\n  font-size: 22px;\n  color: var(--color-white);\n  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);\n  font-family: var(--font-sans);\n  pointer-events: none;\n  letter-spacing: 2px;\n}\n.engrave-gallery__overlay--serif[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-style: italic;\n  font-size: 26px;\n}\n.engrave-gallery__thumbs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0;\n  border-top: 1px solid var(--color-border);\n}\n.engrave-gallery__thumb[_ngcontent-%COMP%] {\n  aspect-ratio: 1 / 1;\n  border: none;\n  border-right: 1px solid var(--color-border);\n  background: var(--color-bg-card);\n  overflow: hidden;\n  cursor: pointer;\n  padding: 0;\n  opacity: 0.5;\n  transition: opacity 0.15s;\n}\n.engrave-gallery__thumb[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n.engrave-gallery__thumb[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.engrave-gallery__thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.engrave-gallery__thumb--active[_ngcontent-%COMP%] {\n  opacity: 1;\n  box-shadow: inset 0 0 0 2px var(--color-black);\n}\n.font-selector[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 28px;\n}\n.font-selector__option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    color 0.15s;\n}\n.font-selector__option[_ngcontent-%COMP%]:hover {\n  border-color: #aaa;\n}\n.font-selector__option--active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.engrave-input-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 16px;\n}\n.engrave-input-wrap__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.engrave-input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  padding: 16px;\n  font-family: var(--font-serif);\n  font-size: 22px;\n  color: var(--color-dark);\n  background: var(--color-white);\n  outline: none;\n  transition: box-shadow 0.15s;\n}\n.engrave-input[_ngcontent-%COMP%]::placeholder {\n  color: #ccc;\n}\n.engrave-input[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 2px rgba(196, 96, 126, 0.20);\n}\n.engrave-input-wrap__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.engrave-input-wrap__count[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  letter-spacing: 0.5px;\n}\n.engrave-input-wrap__count--warn[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.engrave-input-wrap__fee[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-primary);\n  letter-spacing: 0.5px;\n}\n.engrave-note[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  margin: 0 0 24px;\n  padding: 12px 16px;\n  background: #faf5f7;\n  border-left: 3px solid var(--color-primary);\n}\n.order-card[_ngcontent-%COMP%] {\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.order-card__list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n}\n.order-card__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 0;\n  border-bottom: 1px solid rgba(196, 199, 199, 0.35);\n}\n.order-card__item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.order-card__item-name[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-muted);\n}\n.order-card__item-sub[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.order-card__item-price[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n  white-space: nowrap;\n  flex-shrink: 0;\n  padding-left: 16px;\n}\n.order-card__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-black);\n  margin: 16px 0;\n}\n.order-card__total[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.order-card__total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.order-card__total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  color: #9a3f5c;\n  font-weight: 400;\n}\n.order-card__deposit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  padding: 10px 16px;\n  background: #fdf5f7;\n  margin-bottom: 4px;\n}\n.order-card__deposit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n}\n.order-card__deposit-amount[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  color: var(--color-primary);\n  font-weight: 400;\n}\n.order-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.order-card__links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 32px;\n  padding-top: 8px;\n}\n.checkout-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 48px;\n  align-items: start;\n  padding: 0 0 32px;\n}\n.checkout-layout__main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.checkout-section__title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.checkout-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-field--full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.form-field__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.form-field__input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  padding: 13px 16px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  background: var(--color-white);\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.form-field__input[_ngcontent-%COMP%]::placeholder {\n  color: #bbb;\n}\n.form-field__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 2px rgba(196, 96, 126, 0.15);\n}\n.form-field__error[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: #c0392b;\n}\n.payment-methods[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.payment-method[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  transition: border-color 0.15s;\n}\n.payment-method[_ngcontent-%COMP%]:hover {\n  border-color: #aaa;\n}\n.payment-method--selected[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  background: #fdf5f7;\n}\n.payment-method__radio[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: border-color 0.15s;\n}\n.payment-method--selected[_ngcontent-%COMP%]   .payment-method__radio[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n}\n.payment-method__radio-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  display: block;\n}\n.payment-method__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.checkout-layout__aside[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 24px;\n}\n.checkout-summary[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n}\n.checkout-summary__title[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n}\n.checkout-summary__product[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.checkout-summary__product-img[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  object-fit: cover;\n  border: 1px solid var(--color-border);\n  flex-shrink: 0;\n  display: block;\n}\n.checkout-summary__product-name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n  margin: 0 0 4px;\n}\n.checkout-summary__product-config[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  margin: 0;\n  letter-spacing: 0.3px;\n}\n.checkout-summary__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n  margin: 16px 0;\n}\n.checkout-summary__list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.checkout-summary__line[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.checkout-summary__line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--color-dark);\n  font-weight: 500;\n}\n.voucher-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.voucher-row__input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid var(--color-border);\n  padding: 10px 14px;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  outline: none;\n  background: var(--color-white);\n}\n.voucher-row__input[_ngcontent-%COMP%]::placeholder {\n  color: #ccc;\n}\n.voucher-row__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n}\n.voucher-row__btn[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  background: var(--color-black);\n  color: var(--color-white);\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background 0.2s;\n}\n.voucher-row__btn[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.checkout-summary__total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-bottom: 8px;\n}\n.checkout-summary__total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.checkout-summary__total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  color: var(--color-black);\n  font-weight: 400;\n}\n.checkout-summary__deposit[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  background: #fdf5f7;\n  padding: 10px 14px;\n  margin-bottom: 20px;\n}\n.checkout-summary__deposit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n}\n.checkout-summary__deposit[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  color: var(--color-primary);\n  font-weight: 400;\n}\n.checkout-summary__submit[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.checkout-summary__note[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  text-align: center;\n  margin: 0;\n}\n.studio-price-summary[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  right: 24px;\n  width: 220px;\n  background: var(--color-primary);\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  z-index: 998;\n  box-shadow: 0 -4px 24px rgba(196, 96, 126, 0.3);\n}\n.studio-price-summary__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.75);\n  margin: 0;\n}\n.studio-price-summary__amount[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--color-white);\n  line-height: 1.1;\n  margin: 0;\n}\n.studio-price-summary__detail[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  color: rgba(255, 255, 255, 0.7);\n  margin: 0;\n}\n.studio-card__preview-foot[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 16px;\n  background: rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.studio-card__preview-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.9);\n}\n.studio-card__preview-btns[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.studio-card__preview-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  background: rgba(255, 255, 255, 0.15);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.studio-card__preview-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.25);\n}\n.studio-card__preview-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  stroke: white;\n  fill: none;\n}\n.studio-card__preview-name[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 48px;\n  left: 0;\n  right: 0;\n  padding: 40px 24px 16px;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.72) 0%,\n      transparent 100%);\n  color: var(--color-white);\n}\n.studio-card__preview-name-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 6px;\n}\n.studio-card__preview-name-desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  line-height: 1.6;\n  opacity: 0.85;\n}\n.studio-card__head--row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n.btn--skip[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  font-size: 11px;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.studio-section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n  margin-top: 8px;\n}\n.studio-section-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.studio-section-chip[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.price-breakdown[_ngcontent-%COMP%] {\n  background: #faf5f7;\n  border: 1px solid var(--color-border);\n  padding: 16px 20px;\n  margin-bottom: 16px;\n}\n.price-breakdown__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.price-breakdown__row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--color-dark);\n  font-weight: 500;\n  white-space: nowrap;\n  padding-left: 12px;\n}\n.price-breakdown__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--color-border);\n  margin: 4px 0 8px;\n}\n.price-breakdown__total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n}\n.price-breakdown__total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.price-breakdown__total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  color: #9a3f5c;\n  font-weight: 400;\n}\n.engrave-input-wrap__free[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.engrave-fee-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 0;\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n  margin-bottom: 16px;\n}\n.engrave-fee-row__label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.engrave-fee-row__value[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  color: var(--color-black);\n}\n.order-card__heading[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.order-card__links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 40px;\n  padding: 20px 0 8px;\n}\n.order-card__links[_ngcontent-%COMP%]   .btn-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.checkout-section__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.checkout-section__header[_ngcontent-%COMP%]   .checkout-section__title[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  padding-bottom: 0;\n  border-bottom: none;\n}\n.checkout-section__header[_ngcontent-%COMP%]   .btn--sm[_ngcontent-%COMP%] {\n  min-width: 160px;\n  text-align: center;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-size: 10px;\n}\n.form-field__select[_ngcontent-%COMP%] {\n  cursor: pointer;\n  appearance: auto;\n  -webkit-appearance: auto;\n  position: relative;\n}\n.checkout-summary__line[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 5px 0;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.checkout-summary__line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--color-dark);\n  font-weight: 500;\n}\n.checkout-summary__free[_ngcontent-%COMP%] {\n  color: var(--color-primary) !important;\n  font-weight: 600;\n  font-size: 11px;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n}\n.checkout-summary__voucher-label[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 8px;\n}\n.checkout-summary__deposit-block[_ngcontent-%COMP%] {\n  background: #fdf5f7;\n  padding: 10px 14px;\n  margin-bottom: 10px;\n}\n.checkout-summary__deposit-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 4px 0;\n}\n.checkout-summary__deposit-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n}\n.checkout-summary__deposit-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-primary);\n  font-weight: 400;\n}\n.checkout-summary__deposit-row--remain[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-dark);\n}\n.checkout-summary__legal[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  color: var(--color-muted);\n  line-height: 1.5;\n  text-align: center;\n  margin-bottom: 12px;\n}\n.checkout-summary__product-price[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  margin: 2px 0 0;\n}\n@media (max-width: 1024px) {\n  .studio[_ngcontent-%COMP%] {\n    padding: 0 40px 100px;\n  }\n  .studio-card--split[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .studio-card--split[_ngcontent-%COMP%]    > .studio-card__preview[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid var(--color-border);\n    min-height: 320px;\n  }\n  .checkout-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .checkout-layout__aside[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n@media (max-width: 768px) {\n  .studio[_ngcontent-%COMP%] {\n    padding: 0 16px 80px;\n  }\n  .studio-card--wide[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .studio-card__options[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .studio-card__head--row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .category-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .step-progress[_ngcontent-%COMP%] {\n    padding: 16px 0 28px;\n  }\n  .step-progress__label[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .step-progress__connector[_ngcontent-%COMP%] {\n    max-width: 60px;\n  }\n  .step-progress__circle[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n    font-size: 14px;\n  }\n  .stone-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .checkout-form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .checkout-form-grid[_ngcontent-%COMP%]   .form-field--full[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n  .studio-price-summary[_ngcontent-%COMP%] {\n    width: 180px;\n    right: 12px;\n    padding: 12px 16px;\n  }\n  .studio-price-summary__amount[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n}\n/*# sourceMappingURL=studio.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudioComponent, [{
    type: Component,
    args: [{ selector: "app-studio", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule], template: `<section class="studio">\r
\r
  <!-- \u2500\u2500 Step Progress \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\r
  <nav class="step-progress" aria-label="C\xE1c b\u01B0\u1EDBc t\u1EA1o trang s\u1EE9c">\r
    @for (step of steps; track step.n) {\r
      <div\r
        class="step-progress__item"\r
        [class.step-progress__item--active]="currentStep() === step.n"\r
        [class.step-progress__item--done]="currentStep() > step.n"\r
        (click)="currentStep() > step.n && goToStep(step.n)"\r
        [style.cursor]="currentStep() > step.n ? 'pointer' : 'default'"\r
        [attr.aria-current]="currentStep() === step.n ? 'step' : null"\r
      >\r
        <span class="step-progress__circle">\r
          @if (currentStep() > step.n) {\r
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">\r
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
       STEP 1 \u2014 Ch\u1ECDn ph\xF4i\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 1) {\r
    <div class="studio-card studio-card--wide">\r
      <div class="studio-card__head">\r
        <h2 class="studio-card__title">Ch\u1ECDn ph\xF4i s\u1EA3n ph\u1EA9m</h2>\r
        <p class="studio-card__desc">B\u1EAFt \u0111\u1EA7u h\xE0nh tr\xECnh t\u1EA1o n\xEAn ki\u1EC7t t\xE1c c\u1EE7a ri\xEAng b\u1EA1n.</p>\r
      </div>\r
\r
      <div class="category-grid">\r
        @for (cat of categories; track cat.id) {\r
          <button class="category-card" (click)="selectCategory(cat.id)" type="button">\r
            <div class="category-card__img-wrap">\r
              <img class="category-card__img" [src]="cat.image" [alt]="cat.name" loading="lazy" />\r
            </div>\r
            <div class="category-card__footer">\r
              <div class="category-card__info">\r
                <span class="category-card__eyebrow">Danh m\u1EE5c</span>\r
                <span class="category-card__name">{{ cat.name }}</span>\r
              </div>\r
              <span class="category-card__cta">CH\u1ECCN</span>\r
            </div>\r
          </button>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 2 \u2014 Ch\u1ECDn ch\u1EA5t li\u1EC7u\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 2) {\r
    <div class="studio-card studio-card--split">\r
\r
      <div class="studio-card__preview">\r
        <img\r
          src="https://www.figma.com/api/mcp/asset/644d2dc6-de4c-49c0-96b9-5f97e1095c9e"\r
          alt="Nh\u1EABn v\xE0ng Heritage"\r
          class="studio-card__preview-img"\r
          loading="eager"\r
        />\r
        <div class="studio-card__preview-foot">\r
          <span class="studio-card__preview-label">G\xF3c nh\xECn 01</span>\r
          <div class="studio-card__preview-btns">\r
            <button class="studio-card__preview-btn" type="button" aria-label="Ph\xF3ng to">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>\r
                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>\r
              </svg>\r
            </button>\r
            <button class="studio-card__preview-btn" type="button" aria-label="Xoay">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <polyline points="23 4 23 10 17 10"/>\r
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>\r
              </svg>\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="studio-card__options">\r
        <div class="studio-card__head">\r
          <h2 class="studio-card__title">Ch\u1ECDn ch\u1EA5t li\u1EC7u</h2>\r
          <p class="studio-card__desc">H\xE3y ch\u1ECDn lo\u1EA1i kim lo\u1EA1i qu\xFD cho ki\u1EC7t t\xE1c c\u1EE7a b\u1EA1n. M\u1ED7i ch\u1EA5t li\u1EC7u mang m\u1ED9t c\xE2u chuy\u1EC7n v\xE0 \u0111\u1ED9 b\u1EC1n ri\xEAng bi\u1EC7t.</p>\r
        </div>\r
\r
        <div class="material-list">\r
          @for (mat of materials; track mat.id) {\r
            <button\r
              class="material-option"\r
              [class.material-option--selected]="selectedMaterial().id === mat.id"\r
              (click)="selectMaterial(mat)"\r
              type="button"\r
            >\r
              <span class="material-option__swatch" [style.background]="mat.color"></span>\r
              <span class="material-option__info">\r
                <span class="material-option__name">{{ mat.label }}</span>\r
                <span class="material-option__tag">{{ mat.tag }}</span>\r
              </span>\r
              <span class="material-option__price">{{ mat.price }}</span>\r
            </button>\r
          }\r
        </div>\r
\r
        <div class="studio-card__actions">\r
          <button class="btn btn--ghost" (click)="goToStep(1)" type="button">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
          <button class="btn btn--primary" (click)="goToStep(3)" type="button">TI\u1EBEP THEO</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 3 \u2014 T\xF9y bi\u1EBFn \u0111\xE1\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 3) {\r
    <div class="studio-card studio-card--split">\r
\r
      <div class="studio-card__preview">\r
        <img\r
          src="https://www.figma.com/api/mcp/asset/9668872f-01b4-4e57-9ebc-2b65b8ac1203"\r
          alt="Nh\u1EABn kim c\u01B0\u01A1ng Heritage"\r
          class="studio-card__preview-img"\r
          loading="eager"\r
        />\r
        <div class="studio-card__preview-name">\r
          <p class="studio-card__preview-name-title">Ph\xF4i Solitaire Heritage</p>\r
          <p class="studio-card__preview-name-desc">Thi\u1EBFt k\u1EBF \u0111\u1EB7c tr\u01B0ng ch\xFAng t\xF4i \u0111\u01B0\u1EE3c ch\u1EBF t\xE1c ch\xEDnh x\xE1c \u0111\u1EC3 l\xE0m t\u0103ng \u0111\u1ED9 s\xE1ng v\xE0 t\xF4n vinh v\u1EBB \u0111\u1EB9p t\u1EF1 nhi\xEAn c\u1EE7a vi\xEAn \u0111\xE1 trung t\xE2m m\xE0 b\u1EA1n \u0111\xE3 ch\u1ECDn.</p>\r
        </div>\r
        <div class="studio-card__preview-foot">\r
          <div class="studio-card__preview-btns">\r
            <button class="studio-card__preview-btn" type="button" aria-label="Ph\xF3ng to">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>\r
                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>\r
              </svg>\r
            </button>\r
            <button class="studio-card__preview-btn" type="button" aria-label="Xoay">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <polyline points="23 4 23 10 17 10"/>\r
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>\r
              </svg>\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="studio-card__options">\r
        <div class="studio-card__head studio-card__head--row">\r
          <div>\r
            <h2 class="studio-card__title">T\xF9y bi\u1EBFn \u0111\xE1</h2>\r
            <p class="studio-card__desc">H\xE3y ch\u1ECDn lo\u1EA1i ph\u1EE5 ki\u1EC7n ph\xF9 h\u1EE3p v\u1EDBi thi\u1EBFt k\u1EBF c\u1EE7a b\u1EA1n.</p>\r
          </div>\r
          <button class="btn btn--primary btn--skip" (click)="goToStep(4)" type="button">B\u1ECE QUA</button>\r
        </div>\r
\r
        <div class="studio-section-header">\r
          <span class="studio-section-label">01. CH\u1ECCN LO\u1EA0I \u0110\xC1</span>\r
          <span class="studio-section-chip">{{ selectedStone().label }}</span>\r
        </div>\r
\r
        <div class="stone-grid">\r
          @for (stone of stones; track stone.id) {\r
            <button\r
              class="stone-option"\r
              [class.stone-option--selected]="selectedStone().id === stone.id"\r
              [class.stone-option--muted]="stone.muted"\r
              (click)="selectStone(stone)"\r
              type="button"\r
            >\r
              <img class="stone-option__icon" [src]="stone.image" [alt]="stone.label" loading="lazy" />\r
              <span class="stone-option__label">{{ stone.label }}</span>\r
            </button>\r
          }\r
        </div>\r
\r
        @if (selectedStone().id !== 'none') {\r
          <div class="studio-section-header">\r
            <span class="studio-section-label">02. TR\u1ECCNG L\u01AF\u1EE2NG</span>\r
            <span class="studio-section-chip">{{ carat() }} carat</span>\r
          </div>\r
\r
          <div class="carat-control">\r
            <input\r
              class="carat-slider"\r
              type="range"\r
              min="0.5"\r
              max="3.0"\r
              step="0.1"\r
              [value]="carat()"\r
              (input)="onCaratChange($event)"\r
              aria-label="K\xEDch th\u01B0\u1EDBc \u0111\xE1 t\xEDnh b\u1EB1ng carat"\r
            />\r
            <div class="carat-control__range-labels">\r
              <span>0.5ct</span>\r
              <span>1ct</span>\r
              <span>5.0ct</span>\r
              <span>6.0ct</span>\r
            </div>\r
          </div>\r
\r
          <div class="price-breakdown">\r
            <div class="price-breakdown__row">\r
              <span>Ph\xF4i Di S\u1EA3n</span>\r
              <span>{{ formatVnd(MOUNT_FEE) }}</span>\r
            </div>\r
            <div class="price-breakdown__row">\r
              <span>{{ selectedMaterial().label }}</span>\r
              <span>{{ formatVnd(selectedMaterial().priceVnd) }}</span>\r
            </div>\r
            <div class="price-breakdown__row">\r
              <span>{{ selectedStone().label }} ({{ carat() }}ct)</span>\r
              <span>{{ formatVnd(stonePrice()) }}</span>\r
            </div>\r
            <div class="price-breakdown__divider"></div>\r
            <div class="price-breakdown__total">\r
              <span>T\u1ED4NG GI\xC1 TR\u1ECA</span>\r
              <strong>{{ formatVnd(MOUNT_FEE + selectedMaterial().priceVnd + stonePrice()) }}</strong>\r
            </div>\r
          </div>\r
        }\r
\r
        <div class="studio-card__actions">\r
          <button class="btn btn--ghost" (click)="goToStep(2)" type="button">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
          <button class="btn btn--primary" (click)="goToStep(4)" type="button">X\xC1C NH\u1EACN THI\u1EBET K\u1EBE</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 4 \u2014 Kh\u1EAFc ch\u1EEF\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 4) {\r
    <div class="studio-card studio-card--split">\r
\r
      <div class="engrave-gallery">\r
        <div class="engrave-gallery__main">\r
          <img\r
            [src]="currentGalleryImage().src"\r
            [alt]="currentGalleryImage().alt"\r
            class="engrave-gallery__main-img"\r
            loading="eager"\r
          />\r
          @if (engraveText()) {\r
            <div\r
              class="engrave-gallery__overlay"\r
              [class.engrave-gallery__overlay--serif]="engraveFont() === 'serif-italic'"\r
            >\r
              {{ engraveText() }}\r
            </div>\r
          }\r
        </div>\r
        <div class="engrave-gallery__thumbs">\r
          @for (thumb of engraveGallery; track thumb.src; let i = $index) {\r
            <button\r
              class="engrave-gallery__thumb"\r
              [class.engrave-gallery__thumb--active]="selectedThumbIndex() === i"\r
              (click)="selectThumb(i)"\r
              type="button"\r
            >\r
              <img [src]="thumb.src" [alt]="thumb.alt" loading="lazy" />\r
            </button>\r
          }\r
        </div>\r
      </div>\r
\r
      <div class="studio-card__options">\r
        <div class="studio-card__head studio-card__head--row">\r
          <div>\r
            <h2 class="studio-card__title">T\xF9y ch\u1ECDn kh\u1EAFc ch\u1EEF</h2>\r
            <p class="studio-card__desc">C\xF4ng ngh\u1EC7 kh\u1EAFc laser ch\xEDnh x\xE1c gi\xFAp l\u01B0u gi\u1EEF d\u1EA5u \u1EA5n \u1EA5y b\u1EC1n v\u1EEFng theo th\u1EDDi gian.</p>\r
          </div>\r
          <button class="btn btn--primary btn--skip" (click)="goToStep(5)" type="button">B\u1ECE QUA</button>\r
        </div>\r
\r
        <div class="studio-section-header">\r
          <span class="studio-section-label">01. N\u1ED8I DUNG KH\u1EAEC CH\u1EEE</span>\r
        </div>\r
\r
        <div class="engrave-input-wrap">\r
          <input\r
            id="engrave-input"\r
            class="engrave-input"\r
            type="text"\r
            placeholder="Nh\u1EADp t\u1EA1i \u0111\xE2y..."\r
            [value]="engraveText()"\r
            (input)="onEngraveInput($event)"\r
            [attr.maxlength]="MAX_ENGRAVE_CHARS"\r
          />\r
          <div class="engrave-input-wrap__meta">\r
            <span\r
              class="engrave-input-wrap__count"\r
              [class.engrave-input-wrap__count--warn]="engraveCharCount() > ENGRAVE_FREE_CHARS"\r
            >\r
              {{ engraveCharCount() }} / {{ MAX_ENGRAVE_CHARS }} K\xDD T\u1EF0\r
            </span>\r
            <span class="engrave-input-wrap__free">MI\u1EC4N PH\xCD {{ ENGRAVE_FREE_CHARS }} K\xDD T\u1EF0</span>\r
          </div>\r
        </div>\r
\r
        <div class="studio-section-header">\r
          <span class="studio-section-label">02. CH\u1ECCN FONT CH\u1EEE</span>\r
        </div>\r
\r
        <div class="font-selector">\r
          <button\r
            class="font-selector__option"\r
            [class.font-selector__option--active]="engraveFont() === 'serif-italic'"\r
            (click)="selectFont('serif-italic')"\r
            type="button"\r
          >\r
            SERIF ITALIC\r
          </button>\r
          <button\r
            class="font-selector__option"\r
            [class.font-selector__option--active]="engraveFont() === 'classic-sans'"\r
            (click)="selectFont('classic-sans')"\r
            type="button"\r
          >\r
            CLASSIC SANS\r
          </button>\r
        </div>\r
\r
        <div class="engrave-fee-row">\r
          <span class="engrave-fee-row__label">PH\xCD TR\u1EA2 TH\xCAM:</span>\r
          <span class="engrave-fee-row__value">{{ engraveFee() > 0 ? formatVnd(engraveFee()) : '0\u20AB' }}</span>\r
        </div>\r
\r
        <div class="studio-card__actions">\r
          <button class="btn btn--ghost" (click)="goToStep(3)" type="button">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
          <button class="btn btn--primary" (click)="goToStep(5)" type="button">X\xC1C NH\u1EACN THI\u1EBET K\u1EBE</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
       STEP 5 \u2014 X\xE1c nh\u1EADn & Thanh to\xE1n\r
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  @if (currentStep() === 5) {\r
\r
    <!-- Sub-view 1: Ph\xE2n t\xEDch gi\xE1 + CTA -->\r
    @if (checkoutSubStep() === 1) {\r
      <div class="studio-card studio-card--split">\r
\r
        <div class="studio-card__preview">\r
          <img\r
            src="https://www.figma.com/api/mcp/asset/a1f97ec8-6265-4ed5-9229-df98077a79c5"\r
            alt="Trang s\u1EE9c t\xF9y ch\u1EC9nh c\u1EE7a b\u1EA1n"\r
            class="studio-card__preview-img"\r
            loading="eager"\r
          />\r
        </div>\r
\r
        <div class="studio-card__options">\r
          <div class="studio-card__head">\r
            <h2 class="studio-card__title">X\xE1c nh\u1EADn &amp; Thanh to\xE1n</h2>\r
          </div>\r
\r
          <div class="order-card">\r
            <h3 class="order-card__heading">PH\xC2N T\xCDCH GI\xC1 CHI TI\u1EBET</h3>\r
            <ul class="order-card__list">\r
              @for (item of orderItems(); track item.name) {\r
                <li class="order-card__item">\r
                  <span class="order-card__item-name">\r
                    {{ item.name }}\r
                    @if (item.subName) {\r
                      <span class="order-card__item-sub">({{ item.subName }})</span>\r
                    }\r
                  </span>\r
                  <span class="order-card__item-price">{{ formatVnd(item.price) }}</span>\r
                </li>\r
              }\r
            </ul>\r
            <div class="order-card__divider"></div>\r
            <div class="order-card__total">\r
              <span>T\u1ED4NG C\u1ED8NG</span>\r
              <strong>{{ formatVnd(totalPrice()) }}</strong>\r
            </div>\r
          </div>\r
\r
          <div class="order-card__actions">\r
            <button class="btn btn--primary btn--full" (click)="goToCheckout()" type="button">\r
              \u0110\u1EB6T H\xC0NG NGAY \u2192\r
            </button>\r
            <button class="btn btn--secondary btn--full" type="button">\r
              TH\xCAM V\xC0O GI\u1ECE\r
            </button>\r
          </div>\r
\r
          <div class="order-card__links">\r
            <button class="btn-link" type="button">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">\r
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>\r
                <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>\r
              </svg>\r
              L\u01AFU THI\u1EBET K\u1EBE\r
            </button>\r
            <button class="btn-link" type="button">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">\r
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>\r
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>\r
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>\r
              </svg>\r
              CHIA S\u1EBA\r
            </button>\r
          </div>\r
\r
          <div class="studio-card__actions">\r
            <button class="btn btn--ghost" (click)="goToStep(4)" type="button">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Sub-view 2: Checkout form -->\r
    @if (checkoutSubStep() === 2) {\r
      <form class="studio-card studio-card--wide" [formGroup]="checkoutForm" (ngSubmit)="submitOrder()">\r
        <div class="studio-card__head">\r
          <h2 class="studio-card__title">X\xE1c nh\u1EADn &amp; Thanh to\xE1n</h2>\r
        </div>\r
\r
        <div class="checkout-layout">\r
\r
          <div class="checkout-layout__main">\r
\r
            <div class="checkout-section">\r
              <div class="checkout-section__header">\r
                <h3 class="checkout-section__title">\u2460 TH\xD4NG TIN V\u1EACN CHUY\u1EC2N</h3>\r
                <button class="btn btn--ghost btn--sm" type="button" (click)="shippingExpanded.set(!shippingExpanded())">\r
                  CH\u1ECCN \u0110\u1ECAA CH\u1EC8 {{ shippingExpanded() ? '\u2227' : '\u2228' }}\r
                </button>\r
              </div>\r
              @if (shippingExpanded()) {\r
              <div class="checkout-form-grid">\r
\r
                <div class="form-field">\r
                  <label class="form-field__label" for="checkout-name">H\u1ECC T\xCAN *</label>\r
                  <input id="checkout-name" class="form-field__input" type="text" formControlName="name" />\r
                  @if (checkoutForm.controls.name.invalid && checkoutForm.controls.name.touched) {\r
                    <span class="form-field__error">Vui l\xF2ng nh\u1EADp h\u1ECD t\xEAn</span>\r
                  }\r
                </div>\r
\r
                <div class="form-field">\r
                  <label class="form-field__label" for="checkout-phone">S\u1ED0 \u0110I\u1EC6N THO\u1EA0I *</label>\r
                  <input id="checkout-phone" class="form-field__input" type="tel" formControlName="phone" />\r
                  @if (checkoutForm.controls.phone.invalid && checkoutForm.controls.phone.touched) {\r
                    <span class="form-field__error">Vui l\xF2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i</span>\r
                  }\r
                </div>\r
\r
                <div class="form-field form-field--full">\r
                  <label class="form-field__label" for="checkout-email">EMAIL (T\xD9Y CH\u1ECCN)</label>\r
                  <input id="checkout-email" class="form-field__input" type="email" formControlName="email" />\r
                </div>\r
\r
                <div class="form-field">\r
                  <label class="form-field__label" for="checkout-province">T\u1EC8NH/TH\xC0NH *</label>\r
                  <select id="checkout-province" class="form-field__input form-field__select" formControlName="province">\r
                    <option value="">Ch\u1ECDn T\u1EC9nh/Th\xE0nh</option>\r
                    <option value="hcm">TP. H\u1ED3 Ch\xED Minh</option>\r
                    <option value="hn">H\xE0 N\u1ED9i</option>\r
                    <option value="dn">\u0110\xE0 N\u1EB5ng</option>\r
                  </select>\r
                </div>\r
\r
                <div class="form-field">\r
                  <label class="form-field__label" for="checkout-ward">PH\u01AF\u1EDCNG/X\xC3 *</label>\r
                  <select id="checkout-ward" class="form-field__input form-field__select" formControlName="ward">\r
                    <option value="">Ch\u1ECDn Ph\u01B0\u1EDDng/X\xE3</option>\r
                  </select>\r
                </div>\r
\r
                <div class="form-field form-field--full">\r
                  <label class="form-field__label" for="checkout-address">S\u1ED0 NH\xC0, T\xCAN \u0110\u01AF\u1EDCNG *</label>\r
                  <input id="checkout-address" class="form-field__input" type="text" formControlName="address" />\r
                  @if (checkoutForm.controls.address.invalid && checkoutForm.controls.address.touched) {\r
                    <span class="form-field__error">Vui l\xF2ng nh\u1EADp \u0111\u1ECBa ch\u1EC9</span>\r
                  }\r
                </div>\r
\r
              </div>\r
              }\r
            </div>\r
\r
            <div class="checkout-section">\r
              <h3 class="checkout-section__title">\u2461 PH\u01AF\u01A0NG TH\u1EE8C THANH TO\xC1N</h3>\r
              <div class="payment-methods">\r
                @for (method of paymentMethods; track method.id) {\r
                  <button\r
                    class="payment-method"\r
                    [class.payment-method--selected]="selectedPaymentMethod() === method.id"\r
                    (click)="selectPaymentMethod(method.id)"\r
                    type="button"\r
                  >\r
                    <span class="payment-method__radio">\r
                      @if (selectedPaymentMethod() === method.id) {\r
                        <span class="payment-method__radio-dot"></span>\r
                      }\r
                    </span>\r
                    <span class="payment-method__label">{{ method.label }}</span>\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
\r
          </div>\r
\r
          <aside class="checkout-layout__aside">\r
            <div class="checkout-summary">\r
              <h3 class="checkout-summary__title">T\u1ED4NG \u0110\u01A0N H\xC0NG (01)</h3>\r
\r
              <div class="checkout-summary__product">\r
                <img\r
                  src="https://www.figma.com/api/mcp/asset/48641a6f-72f5-4524-8109-67072e259627"\r
                  alt="S\u1EA3n ph\u1EA9m t\xF9y ch\u1EC9nh"\r
                  class="checkout-summary__product-img"\r
                  loading="lazy"\r
                />\r
                <div class="checkout-summary__product-info">\r
                  <p class="checkout-summary__product-name">T\xF9y ch\u1EC9nh Di S\u1EA3n</p>\r
                  <p class="checkout-summary__product-config">\r
                    K\xEDch c\u1EE1 M | {{ selectedMaterial().label }}\r
                    @if (selectedStone().id !== 'none') { | {{ selectedStone().label }} {{ carat() }}ct }\r
                  </p>\r
                  <p class="checkout-summary__product-price">SL: {{ formatVnd(totalPrice()) }}</p>\r
                </div>\r
              </div>\r
\r
              <div class="checkout-summary__divider"></div>\r
\r
              <div class="checkout-summary__line">\r
                <span>T\u1EA1m t\xEDnh</span>\r
                <span>{{ formatVnd(totalPrice()) }}</span>\r
              </div>\r
              <div class="checkout-summary__line">\r
                <span>Ph\xED v\u1EADn chuy\u1EC3n</span>\r
                <span class="checkout-summary__free">MI\u1EC4N PH\xCD</span>\r
              </div>\r
\r
              <div class="checkout-summary__divider"></div>\r
\r
              <p class="checkout-summary__voucher-label">M\xC3 VOUCHER / QU\xC0 T\u1EB6NG</p>\r
              <div class="voucher-row">\r
                <input\r
                  class="voucher-row__input"\r
                  type="text"\r
                  placeholder="Nh\u1EADp m\xE3 \u01B0u \u0111\xE3i c\u1EE7a b\u1EA1n"\r
                  [value]="voucherCode()"\r
                  (input)="voucherCode.set($any($event.target).value)"\r
                  aria-label="Nh\u1EADp m\xE3 voucher"\r
                />\r
                <button class="voucher-row__btn" (click)="applyVoucher()" type="button">\xC1P D\u1EE4NG</button>\r
              </div>\r
\r
              <div class="checkout-summary__divider"></div>\r
\r
              <div class="checkout-summary__total">\r
                <span>T\u1ED4NG C\u1ED8NG</span>\r
                <strong>{{ formatVnd(totalPrice()) }}</strong>\r
              </div>\r
\r
              <div class="checkout-summary__deposit-block">\r
                <div class="checkout-summary__deposit-row">\r
                  <span>50% \u0110\u1EB6T C\u1ECCC B\xC2Y GI\u1EDC</span>\r
                  <strong>{{ formatVnd(depositAmount()) }}</strong>\r
                </div>\r
                <div class="checkout-summary__deposit-row checkout-summary__deposit-row--remain">\r
                  <span>S\u1ED0 TI\u1EC0N C\xD2N L\u1EA0I</span>\r
                  <strong>{{ formatVnd(depositAmount()) }}</strong>\r
                </div>\r
              </div>\r
\r
              <p class="checkout-summary__legal">\r
                B\u1EB1ng vi\u1EC7c nh\u1EA5n "Thanh to\xE1n", b\u1EA1n \u0111\u1ED3ng \xFD v\u1EDBi c\xE1c \u0110i\u1EC1u kho\u1EA3n &amp; Ch\xEDnh s\xE1ch b\u1EA3o m\u1EADt c\u1EE7a RENGA\r
              </p>\r
\r
              <button\r
                class="btn btn--primary btn--full checkout-summary__submit"\r
                type="submit"\r
              >\r
                THANH TO\xC1N \u2192\r
              </button>\r
            </div>\r
          </aside>\r
\r
        </div>\r
\r
        <div class="studio-card__actions studio-card__actions--bottom">\r
          <button class="btn btn--ghost" (click)="backFromCheckout()" type="button">\u2190 Tr\u01B0\u1EDBc \u0111\xF3</button>\r
        </div>\r
      </form>\r
    }\r
\r
  }\r
\r
</section>\r
\r
<!-- Floating price summary (steps 2\u20135) -->\r
@if (priceSummaryVisible()) {\r
  <div class="studio-price-summary" aria-live="polite">\r
    <p class="studio-price-summary__label">T\u1ED5ng gi\xE1 tr\u1ECB hi\u1EC7n t\u1EA1i</p>\r
    <p class="studio-price-summary__amount">{{ priceSummaryAmount() }}</p>\r
    <p class="studio-price-summary__detail">{{ priceSummaryDetail() }}</p>\r
  </div>\r
}\r
`, styles: ["/* src/app/studio/studio.component.css */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n.studio {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 var(--container-px) 120px;\n  font-family: var(--font-sans);\n}\n.studio__header {\n  text-align: center;\n  padding: 64px 0 40px;\n}\n.studio__header-eyebrow {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 3px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  margin: 0 0 16px;\n}\n.studio__header-title {\n  font-family: var(--font-serif);\n  font-size: 52px;\n  font-weight: 500;\n  letter-spacing: -0.5px;\n  line-height: 1.15;\n  color: var(--color-black);\n  margin: 0 0 16px;\n}\n.studio__header-sub {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  line-height: 1.7;\n  color: var(--color-muted);\n  max-width: 560px;\n  margin: 0 auto;\n}\n.step-progress {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 0 48px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.step-progress__item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  position: relative;\n  z-index: 1;\n}\n.step-progress__circle {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  background: var(--color-white);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-muted);\n  transition:\n    background 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n}\n.step-progress__item--active .step-progress__circle {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n  font-weight: 700;\n}\n.step-progress__item--done .step-progress__circle {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.step-progress__label {\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  white-space: nowrap;\n}\n.step-progress__item--active .step-progress__label {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.step-progress__connector {\n  flex: 1;\n  max-width: 160px;\n  height: 1px;\n  background: var(--color-border);\n  margin-bottom: 22px;\n  transition: background 0.2s;\n}\n.step-progress__connector--done {\n  background: var(--color-primary);\n}\n.studio-card {\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  margin-bottom: 32px;\n}\n.studio-card--wide {\n  padding: 48px;\n}\n.studio-card--split {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0;\n}\n.studio-card--split > .studio-card__preview {\n  border-right: 1px solid var(--color-border);\n}\n.studio-card__head {\n  margin-bottom: 32px;\n}\n.studio-card__title {\n  font-family: var(--font-serif);\n  font-size: 36px;\n  font-weight: 400;\n  line-height: 1.25;\n  color: var(--color-black);\n  margin: 0 0 10px;\n}\n.studio-card__desc {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--color-muted);\n  margin: 0;\n}\n.studio-card__preview {\n  position: relative;\n  background: #f5f0f2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 480px;\n  overflow: hidden;\n}\n.studio-card__preview-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  display: block;\n  position: absolute;\n  inset: 0;\n}\n.studio-card__preview-badge {\n  position: absolute;\n  bottom: 24px;\n  left: 24px;\n  background: rgba(0, 0, 0, 0.7);\n  color: var(--color-white);\n  padding: 10px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.studio-card__preview-badge-tag {\n  font-size: 10px;\n  font-weight: 400;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  opacity: 0.75;\n}\n.studio-card__options {\n  padding: 48px;\n  display: flex;\n  flex-direction: column;\n}\n.studio-card__actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-top: auto;\n  padding-top: 32px;\n  border-top: 1px solid var(--color-border);\n}\n.studio-card__actions--bottom {\n  padding: 24px 48px;\n  border-top: 1px solid var(--color-border);\n  margin-top: 0;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 14px 32px;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  cursor: pointer;\n  border: none;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    opacity 0.2s;\n  white-space: nowrap;\n}\n.btn--primary {\n  background: var(--color-black);\n  color: var(--color-white);\n}\n.btn--primary:hover {\n  background: #333;\n}\n.btn--secondary {\n  background: transparent;\n  color: var(--color-black);\n  border: 1px solid var(--color-black);\n}\n.btn--secondary:hover {\n  background: var(--color-bg-card);\n}\n.btn--ghost {\n  background: transparent;\n  color: var(--color-muted);\n  border: 1px solid var(--color-border);\n}\n.btn--ghost:hover {\n  border-color: #999;\n  color: var(--color-dark);\n}\n.btn--full {\n  width: 100%;\n}\n.btn-link {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  cursor: pointer;\n  text-decoration: underline;\n  transition: color 0.15s;\n}\n.btn-link:hover {\n  color: var(--color-dark);\n}\n.category-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n.category-card {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  padding: 0;\n  overflow: hidden;\n  transition: box-shadow 0.2s, border-color 0.2s;\n}\n.category-card:hover {\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);\n  border-color: #bbb;\n}\n.category-card__img-wrap {\n  width: 100%;\n  aspect-ratio: 1 / 1;\n  overflow: hidden;\n  background: #f5f0f2;\n  flex-shrink: 0;\n}\n.category-card__img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  display: block;\n  transition: transform 0.4s ease;\n}\n.category-card:hover .category-card__img {\n  transform: scale(1.04);\n}\n.category-card__footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 16px 20px;\n  border-top: 1px solid var(--color-border);\n}\n.category-card__info {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.category-card__eyebrow {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  letter-spacing: 1px;\n  color: var(--color-muted);\n}\n.category-card__name {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  font-weight: 400;\n  color: var(--color-black);\n}\n.category-card__cta {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 20px;\n  background: var(--color-black);\n  color: var(--color-white);\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  white-space: nowrap;\n  flex-shrink: 0;\n  transition: background 0.2s;\n}\n.category-card:hover .category-card__cta {\n  background: #333;\n}\n.material-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 32px;\n}\n.material-option {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  transition: border-color 0.15s;\n}\n.material-option:hover {\n  border-color: #aaa;\n}\n.material-option--selected {\n  border: 2px solid var(--color-black);\n}\n.material-option__swatch {\n  width: 44px;\n  height: 44px;\n  border: 1px solid #ccc;\n  flex-shrink: 0;\n  display: block;\n}\n.material-option__info {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n}\n.material-option__name {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  color: var(--color-black);\n  line-height: 1.3;\n}\n.material-option__tag {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  color: var(--color-muted);\n  letter-spacing: 0.5px;\n}\n.material-option__price {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.stone-grid {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 8px;\n  margin-bottom: 28px;\n}\n.stone-option {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  padding: 14px 6px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.stone-option:hover {\n  border-color: #999;\n}\n.stone-option--selected {\n  background: var(--color-black);\n  border-color: var(--color-black);\n}\n.stone-option--selected .stone-option__label {\n  color: var(--color-white);\n}\n.stone-option--selected .stone-option__icon {\n  filter: invert(1);\n}\n.stone-option--muted {\n  opacity: 0.6;\n}\n.stone-option__icon {\n  width: 36px;\n  height: 36px;\n  object-fit: contain;\n  display: block;\n}\n.stone-option__label {\n  font-family: var(--font-sans);\n  font-size: 9px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--color-black);\n  text-align: center;\n}\n.carat-control {\n  margin-bottom: 20px;\n}\n.carat-control__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.carat-control__label {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.carat-control__value {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-primary);\n}\n.carat-slider {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 2px;\n  background: var(--color-border);\n  outline: none;\n  cursor: pointer;\n  display: block;\n}\n.carat-slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(196, 96, 126, 0.35);\n  transition: transform 0.15s;\n}\n.carat-slider::-moz-range-thumb {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  border: none;\n  cursor: pointer;\n}\n.carat-slider::-webkit-slider-thumb:hover {\n  transform: scale(1.15);\n}\n.carat-control__range-labels {\n  display: flex;\n  justify-content: space-between;\n  font-family: var(--font-sans);\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-top: 6px;\n}\n.stone-details {\n  background: #faf5f7;\n  border: 1px solid var(--color-border);\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.stone-details__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.stone-details__key {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n  letter-spacing: 0.5px;\n}\n.stone-details__val {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n}\n.stone-details__val--accent {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.engrave-gallery {\n  display: flex;\n  flex-direction: column;\n  background: #f5f0f2;\n}\n.engrave-gallery__main {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 1 / 1;\n  overflow: hidden;\n  background: var(--color-bg-card);\n  flex: 1;\n}\n.engrave-gallery__main-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  display: block;\n}\n.engrave-gallery__overlay {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  padding-bottom: 40px;\n  font-size: 22px;\n  color: var(--color-white);\n  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);\n  font-family: var(--font-sans);\n  pointer-events: none;\n  letter-spacing: 2px;\n}\n.engrave-gallery__overlay--serif {\n  font-family: var(--font-serif);\n  font-style: italic;\n  font-size: 26px;\n}\n.engrave-gallery__thumbs {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0;\n  border-top: 1px solid var(--color-border);\n}\n.engrave-gallery__thumb {\n  aspect-ratio: 1 / 1;\n  border: none;\n  border-right: 1px solid var(--color-border);\n  background: var(--color-bg-card);\n  overflow: hidden;\n  cursor: pointer;\n  padding: 0;\n  opacity: 0.5;\n  transition: opacity 0.15s;\n}\n.engrave-gallery__thumb:last-child {\n  border-right: none;\n}\n.engrave-gallery__thumb:hover {\n  opacity: 0.8;\n}\n.engrave-gallery__thumb img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.engrave-gallery__thumb--active {\n  opacity: 1;\n  box-shadow: inset 0 0 0 2px var(--color-black);\n}\n.font-selector {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 28px;\n}\n.font-selector__option {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    color 0.15s;\n}\n.font-selector__option:hover {\n  border-color: #aaa;\n}\n.font-selector__option--active {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-white);\n}\n.engrave-input-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 16px;\n}\n.engrave-input-wrap__label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.engrave-input {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  padding: 16px;\n  font-family: var(--font-serif);\n  font-size: 22px;\n  color: var(--color-dark);\n  background: var(--color-white);\n  outline: none;\n  transition: box-shadow 0.15s;\n}\n.engrave-input::placeholder {\n  color: #ccc;\n}\n.engrave-input:focus {\n  box-shadow: 0 0 0 2px rgba(196, 96, 126, 0.20);\n}\n.engrave-input-wrap__meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.engrave-input-wrap__count {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  letter-spacing: 0.5px;\n}\n.engrave-input-wrap__count--warn {\n  color: var(--color-primary);\n  font-weight: 700;\n}\n.engrave-input-wrap__fee {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-primary);\n  letter-spacing: 0.5px;\n}\n.engrave-note {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  margin: 0 0 24px;\n  padding: 12px 16px;\n  background: #faf5f7;\n  border-left: 3px solid var(--color-primary);\n}\n.order-card {\n  background: var(--color-white);\n  border: 1px solid var(--color-border);\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.order-card__list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n}\n.order-card__item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 0;\n  border-bottom: 1px solid rgba(196, 199, 199, 0.35);\n}\n.order-card__item:last-child {\n  border-bottom: none;\n}\n.order-card__item-name {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-muted);\n}\n.order-card__item-sub {\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.order-card__item-price {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n  white-space: nowrap;\n  flex-shrink: 0;\n  padding-left: 16px;\n}\n.order-card__divider {\n  height: 1px;\n  background: var(--color-black);\n  margin: 16px 0;\n}\n.order-card__total {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.order-card__total span {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.order-card__total strong {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  color: #9a3f5c;\n  font-weight: 400;\n}\n.order-card__deposit {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  padding: 10px 16px;\n  background: #fdf5f7;\n  margin-bottom: 4px;\n}\n.order-card__deposit span {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  color: var(--color-muted);\n}\n.order-card__deposit-amount {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  color: var(--color-primary);\n  font-weight: 400;\n}\n.order-card__actions {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.order-card__links {\n  display: flex;\n  justify-content: center;\n  gap: 32px;\n  padding-top: 8px;\n}\n.checkout-layout {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 48px;\n  align-items: start;\n  padding: 0 0 32px;\n}\n.checkout-layout__main {\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.checkout-section__title {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.checkout-form-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-field--full {\n  grid-column: 1 / -1;\n}\n.form-field__label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.form-field__input {\n  width: 100%;\n  border: 1px solid var(--color-border);\n  padding: 13px 16px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n  background: var(--color-white);\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.form-field__input::placeholder {\n  color: #bbb;\n}\n.form-field__input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 2px rgba(196, 96, 126, 0.15);\n}\n.form-field__error {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: #c0392b;\n}\n.payment-methods {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.payment-method {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  border: 1px solid var(--color-border);\n  background: var(--color-white);\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  transition: border-color 0.15s;\n}\n.payment-method:hover {\n  border-color: #aaa;\n}\n.payment-method--selected {\n  border-color: var(--color-primary);\n  background: #fdf5f7;\n}\n.payment-method__radio {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: border-color 0.15s;\n}\n.payment-method--selected .payment-method__radio {\n  border-color: var(--color-primary);\n}\n.payment-method__radio-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  display: block;\n}\n.payment-method__label {\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--color-dark);\n}\n.checkout-layout__aside {\n  position: sticky;\n  top: 24px;\n}\n.checkout-summary {\n  border: 1px solid var(--color-border);\n  padding: 28px;\n  background: var(--color-white);\n}\n.checkout-summary__title {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin: 0 0 20px;\n}\n.checkout-summary__product {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.checkout-summary__product-img {\n  width: 64px;\n  height: 64px;\n  object-fit: cover;\n  border: 1px solid var(--color-border);\n  flex-shrink: 0;\n  display: block;\n}\n.checkout-summary__product-name {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-black);\n  margin: 0 0 4px;\n}\n.checkout-summary__product-config {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  margin: 0;\n  letter-spacing: 0.3px;\n}\n.checkout-summary__divider {\n  height: 1px;\n  background: var(--color-border);\n  margin: 16px 0;\n}\n.checkout-summary__list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.checkout-summary__line {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.checkout-summary__line span:last-child {\n  color: var(--color-dark);\n  font-weight: 500;\n}\n.voucher-row {\n  display: flex;\n  gap: 8px;\n}\n.voucher-row__input {\n  flex: 1;\n  border: 1px solid var(--color-border);\n  padding: 10px 14px;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-dark);\n  outline: none;\n  background: var(--color-white);\n}\n.voucher-row__input::placeholder {\n  color: #ccc;\n}\n.voucher-row__input:focus {\n  border-color: var(--color-primary);\n}\n.voucher-row__btn {\n  padding: 10px 18px;\n  background: var(--color-black);\n  color: var(--color-white);\n  border: none;\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background 0.2s;\n}\n.voucher-row__btn:hover {\n  background: #333;\n}\n.checkout-summary__total {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-bottom: 8px;\n}\n.checkout-summary__total span {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.checkout-summary__total strong {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  color: var(--color-black);\n  font-weight: 400;\n}\n.checkout-summary__deposit {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  background: #fdf5f7;\n  padding: 10px 14px;\n  margin-bottom: 20px;\n}\n.checkout-summary__deposit span {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n}\n.checkout-summary__deposit strong {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  color: var(--color-primary);\n  font-weight: 400;\n}\n.checkout-summary__submit {\n  margin-bottom: 12px;\n}\n.checkout-summary__note {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  line-height: 1.6;\n  text-align: center;\n  margin: 0;\n}\n.studio-price-summary {\n  position: fixed;\n  bottom: 0;\n  right: 24px;\n  width: 220px;\n  background: var(--color-primary);\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  z-index: 998;\n  box-shadow: 0 -4px 24px rgba(196, 96, 126, 0.3);\n}\n.studio-price-summary__label {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.75);\n  margin: 0;\n}\n.studio-price-summary__amount {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--color-white);\n  line-height: 1.1;\n  margin: 0;\n}\n.studio-price-summary__detail {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  color: rgba(255, 255, 255, 0.7);\n  margin: 0;\n}\n.studio-card__preview-foot {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 16px;\n  background: rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.studio-card__preview-label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.9);\n}\n.studio-card__preview-btns {\n  display: flex;\n  gap: 8px;\n}\n.studio-card__preview-btn {\n  width: 28px;\n  height: 28px;\n  background: rgba(255, 255, 255, 0.15);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.studio-card__preview-btn:hover {\n  background: rgba(255, 255, 255, 0.25);\n}\n.studio-card__preview-btn svg {\n  width: 14px;\n  height: 14px;\n  stroke: white;\n  fill: none;\n}\n.studio-card__preview-name {\n  position: absolute;\n  bottom: 48px;\n  left: 0;\n  right: 0;\n  padding: 40px 24px 16px;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.72) 0%,\n      transparent 100%);\n  color: var(--color-white);\n}\n.studio-card__preview-name-title {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 6px;\n}\n.studio-card__preview-name-desc {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  line-height: 1.6;\n  opacity: 0.85;\n}\n.studio-card__head--row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n.btn--skip {\n  padding: 10px 20px;\n  font-size: 11px;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.studio-section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n  margin-top: 8px;\n}\n.studio-section-label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.studio-section-chip {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.price-breakdown {\n  background: #faf5f7;\n  border: 1px solid var(--color-border);\n  padding: 16px 20px;\n  margin-bottom: 16px;\n}\n.price-breakdown__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.price-breakdown__row span:last-child {\n  color: var(--color-dark);\n  font-weight: 500;\n  white-space: nowrap;\n  padding-left: 12px;\n}\n.price-breakdown__divider {\n  height: 1px;\n  background: var(--color-border);\n  margin: 4px 0 8px;\n}\n.price-breakdown__total {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n}\n.price-breakdown__total span {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.price-breakdown__total strong {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  color: #9a3f5c;\n  font-weight: 400;\n}\n.engrave-input-wrap__free {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.engrave-fee-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 0;\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n  margin-bottom: 16px;\n}\n.engrave-fee-row__label {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n}\n.engrave-fee-row__value {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  color: var(--color-black);\n}\n.order-card__heading {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--color-dark);\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.order-card__links {\n  display: flex;\n  justify-content: center;\n  gap: 40px;\n  padding: 20px 0 8px;\n}\n.order-card__links .btn-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.checkout-section__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--color-border);\n}\n.checkout-section__header .checkout-section__title {\n  margin-bottom: 0;\n  padding-bottom: 0;\n  border-bottom: none;\n}\n.checkout-section__header .btn--sm {\n  min-width: 160px;\n  text-align: center;\n  font-weight: 600;\n  letter-spacing: 1.5px;\n}\n.btn--sm {\n  padding: 8px 16px;\n  font-size: 10px;\n}\n.form-field__select {\n  cursor: pointer;\n  appearance: auto;\n  -webkit-appearance: auto;\n  position: relative;\n}\n.checkout-summary__line {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 5px 0;\n  font-family: var(--font-sans);\n  font-size: 13px;\n  color: var(--color-muted);\n}\n.checkout-summary__line span:last-child {\n  color: var(--color-dark);\n  font-weight: 500;\n}\n.checkout-summary__free {\n  color: var(--color-primary) !important;\n  font-weight: 600;\n  font-size: 11px;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n}\n.checkout-summary__voucher-label {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--color-muted);\n  margin-bottom: 8px;\n}\n.checkout-summary__deposit-block {\n  background: #fdf5f7;\n  padding: 10px 14px;\n  margin-bottom: 10px;\n}\n.checkout-summary__deposit-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 4px 0;\n}\n.checkout-summary__deposit-row span {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n}\n.checkout-summary__deposit-row strong {\n  font-family: var(--font-serif);\n  font-size: 18px;\n  color: var(--color-primary);\n  font-weight: 400;\n}\n.checkout-summary__deposit-row--remain strong {\n  color: var(--color-dark);\n}\n.checkout-summary__legal {\n  font-family: var(--font-sans);\n  font-size: 10px;\n  color: var(--color-muted);\n  line-height: 1.5;\n  text-align: center;\n  margin-bottom: 12px;\n}\n.checkout-summary__product-price {\n  font-family: var(--font-sans);\n  font-size: 11px;\n  color: var(--color-muted);\n  margin: 2px 0 0;\n}\n@media (max-width: 1024px) {\n  .studio {\n    padding: 0 40px 100px;\n  }\n  .studio-card--split {\n    grid-template-columns: 1fr;\n  }\n  .studio-card--split > .studio-card__preview {\n    border-right: none;\n    border-bottom: 1px solid var(--color-border);\n    min-height: 320px;\n  }\n  .checkout-layout {\n    grid-template-columns: 1fr;\n  }\n  .checkout-layout__aside {\n    position: static;\n  }\n}\n@media (max-width: 768px) {\n  .studio {\n    padding: 0 16px 80px;\n  }\n  .studio-card--wide {\n    padding: 24px 16px;\n  }\n  .studio-card__options {\n    padding: 24px 16px;\n  }\n  .studio-card__head--row {\n    flex-wrap: wrap;\n  }\n  .category-grid {\n    grid-template-columns: 1fr;\n  }\n  .step-progress {\n    padding: 16px 0 28px;\n  }\n  .step-progress__label {\n    display: none;\n  }\n  .step-progress__connector {\n    max-width: 60px;\n  }\n  .step-progress__circle {\n    width: 36px;\n    height: 36px;\n    font-size: 14px;\n  }\n  .stone-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .checkout-form-grid {\n    grid-template-columns: 1fr;\n  }\n  .checkout-form-grid .form-field--full {\n    grid-column: 1;\n  }\n  .studio-price-summary {\n    width: 180px;\n    right: 12px;\n    padding: 12px 16px;\n  }\n  .studio-price-summary__amount {\n    font-size: 22px;\n  }\n}\n/*# sourceMappingURL=studio.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudioComponent, { className: "StudioComponent", filePath: "src/app/studio/studio.component.ts", lineNumber: 56 });
})();
export {
  StudioComponent
};
//# sourceMappingURL=chunk-4JCPX4KV.js.map
