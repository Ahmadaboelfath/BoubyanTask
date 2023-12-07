import * as React from "react";
import IHomePageProps from "./IHomePageProps";
import IHomePageState from "./IHomePageState";
import { RouteComponentProps } from "react-router-dom";

export default class HomePage extends React.Component<
  RouteComponentProps<IHomePageProps>,
  IHomePageState
> {
  render(): JSX.Element {
    return <h1>HomePage</h1>;
  }
}
