import * as forEach from "ramda/src/forEach";

import constants from "../../constants";
import wrapArray from "../../utils/wrapArray";

import {IConfig, ReducerName} from "../../types";
import ReduxCrudError from "../../utils/reduxCrudError";

export default function assertHasKey(
  config: IConfig,
  scope: string,
  recordOrRecords: any
): void {
  const key = config.key;
  const records = wrapArray(recordOrRecords);

  forEach(function(record) {
    if (record[key] == null) {
      throw new ReduxCrudError(
        scope + ": Expected record to have ." + key,
        record
      );
    }
  })(records);
}
