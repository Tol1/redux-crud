import * as omit from "ramda/src/omit";

import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
import store from "../store";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types";

const reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_ERROR;
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

  const key = config.key;
  const deleteId = record[key];
  let deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = omit(
    [constants.SPECIAL_KEYS.DELETED, constants.SPECIAL_KEYS.BUSY],
    deleteRecord
  );

  return store.merge(current, deleteRecord, key);
}
