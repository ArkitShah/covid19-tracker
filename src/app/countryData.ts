export interface ICountryData {
  confirmed: {
    value:number,
    detail: string
  },
  recovered: {
    value:number,
    detail: string
  },
  deaths: {
    value:number,
    detail: string
  },
  lastUpdate: string
}