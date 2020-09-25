import { Component, Input, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: ['./display-cards.component.scss']
})
export class DisplayCardsComponent implements OnInit {
  @Input() public confirmedCases;
  @Input() public activeCases;
  @Input() public deaths;
  @Input() public recoveredCases;

  constructor() { }

  ngOnInit(): void {
  }


}
