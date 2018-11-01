import constants from "../../../constants";
import reducer from "./success";
import test from "ava";

const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = "fetchSuccess: ";

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

test(subject + " adds the records", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 3,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, []);

  t.is(updated.length, 3);
});

test(subject + " doesnt mutate the original collection", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 3,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, []);

  t.is(curr.length, 2);
  t.is(updated.length, 3);
});

test(subject + " merges", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, []);

  t.is(updated.length, 2);
  t.is(updated[1].id, 2);
  t.is(updated[1].name, "Green");
});

test(subject + " replaces", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, [], true);

  t.is(updated.length, 1);
  t.is(updated[0].id, 2);
  t.is(updated[0].name, "Green");
});

test(subject + "preserves the order", function(t) {
  const curr = [];
  const more = [
    {
      id: 11,
      label: "Eleven"
    },
    {
      id: 7,
      label: "Sevent"
    }
  ];
  const updated = reducer(config, curr, more, []);

  t.is(updated.length, 2, "it has two");
  t.is(updated[0].id, 11, "it is in the right position");
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
  const more = [
    {
      _id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(configWithKey, curr, more, []);

  t.is(updated.length, 1);
});

test(subject + "it throws when records dont have an id", function(t) {
  const curr = getCurrent();
  const more = [
    {
      name: "Green"
    }
  ];

  const f = function() {
    reducer(config, curr, more, []);
  };
  t.throws(f);
});

test(subject + "can take one record", function(t) {
  const curr = getCurrent();
  const one = {
    id: 3,
    name: "Green"
  };
  const updated = reducer(config, curr, one, []);

  t.is(updated.length, 3);
});
