import {
  DatetimeAdapter,
  MTX_DATETIME_FORMATS
} from "./chunk-RZSEZAWP.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-6RZAS2TP.js";
import {
  MAT_INPUT_VALUE_ACCESSOR
} from "./chunk-YONIJPLB.js";
import {
  Overlay,
  OverlayConfig,
  OverlayModule
} from "./chunk-TQ7XTMFH.js";
import "./chunk-UA4I2L7W.js";
import {
  MatFormField
} from "./chunk-RTS6RDBA.js";
import "./chunk-TLIV3A3L.js";
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from "./chunk-VSV4MVKU.js";
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from "./chunk-LILIBRV6.js";
import {
  CdkPortalOutlet,
  ComponentPortal,
  PortalModule,
  TemplatePortal
} from "./chunk-7JRFYL3U.js";
import "./chunk-7QH2DUDI.js";
import "./chunk-E5ILAOQ3.js";
import {
  A11yModule,
  DOWN_ARROW,
  END,
  ENTER,
  ESCAPE,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  UP_ARROW,
  hasModifierKey
} from "./chunk-SFQVNJ7E.js";
import {
  Directionality,
  _getFocusedElementPierceShadowDom,
  coerceNumberProperty,
  coerceStringArray,
  normalizePassiveListenerOptions
} from "./chunk-DRYTSZGS.js";
import {
  CommonModule,
  DOCUMENT
} from "./chunk-ZIDM5L6D.js";
import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  afterNextRender,
  booleanAttribute,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵhostProperty,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵsyntheticHostListener,
  ɵɵsyntheticHostProperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-RTEUSPZQ.js";
import {
  merge
} from "./chunk-3GDIDV32.js";
import "./chunk-BJB7OPLC.js";
import {
  Subject,
  Subscription,
  filter,
  of,
  take
} from "./chunk-PVXNJD7T.js";
import "./chunk-KBUIKKCC.js";

// node_modules/.pnpm/@ng-matero+extensions@18.4.1_@angular+animations@18.2.13_@angular+core@18.2.13_rxjs@7.5_bc5be00a34dfa200d14de048f5d0c427/node_modules/@ng-matero/extensions/fesm2022/mtxDatetimepicker.mjs
var _forTrack0 = ($index, $item) => $item.value;
function MtxClock_For_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("font-size", item_r1.fontSize)("left", item_r1.left + "%")("top", item_r1.top + "%");
    ɵɵclassProp("mtx-clock-cell-disabled", !item_r1.enabled)("mtx-clock-cell-selected", ctx_r1._selectedHour === item_r1.value);
    ɵɵadvance();
    ɵɵtextInterpolate(item_r1.displayValue);
  }
}
function MtxClock_For_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("left", item_r3.left + "%")("top", item_r3.top + "%");
    ɵɵclassProp("mtx-clock-cell-disabled", !item_r3.enabled)("mtx-clock-cell-selected", ctx_r1._selectedMinute === item_r3.value);
    ɵɵadvance();
    ɵɵtextInterpolate(item_r3.displayValue);
  }
}
var _c0 = ["mtx-calendar-body", ""];
function MtxCalendarBody_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr", 0)(1, "td", 2);
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵattribute("colspan", ctx_r0.numCols);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.label);
  }
}
function MtxCalendarBody_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵattribute("colspan", ctx_r0._firstRowOffset);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0._firstRowOffset >= ctx_r0.labelMinRequiredCells ? ctx_r0.label : "", " ");
  }
}
function MtxCalendarBody_For_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 5);
    ɵɵlistener("click", function MtxCalendarBody_For_2_For_3_Template_td_click_0_listener() {
      const item_r3 = ɵɵrestoreView(_r2).$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._cellClicked(item_r3));
    });
    ɵɵelementStart(1, "div", 6);
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ɵ$index_14_r4 = ctx.$index;
    const ɵ$index_7_r5 = ɵɵnextContext().$index;
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassProp("mtx-calendar-body-active", ctx_r0._isActiveCell(ɵ$index_7_r5, ɵ$index_14_r4))("mtx-calendar-body-disabled", !item_r3.enabled);
    ɵɵproperty("tabindex", ctx_r0._isActiveCell(ɵ$index_7_r5, ɵ$index_14_r4) ? 0 : -1);
    ɵɵattribute("data-mat-row", ɵ$index_7_r5)("data-mat-col", ɵ$index_14_r4)("aria-label", item_r3.ariaLabel)("aria-disabled", !item_r3.enabled || null);
    ɵɵadvance();
    ɵɵclassProp("mtx-calendar-body-selected", ctx_r0.selectedValue === item_r3.value)("mtx-calendar-body-today", ctx_r0.todayValue === item_r3.value);
    ɵɵattribute("aria-selected", ctx_r0.selectedValue === item_r3.value);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", item_r3.displayValue, " ");
  }
}
function MtxCalendarBody_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr", 1);
    ɵɵtemplate(1, MtxCalendarBody_For_2_Conditional_1_Template, 2, 2, "td", 3);
    ɵɵrepeaterCreate(2, MtxCalendarBody_For_2_For_3_Template, 3, 15, "td", 4, ɵɵrepeaterTrackByIdentity);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    const ɵ$index_7_r5 = ctx.$index;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ɵ$index_7_r5 === 0 && ctx_r0._firstRowOffset ? 1 : -1);
    ɵɵadvance();
    ɵɵrepeater(row_r6);
  }
}
function MtxMonthView_For_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "th");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r1 = ctx.$implicit;
    ɵɵattribute("aria-label", day_r1.long);
    ɵɵadvance();
    ɵɵtextInterpolate(day_r1.narrow);
  }
}
var _c1 = ["hourInput"];
var _c2 = ["minuteInput"];
function MtxTime_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7)(1, "button", 10);
    ɵɵlistener("keydown", function MtxTime_Conditional_8_Template_button_keydown_1_listener($event) {
      ɵɵrestoreView(_r2);
      return ɵɵresetView($event.stopPropagation());
    })("click", function MtxTime_Conditional_8_Template_button_click_1_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.ampmChange.emit("AM"));
    });
    ɵɵtext(2, "AM");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 11);
    ɵɵlistener("keydown", function MtxTime_Conditional_8_Template_button_keydown_3_listener($event) {
      ɵɵrestoreView(_r2);
      return ɵɵresetView($event.stopPropagation());
    })("click", function MtxTime_Conditional_8_Template_button_click_3_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.ampmChange.emit("PM"));
    });
    ɵɵtext(4, "PM");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("mtx-time-ampm-active", ctx_r2.AMPM === "AM");
    ɵɵadvance(2);
    ɵɵclassProp("mtx-time-ampm-active", ctx_r2.AMPM === "PM");
  }
}
function MtxTime_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 9)(1, "button", 12);
    ɵɵlistener("click", function MtxTime_Conditional_10_Template_button_click_1_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2._handleCancel());
    });
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 13);
    ɵɵlistener("click", function MtxTime_Conditional_10_Template_button_click_3_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2._handleOk());
    });
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r2._datetimepickerIntl.cancelLabel, " ");
    ɵɵadvance();
    ɵɵproperty("disabled", (ctx_r2.minuteInputDirective == null ? null : ctx_r2.minuteInputDirective.invalid) || (ctx_r2.hourInputDirective == null ? null : ctx_r2.hourInputDirective.invalid));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2._datetimepickerIntl.okLabel, " ");
  }
}
function MtxCalendar_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function MtxCalendar_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxCalendar_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("cdkPortalOutlet", ctx_r0._calendarHeaderPortal);
  }
}
function MtxCalendar_Conditional_2_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 9);
    ɵɵelement(1, "path", 10);
    ɵɵelementEnd();
  }
}
function MtxCalendar_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 8);
    ɵɵlistener("click", function MtxCalendar_Conditional_2_Conditional_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._yearClicked());
    });
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, MtxCalendar_Conditional_2_Conditional_0_Conditional_3_Template, 2, 0, ":svg:svg", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassProp("active", ctx_r0.currentView === "year" || ctx_r0.currentView === "multi-year");
    ɵɵattribute("aria-label", ctx_r0._yearButtonLabel);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0._yearButtonText);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.multiYearSelector || ctx_r0.type === "year" ? 3 : -1);
  }
}
function MtxCalendar_Conditional_2_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 13);
    ɵɵlistener("click", function MtxCalendar_Conditional_2_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r0._dateClicked());
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassProp("active", ctx_r0.currentView === "month")("not-clickable", ctx_r0.type === "month");
    ɵɵattribute("aria-label", ctx_r0._dateButtonLabel);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0._dateButtonText);
  }
}
function MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 19)(1, "button", 20);
    ɵɵlistener("click", function MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Conditional_8_Template_button_click_1_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r0 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r0._ampmClicked("AM"));
    });
    ɵɵtext(2, "AM");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 21);
    ɵɵlistener("click", function MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Conditional_8_Template_button_click_3_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r0 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r0._ampmClicked("PM"));
    });
    ɵɵtext(4, "PM");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵclassProp("active", ctx_r0._AMPM === "AM");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r0._AMPM === "PM");
  }
}
function MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 14)(1, "span", 15)(2, "button", 16);
    ɵɵlistener("click", function MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Template_button_click_2_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r0._hoursClicked());
    });
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementStart(4, "span", 17);
    ɵɵtext(5, ":");
    ɵɵelementEnd();
    ɵɵelementStart(6, "button", 18);
    ɵɵlistener("click", function MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Template_button_click_6_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r0._minutesClicked());
    });
    ɵɵtext(7);
    ɵɵelementEnd()();
    ɵɵtemplate(8, MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Conditional_8_Template, 5, 4, "span", 19);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassProp("active", ctx_r0.currentView === "clock");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r0._clockView === "hour");
    ɵɵattribute("aria-label", ctx_r0._hourButtonLabel);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0._hoursButtonText);
    ɵɵadvance(3);
    ɵɵclassProp("active", ctx_r0._clockView === "minute");
    ɵɵattribute("aria-label", ctx_r0._minuteButtonLabel);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0._minutesButtonText);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.twelvehour ? 8 : -1);
  }
}
function MtxCalendar_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵtemplate(1, MtxCalendar_Conditional_2_Conditional_1_Conditional_1_Template, 2, 6, "button", 11)(2, MtxCalendar_Conditional_2_Conditional_1_Conditional_2_Template, 9, 11, "span", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.type !== "time" ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.type.endsWith("time") ? 2 : -1);
  }
}
function MtxCalendar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxCalendar_Conditional_2_Conditional_0_Template, 4, 5, "button", 6)(1, MtxCalendar_Conditional_2_Conditional_1_Template, 3, 2, "div", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.type !== "time" ? 0 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.type !== "year" ? 1 : -1);
  }
}
function MtxCalendar_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3)(1, "div", 22)(2, "button", 23);
    ɵɵlistener("click", function MtxCalendar_Conditional_4_Template_button_click_2_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._previousClicked());
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(3, "svg", 24);
    ɵɵelement(4, "path", 25);
    ɵɵelementEnd()();
    ɵɵnamespaceHTML();
    ɵɵelementStart(5, "div", 26);
    ɵɵlistener("@slideCalendar.done", function MtxCalendar_Conditional_4_Template_div_animation_slideCalendar_done_5_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._calendarStateDone());
    });
    ɵɵelementStart(6, "strong");
    ɵɵtext(7);
    ɵɵelementEnd()();
    ɵɵelementStart(8, "button", 27);
    ɵɵlistener("click", function MtxCalendar_Conditional_4_Template_button_click_8_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._nextClicked());
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(9, "svg", 24);
    ɵɵelement(10, "path", 28);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵclassProp("disabled", !ctx_r0._previousEnabled());
    ɵɵattribute("aria-disabled", !ctx_r0._previousEnabled())("aria-label", ctx_r0._prevButtonLabel);
    ɵɵadvance(3);
    ɵɵproperty("@slideCalendar", ctx_r0._calendarState);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0._yearPeriodText);
    ɵɵadvance();
    ɵɵclassProp("disabled", !ctx_r0._nextEnabled());
    ɵɵattribute("aria-disabled", !ctx_r0._nextEnabled())("aria-label", ctx_r0._nextButtonLabel);
  }
}
function MtxCalendar_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mtx-month-view", 29);
    ɵɵlistener("_userSelection", function MtxCalendar_Case_5_Template_mtx_month_view__userSelection_0_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._userSelected());
    })("selectedChange", function MtxCalendar_Case_5_Template_mtx_month_view_selectedChange_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._dateSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("activeDate", ctx_r0._activeDate)("dateFilter", ctx_r0._dateFilterForViews)("selected", ctx_r0.selected)("type", ctx_r0.type);
  }
}
function MtxCalendar_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mtx-year-view", 29);
    ɵɵlistener("_userSelection", function MtxCalendar_Case_6_Template_mtx_year_view__userSelection_0_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._userSelected());
    })("selectedChange", function MtxCalendar_Case_6_Template_mtx_year_view_selectedChange_0_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._monthSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("activeDate", ctx_r0._activeDate)("dateFilter", ctx_r0._dateFilterForViews)("selected", ctx_r0.selected)("type", ctx_r0.type);
  }
}
function MtxCalendar_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mtx-multi-year-view", 30);
    ɵɵlistener("_userSelection", function MtxCalendar_Case_7_Template_mtx_multi_year_view__userSelection_0_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._userSelected());
    })("selectedChange", function MtxCalendar_Case_7_Template_mtx_multi_year_view_selectedChange_0_listener($event) {
      ɵɵrestoreView(_r9);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0._yearSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("activeDate", ctx_r0._activeDate)("dateFilter", ctx_r0._dateFilterForViews)("maxDate", ctx_r0.maxDate)("minDate", ctx_r0.minDate)("selected", ctx_r0.selected)("type", ctx_r0.type);
  }
}
function MtxCalendar_Case_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mtx-time", 33);
    ɵɵlistener("_userSelection", function MtxCalendar_Case_8_Conditional_0_Template_mtx_time__userSelection_0_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._userSelected());
    })("activeDateChange", function MtxCalendar_Case_8_Conditional_0_Template_mtx_time_activeDateChange_0_listener($event) {
      ɵɵrestoreView(_r10);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._onActiveDateChange($event));
    })("selectedChange", function MtxCalendar_Case_8_Conditional_0_Template_mtx_time_selectedChange_0_listener($event) {
      ɵɵrestoreView(_r10);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._timeSelected($event));
    })("ampmChange", function MtxCalendar_Case_8_Conditional_0_Template_mtx_time_ampmChange_0_listener($event) {
      ɵɵrestoreView(_r10);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._ampmClicked($event));
    })("clockViewChange", function MtxCalendar_Case_8_Conditional_0_Template_mtx_time_clockViewChange_0_listener($event) {
      ɵɵrestoreView(_r10);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._clockView = $event);
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("AMPM", ctx_r0._AMPM)("clockView", ctx_r0._clockView)("twelvehour", ctx_r0.twelvehour)("dateFilter", ctx_r0.dateFilter)("interval", ctx_r0.timeInterval)("maxDate", ctx_r0.maxDate)("minDate", ctx_r0.minDate)("selected", ctx_r0._activeDate)("actionsPortal", ctx_r0.actionsPortal)("autoFocus", ctx_r0.timeInputAutoFocus);
  }
}
function MtxCalendar_Case_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mtx-clock", 34);
    ɵɵlistener("_userSelection", function MtxCalendar_Case_8_Conditional_1_Template_mtx_clock__userSelection_0_listener() {
      ɵɵrestoreView(_r11);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._userSelected());
    })("activeDateChange", function MtxCalendar_Case_8_Conditional_1_Template_mtx_clock_activeDateChange_0_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._onActiveDateChange($event));
    })("selectedChange", function MtxCalendar_Case_8_Conditional_1_Template_mtx_clock_selectedChange_0_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._dialTimeSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("AMPM", ctx_r0._AMPM)("dateFilter", ctx_r0.dateFilter)("interval", ctx_r0.timeInterval)("maxDate", ctx_r0.maxDate)("minDate", ctx_r0.minDate)("selected", ctx_r0._activeDate)("startView", ctx_r0._clockView)("twelvehour", ctx_r0.twelvehour);
  }
}
function MtxCalendar_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxCalendar_Case_8_Conditional_0_Template, 1, 10, "mtx-time", 31)(1, MtxCalendar_Case_8_Conditional_1_Template, 1, 8, "mtx-clock", 32);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.timeInput ? 0 : 1);
  }
}
function MtxDatetimepickerContent_ng_template_2_Template(rf, ctx) {
}
var _c3 = ["button"];
var _c4 = [[["", "mtxDatetimepickerToggleIcon", ""]]];
var _c5 = ["[mtxDatetimepickerToggleIcon]"];
function MtxDatetimepickerToggle_Conditional_2_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2);
    ɵɵelement(1, "path", 3);
    ɵɵelementEnd();
  }
}
function MtxDatetimepickerToggle_Conditional_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2);
    ɵɵelement(1, "path", 4);
    ɵɵelementEnd();
  }
}
function MtxDatetimepickerToggle_Conditional_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2);
    ɵɵelement(1, "path", 5)(2, "path", 6);
    ɵɵelementEnd();
  }
}
function MtxDatetimepickerToggle_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxDatetimepickerToggle_Conditional_2_Case_0_Template, 2, 0, ":svg:svg", 2)(1, MtxDatetimepickerToggle_Conditional_2_Case_1_Template, 2, 0, ":svg:svg", 2)(2, MtxDatetimepickerToggle_Conditional_2_Case_2_Template, 3, 0, ":svg:svg", 2);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional((tmp_2_0 = ctx_r0.datetimepicker.type) === "time" ? 0 : tmp_2_0 === "datetime" ? 1 : 2);
  }
}
var _c6 = ["*"];
function MtxDatetimepickerActions_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 0);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
}
var MtxDatetimepickerFilterType;
(function(MtxDatetimepickerFilterType2) {
  MtxDatetimepickerFilterType2[MtxDatetimepickerFilterType2["DATE"] = 0] = "DATE";
  MtxDatetimepickerFilterType2[MtxDatetimepickerFilterType2["HOUR"] = 1] = "HOUR";
  MtxDatetimepickerFilterType2[MtxDatetimepickerFilterType2["MINUTE"] = 2] = "MINUTE";
})(MtxDatetimepickerFilterType || (MtxDatetimepickerFilterType = {}));
var activeEventOptions = normalizePassiveListenerOptions({
  passive: false
});
var CLOCK_RADIUS = 50;
var CLOCK_INNER_RADIUS = 27.5;
var CLOCK_OUTER_RADIUS = 41.25;
var CLOCK_TICK_RADIUS = 7.0833;
var MtxClock = class _MtxClock {
  constructor(_elementRef, _adapter, _changeDetectorRef, _document) {
    this._elementRef = _elementRef;
    this._adapter = _adapter;
    this._changeDetectorRef = _changeDetectorRef;
    this._document = _document;
    this.interval = 1;
    this.actionButtons = false;
    this.twelvehour = false;
    this.AMPM = "AM";
    this.selectedChange = new EventEmitter();
    this.activeDateChange = new EventEmitter();
    this._userSelection = new EventEmitter();
    this._hourView = true;
    this._hours = [];
    this._minutes = [];
    this._timeChanged = false;
    this._pointerDown = (event) => {
      this._timeChanged = false;
      this.setTime(event);
      this._bindGlobalEvents(event);
    };
    this._pointerMove = (event) => {
      if (event.cancelable) {
        event.preventDefault();
      }
      this.setTime(event);
    };
    this._pointerUp = (event) => {
      if (event.cancelable) {
        event.preventDefault();
      }
      this._removeGlobalEvents();
      if (this._timeChanged) {
        this.selectedChange.emit(this.activeDate);
        if (this.actionButtons || !this._hourView) {
          this._userSelection.emit();
        }
      }
    };
  }
  /**
   * The date to display in this clock view.
   */
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    const oldActiveDate = this._activeDate;
    this._activeDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
    if (!this._adapter.sameMinute(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }
  /** The currently selected date. */
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._selected = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
    if (this._selected) {
      this.activeDate = this._selected;
    }
  }
  /** The minimum selectable date. */
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
  }
  /** The maximum selectable date. */
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
  }
  /** Whether the clock should be started in hour or minute view. */
  set startView(value) {
    this._hourView = value !== "minute";
  }
  get _hand() {
    const hour = this._adapter.getHour(this.activeDate);
    this._selectedHour = hour;
    this._selectedMinute = this._adapter.getMinute(this.activeDate);
    let deg = 0;
    let radius = CLOCK_OUTER_RADIUS;
    if (this._hourView) {
      const outer = this._selectedHour > 0 && this._selectedHour < 13;
      radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
      if (this.twelvehour) {
        radius = CLOCK_OUTER_RADIUS;
      }
      deg = Math.round(this._selectedHour * (360 / (24 / 2)));
    } else {
      deg = Math.round(this._selectedMinute * (360 / 60));
    }
    return {
      height: `${radius}%`,
      marginTop: `${50 - radius}%`,
      transform: `rotate(${deg}deg)`
    };
  }
  ngAfterContentInit() {
    this.activeDate = this._activeDate || this._adapter.today();
    this._init();
  }
  ngOnDestroy() {
    this._removeGlobalEvents();
  }
  ngOnChanges() {
    this._init();
  }
  /** Binds our global move and end events. */
  _bindGlobalEvents(triggerEvent) {
    const document2 = this._document;
    const isTouch = isTouchEvent(triggerEvent);
    const moveEventName = isTouch ? "touchmove" : "mousemove";
    const endEventName = isTouch ? "touchend" : "mouseup";
    document2.addEventListener(moveEventName, this._pointerMove, activeEventOptions);
    document2.addEventListener(endEventName, this._pointerUp, activeEventOptions);
    if (isTouch) {
      document2.addEventListener("touchcancel", this._pointerUp, activeEventOptions);
    }
  }
  /** Removes any global event listeners that we may have added. */
  _removeGlobalEvents() {
    const document2 = this._document;
    document2.removeEventListener("mousemove", this._pointerMove, activeEventOptions);
    document2.removeEventListener("mouseup", this._pointerUp, activeEventOptions);
    document2.removeEventListener("touchmove", this._pointerMove, activeEventOptions);
    document2.removeEventListener("touchend", this._pointerUp, activeEventOptions);
    document2.removeEventListener("touchcancel", this._pointerUp, activeEventOptions);
  }
  /** Initializes this clock view. */
  _init() {
    this._hours.length = 0;
    this._minutes.length = 0;
    const hourNames = this._adapter.getHourNames();
    const minuteNames = this._adapter.getMinuteNames();
    if (this.twelvehour) {
      const hours = [];
      for (let i = 0; i < hourNames.length; i++) {
        const radian = i / 6 * Math.PI;
        const radius = CLOCK_OUTER_RADIUS;
        const hour = i;
        const date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), hour, 0);
        const enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate, false) >= 0) && (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate, false) <= 0) && (!this.dateFilter || this.dateFilter(date, MtxDatetimepickerFilterType.HOUR));
        hours.push({
          value: i,
          displayValue: i % 12 === 0 ? "12" : hourNames[i % 12],
          enabled,
          top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
          left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
        });
      }
      if (this.AMPM === "AM") {
        this._hours = hours.filter((x) => x.value < 12);
      } else {
        this._hours = hours.filter((x) => x.value >= 12);
      }
    } else {
      for (let i = 0; i < hourNames.length; i++) {
        const radian = i / 6 * Math.PI;
        const outer = i > 0 && i < 13;
        const radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
        const date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), i, 0);
        const enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate, false) >= 0) && (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate, false) <= 0) && (!this.dateFilter || this.dateFilter(date, MtxDatetimepickerFilterType.HOUR));
        this._hours.push({
          value: i,
          displayValue: i === 0 ? "00" : hourNames[i],
          enabled,
          top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
          left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
          fontSize: i > 0 && i < 13 ? "" : "80%"
        });
      }
    }
    for (let i = 0; i < minuteNames.length; i += 5) {
      const radian = i / 30 * Math.PI;
      const date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), i);
      const enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) && (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate) <= 0) && (!this.dateFilter || this.dateFilter(date, MtxDatetimepickerFilterType.MINUTE));
      this._minutes.push({
        value: i,
        displayValue: i === 0 ? "00" : minuteNames[i],
        enabled,
        top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
        left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
      });
    }
  }
  /**
   * Set Time
   * @param event
   */
  setTime(event) {
    const trigger2 = this._elementRef.nativeElement;
    const triggerRect = trigger2.getBoundingClientRect();
    const width = trigger2.offsetWidth;
    const height = trigger2.offsetHeight;
    const {
      pageX,
      pageY
    } = getPointerPositionOnPage(event);
    const x = width / 2 - (pageX - triggerRect.left - window.pageXOffset);
    const y = height / 2 - (pageY - triggerRect.top - window.pageYOffset);
    let radian = Math.atan2(-x, y);
    const unit = Math.PI / (this._hourView ? 6 : this.interval ? 30 / this.interval : 30);
    const z = Math.sqrt(x * x + y * y);
    const outer = this._hourView && z > (width * (CLOCK_OUTER_RADIUS / 100) + width * (CLOCK_INNER_RADIUS / 100)) / 2;
    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }
    let value = Math.round(radian / unit);
    let date;
    if (this._hourView) {
      if (this.twelvehour) {
        if (this.AMPM === "AM") {
          value = value === 0 ? 12 : value;
        } else {
          value = value === 12 ? 0 : value + 12;
        }
      } else {
        if (value === 12) {
          value = 0;
        }
        value = outer ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
      }
      date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), value, this._adapter.getMinute(this.activeDate));
    } else {
      if (this.interval) {
        value *= this.interval;
      }
      if (value === 60) {
        value = 0;
      }
      date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), value);
    }
    if (this.dateFilter && !this.dateFilter(date, this._hourView ? MtxDatetimepickerFilterType.HOUR : MtxDatetimepickerFilterType.MINUTE)) {
      return;
    }
    this._timeChanged = true;
    this.activeDate = date;
    this._changeDetectorRef.markForCheck();
    this.activeDateChange.emit(this.activeDate);
  }
  static {
    this.ɵfac = function MtxClock_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxClock)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DatetimeAdapter), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DOCUMENT));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxClock,
      selectors: [["mtx-clock"]],
      hostAttrs: ["role", "clock", 1, "mtx-clock"],
      hostBindings: function MtxClock_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mousedown", function MtxClock_mousedown_HostBindingHandler($event) {
            return ctx._pointerDown($event);
          })("touchstart", function MtxClock_touchstart_HostBindingHandler($event) {
            return ctx._pointerDown($event);
          });
        }
      },
      inputs: {
        dateFilter: "dateFilter",
        interval: "interval",
        actionButtons: "actionButtons",
        twelvehour: [2, "twelvehour", "twelvehour", booleanAttribute],
        AMPM: "AMPM",
        activeDate: "activeDate",
        selected: "selected",
        minDate: "minDate",
        maxDate: "maxDate",
        startView: "startView"
      },
      outputs: {
        selectedChange: "selectedChange",
        activeDateChange: "activeDateChange",
        _userSelection: "_userSelection"
      },
      exportAs: ["mtxClock"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 9,
      vars: 6,
      consts: [[1, "mtx-clock-wrapper"], [1, "mtx-clock-center"], [1, "mtx-clock-hand"], [1, "mtx-clock-hours"], [1, "mtx-clock-cell", 3, "mtx-clock-cell-disabled", "mtx-clock-cell-selected", "fontSize", "left", "top"], [1, "mtx-clock-minutes"], [1, "mtx-clock-cell", 3, "mtx-clock-cell-disabled", "mtx-clock-cell-selected", "left", "top"], [1, "mtx-clock-cell"]],
      template: function MtxClock_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵelement(1, "div", 1)(2, "div", 2);
          ɵɵelementStart(3, "div", 3);
          ɵɵrepeaterCreate(4, MtxClock_For_5_Template, 2, 11, "div", 4, _forTrack0);
          ɵɵelementEnd();
          ɵɵelementStart(6, "div", 5);
          ɵɵrepeaterCreate(7, MtxClock_For_8_Template, 2, 9, "div", 6, _forTrack0);
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵstyleMap(ctx._hand);
          ɵɵadvance();
          ɵɵclassProp("active", ctx._hourView);
          ɵɵadvance();
          ɵɵrepeater(ctx._hours);
          ɵɵadvance(2);
          ɵɵclassProp("active", !ctx._hourView);
          ɵɵadvance();
          ɵɵrepeater(ctx._minutes);
        }
      },
      styles: ['.mtx-clock{position:relative;display:block;min-width:224px;margin:12px;box-sizing:border-box;-webkit-user-select:none;user-select:none;touch-action:none;font-size:var(--mtx-datetimepicker-clock-text-size, var(--mat-app-title-small-size))}.mtx-clock-wrapper{position:relative;width:100%;height:0;padding-top:100%;border-radius:50%;background-color:var(--mtx-datetimepicker-clock-dial-background-color, var(--mat-app-surface-container-highest))}.mtx-clock-center{position:absolute;top:50%;left:50%;width:3%;height:3%;margin:-1.5%;border-radius:50%;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-hand{position:absolute;inset:0;width:2px;margin:0 auto;transform-origin:bottom;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-hand:before{content:"";position:absolute;top:-4px;left:-3px;width:8px;height:8px;border-radius:50%;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-hours,.mtx-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:.35s;transform:scale(1.2)}.mtx-clock-hours.active,.mtx-clock-minutes.active{opacity:1;visibility:visible;transform:scale(1)}.mtx-clock-minutes{transform:scale(.8)}.mtx-clock-cell{position:absolute;display:flex;width:14.1666%;height:14.1666%;justify-content:center;box-sizing:border-box;border-radius:50%;align-items:center;cursor:pointer;color:var(--mtx-datetimepicker-clock-cell-text-color, var(--mat-app-on-surface))}.mtx-clock-cell.mtx-clock-cell-selected{color:#fff;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-cell:not(.mtx-clock-cell-selected,.mtx-clock-cell-disabled):hover{background-color:var(--mtx-datetimepicker-clock-cell-hover-state-background-color)}.mtx-clock-cell.mtx-clock-cell-disabled{pointer-events:none;color:var(--mtx-datetimepicker-clock-cell-disabled-state-text-color)}\n'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxClock, [{
    type: Component,
    args: [{
      selector: "mtx-clock",
      host: {
        "role": "clock",
        "class": "mtx-clock",
        "(mousedown)": "_pointerDown($event)",
        "(touchstart)": "_pointerDown($event)"
      },
      exportAs: "mtxClock",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: `<div class="mtx-clock-wrapper">
  <div class="mtx-clock-center"></div>
  <div class="mtx-clock-hand" [style]="_hand"></div>
  <div class="mtx-clock-hours" [class.active]="_hourView">
    @for (item of _hours; track item.value) {
      <div
        class="mtx-clock-cell"
        [class.mtx-clock-cell-disabled]="!item.enabled"
        [class.mtx-clock-cell-selected]="_selectedHour === item.value"
        [style.fontSize]="item.fontSize"
        [style.left]="item.left+'%'"
        [style.top]="item.top+'%'">{{ item.displayValue }}</div>
    }
  </div>
  <div class="mtx-clock-minutes" [class.active]="!_hourView">
    @for (item of _minutes; track item.value) {
      <div
        class="mtx-clock-cell"
        [class.mtx-clock-cell-disabled]="!item.enabled"
        [class.mtx-clock-cell-selected]="_selectedMinute === item.value"
        [style.left]="item.left+'%'"
        [style.top]="item.top+'%'">{{ item.displayValue }}</div>
    }
  </div>
</div>
`,
      styles: ['.mtx-clock{position:relative;display:block;min-width:224px;margin:12px;box-sizing:border-box;-webkit-user-select:none;user-select:none;touch-action:none;font-size:var(--mtx-datetimepicker-clock-text-size, var(--mat-app-title-small-size))}.mtx-clock-wrapper{position:relative;width:100%;height:0;padding-top:100%;border-radius:50%;background-color:var(--mtx-datetimepicker-clock-dial-background-color, var(--mat-app-surface-container-highest))}.mtx-clock-center{position:absolute;top:50%;left:50%;width:3%;height:3%;margin:-1.5%;border-radius:50%;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-hand{position:absolute;inset:0;width:2px;margin:0 auto;transform-origin:bottom;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-hand:before{content:"";position:absolute;top:-4px;left:-3px;width:8px;height:8px;border-radius:50%;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-hours,.mtx-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:.35s;transform:scale(1.2)}.mtx-clock-hours.active,.mtx-clock-minutes.active{opacity:1;visibility:visible;transform:scale(1)}.mtx-clock-minutes{transform:scale(.8)}.mtx-clock-cell{position:absolute;display:flex;width:14.1666%;height:14.1666%;justify-content:center;box-sizing:border-box;border-radius:50%;align-items:center;cursor:pointer;color:var(--mtx-datetimepicker-clock-cell-text-color, var(--mat-app-on-surface))}.mtx-clock-cell.mtx-clock-cell-selected{color:#fff;background-color:var(--mtx-datetimepicker-clock-hand-background-color, var(--mat-app-primary))}.mtx-clock-cell:not(.mtx-clock-cell-selected,.mtx-clock-cell-disabled):hover{background-color:var(--mtx-datetimepicker-clock-cell-hover-state-background-color)}.mtx-clock-cell.mtx-clock-cell-disabled{pointer-events:none;color:var(--mtx-datetimepicker-clock-cell-disabled-state-text-color)}\n']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: DatetimeAdapter
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    dateFilter: [{
      type: Input
    }],
    interval: [{
      type: Input
    }],
    actionButtons: [{
      type: Input
    }],
    twelvehour: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    AMPM: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    activeDateChange: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    startView: [{
      type: Input
    }]
  });
})();
function isTouchEvent(event) {
  return event.type[0] === "t";
}
function getPointerPositionOnPage(event) {
  let point;
  if (isTouchEvent(event)) {
    point = event.touches[0] || event.changedTouches[0];
  } else {
    point = event;
  }
  return point;
}
var mtxDatetimepickerAnimations = {
  /** Transforms the height of the datetimepicker's calendar. */
  transformPanel: trigger("transformPanel", [transition("void => enter-dropdown", animate("120ms cubic-bezier(0, 0, 0.2, 1)", keyframes([style({
    opacity: 0,
    transform: "scale(1, 0.8)"
  }), style({
    opacity: 1,
    transform: "scale(1, 1)"
  })]))), transition("void => enter-dialog", animate("150ms cubic-bezier(0, 0, 0.2, 1)", keyframes([style({
    opacity: 0,
    transform: "scale(0.7)"
  }), style({
    transform: "none",
    opacity: 1
  })]))), transition("* => void", animate("100ms linear", style({
    opacity: 0
  })))]),
  /** Fades in the content of the calendar. */
  fadeInCalendar: trigger("fadeInCalendar", [
    state("void", style({
      opacity: 0
    })),
    state("enter", style({
      opacity: 1
    })),
    // TODO(crisbeto): this animation should be removed since it isn't quite on spec, but we
    // need to keep it until #12440 gets in, otherwise the exit animation will look glitchy.
    transition("void => *", animate("120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)"))
  ]),
  slideCalendar: trigger("slideCalendar", [transition("* => left", [animate(180, keyframes([style({
    transform: "translateX(100%)",
    offset: 0.5
  }), style({
    transform: "translateX(-100%)",
    offset: 0.51
  }), style({
    transform: "translateX(0)",
    offset: 1
  })]))]), transition("* => right", [animate(180, keyframes([style({
    transform: "translateX(-100%)",
    offset: 0.5
  }), style({
    transform: "translateX(100%)",
    offset: 0.51
  }), style({
    transform: "translateX(0)",
    offset: 1
  })]))])])
};
function createMissingDateImplError(provider) {
  return Error(`MtxDatetimepicker: No provider found for ${provider}. You must add one of the following to your app config: provideNativeDatetimeAdapter, provideDateFnsDatetimeAdapter,provideLuxonDatetimeAdapter, provideMomentDatetimeAdapter, or provide a custom implementation.`);
}
var MtxCalendarCell = class {
  constructor(value, displayValue, ariaLabel, enabled) {
    this.value = value;
    this.displayValue = displayValue;
    this.ariaLabel = ariaLabel;
    this.enabled = enabled;
  }
};
var MtxCalendarBody = class _MtxCalendarBody {
  constructor() {
    this.numCols = 7;
    this.allowDisabledSelection = false;
    this.activeCell = 0;
    this.selectedValueChange = new EventEmitter();
  }
  /** The number of blank cells to put at the beginning for the first row. */
  get _firstRowOffset() {
    return this.rows && this.rows.length && this.rows[0].length ? this.numCols - this.rows[0].length : 0;
  }
  _cellClicked(cell) {
    if (!this.allowDisabledSelection && !cell.enabled) {
      return;
    }
    this.selectedValueChange.emit(cell.value);
  }
  _isActiveCell(rowIndex, colIndex) {
    let cellNumber = rowIndex * this.numCols + colIndex;
    if (rowIndex) {
      cellNumber -= this._firstRowOffset;
    }
    return cellNumber === this.activeCell;
  }
  static {
    this.ɵfac = function MtxCalendarBody_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxCalendarBody)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxCalendarBody,
      selectors: [["", "mtx-calendar-body", ""]],
      hostAttrs: [1, "mtx-calendar-body"],
      inputs: {
        label: "label",
        rows: "rows",
        todayValue: "todayValue",
        selectedValue: "selectedValue",
        labelMinRequiredCells: "labelMinRequiredCells",
        numCols: "numCols",
        allowDisabledSelection: "allowDisabledSelection",
        activeCell: "activeCell"
      },
      outputs: {
        selectedValueChange: "selectedValueChange"
      },
      exportAs: ["mtxCalendarBody"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      attrs: _c0,
      decls: 3,
      vars: 1,
      consts: [["aria-hidden", "true"], ["role", "row"], [1, "mtx-calendar-body-label"], ["aria-hidden", "true", 1, "mtx-calendar-body-label"], ["role", "gridcell", 1, "mtx-calendar-body-cell", 3, "mtx-calendar-body-active", "mtx-calendar-body-disabled", "tabindex"], ["role", "gridcell", 1, "mtx-calendar-body-cell", 3, "click", "tabindex"], [1, "mtx-calendar-body-cell-content"]],
      template: function MtxCalendarBody_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, MtxCalendarBody_Conditional_0_Template, 3, 2, "tr", 0);
          ɵɵrepeaterCreate(1, MtxCalendarBody_For_2_Template, 4, 1, "tr", 1, ɵɵrepeaterTrackByIdentity);
        }
        if (rf & 2) {
          ɵɵconditional(ctx._firstRowOffset < ctx.labelMinRequiredCells ? 0 : -1);
          ɵɵadvance();
          ɵɵrepeater(ctx.rows);
        }
      },
      styles: [".mtx-calendar-body{min-width:224px}.mtx-calendar-body-today:not(.mtx-calendar-body-selected){border-color:var(--mtx-datetimepicker-calendar-date-today-outline-color, var(--mat-app-primary))}.mtx-calendar-body-label{height:0;line-height:0;text-align:left;padding:7.1428571429% 4.7142857143%;font-size:var(--mtx-datetimepicker-calendar-body-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mtx-datetimepicker-calendar-body-label-text-weight, var(--mat-app-title-small-weight));color:var(--mtx-datetimepicker-calendar-body-label-text-color, var(--mat-app-on-surface))}[dir=rtl] .mtx-calendar-body-label{text-align:right}.mtx-calendar-body-cell{position:relative;width:14.2857142857%;height:0;line-height:0;padding:7.1428571429% 0;text-align:center;outline:none;cursor:pointer}.mtx-calendar-body-disabled{cursor:default;pointer-events:none}.mtx-calendar-body-disabled>.mtx-calendar-body-cell-content:not(.mtx-calendar-body-selected){color:var(--mtx-datetimepicker-calendar-date-disabled-state-text-color)}.mtx-calendar-body-disabled>.mtx-calendar-body-today:not(.mtx-calendar-body-selected){border-color:var(--mtx-datetimepicker-calendar-date-disabled-state-text-color)}.mtx-calendar-body-cell-content{position:absolute;top:5%;left:5%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;border:1px solid transparent;border-radius:999px;color:var(--mtx-datetimepicker-calendar-date-text-color, var(--mat-app-on-surface));border-color:var(--mtx-datetimepicker-calendar-date-outline-color)}.mtx-calendar-body-active>.mtx-calendar-body-cell-content:not(.mtx-calendar-body-selected){background-color:var(--mtx-datetimepicker-calendar-date-focus-state-background-color)}@media (hover: hover){.mtx-calendar-body-cell:not(.mtx-calendar-body-disabled):hover>.mtx-calendar-body-cell-content:not(.mtx-calendar-body-selected){background-color:var(--mtx-datetimepicker-calendar-date-hover-state-background-color)}}.mtx-calendar-body-selected{background-color:var(--mtx-datetimepicker-calendar-date-selected-state-background-color, var(--mat-app-primary));color:var(--mtx-datetimepicker-calendar-date-selected-state-text-color, var(--mat-app-on-primary))}.mtx-calendar-body-disabled>.mtx-calendar-body-selected{background-color:var(--mtx-datetimepicker-calendar-date-selected-disabled-state-background-color)}.mtx-calendar-body-selected.mtx-calendar-body-today{box-shadow:inset 0 0 0 1px var(--mtx-datetimepicker-calendar-date-today-selected-state-outline-color, var(--mat-app-primary))}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxCalendarBody, [{
    type: Component,
    args: [{
      selector: "[mtx-calendar-body]",
      host: {
        class: "mtx-calendar-body"
      },
      exportAs: "mtxCalendarBody",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: `<!--
  If there's not enough space in the first row, create a separate label row. We mark this row as
  aria-hidden because we don't want it to be read out as one of the weeks in the month.
-->
@if (_firstRowOffset < labelMinRequiredCells) {
  <tr aria-hidden="true">
    <td class="mtx-calendar-body-label" [attr.colspan]="numCols">{{ label }}</td>
  </tr>
}

<!-- Create the first row separately so we can include a special spacer cell. -->
@for (row of rows; track row; let rowIndex = $index) {
  <tr role="row">
    <!--
      We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.
    -->
    @if (rowIndex === 0 && _firstRowOffset) {
      <td
        class="mtx-calendar-body-label" [attr.colspan]="_firstRowOffset" aria-hidden="true">
        {{ _firstRowOffset >= labelMinRequiredCells ? label : '' }}
      </td>
    }
    @for (item of row; track item; let colIndex = $index) {
      <td
        role="gridcell"
        class="mtx-calendar-body-cell"
        [class.mtx-calendar-body-active]="_isActiveCell(rowIndex, colIndex)"
        [class.mtx-calendar-body-disabled]="!item.enabled"
        [tabindex]="_isActiveCell(rowIndex, colIndex) ? 0 : -1"
        [attr.data-mat-row]="rowIndex"
        [attr.data-mat-col]="colIndex"
        [attr.aria-label]="item.ariaLabel"
        [attr.aria-disabled]="!item.enabled || null"
        (click)="_cellClicked(item)">
        <div class="mtx-calendar-body-cell-content"
          [class.mtx-calendar-body-selected]="selectedValue === item.value"
          [class.mtx-calendar-body-today]="todayValue === item.value"
          [attr.aria-selected]="selectedValue === item.value">
          {{ item.displayValue }}
        </div>
      </td>
    }
  </tr>
}
`,
      styles: [".mtx-calendar-body{min-width:224px}.mtx-calendar-body-today:not(.mtx-calendar-body-selected){border-color:var(--mtx-datetimepicker-calendar-date-today-outline-color, var(--mat-app-primary))}.mtx-calendar-body-label{height:0;line-height:0;text-align:left;padding:7.1428571429% 4.7142857143%;font-size:var(--mtx-datetimepicker-calendar-body-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mtx-datetimepicker-calendar-body-label-text-weight, var(--mat-app-title-small-weight));color:var(--mtx-datetimepicker-calendar-body-label-text-color, var(--mat-app-on-surface))}[dir=rtl] .mtx-calendar-body-label{text-align:right}.mtx-calendar-body-cell{position:relative;width:14.2857142857%;height:0;line-height:0;padding:7.1428571429% 0;text-align:center;outline:none;cursor:pointer}.mtx-calendar-body-disabled{cursor:default;pointer-events:none}.mtx-calendar-body-disabled>.mtx-calendar-body-cell-content:not(.mtx-calendar-body-selected){color:var(--mtx-datetimepicker-calendar-date-disabled-state-text-color)}.mtx-calendar-body-disabled>.mtx-calendar-body-today:not(.mtx-calendar-body-selected){border-color:var(--mtx-datetimepicker-calendar-date-disabled-state-text-color)}.mtx-calendar-body-cell-content{position:absolute;top:5%;left:5%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;border:1px solid transparent;border-radius:999px;color:var(--mtx-datetimepicker-calendar-date-text-color, var(--mat-app-on-surface));border-color:var(--mtx-datetimepicker-calendar-date-outline-color)}.mtx-calendar-body-active>.mtx-calendar-body-cell-content:not(.mtx-calendar-body-selected){background-color:var(--mtx-datetimepicker-calendar-date-focus-state-background-color)}@media (hover: hover){.mtx-calendar-body-cell:not(.mtx-calendar-body-disabled):hover>.mtx-calendar-body-cell-content:not(.mtx-calendar-body-selected){background-color:var(--mtx-datetimepicker-calendar-date-hover-state-background-color)}}.mtx-calendar-body-selected{background-color:var(--mtx-datetimepicker-calendar-date-selected-state-background-color, var(--mat-app-primary));color:var(--mtx-datetimepicker-calendar-date-selected-state-text-color, var(--mat-app-on-primary))}.mtx-calendar-body-disabled>.mtx-calendar-body-selected{background-color:var(--mtx-datetimepicker-calendar-date-selected-disabled-state-background-color)}.mtx-calendar-body-selected.mtx-calendar-body-today{box-shadow:inset 0 0 0 1px var(--mtx-datetimepicker-calendar-date-today-selected-state-outline-color, var(--mat-app-primary))}\n"]
    }]
  }], null, {
    label: [{
      type: Input
    }],
    rows: [{
      type: Input
    }],
    todayValue: [{
      type: Input
    }],
    selectedValue: [{
      type: Input
    }],
    labelMinRequiredCells: [{
      type: Input
    }],
    numCols: [{
      type: Input
    }],
    allowDisabledSelection: [{
      type: Input
    }],
    activeCell: [{
      type: Input
    }],
    selectedValueChange: [{
      type: Output
    }]
  });
})();
var DAYS_PER_WEEK = 7;
var MtxMonthView = class _MtxMonthView {
  constructor(_adapter, _dateFormats) {
    this._adapter = _adapter;
    this._dateFormats = _dateFormats;
    this.type = "date";
    this.selectedChange = new EventEmitter();
    this._userSelection = new EventEmitter();
    if (!this._adapter) {
      throw createMissingDateImplError("DatetimeAdapter");
    }
    if (!this._dateFormats) {
      throw createMissingDateImplError("MTX_DATETIME_FORMATS");
    }
    const firstDayOfWeek = this._adapter.getFirstDayOfWeek();
    const narrowWeekdays = this._adapter.getDayOfWeekNames("narrow");
    const longWeekdays = this._adapter.getDayOfWeekNames("long");
    const weekdays = longWeekdays.map((long, i) => {
      return {
        long,
        narrow: narrowWeekdays[i]
      };
    });
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
    this._activeDate = this._adapter.today();
  }
  /**
   * The date to display in this month view (everything other than the month and year is ignored).
   */
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    const oldActiveDate = this._activeDate;
    this._activeDate = value || this._adapter.today();
    if (oldActiveDate && this._activeDate && !this._adapter.sameMonthAndYear(oldActiveDate, this._activeDate)) {
      this._init();
      if (this._adapter.isInNextMonth(oldActiveDate, this._activeDate)) {
        this.calendarState("right");
      } else {
        this.calendarState("left");
      }
    }
  }
  /** The currently selected date. */
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._selected = value;
    this._selectedDate = this._getDateInCurrentMonth(this.selected);
  }
  ngAfterContentInit() {
    this._init();
  }
  /** Handles when a new date is selected. */
  _dateSelected(date) {
    const dateObject = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), date, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
    this.selectedChange.emit(dateObject);
    this._activeDate = dateObject;
    if (this.type === "date") {
      this._userSelection.emit();
    }
  }
  _calendarStateDone() {
    this._calendarState = "";
  }
  /** Initializes this month view. */
  _init() {
    this._selectedDate = this._getDateInCurrentMonth(this.selected);
    this._todayDate = this._getDateInCurrentMonth(this._adapter.today());
    const firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
    this._firstWeekOffset = (DAYS_PER_WEEK + this._adapter.getDayOfWeek(firstOfMonth) - this._adapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
    this._createWeekCells();
  }
  /** Creates MdCalendarCells for the dates in this month. */
  _createWeekCells() {
    const daysInMonth = this._adapter.getNumDaysInMonth(this.activeDate);
    const dateNames = this._adapter.getDateNames();
    this._weeks = [[]];
    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
      if (cell === DAYS_PER_WEEK) {
        this._weeks.push([]);
        cell = 0;
      }
      const date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), i + 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
      const enabled = !this.dateFilter || this.dateFilter(date);
      const ariaLabel = this._adapter.format(date, this._dateFormats.display.dateA11yLabel);
      this._weeks[this._weeks.length - 1].push(new MtxCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
    }
  }
  /**
   * Gets the date in this month that the given Date falls on.
   * Returns null if the given Date is in another month.
   */
  _getDateInCurrentMonth(date) {
    return this._adapter.sameMonthAndYear(date, this.activeDate) ? this._adapter.getDate(date) : null;
  }
  calendarState(direction) {
    this._calendarState = direction;
  }
  static {
    this.ɵfac = function MtxMonthView_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxMonthView)(ɵɵdirectiveInject(DatetimeAdapter, 8), ɵɵdirectiveInject(MTX_DATETIME_FORMATS, 8));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxMonthView,
      selectors: [["mtx-month-view"]],
      inputs: {
        type: "type",
        dateFilter: "dateFilter",
        activeDate: "activeDate",
        selected: "selected"
      },
      outputs: {
        selectedChange: "selectedChange",
        _userSelection: "_userSelection"
      },
      exportAs: ["mtxMonthView"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 6,
      vars: 5,
      consts: [["role", "grid", 1, "mtx-calendar-table"], [1, "mtx-calendar-table-header"], ["mtx-calendar-body", "", 3, "selectedValueChange", "rows", "todayValue", "activeCell", "selectedValue"]],
      template: function MtxMonthView_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "table", 0)(1, "thead", 1)(2, "tr");
          ɵɵrepeaterCreate(3, MtxMonthView_For_4_Template, 2, 2, "th", null, ɵɵrepeaterTrackByIdentity);
          ɵɵelementEnd()();
          ɵɵelementStart(5, "tbody", 2);
          ɵɵlistener("@slideCalendar.done", function MtxMonthView_Template_tbody_animation_slideCalendar_done_5_listener() {
            return ctx._calendarStateDone();
          })("selectedValueChange", function MtxMonthView_Template_tbody_selectedValueChange_5_listener($event) {
            return ctx._dateSelected($event);
          });
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵadvance(3);
          ɵɵrepeater(ctx._weekdays);
          ɵɵadvance(2);
          ɵɵproperty("@slideCalendar", ctx._calendarState)("rows", ctx._weeks)("todayValue", ctx._todayDate)("activeCell", ctx._adapter.getDate(ctx.activeDate) - 1)("selectedValue", ctx._selectedDate);
        }
      },
      dependencies: [MtxCalendarBody],
      encapsulation: 2,
      data: {
        animation: [mtxDatetimepickerAnimations.slideCalendar]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxMonthView, [{
    type: Component,
    args: [{
      selector: "mtx-month-view",
      exportAs: "mtxMonthView",
      animations: [mtxDatetimepickerAnimations.slideCalendar],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MtxCalendarBody],
      template: '<table class="mtx-calendar-table" role="grid">\n  <thead class="mtx-calendar-table-header">\n    <tr>\n      @for (day of _weekdays; track day) {\n        <th [attr.aria-label]="day.long">{{day.narrow}}</th>\n      }\n    </tr>\n  </thead>\n  <tbody mtx-calendar-body\n    (@slideCalendar.done)="_calendarStateDone()"\n    [@slideCalendar]="_calendarState"\n    [rows]="_weeks"\n    [todayValue]="_todayDate!"\n    [activeCell]="_adapter.getDate(activeDate) - 1"\n    [selectedValue]="_selectedDate!"\n    (selectedValueChange)="_dateSelected($event)"></tbody>\n</table>\n'
    }]
  }], () => [{
    type: DatetimeAdapter,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MTX_DATETIME_FORMATS]
    }]
  }], {
    type: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }]
  });
})();
var yearsPerPage = 24;
var yearsPerRow = 4;
var MtxMultiYearView = class _MtxMultiYearView {
  constructor(_adapter, _dateFormats) {
    this._adapter = _adapter;
    this._dateFormats = _dateFormats;
    this.type = "date";
    this.selectedChange = new EventEmitter();
    this._userSelection = new EventEmitter();
    if (!this._adapter) {
      throw createMissingDateImplError("DatetimeAdapter");
    }
    if (!this._dateFormats) {
      throw createMissingDateImplError("MTX_DATETIME_FORMATS");
    }
    this._activeDate = this._adapter.today();
  }
  /** The date to display in this multi year view */
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    const oldActiveDate = this._activeDate;
    this._activeDate = value || this._adapter.today();
    if (oldActiveDate && this._activeDate && !isSameMultiYearView(this._adapter, oldActiveDate, this._activeDate, this.minDate, this.maxDate)) {
      this._init();
    }
  }
  /** The currently selected date. */
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._selected = value;
    this._selectedYear = this._selected && this._adapter.getYear(this._selected);
  }
  /** The minimum selectable date. */
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._getValidDateOrNull(this._adapter.deserialize(value));
  }
  /** The maximum selectable date. */
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._getValidDateOrNull(this._adapter.deserialize(value));
  }
  ngAfterContentInit() {
    this._init();
  }
  /** Handles when a new year is selected. */
  _yearSelected(year) {
    const month = this._adapter.getMonth(this.activeDate);
    const normalizedDate = this._adapter.createDatetime(year, month, 1, 0, 0);
    const dateObject = this._adapter.createDatetime(year, month, Math.min(this._adapter.getDate(this.activeDate), this._adapter.getNumDaysInMonth(normalizedDate)), this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
    this.selectedChange.emit(dateObject);
    this._activeDate = dateObject;
    if (this.type === "year") {
      this._userSelection.emit();
    }
  }
  _getActiveCell() {
    return getActiveOffset(this._adapter, this.activeDate, this.minDate, this.maxDate);
  }
  _calendarStateDone() {
    this._calendarState = "";
  }
  /** Initializes this year view. */
  _init() {
    this._todayYear = this._adapter.getYear(this._adapter.today());
    this._yearLabel = this._adapter.getYearName(this.activeDate);
    const activeYear = this._adapter.getYear(this.activeDate);
    const minYearOfPage = activeYear - getActiveOffset(this._adapter, this.activeDate, this.minDate, this.maxDate);
    this._years = [];
    for (let i = 0, row = []; i < yearsPerPage; i++) {
      row.push(minYearOfPage + i);
      if (row.length === yearsPerRow) {
        this._years.push(row.map((year) => this._createCellForYear(year)));
        row = [];
      }
    }
  }
  /** Creates an MtxCalendarCell for the given year. */
  _createCellForYear(year) {
    const yearName = this._adapter.getYearName(this._adapter.createDate(year, 0, 1));
    return new MtxCalendarCell(year, yearName, yearName, this._shouldEnableYear(year));
  }
  /** Whether the given year is enabled. */
  _shouldEnableYear(year) {
    if (year === void 0 || year === null || this.maxDate && year > this._adapter.getYear(this.maxDate) || this.minDate && year < this._adapter.getYear(this.minDate)) {
      return false;
    }
    if (!this.dateFilter) {
      return true;
    }
    const firstOfYear = this._adapter.createDate(year, 0, 1);
    for (let date = firstOfYear; this._adapter.getYear(date) === year; date = this._adapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Gets the year in this years range that the given Date falls on.
   * Returns null if the given Date is not in this range.
   */
  _getYearInCurrentRange(date) {
    const year = this._adapter.getYear(date);
    return this._isInRange(year) ? year : null;
  }
  /**
   * Validate if the current year is in the current range
   * Returns true if is in range else returns false
   */
  _isInRange(year) {
    return true;
  }
  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  _getValidDateOrNull(obj) {
    return this._adapter.isDateInstance(obj) && this._adapter.isValid(obj) ? obj : null;
  }
  static {
    this.ɵfac = function MtxMultiYearView_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxMultiYearView)(ɵɵdirectiveInject(DatetimeAdapter, 8), ɵɵdirectiveInject(MTX_DATETIME_FORMATS, 8));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxMultiYearView,
      selectors: [["mtx-multi-year-view"]],
      inputs: {
        type: "type",
        dateFilter: "dateFilter",
        activeDate: "activeDate",
        selected: "selected",
        minDate: "minDate",
        maxDate: "maxDate"
      },
      outputs: {
        selectedChange: "selectedChange",
        _userSelection: "_userSelection"
      },
      exportAs: ["mtxMultiYearView"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 3,
      vars: 7,
      consts: [["role", "grid", 1, "mtx-calendar-table"], [1, "mtx-calendar-table-header"], ["mtx-calendar-body", "", 3, "selectedValueChange", "todayValue", "rows", "numCols", "activeCell", "allowDisabledSelection", "selectedValue"]],
      template: function MtxMultiYearView_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "table", 0);
          ɵɵelement(1, "thead", 1);
          ɵɵelementStart(2, "tbody", 2);
          ɵɵlistener("@slideCalendar.done", function MtxMultiYearView_Template_tbody_animation_slideCalendar_done_2_listener() {
            return ctx._calendarStateDone();
          })("selectedValueChange", function MtxMultiYearView_Template_tbody_selectedValueChange_2_listener($event) {
            return ctx._yearSelected($event);
          });
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵproperty("@slideCalendar", ctx._calendarState)("todayValue", ctx._todayYear)("rows", ctx._years)("numCols", 4)("activeCell", ctx._getActiveCell())("allowDisabledSelection", true)("selectedValue", ctx._selectedYear);
        }
      },
      dependencies: [MtxCalendarBody],
      encapsulation: 2,
      data: {
        animation: [mtxDatetimepickerAnimations.slideCalendar]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxMultiYearView, [{
    type: Component,
    args: [{
      selector: "mtx-multi-year-view",
      exportAs: "mtxMultiYearView",
      animations: [mtxDatetimepickerAnimations.slideCalendar],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MtxCalendarBody],
      template: '<table class="mtx-calendar-table" role="grid">\n  <thead class="mtx-calendar-table-header"></thead>\n  <tbody mtx-calendar-body\n         (@slideCalendar.done)="_calendarStateDone()"\n         [@slideCalendar]="_calendarState"\n         [todayValue]="_todayYear"\n         [rows]="_years"\n         [numCols]="4"\n         [activeCell]="_getActiveCell()"\n         [allowDisabledSelection]="true"\n         [selectedValue]="_selectedYear!"\n         (selectedValueChange)="_yearSelected($event)"></tbody>\n</table>\n'
    }]
  }], () => [{
    type: DatetimeAdapter,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MTX_DATETIME_FORMATS]
    }]
  }], {
    type: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }]
  });
})();
function isSameMultiYearView(dateAdapter, date1, date2, minDate, maxDate) {
  const year1 = dateAdapter.getYear(date1);
  const year2 = dateAdapter.getYear(date2);
  const startingYear = getStartingYear(dateAdapter, minDate, maxDate);
  return Math.floor((year1 - startingYear) / yearsPerPage) === Math.floor((year2 - startingYear) / yearsPerPage);
}
function getActiveOffset(dateAdapter, activeDate, minDate, maxDate) {
  const activeYear = dateAdapter.getYear(activeDate);
  return euclideanModulo(activeYear - getStartingYear(dateAdapter, minDate, maxDate), yearsPerPage);
}
function getStartingYear(dateAdapter, minDate, maxDate) {
  let startingYear = 0;
  if (maxDate) {
    const maxYear = dateAdapter.getYear(maxDate);
    startingYear = maxYear - yearsPerPage + 1;
  } else if (minDate) {
    startingYear = dateAdapter.getYear(minDate);
  }
  return startingYear;
}
function euclideanModulo(a, b) {
  return (a % b + b) % b;
}
var MtxDatetimepickerIntl = class _MtxDatetimepickerIntl {
  constructor() {
    this.changes = new Subject();
    this.calendarLabel = "Calendar";
    this.openCalendarLabel = "Open calendar";
    this.closeCalendarLabel = "Close calendar";
    this.prevMonthLabel = "Previous month";
    this.nextMonthLabel = "Next month";
    this.prevYearLabel = "Previous year";
    this.nextYearLabel = "Next year";
    this.prevMultiYearLabel = "Previous 24 years";
    this.nextMultiYearLabel = "Next 24 years";
    this.switchToMonthViewLabel = "Choose date";
    this.switchToYearViewLabel = "Choose month";
    this.switchToMultiYearViewLabel = "Choose month and year";
    this.startDateLabel = "Start date";
    this.endDateLabel = "End date";
    this.switchToClockHourViewLabel = "Choose hour";
    this.switchToClockMinuteViewLabel = "Choose minute";
    this.okLabel = "OK";
    this.cancelLabel = "Cancel";
  }
  /** Formats a range of years (used for visuals). */
  formatYearRange(start, end) {
    return `${start} – ${end}`;
  }
  /** Formats a label for a range of years (used by screen readers). */
  formatYearRangeLabel(start, end) {
    return `${start} to ${end}`;
  }
  static {
    this.ɵfac = function MtxDatetimepickerIntl_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerIntl)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _MtxDatetimepickerIntl,
      factory: _MtxDatetimepickerIntl.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function pad(num, size) {
  num = String(num);
  while (num.length < size) num = "0" + num;
  return num;
}
var MtxTimeInput = class _MtxTimeInput {
  set timeInterval(value) {
    this._interval = coerceNumberProperty(value);
  }
  set timeMin(value) {
    this._min = coerceNumberProperty(value);
  }
  set timeMax(value) {
    this._max = coerceNumberProperty(value);
  }
  set timeValue(value) {
    this._value = coerceNumberProperty(value);
    if (!this.hasFocus) {
      this.writeValue(this._value);
    }
    this.writePlaceholder(this._value);
  }
  constructor(element, cdr) {
    this.element = element;
    this.cdr = cdr;
    this._interval = 1;
    this._min = 0;
    this._max = Infinity;
    this.timeValueChanged = new EventEmitter();
    this.keyDownListener = this.keyDownHandler.bind(this);
    this.keyPressListener = this.keyPressHandler.bind(this);
    this.inputEventListener = this.inputChangedHandler.bind(this);
    this.inputElement.addEventListener("keydown", this.keyDownListener, {
      passive: true
    });
    this.inputElement.addEventListener("keypress", this.keyPressListener);
    this.inputElement.addEventListener("input", this.inputEventListener, {
      passive: true
    });
  }
  get hasFocus() {
    return this.element.nativeElement && this.element?.nativeElement === document?.activeElement;
  }
  get inputElement() {
    return this.element.nativeElement;
  }
  // We look here at the placeholder value, because we write '' into the value on focus
  // placeholder should always be up to date with "currentValue"
  get valid() {
    if (this._value) {
      const currentValue = String(this.inputElement.value);
      if (currentValue.length) {
        return this._value == this.inputElement.value;
      } else {
        return this._value == this.inputElement.placeholder;
      }
    }
    return true;
  }
  get invalid() {
    return !this.valid;
  }
  blur() {
    this.writeValue(this._value);
    this.writePlaceholder(this._value);
  }
  focus() {
    this.writeValue("");
  }
  /**
   * Write value to inputElement
   * @param value NumberInput
   */
  writeValue(value) {
    if (value !== "") {
      this.inputElement.value = pad(value, 2);
    } else {
      this.inputElement.value = "";
    }
    this.cdr.markForCheck();
  }
  /**
   * Writes value to placeholder
   * @param value NumberInput
   */
  writePlaceholder(value) {
    this.inputElement.placeholder = pad(value, 2);
    this.cdr.markForCheck();
  }
  keyDownHandler(event) {
    if (String(this.inputElement.value).length > 0) {
      let value = null;
      if (event.keyCode === UP_ARROW) {
        value = coerceNumberProperty(this._value);
        value += this._interval;
        event.stopPropagation();
      } else if (event.keyCode === DOWN_ARROW) {
        value = coerceNumberProperty(this._value);
        value -= this._interval;
        event.stopPropagation();
      }
      if (typeof value === "number") {
        this.writeValue(value);
        this.writePlaceholder(value);
        this.clampInputValue();
        this.timeValueChanged.emit(this._value);
      }
    }
  }
  /**
   * Prevent non number inputs in the inputElement with the exception of Enter/BackSpace
   * @param event KeyboardEvent
   */
  keyPressHandler(event) {
    const key = event?.key ?? null;
    if (isNaN(Number(key)) && key !== "Enter") {
      event.preventDefault();
    }
  }
  inputChangedHandler() {
    this.clampInputValue();
    this.timeValueChanged.emit(this._value);
  }
  clampInputValue() {
    if (this.inputElement?.value === "") {
      return;
    }
    const value = coerceNumberProperty(this.inputElement?.value ?? null);
    if (value || this._min === 0 && value === 0) {
      const clampedValue = Math.min(Math.max(value, this._min), this._max);
      if (clampedValue !== value) {
        this.writeValue(clampedValue);
        this.writePlaceholder(clampedValue);
      }
      this._value = clampedValue;
    }
  }
  /**
   * Remove event listeners on destruction
   */
  ngOnDestroy() {
    this.inputElement.removeEventListener("keydown", this.keyDownListener);
    this.inputElement.removeEventListener("keypress", this.keyPressListener);
    this.inputElement.removeEventListener("input", this.inputEventListener);
  }
  static {
    this.ɵfac = function MtxTimeInput_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxTimeInput)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MtxTimeInput,
      selectors: [["input", 8, "mtx-time-input"]],
      hostBindings: function MtxTimeInput_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("blur", function MtxTimeInput_blur_HostBindingHandler($event) {
            return ctx.blur($event);
          })("focus", function MtxTimeInput_focus_HostBindingHandler($event) {
            return ctx.focus($event);
          });
        }
      },
      inputs: {
        timeInterval: "timeInterval",
        timeMin: "timeMin",
        timeMax: "timeMax",
        timeValue: "timeValue"
      },
      outputs: {
        timeValueChanged: "timeValueChanged"
      },
      exportAs: ["mtxTimeInput"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxTimeInput, [{
    type: Directive,
    args: [{
      selector: "input.mtx-time-input",
      host: {
        "(blur)": "blur($event)",
        "(focus)": "focus($event)"
      },
      exportAs: "mtxTimeInput",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], {
    timeInterval: [{
      type: Input,
      args: ["timeInterval"]
    }],
    timeMin: [{
      type: Input,
      args: ["timeMin"]
    }],
    timeMax: [{
      type: Input,
      args: ["timeMax"]
    }],
    timeValue: [{
      type: Input,
      args: ["timeValue"]
    }],
    timeValueChanged: [{
      type: Output
    }]
  });
})();
var MtxTime = class _MtxTime {
  /** The date to display in this clock view. */
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    this._activeDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
  }
  /** The currently selected date. */
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._selected = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
    if (this._selected) {
      this.activeDate = this._selected;
    }
  }
  /** The minimum selectable date. */
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
  }
  /** The maximum selectable date. */
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
  }
  /** Whether the clock should be started in hour or minute view. */
  get clockView() {
    return this._clockView;
  }
  set clockView(value) {
    this._clockView = value;
  }
  get isHourView() {
    return this._clockView === "hour";
  }
  get isMinuteView() {
    return this._clockView === "hour";
  }
  get hour() {
    if (!this.activeDate) {
      if (this.twelvehour) {
        return "12";
      } else {
        return "00";
      }
    }
    const hour = Number(this._adapter.getHour(this.activeDate));
    if (!this.twelvehour) {
      return this.prefixWithZero(hour);
    }
    if (hour === 0) {
      return "12";
    } else {
      return this.prefixWithZero(hour > 12 ? hour - 12 : hour);
    }
  }
  get minute() {
    if (this.activeDate) {
      return this.prefixWithZero(this._adapter.getMinute(this.activeDate));
    }
    return "00";
  }
  prefixWithZero(value) {
    if (value < 10) {
      return "0" + String(value);
    }
    return String(value);
  }
  constructor(_adapter, _changeDetectorRef, _datetimepickerIntl) {
    this._adapter = _adapter;
    this._changeDetectorRef = _changeDetectorRef;
    this._datetimepickerIntl = _datetimepickerIntl;
    this.selectedChange = new EventEmitter();
    this.activeDateChange = new EventEmitter();
    this._userSelection = new EventEmitter();
    this.ampmChange = new EventEmitter();
    this.clockViewChange = new EventEmitter();
    this.interval = 1;
    this.actionsPortal = null;
    this.autoFocus = true;
    this.twelvehour = false;
    this.AMPM = "AM";
    this._clockView = "hour";
    this.datetimepickerIntlChangesSubscription = this._datetimepickerIntl.changes.subscribe(() => {
      this._changeDetectorRef.detectChanges();
    });
  }
  ngOnChanges(changes) {
    if (changes.clockView) {
      if (changes.clockView.currentValue !== changes.clockView.previousValue && this.autoFocus) {
        this.focusInputElement();
      }
    }
  }
  ngAfterViewInit() {
    if (this.autoFocus) {
      this.focusInputElement();
    }
  }
  ngOnDestroy() {
    if (this.datetimepickerIntlChangesSubscription) {
      this.datetimepickerIntlChangesSubscription.unsubscribe();
    }
  }
  focusInputElement() {
    if (this.clockView === "hour") {
      if (this.hourInputElement) {
        this.hourInputElement.nativeElement.focus();
      }
    } else {
      if (this.minuteInputElement) {
        this.minuteInputElement.nativeElement.focus();
      }
    }
  }
  _handleHourInputChange(value) {
    const hour = coerceNumberProperty(value);
    if (hour || hour === 0) {
      const newValue = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._updateHourForAmPm(hour), this._adapter.getMinute(this.activeDate));
      this._activeDate = this._adapter.clampDate(newValue, this.minDate, this.maxDate);
      this.activeDateChange.emit(this.activeDate);
      if (this.actionsPortal) {
        this.selectedChange.emit(this.activeDate);
      }
      if (this.hourInputDirective) {
        this.hourInputDirective.timeValue = this.hour;
      }
    }
  }
  _updateHourForAmPm(value) {
    if (!this.twelvehour) {
      return value;
    }
    if (this.AMPM === "AM") {
      if (value === 0 || value === 12) {
        return 0;
      }
      return value;
    } else {
      if (value === 0 || value === 12) {
        return 12;
      }
      return value + 12;
    }
  }
  _handleMinuteInputChange(value) {
    const minute = coerceNumberProperty(value);
    if (minute || minute === 0) {
      const newValue = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), minute);
      this._activeDate = this._adapter.clampDate(newValue, this.minDate, this.maxDate);
      this.activeDateChange.emit(this.activeDate);
      if (this.actionsPortal) {
        this.selectedChange.emit(this.activeDate);
      }
      if (this.minuteInputDirective) {
        this.minuteInputDirective.timeValue = this.minute;
      }
    }
  }
  _handleFocus(clockView) {
    this.clockView = clockView;
    this.clockViewChange.emit(clockView);
  }
  _timeSelected(date) {
    if (this.clockView === "hour") {
      this.clockView = "minute";
    }
    this._activeDate = this.selected = date;
  }
  _onActiveDateChange(date) {
    this._activeDate = date;
    this.activeDateChange.emit(date);
  }
  _handleSelection() {
    if (this.actionsPortal && this._selected) {
      this.selectedChange.emit(this._selected);
    }
  }
  _handleOk() {
    if (this._selected) {
      this.selectedChange.emit(this._selected);
    }
    this._userSelection.emit();
  }
  _handleCancel() {
    this._userSelection.emit();
  }
  static {
    this.ɵfac = function MtxTime_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxTime)(ɵɵdirectiveInject(DatetimeAdapter), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(MtxDatetimepickerIntl));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxTime,
      selectors: [["mtx-time"]],
      viewQuery: function MtxTime_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c1, 5, ElementRef);
          ɵɵviewQuery(_c1, 5, MtxTimeInput);
          ɵɵviewQuery(_c2, 5, ElementRef);
          ɵɵviewQuery(_c2, 5, MtxTimeInput);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.hourInputElement = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.hourInputDirective = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.minuteInputElement = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.minuteInputDirective = _t.first);
        }
      },
      hostAttrs: [1, "mtx-time"],
      inputs: {
        dateFilter: "dateFilter",
        interval: "interval",
        actionsPortal: "actionsPortal",
        autoFocus: [2, "autoFocus", "autoFocus", booleanAttribute],
        twelvehour: [2, "twelvehour", "twelvehour", booleanAttribute],
        AMPM: "AMPM",
        activeDate: "activeDate",
        selected: "selected",
        minDate: "minDate",
        maxDate: "maxDate",
        clockView: "clockView"
      },
      outputs: {
        selectedChange: "selectedChange",
        activeDateChange: "activeDateChange",
        _userSelection: "_userSelection",
        ampmChange: "ampmChange",
        clockViewChange: "clockViewChange"
      },
      exportAs: ["mtxTime"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 11,
      vars: 26,
      consts: [["hourInput", "mtxTimeInput"], ["minuteInput", "mtxTimeInput"], [1, "mtx-time-input-wrapper"], [1, "mtx-time-input-inner"], ["type", "text", "inputmode", "numeric", "maxlength", "2", 1, "mtx-time-input", 3, "timeValueChanged", "focus", "timeMin", "timeMax", "timeValue"], [1, "mtx-time-seperator"], ["type", "text", "inputmode", "numeric", "maxlength", "2", 1, "mtx-time-input", 3, "timeValueChanged", "focus", "timeMin", "timeMax", "timeValue", "timeInterval"], [1, "mtx-time-ampm"], [3, "selectedChange", "activeDateChange", "_userSelection", "AMPM", "dateFilter", "actionButtons", "interval", "maxDate", "minDate", "selected", "startView", "twelvehour"], [1, "mtx-time-button-wrapper"], ["mat-button", "", "type", "button", "aria-label", "AM", 1, "mtx-time-am", 3, "keydown", "click"], ["mat-button", "", "type", "button", "aria-label", "PM", 1, "mtx-time-pm", 3, "keydown", "click"], ["mat-button", "", "type", "button", 1, "mtx-time-cancel-button", 3, "click"], ["mat-button", "", "type", "button", 1, "mtx-time-ok-button", 3, "click", "disabled"]],
      template: function MtxTime_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "input", 4, 0);
          ɵɵlistener("timeValueChanged", function MtxTime_Template_input_timeValueChanged_2_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._handleHourInputChange($event));
          })("focus", function MtxTime_Template_input_focus_2_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._handleFocus("hour"));
          });
          ɵɵelementEnd();
          ɵɵelementStart(4, "div", 5);
          ɵɵtext(5, ":");
          ɵɵelementEnd();
          ɵɵelementStart(6, "input", 6, 1);
          ɵɵlistener("timeValueChanged", function MtxTime_Template_input_timeValueChanged_6_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._handleMinuteInputChange($event));
          })("focus", function MtxTime_Template_input_focus_6_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._handleFocus("minute"));
          });
          ɵɵelementEnd();
          ɵɵtemplate(8, MtxTime_Conditional_8_Template, 5, 4, "div", 7);
          ɵɵelementEnd()();
          ɵɵelementStart(9, "mtx-clock", 8);
          ɵɵlistener("selectedChange", function MtxTime_Template_mtx_clock_selectedChange_9_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._timeSelected($event));
          })("activeDateChange", function MtxTime_Template_mtx_clock_activeDateChange_9_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._onActiveDateChange($event));
          })("_userSelection", function MtxTime_Template_mtx_clock__userSelection_9_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx._handleSelection());
          });
          ɵɵelementEnd();
          ɵɵtemplate(10, MtxTime_Conditional_10_Template, 5, 3, "div", 9);
        }
        if (rf & 2) {
          const hourInput_r5 = ɵɵreference(3);
          const minuteInput_r6 = ɵɵreference(7);
          ɵɵadvance(2);
          ɵɵclassProp("mtx-time-input-active", ctx.clockView === "hour")("mtx-time-input-warning", !hourInput_r5.valid);
          ɵɵproperty("timeMin", ctx.twelvehour ? 1 : 0)("timeMax", ctx.twelvehour ? 12 : 23)("timeValue", ctx.hour);
          ɵɵadvance(4);
          ɵɵclassProp("mtx-time-input-active", ctx.clockView === "minute")("mtx-time-input-warning", !minuteInput_r6.valid);
          ɵɵproperty("timeMin", 0)("timeMax", 59)("timeValue", ctx.minute)("timeInterval", ctx.interval);
          ɵɵadvance(2);
          ɵɵconditional(ctx.twelvehour ? 8 : -1);
          ɵɵadvance();
          ɵɵproperty("AMPM", ctx.AMPM)("dateFilter", ctx.dateFilter)("actionButtons", !!ctx.actionsPortal)("interval", ctx.interval)("maxDate", ctx.maxDate)("minDate", ctx.minDate)("selected", ctx.selected)("startView", ctx.clockView)("twelvehour", ctx.twelvehour);
          ɵɵadvance();
          ɵɵconditional(!ctx.actionsPortal ? 10 : -1);
        }
      },
      dependencies: [MatButton, MtxClock, MtxTimeInput],
      styles: [".mtx-time{display:block;outline:none;-webkit-user-select:none;user-select:none}.mtx-time-input-wrapper{padding:8px 0;text-align:center}.mtx-time-input-inner{display:inline-flex;height:56px}.mtx-time-input{box-sizing:border-box;width:72px;height:100%;padding:0;font-size:36px;text-align:center;border:2px solid transparent;appearance:none;outline:none;border-radius:var(--mtx-datetimepicker-selector-container-shape, var(--mat-app-corner-small));background-color:var(--mtx-datetimepicker-time-input-background-color, var(--mat-app-surface-container-highest));color:var(--mtx-datetimepicker-time-input-text-color, var(--mat-app-on-surface))}.mtx-time-input.mtx-time-input-active{background-color:var(--mtx-datetimepicker-time-input-active-state-background-color, var(--mat-app-primary-container));color:var(--mtx-datetimepicker-time-input-active-state-text-color, var(--mat-app-on-primary-container))}.mtx-time-input.mtx-time-input-active:focus{border-color:var(--mtx-datetimepicker-time-input-focus-state-outline-color, var(--mat-app-primary));background-color:var(--mtx-datetimepicker-time-input-focus-state-background-color, var(--mat-app-primary-container))}.mtx-time-input.mtx-time-input-active:focus::placeholder{color:var(--mtx-datetimepicker-time-input-focus-state-placeholder-text-color, var(--mat-app-on-primary-container))}.mtx-time-input.mtx-time-input-warning{border-color:var(--mtx-datetimepicker-time-input-warn-state-outline-color, var(--mat-app-error))}.mtx-time-seperator{display:inline-flex;justify-content:center;align-items:center;width:24px;font-size:36px}.mtx-time-ampm{display:inline-flex;flex-direction:column;margin-left:12px}[dir=rtl] .mtx-time-ampm{margin-left:auto;margin-right:12px}.mtx-time-ampm .mtx-time-am,.mtx-time-ampm .mtx-time-pm{--mdc-text-button-label-text-weight: 400;flex:1;width:40px;min-width:auto;border-width:1px;border-style:solid;--mdc-text-button-label-text-color: var(--mtx-datetimepicker-time-ampm-text-color, var(--mat-app-on-surface));--mdc-text-button-container-shape: var(--mtx-datetimepicker-selector-container-shape, var(--mat-app-corner-small));border-color:var(--mtx-datetimepicker-time-ampm-outline-color, var(--mat-app-outline))}.mtx-time-ampm .mtx-time-am.mtx-time-ampm-active,.mtx-time-ampm .mtx-time-pm.mtx-time-ampm-active{--mdc-text-button-label-text-weight: 500;--mdc-text-button-label-text-color: var(--mtx-datetimepicker-time-ampm-selected-state-text-color, var(--mat-app-on-tertiary-container));background-color:var(--mtx-datetimepicker-time-ampm-selected-state-background-color, var(--mat-app-tertiary-container))}.mtx-time-ampm .mtx-time-am .mat-mdc-button-touch-target,.mtx-time-ampm .mtx-time-pm .mat-mdc-button-touch-target{height:100%}.mtx-time-ampm .mtx-time-am{border-bottom-left-radius:0;border-bottom-right-radius:0}.mtx-time-ampm .mtx-time-pm{border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.mtx-time-button-wrapper{display:flex;justify-content:flex-end;padding-top:8px}.mtx-time-button-wrapper .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mtx-time-button-wrapper .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxTime, [{
    type: Component,
    args: [{
      selector: "mtx-time",
      exportAs: "mtxTime",
      host: {
        class: "mtx-time"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatButton, MtxClock, MtxTimeInput],
      template: `<div class="mtx-time-input-wrapper">
  <div class="mtx-time-input-inner">
    <input class="mtx-time-input"
      [class.mtx-time-input-active]="clockView === 'hour'"
      [class.mtx-time-input-warning]="!hourInput.valid"
      #hourInput="mtxTimeInput"
      type="text"
      inputmode="numeric"
      maxlength="2"
      [timeMin]="twelvehour ? 1 : 0"
      [timeMax]="twelvehour ? 12 : 23"
      [timeValue]="hour"
      (timeValueChanged)="_handleHourInputChange($event)"
      (focus)="_handleFocus('hour')" />

    <div class="mtx-time-seperator">:</div>

    <input class="mtx-time-input"
      [class.mtx-time-input-active]="clockView === 'minute'"
      [class.mtx-time-input-warning]="!minuteInput.valid"
      #minuteInput="mtxTimeInput"
      type="text"
      inputmode="numeric"
      maxlength="2"
      [timeMin]="0"
      [timeMax]="59"
      [timeValue]="minute"
      (timeValueChanged)="_handleMinuteInputChange($event)"
      [timeInterval]="interval"
      (focus)="_handleFocus('minute')" />

    @if (twelvehour) {
      <div class="mtx-time-ampm">
        <button mat-button type="button" class="mtx-time-am"
          [class.mtx-time-ampm-active]="AMPM === 'AM'" aria-label="AM"
          (keydown)="$event.stopPropagation()"
          (click)="ampmChange.emit('AM')">AM</button>
        <button mat-button type="button" class="mtx-time-pm"
          [class.mtx-time-ampm-active]="AMPM === 'PM'" aria-label="PM"
          (keydown)="$event.stopPropagation()"
          (click)="ampmChange.emit('PM')">PM</button>
      </div>
    }
  </div>
</div>

<mtx-clock (selectedChange)="_timeSelected($event)"
  (activeDateChange)="_onActiveDateChange($event)"
  (_userSelection)="_handleSelection()"
  [AMPM]="AMPM"
  [dateFilter]="dateFilter"
  [actionButtons]="!!actionsPortal"
  [interval]="interval"
  [maxDate]="maxDate"
  [minDate]="minDate"
  [selected]="selected"
  [startView]="clockView"
  [twelvehour]="twelvehour">
</mtx-clock>

@if (!actionsPortal) {
  <div class="mtx-time-button-wrapper">
    <button class="mtx-time-cancel-button" mat-button type="button" (click)="_handleCancel()">
      {{ _datetimepickerIntl.cancelLabel }}
    </button>
    <button class="mtx-time-ok-button" mat-button type="button" (click)="_handleOk()"
      [disabled]="minuteInputDirective?.invalid || hourInputDirective?.invalid">
      {{ _datetimepickerIntl.okLabel }}
    </button>
  </div>
}
`,
      styles: [".mtx-time{display:block;outline:none;-webkit-user-select:none;user-select:none}.mtx-time-input-wrapper{padding:8px 0;text-align:center}.mtx-time-input-inner{display:inline-flex;height:56px}.mtx-time-input{box-sizing:border-box;width:72px;height:100%;padding:0;font-size:36px;text-align:center;border:2px solid transparent;appearance:none;outline:none;border-radius:var(--mtx-datetimepicker-selector-container-shape, var(--mat-app-corner-small));background-color:var(--mtx-datetimepicker-time-input-background-color, var(--mat-app-surface-container-highest));color:var(--mtx-datetimepicker-time-input-text-color, var(--mat-app-on-surface))}.mtx-time-input.mtx-time-input-active{background-color:var(--mtx-datetimepicker-time-input-active-state-background-color, var(--mat-app-primary-container));color:var(--mtx-datetimepicker-time-input-active-state-text-color, var(--mat-app-on-primary-container))}.mtx-time-input.mtx-time-input-active:focus{border-color:var(--mtx-datetimepicker-time-input-focus-state-outline-color, var(--mat-app-primary));background-color:var(--mtx-datetimepicker-time-input-focus-state-background-color, var(--mat-app-primary-container))}.mtx-time-input.mtx-time-input-active:focus::placeholder{color:var(--mtx-datetimepicker-time-input-focus-state-placeholder-text-color, var(--mat-app-on-primary-container))}.mtx-time-input.mtx-time-input-warning{border-color:var(--mtx-datetimepicker-time-input-warn-state-outline-color, var(--mat-app-error))}.mtx-time-seperator{display:inline-flex;justify-content:center;align-items:center;width:24px;font-size:36px}.mtx-time-ampm{display:inline-flex;flex-direction:column;margin-left:12px}[dir=rtl] .mtx-time-ampm{margin-left:auto;margin-right:12px}.mtx-time-ampm .mtx-time-am,.mtx-time-ampm .mtx-time-pm{--mdc-text-button-label-text-weight: 400;flex:1;width:40px;min-width:auto;border-width:1px;border-style:solid;--mdc-text-button-label-text-color: var(--mtx-datetimepicker-time-ampm-text-color, var(--mat-app-on-surface));--mdc-text-button-container-shape: var(--mtx-datetimepicker-selector-container-shape, var(--mat-app-corner-small));border-color:var(--mtx-datetimepicker-time-ampm-outline-color, var(--mat-app-outline))}.mtx-time-ampm .mtx-time-am.mtx-time-ampm-active,.mtx-time-ampm .mtx-time-pm.mtx-time-ampm-active{--mdc-text-button-label-text-weight: 500;--mdc-text-button-label-text-color: var(--mtx-datetimepicker-time-ampm-selected-state-text-color, var(--mat-app-on-tertiary-container));background-color:var(--mtx-datetimepicker-time-ampm-selected-state-background-color, var(--mat-app-tertiary-container))}.mtx-time-ampm .mtx-time-am .mat-mdc-button-touch-target,.mtx-time-ampm .mtx-time-pm .mat-mdc-button-touch-target{height:100%}.mtx-time-ampm .mtx-time-am{border-bottom-left-radius:0;border-bottom-right-radius:0}.mtx-time-ampm .mtx-time-pm{border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.mtx-time-button-wrapper{display:flex;justify-content:flex-end;padding-top:8px}.mtx-time-button-wrapper .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mtx-time-button-wrapper .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"]
    }]
  }], () => [{
    type: DatetimeAdapter
  }, {
    type: ChangeDetectorRef
  }, {
    type: MtxDatetimepickerIntl
  }], {
    selectedChange: [{
      type: Output
    }],
    activeDateChange: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    ampmChange: [{
      type: Output
    }],
    clockViewChange: [{
      type: Output
    }],
    dateFilter: [{
      type: Input
    }],
    interval: [{
      type: Input
    }],
    actionsPortal: [{
      type: Input
    }],
    autoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hourInputElement: [{
      type: ViewChild,
      args: ["hourInput", {
        read: ElementRef
      }]
    }],
    hourInputDirective: [{
      type: ViewChild,
      args: ["hourInput", {
        read: MtxTimeInput
      }]
    }],
    minuteInputElement: [{
      type: ViewChild,
      args: ["minuteInput", {
        read: ElementRef
      }]
    }],
    minuteInputDirective: [{
      type: ViewChild,
      args: ["minuteInput", {
        read: MtxTimeInput
      }]
    }],
    twelvehour: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    AMPM: [{
      type: Input
    }],
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    clockView: [{
      type: Input
    }]
  });
})();
var MtxYearView = class _MtxYearView {
  constructor(_adapter, _dateFormats) {
    this._adapter = _adapter;
    this._dateFormats = _dateFormats;
    this.type = "date";
    this.selectedChange = new EventEmitter();
    this._userSelection = new EventEmitter();
    if (!this._adapter) {
      throw createMissingDateImplError("DatetimeAdapter");
    }
    if (!this._dateFormats) {
      throw createMissingDateImplError("MTX_DATETIME_FORMATS");
    }
    this._activeDate = this._adapter.today();
  }
  /** The date to display in this year view (everything other than the year is ignored). */
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    const oldActiveDate = this._activeDate;
    this._activeDate = value || this._adapter.today();
    if (oldActiveDate && this._activeDate && !this._adapter.sameYear(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }
  /** The currently selected date. */
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._selected = value;
    this._selectedMonth = this._getMonthInCurrentYear(this.selected);
  }
  ngAfterContentInit() {
    this._init();
  }
  /** Handles when a new month is selected. */
  _monthSelected(month) {
    const normalizedDate = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, 0, 0);
    const dateObject = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, Math.min(this._adapter.getDate(this.activeDate), this._adapter.getNumDaysInMonth(normalizedDate)), this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
    this.selectedChange.emit(dateObject);
    this._activeDate = dateObject;
    if (this.type === "month") {
      this._userSelection.emit();
    }
  }
  _calendarStateDone() {
    this._calendarState = "";
  }
  /** Initializes this month view. */
  _init() {
    this._selectedMonth = this._getMonthInCurrentYear(this.selected);
    this._todayMonth = this._getMonthInCurrentYear(this._adapter.today());
    this._yearLabel = this._adapter.getYearName(this.activeDate);
    const monthNames = this._adapter.getMonthNames("short");
    this._months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map((row) => row.map((month) => this._createCellForMonth(month, monthNames[month])));
  }
  /**
   * Gets the month in this year that the given Date falls on.
   * Returns null if the given Date is in another year.
   */
  _getMonthInCurrentYear(date) {
    return this._adapter.sameYear(date, this.activeDate) ? this._adapter.getMonth(date) : null;
  }
  /** Creates an MdCalendarCell for the given month. */
  _createCellForMonth(month, monthName) {
    const ariaLabel = this._adapter.format(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)), this._dateFormats.display.monthYearA11yLabel);
    return new MtxCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
  }
  // private calendarState(direction: string): void {
  //   this._calendarState = direction;
  // }
  /** Whether the given month is enabled. */
  _isMonthEnabled(month) {
    if (!this.dateFilter) {
      return true;
    }
    const firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
    for (let date = firstOfMonth; this._adapter.getMonth(date) === month; date = this._adapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }
    return false;
  }
  static {
    this.ɵfac = function MtxYearView_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxYearView)(ɵɵdirectiveInject(DatetimeAdapter, 8), ɵɵdirectiveInject(MTX_DATETIME_FORMATS, 8));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxYearView,
      selectors: [["mtx-year-view"]],
      inputs: {
        type: "type",
        dateFilter: "dateFilter",
        activeDate: "activeDate",
        selected: "selected"
      },
      outputs: {
        selectedChange: "selectedChange",
        _userSelection: "_userSelection"
      },
      exportAs: ["mtxYearView"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 3,
      vars: 9,
      consts: [["role", "grid", 1, "mtx-calendar-table"], [1, "mtx-calendar-table-header"], ["mtx-calendar-body", "", 3, "selectedValueChange", "label", "rows", "todayValue", "labelMinRequiredCells", "numCols", "activeCell", "selectedValue", "allowDisabledSelection"]],
      template: function MtxYearView_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "table", 0);
          ɵɵelement(1, "thead", 1);
          ɵɵelementStart(2, "tbody", 2);
          ɵɵlistener("@slideCalendar.done", function MtxYearView_Template_tbody_animation_slideCalendar_done_2_listener() {
            return ctx._calendarStateDone();
          })("selectedValueChange", function MtxYearView_Template_tbody_selectedValueChange_2_listener($event) {
            return ctx._monthSelected($event);
          });
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵproperty("@slideCalendar", ctx._calendarState)("label", ctx._yearLabel)("rows", ctx._months)("todayValue", ctx._todayMonth)("labelMinRequiredCells", 2)("numCols", 4)("activeCell", ctx._adapter.getMonth(ctx.activeDate))("selectedValue", ctx._selectedMonth)("allowDisabledSelection", true);
        }
      },
      dependencies: [MtxCalendarBody],
      encapsulation: 2,
      data: {
        animation: [mtxDatetimepickerAnimations.slideCalendar]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxYearView, [{
    type: Component,
    args: [{
      selector: "mtx-year-view",
      exportAs: "mtxYearView",
      animations: [mtxDatetimepickerAnimations.slideCalendar],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MtxCalendarBody],
      template: '<table class="mtx-calendar-table" role="grid">\n  <thead class="mtx-calendar-table-header"></thead>\n  <tbody mtx-calendar-body\n         (@slideCalendar.done)="_calendarStateDone()"\n         [@slideCalendar]="_calendarState"\n         [label]="_yearLabel"\n         [rows]="_months"\n         [todayValue]="_todayMonth!"\n         [labelMinRequiredCells]="2"\n         [numCols]="4"\n         [activeCell]="_adapter.getMonth(activeDate)"\n         [selectedValue]="_selectedMonth!"\n         (selectedValueChange)="_monthSelected($event)"\n         [allowDisabledSelection]="true"></tbody>\n</table>\n'
    }]
  }], () => [{
    type: DatetimeAdapter,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MTX_DATETIME_FORMATS]
    }]
  }], {
    type: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }]
  });
})();
var MtxCalendar = class _MtxCalendar {
  constructor(_elementRef, _intl, _ngZone, _adapter, _dateFormats, _changeDetectorRef) {
    this._elementRef = _elementRef;
    this._intl = _intl;
    this._ngZone = _ngZone;
    this._adapter = _adapter;
    this._dateFormats = _dateFormats;
    this.multiYearSelector = false;
    this.twelvehour = false;
    this.startView = "month";
    this.timeInterval = 1;
    this.preventSameDateTimeSelection = false;
    this.actionsPortal = null;
    this.selectedChange = new EventEmitter();
    this.viewChanged = new EventEmitter();
    this._userSelection = new EventEmitter();
    this._clockView = "hour";
    this._injector = inject(Injector);
    this._type = "date";
    this.timeInput = false;
    this.timeInputAutoFocus = true;
    this._dateFilterForViews = (date) => {
      return !!date && (!this.dateFilter || this.dateFilter(date, MtxDatetimepickerFilterType.DATE)) && (!this.minDate || this._adapter.compareDate(date, this.minDate) >= 0) && (!this.maxDate || this._adapter.compareDate(date, this.maxDate) <= 0);
    };
    if (!this._adapter) {
      throw createMissingDateImplError("DatetimeAdapter");
    }
    if (!this._dateFormats) {
      throw createMissingDateImplError("MTX_DATETIME_FORMATS");
    }
    this._intlChanges = _intl.changes.subscribe(() => _changeDetectorRef.markForCheck());
  }
  /** The display type of datetimepicker. */
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value || "date";
    if (this.type === "year") {
      this.multiYearSelector = true;
    }
  }
  /** A date representing the period (month or year) to start the calendar in. */
  get startAt() {
    return this._startAt;
  }
  set startAt(value) {
    this._startAt = this._adapter.getValidDateOrNull(value);
  }
  /** The currently selected date. */
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._selected = this._adapter.getValidDateOrNull(value);
  }
  /** The minimum selectable date. */
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._adapter.getValidDateOrNull(value);
  }
  /** The maximum selectable date. */
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._adapter.getValidDateOrNull(value);
  }
  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  get _activeDate() {
    return this._clampedActiveDate;
  }
  set _activeDate(value) {
    const oldActiveDate = this._clampedActiveDate;
    this._clampedActiveDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
    this._selectAMPM(this._clampedActiveDate);
    if (oldActiveDate && this._clampedActiveDate && this.currentView === "month" && !this._adapter.sameMonthAndYear(oldActiveDate, this._clampedActiveDate)) {
      if (this._adapter.isInNextMonth(oldActiveDate, this._clampedActiveDate)) {
        this.calendarState("right");
      } else {
        this.calendarState("left");
      }
    }
  }
  /** Whether the calendar is in month view. */
  get currentView() {
    return this._currentView;
  }
  set currentView(view) {
    this._currentView = view;
    this.viewChanged.emit(view);
  }
  get _yearPeriodText() {
    if (this.currentView === "multi-year") {
      const activeYear = this._adapter.getYear(this._activeDate);
      const minYearOfPage = activeYear - getActiveOffset(this._adapter, this._activeDate, this.minDate, this.maxDate);
      const maxYearOfPage = minYearOfPage + yearsPerPage - 1;
      const minYearName = this._adapter.getYearName(this._adapter.createDate(minYearOfPage, 0, 1));
      const maxYearName = this._adapter.getYearName(this._adapter.createDate(maxYearOfPage, 0, 1));
      return this._intl.formatYearRange(minYearName, maxYearName);
    }
    return this.currentView === "month" ? this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)] : this._adapter.getYearName(this._activeDate);
  }
  get _yearButtonText() {
    return this._adapter.getYearName(this._activeDate);
  }
  get _yearButtonLabel() {
    return this.multiYearSelector ? this._intl.switchToMultiYearViewLabel : this._intl.switchToYearViewLabel;
  }
  get _dateButtonText() {
    switch (this.type) {
      case "month":
        return this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)];
      default:
        return this._adapter.format(this._activeDate, this._dateFormats.display.popupHeaderDateLabel);
    }
  }
  get _dateButtonLabel() {
    return this._intl.switchToMonthViewLabel;
  }
  get _hoursButtonText() {
    let hour = this._adapter.getHour(this._activeDate);
    if (this.twelvehour) {
      if (hour === 0) {
        hour = 24;
      }
      hour = hour > 12 ? hour - 12 : hour;
    }
    return this._2digit(hour);
  }
  get _hourButtonLabel() {
    return this._intl.switchToClockHourViewLabel;
  }
  get _minutesButtonText() {
    return this._2digit(this._adapter.getMinute(this._activeDate));
  }
  get _minuteButtonLabel() {
    return this._intl.switchToClockMinuteViewLabel;
  }
  get _prevButtonLabel() {
    switch (this._currentView) {
      case "month":
        return this._intl.prevMonthLabel;
      case "year":
        return this._intl.prevYearLabel;
      case "multi-year":
        return this._intl.prevMultiYearLabel;
      default:
        return "";
    }
  }
  get _nextButtonLabel() {
    switch (this._currentView) {
      case "month":
        return this._intl.nextMonthLabel;
      case "year":
        return this._intl.nextYearLabel;
      case "multi-year":
        return this._intl.nextMultiYearLabel;
      default:
        return "";
    }
  }
  _userSelected() {
    this._userSelection.emit();
  }
  ngAfterContentInit() {
    if (this.headerComponent) {
      this._calendarHeaderPortal = new ComponentPortal(this.headerComponent);
    }
    this._activeDate = this.startAt || this._adapter.today();
    this._selectAMPM(this._activeDate);
    if (this.type === "year") {
      this.currentView = "multi-year";
    } else if (this.type === "month") {
      this.currentView = "year";
    } else if (this.type === "time") {
      this.currentView = "clock";
    } else {
      this.currentView = this.startView || "month";
    }
  }
  ngOnDestroy() {
    this._intlChanges.unsubscribe();
  }
  /** Handles date selection in the month view. */
  _dateSelected(date) {
    if (this.type === "date") {
      this._onActiveDateChange(date);
      if (!this._adapter.sameDate(date, this.selected) || !this.preventSameDateTimeSelection) {
        this.selectedChange.emit(date);
      }
    } else {
      this.selectedChange.emit(date);
      this._activeDate = date;
      this.currentView = "clock";
    }
  }
  /** Handles month selection in the year view. */
  _monthSelected(month) {
    if (this.type === "month") {
      if (!this._adapter.sameMonthAndYear(month, this.selected) || !this.preventSameDateTimeSelection) {
        this.selectedChange.emit(this._adapter.getFirstDateOfMonth(month));
      }
    } else {
      this._activeDate = month;
      this.currentView = "month";
      this._clockView = "hour";
    }
  }
  /** Handles year selection in the multi year view. */
  _yearSelected(year) {
    if (this.type === "year") {
      if (!this._adapter.sameYear(year, this.selected) || !this.preventSameDateTimeSelection) {
        const normalizedDate = this._adapter.createDatetime(this._adapter.getYear(year), 0, 1, 0, 0);
        this.selectedChange.emit(normalizedDate);
      }
    } else {
      this._activeDate = year;
      this.currentView = "year";
    }
  }
  _timeSelected(date) {
    this._activeDate = date;
    if (!this._adapter.sameDatetime(date, this.selected) || !this.preventSameDateTimeSelection) {
      this.selectedChange.emit(date);
    }
  }
  _dialTimeSelected(date) {
    if (this._clockView !== "minute") {
      this._activeDate = date;
      this._clockView = "minute";
    }
    if (!this._adapter.sameDatetime(date, this.selected) || !this.preventSameDateTimeSelection) {
      this.selectedChange.emit(date);
    }
  }
  _onActiveDateChange(date) {
    this._activeDate = date;
  }
  _selectAMPM(date) {
    const hour = this._adapter.getHour(date);
    if (hour > 11) {
      this._AMPM = "PM";
    } else {
      this._AMPM = "AM";
    }
    if (this.actionsPortal && this._selected && !this._adapter.sameHour(date, this._selected)) {
      this.selectedChange.emit(date);
    }
  }
  _ampmClicked(source) {
    this._currentView = "clock";
    if (source === this._AMPM) {
      return;
    }
    const currentHour = this._adapter.getHour(this._activeDate);
    let newHourValue;
    if (source === "AM") {
      newHourValue = currentHour >= 12 ? this._adapter.getHour(this._activeDate) - 12 : 12;
    } else {
      newHourValue = (currentHour + 12) % 24;
    }
    const newActiveDate = this._adapter.clampDate(this._adapter.createDatetime(this._adapter.getYear(this._activeDate), this._adapter.getMonth(this._activeDate), this._adapter.getDate(this._activeDate), newHourValue, this._adapter.getMinute(this._activeDate)), this.minDate, this.maxDate);
    if (this._adapter.getHour(newActiveDate) === newHourValue) {
      this._activeDate = newActiveDate;
      this._AMPM = source;
    }
  }
  _yearClicked() {
    if (this.type === "year" || this.multiYearSelector) {
      this.currentView = "multi-year";
      return;
    }
    this.currentView = "year";
  }
  _dateClicked() {
    if (this.type !== "month") {
      this.currentView = "month";
    }
  }
  _hoursClicked() {
    this.currentView = "clock";
    this._clockView = "hour";
  }
  _minutesClicked() {
    this.currentView = "clock";
    this._clockView = "minute";
  }
  /** Handles user clicks on the previous button. */
  _previousClicked() {
    this._activeDate = this.currentView === "month" ? this._adapter.addCalendarMonths(this._activeDate, -1) : this._adapter.addCalendarYears(this._activeDate, this.currentView === "year" ? -1 : -yearsPerPage);
  }
  /** Handles user clicks on the next button. */
  _nextClicked() {
    this._activeDate = this.currentView === "month" ? this._adapter.addCalendarMonths(this._activeDate, 1) : this._adapter.addCalendarYears(this._activeDate, this.currentView === "year" ? 1 : yearsPerPage);
  }
  /** Whether the previous period button is enabled. */
  _previousEnabled() {
    if (!this.minDate) {
      return true;
    }
    return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
  }
  /** Whether the next period button is enabled. */
  _nextEnabled() {
    return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
  }
  /** Handles keydown events on the calendar body. */
  _handleCalendarBodyKeydown(event) {
    if (this.currentView === "month") {
      this._handleCalendarBodyKeydownInMonthView(event);
    } else if (this.currentView === "year") {
      this._handleCalendarBodyKeydownInYearView(event);
    } else if (this.currentView === "multi-year") {
      this._handleCalendarBodyKeydownInMultiYearView(event);
    } else {
      this._handleCalendarBodyKeydownInClockView(event);
    }
  }
  _focusActiveCell() {
    afterNextRender(() => {
      this._elementRef.nativeElement.focus();
    }, {
      injector: this._injector
    });
  }
  _calendarStateDone() {
    this._calendarState = "";
  }
  /** Whether the two dates represent the same view in the current view mode (month or year). */
  _isSameView(date1, date2) {
    if (this.currentView === "month") {
      return this._adapter.getYear(date1) === this._adapter.getYear(date2) && this._adapter.getMonth(date1) === this._adapter.getMonth(date2);
    }
    if (this.currentView === "year") {
      return this._adapter.getYear(date1) === this._adapter.getYear(date2);
    }
    return isSameMultiYearView(this._adapter, date1, date2, this.minDate, this.maxDate);
  }
  /** Handles keydown events on the calendar body when calendar is in month view. */
  _handleCalendarBodyKeydownInMonthView(event) {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._adapter.addCalendarDays(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._adapter.addCalendarDays(this._activeDate, -7);
        break;
      case DOWN_ARROW:
        this._activeDate = this._adapter.addCalendarDays(this._activeDate, 7);
        break;
      case HOME:
        this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1 - this._adapter.getDate(this._activeDate));
        break;
      case END:
        this._activeDate = this._adapter.addCalendarDays(this._activeDate, this._adapter.getNumDaysInMonth(this._activeDate) - this._adapter.getDate(this._activeDate));
        break;
      case PAGE_UP:
        this._activeDate = event.altKey ? this._adapter.addCalendarYears(this._activeDate, -1) : this._adapter.addCalendarMonths(this._activeDate, -1);
        break;
      case PAGE_DOWN:
        this._activeDate = event.altKey ? this._adapter.addCalendarYears(this._activeDate, 1) : this._adapter.addCalendarMonths(this._activeDate, 1);
        break;
      case ENTER:
        if (this._dateFilterForViews(this._activeDate)) {
          this._dateSelected(this._activeDate);
          event.preventDefault();
        }
        return;
      default:
        return;
    }
    event.preventDefault();
  }
  /** Handles keydown events on the calendar body when calendar is in year view. */
  _handleCalendarBodyKeydownInYearView(event) {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._prevMonthInSameCol(this._activeDate);
        break;
      case DOWN_ARROW:
        this._activeDate = this._nextMonthInSameCol(this._activeDate);
        break;
      case HOME:
        this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -this._adapter.getMonth(this._activeDate));
        break;
      case END:
        this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 11 - this._adapter.getMonth(this._activeDate));
        break;
      case PAGE_UP:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
        break;
      case PAGE_DOWN:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
        break;
      case ENTER:
        this._monthSelected(this._activeDate);
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  /** Handles keydown events on the calendar body when calendar is in multi-year view. */
  _handleCalendarBodyKeydownInMultiYearView(event) {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, -1);
        break;
      case RIGHT_ARROW:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, 1);
        break;
      case UP_ARROW:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, -yearsPerRow);
        break;
      case DOWN_ARROW:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, yearsPerRow);
        break;
      case HOME:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, -getActiveOffset(this._adapter, this._activeDate, this.minDate, this.maxDate));
        break;
      case END:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, yearsPerPage - getActiveOffset(this._adapter, this._activeDate, this.minDate, this.maxDate) - 1);
        break;
      case PAGE_UP:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
        break;
      case PAGE_DOWN:
        this._activeDate = this._adapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
        break;
      case ENTER:
        this._yearSelected(this._activeDate);
        break;
      default:
        return;
    }
  }
  /** Handles keydown events on the calendar body when calendar is in month view. */
  _handleCalendarBodyKeydownInClockView(event) {
    switch (event.keyCode) {
      case UP_ARROW:
        this._activeDate = this._clockView === "hour" ? this._adapter.addCalendarHours(this._activeDate, 1) : this._adapter.addCalendarMinutes(this._activeDate, this.timeInterval);
        break;
      case DOWN_ARROW:
        this._activeDate = this._clockView === "hour" ? this._adapter.addCalendarHours(this._activeDate, -1) : this._adapter.addCalendarMinutes(this._activeDate, -this.timeInterval);
        break;
      case ENTER:
        if (!this.timeInput) {
          this._dialTimeSelected(this._activeDate);
        }
        return;
      default:
        return;
    }
    event.preventDefault();
  }
  /**
   * Determine the date for the month that comes before the given month in the same column in the
   * calendar table.
   */
  _prevMonthInSameCol(date) {
    const increment = this._adapter.getMonth(date) <= 4 ? -5 : this._adapter.getMonth(date) >= 7 ? -7 : -12;
    return this._adapter.addCalendarMonths(date, increment);
  }
  /**
   * Determine the date for the month that comes after the given month in the same column in the
   * calendar table.
   */
  _nextMonthInSameCol(date) {
    const increment = this._adapter.getMonth(date) <= 4 ? 7 : this._adapter.getMonth(date) >= 7 ? 5 : 12;
    return this._adapter.addCalendarMonths(date, increment);
  }
  calendarState(direction) {
    this._calendarState = direction;
  }
  _2digit(n) {
    return ("00" + n).slice(-2);
  }
  static {
    this.ɵfac = function MtxCalendar_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxCalendar)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(MtxDatetimepickerIntl), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DatetimeAdapter, 8), ɵɵdirectiveInject(MTX_DATETIME_FORMATS, 8), ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxCalendar,
      selectors: [["mtx-calendar"]],
      hostAttrs: ["tabindex", "0", 1, "mtx-calendar"],
      hostVars: 2,
      hostBindings: function MtxCalendar_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("keydown", function MtxCalendar_keydown_HostBindingHandler($event) {
            return ctx._handleCalendarBodyKeydown($event);
          });
        }
        if (rf & 2) {
          ɵɵclassProp("mtx-calendar-with-time-input", ctx.timeInput);
        }
      },
      inputs: {
        multiYearSelector: [2, "multiYearSelector", "multiYearSelector", booleanAttribute],
        twelvehour: [2, "twelvehour", "twelvehour", booleanAttribute],
        startView: "startView",
        timeInterval: "timeInterval",
        dateFilter: "dateFilter",
        preventSameDateTimeSelection: "preventSameDateTimeSelection",
        headerComponent: "headerComponent",
        actionsPortal: "actionsPortal",
        type: "type",
        startAt: "startAt",
        timeInput: [2, "timeInput", "timeInput", booleanAttribute],
        timeInputAutoFocus: [2, "timeInputAutoFocus", "timeInputAutoFocus", booleanAttribute],
        selected: "selected",
        minDate: "minDate",
        maxDate: "maxDate"
      },
      outputs: {
        selectedChange: "selectedChange",
        viewChanged: "viewChanged",
        _userSelection: "_userSelection"
      },
      exportAs: ["mtxCalendar"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
      decls: 9,
      vars: 3,
      consts: [[1, "mtx-calendar-header"], [3, "cdkPortalOutlet"], [1, "mtx-calendar-content"], [1, "mtx-month-content"], [3, "activeDate", "dateFilter", "selected", "type"], [3, "activeDate", "dateFilter", "maxDate", "minDate", "selected", "type"], ["mat-button", "", "type", "button", 1, "mtx-calendar-header-year", 3, "active"], [1, "mtx-calendar-header-date-time"], ["mat-button", "", "type", "button", 1, "mtx-calendar-header-year", 3, "click"], ["matButtonIcon", "", "iconPositionEnd", "", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "currentColor", 1, "mtx-calendar-header-year-dropdown"], ["d", "M7,10L12,15L17,10H7Z"], ["mat-button", "", "type", "button", 1, "mtx-calendar-header-date", 3, "active", "not-clickable"], [1, "mtx-calendar-header-time", 3, "active"], ["mat-button", "", "type", "button", 1, "mtx-calendar-header-date", 3, "click"], [1, "mtx-calendar-header-time"], [1, "mtx-calendar-header-hour-minute-container"], ["mat-button", "", "type", "button", 1, "mtx-calendar-header-hours", 3, "click"], [1, "mtx-calendar-header-hour-minute-separator"], ["mat-button", "", "type", "button", 1, "mtx-calendar-header-minutes", 3, "click"], [1, "mtx-calendar-header-ampm-container"], ["mat-button", "", "type", "button", "aria-label", "AM", 1, "mtx-calendar-header-ampm", 3, "click"], ["mat-button", "", "type", "button", "aria-label", "PM", 1, "mtx-calendar-header-ampm", 3, "click"], [1, "mtx-calendar-controls"], ["mat-icon-button", "", "type", "button", 1, "mtx-calendar-previous-button", 3, "click"], ["width", "24", "height", "24", "viewBox", "0 0 24 24"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], [1, "mtx-calendar-period-button"], ["mat-icon-button", "", "type", "button", 1, "mtx-calendar-next-button", 3, "click"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"], [3, "_userSelection", "selectedChange", "activeDate", "dateFilter", "selected", "type"], [3, "_userSelection", "selectedChange", "activeDate", "dateFilter", "maxDate", "minDate", "selected", "type"], [3, "AMPM", "clockView", "twelvehour", "dateFilter", "interval", "maxDate", "minDate", "selected", "actionsPortal", "autoFocus"], [3, "AMPM", "dateFilter", "interval", "maxDate", "minDate", "selected", "startView", "twelvehour"], [3, "_userSelection", "activeDateChange", "selectedChange", "ampmChange", "clockViewChange", "AMPM", "clockView", "twelvehour", "dateFilter", "interval", "maxDate", "minDate", "selected", "actionsPortal", "autoFocus"], [3, "_userSelection", "activeDateChange", "selectedChange", "AMPM", "dateFilter", "interval", "maxDate", "minDate", "selected", "startView", "twelvehour"]],
      template: function MtxCalendar_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵtemplate(1, MtxCalendar_Conditional_1_Template, 1, 1, null, 1)(2, MtxCalendar_Conditional_2_Template, 2, 2);
          ɵɵelementEnd();
          ɵɵelementStart(3, "div", 2);
          ɵɵtemplate(4, MtxCalendar_Conditional_4_Template, 11, 10, "div", 3)(5, MtxCalendar_Case_5_Template, 1, 4, "mtx-month-view", 4)(6, MtxCalendar_Case_6_Template, 1, 4, "mtx-year-view", 4)(7, MtxCalendar_Case_7_Template, 1, 6, "mtx-multi-year-view", 5)(8, MtxCalendar_Case_8_Template, 2, 1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          let tmp_2_0;
          ɵɵadvance();
          ɵɵconditional(ctx._calendarHeaderPortal ? 1 : 2);
          ɵɵadvance(3);
          ɵɵconditional(ctx.currentView === "month" || ctx.currentView === "year" || ctx.currentView === "multi-year" ? 4 : -1);
          ɵɵadvance();
          ɵɵconditional((tmp_2_0 = ctx.currentView) === "month" ? 5 : tmp_2_0 === "year" ? 6 : tmp_2_0 === "multi-year" ? 7 : 8);
        }
      },
      dependencies: [CdkPortalOutlet, MatButton, MatIconButton, MtxMonthView, MtxYearView, MtxMultiYearView, MtxTime, MtxClock],
      styles: ['.mtx-calendar{display:block;outline:none;font-family:var(--mtx-datetimepicker-calendar-text-font, var(--mat-app-body-large-font));font-size:var(--mtx-datetimepicker-calendar-text-size, var(--mat-app-body-large-size))}.mtx-calendar-header{box-sizing:border-box;padding:8px;border-bottom:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-top-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));background-color:var(--mtx-datetimepicker-calendar-header-background-color);color:var(--mtx-datetimepicker-calendar-header-text-color, var(--mat-app-on-surface-variant));--mdc-text-button-container-shape: var(--mtx-datetimepicker-selector-container-shape, var(--mat-app-corner-small))}.mtx-calendar-header .mtx-calendar-header-year,.mtx-calendar-header .mtx-calendar-header-date,.mtx-calendar-header .mtx-calendar-header-hours,.mtx-calendar-header .mtx-calendar-header-minutes,.mtx-calendar-header .mtx-calendar-header-ampm{height:auto;min-width:auto;padding:0 4px;text-align:inherit;line-height:inherit;color:inherit;font-size:inherit;font-weight:inherit;letter-spacing:normal;white-space:normal;word-break:break-word}.mtx-calendar-header .mtx-calendar-header-year .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-date .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-hours .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-minutes .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-ampm .mat-mdc-button-touch-target{height:100%}.mtx-calendar-header .mtx-calendar-header-year{line-height:24px}.mtx-calendar-header-date-time{font-size:24px;line-height:36px}.mtx-calendar-header-year:not(.active),.mtx-calendar-header-date:not(.active),.mtx-calendar-header-hours:not(.active),.mtx-calendar-header-minutes:not(.active),.mtx-calendar-header-ampm:not(.active){opacity:.6}.mtx-calendar-header-year.not-clickable,.mtx-calendar-header-date.not-clickable,.mtx-calendar-header-hours.not-clickable,.mtx-calendar-header-minutes.not-clickable,.mtx-calendar-header-ampm.not-clickable{cursor:initial}.mtx-calendar-header-time{display:inline-flex}.mtx-calendar-header-time:not(.active){opacity:.6}.mtx-calendar-header-time:not(.active) .mtx-calendar-header-hours,.mtx-calendar-header-time:not(.active) .mtx-calendar-header-minutes,.mtx-calendar-header-time:not(.active) .mtx-calendar-header-ampm{opacity:1}.mtx-calendar-header-hour-minute-separator{display:inline-block;width:8px;text-align:center}.mtx-calendar-header-ampm-container{display:inline-flex;flex-direction:column;line-height:18px;font-size:12px}[mode=landscape] .mtx-calendar{display:flex}[mode=landscape] .mtx-calendar .mtx-calendar-header{width:144px;min-width:144px;padding:16px 8px;border-bottom-width:0;border-top-right-radius:0;border-bottom-right-radius:0;border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=landscape] .mtx-calendar .mtx-calendar-header{border-top-left-radius:0;border-bottom-left-radius:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[mode=landscape] .mtx-calendar .mtx-calendar-header-year+.mtx-calendar-header-date-time,[mode=landscape] .mtx-calendar .mtx-calendar-header-date+.mtx-calendar-header-time{margin-top:4px}[mode=landscape] .mtx-calendar .mtx-calendar-header-date-time{font-size:28px}[mode=landscape] .mtx-calendar .mtx-calendar-header-time{display:flex;flex-direction:column}[mode=landscape] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-hours,[mode=landscape] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-minutes,[mode=landscape] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-ampm{width:40px;text-align:center}[mode=landscape] .mtx-calendar .mtx-calendar-header-ampm-container{flex-direction:row;font-size:20px}[mode=landscape] .mtx-calendar .mtx-calendar-header-ampm{padding:4px}[mode=landscape] .mtx-calendar .mtx-calendar-header-ampm+.mtx-calendar-header-ampm{margin:0 8px}[mode=landscape] .mtx-datetimepicker-content-container-with-actions .mtx-calendar .mtx-calendar-header{border-bottom-left-radius:0;border-bottom-right-radius:0}[mode=landscape] .mtx-datetimepicker-actions:before{position:absolute;top:0;left:0;box-sizing:border-box;width:144px;height:100%;content:"";border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));background-color:var(--mtx-datetimepicker-calendar-header-background-color);border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=landscape] .mtx-datetimepicker-actions:before{left:auto;right:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-bottom-left-radius:0;border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}@media all and (orientation: landscape){[mode=auto] .mtx-calendar{display:flex}[mode=auto] .mtx-calendar .mtx-calendar-header{width:144px;min-width:144px;padding:16px 8px;border-bottom-width:0;border-top-right-radius:0;border-bottom-right-radius:0;border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=auto] .mtx-calendar .mtx-calendar-header{border-top-left-radius:0;border-bottom-left-radius:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[mode=auto] .mtx-calendar .mtx-calendar-header-year+.mtx-calendar-header-date-time,[mode=auto] .mtx-calendar .mtx-calendar-header-date+.mtx-calendar-header-time{margin-top:4px}[mode=auto] .mtx-calendar .mtx-calendar-header-date-time{font-size:28px}[mode=auto] .mtx-calendar .mtx-calendar-header-time{display:flex;flex-direction:column}[mode=auto] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-hours,[mode=auto] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-minutes,[mode=auto] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-ampm{width:40px;text-align:center}[mode=auto] .mtx-calendar .mtx-calendar-header-ampm-container{flex-direction:row;font-size:20px}[mode=auto] .mtx-calendar .mtx-calendar-header-ampm{padding:4px}[mode=auto] .mtx-calendar .mtx-calendar-header-ampm+.mtx-calendar-header-ampm{margin:0 8px}[mode=auto] .mtx-datetimepicker-content-container-with-actions .mtx-calendar .mtx-calendar-header{border-bottom-left-radius:0;border-bottom-right-radius:0}[mode=auto] .mtx-datetimepicker-actions:before{position:absolute;top:0;left:0;box-sizing:border-box;width:144px;height:100%;content:"";border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));background-color:var(--mtx-datetimepicker-calendar-header-background-color);border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=auto] .mtx-datetimepicker-actions:before{left:auto;right:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-bottom-left-radius:0;border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}}.mtx-calendar-content{width:100%;padding:8px;outline:none;box-sizing:border-box;overflow:hidden}.mtx-calendar-controls{display:flex;align-items:center;justify-content:space-between;margin:0 calc(4.7142857143% - 16px)}.mtx-calendar-controls .mat-icon-button:hover .mat-button-focus-overlay{opacity:.04}.mtx-calendar-period-button{display:inline-block;height:40px;line-height:40px;outline:none;border:0;background:transparent;box-sizing:border-box;font-size:var(--mtx-datetimepicker-calendar-period-button-text-size, var(--mat-app-title-small-size));font-weight:var(--mtx-datetimepicker-calendar-period-button-text-weight, var(--mat-app-title-small-weight))}.mtx-calendar-previous-button.disabled,.mtx-calendar-next-button.disabled{pointer-events:none;color:var(--mtx-datetimepicker-calendar-date-disabled-state-text-color)}.mtx-calendar-previous-button svg,.mtx-calendar-next-button svg{fill:currentColor;vertical-align:top}[dir=rtl] .mtx-calendar-previous-button svg,[dir=rtl] .mtx-calendar-next-button svg{transform:rotate(180deg)}.mtx-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mtx-calendar-table-header th{text-align:center;padding:8px 0;color:var(--mtx-datetimepicker-calendar-table-header-text-color, var(--mat-app-on-surface));font-size:var(--mtx-datetimepicker-calendar-table-header-text-size);font-weight:var(--mtx-datetimepicker-calendar-table-header-text-weight)}\n'],
      encapsulation: 2,
      data: {
        animation: [mtxDatetimepickerAnimations.slideCalendar]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxCalendar, [{
    type: Component,
    args: [{
      selector: "mtx-calendar",
      host: {
        "class": "mtx-calendar",
        "[class.mtx-calendar-with-time-input]": "timeInput",
        "tabindex": "0",
        "(keydown)": "_handleCalendarBodyKeydown($event)"
      },
      exportAs: "mtxCalendar",
      animations: [mtxDatetimepickerAnimations.slideCalendar],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [CdkPortalOutlet, MatButton, MatIconButton, MtxMonthView, MtxYearView, MtxMultiYearView, MtxTime, MtxClock],
      template: `<div class="mtx-calendar-header">
  @if (_calendarHeaderPortal) {
    <ng-template [cdkPortalOutlet]="_calendarHeaderPortal"></ng-template>
  } @else {
    @if (type !== 'time') {
      <button
        mat-button type="button" class="mtx-calendar-header-year"
        [class.active]="currentView === 'year' || currentView === 'multi-year'"
        [attr.aria-label]="_yearButtonLabel"
        (click)="_yearClicked()">
        <span>{{ _yearButtonText }}</span>
        @if (multiYearSelector || type === 'year') {
          <svg
            class="mtx-calendar-header-year-dropdown" matButtonIcon iconPositionEnd
            width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7,10L12,15L17,10H7Z" />
          </svg>
        }
      </button>
    }
    @if (type !== 'year') {
      <div class="mtx-calendar-header-date-time">
        @if (type !== 'time') {
          <button
            mat-button type="button" class="mtx-calendar-header-date"
            [class.active]="currentView === 'month'"
            [class.not-clickable]="type === 'month'"
            [attr.aria-label]="_dateButtonLabel"
            (click)="_dateClicked()">{{ _dateButtonText }}</button>
        }
        @if (type.endsWith('time')) {
          <span class="mtx-calendar-header-time" [class.active]="currentView === 'clock'">
            <span class="mtx-calendar-header-hour-minute-container">
              <button mat-button type="button" class="mtx-calendar-header-hours"
                [class.active]="_clockView === 'hour'"
                [attr.aria-label]="_hourButtonLabel"
                (click)="_hoursClicked()">{{ _hoursButtonText }}</button>
              <span class="mtx-calendar-header-hour-minute-separator">:</span>
              <button mat-button type="button" class="mtx-calendar-header-minutes"
                [class.active]="_clockView === 'minute'"
                [attr.aria-label]="_minuteButtonLabel"
                (click)="_minutesClicked()">{{ _minutesButtonText }}</button>
            </span>
            @if (twelvehour) {
              <span class="mtx-calendar-header-ampm-container">
                <button mat-button type="button" class="mtx-calendar-header-ampm"
                  [class.active]="_AMPM === 'AM'" aria-label="AM"
                  (click)="_ampmClicked('AM')">AM</button>
                <button mat-button type="button" class="mtx-calendar-header-ampm"
                  [class.active]="_AMPM === 'PM'" aria-label="PM"
                  (click)="_ampmClicked('PM')">PM</button>
              </span>
            }
          </span>
        }
      </div>
    }
  }
</div>

<div class="mtx-calendar-content">
  @if (currentView === 'month' || currentView === 'year' || currentView === 'multi-year') {
    <div class="mtx-month-content">
      <div class="mtx-calendar-controls">
        <button mat-icon-button type="button"
          class="mtx-calendar-previous-button"
          [class.disabled]="!_previousEnabled()"
          [attr.aria-disabled]="!_previousEnabled()"
          [attr.aria-label]="_prevButtonLabel"
          (click)="_previousClicked()">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <div class="mtx-calendar-period-button"
          [@slideCalendar]="_calendarState"
          (@slideCalendar.done)="_calendarStateDone()">
          <strong>{{ _yearPeriodText }}</strong>
        </div>
        <button mat-icon-button type="button"
          class="mtx-calendar-next-button"
          [class.disabled]="!_nextEnabled()"
          [attr.aria-disabled]="!_nextEnabled()"
          [attr.aria-label]="_nextButtonLabel"
          (click)="_nextClicked()">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  }

  @switch (currentView) {
    @case ('month') {
      <mtx-month-view
        (_userSelection)="_userSelected()"
        (selectedChange)="_dateSelected($event)"
        [activeDate]="_activeDate"
        [dateFilter]="_dateFilterForViews"
        [selected]="selected!"
        [type]="type">
      </mtx-month-view>
    }
    @case ('year') {
      <mtx-year-view
        (_userSelection)="_userSelected()"
        (selectedChange)="_monthSelected($event)"
        [activeDate]="_activeDate"
        [dateFilter]="_dateFilterForViews"
        [selected]="selected!"
        [type]="type">
      </mtx-year-view>
    }
    @case ('multi-year') {
      <mtx-multi-year-view
        (_userSelection)="_userSelected()"
        (selectedChange)="_yearSelected($event)"
        [activeDate]="_activeDate"
        [dateFilter]="_dateFilterForViews"
        [maxDate]="maxDate"
        [minDate]="minDate"
        [selected]="selected!"
        [type]="type">
      </mtx-multi-year-view>
    }
    @default {
      @if (timeInput) {
        <mtx-time
          (_userSelection)="_userSelected()"
          (activeDateChange)="_onActiveDateChange($event)"
          (selectedChange)="_timeSelected($event)"
          [AMPM]="_AMPM"
          (ampmChange)="_ampmClicked($event)"
          [clockView]="_clockView"
          (clockViewChange)="_clockView = $event"
          [twelvehour]="twelvehour"
          [dateFilter]="dateFilter"
          [interval]="timeInterval"
          [maxDate]="maxDate"
          [minDate]="minDate"
          [selected]="_activeDate"
          [actionsPortal]="actionsPortal"
          [autoFocus]="timeInputAutoFocus">
        </mtx-time>
      } @else {
        <mtx-clock (_userSelection)="_userSelected()"
          (activeDateChange)="_onActiveDateChange($event)"
          (selectedChange)="_dialTimeSelected($event)"
          [AMPM]="_AMPM"
          [dateFilter]="dateFilter"
          [interval]="timeInterval"
          [maxDate]="maxDate"
          [minDate]="minDate"
          [selected]="_activeDate"
          [startView]="_clockView"
          [twelvehour]="twelvehour">
        </mtx-clock>
      }
    }
  }
</div>
`,
      styles: ['.mtx-calendar{display:block;outline:none;font-family:var(--mtx-datetimepicker-calendar-text-font, var(--mat-app-body-large-font));font-size:var(--mtx-datetimepicker-calendar-text-size, var(--mat-app-body-large-size))}.mtx-calendar-header{box-sizing:border-box;padding:8px;border-bottom:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-top-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));background-color:var(--mtx-datetimepicker-calendar-header-background-color);color:var(--mtx-datetimepicker-calendar-header-text-color, var(--mat-app-on-surface-variant));--mdc-text-button-container-shape: var(--mtx-datetimepicker-selector-container-shape, var(--mat-app-corner-small))}.mtx-calendar-header .mtx-calendar-header-year,.mtx-calendar-header .mtx-calendar-header-date,.mtx-calendar-header .mtx-calendar-header-hours,.mtx-calendar-header .mtx-calendar-header-minutes,.mtx-calendar-header .mtx-calendar-header-ampm{height:auto;min-width:auto;padding:0 4px;text-align:inherit;line-height:inherit;color:inherit;font-size:inherit;font-weight:inherit;letter-spacing:normal;white-space:normal;word-break:break-word}.mtx-calendar-header .mtx-calendar-header-year .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-date .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-hours .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-minutes .mat-mdc-button-touch-target,.mtx-calendar-header .mtx-calendar-header-ampm .mat-mdc-button-touch-target{height:100%}.mtx-calendar-header .mtx-calendar-header-year{line-height:24px}.mtx-calendar-header-date-time{font-size:24px;line-height:36px}.mtx-calendar-header-year:not(.active),.mtx-calendar-header-date:not(.active),.mtx-calendar-header-hours:not(.active),.mtx-calendar-header-minutes:not(.active),.mtx-calendar-header-ampm:not(.active){opacity:.6}.mtx-calendar-header-year.not-clickable,.mtx-calendar-header-date.not-clickable,.mtx-calendar-header-hours.not-clickable,.mtx-calendar-header-minutes.not-clickable,.mtx-calendar-header-ampm.not-clickable{cursor:initial}.mtx-calendar-header-time{display:inline-flex}.mtx-calendar-header-time:not(.active){opacity:.6}.mtx-calendar-header-time:not(.active) .mtx-calendar-header-hours,.mtx-calendar-header-time:not(.active) .mtx-calendar-header-minutes,.mtx-calendar-header-time:not(.active) .mtx-calendar-header-ampm{opacity:1}.mtx-calendar-header-hour-minute-separator{display:inline-block;width:8px;text-align:center}.mtx-calendar-header-ampm-container{display:inline-flex;flex-direction:column;line-height:18px;font-size:12px}[mode=landscape] .mtx-calendar{display:flex}[mode=landscape] .mtx-calendar .mtx-calendar-header{width:144px;min-width:144px;padding:16px 8px;border-bottom-width:0;border-top-right-radius:0;border-bottom-right-radius:0;border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=landscape] .mtx-calendar .mtx-calendar-header{border-top-left-radius:0;border-bottom-left-radius:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[mode=landscape] .mtx-calendar .mtx-calendar-header-year+.mtx-calendar-header-date-time,[mode=landscape] .mtx-calendar .mtx-calendar-header-date+.mtx-calendar-header-time{margin-top:4px}[mode=landscape] .mtx-calendar .mtx-calendar-header-date-time{font-size:28px}[mode=landscape] .mtx-calendar .mtx-calendar-header-time{display:flex;flex-direction:column}[mode=landscape] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-hours,[mode=landscape] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-minutes,[mode=landscape] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-ampm{width:40px;text-align:center}[mode=landscape] .mtx-calendar .mtx-calendar-header-ampm-container{flex-direction:row;font-size:20px}[mode=landscape] .mtx-calendar .mtx-calendar-header-ampm{padding:4px}[mode=landscape] .mtx-calendar .mtx-calendar-header-ampm+.mtx-calendar-header-ampm{margin:0 8px}[mode=landscape] .mtx-datetimepicker-content-container-with-actions .mtx-calendar .mtx-calendar-header{border-bottom-left-radius:0;border-bottom-right-radius:0}[mode=landscape] .mtx-datetimepicker-actions:before{position:absolute;top:0;left:0;box-sizing:border-box;width:144px;height:100%;content:"";border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));background-color:var(--mtx-datetimepicker-calendar-header-background-color);border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=landscape] .mtx-datetimepicker-actions:before{left:auto;right:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-bottom-left-radius:0;border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}@media all and (orientation: landscape){[mode=auto] .mtx-calendar{display:flex}[mode=auto] .mtx-calendar .mtx-calendar-header{width:144px;min-width:144px;padding:16px 8px;border-bottom-width:0;border-top-right-radius:0;border-bottom-right-radius:0;border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=auto] .mtx-calendar .mtx-calendar-header{border-top-left-radius:0;border-bottom-left-radius:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-top-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[mode=auto] .mtx-calendar .mtx-calendar-header-year+.mtx-calendar-header-date-time,[mode=auto] .mtx-calendar .mtx-calendar-header-date+.mtx-calendar-header-time{margin-top:4px}[mode=auto] .mtx-calendar .mtx-calendar-header-date-time{font-size:28px}[mode=auto] .mtx-calendar .mtx-calendar-header-time{display:flex;flex-direction:column}[mode=auto] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-hours,[mode=auto] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-minutes,[mode=auto] .mtx-calendar .mtx-calendar-header-time .mtx-calendar-header-ampm{width:40px;text-align:center}[mode=auto] .mtx-calendar .mtx-calendar-header-ampm-container{flex-direction:row;font-size:20px}[mode=auto] .mtx-calendar .mtx-calendar-header-ampm{padding:4px}[mode=auto] .mtx-calendar .mtx-calendar-header-ampm+.mtx-calendar-header-ampm{margin:0 8px}[mode=auto] .mtx-datetimepicker-content-container-with-actions .mtx-calendar .mtx-calendar-header{border-bottom-left-radius:0;border-bottom-right-radius:0}[mode=auto] .mtx-datetimepicker-actions:before{position:absolute;top:0;left:0;box-sizing:border-box;width:144px;height:100%;content:"";border-right:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));background-color:var(--mtx-datetimepicker-calendar-header-background-color);border-bottom-left-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}[dir=rtl] [mode=auto] .mtx-datetimepicker-actions:before{left:auto;right:0;border-right-width:0;border-left:1px solid var(--mtx-datetimepicker-calendar-header-divider-color, var(--mat-app-outline-variant));border-bottom-left-radius:0;border-bottom-right-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large))}}.mtx-calendar-content{width:100%;padding:8px;outline:none;box-sizing:border-box;overflow:hidden}.mtx-calendar-controls{display:flex;align-items:center;justify-content:space-between;margin:0 calc(4.7142857143% - 16px)}.mtx-calendar-controls .mat-icon-button:hover .mat-button-focus-overlay{opacity:.04}.mtx-calendar-period-button{display:inline-block;height:40px;line-height:40px;outline:none;border:0;background:transparent;box-sizing:border-box;font-size:var(--mtx-datetimepicker-calendar-period-button-text-size, var(--mat-app-title-small-size));font-weight:var(--mtx-datetimepicker-calendar-period-button-text-weight, var(--mat-app-title-small-weight))}.mtx-calendar-previous-button.disabled,.mtx-calendar-next-button.disabled{pointer-events:none;color:var(--mtx-datetimepicker-calendar-date-disabled-state-text-color)}.mtx-calendar-previous-button svg,.mtx-calendar-next-button svg{fill:currentColor;vertical-align:top}[dir=rtl] .mtx-calendar-previous-button svg,[dir=rtl] .mtx-calendar-next-button svg{transform:rotate(180deg)}.mtx-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mtx-calendar-table-header th{text-align:center;padding:8px 0;color:var(--mtx-datetimepicker-calendar-table-header-text-color, var(--mat-app-on-surface));font-size:var(--mtx-datetimepicker-calendar-table-header-text-size);font-weight:var(--mtx-datetimepicker-calendar-table-header-text-weight)}\n']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: MtxDatetimepickerIntl
  }, {
    type: NgZone
  }, {
    type: DatetimeAdapter,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MTX_DATETIME_FORMATS]
    }]
  }, {
    type: ChangeDetectorRef
  }], {
    multiYearSelector: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    twelvehour: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    startView: [{
      type: Input
    }],
    timeInterval: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    preventSameDateTimeSelection: [{
      type: Input
    }],
    headerComponent: [{
      type: Input
    }],
    actionsPortal: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    viewChanged: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    type: [{
      type: Input
    }],
    startAt: [{
      type: Input
    }],
    timeInput: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    timeInputAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }]
  });
})();
var datetimepickerUid = 0;
var MTX_DATETIMEPICKER_SCROLL_STRATEGY = new InjectionToken("mtx-datetimepicker-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.reposition();
  }
});
function MTX_DATETIMEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
  return () => overlay.scrollStrategies.reposition();
}
var MTX_DATETIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MTX_DATETIMEPICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MTX_DATETIMEPICKER_SCROLL_STRATEGY_FACTORY
};
var MtxDatetimepickerContent = class _MtxDatetimepickerContent {
  constructor(_changeDetectorRef) {
    this._changeDetectorRef = _changeDetectorRef;
    this._animationDone = new Subject();
    this._dialogLabelId = null;
    this._actionsPortal = null;
    this.type = "datetime";
    this.view = "month";
  }
  _viewChanged(view) {
    this.view = view;
  }
  ngOnInit() {
    this._animationState = this.datetimepicker.touchUi ? "enter-dialog" : "enter-dropdown";
  }
  ngAfterContentInit() {
    this._calendar._focusActiveCell();
  }
  ngOnDestroy() {
    this._animationDone.complete();
  }
  _startExitAnimation() {
    this._animationState = "void";
    this._changeDetectorRef.markForCheck();
  }
  _handleUserSelection() {
    if (!this._actionsPortal) {
      this.datetimepicker.close();
    }
  }
  /**
   * Assigns a new portal containing the datetimepicker actions.
   * @param portal Portal with the actions to be assigned.
   * @param forceRerender Whether a re-render of the portal should be triggered.
   */
  _assignActions(portal, forceRerender) {
    this._actionsPortal = portal;
    if (forceRerender) {
      this._changeDetectorRef.detectChanges();
    }
  }
  static {
    this.ɵfac = function MtxDatetimepickerContent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerContent)(ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxDatetimepickerContent,
      selectors: [["mtx-datetimepicker-content"]],
      viewQuery: function MtxDatetimepickerContent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(MtxCalendar, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._calendar = _t.first);
        }
      },
      hostAttrs: [1, "mtx-datetimepicker-content"],
      hostVars: 6,
      hostBindings: function MtxDatetimepickerContent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵsyntheticHostListener("@transformPanel.done", function MtxDatetimepickerContent_animation_transformPanel_done_HostBindingHandler() {
            return ctx._animationDone.next();
          });
        }
        if (rf & 2) {
          ɵɵsyntheticHostProperty("@transformPanel", ctx._animationState);
          ɵɵattribute("mode", ctx.datetimepicker.mode);
          ɵɵclassMap(ctx.color ? "mat-" + ctx.color : "");
          ɵɵclassProp("mtx-datetimepicker-content-touch", ctx.datetimepicker == null ? null : ctx.datetimepicker.touchUi);
        }
      },
      inputs: {
        color: "color"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 3,
      vars: 30,
      consts: [["cdkTrapFocus", "", "role", "dialog", 1, "mtx-datetimepicker-content-container"], [3, "selectedChange", "viewChanged", "_userSelection", "id", "type", "startAt", "startView", "maxDate", "minDate", "dateFilter", "multiYearSelector", "preventSameDateTimeSelection", "headerComponent", "timeInterval", "twelvehour", "selected", "timeInput", "actionsPortal", "timeInputAutoFocus"], [3, "cdkPortalOutlet"]],
      template: function MtxDatetimepickerContent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0)(1, "mtx-calendar", 1);
          ɵɵlistener("selectedChange", function MtxDatetimepickerContent_Template_mtx_calendar_selectedChange_1_listener($event) {
            return ctx.datetimepicker._select($event);
          })("viewChanged", function MtxDatetimepickerContent_Template_mtx_calendar_viewChanged_1_listener($event) {
            return ctx.datetimepicker._viewChanged($event);
          })("viewChanged", function MtxDatetimepickerContent_Template_mtx_calendar_viewChanged_1_listener($event) {
            return ctx._viewChanged($event);
          })("_userSelection", function MtxDatetimepickerContent_Template_mtx_calendar__userSelection_1_listener() {
            return ctx._handleUserSelection();
          });
          ɵɵelementEnd();
          ɵɵtemplate(2, MtxDatetimepickerContent_ng_template_2_Template, 0, 0, "ng-template", 2);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          let tmp_4_0;
          ɵɵclassProp("mtx-datetimepicker-content-container-with-custom-header", ctx.datetimepicker.calendarHeaderComponent)("mtx-datetimepicker-content-container-with-actions", ctx._actionsPortal)("mtx-datetimepicker-content-container-with-time-input", ctx.datetimepicker.timeInput);
          ɵɵattribute("aria-modal", true)("aria-labelledby", (tmp_4_0 = ctx._dialogLabelId) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : void 0)("mode", ctx.datetimepicker.mode);
          ɵɵadvance();
          ɵɵclassMap(ctx.datetimepicker.panelClass);
          ɵɵproperty("id", ctx.datetimepicker.id)("type", ctx.datetimepicker.type)("startAt", ctx.datetimepicker.startAt)("startView", ctx.datetimepicker.startView)("maxDate", ctx.datetimepicker._maxDate)("minDate", ctx.datetimepicker._minDate)("dateFilter", ctx.datetimepicker._dateFilter)("multiYearSelector", ctx.datetimepicker.multiYearSelector)("preventSameDateTimeSelection", ctx.datetimepicker.preventSameDateTimeSelection)("headerComponent", ctx.datetimepicker.calendarHeaderComponent)("timeInterval", ctx.datetimepicker.timeInterval)("twelvehour", ctx.datetimepicker.twelvehour)("selected", ctx.datetimepicker._selected)("timeInput", ctx.datetimepicker.timeInput)("actionsPortal", ctx._actionsPortal)("timeInputAutoFocus", ctx.datetimepicker.timeInputAutoFocus)("@fadeInCalendar", "enter");
          ɵɵattribute("mode", ctx.datetimepicker.mode);
          ɵɵadvance();
          ɵɵproperty("cdkPortalOutlet", ctx._actionsPortal);
        }
      },
      dependencies: [MtxCalendar, CdkPortalOutlet],
      styles: [".mtx-datetimepicker-content{display:block;border-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));background-color:var(--mtx-datetimepicker-container-background-color, var(--mat-app-surface-container-high));box-shadow:var(--mtx-datetimepicker-container-elevation-shadow);color:var(--mtx-datetimepicker-container-text-color, var(--mat-app-on-surface))}.mtx-datetimepicker-content .mtx-calendar{width:296px;height:424px}.mtx-datetimepicker-content .mtx-calendar.mtx-calendar-with-time-input{height:490px}.mtx-datetimepicker-content .mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{height:442px}.mtx-datetimepicker-content-container{display:flex;flex-direction:column;justify-content:space-between}.mtx-datetimepicker-content[mode=landscape] .mtx-calendar{width:432px;height:328px}.mtx-datetimepicker-content[mode=landscape] .mtx-calendar.mtx-calendar-with-time-input{height:404px}.mtx-datetimepicker-content[mode=landscape] .mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{height:356px}@media all and (orientation: landscape){.mtx-datetimepicker-content[mode=auto] .mtx-calendar{width:432px;height:328px}.mtx-datetimepicker-content[mode=auto] .mtx-calendar.mtx-calendar-with-time-input{height:404px}.mtx-datetimepicker-content[mode=auto] .mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{height:356px}}.mtx-datetimepicker-content-touch{display:block;max-height:84vh;box-shadow:var(--mtx-datetimepicker-container-touch-elevation-shadow);border-radius:var(--mtx-datetimepicker-container-touch-shape, var(--mat-app-corner-extra-large));position:relative;overflow:visible}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container{min-height:300px;max-height:850px;min-width:250px;max-width:750px}.mtx-datetimepicker-content-touch .mtx-calendar{width:100%;height:auto}.mtx-datetimepicker-content-touch .mtx-clock{width:50vh;max-width:80%;margin:12px auto}@media all and (orientation: landscape){.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto],.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape]{width:120vh;height:80vh}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto] .mtx-calendar,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto].mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape] .mtx-calendar,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape].mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{width:auto;height:100%}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait]{width:64vh;height:80vh}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait] .mtx-calendar{width:100%;height:auto}}@media all and (orientation: portrait){.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto],.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait]{width:80vw;height:120vw}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto] .mtx-calendar,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait] .mtx-calendar{width:100%;height:auto}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto].mtx-datetimepicker-content-container-with-actions,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto].mtx-datetimepicker-content-container-with-time-input,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait].mtx-datetimepicker-content-container-with-actions,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait].mtx-datetimepicker-content-container-with-time-input{height:124vw}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape]{width:90vw;height:64vw}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape] .mtx-calendar{width:auto;height:100%}}\n"],
      encapsulation: 2,
      data: {
        animation: [mtxDatetimepickerAnimations.transformPanel, mtxDatetimepickerAnimations.fadeInCalendar]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerContent, [{
    type: Component,
    args: [{
      selector: "mtx-datetimepicker-content",
      host: {
        "class": "mtx-datetimepicker-content",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mtx-datetimepicker-content-touch]": "datetimepicker?.touchUi",
        "[attr.mode]": "datetimepicker.mode",
        "[@transformPanel]": "_animationState",
        "(@transformPanel.done)": "_animationDone.next()"
      },
      animations: [mtxDatetimepickerAnimations.transformPanel, mtxDatetimepickerAnimations.fadeInCalendar],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MtxCalendar, CdkPortalOutlet],
      template: `<div cdkTrapFocus
     role="dialog"
     [attr.aria-modal]="true"
     [attr.aria-labelledby]="_dialogLabelId ?? undefined"
     [attr.mode]="datetimepicker.mode"
     class="mtx-datetimepicker-content-container"
     [class.mtx-datetimepicker-content-container-with-custom-header]="datetimepicker.calendarHeaderComponent"
     [class.mtx-datetimepicker-content-container-with-actions]="_actionsPortal"
     [class.mtx-datetimepicker-content-container-with-time-input]="datetimepicker.timeInput">
  <mtx-calendar [id]="datetimepicker.id"
                [class]="datetimepicker.panelClass"
                [attr.mode]="datetimepicker.mode"
                [type]="datetimepicker.type"
                [startAt]="datetimepicker.startAt"
                [startView]="datetimepicker.startView"
                [maxDate]="datetimepicker._maxDate"
                [minDate]="datetimepicker._minDate"
                [dateFilter]="datetimepicker._dateFilter"
                [multiYearSelector]="datetimepicker.multiYearSelector"
                [preventSameDateTimeSelection]="datetimepicker.preventSameDateTimeSelection"
                [headerComponent]="datetimepicker.calendarHeaderComponent"
                [timeInterval]="datetimepicker.timeInterval"
                [twelvehour]="datetimepicker.twelvehour"
                [selected]="datetimepicker._selected"
                [timeInput]="datetimepicker.timeInput"
                [actionsPortal]="_actionsPortal"
                [timeInputAutoFocus]="datetimepicker.timeInputAutoFocus"
                (selectedChange)="datetimepicker._select($event)"
                (viewChanged)="datetimepicker._viewChanged($event)"
                (viewChanged)="_viewChanged($event)"
                (_userSelection)="_handleUserSelection()"
                [@fadeInCalendar]="'enter'">
  </mtx-calendar>

  <ng-template [cdkPortalOutlet]="_actionsPortal"></ng-template>
</div>
`,
      styles: [".mtx-datetimepicker-content{display:block;border-radius:var(--mtx-datetimepicker-container-shape, var(--mat-app-corner-large));background-color:var(--mtx-datetimepicker-container-background-color, var(--mat-app-surface-container-high));box-shadow:var(--mtx-datetimepicker-container-elevation-shadow);color:var(--mtx-datetimepicker-container-text-color, var(--mat-app-on-surface))}.mtx-datetimepicker-content .mtx-calendar{width:296px;height:424px}.mtx-datetimepicker-content .mtx-calendar.mtx-calendar-with-time-input{height:490px}.mtx-datetimepicker-content .mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{height:442px}.mtx-datetimepicker-content-container{display:flex;flex-direction:column;justify-content:space-between}.mtx-datetimepicker-content[mode=landscape] .mtx-calendar{width:432px;height:328px}.mtx-datetimepicker-content[mode=landscape] .mtx-calendar.mtx-calendar-with-time-input{height:404px}.mtx-datetimepicker-content[mode=landscape] .mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{height:356px}@media all and (orientation: landscape){.mtx-datetimepicker-content[mode=auto] .mtx-calendar{width:432px;height:328px}.mtx-datetimepicker-content[mode=auto] .mtx-calendar.mtx-calendar-with-time-input{height:404px}.mtx-datetimepicker-content[mode=auto] .mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{height:356px}}.mtx-datetimepicker-content-touch{display:block;max-height:84vh;box-shadow:var(--mtx-datetimepicker-container-touch-elevation-shadow);border-radius:var(--mtx-datetimepicker-container-touch-shape, var(--mat-app-corner-extra-large));position:relative;overflow:visible}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container{min-height:300px;max-height:850px;min-width:250px;max-width:750px}.mtx-datetimepicker-content-touch .mtx-calendar{width:100%;height:auto}.mtx-datetimepicker-content-touch .mtx-clock{width:50vh;max-width:80%;margin:12px auto}@media all and (orientation: landscape){.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto],.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape]{width:120vh;height:80vh}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto] .mtx-calendar,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto].mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape] .mtx-calendar,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape].mtx-datetimepicker-content-container-with-actions .mtx-calendar.mtx-calendar-with-time-input{width:auto;height:100%}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait]{width:64vh;height:80vh}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait] .mtx-calendar{width:100%;height:auto}}@media all and (orientation: portrait){.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto],.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait]{width:80vw;height:120vw}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto] .mtx-calendar,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait] .mtx-calendar{width:100%;height:auto}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto].mtx-datetimepicker-content-container-with-actions,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=auto].mtx-datetimepicker-content-container-with-time-input,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait].mtx-datetimepicker-content-container-with-actions,.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=portrait].mtx-datetimepicker-content-container-with-time-input{height:124vw}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape]{width:90vw;height:64vw}.mtx-datetimepicker-content-touch .mtx-datetimepicker-content-container[mode=landscape] .mtx-calendar{width:auto;height:100%}}\n"]
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    _calendar: [{
      type: ViewChild,
      args: [MtxCalendar, {
        static: true
      }]
    }],
    color: [{
      type: Input
    }]
  });
})();
var MtxDatetimepicker = class _MtxDatetimepicker {
  /** Classes to be passed to the date picker panel. */
  get panelClass() {
    return this._panelClass;
  }
  set panelClass(value) {
    this._panelClass = coerceStringArray(value);
  }
  /** Whether the calendar is open. */
  get opened() {
    return this._opened;
  }
  set opened(value) {
    value ? this.open() : this.close();
  }
  /** Color palette to use on the datetimepicker's calendar. */
  get color() {
    return this._color || (this.datetimepickerInput ? this.datetimepickerInput.getThemePalette() : void 0);
  }
  set color(value) {
    this._color = value;
  }
  constructor(_overlay, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir) {
    this._overlay = _overlay;
    this._viewContainerRef = _viewContainerRef;
    this._scrollStrategy = _scrollStrategy;
    this._dateAdapter = _dateAdapter;
    this._dir = _dir;
    this._document = inject(DOCUMENT);
    this._injector = inject(Injector);
    this.multiYearSelector = false;
    this.twelvehour = false;
    this.startView = "month";
    this.mode = "auto";
    this.timeInterval = 1;
    this.preventSameDateTimeSelection = false;
    this.selectedChanged = new EventEmitter();
    this.openedStream = new EventEmitter();
    this.closedStream = new EventEmitter();
    this.viewChanged = new EventEmitter();
    this._opened = false;
    this.id = `mtx-datetimepicker-${datetimepickerUid++}`;
    this._disabledChange = new Subject();
    this._validSelected = null;
    this._focusedElementBeforeOpen = null;
    this._backdropHarnessClass = `${this.id}-backdrop`;
    this._inputStateChanges = Subscription.EMPTY;
    this._actionsPortal = null;
    this.oldValue = null;
    this._type = "datetime";
    this.touchUi = false;
    this.timeInput = false;
    this.timeInputAutoFocus = true;
    this.xPosition = "start";
    this.yPosition = "below";
    this.restoreFocus = true;
    if (!this._dateAdapter) {
      throw createMissingDateImplError("DateAdapter");
    }
  }
  /** The date to open the calendar to initially. */
  get startAt() {
    return this._startAt || (this.datetimepickerInput ? this.datetimepickerInput.value : null);
  }
  set startAt(date) {
    this._startAt = this._dateAdapter.getValidDateOrNull(date);
  }
  /** The display type of datetimepicker. */
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value || "datetime";
  }
  /** Whether the datetimepicker pop-up should be disabled. */
  get disabled() {
    return this._disabled === void 0 && this.datetimepickerInput ? this.datetimepickerInput.disabled : !!this._disabled;
  }
  set disabled(value) {
    if (value !== this._disabled) {
      this._disabled = value;
      this._disabledChange.next(value);
    }
  }
  /** The currently selected date. */
  get _selected() {
    return this._validSelected;
  }
  set _selected(value) {
    this._validSelected = value;
  }
  /** The minimum selectable date. */
  get _minDate() {
    return this.datetimepickerInput && this.datetimepickerInput.min;
  }
  /** The maximum selectable date. */
  get _maxDate() {
    return this.datetimepickerInput && this.datetimepickerInput.max;
  }
  get _dateFilter() {
    return this.datetimepickerInput && this.datetimepickerInput._dateFilter;
  }
  _viewChanged(view) {
    this.viewChanged.emit(view);
  }
  ngOnDestroy() {
    this._destroyOverlay();
    this.close();
    this._inputStateChanges.unsubscribe();
    this._disabledChange.complete();
  }
  /** Selects the given date */
  _select(date) {
    this.oldValue = this._selected;
    this._selected = date;
    if (!this._actionsPortal) {
      if (!this._dateAdapter.sameDatetime(this.oldValue, this._selected)) {
        this.selectedChanged.emit(date);
      }
    }
  }
  _selectManually() {
    if (!this._selected) {
      this._selected = this._dateAdapter.today();
      this.selectedChanged.emit(this._selected);
    } else {
      this.selectedChanged.emit(this._selected || this.oldValue);
    }
    this.close();
  }
  _clearSelected() {
    this.oldValue = null;
    this._selected = null;
    this.selectedChanged.emit();
    this.close();
  }
  /**
   * Register an input with this datetimepicker.
   * @param input The datetimepicker input to register with this datetimepicker.
   */
  _registerInput(input) {
    if (this.datetimepickerInput) {
      throw Error("A MtxDatetimepicker can only be associated with a single input.");
    }
    this.datetimepickerInput = input;
    this._inputStateChanges = this.datetimepickerInput._valueChange.subscribe((value) => this._selected = value);
  }
  /** Open the calendar. */
  open() {
    if (this._opened || this.disabled) {
      return;
    }
    if (!this.datetimepickerInput) {
      throw Error("Attempted to open an MtxDatetimepicker with no associated input.");
    }
    this._focusedElementBeforeOpen = _getFocusedElementPierceShadowDom();
    this._openOverlay();
    this._opened = true;
    this.openedStream.emit();
  }
  /** Close the calendar. */
  close() {
    if (!this._opened) {
      return;
    }
    const canRestoreFocus = this.restoreFocus && this._focusedElementBeforeOpen && typeof this._focusedElementBeforeOpen.focus === "function";
    const completeClose = () => {
      if (this._opened) {
        this._opened = false;
        this.closedStream.emit();
      }
    };
    if (this._componentRef) {
      const {
        instance,
        location
      } = this._componentRef;
      instance._startExitAnimation();
      instance._animationDone.pipe(take(1)).subscribe(() => {
        const activeElement = this._document.activeElement;
        if (canRestoreFocus && (!activeElement || activeElement === this._document.activeElement || location.nativeElement.contains(activeElement))) {
          this._focusedElementBeforeOpen.focus();
        }
        this._focusedElementBeforeOpen = null;
        this._destroyOverlay();
      });
    }
    if (canRestoreFocus) {
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }
  /**
   * Forwards relevant values from the datetimepicker to the
   * datetimepicker content inside the overlay.
   */
  _forwardContentValues(instance) {
    instance.datetimepicker = this;
    instance.color = this.color;
    instance._dialogLabelId = this.datetimepickerInput.getOverlayLabelId();
    instance.type = this.type;
    instance.view = this.startView;
    instance._assignActions(this._actionsPortal, false);
  }
  /** Opens the overlay with the calendar. */
  _openOverlay() {
    this._destroyOverlay();
    const isDialog = this.touchUi;
    const labelId = this.datetimepickerInput.getOverlayLabelId();
    const portal = new ComponentPortal(MtxDatetimepickerContent, this._viewContainerRef);
    const overlayRef = this._overlayRef = this._overlay.create(new OverlayConfig({
      positionStrategy: isDialog ? this._getDialogStrategy() : this._getDropdownStrategy(),
      hasBackdrop: true,
      backdropClass: [isDialog ? "cdk-overlay-dark-backdrop" : "mat-overlay-transparent-backdrop", this._backdropHarnessClass],
      direction: this._dir,
      scrollStrategy: isDialog ? this._overlay.scrollStrategies.block() : this._scrollStrategy(),
      panelClass: `mtx-datetimepicker-${isDialog ? "dialog" : "popup"}`
    }));
    const overlayElement = overlayRef.overlayElement;
    overlayElement.setAttribute("role", "dialog");
    if (labelId) {
      overlayElement.setAttribute("aria-labelledby", labelId);
    }
    if (isDialog) {
      overlayElement.setAttribute("aria-modal", "true");
    }
    this._getCloseStream(overlayRef).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }
      this.close();
    });
    this._componentRef = overlayRef.attach(portal);
    this._forwardContentValues(this._componentRef.instance);
    if (!isDialog) {
      afterNextRender(() => {
        overlayRef.updatePosition();
      }, {
        injector: this._injector
      });
    }
  }
  /** Destroys the current overlay. */
  _destroyOverlay() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = this._componentRef = null;
    }
  }
  /** Gets a position strategy that will open the calendar as a dropdown. */
  _getDialogStrategy() {
    return this._overlay.position().global().centerHorizontally().centerVertically();
  }
  /** Gets a position strategy that will open the calendar as a dropdown. */
  _getDropdownStrategy() {
    const strategy = this._overlay.position().flexibleConnectedTo(this.datetimepickerInput.getConnectedOverlayOrigin()).withTransformOriginOn(".mtx-datetimepicker-content").withFlexibleDimensions(false).withViewportMargin(8).withLockedPosition();
    return this._setConnectedPositions(strategy);
  }
  /**
   * Sets the positions of the datetimepicker in dropdown mode based on the current configuration.
   */
  _setConnectedPositions(strategy) {
    const primaryX = this.xPosition === "end" ? "end" : "start";
    const secondaryX = primaryX === "start" ? "end" : "start";
    const primaryY = this.yPosition === "above" ? "bottom" : "top";
    const secondaryY = primaryY === "top" ? "bottom" : "top";
    return strategy.withPositions([{
      originX: primaryX,
      originY: secondaryY,
      overlayX: primaryX,
      overlayY: primaryY
    }, {
      originX: primaryX,
      originY: primaryY,
      overlayX: primaryX,
      overlayY: secondaryY
    }, {
      originX: secondaryX,
      originY: secondaryY,
      overlayX: secondaryX,
      overlayY: primaryY
    }, {
      originX: secondaryX,
      originY: primaryY,
      overlayX: secondaryX,
      overlayY: secondaryY
    }]);
  }
  /** Gets an observable that will emit when the overlay is supposed to be closed. */
  _getCloseStream(overlayRef) {
    return merge(overlayRef.backdropClick(), overlayRef.detachments(), overlayRef.keydownEvents().pipe(filter((event) => {
      return event.keyCode === ESCAPE && !hasModifierKey(event) || this.datetimepickerInput && hasModifierKey(event, "altKey") && event.keyCode === UP_ARROW;
    })));
  }
  /**
   * Registers a portal containing action buttons with the datetimepicker.
   * @param portal Portal to be registered.
   */
  registerActions(portal) {
    if (this._actionsPortal) {
      throw Error("A MtxDatetimepicker can only be associated with a single actions row.");
    }
    this._actionsPortal = portal;
    this._componentRef?.instance._assignActions(portal, true);
  }
  /**
   * Removes a portal containing action buttons from the datetimepicker.
   * @param portal Portal to be removed.
   */
  removeActions(portal) {
    if (portal === this._actionsPortal) {
      this._actionsPortal = null;
      this._componentRef?.instance._assignActions(null, true);
    }
  }
  static {
    this.ɵfac = function MtxDatetimepicker_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepicker)(ɵɵdirectiveInject(Overlay), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(MTX_DATETIMEPICKER_SCROLL_STRATEGY), ɵɵdirectiveInject(DatetimeAdapter, 8), ɵɵdirectiveInject(Directionality, 8));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxDatetimepicker,
      selectors: [["mtx-datetimepicker"]],
      inputs: {
        multiYearSelector: [2, "multiYearSelector", "multiYearSelector", booleanAttribute],
        twelvehour: [2, "twelvehour", "twelvehour", booleanAttribute],
        startView: "startView",
        mode: "mode",
        timeInterval: "timeInterval",
        preventSameDateTimeSelection: [2, "preventSameDateTimeSelection", "preventSameDateTimeSelection", booleanAttribute],
        calendarHeaderComponent: "calendarHeaderComponent",
        panelClass: "panelClass",
        opened: [2, "opened", "opened", booleanAttribute],
        color: "color",
        startAt: "startAt",
        type: "type",
        touchUi: [2, "touchUi", "touchUi", booleanAttribute],
        timeInput: [2, "timeInput", "timeInput", booleanAttribute],
        timeInputAutoFocus: [2, "timeInputAutoFocus", "timeInputAutoFocus", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        xPosition: "xPosition",
        yPosition: "yPosition",
        restoreFocus: [2, "restoreFocus", "restoreFocus", booleanAttribute]
      },
      outputs: {
        selectedChanged: "selectedChanged",
        openedStream: "opened",
        closedStream: "closed",
        viewChanged: "viewChanged"
      },
      exportAs: ["mtxDatetimepicker"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
      decls: 0,
      vars: 0,
      template: function MtxDatetimepicker_Template(rf, ctx) {
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepicker, [{
    type: Component,
    args: [{
      selector: "mtx-datetimepicker",
      exportAs: "mtxDatetimepicker",
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      preserveWhitespaces: false,
      standalone: true
    }]
  }], () => [{
    type: Overlay
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MTX_DATETIMEPICKER_SCROLL_STRATEGY]
    }]
  }, {
    type: DatetimeAdapter,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    multiYearSelector: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    twelvehour: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    startView: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    timeInterval: [{
      type: Input
    }],
    preventSameDateTimeSelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    calendarHeaderComponent: [{
      type: Input
    }],
    selectedChanged: [{
      type: Output
    }],
    openedStream: [{
      type: Output,
      args: ["opened"]
    }],
    closedStream: [{
      type: Output,
      args: ["closed"]
    }],
    viewChanged: [{
      type: Output
    }],
    panelClass: [{
      type: Input
    }],
    opened: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    startAt: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    touchUi: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    timeInput: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    timeInputAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    xPosition: [{
      type: Input
    }],
    yPosition: [{
      type: Input
    }],
    restoreFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MAT_DATETIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MtxDatetimepickerInput),
  multi: true
};
var MAT_DATETIMEPICKER_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MtxDatetimepickerInput),
  multi: true
};
var MtxDatetimepickerInputEvent = class {
  constructor(target, targetElement) {
    this.target = target;
    this.targetElement = targetElement;
    this.value = this.target.value;
  }
};
var MtxDatetimepickerInput = class _MtxDatetimepickerInput {
  constructor(_elementRef, _dateAdapter, _dateFormats, _formField) {
    this._elementRef = _elementRef;
    this._dateAdapter = _dateAdapter;
    this._dateFormats = _dateFormats;
    this._formField = _formField;
    this.dateChange = new EventEmitter();
    this.dateInput = new EventEmitter();
    this._valueChange = new EventEmitter();
    this._disabledChange = new EventEmitter();
    this._datetimepickerSubscription = Subscription.EMPTY;
    this._localeSubscription = Subscription.EMPTY;
    this._lastValueValid = false;
    this._onTouched = () => {
    };
    this._cvaOnChange = () => {
    };
    this._validatorOnChange = () => {
    };
    this._parseValidator = () => {
      return this._lastValueValid ? null : {
        mtxDatetimepickerParse: {
          text: this._elementRef.nativeElement.value
        }
      };
    };
    this._minValidator = (control) => {
      const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
      return !this.min || !controlValue || this._dateAdapter.compareDatetime(this.min, controlValue) <= 0 ? null : {
        mtxDatetimepickerMin: {
          min: this.min,
          actual: controlValue
        }
      };
    };
    this._maxValidator = (control) => {
      const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
      return !this.max || !controlValue || this._dateAdapter.compareDatetime(this.max, controlValue) >= 0 ? null : {
        mtxDatetimepickerMax: {
          max: this.max,
          actual: controlValue
        }
      };
    };
    this._filterValidator = (control) => {
      const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
      return !this._dateFilter || !controlValue || this._dateFilter(controlValue, MtxDatetimepickerFilterType.DATE) ? null : {
        mtxDatetimepickerFilter: true
      };
    };
    this._validator = Validators.compose([this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);
    if (!this._dateAdapter) {
      throw createMissingDateImplError("DatetimeAdapter");
    }
    if (!this._dateFormats) {
      throw createMissingDateImplError("MTX_DATETIME_FORMATS");
    }
    this._localeSubscription = _dateAdapter.localeChanges.subscribe(() => {
      this.value = this._dateAdapter.deserialize(this.value);
    });
  }
  /** The datetimepicker that this input is associated with. */
  set mtxDatetimepicker(value) {
    this.registerDatetimepicker(value);
  }
  set mtxDatetimepickerFilter(filter2) {
    this._dateFilter = filter2;
    this._validatorOnChange();
  }
  /** The value of the input. */
  get value() {
    return this._value;
  }
  set value(value) {
    value = this._dateAdapter.deserialize(value);
    this._lastValueValid = !value || this._dateAdapter.isValid(value);
    value = this._dateAdapter.getValidDateOrNull(value);
    const oldDate = this.value;
    this._value = value;
    this._formatValue(value);
    setTimeout(() => {
      if (!this._dateAdapter.sameDatetime(oldDate, value)) {
        this._valueChange.emit(value);
      }
    });
  }
  /** The minimum valid date. */
  get min() {
    return this._min;
  }
  set min(value) {
    this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    this._validatorOnChange();
  }
  /** The maximum valid date. */
  get max() {
    return this._max;
  }
  set max(value) {
    this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    this._validatorOnChange();
  }
  /** Whether the datetimepicker-input is disabled. */
  get disabled() {
    return !!this._disabled;
  }
  set disabled(value) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._disabledChange.emit(value);
    }
  }
  ngAfterContentInit() {
    if (this._datetimepicker) {
      this._datetimepickerSubscription = this._datetimepicker.selectedChanged.subscribe((selected) => {
        this.value = selected;
        this._cvaOnChange(selected);
        this._onTouched();
        this.dateInput.emit(new MtxDatetimepickerInputEvent(this, this._elementRef.nativeElement));
        this.dateChange.emit(new MtxDatetimepickerInputEvent(this, this._elementRef.nativeElement));
      });
    }
  }
  ngOnDestroy() {
    this._datetimepickerSubscription.unsubscribe();
    this._localeSubscription.unsubscribe();
    this._valueChange.complete();
    this._disabledChange.complete();
  }
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  validate(c) {
    return this._validator ? this._validator(c) : null;
  }
  /**
   * Gets the element that the datetimepicker popup should be connected to.
   * @return The element to connect the popup to.
   */
  getConnectedOverlayOrigin() {
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
  }
  /** Gets the ID of an element that should be used a description for the calendar overlay. */
  getOverlayLabelId() {
    if (this._formField) {
      return this._formField.getLabelId();
    }
    return this._elementRef.nativeElement.getAttribute("aria-labelledby");
  }
  // Implemented as part of ControlValueAccessor
  writeValue(value) {
    this.value = value;
  }
  // Implemented as part of ControlValueAccessor
  registerOnChange(fn) {
    this._cvaOnChange = fn;
  }
  // Implemented as part of ControlValueAccessor
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  // Implemented as part of ControlValueAccessor
  setDisabledState(disabled) {
    this.disabled = disabled;
  }
  _onKeydown(event) {
    if (event.altKey && event.keyCode === DOWN_ARROW) {
      this._datetimepicker.open();
      event.preventDefault();
    }
  }
  _onInput(value) {
    let date = this._dateAdapter.parse(value, this.getParseFormat());
    this._lastValueValid = !date || this._dateAdapter.isValid(date);
    date = this._dateAdapter.getValidDateOrNull(date);
    this._value = date;
    this._cvaOnChange(date);
    this._valueChange.emit(date);
    this.dateInput.emit(new MtxDatetimepickerInputEvent(this, this._elementRef.nativeElement));
  }
  _onChange() {
    this.dateChange.emit(new MtxDatetimepickerInputEvent(this, this._elementRef.nativeElement));
  }
  /** Handles blur events on the input. */
  _onBlur() {
    if (this.value) {
      this._formatValue(this.value);
    }
    this._onTouched();
  }
  registerDatetimepicker(value) {
    if (value) {
      this._datetimepicker = value;
      this._datetimepicker._registerInput(this);
    }
  }
  getDisplayFormat() {
    switch (this._datetimepicker.type) {
      case "date":
        return this._dateFormats.display.dateInput;
      case "datetime":
        return this._dateFormats.display.datetimeInput;
      case "time":
        return this._dateFormats.display.timeInput;
      case "month":
        return this._dateFormats.display.monthInput;
      case "year":
        return this._dateFormats.display.yearInput;
    }
  }
  getParseFormat() {
    let parseFormat;
    switch (this._datetimepicker.type) {
      case "date":
        parseFormat = this._dateFormats.parse.dateInput;
        break;
      case "datetime":
        parseFormat = this._dateFormats.parse.datetimeInput;
        break;
      case "time":
        parseFormat = this._dateFormats.parse.timeInput;
        break;
      case "month":
        parseFormat = this._dateFormats.parse.monthInput;
        break;
      case "year":
        parseFormat = this._dateFormats.parse.yearInput;
        break;
    }
    if (!parseFormat) {
      parseFormat = this._dateFormats.parse.dateInput;
    }
    return parseFormat;
  }
  /** Formats a value and sets it on the input element. */
  _formatValue(value) {
    this._elementRef.nativeElement.value = value ? this._dateAdapter.format(value, this.getDisplayFormat()) : "";
  }
  /** Returns the palette used by the input's form field, if any. */
  getThemePalette() {
    return this._formField ? this._formField.color : void 0;
  }
  static {
    this.ɵfac = function MtxDatetimepickerInput_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerInput)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DatetimeAdapter, 8), ɵɵdirectiveInject(MTX_DATETIME_FORMATS, 8), ɵɵdirectiveInject(MatFormField, 8));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MtxDatetimepickerInput,
      selectors: [["input", "mtxDatetimepicker", ""]],
      hostVars: 5,
      hostBindings: function MtxDatetimepickerInput_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("input", function MtxDatetimepickerInput_input_HostBindingHandler($event) {
            return ctx._onInput($event.target.value);
          })("change", function MtxDatetimepickerInput_change_HostBindingHandler() {
            return ctx._onChange();
          })("blur", function MtxDatetimepickerInput_blur_HostBindingHandler() {
            return ctx._onBlur();
          })("keydown", function MtxDatetimepickerInput_keydown_HostBindingHandler($event) {
            return ctx._onKeydown($event);
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("disabled", ctx.disabled);
          ɵɵattribute("aria-haspopup", true)("aria-owns", (ctx._datetimepicker == null ? null : ctx._datetimepicker.opened) && ctx._datetimepicker.id || null)("min", ctx.min ? ctx._dateAdapter.toIso8601(ctx.min) : null)("max", ctx.max ? ctx._dateAdapter.toIso8601(ctx.max) : null);
        }
      },
      inputs: {
        mtxDatetimepicker: "mtxDatetimepicker",
        mtxDatetimepickerFilter: "mtxDatetimepickerFilter",
        value: "value",
        min: "min",
        max: "max",
        disabled: [2, "disabled", "disabled", booleanAttribute]
      },
      outputs: {
        dateChange: "dateChange",
        dateInput: "dateInput"
      },
      exportAs: ["mtxDatetimepickerInput"],
      standalone: true,
      features: [ɵɵProvidersFeature([MAT_DATETIMEPICKER_VALUE_ACCESSOR, MAT_DATETIMEPICKER_VALIDATORS, {
        provide: MAT_INPUT_VALUE_ACCESSOR,
        useExisting: _MtxDatetimepickerInput
      }]), ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerInput, [{
    type: Directive,
    args: [{
      selector: "input[mtxDatetimepicker]",
      providers: [MAT_DATETIMEPICKER_VALUE_ACCESSOR, MAT_DATETIMEPICKER_VALIDATORS, {
        provide: MAT_INPUT_VALUE_ACCESSOR,
        useExisting: MtxDatetimepickerInput
      }],
      host: {
        "[attr.aria-haspopup]": "true",
        "[attr.aria-owns]": "(_datetimepicker?.opened && _datetimepicker.id) || null",
        "[attr.min]": "min ? _dateAdapter.toIso8601(min) : null",
        "[attr.max]": "max ? _dateAdapter.toIso8601(max) : null",
        "[disabled]": "disabled",
        "(input)": "_onInput($event.target.value)",
        "(change)": "_onChange()",
        "(blur)": "_onBlur()",
        "(keydown)": "_onKeydown($event)"
      },
      exportAs: "mtxDatetimepickerInput",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: DatetimeAdapter,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MTX_DATETIME_FORMATS]
    }]
  }, {
    type: MatFormField,
    decorators: [{
      type: Optional
    }]
  }], {
    dateChange: [{
      type: Output
    }],
    dateInput: [{
      type: Output
    }],
    mtxDatetimepicker: [{
      type: Input
    }],
    mtxDatetimepickerFilter: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MtxDatetimepickerToggleIcon = class _MtxDatetimepickerToggleIcon {
  static {
    this.ɵfac = function MtxDatetimepickerToggleIcon_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerToggleIcon)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MtxDatetimepickerToggleIcon,
      selectors: [["", "mtxDatetimepickerToggleIcon", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerToggleIcon, [{
    type: Directive,
    args: [{
      selector: "[mtxDatetimepickerToggleIcon]",
      standalone: true
    }]
  }], null, null);
})();
var MtxDatetimepickerToggle = class _MtxDatetimepickerToggle {
  /** Whether the toggle button is disabled. */
  get disabled() {
    return this._disabled === void 0 ? this.datetimepicker.disabled : !!this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  constructor(_intl, _changeDetectorRef, defaultTabIndex) {
    this._intl = _intl;
    this._changeDetectorRef = _changeDetectorRef;
    this._stateChanges = Subscription.EMPTY;
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
  }
  ngOnChanges(changes) {
    if (changes.datetimepicker) {
      this._watchStateChanges();
    }
  }
  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }
  ngAfterContentInit() {
    this._watchStateChanges();
  }
  _open(event) {
    if (this.datetimepicker && !this.disabled) {
      this.datetimepicker.open();
      event.stopPropagation();
    }
  }
  _watchStateChanges() {
    const datetimepickerDisabled = this.datetimepicker ? this.datetimepicker._disabledChange : of();
    const inputDisabled = this.datetimepicker && this.datetimepicker.datetimepickerInput ? this.datetimepicker.datetimepickerInput._disabledChange : of();
    const datetimepickerToggled = this.datetimepicker ? merge(this.datetimepicker.openedStream, this.datetimepicker.closedStream) : of();
    this._stateChanges.unsubscribe();
    this._stateChanges = merge(this._intl.changes, datetimepickerDisabled, inputDisabled, datetimepickerToggled).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  static {
    this.ɵfac = function MtxDatetimepickerToggle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerToggle)(ɵɵdirectiveInject(MtxDatetimepickerIntl), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵinjectAttribute("tabindex"));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxDatetimepickerToggle,
      selectors: [["mtx-datetimepicker-toggle"]],
      contentQueries: function MtxDatetimepickerToggle_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, MtxDatetimepickerToggleIcon, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._customIcon = _t.first);
        }
      },
      viewQuery: function MtxDatetimepickerToggle_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c3, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._button = _t.first);
        }
      },
      hostAttrs: [1, "mtx-datetimepicker-toggle"],
      hostVars: 8,
      hostBindings: function MtxDatetimepickerToggle_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function MtxDatetimepickerToggle_click_HostBindingHandler($event) {
            return ctx._open($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("tabindex", null)("data-mtx-calendar", ctx.datetimepicker ? ctx.datetimepicker.id : null);
          ɵɵclassProp("mtx-datetimepicker-toggle-active", ctx.datetimepicker && ctx.datetimepicker.opened)("mat-accent", ctx.datetimepicker && ctx.datetimepicker.color === "accent")("mat-warn", ctx.datetimepicker && ctx.datetimepicker.color === "warn");
        }
      },
      inputs: {
        datetimepicker: [0, "for", "datetimepicker"],
        tabIndex: "tabIndex",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute]
      },
      exportAs: ["mtxDatetimepickerToggle"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      ngContentSelectors: _c5,
      decls: 4,
      vars: 6,
      consts: [["button", ""], ["mat-icon-button", "", "type", "button", 3, "disabled", "disableRipple"], ["viewBox", "0 0 24 24", "width", "24px", "height", "24px", "fill", "currentColor", "focusable", "false", 1, "mtx-datetimepicker-toggle-default-icon"], ["d", "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"], ["d", "M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z"], ["d", "M0 0h24v24H0z", "fill", "none"], ["d", "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"]],
      template: function MtxDatetimepickerToggle_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c4);
          ɵɵelementStart(0, "button", 1, 0);
          ɵɵtemplate(2, MtxDatetimepickerToggle_Conditional_2_Template, 3, 1);
          ɵɵprojection(3);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("disabled", ctx.disabled)("disableRipple", ctx.disableRipple);
          ɵɵattribute("aria-haspopup", ctx.datetimepicker ? "dialog" : null)("aria-label", ctx.ariaLabel || ctx._intl.openCalendarLabel)("tabindex", ctx.disabled ? -1 : ctx.tabIndex);
          ɵɵadvance(2);
          ɵɵconditional(!ctx._customIcon ? 2 : -1);
        }
      },
      dependencies: [MatIconButton],
      styles: [".mtx-datetimepicker-toggle{pointer-events:auto;color:var(--mtx-datetimepicker-toggle-icon-color, var(--mat-app-on-surface-variant))}.mtx-datetimepicker-toggle-active{color:var(--mtx-datetimepicker-toggle-active-state-icon-color, var(--mat-app-on-surface-variant))}.cdk-high-contrast-active .mtx-datetimepicker-toggle-default-icon{color:CanvasText}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerToggle, [{
    type: Component,
    args: [{
      selector: "mtx-datetimepicker-toggle",
      host: {
        "class": "mtx-datetimepicker-toggle",
        "[attr.tabindex]": "null",
        "[class.mtx-datetimepicker-toggle-active]": "datetimepicker && datetimepicker.opened",
        "[class.mat-accent]": 'datetimepicker && datetimepicker.color === "accent"',
        "[class.mat-warn]": 'datetimepicker && datetimepicker.color === "warn"',
        // Used by the test harness to tie this toggle to its datetimepicker.
        "[attr.data-mtx-calendar]": "datetimepicker ? datetimepicker.id : null",
        // Bind the `click` on the host, rather than the inner `button`, so that we can call
        // `stopPropagation` on it without affecting the user's `click` handlers. We need to stop
        // it so that the input doesn't get focused automatically by the form field (See #21836).
        "(click)": "_open($event)"
      },
      exportAs: "mtxDatetimepickerToggle",
      encapsulation: ViewEncapsulation$1.None,
      preserveWhitespaces: false,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatIconButton],
      template: `<button #button
  mat-icon-button
  type="button"
  [attr.aria-haspopup]="datetimepicker ? 'dialog' : null"
  [attr.aria-label]="ariaLabel || _intl.openCalendarLabel"
  [attr.tabindex]="disabled ? -1 : tabIndex"
  [disabled]="disabled"
  [disableRipple]="disableRipple">

  @if (!_customIcon) {
    @switch (datetimepicker.type) {
      @case ('time') {
        <svg
          class="mtx-datetimepicker-toggle-default-icon"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          fill="currentColor"
          focusable="false">
          <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
        </svg>
      }
      @case ('datetime') {
        <svg
          class="mtx-datetimepicker-toggle-default-icon"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          fill="currentColor"
          focusable="false">
          <path d="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z" />
        </svg>
      }
      @default {
        <svg
          class="mtx-datetimepicker-toggle-default-icon"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          fill="currentColor"
          focusable="false">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
      }
    }
  }

  <ng-content select="[mtxDatetimepickerToggleIcon]"></ng-content>
</button>
`,
      styles: [".mtx-datetimepicker-toggle{pointer-events:auto;color:var(--mtx-datetimepicker-toggle-icon-color, var(--mat-app-on-surface-variant))}.mtx-datetimepicker-toggle-active{color:var(--mtx-datetimepicker-toggle-active-state-icon-color, var(--mat-app-on-surface-variant))}.cdk-high-contrast-active .mtx-datetimepicker-toggle-default-icon{color:CanvasText}\n"]
    }]
  }], () => [{
    type: MtxDatetimepickerIntl
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }], {
    datetimepicker: [{
      type: Input,
      args: ["for"]
    }],
    tabIndex: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    _customIcon: [{
      type: ContentChild,
      args: [MtxDatetimepickerToggleIcon]
    }],
    _button: [{
      type: ViewChild,
      args: ["button"]
    }]
  });
})();
var MtxDatetimepickerApply = class _MtxDatetimepickerApply {
  constructor(_datetimepicker) {
    this._datetimepicker = _datetimepicker;
  }
  static {
    this.ɵfac = function MtxDatetimepickerApply_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerApply)(ɵɵdirectiveInject(MtxDatetimepicker));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MtxDatetimepickerApply,
      selectors: [["", "mtxDatetimepickerApply", ""]],
      hostBindings: function MtxDatetimepickerApply_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function MtxDatetimepickerApply_click_HostBindingHandler() {
            return ctx._datetimepicker._selectManually();
          });
        }
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerApply, [{
    type: Directive,
    args: [{
      selector: "[mtxDatetimepickerApply]",
      host: {
        "(click)": "_datetimepicker._selectManually()"
      },
      standalone: true
    }]
  }], () => [{
    type: MtxDatetimepicker
  }], null);
})();
var MtxDatetimepickerCancel = class _MtxDatetimepickerCancel {
  constructor(_datetimepicker) {
    this._datetimepicker = _datetimepicker;
  }
  static {
    this.ɵfac = function MtxDatetimepickerCancel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerCancel)(ɵɵdirectiveInject(MtxDatetimepicker));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MtxDatetimepickerCancel,
      selectors: [["", "mtxDatetimepickerCancel", ""]],
      hostBindings: function MtxDatetimepickerCancel_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function MtxDatetimepickerCancel_click_HostBindingHandler() {
            return ctx._datetimepicker.close();
          });
        }
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerCancel, [{
    type: Directive,
    args: [{
      selector: "[mtxDatetimepickerCancel]",
      host: {
        "(click)": "_datetimepicker.close()"
      },
      standalone: true
    }]
  }], () => [{
    type: MtxDatetimepicker
  }], null);
})();
var MtxDatetimepickerClear = class _MtxDatetimepickerClear {
  constructor(_datetimepicker) {
    this._datetimepicker = _datetimepicker;
  }
  static {
    this.ɵfac = function MtxDatetimepickerClear_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerClear)(ɵɵdirectiveInject(MtxDatetimepicker));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MtxDatetimepickerClear,
      selectors: [["", "mtxDatetimepickerClear", ""]],
      hostBindings: function MtxDatetimepickerClear_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function MtxDatetimepickerClear_click_HostBindingHandler() {
            return ctx._datetimepicker._clearSelected();
          });
        }
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerClear, [{
    type: Directive,
    args: [{
      selector: "[mtxDatetimepickerClear]",
      host: {
        "(click)": "_datetimepicker._clearSelected()"
      },
      standalone: true
    }]
  }], () => [{
    type: MtxDatetimepicker
  }], null);
})();
var MtxDatetimepickerActions = class _MtxDatetimepickerActions {
  constructor(_datetimepicker, _viewContainerRef) {
    this._datetimepicker = _datetimepicker;
    this._viewContainerRef = _viewContainerRef;
  }
  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._template, this._viewContainerRef);
    this._datetimepicker.registerActions(this._portal);
  }
  ngOnDestroy() {
    this._datetimepicker.removeActions(this._portal);
    if (this._portal && this._portal.isAttached) {
      this._portal?.detach();
    }
  }
  static {
    this.ɵfac = function MtxDatetimepickerActions_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerActions)(ɵɵdirectiveInject(MtxDatetimepicker), ɵɵdirectiveInject(ViewContainerRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxDatetimepickerActions,
      selectors: [["mtx-datetimepicker-actions"]],
      viewQuery: function MtxDatetimepickerActions_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(TemplateRef, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._template = _t.first);
        }
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c6,
      decls: 1,
      vars: 0,
      consts: [[1, "mtx-datetimepicker-actions"]],
      template: function MtxDatetimepickerActions_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, MtxDatetimepickerActions_ng_template_0_Template, 2, 0, "ng-template");
        }
      },
      styles: [".mtx-datetimepicker-actions{position:relative;display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px}.mtx-datetimepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mtx-datetimepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerActions, [{
    type: Component,
    args: [{
      selector: "mtx-datetimepicker-actions",
      template: `
    <ng-template>
      <div class="mtx-datetimepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      styles: [".mtx-datetimepicker-actions{position:relative;display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px}.mtx-datetimepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mtx-datetimepicker-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"]
    }]
  }], () => [{
    type: MtxDatetimepicker
  }, {
    type: ViewContainerRef
  }], {
    _template: [{
      type: ViewChild,
      args: [TemplateRef]
    }]
  });
})();
var MtxDatetimepickerModule = class _MtxDatetimepickerModule {
  static {
    this.ɵfac = function MtxDatetimepickerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDatetimepickerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxDatetimepickerModule,
      imports: [CommonModule, OverlayModule, A11yModule, PortalModule, MatButtonModule, MtxCalendar, MtxCalendarBody, MtxClock, MtxTime, MtxTimeInput, MtxDatetimepicker, MtxDatetimepickerToggle, MtxDatetimepickerToggleIcon, MtxDatetimepickerInput, MtxDatetimepickerContent, MtxMonthView, MtxYearView, MtxMultiYearView, MtxDatetimepickerApply, MtxDatetimepickerCancel, MtxDatetimepickerClear, MtxDatetimepickerActions],
      exports: [MtxCalendar, MtxCalendarBody, MtxClock, MtxTime, MtxDatetimepicker, MtxDatetimepickerToggle, MtxDatetimepickerToggleIcon, MtxDatetimepickerInput, MtxDatetimepickerContent, MtxMonthView, MtxYearView, MtxMultiYearView, MtxDatetimepickerApply, MtxDatetimepickerCancel, MtxDatetimepickerClear, MtxDatetimepickerActions]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [MTX_DATETIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER],
      imports: [CommonModule, OverlayModule, A11yModule, PortalModule, MatButtonModule, MtxCalendar, MtxTime, MtxDatetimepickerToggle, MtxDatetimepickerContent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDatetimepickerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, OverlayModule, A11yModule, PortalModule, MatButtonModule, MtxCalendar, MtxCalendarBody, MtxClock, MtxTime, MtxTimeInput, MtxDatetimepicker, MtxDatetimepickerToggle, MtxDatetimepickerToggleIcon, MtxDatetimepickerInput, MtxDatetimepickerContent, MtxMonthView, MtxYearView, MtxMultiYearView, MtxDatetimepickerApply, MtxDatetimepickerCancel, MtxDatetimepickerClear, MtxDatetimepickerActions],
      exports: [MtxCalendar, MtxCalendarBody, MtxClock, MtxTime, MtxDatetimepicker, MtxDatetimepickerToggle, MtxDatetimepickerToggleIcon, MtxDatetimepickerInput, MtxDatetimepickerContent, MtxMonthView, MtxYearView, MtxMultiYearView, MtxDatetimepickerApply, MtxDatetimepickerCancel, MtxDatetimepickerClear, MtxDatetimepickerActions],
      providers: [MTX_DATETIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();
export {
  CLOCK_INNER_RADIUS,
  CLOCK_OUTER_RADIUS,
  CLOCK_RADIUS,
  CLOCK_TICK_RADIUS,
  MAT_DATETIMEPICKER_VALIDATORS,
  MAT_DATETIMEPICKER_VALUE_ACCESSOR,
  MTX_DATETIMEPICKER_SCROLL_STRATEGY,
  MTX_DATETIMEPICKER_SCROLL_STRATEGY_FACTORY,
  MTX_DATETIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MtxCalendar,
  MtxCalendarBody,
  MtxCalendarCell,
  MtxClock,
  MtxDatetimepicker,
  MtxDatetimepickerActions,
  MtxDatetimepickerApply,
  MtxDatetimepickerCancel,
  MtxDatetimepickerClear,
  MtxDatetimepickerContent,
  MtxDatetimepickerFilterType,
  MtxDatetimepickerInput,
  MtxDatetimepickerInputEvent,
  MtxDatetimepickerIntl,
  MtxDatetimepickerModule,
  MtxDatetimepickerToggle,
  MtxDatetimepickerToggleIcon,
  MtxMonthView,
  MtxMultiYearView,
  MtxTime,
  MtxTimeInput,
  MtxYearView,
  getActiveOffset,
  isSameMultiYearView,
  mtxDatetimepickerAnimations,
  yearsPerPage,
  yearsPerRow
};
//# sourceMappingURL=@ng-matero_extensions_datetimepicker.js.map
