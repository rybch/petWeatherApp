import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DailyForecast } from 'src/app/util/types/weather-forecast';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-current-weather',
  imports: [DecimalPipe, MatTooltipModule],
  templateUrl: './current-weather.component.html',
})
export class CurrentWeatherComponent {
  @Input() weather!: DailyForecast | null;
  @Input() error!: string | null;
  @Output() toggleFavorite = new EventEmitter();
}
