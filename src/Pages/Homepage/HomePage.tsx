import * as React from "react";
import IHomePageProps from "./IHomePageProps";
import IHomePageState from "./IHomePageState";
import { RouteComponentProps } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-material.css";
import { GridOptions } from "ag-grid-community";
import { PrimaryButton, Spinner, SpinnerSize } from "office-ui-fabric-react";
import RequestService from "../../Service/RequestService";
import UserService from "../../Service/UserService";
import Request from "../../Models/Entities/Request";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import ContextInjection from "../../ContextInjection";

export default class HomePage extends React.Component<
  RouteComponentProps<IHomePageProps>,
  IHomePageState
> {
  private readonly _requestsService: RequestService;
  private readonly _userService: UserService;
  private readonly _context: WebPartContext;

  constructor(props) {
    super(props);
    this._requestsService = new RequestService();
    this._userService = new UserService();
    this._context = ContextInjection.getInstance().getContext();
    this.state = {
      requests: [],
      gridOptions: {
        columnDefs: [
          { headerName: "Customer CIF", field: "customerCIF" },
          { headerName: "Customer Name", field: "customerName" },
          { headerName: "Branch", field: "branch" },
          { headerName: "Details", field: "details" },
          { headerName: "Status", field: "status" },
          { headerName: "Last Action", field: "lastAction" },
          { headerName: "Last Action By", field: "lastActionBy" },
          {
            headerName: "Last Action Date",
            field: "lastActionDate",
            filter: "agDateColumnFilter",
            filterParams: {
              browserDatePicker: true,
            },
          },
        ],
        rowData: [],
        enableFilter: true,
        floatingFilter: true,
      },
      showSpinner: true,

      // requests: [],
    };
  }

  componentDidMount(): void {
    this._userService.getCurrentUserGroups().then((groups) => {
      console.log(groups);
      this._requestsService.getRequests().then((requests) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          newState.requests = requests;
          const gridOptions = { ...prevState.gridOptions };
          gridOptions.rowData = requests;

          const isChecker =
            groups.filter((group) => group === "Checkers").length > 0;
          if (isChecker) {
            const columnDefs = [
              ...gridOptions.columnDefs,
              {
                headerName: "Actions",
                field: "requestId",
                // cellRenderer: () => this.renderActionCell(),
                cellRendererFramework: (params) =>
                  this.renderActionCell(params),
                width: 300,
              },
            ];
            gridOptions.columnDefs = columnDefs;
          }
          newState.gridOptions = gridOptions;
          newState.showSpinner = false;

          return newState;
        });
      });
    });
  }

  renderActionCell(params): JSX.Element {
    console.log(params);

    return !params.data.lastAction ? (
      <div>
        <PrimaryButton
          text="Approve"
          onClick={() => this.approveRequest(params.data)}
        />
        <PrimaryButton
          text="Reject"
          onClick={() => this.rejectRequest(params.data)}
        />
        <PrimaryButton
          text="Amend"
          onClick={() => this.ammendRequest(params.data)}
        />
      </div>
    ) : (
      <div>{params.data.lastAction}</div>
    );
  }

  approveRequest(request: Request): void {
    const approvedRequest = { ...request };
    approvedRequest.lastAction = "Approved";
    approvedRequest.lastActionBy = this._context.pageContext.user.email;
    approvedRequest.lastActionDate = new Date();
    approvedRequest.status = "Approved";

    this.setState({ showSpinner: true });
    this._requestsService
      .updateRequest(approvedRequest)
      .then((updatedRequest) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          const gridOptions = { ...prevState.gridOptions };
          const rowData = [...gridOptions.rowData];
          const requestindex = rowData.findIndex(
            (row) => row.requestId === updatedRequest.requestId
          );
          rowData[requestindex] = updatedRequest;
          gridOptions.rowData = rowData;
          newState.gridOptions = gridOptions;
          newState.showSpinner = false;
          return newState;
        });
      })
      .catch((e) => {
        alert(e);
        this.setState({ showSpinner: false });
      });
  }

  rejectRequest(request: Request): void {
    const rejectedRequest = { ...request };
    rejectedRequest.lastAction = "Rejected";
    rejectedRequest.lastActionBy = this._context.pageContext.user.email;
    rejectedRequest.lastActionDate = new Date();
    rejectedRequest.status = "Rejected";
    this.setState({ showSpinner: true });
    this._requestsService
      .updateRequest(rejectedRequest)
      .then((updatedRequest) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          const gridOptions = { ...prevState.gridOptions };
          const rowData = [...gridOptions.rowData];
          const requestindex = rowData.findIndex(
            (row) => row.requestId === updatedRequest.requestId
          );
          rowData[requestindex] = updatedRequest;
          gridOptions.rowData = rowData;
          newState.gridOptions = gridOptions;
          newState.showSpinner = false;
          return newState;
        });
      })
      .catch((e) => {
        alert(e);
        this.setState({ showSpinner: false });
      });
  }

  ammendRequest(request: Request): void {
    const amendedRequest = { ...request };
    amendedRequest.lastAction = "Amended";
    amendedRequest.lastActionBy = this._context.pageContext.user.email;
    amendedRequest.lastActionDate = new Date();
    amendedRequest.status = "Amended";
    this._requestsService
      .updateRequest(amendedRequest)
      .then((updatedRequest) => {
        this.setState((prevState) => {
          const newState = { ...prevState };
          const gridOptions = { ...prevState.gridOptions };
          const rowData = [...gridOptions.rowData];
          const requestindex = rowData.findIndex(
            (row) => row.requestId === updatedRequest.requestId
          );
          rowData[requestindex] = updatedRequest;
          gridOptions.rowData = rowData;
          newState.gridOptions = gridOptions;
          newState.showSpinner = false;
          return newState;
        });
      })
      .catch((e) => {
        alert(e);
        this.setState({ showSpinner: false });
      });
  }

  render(): JSX.Element {
    return (
      <div>
        {!this.state.showSpinner ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <PrimaryButton
                style={{ backgroundColor: "#ff3c00", padding: "18px" }}
                onClick={() => this.props.history.push("/new")}
              >
                New Request
              </PrimaryButton>
            </div>
            <div
              className="ag-theme-material"
              style={{ width: "100%", height: "50vh" }}
            >
              <AgGridReact gridOptions={this.state.gridOptions}></AgGridReact>
            </div>
          </div>
        ) : (
          <Spinner label="Loading" size={SpinnerSize.large} />
        )}
      </div>
    );
  }
}
