import * as React from "react";

export default interface IRoute {
  path: string;
  component: JSX.Element;
  exact?: boolean;
}
