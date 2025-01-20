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
import {mergeRight} from "ramda";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_START;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function start(
  config: IConfig,
  current: IMap<any>,
  records: any[]
): IMap<any> {
  invariants(invariantArgs, config, current, records);

  // mark record as unsaved and busy
  const newRecords = records.map(record => prepareRecord(record));

  // replace record
  const mergeValues = newRecords.reduce((acc, record) => {
    acc[record[config.key]] = record;
    return acc;
  }, {});

  return mergeRight(current, mergeValues);
}
