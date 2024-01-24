import {createStyleSheet} from 'react-native-unistyles';

export const HomeStyleSheet = createStyleSheet(({spacing, colors}) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  inputContainer: {
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderRadius: spacing.xs,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  input: {
    color: colors.darkBlue,
    paddingHorizontal: spacing.md,
    fontSize: spacing.md,
  },
}));
