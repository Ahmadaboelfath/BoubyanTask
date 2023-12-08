export default class Request {
  customerCIF: string;
  customerName: string;
  branch: string;
  details: string;
  status?: "Pending" | "Approved" | "Rejected" | "Amended";
  lastAction?: string;
  lastActionBy?: string;
  lastActionDate?: Date;
}
