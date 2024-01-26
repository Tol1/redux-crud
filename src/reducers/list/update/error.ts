import {prepareRecord} from "../../common/update/error.js";
import constants from "../../../constants.js";
import findByKey from "../../../utils/findByKey.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_ERROR;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function error(
  config: IConfig,
  current: any[],
  record: any
): any[] {
  invariants(invariantArgs, config, current, record);

  // We don"t want to rollback
  const key = config.key;
  const updatedId = record[key];
  let updatedRecord = findByKey(current, key, updatedId);

  if (updatedRecord == null) return current;

  updatedRecord = prepareRecord(updatedRecord);

  return store.merge(current, updatedRecord, key);
}
