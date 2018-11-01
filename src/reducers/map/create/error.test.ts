import * as values from "ramda/src/values";
import test from "ava";

import constants from "../../../constants";
import reducer from "./error";

const subject = constants.REDUCER_NAMES.CREATE_ERROR;
const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue"
    },
    2: {
      id: "abc",
      name: "Green"
    }
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

test(subject + "removes the record", function(t) {
  const curr = getCurrent();
  t.deepEqual(values(curr).length, 2);

  const created = {
    id: "abc",
    name: "Green"
  };
  const updated = reducer(config, curr, created);

  t.deepEqual(values(updated).length, 2);
});
