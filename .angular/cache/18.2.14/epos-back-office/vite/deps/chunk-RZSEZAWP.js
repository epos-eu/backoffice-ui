import {
  DateAdapter,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
  NativeDateModule
} from "./chunk-E5ILAOQ3.js";
import {
  CommonModule
} from "./chunk-ZIDM5L6D.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  Optional,
  Pipe,
  TemplateRef,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵinject
} from "./chunk-RTEUSPZQ.js";
import {
  isObservable
} from "./chunk-3GDIDV32.js";
import {
  of
} from "./chunk-PVXNJD7T.js";

// node_modules/.pnpm/@ng-matero+extensions@18.4.1_@angular+animations@18.2.13_@angular+core@18.2.13_rxjs@7.5_bc5be00a34dfa200d14de048f5d0c427/node_modules/@ng-matero/extensions/fesm2022/mtxCore.mjs
var DatetimeAdapter = class extends DateAdapter {
  constructor(_delegate) {
    super();
    this._delegate = _delegate;
  }
  getValidDateOrNull(obj) {
    return this.isDateInstance(obj) && this.isValid(obj) ? obj : null;
  }
  compareDatetime(first, second, respectMinutePart = true) {
    return this.compareDate(first, second) || this.getHour(first) - this.getHour(second) || respectMinutePart && this.getMinute(first) - this.getMinute(second);
  }
  sameDatetime(first, second) {
    if (first && second) {
      const firstValid = this.isValid(first);
      const secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return !this.compareDatetime(first, second);
      }
      return firstValid === secondValid;
    }
    return first === second;
  }
  sameYear(first, second) {
    return first && second && this.getYear(first) === this.getYear(second);
  }
  sameDay(first, second) {
    return first && second && this.getDate(first) === this.getDate(second) && this.sameMonthAndYear(first, second);
  }
  sameHour(first, second) {
    return first && second && this.getHour(first) === this.getHour(second) && this.sameDay(first, second);
  }
  sameMinute(first, second) {
    return first && second && this.getMinute(first) === this.getMinute(second) && this.sameHour(first, second);
  }
  sameMonthAndYear(first, second) {
    if (first && second) {
      const firstValid = this.isValid(first);
      const secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return !(this.getYear(first) - this.getYear(second) || this.getMonth(first) - this.getMonth(second));
      }
      return firstValid === secondValid;
    }
    return first === second;
  }
  // delegate
  clone(date) {
    return this._delegate.clone(date);
  }
  addCalendarYears(date, years) {
    return this._delegate.addCalendarYears(date, years);
  }
  addCalendarMonths(date, months) {
    return this._delegate.addCalendarMonths(date, months);
  }
  addCalendarDays(date, days) {
    return this._delegate.addCalendarDays(date, days);
  }
  getYear(date) {
    return this._delegate.getYear(date);
  }
  getMonth(date) {
    return this._delegate.getMonth(date);
  }
  getDate(date) {
    return this._delegate.getDate(date);
  }
  getDayOfWeek(date) {
    return this._delegate.getDayOfWeek(date);
  }
  getMonthNames(style) {
    return this._delegate.getMonthNames(style);
  }
  getDateNames() {
    return this._delegate.getDateNames();
  }
  getDayOfWeekNames(style) {
    return this._delegate.getDayOfWeekNames(style);
  }
  getYearName(date) {
    return this._delegate.getYearName(date);
  }
  getFirstDayOfWeek() {
    return this._delegate.getFirstDayOfWeek();
  }
  getNumDaysInMonth(date) {
    return this._delegate.getNumDaysInMonth(date);
  }
  createDate(year, month, date) {
    return this._delegate.createDate(year, month, date);
  }
  today() {
    return this._delegate.today();
  }
  parse(value, parseFormat) {
    return this._delegate.parse(value, parseFormat);
  }
  format(date, displayFormat) {
    return this._delegate.format(date, displayFormat);
  }
  toIso8601(date) {
    return this._delegate.toIso8601(date);
  }
  isDateInstance(obj) {
    return this._delegate.isDateInstance(obj);
  }
  isValid(date) {
    return this._delegate.isValid(date);
  }
  invalid() {
    return this._delegate.invalid();
  }
  clampDate(date, min, max) {
    if (min && this.compareDatetime(date, min) < 0) {
      return min;
    }
    if (max && this.compareDatetime(date, max) > 0) {
      return max;
    }
    return date;
  }
};
var MTX_DATETIME_FORMATS = new InjectionToken("mtx-datetime-formats");
var DEFAULT_HOUR_NAMES = range(24, (i) => String(i));
var DEFAULT_MINUTE_NAMES = range(60, (i) => String(i));
function range(length, valueFunction) {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}
var NativeDatetimeAdapter = class _NativeDatetimeAdapter extends DatetimeAdapter {
  constructor(matDateLocale, _delegate) {
    super(_delegate);
    this.setLocale(matDateLocale);
  }
  clone(date) {
    return this.createDatetime(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date));
  }
  getHour(date) {
    return date.getHours();
  }
  getMinute(date) {
    return date.getMinutes();
  }
  isInNextMonth(startDate, endDate) {
    const nextMonth = this.getDateInNextMonth(startDate);
    return this.sameMonthAndYear(nextMonth, endDate);
  }
  createDatetime(year, month, date, hour, minute) {
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    if (hour < 0 || hour > 23) {
      throw Error(`Invalid hour "${hour}". Hour has to be between 0 and 23.`);
    }
    if (minute < 0 || minute > 59) {
      throw Error(`Invalid minute "${minute}". Minute has to be between 0 and 59.`);
    }
    const result = this._createDateWithOverflow(year, month, date, hour, minute);
    if (result.getMonth() !== month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
  getFirstDateOfMonth(date) {
    const result = /* @__PURE__ */ new Date();
    result.setFullYear(date.getFullYear(), date.getMonth(), 1);
    return result;
  }
  getHourNames() {
    return DEFAULT_HOUR_NAMES;
  }
  getMinuteNames() {
    return DEFAULT_MINUTE_NAMES;
  }
  addCalendarYears(date, years) {
    return this.addCalendarMonths(date, years * 12);
  }
  addCalendarMonths(date, months) {
    let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHour(date), this.getMinute(date));
    if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
      newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHour(date), this.getMinute(date));
    }
    return newDate;
  }
  addCalendarDays(date, days) {
    return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHour(date), this.getMinute(date));
  }
  addCalendarHours(date, hours) {
    return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date) + hours, this.getMinute(date));
  }
  addCalendarMinutes(date, minutes) {
    return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date) + minutes);
  }
  toIso8601(date) {
    return super.toIso8601(date) + "T" + [this._2digit(date.getUTCHours()), this._2digit(date.getUTCMinutes())].join(":");
  }
  getDateInNextMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
  }
  /**
   * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
   * other browsers do not. We remove them to make output consistent and because they interfere with
   * date parsing.
   * @param str The string to strip direction characters from.
   * @returns The stripped string.
   */
  _stripDirectionalityCharacters(str) {
    return str.replace(/[\u200e\u200f]/g, "");
  }
  /**
   * Pads a number to make it two digits.
   * @param n The number to pad.
   * @returns The padded number.
   */
  _2digit(n) {
    return ("00" + n).slice(-2);
  }
  /** Creates a date but allows the month and date to overflow. */
  _createDateWithOverflow(year, month, date, hours, minutes) {
    const result = new Date(year, month, date, hours, minutes);
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }
  static {
    this.ɵfac = function NativeDatetimeAdapter_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NativeDatetimeAdapter)(ɵɵinject(MAT_DATE_LOCALE, 8), ɵɵinject(DateAdapter));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NativeDatetimeAdapter,
      factory: _NativeDatetimeAdapter.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NativeDatetimeAdapter, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_DATE_LOCALE]
    }]
  }, {
    type: DateAdapter
  }], null);
})();
var MTX_NATIVE_DATETIME_FORMATS = {
  parse: {},
  display: {
    dateInput: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    },
    monthInput: {
      month: "long"
    },
    datetimeInput: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    },
    timeInput: {
      hour: "2-digit",
      minute: "2-digit"
    },
    monthYearLabel: {
      year: "numeric",
      month: "short"
    },
    dateA11yLabel: {
      year: "numeric",
      month: "long",
      day: "numeric"
    },
    monthYearA11yLabel: {
      year: "numeric",
      month: "long"
    },
    popupHeaderDateLabel: {
      weekday: "short",
      month: "short",
      day: "2-digit"
    }
  }
};
var NativeDatetimeModule = class _NativeDatetimeModule {
  static {
    this.ɵfac = function NativeDatetimeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NativeDatetimeModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NativeDatetimeModule,
      imports: [NativeDateModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [{
        provide: DatetimeAdapter,
        useClass: NativeDatetimeAdapter
      }],
      imports: [NativeDateModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NativeDatetimeModule, [{
    type: NgModule,
    args: [{
      imports: [NativeDateModule],
      providers: [{
        provide: DatetimeAdapter,
        useClass: NativeDatetimeAdapter
      }]
    }]
  }], null, null);
})();
function provideNativeDatetimeAdapter(formats = MTX_NATIVE_DATETIME_FORMATS) {
  return [{
    provide: DateAdapter,
    useClass: NativeDateAdapter
  }, {
    provide: DatetimeAdapter,
    useClass: NativeDatetimeAdapter
  }, {
    provide: MTX_DATETIME_FORMATS,
    useValue: formats
  }];
}
var MtxNativeDatetimeModule = class _MtxNativeDatetimeModule {
  static {
    this.ɵfac = function MtxNativeDatetimeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxNativeDatetimeModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxNativeDatetimeModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [provideNativeDatetimeAdapter()]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxNativeDatetimeModule, [{
    type: NgModule,
    args: [{
      providers: [provideNativeDatetimeAdapter()]
    }]
  }], null, null);
})();
var MtxToObservablePipe = class _MtxToObservablePipe {
  transform(value) {
    return isObservable(value) ? value : of(value);
  }
  static {
    this.ɵfac = function MtxToObservablePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxToObservablePipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "toObservable",
      type: _MtxToObservablePipe,
      pure: true,
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxToObservablePipe, [{
    type: Pipe,
    args: [{
      name: "toObservable",
      standalone: true
    }]
  }], null, null);
})();
var MtxIsTemplateRefPipe = class _MtxIsTemplateRefPipe {
  transform(obj) {
    return obj instanceof TemplateRef;
  }
  static {
    this.ɵfac = function MtxIsTemplateRefPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxIsTemplateRefPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "isTemplateRef",
      type: _MtxIsTemplateRefPipe,
      pure: true,
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxIsTemplateRefPipe, [{
    type: Pipe,
    args: [{
      name: "isTemplateRef",
      standalone: true
    }]
  }], null, null);
})();
var MtxPipesModule = class _MtxPipesModule {
  static {
    this.ɵfac = function MtxPipesModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxPipesModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxPipesModule,
      imports: [CommonModule, MtxToObservablePipe, MtxIsTemplateRefPipe],
      exports: [MtxToObservablePipe, MtxIsTemplateRefPipe]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxPipesModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MtxToObservablePipe, MtxIsTemplateRefPipe],
      exports: [MtxToObservablePipe, MtxIsTemplateRefPipe]
    }]
  }], null, null);
})();

export {
  DatetimeAdapter,
  MTX_DATETIME_FORMATS
};
//# sourceMappingURL=chunk-RZSEZAWP.js.map
