import {shallowEqual} from "fast-equals";
import ReduxCrudError from "../../../utils/reduxCrudError";
import wrapArray from "../../../utils/wrapArray";

/*
Replaces an existing record in a list
Or adds if not there
*/
export default function merge(current, records, key, updateOnly?, compare?) {
  records = wrapArray(records);
  const recordMap = {};
  const indexMap = {};
  const newRecords = current.slice(0);
  let changed = !compare;

  current.forEach(function(record, index) {
    const recordKey = record[key];
    if (recordKey == null)
      throw new ReduxCrudError("Expected record to have " + key, record);
    recordMap[recordKey] = record;
    indexMap[recordKey] = index;
  });

  records.forEach(function(record) {
    const recordId = record[key];
    if (recordMap[recordId]) {
      newRecords[indexMap[recordId]] = record;
      changed = changed || !shallowEqual(recordMap[recordId], record);
    } else if (!updateOnly) {
      indexMap[recordId] = newRecords.length;
      newRecords.push(record);
      changed = true;
    }
    recordMap[recordId] = record;
  });

  return changed ? newRecords : current;
}
