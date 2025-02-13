import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DailyForecast } from 'src/app/util/types/weather-forecast';

@Component({
  selector: 'app-current-weather',
  imports: [DecimalPipe],
  templateUrl: './current-weather.component.html',
})
export class CurrentWeatherComponent {
  @Input() weather!: DailyForecast | null;
  @Input() error!: string | null;
}
