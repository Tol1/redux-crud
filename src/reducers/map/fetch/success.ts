import * as indexBy from "ramda/src/indexBy";
import * as prop from "ramda/src/prop";
import * as merge from "ramda/src/merge";

import assertAllHaveKeys from "../../../utils/assertAllHaveKeys";
import constants from "../../../constants";
import invariants from "../invariants";
import wrapArray from "../../../utils/wrapArray";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../../types";

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
  replace: boolean = false
): IMap<any> {
  invariants(invariantArgs, config, current, records);

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  const mergeValues = indexBy(prop(config.key), records);

  return merge(replace ? emptyState : current, mergeValues);
}
