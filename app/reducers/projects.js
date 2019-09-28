import { fromJS } from 'immutable';
import { LISTINGS, MODEL_MAP, PROJECTS } from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';

export const PROJECT_VIEW = 'project';

const initialState = fromJS({
  [LISTINGS.MODEL]: {
    LIST: {
      count: 2112,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [PROJECTS.MODEL]: {
    LIST: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    GET: {},
    PATCH: {},
    POST: {},
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (model !== LISTINGS.MODEL && model !== PROJECTS.MODEL) {
    return state;
  }
  const updated = state.toJS();
  switch (action.type) {
    case MODEL_MAP[model].LIST.REQUESTED:
      updated[model].LIST = {
        requesting: false,
      };
      return state.merge(updated);
    case MODEL_MAP[model].LIST.SUCCESS:
      updated[model].LIST = {
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
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
      updated[model].GET = action.payload;
      updated[model].LIST.results = updated[model].LIST.results.map(m => {
        if (m.id === action.payload.id) {
          return action.payload;
        }
        return m;
      });
      return state.merge(updated);
    case MODEL_MAP[model].PATCH.SUCCESS:
      updated[model].PATCH = action.payload;
      updated[model].LIST.results = updated[model].LIST.results.map(m => {
        if (m.id === action.payload.id) {
          return action.payload;
        }
        return m;
      });
      return state.merge(updated);
    case MODEL_MAP[model].POST.REQUESTED:
      updated[model].POST = {
        requesting: true,
      };
      return state.merge(updated);
    case MODEL_MAP[model].POST.SUCCESS:
      updated[model].POST = { ...action.payload, requesting: false };
      return state.merge(updated);
    case MODEL_MAP[model].POST.FAILED:
      updated[model].POST = { ...action.payload, requesting: false };
      return state.merge(updated);
    case MODEL_MAP[model].DELETE.SUCCESS:
      updated[model].DELETE = action.payload;
      return state.merge(updated);
    default:
      return state;
  }
}
