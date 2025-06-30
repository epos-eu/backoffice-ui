import {
  DatetimeAdapter,
  MTX_DATETIME_FORMATS
} from "./chunk-RZSEZAWP.js";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
  MomentDateModule
} from "./chunk-QOSOJ5ZQ.js";
import {
  require_moment
} from "./chunk-KSZKRYEP.js";
import {
  DateAdapter,
  MAT_DATE_LOCALE
} from "./chunk-E5ILAOQ3.js";
import "./chunk-SFQVNJ7E.js";
import "./chunk-DRYTSZGS.js";
import "./chunk-ZIDM5L6D.js";
import {
  Inject,
  Injectable,
  NgModule,
  Optional,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-RTEUSPZQ.js";
import "./chunk-3GDIDV32.js";
import "./chunk-BJB7OPLC.js";
import "./chunk-PVXNJD7T.js";
import {
  __toESM
} from "./chunk-KBUIKKCC.js";

// node_modules/.pnpm/@ng-matero+extensions-moment-adapter@18.0.0_d047700be135cbf93b46e68b8b78abae/node_modules/@ng-matero/extensions-moment-adapter/fesm2022/extensions-moment-adapter.mjs
var _moment = __toESM(require_moment(), 1);
var moment = "default" in _moment ? _moment.default : _moment;
function range(length, valueFunction) {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}
var MomentDatetimeAdapter = class _MomentDatetimeAdapter extends DatetimeAdapter {
  constructor(matDateLocale, matMomentAdapterOptions, _delegate) {
    super(_delegate);
    this._useUtc = false;
    this.setLocale(matDateLocale || moment.locale());
    this._useUtc = matMomentAdapterOptions.useUtc;
  }
  setLocale(locale) {
    super.setLocale(locale);
    const momentLocaleData = moment.localeData(locale);
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates: range(31, (i) => super.createDate(2017, 0, i + 1).format("D")),
      hours: range(24, (i) => this.createDatetime(2017, 0, 1, i, 0).format("H")),
      minutes: range(60, (i) => this.createDatetime(2017, 0, 1, 1, i).format("m")),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin()
    };
  }
  getHour(date) {
    return super.clone(date).hour();
  }
  getMinute(date) {
    return super.clone(date).minute();
  }
  isInNextMonth(startDate, endDate) {
    const nextMonth = this.getDateInNextMonth(startDate);
    return super.sameMonthAndYear(nextMonth, endDate);
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
    let result;
    if (this._useUtc) {
      result = moment.utc({
        year,
        month,
        date,
        hour,
        minute
      });
    } else {
      result = moment({
        year,
        month,
        date,
        hour,
        minute
      });
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result.locale(this.locale);
  }
  getFirstDateOfMonth(date) {
    return super.clone(date).startOf("month");
  }
  getHourNames() {
    return this._localeData.hours;
  }
  getMinuteNames() {
    return this._localeData.minutes;
  }
  addCalendarHours(date, hours) {
    return super.clone(date).add({
      hours
    });
  }
  addCalendarMinutes(date, minutes) {
    return super.clone(date).add({
      minutes
    });
  }
  deserialize(value) {
    return this._delegate.deserialize(value);
  }
  getDateInNextMonth(date) {
    return super.clone(date).date(1).add({
      month: 1
    });
  }
  static {
    this.ɵfac = function MomentDatetimeAdapter_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MomentDatetimeAdapter)(ɵɵinject(MAT_DATE_LOCALE, 8), ɵɵinject(MAT_MOMENT_DATE_ADAPTER_OPTIONS, 8), ɵɵinject(DateAdapter));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _MomentDatetimeAdapter,
      factory: _MomentDatetimeAdapter.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MomentDatetimeAdapter, [{
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
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }]
  }, {
    type: DateAdapter
  }], null);
})();
var MTX_MOMENT_DATETIME_FORMATS = {
  parse: {
    dateInput: "L",
    monthInput: "MMMM",
    yearInput: "YYYY",
    datetimeInput: "L LT",
    timeInput: "LT"
  },
  display: {
    dateInput: "L",
    monthInput: "MMMM",
    yearInput: "YYYY",
    datetimeInput: "L LT",
    timeInput: "LT",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
    popupHeaderDateLabel: "ddd, DD MMM"
  }
};
var MomentDatetimeModule = class _MomentDatetimeModule {
  static {
    this.ɵfac = function MomentDatetimeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MomentDatetimeModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MomentDatetimeModule,
      imports: [MomentDateModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [{
        provide: DatetimeAdapter,
        useClass: MomentDatetimeAdapter
      }],
      imports: [MomentDateModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MomentDatetimeModule, [{
    type: NgModule,
    args: [{
      imports: [MomentDateModule],
      providers: [{
        provide: DatetimeAdapter,
        useClass: MomentDatetimeAdapter
      }]
    }]
  }], null, null);
})();
function provideMomentDatetimeAdapter(formats = MTX_MOMENT_DATETIME_FORMATS, options) {
  const providers = [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  }, {
    provide: DatetimeAdapter,
    useClass: MomentDatetimeAdapter
  }, {
    provide: MTX_DATETIME_FORMATS,
    useValue: formats
  }];
  if (options) {
    providers.push({
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: options
    });
  }
  return providers;
}
var MtxMomentDatetimeModule = class _MtxMomentDatetimeModule {
  static {
    this.ɵfac = function MtxMomentDatetimeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxMomentDatetimeModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxMomentDatetimeModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [provideMomentDatetimeAdapter()]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxMomentDatetimeModule, [{
    type: NgModule,
    args: [{
      providers: [provideMomentDatetimeAdapter()]
    }]
  }], null, null);
})();
var MatMomentDatetimeModule = MtxMomentDatetimeModule;
export {
  MTX_MOMENT_DATETIME_FORMATS,
  MatMomentDatetimeModule,
  MomentDatetimeAdapter,
  MomentDatetimeModule,
  MtxMomentDatetimeModule,
  provideMomentDatetimeAdapter
};
//# sourceMappingURL=@ng-matero_extensions-moment-adapter.js.map
