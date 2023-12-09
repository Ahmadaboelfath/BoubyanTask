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
      const requestUrl = `${this._context.pageContext.web.absoluteUrl}/_api/web/Lists/GetByTitle('${this._listName}')/items`;
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

  public async addRequest(request: Request): Promise<Request> {
    const requestSPItem = {
      CustomerCIF: request.customerCIF,
      CustomerName: request.customerName,
      Branch: request.branch,
      Details: request.details,
      Status: request.status,
      LastAction: request.lastAction,
      LastActionBy: request.lastActionBy,
      LastActionDate: request.lastActionDate,
    };
    try {
      const requestUrl = `${this._context.pageContext.web.absoluteUrl}/_api/web/Lists/GetByTitle('${this._listName}')/items`;
      const res = await this._context.spHttpClient.post(
        requestUrl,
        SPHttpClient.configurations.v1,
        {
          body: JSON.stringify(requestSPItem),
        }
      );

      if (res.ok) {
        const jsonResp = await res.json();
        return {
          customerCIF: jsonResp.CustomerCIF,
          customerName: jsonResp.CustomerName,
          branch: jsonResp.Branch,
          details: jsonResp.Details,
          status: jsonResp.Status,
          lastAction: jsonResp.LastAction,
          lastActionBy: jsonResp.LastActionBy,
          lastActionDate: jsonResp.LastActionDate
            ? new Date(jsonResp.LastActionDate)
            : null,
        };
      }
    } catch (e) {
      throw e;
    }
  }
}
