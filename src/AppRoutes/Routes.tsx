import * as React from "react";
import IRoute from "../Models/Interfaces/IRoute";

const routes: IRoute[] = [
  {
    component: <h1>Home Page</h1>,
    path: "/",
    exact: true,
  },
  {
    component: <h1>New Requests</h1>,
    exact: false,
    path: "/new",
  },
];

export default routes;
