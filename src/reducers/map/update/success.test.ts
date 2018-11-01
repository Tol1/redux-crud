import * as values from "ramda/src/values";

import constants from "../../../constants";
import reducer from "./success";
import test from "ava";

var config = {
	key: constants.DEFAULT_KEY,
	resourceName: "users"
};
var subject = constants.REDUCER_NAMES.UPDATE_SUCCESS;

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
	return {
		id: 2,
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

test(subject + "don't add the record if not there", function(t) {
	var curr = getCurrent();
	var record = {
		id: 3,
		name: "Green"
	};
	var updated = reducer(config, curr, record);

	t.is(values(updated).length, 2);
});

test(subject + "updates existing", function(t) {
	var curr = getCurrent();
	var record = getValid();
	var updated = reducer(config, curr, record);

	t.is(values(updated).length, 2);
	t.is(updated["2"].id, 2);
	t.is(updated["2"].name, "Green");
});

test(subject + "doesnt mutate the original collection", function(t) {
	var curr = getCurrent();
	var record = {
		id: 2,
		name: "Green"
	};
	var updated = reducer(config, curr, record);

	t.is(curr["2"].name, "Red");
	t.is(updated["2"].name, "Green");
});

test(subject + "uses the given key", function(t) {
	var config = {
		key: "_id",
		resourceName: "users"
	};
	var curr = {
		2: {
			_id: 2,
			name: "Blue"
		}
	};
	var record = {
		_id: 2,
		name: "Green"
	};
	var updated = reducer(config, curr, record);

	t.is(values(updated).length, 1);
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

test(subject + "removes busy and pendingUpdate", function(t) {
	var curr = {
		2: {
			id: 2,
			name: "Green",
			pendingUpdate: true,
			busy: true
		}
	};
	var record = getValid();
	var updated = reducer(config, curr, record);

	t.deepEqual(values(updated).length, 1);
	t.truthy(updated["2"][constants.SPECIAL_KEYS.BUSY] == null, "removes busy");
	t.truthy(
		updated["2"][constants.SPECIAL_KEYS.PENDING_UPDATE] == null,
		"removes pendingUpdate"
	);
});
