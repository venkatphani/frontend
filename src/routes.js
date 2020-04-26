import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect to="/not-found" />
  </Switch>
);
