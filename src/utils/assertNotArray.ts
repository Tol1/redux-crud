import * as is from "ramda/src/is";

import makeScope from "../utils/makeScope";

import {IConfig, ReducerName} from "../types";

export default function(
  config: IConfig,
  reducerName: ReducerName,
  record: any
) {
  const scope = makeScope(config, reducerName);
  const isArray = is(Array, record);

  if (isArray)
    throw new TypeError(scope + ": Expected record not to be an array");
}
