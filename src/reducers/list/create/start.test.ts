import constants from "../../../constants";
import reducer from "./start";
import test from "ava";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = "createStart: ";

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
    id: 3,
    name: "Green"
  };
}

test(subject + "throws if given an array", function(t) {
  const curr = getCurrent();
  const created = [];
  function fn() {
    reducer(config, curr, created);
  }

  t.throws(fn, TypeError);
});

test(subject + "adds the new record", function(t) {
  const curr = getCurrent();
  const other = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, other);

  t.deepEqual(updated.length, 3, "adds the record");
});

test(subject + "it throws when record doesnt have an id", function(t) {
  const curr = getCurrent();
  const record = {
    name: "Green"
  };

  const f = function() {
    reducer(config, curr, record);
  };
  t.throws(f, /users.createStart: Expected record to have .id/);
});

test(subject + "adds busy and pendingCreate", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.deepEqual(updated[2].name, "Green");
  t.truthy(updated[2][constants.SPECIAL_KEYS.BUSY], "adds busy");
  t.truthy(
    updated[2][constants.SPECIAL_KEYS.PENDING_CREATE],
    "adds pendingCreate"
  );
});
