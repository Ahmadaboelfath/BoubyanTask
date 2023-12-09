import { WebPartContext } from "@microsoft/sp-webpart-base";
import ContextInjection from "../ContextInjection";
import { SPHttpClient } from "@microsoft/sp-http";

export default class UserService {
  private readonly _context: WebPartContext;
  private readonly _webAbsoluteUrl: string;

  constructor() {
    this._context = ContextInjection.getInstance().getContext();
    this._webAbsoluteUrl = this._context.pageContext.web.absoluteUrl;
  }

  public async getCurrentUserGroups(): Promise<string[]> {
    try {
      const reqUrl = `${this._webAbsoluteUrl}/_api/web/currentuser?$expand=groups&$select=Groups`;
      const response = await this._context.spHttpClient.get(
        reqUrl,
        SPHttpClient.configurations.v1
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.Groups.map((group) => group.Title);
      }
    } catch (e) {
      throw e;
    }
  }
}
