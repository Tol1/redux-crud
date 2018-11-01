import constants from "../../../constants";
import invariants from "../invariants";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types";

const reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config: IConfig,
  current: any[],
  addedRecord: any,
  clientGeneratedKey?: string
): any[] {
  invariants(invariantArgs, config, current, addedRecord);

  const key = config.key;
  let done = false;

  // Update existing records
  let updatedCollection = current.map(function(record) {
    const recordKey = record[key];
    if (recordKey == null) throw new Error("Expected record to have " + key);
    const isSameKey = recordKey === addedRecord[key];
    const isSameClientGetKey =
      clientGeneratedKey != null && clientGeneratedKey === recordKey;
    if (isSameKey || isSameClientGetKey) {
      done = true;
      return addedRecord;
    } else {
      return record;
    }
  });

  // Add if not updated
  if (!done) {
    updatedCollection = updatedCollection.concat([addedRecord]);
  }

  return updatedCollection;
}
