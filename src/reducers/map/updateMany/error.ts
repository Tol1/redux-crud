import {prepareRecord} from "../../common/update/error.js";
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

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_ERROR;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function error(
  config: IConfig,
  current: IMap<any>,
  records: any[]
): IMap<any> {
  invariants(invariantArgs, config, current, records);

  // We don"t want to rollback
  const key = config.key;
  const updatedRecords = records
    .map(record => {
      const updatedId = record[key];
      const updatedRecord = current[updatedId];

      if (updatedRecord == null) return null;

      return prepareRecord(updatedRecord);
    })
    .filter(record => record != null);

  const mergeValues = updatedRecords.reduce((acc, record) => {
    acc[record[config.key]] = record;
    return acc;
  }, {});

  return mergeRight(current, mergeValues);
  return store.merge(config, current, updatedRecords);
}
