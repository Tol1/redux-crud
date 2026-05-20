import invariant from "invariant";

import actionTypesFor from "./actionTypesFor.js";
import assertNotArray from "./utils/assertNotArray.js";
import constants from "./constants.js";
import getDefaultConfig from "./getDefaultConfig.js";

import {IConfig, ReducerName} from "./types.js";

// const invariant = require("invariant")

function assertError(actionCreatorName: ReducerName, error) {
  invariant(error != null, "Expected error in " + actionCreatorName);
}

function assertOneRecord(
  actionCreatorName: ReducerName,
  config: IConfig,
  record?: object | null
) {
  invariant(record != null, "Expected record in " + actionCreatorName);
  assertNotArray(config, actionCreatorName, record);
}

function assertId(
  actionCreatorName: ReducerName,
  config: IConfig,
  record?: object | null
) {
  const key = config.key || constants.DEFAULT_KEY;
  invariant(
    record?.[key] != null,
    "Expected record." +
      key +
      " in " +
      config.resourceName +
      "/" +
      actionCreatorName
  );
}

function assertAllId<T extends object>(
  actionCreatorName: ReducerName,
  config: IConfig,
  records?: T[]
) {
  records?.forEach(record => {
    assertId(actionCreatorName, config, record);
  });
}

function assertManyRecords(actionCreatorName, records) {
  invariant(records != null, "Expected records " + actionCreatorName);
}

export const getAction = (actionType: string) => {
  return function(data?) {
    return {
      data,
      type: actionType
    };
  };
};

export const getActionWithRecord = <T extends object>(actionType: string) => {
  return function(record?: T | null, data?) {
    return {
      data,
      record,
      type: actionType
    };
  };
};

export const getActionWithOneRecord = <T extends object>(
  actionType: string,
  actionName: ReducerName,
  config: IConfig
) => {
  return function(record?: T | null, data?) {
    assertOneRecord(actionName, config, record);
    assertId(actionName, config, record);
    return {
      data,
      record,
      type: actionType
    };
  };
};

export const getActionWithOneUnsavedRecord = <T extends object>(
  actionType: string,
  actionName: ReducerName,
  config: IConfig
) => {
  return function(record?: T | null, data?) {
    assertOneRecord(actionName, config, record);
    return {
      data,
      record,
      type: actionType
    };
  };
};

export const getActionWithOneRecordAndCustomField = <T extends object>(
  actionType: string,
  actionName: ReducerName,
  customFieldName: string,
  config: IConfig
) => {
  return function(record?: T | null, customField?, data?) {
    assertOneRecord(actionName, config, record);
    assertId(actionName, config, record);

    return {
      [customFieldName]: customField,
      data,
      record,
      type: actionType
    };
  };
};

export const getActionWithRecords = <T extends object>(
  actionType: string,
  actionName: ReducerName
) => {
  return function(records?: T | T[] | null, data?) {
    assertManyRecords(actionName, records);

    return {
      data,
      records,
      type: actionType
    };
  };
};

export const getErrorAction = (actionType: string, actionName: ReducerName) => {
  return function(error?, data?) {
    assertError(actionName, error);

    return {
      data,
      error,
      type: actionType
    };
  };
};

export const getErrorActionWithRecord = <T extends object>(
  actionType: string,
  actionName: ReducerName,
  config: IConfig
) => {
  return function(error?, record?: T | null, data?) {
    assertError(actionName, error);
    assertOneRecord(actionName, config, record);
    assertId(actionName, config, record);

    return {
      data,
      error,
      record,
      type: actionType
    };
  };
};

export const getErrorActionWithRecords = <T extends object>(
  actionType: string,
  actionName: ReducerName,
  config: IConfig
) => {
  return function(error?, records?: T[], data?) {
    assertError(actionName, error);
    assertManyRecords(actionName, records);
    assertAllId(actionName, config, records);

    return {
      data,
      error,
      records,
      type: actionType
    };
  };
};

export default function actionCreatorsFor<T extends object>(
  resourceName: string,
  config?: IConfig
) {
  if (resourceName == null)
    throw new Error("actionCreatorsFor: Expected resourceName");

  config = {resourceName, ...(config || getDefaultConfig(resourceName))};

  const actionTypes = actionTypesFor(resourceName);

  return {
    fetchRequest: getAction(actionTypes.fetchRequest),
    fetchStart: getAction(actionTypes.fetchStart),
    fetchSuccess: getActionWithRecords<T>(
      actionTypes.fetchSuccess,
      "fetchSuccess"
    ),
    fetchError: getErrorAction(actionTypes.fetchError, "fetchError"),

    createRequest: getActionWithRecord<T>(actionTypes.createRequest),
    createStart: getActionWithOneRecord<T>(
      actionTypes.createStart,
      "createStart",
      config
    ),
    createSuccess: getActionWithOneRecordAndCustomField<T>(
      actionTypes.createSuccess,
      "createSuccess",
      "cid",
      config
    ),
    createError: getErrorActionWithRecord<T>(
      actionTypes.createError,
      "createError",
      config
    ),

    updateRequest: getActionWithRecord<T>(actionTypes.updateRequest),
    updateStart: getActionWithOneRecord<T>(
      actionTypes.updateStart,
      "updateStart",
      config
    ),
    updateSuccess: getActionWithOneRecord<T>(
      actionTypes.updateSuccess,
      "updateSuccess",
      config
    ),
    updateError: getErrorActionWithRecord<T>(
      actionTypes.updateError,
      "updateError",
      config
    ),

    updateManyRequest: getActionWithRecords<T>(
      actionTypes.updateManyRequest,
      "updateManyRequest"
    ),
    updateManyStart: getActionWithRecords<T>(
      actionTypes.updateManyStart,
      "updateManyStart"
    ),
    updateManySuccess: getActionWithRecords<T>(
      actionTypes.updateManySuccess,
      "updateManySuccess"
    ),
    updateManyError: getErrorActionWithRecords<T>(
      actionTypes.updateManyError,
      "updateManyError",
      config
    ),

    deleteRequest: getActionWithRecord<T>(actionTypes.deleteRequest),
    deleteStart: getActionWithOneRecord<T>(
      actionTypes.deleteStart,
      "deleteStart",
      config
    ),
    deleteSuccess: getActionWithOneRecord<T>(
      actionTypes.deleteSuccess,
      "deleteSuccess",
      config
    ),
    deleteError: getErrorActionWithRecord<T>(
      actionTypes.deleteError,
      "deleteError",
      config
    )
  };
}
