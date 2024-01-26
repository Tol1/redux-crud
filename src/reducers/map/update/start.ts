import {prepareRecord} from "../../common/update/start.js";
import constants from "../../../constants.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_START;
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

  // mark record as unsaved and busy
  const newRecord = prepareRecord(record);

  // replace record
  return store.merge(config, current, newRecord);
}
