import {prepareRecord} from "../../common/delete/start";
import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
import store from "../store";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types";

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
