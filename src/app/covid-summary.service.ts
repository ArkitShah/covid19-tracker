import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IGlobalData } from './globalData';
import { ICountriesList } from './countriesList';
import { ICountryData } from './countryData';

@Injectable({
  providedIn: 'root'
})
export class CovidSummaryService {
  private global_url = 'https://covid19.mathdro.id/api';
  private country_url = 'https://covid19.mathdro.id/api/countries/';
  private timeseries_url = 'https://pomber.github.io/covid19/timeseries.json';

  constructor(private http: HttpClient) { }

  getSummary(): Observable<IGlobalData> {
    return this.http.get<IGlobalData>(this.global_url);
  }

  getCountries(): Observable<ICountriesList> {
    return this.http.get<ICountriesList>(this.country_url);
  }

  getCountryData(country: string): Observable<ICountryData> {
    let _url = this.country_url + country;
    return this.http.get<ICountryData>(_url);
  }

  getTimeSeriesData() {
    return this.http.get(this.timeseries_url);
  }
}
