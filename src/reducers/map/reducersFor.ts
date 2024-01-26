import mergeRight from "ramda/es/mergeRight";

import actionTypesFor from "../../actionTypesFor.js";
import constants from "../../constants.js";
import commonReducersFor from "../common/reducersFor.js";
import createError from "./create/error.js";
import createStart from "./create/start.js";
import createSuccess from "./create/success.js";
import deleteError from "./delete/error.js";
import deleteStart from "./delete/start.js";
import deleteSuccess from "./delete/success.js";
import fetchSuccess from "./fetch/success.js";
import updateError from "./update/error.js";
import updateStart from "./update/start.js";
import updateSuccess from "./update/success.js";

import {IConfig, ReducerName} from "../../types.js";

const baseReducers = {
  createError,
  createStart,
  createSuccess,
  deleteError,
  deleteStart,
  deleteSuccess,
  fetchSuccess,
  updateError,
  updateStart,
  updateSuccess
};

export default function reducersFor(resourceName: string, args = {}, deps?) {
  const reducers = mergeRight(baseReducers, deps);
  return commonReducersFor(resourceName, args, {}, reducers);
}
