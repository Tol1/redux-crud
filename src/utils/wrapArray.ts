export default function wrapArray<T>(recordOrRecords: T | T[]): T[] {
  const isArray = Array.isArray(recordOrRecords);
  return isArray ? recordOrRecords : [recordOrRecords];
}
