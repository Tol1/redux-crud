import * as omit from "ramda/src/omit";
import * as merge from "ramda/src/merge";

import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
import store from "../store";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../../types";

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

    return merge(current, {[deleteId]: deleteRecord});
  }
}
