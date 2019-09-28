import { call, put, takeLatest } from 'redux-saga/effects';
import { get, GALLERIES } from '../actions/restApi';

function* fetchGalleries(action) {
  if (action.type === GALLERIES.GET.REQUESTED) {
    try {
      const response = yield call(get, {
        model: GALLERIES.MODEL,
        id: action.payload.id,
      });
      yield put({
        type: GALLERIES.GET.SUCCESS,
        payload: response.data,
        view: action.view,
      });
    } catch (e) {
      yield put({
        type: GALLERIES.GET.FAILED,
        payload: e.message,
        view: action.view,
      });
    }
  }
  if (action.type === GALLERIES.LIST.REQUESTED) {
    try {
      const response = yield call(get, {
        model: GALLERIES.MODEL,
        query: action.payload.query,
      });
      yield put({
        type: GALLERIES.LIST.SUCCESS,
        payload: response.data,
        view: action.view,
      });
    } catch (e) {
      yield put({
        type: GALLERIES.LIST.FAILED,
        payload: e.message,
        view: action.view,
      });
    }
  }
}

function* mySaga() {
  yield [
    takeLatest(GALLERIES.LIST.REQUESTED, fetchGalleries),
    takeLatest(GALLERIES.GET.REQUESTED, fetchGalleries),
  ];
}

export default mySaga;
