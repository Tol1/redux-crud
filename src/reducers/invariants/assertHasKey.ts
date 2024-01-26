import forEach from "ramda/es/forEach";

import constants from "../../constants.js";
import wrapArray from "../../utils/wrapArray.js";

import {IConfig, ReducerName} from "../../types.js";
import ReduxCrudError from "../../utils/reduxCrudError.js";

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
