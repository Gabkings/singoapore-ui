import { fromJS } from 'immutable';
import { LISTINGS, MODEL_MAP, PROJECTS } from '../actions/restApi';
import { getActionApi, getActionModel } from '../actions/apiUtil';
import {
  CHANNELS,
  CHAT_USER,
  HANDLER,
  MESSAGES,
  UNREAD_COUNT,
} from '../actions/chatApi';

export const CHAT_VIEW = 'chat';

const initialState = fromJS({
  [LISTINGS.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [PROJECTS.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [CHAT_USER.MODEL]: {
    CONNECT: {
      requested: false,
    },
    ONLINE_STATUS: {
      requested: false,
    },
  },
  [CHANNELS.MODEL]: {
    LIST: {},
    MARK_READ: {},
  },
  [MESSAGES.MODEL]: {
    LIST: {},
    SEND: {},
    RECEIVE: {},
  },
  [HANDLER.MODEL]: {
    REGISTER: {},
  },
  [UNREAD_COUNT.MODEL]: {
    CHANNEL: { count: 0 },
    MESSAGE: { count: 0 },
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  if (
    model !== LISTINGS.MODEL &&
    model !== PROJECTS.MODEL &&
    model !== CHAT_USER.MODEL &&
    model !== CHANNELS.MODEL &&
    model !== MESSAGES.MODEL &&
    model !== HANDLER.MODEL &&
    model !== UNREAD_COUNT.MODEL
  ) {
    return state;
  }
  const updated = state.toJS();
  if (model === LISTINGS.MODEL || model === PROJECTS.MODEL) {
    switch (action.type) {
      case MODEL_MAP[model].LIST.SUCCESS:
        updated[model].LIST = action.payload;
        return state.merge(updated);
      case MODEL_MAP[model].GET.SUCCESS:
      case MODEL_MAP[model].PUT.SUCCESS:
      case MODEL_MAP[model].PATCH.SUCCESS:
        updated[model].GET = action.payload;
        updated[model].LIST.results = updated[model].LIST.results.map(m => {
          if (m.id === action.payload.id) {
            return action.payload;
          }
          return m;
        });
        return state.merge(updated);
      case MODEL_MAP[model].POST.SUCCESS:
        updated[model].POST = action.payload;
        return state.merge(updated);
      case MODEL_MAP[model].DELETE.SUCCESS:
        updated[model].DELETE = action.payload;
        return state.merge(updated);
      default:
        return state;
    }
  }
  switch (action.type) {
    case CHAT_USER.CONNECT.REQUESTED:
      updated[model][api] = { requested: true, ...action.payload };
      return state.merge(updated);
    case CHAT_USER.CONNECT.FAILED:
      updated[model][api] = { requested: false, ...action.payload };
      return state.merge(updated);
    case CHAT_USER.CONNECT.SUCCESS:
      updated[model][api] = { requested: false, ...action.payload };
      return state.merge(updated);
    case CHAT_USER.ONLINE_STATUS.REQUESTED:
      updated[model][api] = { requested: true, ...action.payload };
      return state.merge(updated);
    case CHAT_USER.ONLINE_STATUS.FAILED:
      updated[model][api] = { requested: false, ...action.payload };
      return state.merge(updated);
    case CHAT_USER.ONLINE_STATUS.SUCCESS:
      updated[model][api] = { requested: false, ...action.payload };
      return state.merge(updated);
    case CHANNELS.LIST.SUCCESS:
    case CHANNELS.MARK_READ.SUCCESS:
    case HANDLER.REGISTER.SUCCESS:
      updated[model][api] = action.payload;
      return state.merge(updated);
    case CHANNELS.CHANGE.SUCCESS:
      if (Array.isArray(updated[CHANNELS.MODEL].LIST)) {
        updated[CHANNELS.MODEL].LIST = updated[CHANNELS.MODEL].LIST.map(
          c =>
            c.url === action.payload.channel.url ? action.payload.channel : c,
        );
      }
      return state.merge(updated);
    case MESSAGES.LIST.SUCCESS:
      updated[model][api][action.payload.channel.url] = action.payload.messages;
      return state.merge(updated);
    case MESSAGES.SEND.SUCCESS:
    case MESSAGES.RECEIVE.SUCCESS:
      updated[model][api] = action.payload;
      if (updated[model].LIST[action.payload.channel.url] !== undefined) {
        updated[model].LIST[action.payload.channel.url].push(
          action.payload.message,
        );
      }
      return state.merge(updated);
    case UNREAD_COUNT.CHANNEL.SUCCESS:
    case UNREAD_COUNT.MESSAGE.SUCCESS:
      updated[model][api] = action.payload;
      return state.merge(updated);
    default:
      return state;
  }
}
