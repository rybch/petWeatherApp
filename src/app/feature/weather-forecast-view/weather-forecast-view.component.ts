import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  catchError,
  debounceTime,
  ignoreElements,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { WeatherForecastServiceService } from 'src/app/data-access/weather-forecast-service/weather-forecast-service.service';
import { AsyncPipe } from '@angular/common';
import { DailyForecast } from 'src/app/util/types/weather-forecast';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';
import { LocationSearchComponent } from '../location-search/location-search.component';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';

@Component({
  selector: 'app-weather-forecast-view',
  imports: [
    AsyncPipe,
    WeatherForecastComponent,
    LocationSearchComponent,
    CurrentWeatherComponent,
  ],
  templateUrl: './weather-forecast-view.component.html',
})
export class WeatherForecastViewComponent implements OnInit {
  myControl = new FormControl('', { validators: Validators.required });
  searchChange$!: Observable<string | null>;
  locations$!: Observable<string[]>;
  forecast$!: Observable<DailyForecast[]>;
  weather$!: Observable<DailyForecast>;
  weatherError$!: Observable<string>;
  forecastError$!: Observable<string>;
  locationError$!: Observable<string>;
  httpService = inject(WeatherForecastServiceService);

  ngOnInit(): void {
    this.subscribeOnSearch();
  }

  locationSelected(location: string) {
    this.forecast$ = this.httpService.getForecast(location);
    this.weather$ = this.httpService.getCurrentWeather(location);
    this.weatherError$ = this.weather$.pipe(
      ignoreElements(),
      catchError((err) =>
        of(err.error.message || err.error.error || 'Something went wrong'),
      ),
    );
    this.forecastError$ = this.forecast$.pipe(
      ignoreElements(),
      catchError((err) =>
        of(err.error.message || err.error.error || 'Something went wrong'),
      ),
    );
  }

  private subscribeOnSearch() {
    this.searchChange$ = this.myControl.valueChanges.pipe(debounceTime(500));
    this.locations$ = this.searchChange$.pipe(
      switchMap((res) => this.httpService.getCities(res || '')),
    );
    this.locationError$ = this.locations$.pipe(
      ignoreElements(),
      catchError((err) =>
        of(err.error.message || err.error.error || 'Something went wrong'),
      ),
    );
  }
}
