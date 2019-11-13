import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth, { sagas as authSagas } from "./Auth";
import marketplace, { sagas as marketSagas } from "./Marketplace";

export default combineReducers({ auth, marketplace });

export function* rootSaga() {
    yield fork(authSagas);
    yield fork(marketSagas);
}
