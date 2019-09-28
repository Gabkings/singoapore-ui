import { fromJS } from 'immutable';
import {
  CATEGORIES,
  FILES,
  GALLERIES,
  LISTINGS,
  MODEL_MAP,
  REVIEWS,
  FAVOURITES,
  DEALS,
  CONSUMERS,
  MERCHANTS,
} from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';

export const DASHBOARD_VIEW = 'dashboard';

const initialState = fromJS({
  [LISTINGS.MODEL]: {
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
  [GALLERIES.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [FILES.MODEL]: {
    LIST: {
      count: 0,
      next: null,
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
  [FAVOURITES.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [DEALS.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
    DELETE: {},
  },
  [CONSUMERS.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
    DELETE: {},
  },
  [MERCHANTS.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
    DELETE: {},
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (
    model !== LISTINGS.MODEL &&
    model !== CATEGORIES.MODEL &&
    model !== GALLERIES.MODEL &&
    model !== REVIEWS.MODEL &&
    model !== FILES.MODEL &&
    model !== FAVOURITES.MODEL &&
    model !== DEALS.MODEL &&
    model !== CONSUMERS.MODEL &&
    model !== MERCHANTS.MODEL
  ) {
    return state;
  }
  const updated = state.toJS();
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
    case MODEL_MAP[model].GET.REQUESTED:
    case MODEL_MAP[model].PUT.REQUESTED:
    case MODEL_MAP[model].PATCH.REQUESTED:
      updated[model].GET.error = undefined;
      return state.merge(updated);
    case MODEL_MAP[model].GET.FAILED:
    case MODEL_MAP[model].PUT.FAILED:
    case MODEL_MAP[model].PATCH.FAILED:
      updated[model].GET.error = action.payload;
      return state.merge(updated);
    case MODEL_MAP[model].POST.SUCCESS:
      updated[model].POST = action.payload;
      updated[model].POST.requesting = false;
      return state.merge(updated);
    case MODEL_MAP[model].POST.REQUESTED:
      updated[model].POST.error = undefined;
      updated[model].POST.requesting = true;
      return state.merge(updated);
    case MODEL_MAP[model].POST.FAILED:
      updated[model].POST.error = action.payload;
      updated[model].POST.requesting = false;
      return state.merge(updated);
    case MODEL_MAP[model].DELETE.SUCCESS:
      updated[model].DELETE = action.payload;
      return state.merge(updated);
    default:
      return state;
  }
}
