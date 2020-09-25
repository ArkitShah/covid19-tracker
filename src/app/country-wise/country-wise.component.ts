import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { CovidSummaryService } from '../covid-summary.service';

@Component({
  selector: 'app-country-wise',
  templateUrl: './country-wise.component.html',
  styleUrls: ['./country-wise.component.scss']
})
export class CountryWiseComponent implements OnInit {
  public countries= [];
  public selectedCountry: string;
  public confirmedCases: number = 0;
  public activeCases: number = 0;
  public deaths: number = 0;
  public recoveredCases: number = 0;
  public dataTab = [];
  public dashboard: GoogleChartComponent;
  public chartType = 'LineChart';
  public chartTitle = 'Covid 19 Active Cases';

  constructor(private _covidSummary: CovidSummaryService) { }

  ngOnInit(): void {
    this._covidSummary.getCountries().subscribe(data => {
      for (let i = 0; i < data.countries.length; i++) {
        this.countries.push(data.countries[i].name);
      }
    });
  }

  updateValue(country: string) {
    this.selectedCountry = country;
    if (country) {
      this._covidSummary.getCountryData(country).subscribe(
        data => {this.confirmedCases = data.confirmed.value;
        this.activeCases = data.confirmed.value - data.deaths.value - data.recovered.value;
        this.deaths = data.deaths.value;
        this.recoveredCases = data.recovered.value;}
      );
      this._covidSummary.getTimeSeriesData().subscribe(data => {
        let countryData = data[country];
        let dataTab = [];
        // dataTab.push(['Date', 'Active Cases']);
        for (const summary of countryData) {
          let date = summary.date;
          let activeCases = summary.confirmed - summary.deaths - summary.recovered;
          dataTab.push([date, activeCases])
        }
        this.dataTab = dataTab;
      });
    }
  }

  refreshPage() {
    window.location.reload();
  }

}
