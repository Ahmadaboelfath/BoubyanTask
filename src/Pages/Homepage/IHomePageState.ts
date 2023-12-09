import { GridOptions } from "ag-grid-community";
import Request from "../../Models/Entities/Request";

export default interface IHomePageState {
  requests: Request[];
  gridOptions: GridOptions;
  showSpinner: boolean;
  hideActionButton?: boolean;
}
