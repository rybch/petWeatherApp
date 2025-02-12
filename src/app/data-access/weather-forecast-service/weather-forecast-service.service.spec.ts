import { TestBed } from '@angular/core/testing';

import { WeatherForecastServiceService } from './weather-forecast-service.service';

describe('WeatherForecastServiceService', () => {
  let service: WeatherForecastServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherForecastServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
