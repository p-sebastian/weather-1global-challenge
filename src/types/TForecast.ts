import {TForecastDay} from './TForecastDay';
import {TLocation} from './TLocation';

export type TForecast = {
  location: TLocation;
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: TForecastDay[];
  };
};
