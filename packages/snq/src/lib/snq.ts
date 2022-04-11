export function snq<T>(callback: () => T, defaultValue: T): T;
export function snq<T>(callback: () => T): T | undefined;
export function snq<T>(callback: () => T, defaultValue?: T) {
  try {
    const result = callback();
    return typeof result === 'undefined' ? defaultValue : result;
  } catch (err) {
    if (err instanceof TypeError) {
      return defaultValue;
    }

    throw err;
  }
}
