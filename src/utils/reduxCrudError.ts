export default class ReduxCrudError extends Error {
  public data: any;
  constructor(message: string, data: any) {
    super(message);

    this.name = "ReduxCrudError";
    this.data = data;
  }
}
