import * as mergeRight from "ramda/src/mergeRight";
import constants from "../../../constants";

export function prepareRecord(record: object) {
  const recordStatus = {
    [constants.SPECIAL_KEYS.DELETED]: true,
    [constants.SPECIAL_KEYS.BUSY]: true
  };

  return mergeRight(record, recordStatus);
}
