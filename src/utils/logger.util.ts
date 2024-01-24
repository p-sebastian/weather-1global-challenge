// this is just a helper function for logging in reactotron.
const fn = (..._args: any[]) => {};
let {log = fn, logImportant = fn, warn = fn, error = fn} = {};

export function setLogFunctions(fns: any) {
  log = fns.log ?? log;
  logImportant = fns.logImportant ?? logImportant;
  warn = fns.warn ?? warn;
  error = fns.error ?? error;
}

export const logger = __DEV__
  ? {
      log(...args: any[]) {
        log(args);
      },
      info(...args: any[]) {
        logImportant(args);
      },
      warn(...args: any[]) {
        warn(args);
      },
      error(...args: any[]) {
        error(args, '');
      },
    }
  : {
      log(..._: any[]) {},
      info(..._: any[]) {},
      warn(..._: any[]) {},
      error(..._: any[]) {},
    };
