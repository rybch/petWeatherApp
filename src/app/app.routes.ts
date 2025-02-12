import { Route } from '@angular/router';
import { WeatherForecastViewComponent } from './feature/weather-forecast-view/weather-forecast-view.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: WeatherForecastViewComponent,
  },
];
