import omit from "ramda/es/omit";

import {IConfig, IMap} from "../../../types.js";

export default function remove(
  config: IConfig,
  current: IMap<any>,
  record: any
): IMap<any> {
  const key = config.key;
  const recordKey = record[key];

  return omit([recordKey], current);
}
