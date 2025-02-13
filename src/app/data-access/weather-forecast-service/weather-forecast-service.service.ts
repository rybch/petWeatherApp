import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { LocationReaponse } from 'src/app/util/types/location';
import {
  ForecastResponse,
  DailyForecast,
  ForecastResponseListItem,
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

  getCities(searchParam = '') {
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
        catchError((err) => {
          return throwError(
            () =>
              new Error(
                err.error.message || err.error.error || 'Something went wrong',
              ),
          );
        }),
      );
  }

  getForecast(city: string) {
    return this.http
      .get<ForecastResponse>(
        `${this.weatherApiUrl}forecast?q=${city}&units=metric&appid=${this.weatherApikey}`,
      )
      .pipe(
        map((response) => this.mapForecast(response && response.list)),
        catchError((err) => {
          return throwError(
            () =>
              new Error(
                err.error.message || err.error.error || 'Something went wrong',
              ),
          );
        }),
      );
  }

  getCurrentWeather(city: string) {
    return this.http
      .get<ForecastResponseListItem>(
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
        catchError((err) => {
          return throwError(
            () =>
              new Error(
                err.error.message || err.error.error || 'Something went wrong',
              ),
          );
        }),
      );
  }

  private mapForecast(list: ForecastResponseListItem[]) {
    const groupedData: { [date: string]: DailyForecast } = {};
    const today = new Date();

    list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      const temp = item.main.temp;
      const isToday = today.toDateString() === new Date(date).toDateString();

      if (isToday) {
        return;
      }

      if (!groupedData[date]) {
        const dateMediana = Math.floor(item.weather.length / 2);
        groupedData[date] = {
          date: date,
          minTemp: temp,
          maxTemp: temp,
          weatherDescription: item.weather[dateMediana].description,
          weatherIcon: `https://openweathermap.org/img/wn/${item.weather[dateMediana].icon}@2x.png`,
        };
      } else {
        if (item.dt_txt.includes('12:00')) {
          groupedData[date].weatherDescription = item.weather[0].description;
          groupedData[
            date
          ].weatherIcon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        }

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
  }
}
