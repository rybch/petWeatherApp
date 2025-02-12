import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocationReaponse } from 'src/app/util/types/location';
import {
  ForecastItem,
  ForecastResponse,
} from 'src/app/util/types/weather-forecast';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastServiceService {
  readonly citiesApiUrl = environment.citiesApiUrl;
  readonly weatherApiUrl = environment.weatherApiUrl;
  readonly weatherApikey = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getCities(searchParam: string) {
    return this.http
      .get<Array<LocationReaponse>>(this.citiesApiUrl, {
        params: { name: searchParam },
      })
      .pipe(
        map((res) => res.map((r) => `${r.name}, ${r.region}, ${r.country}`)),
      );
  }

  getForecast(city: string) {
    return this.http
      .get<ForecastResponse>(
        `${this.weatherApiUrl}forecast?q=${city}&units=metric&appid=${this.weatherApikey}`,
      )
      .pipe(
        map((response) => {
          return response.list.reduce((acc, item) => {
            const date = item.dt_txt.split(' ')[0]; // Витягуємо тільки yyyy-mm-dd

            const forecastItem: ForecastItem = {
              date: item.dt_txt,
              temperature: item.main.temp,
              feelsLike: item.main.feels_like,
              humidity: item.main.humidity,
              weatherDescription: item.weather[0].description,
              weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              windSpeed: item.wind.speed,
            };

            if (!acc[date]) {
              acc[date] = [];
            }

            acc[date].push(forecastItem);
            return acc;
          }, {} as { [date: string]: ForecastItem[] });
        }),
      );
  }
}
