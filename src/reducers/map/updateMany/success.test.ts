import values from "ramda/es/values";

import constants from "../../../constants.js";
import reducer from "./success.js";
import test from "ava";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = constants.REDUCER_NAMES.UPDATE_SUCCESS;

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue",
      unsaved: true,
      busy: true
    },
    2: {
      id: 2,
      name: "Red",
      unsaved: true,
      busy: true
    }
  };
}

function getValid() {
  return [
    {
      id: 2,
      name: "Green"
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

  t.is(values(updated).length, 2);
});

test(subject + "updates existing", function(t) {
  const curr = getCurrent();
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.is(values(updated).length, 2);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
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

  t.is(curr["2"].name, "Red");
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
  const records = [
    {
      _id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(configWithKey, curr, records);

  t.is(values(updated).length, 1);
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
  const curr = {
    2: {
      id: 2,
      name: "Green",
      pendingUpdate: true,
      busy: true
    }
  };
  const record = getValid();
  const updated = reducer(config, curr, record);

  t.deepEqual(values(updated).length, 1);
  t.truthy(updated["2"][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
  t.truthy(
    updated["2"][constants.SPECIAL_KEYS.PENDING_UPDATE] == null,
    "removes pendingUpdate"
  );
});
