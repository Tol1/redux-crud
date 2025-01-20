import has from "ramda/es/has";
import all from "ramda/es/all";
import ReduxCrudError from "./reduxCrudError.js";
import {IConfig} from "../types.js";

export default function(config: IConfig, reducerName: string, records: any) {
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
