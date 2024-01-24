import {TForecastDay} from '../../../types/TForecastDay';

export type TCityItemProps = {
  id: string;
};

export type TForecastItemProps = {
  index: number;
} & TForecastDay;
