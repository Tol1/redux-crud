import * as has from "ramda/src/has";
import * as all from "ramda/src/all";
import ReduxCrudError from "./reduxCrudError";

export default function(config, reducerName, records) {
  // All given records must have a key
  const haskey = has(config.key);
  const allKeys = all(haskey, records);

  if (!allKeys) {
    throw new ReduxCrudError(
      reducerName +
        ": Expected all records to have a value for the store's key `" +
        config.key +
        "`",
      records
    );
  }
}
