import { WebPartContext } from "@microsoft/sp-webpart-base";
import ContextInjection from "../ContextInjection";
import Request from "../Models/Entities/Request";
import { SPHttpClient } from "@microsoft/sp-http";

export default class RequestService {
  private readonly _context: WebPartContext;
  private readonly _listName: string;

  constructor() {
    this._context = ContextInjection.getInstance().getContext();
    this._listName = `Requests`;
  }

  public async getRequests(): Promise<Request[]> {
    try {
      const requestUrl = `${this._context.pageContext.web.absoluteUrl}/_api/web/Lists/GetByTitle('${this._listName}')`;
      const response = await this._context.spHttpClient.get(
        requestUrl,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const jsonResp = await response.json();
        return jsonResp.value.map((item) => ({
          customerCIF: item.CustomerCIF,
          customerName: item.CustomerName,
          branch: item.Branch,
          details: item.Details,
          status: item.Status,
          lastAction: item.LastAction,
          lastActionBy: item.LastActionBy,
          lastActionDate: item.LastActionDate
            ? new Date(item.LastActionDate)
            : "",
        }));
      } else {
        throw new Error("error occurred while retrieving data");
      }
    } catch (e) {
      throw e;
    }
  }
}
