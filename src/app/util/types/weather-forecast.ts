export interface ForecastItem {
  date: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  weatherDescription: string;
  weatherIcon: string;
  windSpeed: number;
}

export interface ForecastResponse {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt_txt: string;
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
  }[];
}
