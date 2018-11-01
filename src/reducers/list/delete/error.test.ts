import constants from "../../../constants";
import reducer from "./error";
import test from "ava";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = constants.REDUCER_NAMES.DELETE_ERROR;

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue",
      [constants.SPECIAL_KEYS.DELETED]: true,
      [constants.SPECIAL_KEYS.BUSY]: true
    },
    {
      id: 2,
      name: "Red",
      [constants.SPECIAL_KEYS.DELETED]: true,
      [constants.SPECIAL_KEYS.BUSY]: true
    }
  ];
}

test(subject + "throws if given an array", function(t) {
  const curr = getCurrent();
  const record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, TypeError);
});

test(subject + "doesnt mutate", function(t) {
  const curr = getCurrent();
  const record = {
    id: 1
  };
  const updated = reducer(config, curr, record);

  t.is(curr[0][constants.SPECIAL_KEYS.DELETED], true);
  t.is(curr[0][constants.SPECIAL_KEYS.BUSY], true);
  t.is(updated[0][constants.SPECIAL_KEYS.DELETED], undefined);
  t.is(updated[0][constants.SPECIAL_KEYS.BUSY], undefined);
});

test(subject + "removes deleted and busy", function(t) {
  const curr = getCurrent();
  const record = {
    id: 1
  };
  const updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 2, "doesnt remove record");
  t.truthy(
    updated[0][constants.SPECIAL_KEYS.DELETED] == null,
    "removes deleted"
  );
  t.truthy(updated[0][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");

  t.truthy(
    updated[1][constants.SPECIAL_KEYS.DELETED],
    "doesnt removes deleted from others"
  );
  t.truthy(
    updated[1][constants.SPECIAL_KEYS.BUSY],
    "doesnt removes busy from others"
  );
});

test(subject + "uses the given key", function(t) {
  const configWithKey = {
    key: "_id",
    resourceName: "users"
  };
  const curr = [
    {
      _id: 1,
      deleted: true,
      busy: true
    }
  ];
  const record = {
    _id: 1
  };
  const updated = reducer(configWithKey, curr, record);

  t.truthy(
    updated[0][constants.SPECIAL_KEYS.DELETED] == null,
    "removes deleted"
  );
  t.truthy(updated[0][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
});

test(subject + "it throws when record doesnt have an id", function(t) {
  const curr = getCurrent();
  const record = {
    name: "Green"
  };

  const f = function() {
    reducer(config, curr, record);
  };
  t.throws(f);
});
