import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LocationReaponse } from 'src/app/util/types/location';
import {
  ForecastResponse,
  DailyForecast,
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
        map((res) =>
          res.map(
            (r) => `${r.name}${r.region ? ', ' + r.region : ''}, ${r.country}`,
          ),
        ),
      );
  }

  getForecast(city: string) {
    return this.http
      .get<ForecastResponse>(
        `${this.weatherApiUrl}forecast?q=${city}&units=metric&appid=${this.weatherApikey}`,
      )
      .pipe(
        map((response) => {
          const groupedData: { [date: string]: DailyForecast } = {};
          const today = new Date();

          response.list.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            const temp = item.main.temp;
            const isToday =
              today.toDateString() === new Date(date).toDateString();

            if (isToday) {
              return;
            }
            if (!groupedData[date]) {
              groupedData[date] = {
                date: date,
                minTemp: temp,
                maxTemp: temp,
                weatherDescription: item.weather[0].description,
                weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              };
            } else {
              groupedData[date].minTemp = Math.min(
                groupedData[date].minTemp as number,
                temp,
              );
              groupedData[date].maxTemp = Math.max(
                groupedData[date].maxTemp as number,
                temp,
              );
            }
          });

          return Object.values(groupedData);
        }),
      );
  }

  getCurrentWeather(city: string) {
    return this.http
      .get<any>(
        `${this.weatherApiUrl}weather?q=${city}&units=metric&appid=${this.weatherApikey}`,
      )
      .pipe(
        map((res) => {
          const mappedW = {
            name: res.name,
            temp: res.main.temp,
            weatherDescription: res.weather[0].description,
            weatherIcon: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,
            humidity: res.main.humidity,
          };
          return mappedW;
        }),
      );
  }
}
