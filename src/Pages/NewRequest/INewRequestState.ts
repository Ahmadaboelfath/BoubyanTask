import Request from "../../Models/Entities/Request";

export default interface INewRequestState {
  request: Request;
  errors: { [key: string]: string };
  showConfirmDialog: boolean;
  showSubmitDialog: boolean;
  showErrorDialog: boolean;
  showSpinner: boolean;
}
