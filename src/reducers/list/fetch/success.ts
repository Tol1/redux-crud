import assertAllHaveKeys from "../../../utils/assertAllHaveKeys";
import constants from "../../../constants";
import store from "../store";
import wrapArray from "../../../utils/wrapArray";
import invariants from "../invariants";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types";

const reducerName: ReducerName = constants.REDUCER_NAMES.FETCH_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function success(
  config: IConfig,
  current: any[],
  records: any,
  emptyState: any,
  replace: boolean = false,
  compare: boolean = false
): any[] {
  invariants(invariantArgs, config, current, records);

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  return store.merge(
    replace ? emptyState : current,
    records,
    config.key,
    false,
    compare
  );
}
