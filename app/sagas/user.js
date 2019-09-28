import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  get,
  post,
  USERS,
  MERCHANTS,
  CONSUMERS,
  patch,
} from '../actions/restApi';
import { APPLICATION_JSON } from '../utils/actionsUtil';
import { getToken, removeToken, storeToken } from '../utils/localStorage';
import { CHAT_USER } from '../actions/chatApi';

function* registerUser(action) {
  if (action.type === USERS.REGISTER.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        url: 'register',
        data: action.payload,
      });
      if (response.error) {
        yield put({
          type: USERS.REGISTER.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({ type: USERS.REGISTER.SUCCESS, payload: response.data });
      if (action.payload.method !== 'email') {
        yield put({
          type: USERS.LOGIN.REQUESTED,
          payload: { ...action.payload, username: action.payload.email },
        });
      }
    } catch (e) {
      yield put({
        type: USERS.REGISTER.FAILED,
        payload: {
          message: e.message,
          timestamp: Date.now().valueOf(),
        },
      });
    }
  }
}
function* loginUser(action) {
  if (action.type === USERS.LOGIN.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        url: 'login',
        data: action.payload,
      });
      if (response.error) {
        yield put({
          type: USERS.LOGIN.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({ type: USERS.LOGIN.SUCCESS, payload: response.data });
      storeToken(response.data.token);
      yield put({ type: USERS.LOAD_AUTH.REQUESTED });
    } catch (e) {
      yield put({
        type: USERS.LOGIN.FAILED,
        payload: {
          message: e.message,
          timestamp: Date.now().valueOf(),
        },
      });
    }
  }
}

// eslint-disable-next-line no-unused-vars
function* loadAuth(action) {
  try {
    // eslint-disable-next-line no-unused-vars
    const token = getToken();
    if (token !== null) {
      const response = yield call(post, {
        model: USERS.MODEL,
        url: 'load_auth',
        data: { token },
      });
      if (response.error) {
        yield put({
          type: USERS.LOAD_AUTH.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      if (response.data.data) {
        if (response.data.data.userId) {
          yield put({
            type: USERS.GET.REQUESTED,
            payload: { id: response.data.data.userId },
          });
        }
        if (response.data.data.merchantId) {
          yield put({
            type: MERCHANTS.GET.REQUESTED,
            payload: { id: response.data.data.merchantId },
          });
        }
        if (response.data.data.consumerId) {
          yield put({
            type: CONSUMERS.GET.REQUESTED,
            payload: { id: response.data.data.consumerId },
          });
        }
      }
      yield put({ type: USERS.LOAD_AUTH.SUCCESS, payload: response.data });
    }
  } catch (e) {
    yield put({ type: USERS.LOAD_AUTH.FAILED, payload: e.message });
    removeToken();
  }
}

function* fetchUser(action) {
  if (action.type === USERS.GET.REQUESTED) {
    try {
      const response = yield call(get, {
        model: USERS.MODEL,
        id: action.payload.id,
      });
      if (response.error) {
        yield put({
          type: USERS.GET.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({ type: USERS.GET.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: USERS.GET.FAILED, payload: e.message });
    }
  }
}

function* postUser(action) {
  if (action.type === USERS.POST.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        id: action.payload.id,
        url: action.payload.url,
        data: action.payload.data,
        contentType: APPLICATION_JSON,
      });
      if (response.error) {
        yield put({
          type: USERS.POST.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
            view: action.view,
          },
        });
        return;
      }
      yield put({
        type: USERS.POST.SUCCESS,
        payload: response.data,
        view: action.view,
      });
    } catch (e) {
      yield put({
        type: USERS.POST.FAILED,
        payload: e.message,
        view: action.view,
      });
    }
  }
}

function* updateUser(action) {
  if (action.type === USERS.PATCH.REQUESTED) {
    try {
      const response = yield call(patch, {
        model: USERS.MODEL,
        id: action.payload.id,
        data: action.payload.data,
        contentType: APPLICATION_JSON,
      });
      if (response.error) {
        yield put({
          type: USERS.PATCH.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({ type: USERS.PATCH.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: USERS.PATCH.FAILED, payload: e.message });
    }
  }
}

function* activateUser(action) {
  if (action.type === USERS.ACTIVATE.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        data: action.payload.data,
        url: action.payload.url,
        contentType: APPLICATION_JSON,
      });
      if (response.error) {
        yield put({
          type: USERS.ACTIVATE.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({ type: USERS.ACTIVATE.SUCCESS, payload: response.data });
      storeToken(response.data.token);
      yield put({ type: USERS.LOAD_AUTH.REQUESTED });
    } catch (e) {
      yield put({ type: USERS.ACTIVATE.FAILED, payload: e.message });
    }
  }
}

function* deactivateUser(action) {
  if (action.type === USERS.DEACTIVATE.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        id: action.payload.id,
        data: action.payload.data,
        url: action.payload.url,
        contentType: APPLICATION_JSON,
      });
      if (response.error) {
        yield put({
          type: USERS.DEACTIVATE.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({ type: USERS.DEACTIVATE.SUCCESS, payload: response.data });
      yield put({ type: USERS.LOGOUT.REQUESTED });
    } catch (e) {
      yield put({ type: USERS.DEACTIVATE.FAILED, payload: e.message });
    }
  }
}

function* passwordReset(action) {
  if (action.type === USERS.PASSWORD_RESET_EMAIL.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        data: action.payload.data,
        url: 'reset_password',
        contentType: APPLICATION_JSON,
      });
      if (response.error) {
        yield put({
          type: USERS.PASSWORD_RESET_EMAIL.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({
        type: USERS.PASSWORD_RESET_EMAIL.SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: USERS.PASSWORD_RESET_EMAIL.FAILED,
        payload: e.message,
      });
    }
  } else if (action.type === USERS.PASSWORD_RESET_SUBMIT.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        data: action.payload.data,
        url: 'reset_password_submit',
        contentType: APPLICATION_JSON,
      });
      if (response.error) {
        yield put({
          type: USERS.PASSWORD_RESET_SUBMIT.FAILED,
          payload: {
            message:
              (response.error.response && response.error.response.data.msg) ||
              'Network Error',
            error: response.error,
          },
        });
        return;
      }
      yield put({
        type: USERS.PASSWORD_RESET_SUBMIT.SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: USERS.PASSWORD_RESET_SUBMIT.FAILED,
        payload: e.message,
      });
    }
  }
}

function* logoutUser(action) {
  if (action.type === USERS.LOGOUT.REQUESTED) {
    try {
      removeToken();
      yield put(push('/'));
      yield put({ type: CHAT_USER.DISCONNECT.REQUESTED });
      yield put({ type: USERS.LOGOUT.SUCCESS });
    } catch (e) {
      yield put({ type: USERS.LOGOUT.FAILED });
    }
  }
}

function* mySaga() {
  yield [
    takeLatest(USERS.REGISTER.REQUESTED, registerUser),
    takeLatest(USERS.LOGIN.REQUESTED, loginUser),
    takeLatest(USERS.GET.REQUESTED, fetchUser),
    takeLatest(USERS.POST.REQUESTED, postUser),
    takeLatest(USERS.PATCH.REQUESTED, updateUser),
    takeLatest(USERS.LOAD_AUTH.REQUESTED, loadAuth),
    takeLatest(USERS.ACTIVATE.REQUESTED, activateUser),
    takeLatest(USERS.DEACTIVATE.REQUESTED, deactivateUser),
    takeLatest(USERS.PASSWORD_RESET_EMAIL.REQUESTED, passwordReset),
    takeLatest(USERS.PASSWORD_RESET_SUBMIT.REQUESTED, passwordReset),
    takeLatest(USERS.LOGOUT.REQUESTED, logoutUser),
  ];
}

export default mySaga;
