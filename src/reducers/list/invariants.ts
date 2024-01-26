import invariants from "../invariants.js";
import store from "./store.js";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../types.js";

export default function invariantsList(
  invariantArgs: IInvariantsBaseArgs,
  config: IConfig,
  current: any[],
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
