import invariants from "../invariants";
import store from "./store";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../types";

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
