import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Products from "../Products";
import Login from "../Login";

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/products" component={Products} />
            <Redirect path="/" exact to="/login" />
        </Switch>
    </BrowserRouter>
);
