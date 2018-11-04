import * as merge from "ramda/src/merge";
import * as invariant from "invariant";

import actionTypesFor from "./actionTypesFor";
import assertNotArray from "./utils/assertNotArray";
import constants from "./constants";
import getDefaultConfig from "./getDefaultConfig";

import {IConfig, ReducerName} from "./types";

// const invariant = require("invariant")

function assertError(actionCreatorName: ReducerName, error) {
  invariant(error != null, "Expected error in " + actionCreatorName);
}

function assertOneRecord(
  actionCreatorName: ReducerName,
  config: IConfig,
  record?: any
) {
  invariant(record != null, "Expected record in " + actionCreatorName);
  assertNotArray(config, "createStart", record);
  const key = config.key || constants.DEFAULT_KEY;
  invariant(
    record[key] != null,
    "Expected record." + key + " in " + actionCreatorName
  );
}

function assertManyRecords(actionCreatorName, records) {
  invariant(records != null, "Expected records " + actionCreatorName);
}

export const getAction = <T>(actionType: string) => {
  return function(data?) {
    return {
      data,
      type: actionType
    };
  };
};

export const getActionWithOneRecord = <T>(
  actionType: string,
  actionName: ReducerName,
  config: IConfig
) => {
  return function(record?: T, data?) {
    assertOneRecord(actionName, config, record);
    return {
      data,
      record,
      type: actionType
    };
  };
};

export const getActionWithOneRecordAndCustomField = <T>(
  actionType: string,
  actionName: ReducerName,
  customFieldName: string,
  config: IConfig
) => {
  return function(record?: T, customField?, data?) {
    assertOneRecord(actionName, config, record);

    return {
      [customFieldName]: customField,
      data,
      record,
      type: actionType
    };
  };
};

export const getActionWithRecords = <T>(
  actionType: string,
  actionName: ReducerName
) => {
  return function(records?: T[], data?) {
    assertManyRecords(actionName, records);

    return {
      data,
      records,
      type: actionType
    };
  };
};

export const getErrorAction = <T>(
  actionType: string,
  actionName: ReducerName
) => {
  return function(error?, data?) {
    assertError(actionName, error);

    return {
      data,
      error,
      type: actionType
    };
  };
};

export const getErrorActionWithRecord = <T>(
  actionType: string,
  actionName: ReducerName,
  config: IConfig
) => {
  return function(error?, record?: T, data?) {
    assertError(actionName, error);
    assertOneRecord(actionName, config, record);

    return {
      data,
      error,
      record,
      type: actionType
    };
  };
};

export default function actionCreatorsFor<T>(
  resourceName: string,
  config?: IConfig
) {
  if (resourceName == null)
    throw new Error("actionCreatorsFor: Expected resourceName");

  config = config || getDefaultConfig(resourceName);

  const actionTypes = actionTypesFor(resourceName);

  return {
    fetchRequest: getAction(actionTypes.fetchRequest),
    fetchStart: getAction(actionTypes.fetchStart),
    fetchSuccess: getActionWithRecords(
      actionTypes.fetchSuccess,
      "fetchSuccess"
    ),
    fetchError: getErrorAction(actionTypes.fetchError, "fetchError"),

    createRequest: getActionWithOneRecord(
      actionTypes.createRequest,
      "createRequest",
      config
    ),
    createStart: getActionWithOneRecord(
      actionTypes.createStart,
      "createStart",
      config
    ),
    createSuccess: getActionWithOneRecordAndCustomField(
      actionTypes.createSuccess,
      "createSuccess",
      "cid",
      config
    ),
    createError: getErrorActionWithRecord(
      actionTypes.createError,
      "createError",
      config
    ),

    updateRequest: getActionWithOneRecord(
      actionTypes.updateRequest,
      "updateRequest",
      config
    ),
    updateStart: getActionWithOneRecord(
      actionTypes.updateStart,
      "updateStart",
      config
    ),
    updateSuccess: getActionWithOneRecord(
      actionTypes.updateSuccess,
      "updateSuccess",
      config
    ),
    updateError: getErrorActionWithRecord(
      actionTypes.updateError,
      "updateError",
      config
    ),

    deleteRequest: getActionWithOneRecord(
      actionTypes.deleteRequest,
      "deleteRequest",
      config
    ),
    deleteStart: getActionWithOneRecord(
      actionTypes.deleteStart,
      "deleteStart",
      config
    ),
    deleteSuccess: getActionWithOneRecord(
      actionTypes.deleteSuccess,
      "deleteSuccess",
      config
    ),
    deleteError: getErrorActionWithRecord(
      actionTypes.deleteError,
      "deleteError",
      config
    )
  };
}
