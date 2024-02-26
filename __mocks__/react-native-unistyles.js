import {lightTheme} from '../src/theme/config.theme';

export const createStyleSheet = cb => {
  return () => cb(lightTheme);
};

export const useStyles = themeCb => {
  return {
    styles: themeCb?.(lightTheme),
    theme: lightTheme,
  };
};
