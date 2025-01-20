import {prepareRecord} from "../../common/update/start.js";
import constants from "../../../constants.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_START;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function start(
  config: IConfig,
  current: any[],
  records: any[]
): any[] {
  invariants(invariantArgs, config, current, records);

  // mark record as unsaved and busy
  const newRecords = records.map(record => prepareRecord(record));

  // replace record
  return store.merge(current, newRecords, config.key);
}
