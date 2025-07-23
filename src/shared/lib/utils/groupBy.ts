export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K,
  keyTransform: (value: T[K]) => string,
): [string, T[]][] {
  const groupedObj = array.reduce(
    (acc, item) => {
      const transformedKey = keyTransform(item[key]);
      if (!acc[transformedKey]) {
        acc[transformedKey] = [];
      }
      acc[transformedKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
  return Object.entries(groupedObj);
}
