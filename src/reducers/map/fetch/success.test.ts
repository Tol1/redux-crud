import * as values from "ramda/src/values";
import * as merge from "ramda/src/merge";
import test from "ava";

import constants from "../../../constants";
import reducer from "./success";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

const subject = constants.REDUCER_NAMES.FETCH_SUCCESS;

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

test(subject + " adds the records", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 42,
      name: "Green"
    }
  ];

  const updated = reducer(config, curr, more, {});

  const expected = {
    1: {
      id: 1,
      name: "Blue"
    },
    2: {
      id: 2,
      name: "Red"
    },
    42: {
      id: 42,
      name: "Green"
    }
  };

  t.deepEqual(updated, expected);
});

test(subject + " throws when config.key is wrong", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 42,
      name: "Green"
    }
  ];

  const config2 = merge(config, {
    key: "_id"
  });

  const f = function() {
    reducer(config2, curr, more, {});
  };
  t.throws(f);
});

test(subject + " doesnt mutate the original collection", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 3,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, {});

  t.is(values(curr).length, 2);
  t.is(values(updated).length, 3);
});

test(subject + " merges", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, {});

  t.is(values(updated).length, 2);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
});

test(subject + " replaces", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, {}, true);

  t.is(values(updated).length, 1);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
});

test(subject + " compares", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 2,
      name: "Red"
    }
  ];
  const updated = reducer(config, curr, more, {}, undefined, true);

  t.is(curr, updated);
  t.true(curr === updated);
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
  const more = [
    {
      _id: 2,
      name: "Green"
    }
  ];

  const updated = reducer(configWithKey, curr, more, {});

  t.is(values(updated).length, 1);
});

test(subject + " it throws when records dont have an id", function(t) {
  const curr = getCurrent();
  const more = [
    {
      name: "Green"
    }
  ];

  const f = function() {
    reducer(config, curr, more, {});
  };
  t.throws(f);
});

test(subject + " can take one record", function(t) {
  const curr = getCurrent();
  const one = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, one, {});

  t.is(values(updated).length, 3);
});
