import {prepareRecord} from "../../common/update/error.js";
import constants from "../../../constants.js";
import findByKey from "../../../utils/findByKey.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_ERROR;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function error(
  config: IConfig,
  current: any[],
  records: any[]
): any[] {
  invariants(invariantArgs, config, current, records);

  // We don"t want to rollback
  const key = config.key;
  const updatedRecords = records
    .map(record => {
      const updatedId = record[key];
      const updatedRecord = findByKey(current, key, updatedId);

      if (updatedRecord == null) return null;

      return prepareRecord(updatedRecord);
    })
    .filter(record => record != null);

  return store.merge(current, updatedRecords, key);
}
