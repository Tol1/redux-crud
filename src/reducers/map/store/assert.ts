import is from "ramda/es/is";

import {IMap} from "../../../types.js";
import ReduxCrudError from "../../../utils/reduxCrudError.js";

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
