import find from "ramda/es/find";

export default function findByKey<T extends object>(
  collection: T[],
  key: string,
  id: number
) {
  function predicate(record: T) {
    return record[key] === id;
  }

  return find(predicate, collection);
}
