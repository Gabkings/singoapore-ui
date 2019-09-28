import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CHANNELS,
  CHAT_USER,
  MESSAGES,
  HANDLER,
  connectUser,
  listChannels,
  listMessages,
  sendMessage,
  registerHandler,
  UNREAD_COUNT,
  getUnreadChannelCount,
  getUnreadMessageCount,
  markChannelAsRead,
  getUserOnlineStatus,
  disconnectUser,
} from '../actions/chatApi';

function* handleChatUser(action) {
  if (action.type === CHAT_USER.CONNECT.REQUESTED) {
    try {
      const { payload, view } = action;
      const { userId, accessToken } = payload;
      const chatUser = yield call(connectUser, { userId, accessToken });
      yield put({
        type: CHAT_USER.CONNECT.SUCCESS,
        payload: { chatUser },
        view,
      });
    } catch (e) {
      yield put({
        type: CHAT_USER.CONNECT.FAILED,
        payload: {
          message: e.message,
          timestamp: Date.now().valueOf(),
        },
      });
    }
  }
  if (action.type === CHAT_USER.DISCONNECT.REQUESTED) {
    try {
      const { view } = action;
      yield call(disconnectUser, {});
      yield put({
        type: CHAT_USER.DISCONNECT.SUCCESS,
        view,
      });
    } catch (e) {
      yield put({
        type: CHAT_USER.DISCONNECT.FAILED,
        payload: {
          message: e.message,
          timestamp: Date.now().valueOf(),
        },
      });
    }
  }
}

function* getOnlineStatus(action) {
  try {
    const { payload, view } = action;
    const { userId } = payload;
    const response = yield call(getUserOnlineStatus, { userId });
    yield put({
      type: CHAT_USER.ONLINE_STATUS.SUCCESS,
      payload: { response },
      view,
    });
  } catch (e) {
    yield put({
      type: CHAT_USER.ONLINE_STATUS.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* fetchChannels(action) {
  try {
    const { view } = action;
    const channels = yield call(listChannels, {});
    yield put({
      type: CHANNELS.LIST.SUCCESS,
      payload: { channels },
      view,
    });
  } catch (e) {
    yield put({
      type: CHANNELS.LIST.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* changeChannels(action) {
  try {
    const { view, payload } = action;
    const { channel, user, metaData } = payload;
    yield put({
      type: CHANNELS.CHANGE.SUCCESS,
      payload: { channel, user, metaData },
      view,
    });
  } catch (e) {
    yield put({
      type: CHANNELS.CHANGE.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* markChannelRead(action) {
  try {
    const { view, payload } = action;
    const { channel } = payload;
    const success = yield call(markChannelAsRead, { channel });
    yield put({
      type: CHANNELS.MARK_READ.SUCCESS,
      payload: { success },
      view,
    });
    yield put({
      type: UNREAD_COUNT.CHANNEL.REQUESTED,
      view,
    });
  } catch (e) {
    yield put({
      type: CHANNELS.MARK_READ.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* fetchMessages(action) {
  try {
    const { payload, view } = action;
    const { channel } = payload;
    const messages = yield call(listMessages, { channel });
    yield put({
      type: MESSAGES.LIST.SUCCESS,
      payload: { channel, messages },
      view,
    });
  } catch (e) {
    yield put({
      type: MESSAGES.LIST.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* sendMessages(action) {
  try {
    const { payload, view } = action;
    const { channel, messageType, messageParams } = payload;
    const message = yield call(sendMessage, {
      channel,
      messageType,
      messageParams,
    });
    yield put({
      type: MESSAGES.SEND.SUCCESS,
      payload: { channel, message },
      view,
    });
  } catch (e) {
    yield put({
      type: MESSAGES.SEND.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* receiveMessages(action) {
  try {
    const { payload, view } = action;
    const { channel, message } = payload;
    yield put({
      type: MESSAGES.RECEIVE.SUCCESS,
      payload: { channel, message },
      view,
    });
  } catch (e) {
    yield put({
      type: MESSAGES.RECEIVE.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* registerChannelHandler(action) {
  try {
    const { payload, view } = action;
    const { handler, handlerType } = payload;
    const h = yield call(registerHandler, {
      handler,
      handlerType,
    });
    yield put({
      type: HANDLER.REGISTER.SUCCESS,
      payload: { handler: h },
      view,
    });
  } catch (e) {
    yield put({
      type: HANDLER.REGISTER.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* getUnreadCount(action) {
  if (action.type === UNREAD_COUNT.CHANNEL.REQUESTED) {
    try {
      const { view } = action;
      const count = yield call(getUnreadChannelCount);
      yield put({
        type: UNREAD_COUNT.CHANNEL.SUCCESS,
        payload: { count },
        view,
      });
    } catch (e) {
      yield put({
        type: UNREAD_COUNT.CHANNEL.FAILED,
        payload: {
          message: e.message,
          timestamp: Date.now().valueOf(),
        },
      });
    }
  }
  if (action.type === UNREAD_COUNT.MESSAGE.REQUESTED) {
    try {
      const { view } = action;
      const count = yield call(getUnreadMessageCount);
      yield put({
        type: UNREAD_COUNT.MESSAGE.SUCCESS,
        payload: { count },
        view,
      });
    } catch (e) {
      yield put({
        type: UNREAD_COUNT.MESSAGE.FAILED,
        payload: {
          message: e.message,
          timestamp: Date.now().valueOf(),
        },
      });
    }
  }
}

function* mySaga() {
  yield [
    takeLatest(CHAT_USER.CONNECT.REQUESTED, handleChatUser),
    takeLatest(CHAT_USER.DISCONNECT.REQUESTED, handleChatUser),
    takeLatest(CHAT_USER.ONLINE_STATUS.REQUESTED, getOnlineStatus),
    takeLatest(CHANNELS.LIST.REQUESTED, fetchChannels),
    takeLatest(CHANNELS.CHANGE.REQUESTED, changeChannels),
    takeLatest(CHANNELS.MARK_READ.REQUESTED, markChannelRead),
    takeLatest(MESSAGES.LIST.REQUESTED, fetchMessages),
    takeLatest(MESSAGES.SEND.REQUESTED, sendMessages),
    takeLatest(MESSAGES.RECEIVE.REQUESTED, receiveMessages),
    takeLatest(HANDLER.REGISTER.REQUESTED, registerChannelHandler),
    takeLatest(UNREAD_COUNT.CHANNEL.REQUESTED, getUnreadCount),
    takeLatest(UNREAD_COUNT.MESSAGE.REQUESTED, getUnreadCount),
  ];
}

export default mySaga;
