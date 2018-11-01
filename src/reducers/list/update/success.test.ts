import constants from "../../../constants";
import reducer from "./success";
import test from "ava";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

const subject = constants.REDUCER_NAMES.UPDATE_SUCCESS;

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue",
      unsaved: true,
      busy: true
    },
    {
      id: 2,
      name: "Red",
      unsaved: true,
      busy: true
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

test(subject + "don't add the record if not there", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(updated.length, 2);
});

test(subject + "updates existing", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.is(updated.length, 2);
  t.is(updated[1].id, 2);
  t.is(updated[1].name, "Green");
});

test(subject + "doesnt mutate the original collection", function(t) {
  const curr = getCurrent();
  const record = {
    id: 2,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(curr[1].name, "Red");
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

test(subject + "removes busy and pendingUpdate", function(t) {
  const curr = [
    {
      id: 2,
      name: "Green",
      pendingUpdate: true,
      busy: true
    }
  ];
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 1);
  t.truthy(updated[0][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
  t.truthy(
    updated[0][constants.SPECIAL_KEYS.PENDING_UPDATE] == null,
    "removes pendingUpdate"
  );
});
