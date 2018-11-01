import * as snakeCase from "lodash.snakecase";
import {ILooseObject} from "./types";

function addGroup(resource, actionTypes, group, config) {
  const upperResource = snakeCase(resource).toUpperCase();
  const upperGroup = group.toUpperCase();

  const request = upperResource + "_" + upperGroup + "_REQUEST";
  const start = upperResource + "_" + upperGroup + "_START";
  const success = upperResource + "_" + upperGroup + "_SUCCESS";
  const error = upperResource + "_" + upperGroup + "_ERROR";
  const requestAlias = group + "Request";
  const startAlias = group + "Start";
  const successAlias = group + "Success";
  const errorAlias = group + "Error";

  actionTypes[request] = request;
  actionTypes[start] = start;
  actionTypes[success] = success;
  actionTypes[error] = error;

  if (config.addAlias) {
    actionTypes[requestAlias] = request;
    actionTypes[startAlias] = start;
    actionTypes[successAlias] = success;
    actionTypes[errorAlias] = error;
  }
}

const actionTypesFor = (resource, config?) => {
  if (resource == null) {
    throw new Error("Expected resource");
  }
  config = config || {};
  if (config.addAlias == null) {
    config.addAlias = true;
  }

  resource = resource.trim();
  if (resource === "") {
    throw new Error("Expected resource");
  }
  const actionTypes: ILooseObject = {};

  addGroup(resource, actionTypes, "fetch", config);
  addGroup(resource, actionTypes, "create", config);
  addGroup(resource, actionTypes, "update", config);
  addGroup(resource, actionTypes, "delete", config);

  if (config.additionalTypes) {
    config.additionalTypes.forEach(additionalType =>
      addGroup(resource, actionTypes, additionalType, config)
    );
  }

  return actionTypes;
};

export default actionTypesFor;
