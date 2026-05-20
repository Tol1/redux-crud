import constants from "../../../constants.js";
import invariants from "../invariants.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types.js";
import ReduxCrudError from "../../../utils/reduxCrudError.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success<T extends object, TAdded extends object>(
  config: IConfig,
  current: T[],
  addedRecord: TAdded,
  clientGeneratedKey?: string
): (T | TAdded)[] {
  invariants(invariantArgs, config, current, addedRecord);

  const key = config.key;
  let done = false;

  // Update existing records
  let updatedCollection = current.map(function(record) {
    const recordKey = record[key];
    if (recordKey == null)
      throw new ReduxCrudError("Expected record to have " + key, record);
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
