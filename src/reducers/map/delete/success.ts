import reject from "ramda/es/reject";

import invariants from "../invariants.js";
import constants from "../../../constants.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config: IConfig,
  current: IMap<any>,
  record: any
): IMap<any> {
  invariants(invariantArgs, config, current, record);

  const key = config.key;
  const deleteId = record[key];

  function predicate(existingRecord) {
    return deleteId === existingRecord[key];
  }

  return reject(predicate, current);
}
