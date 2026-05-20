export default class ReduxCrudError<T> extends Error {
  public data: T;
  constructor(message: string, data: T) {
    super(message);

    this.name = "ReduxCrudError";
    this.data = data;
  }
}
