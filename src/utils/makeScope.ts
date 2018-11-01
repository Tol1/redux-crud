import {IConfig, ReducerName} from "../types";

export default function makeScope(
  config: IConfig,
  reducerName: ReducerName
): string {
  return config.resourceName + "." + reducerName;
}
