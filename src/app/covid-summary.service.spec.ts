import { TestBed } from '@angular/core/testing';

import { CovidSummaryService } from './covid-summary.service';

describe('CovidSummaryService', () => {
  let service: CovidSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
