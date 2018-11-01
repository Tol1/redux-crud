import * as values from "ramda/src/values";
import test from "ava";

import constants from "../../../constants";
import reducer from "./start";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = constants.REDUCER_NAMES.UPDATE_START;

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue"
    },
    2: {
      id: 2,
      name: "Red"
    }
  };
}

function getValid() {
  return {
    id: 2,
    name: "Green"
  };
}

test(subject + "throws if given an array", function(t) {
  const curr = getCurrent();
  const record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, TypeError);
});

test(subject + "adds the record if not there", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(values(updated).length, 3);
});

test(subject + "doesnt mutate the original", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(values(curr).length, 2);
  t.is(values(updated).length, 3);
});

test(subject + "updates existing", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.is(values(updated).length, 2);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
});

test(subject + "uses the given key", function(t) {
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

test(subject + "it throws when record dont have an id", function(t) {
  const curr = getCurrent();
  const record = {
    name: "Green"
  };

  const f = function() {
    reducer(config, curr, record);
  };
  t.throws(f);
});

test(subject + "adds busy and pendingUpdate", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.deepEqual(updated["2"].name, "Green");
  t.truthy(updated["2"][constants.SPECIAL_KEYS.BUSY], "adds busy");
  t.truthy(
    updated["2"][constants.SPECIAL_KEYS.PENDING_UPDATE],
    "adds pendingUpdate"
  );
});
