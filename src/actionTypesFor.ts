import * as snakeCase from "lodash.snakecase";
import {IConfig, ILooseObject} from "./types";

function addGroup(resource, actionTypes, group, async, config) {
  const upperResource = snakeCase(resource).toUpperCase();
  const upperGroup = snakeCase(group).toUpperCase();

  const request = upperResource + "_" + upperGroup + "_REQUEST";
  const start = upperResource + "_" + upperGroup + "_START";
  const success = upperResource + "_" + upperGroup + "_SUCCESS";
  const error = upperResource + "_" + upperGroup + "_ERROR";
  const requestAlias = group + "Request";
  const startAlias = group + "Start";
  const successAlias = group + "Success";
  const errorAlias = group + "Error";

  if (async) {
    actionTypes[request] = request;
  }
  actionTypes[start] = start;
  actionTypes[success] = success;
  actionTypes[error] = error;

  if (config.addAlias) {
    if (async) {
      actionTypes[requestAlias] = request;
    }
    actionTypes[startAlias] = start;
    actionTypes[successAlias] = success;
    actionTypes[errorAlias] = error;
  }
}

const actionTypesFor = (resourceName, config?: IConfig) => {
  if (resourceName == null) {
    throw new Error("Expected resourceName");
  }
  config = config || {resourceName};
  if (config.addAlias == null) {
    config.addAlias = true;
  }

  resourceName = resourceName.trim();
  if (resourceName === "") {
    throw new Error("Expected resourceName");
  }
  const actionTypes: ILooseObject = {};

  addGroup(resourceName, actionTypes, "fetch", true, config);
  addGroup(resourceName, actionTypes, "create", true, config);
  addGroup(resourceName, actionTypes, "update", true, config);
  addGroup(resourceName, actionTypes, "delete", true, config);

  if (config.additionalTypes) {
    Object.entries(config.additionalTypes).forEach(([additionalType, async]) =>
      addGroup(resourceName, actionTypes, additionalType, async, config)
    );
  }

  return actionTypes;
};

export default actionTypesFor;
