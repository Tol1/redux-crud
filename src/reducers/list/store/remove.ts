import * as reject from "ramda/src/reject";

import {IConfig} from "../../../types";

export default function remove(
  config: IConfig,
  current: any[],
  addedRecord: any
): any[] {
  const key = config.key;

  function predicate(record: any) {
    const recordKey = record[key];
    const isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  return reject(predicate, current);
}
