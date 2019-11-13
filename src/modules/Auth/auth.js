import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
    authRequest,
    authSuccess,
    refSuccess,
    authFailure,
    refFailure,
    refRequest,
    verSuccess,
    logout
} from "./actions";

const isAuthorized = handleActions(
    {
        [authSuccess]: () => true,
        [refSuccess]: () => true,
        [verSuccess]: () => true,
        [refFailure]: () => false,
        [logout]: () => false
    },
    false
);

const error = handleActions(
    {
        [authRequest]: () => null,
        [authSuccess]: () => null,
        [refRequest]: () => null,
        [refSuccess]: () => null,
        [refFailure]: () => null,
        [authFailure]: (_state, action) => action.payload
    },
    null
);

export default combineReducers({ isAuthorized, error });

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getAuthError = state => state.auth.error;
