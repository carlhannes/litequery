/* eslint no-console: 0 */

export function error(doThrow, ...messages) {
  if (doThrow) {
    throw new Error(messages);
  } else {
    console.error(...messages);
  }
}

export function warn(...messages) {
  console.warn(...messages);
}

export function log(...messages) {
  console.warn(...messages);
}
