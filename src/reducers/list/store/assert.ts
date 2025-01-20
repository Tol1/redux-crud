import ReduxCrudError from "../../../utils/reduxCrudError.js";

export default function assert(scope: string, current: any[]): void {
  const isArray = Array.isArray(current);
  if (!isArray)
    throw new ReduxCrudError(
      scope + ": Expected current to be an array",
      current
    );
}
