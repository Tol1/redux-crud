import mergeRight from "ramda/es/mergeRight";
import constants from "../../../constants.js";

export function prepareRecord(record: object) {
  const recordStatus = {
    [constants.SPECIAL_KEYS.DELETED]: true,
    [constants.SPECIAL_KEYS.BUSY]: true
  };

  return mergeRight(record, recordStatus);
}
