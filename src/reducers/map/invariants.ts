import invariants from "../invariants.js";
import store from "./store.js";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../types.js";

export default function invariantsMap(
  invariantArgs: IInvariantsBaseArgs,
  config: IConfig,
  current: IMap<any>,
  record: any
) {
  const extra = {
    assertValidStore: store.assert,
    config,
    current,
    record
  };

  invariants(invariantArgs, extra);
}
