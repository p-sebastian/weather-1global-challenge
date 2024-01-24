import {TCondition} from './TCondition';
import {TForecastDay} from './TForecastDay';
import {TLocation} from './TLocation';

export type TForecast = {
  location: TLocation;
  current: {
    temp_c: number;
    condition: TCondition;
  };
  forecast: {
    forecastday: TForecastDay[];
  };
};
