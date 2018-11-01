import {prepareRecord} from "../../common/delete/start";
import invariants from "../invariants";
import constants from "../../../constants";
import store from "../store";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../../types";

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
