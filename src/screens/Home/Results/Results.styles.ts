import {createStyleSheet} from 'react-native-unistyles';

export const ResultsStyleSheet = createStyleSheet(({spacing, colors}) => ({
  container: {
    flex: 1,
  },
  item: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  text: (disabled?: boolean) => ({
    fontSize: spacing.md,
    color: disabled ? colors.lightGrey : colors.darkBlue,
  }),
  bold: {
    fontWeight: 'bold',
  },
  activityBox: {
    paddingVertical: spacing.lg,
  },
  empty: {
    padding: spacing.md,
  },
}));
