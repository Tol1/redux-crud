import actionTypesFor from "./actionTypesFor";
import test from "ava";

const actionTypes = actionTypesFor("users");

test("returns the action actionTypes", function(t) {
  t.deepEqual(actionTypes.USERS_FETCH_REQUEST, "USERS_FETCH_REQUEST");
  t.deepEqual(actionTypes.USERS_FETCH_START, "USERS_FETCH_START");
  t.deepEqual(actionTypes.USERS_FETCH_SUCCESS, "USERS_FETCH_SUCCESS");
  t.deepEqual(actionTypes.USERS_FETCH_ERROR, "USERS_FETCH_ERROR");

  t.deepEqual(actionTypes.USERS_UPDATE_REQUEST, "USERS_UPDATE_REQUEST");
  t.deepEqual(actionTypes.USERS_UPDATE_START, "USERS_UPDATE_START");
  t.deepEqual(actionTypes.USERS_UPDATE_SUCCESS, "USERS_UPDATE_SUCCESS");
  t.deepEqual(actionTypes.USERS_UPDATE_ERROR, "USERS_UPDATE_ERROR");

  t.deepEqual(actionTypes.USERS_CREATE_REQUEST, "USERS_CREATE_REQUEST");
  t.deepEqual(actionTypes.USERS_CREATE_START, "USERS_CREATE_START");
  t.deepEqual(actionTypes.USERS_CREATE_SUCCESS, "USERS_CREATE_SUCCESS");
  t.deepEqual(actionTypes.USERS_CREATE_ERROR, "USERS_CREATE_ERROR");

  t.deepEqual(actionTypes.USERS_DELETE_REQUEST, "USERS_DELETE_REQUEST");
  t.deepEqual(actionTypes.USERS_DELETE_START, "USERS_DELETE_START");
  t.deepEqual(actionTypes.USERS_DELETE_SUCCESS, "USERS_DELETE_SUCCESS");
  t.deepEqual(actionTypes.USERS_DELETE_ERROR, "USERS_DELETE_ERROR");
});

test("returns aliases", function(t) {
  t.deepEqual(actionTypes.fetchRequest, "USERS_FETCH_REQUEST");
  t.deepEqual(actionTypes.fetchStart, "USERS_FETCH_START");
  t.deepEqual(actionTypes.fetchSuccess, "USERS_FETCH_SUCCESS");
  t.deepEqual(actionTypes.fetchError, "USERS_FETCH_ERROR");

  t.deepEqual(actionTypes.updateRequest, "USERS_UPDATE_REQUEST");
  t.deepEqual(actionTypes.updateStart, "USERS_UPDATE_START");
  t.deepEqual(actionTypes.updateSuccess, "USERS_UPDATE_SUCCESS");
  t.deepEqual(actionTypes.updateError, "USERS_UPDATE_ERROR");

  t.deepEqual(actionTypes.createRequest, "USERS_CREATE_REQUEST");
  t.deepEqual(actionTypes.createStart, "USERS_CREATE_START");
  t.deepEqual(actionTypes.createSuccess, "USERS_CREATE_SUCCESS");
  t.deepEqual(actionTypes.createError, "USERS_CREATE_ERROR");

  t.deepEqual(actionTypes.deleteRequest, "USERS_DELETE_REQUEST");
  t.deepEqual(actionTypes.deleteStart, "USERS_DELETE_START");
  t.deepEqual(actionTypes.deleteSuccess, "USERS_DELETE_SUCCESS");
  t.deepEqual(actionTypes.deleteError, "USERS_DELETE_ERROR");
});

test("returns custom async action types", function(t) {
  const customActionTypes = actionTypesFor("users", {
    additionalTypes: {
      search: true
    }
  });

  t.deepEqual(customActionTypes.searchRequest, "USERS_SEARCH_REQUEST");
  t.deepEqual(customActionTypes.searchStart, "USERS_SEARCH_START");
  t.deepEqual(customActionTypes.searchSuccess, "USERS_SEARCH_SUCCESS");
  t.deepEqual(customActionTypes.searchError, "USERS_SEARCH_ERROR");
});

test("returns custom sync action types", function(t) {
  const customActionTypes = actionTypesFor("users", {
    additionalTypes: {
      search: false
    }
  });

  t.is(customActionTypes.searchRequest, undefined);
  t.deepEqual(customActionTypes.searchStart, "USERS_SEARCH_START");
  t.deepEqual(customActionTypes.searchSuccess, "USERS_SEARCH_SUCCESS");
  t.deepEqual(customActionTypes.searchError, "USERS_SEARCH_ERROR");
});
