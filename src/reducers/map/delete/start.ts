import {prepareRecord} from "../../common/delete/start.js";
import invariants from "../invariants.js";
import constants from "../../../constants.js";
import store from "../store.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_START;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config: IConfig,
  current: IMap<any>,
  record: any
): IMap<any> {
  invariants(invariantArgs, config, current, record);

  const key = config.key;
  const deleteId = record[key];
  let deleteRecord = current[deleteId];

  if (deleteRecord == null) {
    return current;
  } else {
    deleteRecord = prepareRecord(deleteRecord);

    return store.merge(config, current, deleteRecord);
  }
}
