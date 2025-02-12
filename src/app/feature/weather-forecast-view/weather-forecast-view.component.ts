import { Component, inject, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';

import { WeatherForecastServiceService } from 'src/app/data-access/weather-forecast-service/weather-forecast-service.service';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ForecastItem } from 'src/app/util/types/weather-forecast';

@Component({
  selector: 'app-weather-forecast-view',
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AsyncPipe,
    KeyValuePipe,
  ],
  templateUrl: './weather-forecast-view.component.html',
})
export class WeatherForecastViewComponent implements OnInit {
  myControl = new FormControl('');
  searchChange$!: Observable<string | null>;
  locations$!: Observable<string[]>;
  forecastGroup$!: Observable<{ [date: string]: ForecastItem[] }>;
  httpService = inject(WeatherForecastServiceService);

  ngOnInit(): void {
    this.searchChange$ = this.myControl.valueChanges.pipe(debounceTime(1000));
    this.locations$ = this.searchChange$.pipe(
      switchMap((res) => this.httpService.getCities(res || '')),
    );
    this.forecastGroup$ = this.httpService.getForecast('lviv');
  }
}
