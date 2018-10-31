export interface Config {
	key?: string;
	resourceName: string;
}

export interface InvariantsBaseArgs {
	reducerName: ReducerName;
	canBeArray: boolean;
}

export interface InvariantsExtraArgs {
	assertValidStore: (scope: string, current: any) => void;
	config: Config;
	current: any;
	record: any;
}

export interface Map<T> {
	[key: string]: T;
}

export type ReducerName =
	| "createError"
	| "createSuccess"
	| "createStart"
	| "createRequest"
	| "deleteError"
	| "deleteSuccess"
	| "deleteStart"
	| "deleteRequest"
	| "fetchSuccess"
	| "fetchRequest"
	| "fetchError"
	| "updateError"
	| "updateSuccess"
	| "updateStart"
	| "updateRequest";

export interface StoreList {
	remove: (config: Config, current: Array<any>, record: any) => Array<any>;
}

export interface StoreMap {
	remove: (config: Config, current: Map<any>, record: any) => Map<any>;
}

export interface Record {
	id: string | number;
	_cid?: string | number;
	busy?: boolean;
	deleted?: boolean;
	pendingCreate?: boolean;
	pendingUpdate?: boolean;
}
