import { takeLatest, put, call, fork } from "redux-saga/effects";
import {
  channelsRequest,
  channelsSuccess,
  categoriesRequest,
  categoriesSuccess,
  aspectsRequest,
  aspectsSuccess
} from "./actions";
import { fetchChannels, fetchCategories, fetchAspects } from "./api.js";

function* fetchMerketplaceWatcher(action) {
  yield takeLatest(channelsRequest, channelsRequestFlow);
  yield takeLatest(categoriesRequest, categoriesRequestFlow);
  yield takeLatest(aspectsRequest, aspectsRequestFlow);
}

export function* channelsRequestFlow(action) {
  try {
    const channels = yield call(fetchChannels);
    if (channels) {
      yield put(channelsSuccess(channels.results));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* categoriesRequestFlow(action) {
  try {
    const categories = yield call(fetchCategories, action.payload);
    if (categories) {
      yield put(categoriesSuccess(categories.results));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* aspectsRequestFlow(action) {
  try {
    const aspects = yield call(fetchAspects, action.payload);
    if (aspects) {
      yield put(aspectsSuccess(aspects));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function*() {
  yield fork(fetchMerketplaceWatcher);
}
