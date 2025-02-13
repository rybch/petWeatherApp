import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  catchError,
  debounceTime,
  EMPTY,
  Observable,
  of,
  switchMap,
  tap,
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
  weatherError!: string;
  forecastError!: string;
  locationError!: string;
  activeSelection!: string;
  favoriteLocations: string[] = [];
  httpService = inject(WeatherForecastServiceService);

  ngOnInit(): void {
    this.subscribeOnSearch();
    this.getFavoriteLocations();
  }

  locationSelected(location: string) {
    this.activeSelection = location;
    this.forecast$ = this.httpService.getForecast(location).pipe(
      catchError((err) => {
        this.forecastError = err;
        return EMPTY;
      }),
    );
    this.weather$ = this.httpService.getCurrentWeather(location).pipe(
      catchError((err) => {
        this.weatherError = err;
        return EMPTY;
      }),
    );
  }

  addToFavorites(location: string) {
    if (this.favoriteLocations.includes(location)) {
      alert('This location is already added to favorite collection');
      return;
    }
    this.favoriteLocations.push(location);
    localStorage.setItem(
      'favoriteLocations',
      JSON.stringify(this.favoriteLocations),
    );
  }

  getFavoriteLocations() {
    const storage = localStorage.getItem('favoriteLocations');
    this.favoriteLocations = storage ? JSON.parse(storage) : [];
  }

  private subscribeOnSearch() {
    this.searchChange$ = this.myControl.valueChanges.pipe(debounceTime(500));
    const data$ = (param: string) =>
      this.httpService.getCities(param).pipe(
        tap(() => (this.locationError = '')),
        catchError((err) => {
          this.locationError = err;
          return of([]);
        }),
      );
    this.locations$ = this.searchChange$.pipe(
      switchMap((param) => data$(param as string)),
    );
  }
}
