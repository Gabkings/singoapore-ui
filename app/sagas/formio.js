import { call, put, takeLatest } from 'redux-saga/effects';
import { FORMIO_FORM, formioGet } from '../actions/formioApi';

function* fetchForm(action) {
  try {
    const { payload, view } = action;
    const response = yield call(formioGet, {
      ...payload,
    });
    yield put({
      type: FORMIO_FORM.GET.SUCCESS,
      payload: { data: response.data },
      view,
    });
  } catch (e) {
    yield put({
      type: FORMIO_FORM.GET.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* mySaga() {
  yield [takeLatest(FORMIO_FORM.GET.REQUESTED, fetchForm)];
}

export default mySaga;
