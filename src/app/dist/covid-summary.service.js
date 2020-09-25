"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CovidSummaryService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var CovidSummaryService = /** @class */ (function () {
    function CovidSummaryService(http) {
        this.http = http;
        this.global_url = 'https://covid19.mathdro.id/api';
        this.country_url = 'https://covid19.mathdro.id/api/countries/';
        this.timeseries_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
    }
    CovidSummaryService.prototype.getSummary = function () {
        return this.http.get(this.global_url);
    };
    CovidSummaryService.prototype.getCountries = function () {
        return this.http.get(this.country_url);
    };
    CovidSummaryService.prototype.getCountryData = function (country) {
        var _url = this.country_url + country;
        return this.http.get(_url);
    };
    CovidSummaryService.prototype.getTimeSeriesData = function () {
        return this.http.get(this.timeseries_url, { responseType: 'text' }).pipe(operators_1.map(function (data) {
            var raw = [];
            for (var _i = 0, _a = data.split('\n'); _i < _a.length; _i++) {
                var line = _a[_i];
                var temp = line.split(',');
                raw.push(temp);
            }
            return raw;
        }));
    };
    CovidSummaryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CovidSummaryService);
    return CovidSummaryService;
}());
exports.CovidSummaryService = CovidSummaryService;
