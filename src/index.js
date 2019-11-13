import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import RootRoute from "./components/RootRoute";
import createStore from "./store";

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <RootRoute />
    </Provider>,
    document.getElementById("root")
);
