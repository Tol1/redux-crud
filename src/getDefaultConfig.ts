import {IConfig} from "./types";

export default function getDefaultConfig(resourceName: string): IConfig {
  return {
    key: "id",
    resourceName
  };
}
