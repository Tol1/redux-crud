import constants from "../../../constants.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  canBeArray: false,
  reducerName
};

export default function success(
  config: IConfig,
  current: any[],
  record: any
): any[] {
  invariants(invariantArgs, config, current, record);

  return store.merge(current, record, config.key, true);
}
