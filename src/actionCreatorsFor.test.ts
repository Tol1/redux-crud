import test from "ava";
import actionCreatorsFor from "./actionCreatorsFor";

const error = {};
const actionCreators = actionCreatorsFor("users");
const subject = " actionCreatorsFor: ";
const arrayRegEx = /Expected record not to be an array/;

function makeUser() {
  return {
    id: 11,
    name: "User"
  };
}

function makeUsers() {
  return [makeUser()];
}

test(subject + "returns the actionCreators", function(t) {
  t.truthy(actionCreators.fetchRequest);
  t.truthy(actionCreators.fetchStart);
  t.truthy(actionCreators.fetchSuccess);
  t.truthy(actionCreators.fetchError);

  t.truthy(actionCreators.createRequest);
  t.truthy(actionCreators.createStart);
  t.truthy(actionCreators.createSuccess);
  t.truthy(actionCreators.createError);

  t.truthy(actionCreators.updateRequest);
  t.truthy(actionCreators.updateStart);
  t.truthy(actionCreators.updateSuccess);
  t.truthy(actionCreators.updateError);

  t.truthy(actionCreators.deleteRequest);
  t.truthy(actionCreators.deleteStart);
  t.truthy(actionCreators.deleteSuccess);
  t.truthy(actionCreators.deleteError);
});

test(subject + "fetchRequest", function(t) {
  const data = {foo: 1};

  const action = actionCreators.fetchRequest(data);

  t.deepEqual(action.type, "USERS_FETCH_REQUEST");
  t.deepEqual(action.data, data, "has the data");
});

test(subject + "fetchStart", function(t) {
  const data = {foo: 1};

  const action = actionCreators.fetchStart(data);

  t.deepEqual(action.type, "USERS_FETCH_START");
  t.deepEqual(action.data, data, "has the data");
});

test(subject + "fetchSuccess", function(t) {
  const data = {foo: 1};
  const users = makeUsers();

  const action = actionCreators.fetchSuccess(users, data);

  t.deepEqual(action.type, "USERS_FETCH_SUCCESS");
  t.deepEqual(action.records, users, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.fetchSuccess();
  }
  t.throws(withoutPayload, /Expected records/);
});

test(subject + "fetchError", function(t) {
  const data = {foo: 1};

  const action = actionCreators.fetchError(error, data);

  t.deepEqual(action.type, "USERS_FETCH_ERROR");
  t.deepEqual(action.error, error, "has the error");
  t.deepEqual(action.data, data, "has the data");
});

test(subject + "createRequest", function(t) {
  const userWithoutKey = {};
  const data = {foo: 1};

  const action = actionCreators.createRequest(userWithoutKey, data);

  t.deepEqual(action.type, "USERS_CREATE_REQUEST");
  t.deepEqual(action.record, userWithoutKey, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.createRequest();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects single record
  function withArray() {
    actionCreators.createRequest([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "createStart", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.createStart(user, data);

  t.deepEqual(action.type, "USERS_CREATE_START");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.createStart();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects single record
  function withArray() {
    actionCreators.createStart([]);
  }
  t.throws(withArray, arrayRegEx);

  // it expects a key on the record
  function withoutKey() {
    const userWithoutKey = {};
    actionCreators.createStart(userWithoutKey);
  }
  t.throws(withoutKey, /Expected record\.id in createStart/);
});

test(subject + "createSuccess", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.createSuccess(user, "abc", data);

  t.deepEqual(action.type, "USERS_CREATE_SUCCESS");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.cid, "abc", "has the cid");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.createSuccess();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.createSuccess([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "createError", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.createError(error, user, data);

  t.deepEqual(action.type, "USERS_CREATE_ERROR");
  t.deepEqual(action.error, error);
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.createError(error);
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects single record
  function withArray() {
    actionCreators.createError(error, []);
  }
  t.throws(withArray, arrayRegEx);

  function withoutKey() {
    const userWithoutKey = {};
    actionCreators.createError(error, userWithoutKey);
  }
  t.throws(withoutKey, /Expected record\.id in createError/);
});

test(subject + "updateRequest", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.updateRequest(user, data);

  t.deepEqual(action.type, "USERS_UPDATE_REQUEST");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.updateRequest();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.updateRequest([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "updateStart", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.updateStart(user, data);

  t.deepEqual(action.type, "USERS_UPDATE_START");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.updateStart();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.updateStart([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "updateSuccess", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.updateSuccess(user, data);

  t.deepEqual(action.type, "USERS_UPDATE_SUCCESS");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.updateSuccess();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.updateSuccess([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "updateError", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.updateError(error, user, data);

  t.deepEqual(action.type, "USERS_UPDATE_ERROR");
  t.deepEqual(action.error, error);
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.updateError(error);
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.updateError(error, []);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "deleteRequest", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.deleteRequest(user, data);

  t.deepEqual(action.type, "USERS_DELETE_REQUEST");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.deleteRequest();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.deleteRequest([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "deleteStart", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.deleteStart(user, data);

  t.deepEqual(action.type, "USERS_DELETE_START");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.deleteStart();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.deleteStart([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "deleteSuccess", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.deleteSuccess(user, data);

  t.deepEqual(action.type, "USERS_DELETE_SUCCESS");
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.deleteSuccess();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.deleteSuccess([]);
  }
  t.throws(withArray, arrayRegEx);
});

test(subject + "deleteError", function(t) {
  const user = makeUser();
  const data = {foo: 1};

  const action = actionCreators.deleteError(error, user, data);

  t.deepEqual(action.type, "USERS_DELETE_ERROR");
  t.deepEqual(action.error, error);
  t.deepEqual(action.record, user, "has the user");
  t.deepEqual(action.data, data, "has the data");

  function withoutPayload() {
    actionCreators.deleteError(error);
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.deleteError(error, []);
  }
  t.throws(withArray, arrayRegEx);
});
