import dissoc from "ramda/es/dissoc";
import lensProp from "ramda/es/lensProp";
import set from "ramda/es/set";

import constants from "../../../constants.js";
import invariants from "../invariants.js";

import {
  IConfig,
  IInvariantsBaseArgs,
  IMap,
  ReducerName
} from "../../../types.js";

const reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config: IConfig,
  current: IMap<any>,
  addedRecord: object,
  clientGeneratedKey?: string
): IMap<any> {
  invariants(invariantArgs, config, current, addedRecord);

  const key = config.key;
  const addedRecordKey: string = addedRecord[key];
  // @ts-expect-error key is not known
  const addedRecordKeyLens = lensProp(addedRecordKey);
  const currentWithoutClientGeneratedKey = dissoc(clientGeneratedKey, current);

  return set(addedRecordKeyLens, addedRecord, currentWithoutClientGeneratedKey);
}
