import { fromJS } from 'immutable';
import { CATEGORIES, MODEL_MAP } from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';

const initialState = fromJS({
  [CATEGORIES.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (model !== CATEGORIES.MODEL || action.view === undefined) {
    return state;
  }
  switch (action.type) {
    case MODEL_MAP[model].LIST.REQUESTED:
      return state.merge({
        [action.view]: {
          [model]: {
            LIST: {
              requesting: true,
            },
          },
        },
      });
    case MODEL_MAP[model].LIST.SUCCESS:
      return state.merge({
        [action.view]: {
          [model]: {
            LIST: { ...action.payload, requesting: false },
          },
        },
      });
    case MODEL_MAP[model].LIST.FAILED:
      return state.merge({
        [action.view]: {
          [model]: {
            LIST: { ...action.payload, requesting: false },
          },
        },
      });
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      return state.merge({
        [action.view]: {
          [model]: {
            GET: action.payload,
          },
        },
      });
    case MODEL_MAP[model].POST.SUCCESS:
      return state.merge({
        [action.view]: {
          [model]: {
            POST: action.payload,
          },
        },
      });
    default:
      return state;
  }
}
