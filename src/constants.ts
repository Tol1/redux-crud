import {ReducerName} from "./types";

const CREATE_ERROR: ReducerName = "createError";
const CREATE_START: ReducerName = "createStart";
const CREATE_SUCCESS: ReducerName = "createSuccess";
const CREATE_REQUEST: ReducerName = "createRequest";
const DELETE_ERROR: ReducerName = "deleteError";
const DELETE_START: ReducerName = "deleteStart";
const DELETE_SUCCESS: ReducerName = "deleteSuccess";
const DELETE_REQUEST: ReducerName = "deleteRequest";
const FETCH_SUCCESS: ReducerName = "fetchSuccess";
const FETCH_REQUEST: ReducerName = "fetchRequest";
const UPDATE_ERROR: ReducerName = "updateError";
const UPDATE_START: ReducerName = "updateStart";
const UPDATE_SUCCESS: ReducerName = "updateSuccess";
const UPDATE_REQUEST: ReducerName = "updateRequest";

export default {
	DEFAULT_KEY: "id",
	STORE_LIST: "STORE_LIST",
	STORE_MAP: "STORE_MAP",
	REDUCER_NAMES: {
		CREATE_ERROR,
		CREATE_START,
		CREATE_SUCCESS,
		CREATE_REQUEST,
		DELETE_ERROR,
		DELETE_START,
		DELETE_SUCCESS,
		DELETE_REQUEST,
		FETCH_SUCCESS,
		FETCH_REQUEST,
		UPDATE_ERROR,
		UPDATE_START,
		UPDATE_SUCCESS,
		UPDATE_REQUEST
	},
	SPECIAL_KEYS: {
		BUSY: "_busy",
		CLIENT_GENERATED_ID: "_cid",
		DELETED: "_deleted",
		PENDING_CREATE: "_pendingCreate",
		PENDING_UPDATE: "_pendingUpdate"
	}
};
