import constants from "../../../constants";
import reducer from "./success";
import test from "ava";

const subject = "createSuccess: ";
const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

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

test(subject + "it throws if it cannot find config.key", function(t) {
  const curr = getCurrent();
  const record = {};
  const configWithoutKey = {
    resourceName: "users"
  };
  const f = function() {
    reducer(configWithoutKey, curr, record);
  };
  t.throws(f, /users.createSuccess: Expected config.key/);
});

test(subject + "doesnt mutate the original collection", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(curr.length, 2);
});

test(subject + "throws if given an array", function(t) {
  const curr = getCurrent();
  const record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, TypeError);
});

test(subject + "adds the record", function(t) {
  const curr = getCurrent();
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record);

  t.is(updated.length, 3);
});

test(subject + "merges if exists", function(t) {
  const curr = getCurrent();
  const record = {
    id: 2,
    name: "Green"
  };
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

test(subject + "it throws when record doesnt have an id", function(t) {
  const curr = getCurrent();
  const record = {
    name: "Green"
  };

  const f = function() {
    reducer(config, curr, record);
  };
  t.throws(f, /users.createSuccess: Expected record to have .id/);
});

test(subject + "it uses the cid", function(t) {
  const cid = "abc";
  const curr = [
    {
      id: cid,
      name: "Blue"
    }
  ];
  const record = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, record, cid);
  t.is(updated.length, 1);
});

test(subject + " cleans the cid", function(t) {
  const cid = "abc";
  const curr = [
    {
      id: cid,
      name: "Blue"
    }
  ];

  const record = {
    id: 3,
    name: "Green"
  };

  const updated = reducer(config, curr, record, cid);
  const updatedRecord = updated[0];

  t.is(updatedRecord[constants.SPECIAL_KEYS.CLIENT_GENERATED_ID], undefined);
});

test(subject + "removes busy and pendingCreate", function(t) {
  const curr = [
    {
      busy: true,
      id: 2,
      name: "Green",
      pendingCreate: true
    }
  ];
  const record = {
    id: 2,
    name: "Yellow"
  };
  const updated = reducer(config, curr, record);

  t.is(updated.length, 1);
  t.truthy(updated[0][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
  t.truthy(
    updated[0][constants.SPECIAL_KEYS.PENDING_CREATE] == null,
    "removes pendingCreate"
  );
});
