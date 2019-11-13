import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  channelsRequest,
  channelsSuccess,
  channelsFailure,
  categoriesRequest,
  categoriesSuccess,
  categoriesFailure,
  aspectsSuccess,
  aspectsRequest,
  aspectsFailure,
  clearSublevel
} from "./actions";

const channels = handleActions(
  {
    [channelsRequest]: () => [],
    [channelsFailure]: () => [],
    [channelsSuccess]: (_state, action) => action.payload
  },
  []
);

const error = handleActions(
  {
    [channelsRequest]: () => null,
    [categoriesRequest]: () => null,
    [aspectsRequest]: () => null,
    [channelsFailure]: (_state, action) => action.payload,
    [categoriesFailure]: (_state, action) => action.payload,
    [aspectsFailure]: (_state, action) => action.payload
  },
  null
);

const searchResults = handleActions(
  {
    [channelsRequest]: () => [],
    [categoriesSuccess]: (_state, action) => {
      return [..._state, ...[action.payload]];
    },
    [clearSublevel]: (_state, action) => {
      let newState = _state.splice(action.payload - 1);
      return _state;
    },
    [channelsFailure]: (_state, action) => action.payload
  },
  []
);

const aspects = handleActions(
  {
    [channelsRequest]: () => [],
    [categoriesRequest]: () => [],
    [aspectsRequest]: () => [],
    [aspectsSuccess]: (_state, action) => action.payload
  },
  []
);
export default combineReducers({ channels, error, searchResults, aspects });

export const getMarketplaceChannels = state => state.marketplace.channels;
export const getMarketplaceError = state => state.marketplace.error;
export const getMarketplaceResults = state => state.marketplace.searchResults;
export const getAspects = state => state.marketplace.aspects;
