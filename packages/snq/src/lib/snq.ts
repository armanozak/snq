export default function snq<T = any>(callback: () => T, defaultValue?: T) {
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
