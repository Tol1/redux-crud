export default class ReduxCrudError extends Error {
  constructor(message: string, data: any) {
    super(message);

    this.name = "ReduxCrudError";
    this.data = data;
  }
  data: any;
}
