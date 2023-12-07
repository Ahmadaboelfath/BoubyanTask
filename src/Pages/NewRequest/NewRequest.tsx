import * as React from "react";
import INewRequestProps from "./INewRequestProps";
import INewRequestState from "./INewRequestState";
import { RouteComponentProps } from "react-router-dom";

export default class NewRequest extends React.Component<
  RouteComponentProps<INewRequestProps>,
  INewRequestState
> {
  render(): JSX.Element {
    return <h1>New Request</h1>;
  }
}
