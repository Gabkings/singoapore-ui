import { call, put, takeLatest } from 'redux-saga/effects';
import { get, MERCHANTS } from '../actions/restApi';

function* fetchMerchants(action) {
  if (action.type === MERCHANTS.GET.REQUESTED) {
    try {
      const response = yield call(get, {
        model: MERCHANTS.MODEL,
        id: action.payload.id,
      });
      yield put({ type: MERCHANTS.GET.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: MERCHANTS.GET.FAILED, payload: e.message });
    }
  }
  if (action.type === MERCHANTS.LIST.REQUESTED) {
    try {
      const response = yield call(get, {
        model: MERCHANTS.MODEL,
        query: action.payload.query,
      });
      yield put({ type: MERCHANTS.LIST.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: MERCHANTS.LIST.FAILED, payload: e.message });
    }
  }
}

// function* createMerchant(action) {
//   if (action.type === MERCHANTS.POST.REQUESTED) {
//     try {
//       const response = yield call(post, {
//         model: MERCHANTS.MODEL,
//         data: action.payload.data,
//       });
//       yield put({ type: MERCHANTS.POST.SUCCESS, payload: response.data });
//     } catch (e) {
//       yield put({ type: MERCHANTS.POST.FAILED, payload: e.message });
//     }
//   }
// }

function* mySaga() {
  yield [
    takeLatest(MERCHANTS.LIST.REQUESTED, fetchMerchants),
    takeLatest(MERCHANTS.GET.REQUESTED, fetchMerchants),
  ];
}

export default mySaga;
