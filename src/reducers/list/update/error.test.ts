import constants from "../../../constants";
import reducer from "./error";
import test from "ava";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = constants.REDUCER_NAMES.UPDATE_ERROR;

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue",
      [constants.SPECIAL_KEYS.BUSY]: true,
      [constants.SPECIAL_KEYS.PENDING_UPDATE]: true
    },
    {
      id: 2,
      name: "Red",
      [constants.SPECIAL_KEYS.BUSY]: true,
      [constants.SPECIAL_KEYS.PENDING_UPDATE]: true
    }
  ];
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

test(subject + "doesnt add record if not there", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(updated.length, 2);
});

test(subject + "removes busy", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.truthy(updated[0][constants.SPECIAL_KEYS.BUSY], "doesnt remove on others");
  t.truthy(updated[1][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
});

test(subject + "doesnt mutate the original collection", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.is(curr[1][constants.SPECIAL_KEYS.BUSY], true);
  t.is(updated[1][constants.SPECIAL_KEYS.BUSY], undefined);
});

test(subject + "doesnt remove pendingUpdate", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.truthy(updated[1][constants.SPECIAL_KEYS.PENDING_UPDATE]);
});

test(subject + "uses the given key", function(t) {
  const configWithKey = {
    key: "_id",
    resourceName: "users"
  };
  const curr = [
    {
      _id: 2,
      name: "Blue",
      busy: true,
      unsaved: true
    }
  ];
  const record = {
    _id: 2
  };
  const updated = reducer(configWithKey, curr, record);

  t.truthy(updated[0][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
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
