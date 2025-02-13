export interface DailyForecast {
  date?: string;
  name?: string;
  minTemp?: number;
  maxTemp?: number;
  temp?: number;
  weatherDescription: string;
  weatherIcon: string;
  humidity?: number;
}

export interface ForecastResponse {
  city: {
    name: string;
    country: string;
  };
  list: ForecastResponseListItem[];
}

export interface ForecastResponseListItem {
  dt_txt: string;
  name?: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}
