import {} from 'react-native-unistyles';

export const lightTheme = {
  colors: {
    background: '#ffffff',
    lightGrey: '#BDBDBD',
    darkBlue: '#002938',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 32,
  },
} as const;

type AppThemes = {
  light: typeof lightTheme;
};

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}
