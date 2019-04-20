export default function snq<T = any>(callback: () => T, defaultValue?: T) {
  try {
    return callback();
  } catch (err) {
    if (err instanceof TypeError) {
      return defaultValue;
    }

    throw err;
  }
}
