import omit from "ramda/es/omit";
import mergeRight from "ramda/es/mergeRight";

import constants from "../../../constants.js";
import findByKey from "../../../utils/findByKey.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_ERROR;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function error(
  config: IConfig,
  current: IMap<any>,
  record: any
): IMap<any> {
  invariants(invariantArgs, config, current, record);

  const key = config.key;
  const deleteId = record[key];

  // Find the record
  let deleteRecord = current[deleteId];

  if (deleteRecord == null) {
    return current;
  } else {
    // Remove deleted and busy
    deleteRecord = omit(
      [constants.SPECIAL_KEYS.DELETED, constants.SPECIAL_KEYS.BUSY],
      deleteRecord
    );

    return mergeRight(current, {[deleteId]: deleteRecord});
  }
}
