import { fromJS } from 'immutable';
import {
  LISTINGS,
  MODEL_MAP,
  FILES,
  GALLERIES,
  REVIEWS,
  CATEGORIES,
} from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';
// import { WP_POSTS } from '../actions/wpApi';

const initialState = fromJS({
  [LISTINGS.MODEL]: {
    LIST: { loading: true },
    GET: {},
    POST: { loading: true },
  },
  [FILES.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [GALLERIES.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [REVIEWS.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [CATEGORIES.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  // [WP_POSTS.MODEL]: {
  //   LIST: [],
  //   GET: {},
  // },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (
    [
      LISTINGS.MODEL,
      FILES.MODEL,
      GALLERIES.MODEL,
      REVIEWS.MODEL,
      CATEGORIES.MODEL,
    ].indexOf(model) === -1
  ) {
    return state;
  }
  const updated = state.toJS();
  switch (action.type) {
    case MODEL_MAP[model].LIST.REQUESTED:
      updated[model].LIST = {
        requesting: true,
      };
      return state.merge(updated);
    case MODEL_MAP[model].GET.REQUESTED:
    case MODEL_MAP[model].PUT.REQUESTED:
    case MODEL_MAP[model].PATCH.REQUESTED:
      updated[model].GET = {
        requesting: true,
      };
      return state.merge(updated);
    case MODEL_MAP[model].LIST.SUCCESS:
      updated[model].LIST = {
        ...action.payload,
        requesting: false,
      };
      return state.merge(updated);
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      updated[model].GET = {
        ...action.payload,
        requesting: false,
      };
      return state.merge(updated);
    case MODEL_MAP[model].POST.SUCCESS:
      updated[model].POST = {
        ...action.payload,
        requesting: false,
      };
      return state.merge(updated);
    case MODEL_MAP[model].LIST.FAILED:
      updated[model].LIST = {
        ...action.payload,
        requesting: false,
      };
      return state.merge(updated);
    case MODEL_MAP[model].GET.FAILED:
    case MODEL_MAP[model].PUT.FAILED:
    case MODEL_MAP[model].PATCH.FAILED:
      updated[model].GET = {
        ...action.payload,
        requesting: false,
      };
      return state.merge(updated);
    default:
      return state;
  }
}
