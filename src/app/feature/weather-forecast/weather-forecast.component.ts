import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DailyForecast } from 'src/app/util/types/weather-forecast';

@Component({
  selector: 'app-weather-forecast',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './weather-forecast.component.html',
})
export class WeatherForecastComponent {
  @Input({ required: true }) forecast!: DailyForecast[] | null;
  @Input() error!: string | null;
}
