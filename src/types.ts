export interface IConfig {
  key?: string;
  resourceName: string;
}

export interface IInvariantsBaseArgs {
  reducerName: ReducerName;
  canBeArray: boolean;
}

export interface IInvariantsExtraArgs {
  assertValidStore: (scope: string, current: any) => void;
  config: IConfig;
  current: any;
  record: any;
}

export interface IMap<T> {
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

export interface IStoreList {
  remove: (config: IConfig, current: any[], record: any) => any[];
}

export interface IStoreMap {
  remove: (config: IConfig, current: IMap<any>, record: any) => IMap<any>;
}

export interface IRecord {
  id: string | number;
  _cid?: string | number;
  _busy?: boolean;
  _deleted?: boolean;
  _pendingCreate?: boolean;
  _pendingUpdate?: boolean;
}

export interface ILooseObject {
  [key: string]: string;
}
