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

export default function success<T extends object>(
  config: IConfig,
  current: IMap<T>,
  addedRecord: object,
  clientGeneratedKey?: string
): IMap<T> {
  invariants(invariantArgs, config, current, addedRecord);

  const key = config.key;
  const addedRecordKey: string = addedRecord[key];
  // @ts-expect-error key is not known
  const addedRecordKeyLens = lensProp(addedRecordKey);
  const currentWithoutClientGeneratedKey = dissoc(
    clientGeneratedKey as keyof typeof current,
    current
  );

  return set(
    addedRecordKeyLens,
    addedRecord,
    currentWithoutClientGeneratedKey
  ) as IMap<T>;
}
