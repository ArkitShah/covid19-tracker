"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountryWiseComponent = void 0;
var core_1 = require("@angular/core");
var CountryWiseComponent = /** @class */ (function () {
    function CountryWiseComponent(_covidSummary) {
        this._covidSummary = _covidSummary;
        this.countries = [];
        this.confirmedCases = 0;
        this.activeCases = 0;
        this.deaths = 0;
        this.recoveredCases = 0;
        this.pieChart = {
            chartType: 'PieChart'
        };
        this.columnChart = {
            chartType: 'ColumnChart'
        };
    }
    CountryWiseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._covidSummary.getCountries().subscribe(function (data) {
            for (var i = 0; i < data.countries.length; i++) {
                _this.countries.push(data.countries[i].name);
            }
            _this.initChart(_this.countries, 'c');
        });
    };
    CountryWiseComponent.prototype.updateValue = function (country) {
        var _this = this;
        if (country) {
            this._covidSummary.getCountryData(country).subscribe(function (data) {
                _this.confirmedCases = data.confirmed.value;
                _this.activeCases = data.confirmed.value - data.deaths.value - data.recovered.value;
                _this.deaths = data.deaths.value;
                _this.recoveredCases = data.recovered.value;
            });
        }
    };
    CountryWiseComponent.prototype.initChart = function (countries, caseType) {
        var dataTab = [];
        dataTab.push(['Country', 'Cases']);
        var _loop_1 = function (country) {
            var cases = 0;
            if (country != 'Gambia') {
                this_1._covidSummary.getCountryData(country).subscribe(function (data) {
                    if (caseType == 'c') {
                        cases = data.confirmed.value;
                    }
                    else if (caseType == 'a') {
                        cases = data.confirmed.value - data.deaths.value - data.recovered.value;
                    }
                    else if (caseType == 'r') {
                        cases = data.recovered.value;
                    }
                    else if (caseType == 'd') {
                        cases = data.deaths.value;
                    }
                    dataTab.push([country, cases]);
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
            var country = countries_1[_i];
            _loop_1(country);
        }
        this.pieChart = {
            chartType: 'PieChart',
            dataTable: dataTab,
            // firstRowIsData: true,
            options: {
                'title': 'Covid 19 Confirmed Cases WorldWide',
                'height': 500
            }
        };
        this.columnChart = {
            chartType: 'ColumnChart',
            dataTable: dataTab,
            // firstRowIsData: true,
            options: {
                'title': 'Covid 19 Confirmed Cases WorldWide',
                'height': 500
            }
        };
    };
    CountryWiseComponent.prototype.refreshPage = function () {
        window.location.reload();
    };
    CountryWiseComponent = __decorate([
        core_1.Component({
            selector: 'app-country-wise',
            templateUrl: './country-wise.component.html',
            styleUrls: ['./country-wise.component.scss']
        })
    ], CountryWiseComponent);
    return CountryWiseComponent;
}());
exports.CountryWiseComponent = CountryWiseComponent;
