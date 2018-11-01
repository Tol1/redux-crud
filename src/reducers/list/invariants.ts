import invariants from "../invariants";
import store from "./store";

import {IConfig, IInvariantsBaseArgs, ReducerName} from "../../types";

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
