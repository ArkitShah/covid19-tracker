"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_covidSummary) {
        this._covidSummary = _covidSummary;
        this.countries = [];
        this.timeSeriesData = [];
        this.dashboard = {
            chartType: 'LineChart'
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._covidSummary.getSummary().subscribe(function (data) {
            _this.confirmedCases = data.confirmed.value;
            _this.activeCases = data.confirmed.value - data.deaths.value - data.recovered.value;
            _this.deaths = data.deaths.value;
            _this.recoveredCases = data.recovered.value;
        });
        this._covidSummary.getTimeSeriesData().subscribe(function (data) {
            for (var i = 5; i < data[0].length; i++) {
                var totalCases = 0;
                var timeseries = void 0;
                for (var j = 1; j < data.length - 1; j++) {
                    var y = +data[j][i];
                    totalCases += y;
                }
                timeseries = { 'date': data[0][i], 'cases': totalCases };
                _this.timeSeriesData.push(timeseries);
            }
            _this.initChart(_this.timeSeriesData);
        });
    };
    HomeComponent.prototype.initChart = function (timeSeriesData) {
        var dataTab = [];
        dataTab.push(['Date', 'Confirmed Cases']);
        for (var _i = 0, timeSeriesData_1 = timeSeriesData; _i < timeSeriesData_1.length; _i++) {
            var data = timeSeriesData_1[_i];
            dataTab.push([data.date, data.cases]);
        }
        this.dashboard = {
            chartType: 'LineChart',
            dataTable: dataTab,
            //firstRowIsData: true,
            options: { 'title': 'Covid-19 Statistics' }
        };
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
