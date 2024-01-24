import {TCondition} from './TCondition';

export type TForecastHour = {
  time: number;
  temp_c: number;
  condition: TCondition;
};
