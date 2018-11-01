import * as is from "ramda/src/is";

export default function wrapArray(recordOrRecords) {
  const isArray = is(Array, recordOrRecords);
  return isArray ? recordOrRecords : [recordOrRecords];
}
