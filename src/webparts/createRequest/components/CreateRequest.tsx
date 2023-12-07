import * as React from "react";
import styles from "./CreateRequest.module.scss";
import { ICreateRequestProps } from "./ICreateRequestProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { HashRouter, Route, Switch } from "react-router-dom";
import routes from "../../../AppRoutes/Routes";

export default class CreateRequest extends React.Component<
  ICreateRequestProps,
  {}
> {
  private renderRoutes() {
    return routes.map<JSX.Element>((route) => (
      <Route
        render={() => route.component}
        path={route.path}
        exact={route.exact}
      />
    ));
  }

  public render(): React.ReactElement<ICreateRequestProps> {
    return (
      <HashRouter>
        <Switch>{this.renderRoutes()}</Switch>
      </HashRouter>
    );
  }
}
