import {IConfig} from "./types.js";

export default function getDefaultConfig(resourceName: string): IConfig {
  return {
    key: "id",
    resourceName
  };
}
