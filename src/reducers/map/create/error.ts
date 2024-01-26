import constants from "../../../constants.js";
import invariants from "../invariants.js";
import store from "../store.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_ERROR;
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

  return store.remove(config, current, record);
}
