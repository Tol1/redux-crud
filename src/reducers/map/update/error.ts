import {prepareRecord} from "../../common/update/error";
import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../../types";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_ERROR;
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

  // We don"t want to rollback
  const key = config.key;
  const updatedId = record[key];
  let updatedRecord = current[updatedId];

  if (updatedRecord == null) return current;

  updatedRecord = prepareRecord(updatedRecord);

  return store.merge(config, current, updatedRecord);
}
