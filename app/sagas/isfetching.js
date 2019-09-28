import {
  put,
  // takeLatest,
  call,
  fork,
  cancel,
  // takeEvery,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
// import { MODELS_LIST as restModels } from '../actions/restApi';
// import { MODELS_LIST as wpModels } from '../actions/wpApi';

export const IS_FETCHING = {
  ADD_SPINNER: 'ADD_SPINNER',
  REMOVE_SPINNER: 'REMOVE_SPINNER',
};

const pendingSpinnerTimeouts = [];

export function* addSpinner(action) {
  if (action.payload.showSpinner === false) {
    return;
  }
  yield put({ type: IS_FETCHING.ADD_SPINNER });
  pendingSpinnerTimeouts.push(yield fork(spinnerTimeout));
}

export function* spinnerTimeout() {
  yield call(delay, 2000);
  yield call(removeSpinner);
}

export function* removeSpinner() {
  yield put({ type: IS_FETCHING.REMOVE_SPINNER });
  if (pendingSpinnerTimeouts.length > 0) {
    yield cancel(pendingSpinnerTimeouts.pop());
  }
}

// function genericWatcher(f, pattern, saga) {
//   return f(pattern, saga);
// }

export default function* spinnerSaga() {
  const watchList = [];
  // const generateRequestWatchers = actionModel => {
  //   watchList.push(
  //     genericWatcher(takeLatest, actionModel.REQUESTED, addSpinner),
  //   );
  //   watchList.push(
  //     genericWatcher(takeEvery, actionModel.SUCCESS, removeSpinner),
  //   );
  //   watchList.push(
  //     genericWatcher(takeEvery, actionModel.FAILED, removeSpinner),
  //   );
  // };
  // restModels.forEach(model => {
  //   Object.keys(model).forEach(api => {
  //     if (api === 'MODEL') return;
  //     generateRequestWatchers(model[api]);
  //   });
  // });
  // wpModels.forEach(model => {
  //   Object.keys(model).forEach(api => {
  //     if (api === 'MODEL') return;
  //     generateRequestWatchers(model[api]);
  //   });
  // });
  yield watchList;
}
