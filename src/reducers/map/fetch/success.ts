import indexBy from "ramda/es/indexBy";
import prop from "ramda/es/prop";
import mergeRight from "ramda/es/mergeRight";
import {shallowEqual} from "fast-equals";

import assertAllHaveKeys from "../../../utils/assertAllHaveKeys.js";
import constants from "../../../constants.js";
import invariants from "../invariants.js";
import wrapArray from "../../../utils/wrapArray.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.FETCH_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function success(
  config: IConfig,
  current: IMap<any>,
  records: any,
  emptyState: any,
  replace: boolean = false,
  compare: boolean = false
): IMap<any> {
  invariants(invariantArgs, config, current, records);

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  const base = replace ? emptyState : current;
  let changed = false;
  const mergeValues = records.reduce((acc, record) => {
    if (!compare || !shallowEqual(base[record[config.key]], record)) {
      acc[record[config.key]] = record;
      changed = true;
    }
    return acc;
  }, {});

  return changed ? mergeRight(base, mergeValues) : base;
}
