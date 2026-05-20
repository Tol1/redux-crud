import forEach from "ramda/es/forEach";

import wrapArray from "../../utils/wrapArray.js";

import {IConfig} from "../../types.js";
import ReduxCrudError from "../../utils/reduxCrudError.js";

export default function assertHasKey(
  config: IConfig,
  scope: string,
  recordOrRecords: object | object[]
): void {
  const key = config.key;
  const records = wrapArray(recordOrRecords);

  forEach<object>(function(record) {
    if (record[key] == null) {
      throw new ReduxCrudError(
        scope + ": Expected record to have ." + key,
        record
      );
    }
  })(records);
}
