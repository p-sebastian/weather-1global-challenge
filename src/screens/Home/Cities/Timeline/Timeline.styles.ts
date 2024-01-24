import {createStyleSheet} from 'react-native-unistyles';

export const TimelineStyleSheet = createStyleSheet(({spacing, colors}) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  forecast: {
    alignItems: 'center',
  },
  hour: {
    fontSize: spacing.md,
    color: colors.darkBlue,
  },
  temp: {
    fontSize: spacing.sm + 4,
    fontWeight: 'bold',
  },
}));
