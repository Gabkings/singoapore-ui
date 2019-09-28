/* eslint-disable prettier/prettier */
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  get,
  post,
  put as putApi,
  patch,
  deleteModel,
  MODEL_MAP,
} from '../actions/restApi';
import { getActionModel, getActionApi } from '../actions/apiUtil';

function* getModel(action) {
  const { payload, view } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(get, {
      model,
      id: payload.id,
    });
    if (response.error) {
      yield put({
        type: MODEL_MAP[model][api].FAILED,
        payload: (response.error.response && response.error.response.data) || {
          msg: 'Network Error',
        },
      });
      return;
    }
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* listModels(action) {
  const { payload, view } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(get, {
      model,
      query: payload.query,
    });
    if (response.error) {
      yield put({
        type: MODEL_MAP[model][api].FAILED,
        payload:
          (response.error.response && response.error.response.data.msg) ||
          'Network Error',
      });
      return;
    }
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* postModels(action) {
  const { payload, view, contentType } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(post, {
      model,
      data: payload.data,
      id: payload.id,
      url: payload.url,
      contentType,
    });
    if (response.error) {
      yield put({
        type: MODEL_MAP[model][api].FAILED,
        payload:
          response.error.response ? Object.keys(response.error.response.data)
            .map(k => `${k}: ${response.error.response.data[k]}`)
            .join(' ') : response.error.toString(),
        view,
      });
      return;
    }
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* putModels(action) {
  const { payload, view, contentType } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(putApi, {
      model,
      data: payload.data,
      id: payload.id,
      contentType,
    });
    if (response.error) {
      yield put({
        type: MODEL_MAP[model][api].FAILED,
        payload:
          (response.error.response && response.error.response.data.msg) ||
          'Network Error',
      });
      return;
    }
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* patchModels(action) {
  const { payload, view, contentType } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(patch, {
      model,
      data: payload.data,
      id: payload.id,
      contentType,
    });
    if (response.error) {
      yield put({
        type: MODEL_MAP[model][api].FAILED,
        payload: response.error.response
          ? Object.keys(response.error.response.data)
            .map(k => `${k}: ${response.error.response.data[k]}`)
            .join(' ')
          : response.error.toString(),
        view,
      });
      return;
    }
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* deleteModels(action) {
  const { payload, view, contentType } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(deleteModel, {
      model,
      data: payload.data,
      id: payload.id,
      contentType,
    });
    if (response.error) {
      yield put({
        type: MODEL_MAP[model][api].FAILED,
        payload:
          (response.error.response && response.error.response.data.msg) ||
          'Network Error',
      });
      return;
    }
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: { data: response.data, id: payload.id },
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function modelSaga(model) {
  function* mySaga() {
    yield [
      takeLatest(model.LIST.REQUESTED, listModels),
      takeLatest(model.GET.REQUESTED, getModel),
      takeEvery(model.POST.REQUESTED, postModels),
      takeEvery(model.PUT.REQUESTED, putModels),
      takeEvery(model.PATCH.REQUESTED, patchModels),
      takeEvery(model.DELETE.REQUESTED, deleteModels),
    ];
  }
  return mySaga;
}

export default modelSaga;
