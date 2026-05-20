import {prepareRecord} from "../../common/create/start.js";
import constants from "../../../constants.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_START;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config: IConfig,
  current: any[],
  record: object
): any[] {
  invariants(invariantArgs, config, current, record);

  // mark record as unsaved and busy
  const newRecord = prepareRecord(record);

  return store.merge(current, newRecord, config.key);
}
