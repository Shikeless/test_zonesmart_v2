import { createAction } from "redux-actions";

export const channelsRequest = createAction("CHAN/REQUEST");
export const channelsSuccess = createAction("CHAN/SUCCESS");
export const channelsFailure = createAction("CHAN/FAILURE");

export const categoriesRequest = createAction("CAT/REQUEST");
export const categoriesSuccess = createAction("CAT/SUCCESS");
export const categoriesFailure = createAction("CAT/FAILURE");

export const aspectsRequest = createAction("ASPECTS/REQUEST");
export const aspectsSuccess = createAction("ASPECTS/SUCCESS");
export const aspectsFailure = createAction("ASPECTS/FAILURE");

export const clearSublevel = createAction("CAT/CLEARSUBLEVEL");
