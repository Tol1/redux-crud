import find from "ramda/es/find";

export default function findByKey(collection, key, id) {
  function predicate(record) {
    return record[key] === id;
  }

  return find(predicate, collection);
}
