export default class Request {
  requestId?: string;
  customerCIF: string;
  customerName: string;
  branch: string;
  details: string;
  status?: "Pending" | "Approved" | "Rejected" | "Amended";
  lastAction?: string;
  lastActionBy?: string;
  lastActionDate?: Date;
}
