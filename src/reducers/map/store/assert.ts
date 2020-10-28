import * as is from "ramda/src/is";

import {IMap} from "../../../types";
import ReduxCrudError from "../../../utils/reduxCrudError";

export default function assertValidStore(
  scope: string,
  current: IMap<any>
): void {
  if (!is(Object, current))
    throw new ReduxCrudError(
      scope + ": Expected current to be an object",
      current
    );
}
