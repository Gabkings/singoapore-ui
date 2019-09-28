import { call, put, takeLatest } from 'redux-saga/effects';
import { get, CATEGORIES } from '../actions/restApi';

function* fetchCategories(action) {
  if (action.type === CATEGORIES.GET.REQUESTED) {
    try {
      const response = yield call(get, {
        model: CATEGORIES.MODEL,
        id: action.payload.id,
      });
      if (response.error) {
        yield put({
          type: CATEGORIES.GET.FAILED,
          payload:
            (response.error.response && response.error.response.data.msg) ||
            'Network Error',
          view: action.view,
        });
        return;
      }
      yield put({
        type: CATEGORIES.GET.SUCCESS,
        payload: response.data,
        view: action.view,
      });
    } catch (e) {
      yield put({
        type: CATEGORIES.GET.FAILED,
        payload: e.message,
        view: action.view,
      });
    }
  }
  if (action.type === CATEGORIES.LIST.REQUESTED) {
    try {
      const response = yield call(get, {
        model: CATEGORIES.MODEL,
        query: action.payload.query,
      });
      if (response.error) {
        yield put({
          type: CATEGORIES.LIST.FAILED,
          payload:
            (response.error.response && response.error.response.data.msg) ||
            'Network Error',
          view: action.view,
        });
        return;
      }
      yield put({
        type: CATEGORIES.LIST.SUCCESS,
        payload: response.data,
        view: action.view,
      });
    } catch (e) {
      yield put({
        type: CATEGORIES.LIST.FAILED,
        payload: e.message,
        view: action.view,
      });
    }
  }
  if (action.type === CATEGORIES.GET_WITH_CHILDREN.REQUESTED) {
    try {
      const response = yield call(get, {
        model: CATEGORIES.MODEL,
        url: 'get_with_children',
        query: action.payload.query,
      });
      if (response.error) {
        yield put({
          type: CATEGORIES.GET_WITH_CHILDREN.FAILED,
          payload:
            (response.error.response && response.error.response.data.msg) ||
            'Network Error',
          view: action.view,
        });
        return;
      }
      yield put({
        type: CATEGORIES.GET_WITH_CHILDREN.SUCCESS,
        payload: response.data,
        view: action.view,
      });
    } catch (e) {
      yield put({
        type: CATEGORIES.GET_WITH_CHILDREN.FAILED,
        payload: e.message,
        view: action.view,
      });
    }
  }
}

function* mySaga() {
  yield [
    takeLatest(CATEGORIES.LIST.REQUESTED, fetchCategories),
    takeLatest(CATEGORIES.GET.REQUESTED, fetchCategories),
    takeLatest(CATEGORIES.GET_WITH_CHILDREN.REQUESTED, fetchCategories),
  ];
}

export default mySaga;
