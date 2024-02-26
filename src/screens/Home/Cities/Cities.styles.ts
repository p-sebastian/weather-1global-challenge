import {EdgeInsets} from 'react-native-safe-area-context';
import {createStyleSheet} from 'react-native-unistyles';

export const CitiesStyleSheet = createStyleSheet(({spacing, colors}) => ({
  container: (insets: EdgeInsets) => ({
    flex: 1,
    paddingBottom: insets.bottom,
  }),
  card: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: spacing.sm,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  big: {
    fontSize: spacing.xl,
    color: colors.darkBlue,
    fontWeight: '900',
  },
  city: {
    fontSize: spacing.md,
    color: colors.darkBlue,
  },
  grey: {
    color: colors.lightGrey,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignSelf: 'center',
  },
  forecast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.darkBlue,
  },
  text: {
    fontSize: spacing.md,
    color: colors.darkBlue,
  },
  bold: {
    fontWeight: 'bold',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing.md,
  },
  cross: {
    fontSize: spacing.lg,
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  space: {
    height: spacing.lg,
  },
  third: {
    width: '33%',
  },
  noCities: {
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
