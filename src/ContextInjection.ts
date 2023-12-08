import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class ContextInjection {
  private static _instance: ContextInjection;
  private _context: WebPartContext;

  private constructor() {}

  public static getInstance(): ContextInjection {
    if (!this._instance) {
      this._instance = new ContextInjection();
    }
    return this._instance;
  }

  public initializeContext(context: WebPartContext) {
    this._context = context;
  }

  public getContext(): WebPartContext {
    return this._context;
  }
}
