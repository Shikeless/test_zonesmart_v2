import { createAction } from "redux-actions";

export const authRequest = createAction("AUTH/REQUEST");
export const authSuccess = createAction("AUTH/SUCCESS");
export const authFailure = createAction("AUTH/FAILURE");

export const refRequest = createAction("REF/REQUEST");
export const refSuccess = createAction("REF/SUCCESS");
export const refFailure = createAction("REF/FAILURE");

export const verRequest = createAction("VER/REQUEST");
export const verSuccess = createAction("VER/SUCCESS");
export const verFailure = createAction("VER/FAILURE");

export const logout = createAction("LOGOUT");
