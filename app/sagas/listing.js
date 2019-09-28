import { call, put, takeLatest } from 'redux-saga/effects';
import { get, LISTINGS } from '../actions/restApi';

function* fetchListings(action) {
  if (action.type === LISTINGS.GET.REQUESTED) {
    try {
      const response = yield call(get, {
        model: LISTINGS.MODEL,
        id: action.payload.id,
      });
      yield put({ type: LISTINGS.GET.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: LISTINGS.GET.FAILED, payload: e.message });
    }
  }
  if (action.type === LISTINGS.LIST.REQUESTED) {
    try {
      const response = yield call(get, {
        model: LISTINGS.MODEL,
        query: action.payload.query,
      });
      yield put({ type: LISTINGS.LIST.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: LISTINGS.LIST.FAILED, payload: e.message });
    }
  }
}

function* mySaga() {
  yield [
    takeLatest(LISTINGS.LIST.REQUESTED, fetchListings),
    takeLatest(LISTINGS.GET.REQUESTED, fetchListings),
  ];
}

export default mySaga;
