import * as React from "react";
import { ICreateRequestProps } from "./ICreateRequestProps";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "../../../Pages/Homepage/HomePage";
import NewRequest from "../../../Pages/NewRequest/NewRequest";

export default class CreateRequest extends React.Component<
  ICreateRequestProps,
  {}
> {
  public render(): React.ReactElement<ICreateRequestProps> {
    return (
      <HashRouter>
        <Switch>
          <Route render={(props) => <NewRequest {...props} />} path="/new" />
          <Route render={(props) => <HomePage {...props} />} exact path="/" />
          <Route render={() => <h1>Not Found!!!</h1>} />
        </Switch>
      </HashRouter>
    );
  }
}
