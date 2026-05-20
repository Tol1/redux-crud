import makeScope from "../utils/makeScope.js";

import {IConfig, ReducerName} from "../types.js";

export default function(
  config: IConfig,
  reducerName: ReducerName,
  record?: object | object[] | null
) {
  const scope = makeScope(config, reducerName);
  const isArray = Array.isArray(record);

  if (isArray)
    throw new TypeError(scope + ": Expected record not to be an array");
}
