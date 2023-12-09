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

export default class HomePage extends React.Component<
  RouteComponentProps<IHomePageProps>,
  IHomePageState
> {
  private readonly _requestsService: RequestService;

  constructor(props) {
    super(props);
    this._requestsService = new RequestService();
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

      // requests: [],
    };
  }

  componentDidMount(): void {
    this._requestsService.getRequests().then((requests) => {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.requests = requests;
        const gridOptions = { ...prevState.gridOptions };
        gridOptions.rowData = requests;
        newState.gridOptions = gridOptions;

        return newState;
      });
    });
  }

  render(): JSX.Element {
    return (
      <div>
        {this.state.gridOptions.rowData.length > 0 ? (
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
