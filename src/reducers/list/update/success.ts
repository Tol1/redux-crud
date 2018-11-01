import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../../types";

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
