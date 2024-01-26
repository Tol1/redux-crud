import {prepareRecord} from "../../common/delete/start.js";
import constants from "../../../constants.js";
import findByKey from "../../../utils/findByKey.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_START;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config: IConfig,
  current: any[],
  record: any
): any[] {
  invariants(invariantArgs, config, current, record);

  const key = config.key;
  const deleteId = record[key];

  let deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = prepareRecord(deleteRecord);

  return store.merge(current, deleteRecord, key);
}
