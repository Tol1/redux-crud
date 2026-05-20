import constants from "../../../constants.js";
import invariants from "../invariants.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";
import {mergeRight} from "ramda";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  canBeArray: true,
  reducerName
};

export default function success(
  config: IConfig,
  current: IMap<any>,
  records: any[]
): IMap<any> {
  invariants(invariantArgs, config, current, records);

  const mergeValues = records.reduce((acc, record) => {
    if (!current[record[config.key]]) return acc;
    acc[record[config.key]] = record;
    return acc;
  }, {});

  return mergeRight(current, mergeValues);
}
