import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { CovidSummaryService } from '../covid-summary.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public confirmedCases: number;
  public activeCases: number;
  public deaths: number;
  public recoveredCases: number;
  public countries = [];
  public timeSeriesData = [];
  public pieChart: GoogleChartComponent;
  public dataTab = [];
  public columnChart: GoogleChartComponent;
  public chartTitle = 'Covid 19 Confirmed Cases WorldWide';
  public pieType = 'PieChart';
  public columnType = 'ColumnChart';
  public pieChartHeight = 500;
  public columnChartHeight = 500;

  constructor(private _covidSummary: CovidSummaryService) { }

  ngOnInit(): void {
    this._covidSummary.getSummary().subscribe(data => {
        this.confirmedCases = data.confirmed.value;
        this.activeCases = data.confirmed.value - data.deaths.value - data.recovered.value;
        this.deaths = data.deaths.value;
        this.recoveredCases = data.recovered.value;
    });

    this._covidSummary.getCountries().subscribe(data => {
      for (let i = 0; i < data.countries.length; i++) {
        this.countries.push(data.countries[i].name);
      }
      this.initChart('c');
    });
  }

  initChart(caseType) {
    let dataTab = [];
    // dataTab.push(['Country', 'Cases']);
    for (const country of this.countries) {
      let cases = 0;
      if (country != 'Gambia') {
        this._covidSummary.getCountryData(country).subscribe(
          data => {
            if (caseType == 'c') {
              cases = data.confirmed.value;
            } else if (caseType == 'a') {
              cases = data.confirmed.value - data.deaths.value - data.recovered.value;
            } else if (caseType == 'r') {
              cases = data.recovered.value;
            } else if (caseType == 'd') {
              cases = data.deaths.value;
            }
            dataTab.push([country, cases]);
          }
        );
      }
    }
    this.dataTab = dataTab;
  }

  refreshPage() {
    window.location.reload();
  }
}
