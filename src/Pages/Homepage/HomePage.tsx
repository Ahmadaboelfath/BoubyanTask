import * as React from "react";
import IHomePageProps from "./IHomePageProps";
import IHomePageState from "./IHomePageState";
import { RouteComponentProps } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-material.css";
import { GridOptions } from "ag-grid-community";
import { PrimaryButton } from "office-ui-fabric-react";

export default class HomePage extends React.Component<
  RouteComponentProps<IHomePageProps>,
  IHomePageState
> {
  gridOptions: GridOptions = {
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

        type: "date",
      },
    ],
    rowData: [
      {
        customerCIF: "123456",
        customerName: "Ahmad",
        branch: "Maadi",
        details:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo distinctio obcaecati explicabo itaque, voluptatem veritatis aperiam fugit recusandae doloremque pariatur in magni saepe culpa et! Consequatur mollitia nihil fugiat maiores!",
        status: "Pending",
        lastAction: "test",
        lastActionBy: "mohamed@test.com",
        lastActionDate: new Date(),
      },
      {
        customerCIF: "123456",
        customerName: "Ahmad",
        branch: "Maadi",
        details:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo distinctio obcaecati explicabo itaque, voluptatem veritatis aperiam fugit recusandae doloremque pariatur in magni saepe culpa et! Consequatur mollitia nihil fugiat maiores!",
        status: "Pending",
        lastAction: "test",
        lastActionBy: "mohamed@test.com",
        lastActionDate: new Date(),
      },
      {
        customerCIF: "123456",
        customerName: "Ahmad",
        branch: "Maadi",
        details:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo distinctio obcaecati explicabo itaque, voluptatem veritatis aperiam fugit recusandae doloremque pariatur in magni saepe culpa et! Consequatur mollitia nihil fugiat maiores!",
        status: "Pending",
        lastAction: "test",
        lastActionBy: "mohamed@test.com",
        lastActionDate: new Date(),
      },
    ],
    enableFilter: true,
    floatingFilter: true,
  };

  render(): JSX.Element {
    return (
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
          <AgGridReact gridOptions={this.gridOptions}></AgGridReact>
        </div>
      </div>
    );
  }
}
