import * as merge from "ramda/src/merge";

import {IConfig, IMap} from "../../../types";

/*
Adds or replace one record
*/
export default function replace(
  config: IConfig,
  current: IMap<any>,
  record: any,
  updateOnly?: boolean
): IMap<any> {
  const key = config.key;
  const recordKey = record[key];

  return updateOnly && !current[recordKey]
    ? current
    : merge(current, {[recordKey]: record});
}
