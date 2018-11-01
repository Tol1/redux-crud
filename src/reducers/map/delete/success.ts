import * as reject from "ramda/src/reject";

import invariants from "../invariants";
import constants from "../../../constants";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../../types";

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
