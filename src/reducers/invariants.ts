import assertHasKey from "./invariants/assertHasKey.js";
import assertNotArray from "../utils/assertNotArray.js";
import makeScope from "../utils/makeScope.js";

import {IInvariantsBaseArgs, IInvariantsExtraArgs} from "../types.js";

export default function invariants(
  baseArgs: IInvariantsBaseArgs,
  extraArgs: IInvariantsExtraArgs
) {
  const config = extraArgs.config;

  if (!config.resourceName) throw new Error("Expected config.resourceName");

  const scope = makeScope(config, baseArgs.reducerName);

  if (!config.key) throw new Error(scope + ": Expected config.key");
  if (!extraArgs.record) throw new Error(scope + ": Expected record/s");

  extraArgs.assertValidStore(scope, extraArgs.current);

  if (!baseArgs.canBeArray) {
    assertNotArray(extraArgs.config, baseArgs.reducerName, extraArgs.record);
  }

  assertHasKey(extraArgs.config, scope, extraArgs.record);
}
