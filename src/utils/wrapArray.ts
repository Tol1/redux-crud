import is from "ramda/es/is";

export default function wrapArray(recordOrRecords) {
  const isArray = is(Array, recordOrRecords);
  return isArray ? recordOrRecords : [recordOrRecords];
}
