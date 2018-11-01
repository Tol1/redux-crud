import * as values from "ramda/src/values";
import * as keys from "ramda/src/keys";
import test from "ava";

import constants from "../../../constants";
import reducer from "./success";

const subject = constants.REDUCER_NAMES.CREATE_SUCCESS;
const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue"
    },
    2: {
      id: "abc",
      name: "Green"
    }
  };
}

test(subject + " it throws if it cannot find config.key", function(t) {
  const curr = getCurrent();
  const record = {};
  const brokenConfig = {
    resourceName: "users"
  };
  const f = function() {
    reducer(brokenConfig, curr, record);
  };
  t.throws(f, /users.createSuccess: Expected config.key/);
});

test(subject + " doesn't mutate the original collection", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(values(updated).length, 3);
  t.is(values(curr).length, 2);
});

test(subject + " throws if given an array", function(t) {
  const curr = getCurrent();
  const record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, TypeError);
});

test(subject + " adds the record", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);
  const actual = keys(updated);
  const expected = ["1", "2", "3"];

  t.deepEqual(actual, expected);
});

test(subject + " doesn't mutate the given record", function(t) {
  const curr = getCurrent();

  function getRecord() {
    return {
      busy: true,
      id: 3,
      name: "Green"
    };
  }
  const original = getRecord();
  const expected = getRecord();

  const updated = reducer(config, curr, original);

  t.deepEqual(original, expected);
});

test(subject + " merges if exists", function(t) {
  const curr = getCurrent();
  const record = {
    id: 2,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(values(updated).length, 2);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
});

test(subject + " uses the given key", function(t) {
  const configWithKey = {
    key: "_id",
    resourceName: "users"
  };
  const curr = {
    2: {
      _id: 2,
      name: "Blue"
    }
  };
  const record = {
    _id: 2,
    name: "Green"
  };

  const updated = reducer(configWithKey, curr, record);

  t.is(values(updated).length, 1);
});

test(subject + " it throws when record doesn't have an id", function(t) {
  const curr = getCurrent();
  const record = {
    name: "Green"
  };

  const f = function() {
    reducer(config, curr, record);
  };
  t.throws(f, /users.createSuccess: Expected record to have .id/);
});

test(subject + " uses the cid to merge the record", function(t) {
  const cid = "abc";
  const curr = {
    [cid]: {
      id: cid,
      name: "Green"
    }
  };
  const record = {
    id: 3,
    name: "Green"
  };

  const updated = reducer(config, curr, record, cid);

  // It has the expected key
  const expectedKeys = ["3"];
  const actualKeys = keys(updated);
  t.deepEqual(actualKeys, expectedKeys);

  // It merged the record
  t.deepEqual(updated["3"], record);
});

test(subject + " cleans the cid", function(t) {
  const cid = "abc";
  const curr = {
    [cid]: {
      id: cid,
      name: "Green"
    }
  };

  const record = {
    id: 3,
    name: "Green"
  };

  const updated = reducer(config, curr, record, cid);
  const updatedRecord = updated["3"];

  t.is(updatedRecord[constants.SPECIAL_KEYS.CLIENT_GENERATED_ID], undefined);
});

test(subject + " removes busy and pendingCreate", function(t) {
  const curr = {
    2: {
      busy: true,
      id: 2,
      name: "Green",
      pendingCreate: true
    }
  };
  const record = {
    id: 2,
    name: "Yellow"
  };
  const updated = reducer(config, curr, record);

  t.is(values(updated).length, 1);
  t.truthy(updated["2"][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
  t.truthy(
    updated["2"][constants.SPECIAL_KEYS.PENDING_CREATE] == null,
    "removes pendingCreate"
  );
});
