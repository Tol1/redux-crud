import * as dissoc from "ramda/src/dissoc";
import * as lensProp from "ramda/src/lensProp";
import * as set from "ramda/src/set";

import constants from "../../../constants";
import invariants from "../invariants";

import {IConfig, IInvariantsBaseArgs, IMap, ReducerName} from "../../../types";

const reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS;
const invariantArgs: IInvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config: IConfig,
  current: IMap<any>,
  addedRecord: any,
  clientGeneratedKey?: string
): IMap<any> {
  invariants(invariantArgs, config, current, addedRecord);

  const key = config.key;
  const addedRecordKey: string = addedRecord[key];
  const addedRecordKeyLens = lensProp(addedRecordKey);
  const currentWithoutClientGeneratedKey = dissoc(clientGeneratedKey, current);

  return set(addedRecordKeyLens, addedRecord, currentWithoutClientGeneratedKey);
}
