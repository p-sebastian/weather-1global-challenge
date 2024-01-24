import {useEffect, useState} from 'react';
import {TForecastHour} from '../../../../types/TForecastHour';

export const useTimeline = (hours: TForecastHour[]) => {
  // because it starts from 00:00, the index will always be the current hours
  const [index] = useState(() => new Date().getHours());

  const forecast = hours.slice(index, index + 5);

  return {forecast};
};
