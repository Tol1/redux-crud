import constants from "../../../constants";
import reducer from "./start";
import test from "ava";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = constants.REDUCER_NAMES.UPDATE_START;

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue"
    },
    {
      id: 2,
      name: "Red"
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

test(subject + "adds the record if not there", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(updated.length, 3);
});

test(subject + "doesnt mutate the original", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(curr.length, 2);
  t.is(updated.length, 3);
});

test(subject + "updates existing", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.is(updated.length, 2);
  t.is(updated[1].id, 2);
  t.is(updated[1].name, "Green");
});

test(subject + "uses the given key", function(t) {
  const configWithKey = {
    key: "_id",
    resourceName: "users"
  };
  const curr = [
    {
      _id: 2,
      name: "Blue"
    }
  ];
  const record = {
    _id: 2,
    name: "Green"
  };
  const updated = reducer(configWithKey, curr, record);

  t.is(updated.length, 1);
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

  t.deepEqual(updated[1].name, "Green");
  t.truthy(updated[1][constants.SPECIAL_KEYS.BUSY], "adds busy");
  t.truthy(
    updated[1][constants.SPECIAL_KEYS.PENDING_UPDATE],
    "adds pendingUpdate"
  );
});
