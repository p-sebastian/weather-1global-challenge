export type TForecastDay = {
  date: string; // YYYY-MM-DD
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};
