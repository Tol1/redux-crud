import * as merge from "ramda/src/merge";
import * as invariant from "invariant";

import actionTypesFor from "./actionTypesFor";
import assertNotArray from "./utils/assertNotArray";
import constants from "./constants";
import getDefaultConfig from "./getDefaultConfig";

import {IConfig, ReducerName} from "./types";

// const invariant = require("invariant")

function actionCreatorsFor<T>(resourceName: string, config?: IConfig) {
  if (resourceName == null)
    throw new Error("actionCreatorsFor: Expected resourceName");

  config = config || getDefaultConfig(resourceName);
  config = merge(config, {resourceName});

  const actionTypes = actionTypesFor(resourceName);
  const key = config.key || constants.DEFAULT_KEY;

  function assertError(actionCreatorName: ReducerName, error) {
    invariant(error != null, "Expected error in " + actionCreatorName);
  }

  function assertOneRecord(actionCreatorName: ReducerName, record?: any) {
    invariant(record != null, "Expected record in " + actionCreatorName);
    assertNotArray(config, "createStart", record);
    invariant(
      record[key] != null,
      "Expected record." + key + " in " + actionCreatorName
    );
  }

  function assertManyRecords(actionCreatorName, records) {
    invariant(records != null, "Expected records " + actionCreatorName);
  }

  return {
    fetchRequest(data?) {
      return {
        data,
        type: actionTypes.fetchRequest
      };
    },

    fetchStart(data?) {
      return {
        data,
        type: actionTypes.fetchStart
      };
    },

    fetchSuccess(records?: T[], data?) {
      const name: ReducerName = "fetchSuccess";
      assertManyRecords(name, records);

      return {
        data,
        records,
        type: actionTypes.fetchSuccess
      };
    },

    fetchError(error?, data?) {
      const name: ReducerName = "fetchError";
      assertError(name, error);

      return {
        data,
        error,
        type: actionTypes.fetchError
      };
    },

    createRequest(record?: T, data?) {
      const name: ReducerName = "createRequest";
      assertOneRecord(name, record);
      return {
        data,
        record,
        type: actionTypes.createRequest
      };
    },

    createStart(record?: T, data?) {
      const name: ReducerName = "createStart";
      assertOneRecord(name, record);

      return {
        data,
        record,
        type: actionTypes.createStart
      };
    },

    createSuccess(record?: T, clientGeneratedKey?, data?) {
      const name: ReducerName = "createSuccess";
      assertOneRecord(name, record);

      return {
        cid: clientGeneratedKey,
        data,
        record,
        type: actionTypes.createSuccess
      };
    },

    createError(error?, record?: T, data?) {
      const name: ReducerName = "createError";
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        data,
        error,
        record,
        type: actionTypes.createError
      };
    },

    updateRequest(record?: T, data?) {
      const name: ReducerName = "updateRequest";
      assertOneRecord(name, record);

      return {
        data,
        record,
        type: actionTypes.updateRequest
      };
    },

    updateStart(record?: T, data?) {
      const name: ReducerName = "updateStart";
      assertOneRecord(name, record);

      return {
        data,
        record,
        type: actionTypes.updateStart
      };
    },

    updateSuccess(record?: T, data?) {
      const name: ReducerName = "updateSuccess";
      assertOneRecord(name, record);

      return {
        data,
        record,
        type: actionTypes.updateSuccess
      };
    },

    updateError(error?, record?: T, data?) {
      const name: ReducerName = "updateError";
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        data,
        error,
        record,
        type: actionTypes.updateError
      };
    },

    deleteRequest(record?: T, data?) {
      const name: ReducerName = "deleteRequest";
      assertOneRecord(name, record);

      return {
        data,
        record,
        type: actionTypes.deleteRequest
      };
    },

    deleteStart(record?: T, data?) {
      const name: ReducerName = "deleteStart";
      assertOneRecord(name, record);

      return {
        data,
        record,
        type: actionTypes.deleteStart
      };
    },

    deleteSuccess(record?: T, data?) {
      const name: ReducerName = "deleteSuccess";
      assertOneRecord(name, record);

      return {
        data,
        record,
        type: actionTypes.deleteSuccess
      };
    },

    deleteError(error?, record?: T, data?) {
      const name: ReducerName = "deleteError";
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        data,
        error,
        record,
        type: actionTypes.deleteError
      };
    }
  };
}

export default actionCreatorsFor;
