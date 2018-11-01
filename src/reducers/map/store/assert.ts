import * as is from "ramda/src/is";

import {IMap} from "../../../types";

export default function assertValidStore(
  scope: string,
  current: IMap<any>
): void {
  if (!is(Object, current))
    throw new Error(scope + ": Expected current to be an object");
}
