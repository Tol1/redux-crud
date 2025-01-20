import dissoc from "ramda/es/dissoc";
import constants from "../../../constants.js";

export function prepareRecord(record: object) {
  return dissoc(
    constants.SPECIAL_KEYS.BUSY,
    record as {[constants.SPECIAL_KEYS.BUSY]: string}
  );
}
