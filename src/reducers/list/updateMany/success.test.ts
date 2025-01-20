import constants from "../../../constants.js";
import reducer from "./success.js";
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
  return [
    {
      id: 2,
      name: "Green"
    }
  ];
}

function getValidFullList() {
  return [
    ...getValid(),
    {
      id: 3,
      name: "Yellow"
    },
    {
      id: 1,
      name: "Pink"
    }
  ];
}

test(subject + "don't add the record if not there", function(t) {
  const curr = getCurrent();
  const records = [
    {
      id: 3,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, records);

  t.is(updated.length, 2);
});

test(subject + "updates existing", function(t) {
  const curr = getCurrent();
  const records = getValid();
  const updated = reducer(config, curr, records);

  t.is(updated.length, 2);
  t.is(updated[1].id, 2);
  t.is(updated[1].name, "Green");
});

test(subject + "updates many existing", function(t) {
  const curr = getCurrent();
  const records = getValidFullList();
  const updated = reducer(config, curr, records);

  t.is(updated.length, 2);
  t.is(updated[1].id, 2);
  t.is(updated[1].name, "Green");
  t.is(updated[0].id, 1);
  t.is(updated[0].name, "Pink");
});

test(subject + "doesnt mutate the original collection", function(t) {
  const curr = getCurrent();
  const records = [
    {
      id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, records);

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
  const records = [
    {
      _id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(configWithKey, curr, records);

  t.is(updated.length, 1);
});

test(subject + "it throws when record dont have an id", function(t) {
  const curr = getCurrent();
  const records = [
    {
      name: "Green"
    }
  ];

  const f = function() {
    reducer(config, curr, records);
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
