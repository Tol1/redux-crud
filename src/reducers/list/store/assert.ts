import is from "ramda/es/is";
import ReduxCrudError from "../../../utils/reduxCrudError.js";

export default function assert(scope: string, current: any[]): void {
  const isArray = is(Array, current);
  if (!isArray)
    throw new ReduxCrudError(
      scope + ": Expected current to be an array",
      current
    );
}
