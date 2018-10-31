import constants from "../../../constants";
import reducer from "./start";
import test from "ava";

var config = {
	key: constants.DEFAULT_KEY,
	resourceName: "users"
};
var subject = "deleteStart: ";

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
		id: 1,
		name: "Green"
	};
}

test(subject + "throws if given an array", function(t) {
	var curr = getCurrent();
	var record = [];
	function fn() {
		reducer(config, curr, record);
	}

	t.throws(fn, TypeError);
});

test(subject + "marks record as deleted and busy", function(t) {
	var curr = getCurrent();
	var record = getValid();
	var updated = reducer(config, curr, record);

	t.is(updated[0][constants.SPECIAL_KEYS.DELETED], true);
	t.is(updated[0][constants.SPECIAL_KEYS.BUSY], true);

	t.truthy(
		updated[1][constants.SPECIAL_KEYS.DELETED] == null,
		"doesnt add deleted to others"
	);
	t.truthy(
		updated[1][constants.SPECIAL_KEYS.BUSY] == null,
		"doesnt add busy to others"
	);
});

test(subject + "doesnt mutate", function(t) {
	var curr = getCurrent();
	var record = getValid();
	var updated = reducer(config, curr, record);

	t.is(updated[0][constants.SPECIAL_KEYS.DELETED], true);
	t.is(curr[0]["deleted"], undefined);
});

test(subject + "uses the given key", function(t) {
	var config = {
		key: "_id",
		resourceName: "users"
	};
	var curr = [
		{
			_id: 1
		}
	];
	var record = {
		_id: 1
	};
	var updated = reducer(config, curr, record);

	t.truthy(updated[0][constants.SPECIAL_KEYS.DELETED], "adds deleted");
});

test(subject + "it throws when record dont have an id", function(t) {
	var curr = getCurrent();
	var record = {
		name: "Green"
	};

	var f = function() {
		reducer(config, curr, record);
	};
	t.throws(f);
});
